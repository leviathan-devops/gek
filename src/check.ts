// src/check.ts — THE execution order (blueprint §5): identity → pins → armed → mech → card+judge → ledger.
// Runs identically on the runner (--server) and for --explain; exit 0 PASS / exit 2 REJECT / exit 1 internal.
import { readFileSync, existsSync, mkdirSync, appendFileSync } from "node:fs";
import { Refusal, refuse } from "./tokens.ts";
import { loadManifest, loadLock } from "./config.ts";
import { evaluate, type Commit } from "./mech.ts";
import { buildCard } from "./card.ts";
import { askJudge } from "./judge.ts";

export interface CheckOpts { surface: "server" | "explain"; check?: "mechanical" | "judge" | "identity"; dir: string }

function lawExtract(dir: string, anchors: string[], cap = 6000): string {
  const byFile = new Map<string, number[]>();
  for (const a of anchors) { const f = a.split(":")[0]; const l = Number(a.split(":")[1]); if (f && l) { if (!byFile.has(f)) byFile.set(f, []); byFile.get(f)!.push(l); } }
  const parts: string[] = [];
  for (const [f, lines] of byFile) {
    try { const txt = readFileSync(`${dir}/${f}`, "utf8").split("\n"); for (const l of lines) parts.push(`${f}:${l}: ${txt[l - 1]?.slice(0, 200) ?? ""}`); } catch { /* anchor file absent → skip */ }
  }
  return parts.join("\n").slice(0, cap);
}

export async function check(opts: CheckOpts, c: Commit): Promise<{ verdict: "PASS" | "REJECT"; detail: string }> {
  const m = loadManifest(opts.dir);
  const lock = loadLock(opts.dir) ?? refuse("GEK_NOT_INSTALLED", "GEK.lock absent — run gek compile && gek install");
  const spec = JSON.parse(readFileSync(`${opts.dir}/gate-spec.json`, "utf8")) as { predicates: { kind: string; anchor: string }[]; cards: { questions: { q: string; anchor: string }[]; composite: string; thresholds_ref: string }[]; authority_sha: Record<string, string>; oracles: { path: string }[] };
  const oracleMap: Record<string, string> = {};
  for (const o of spec.oracles) oracleMap[o.path] = lock.oracles[o.path] ?? "";
  const thresholdsFresh = existsSync(`${opts.dir}/thresholds.json`);
  const ctx = { root: lock.root, toplevel: opts.dir, authority: spec.authority_sha, oracles: oracleMap, thresholdsFresh };

  let claimDetected = false;
  for (const pred of spec.predicates) {
    // ARMED is handled explicitly below: it gates the EVIDENCE CLASS (a completion claim) and the
    // judge leg — never a plain mechanical commit (blueprint §0.4: armed:false blocks the evidence class).
    if (pred.kind === "armed") continue;
    if (opts.check === "judge" && pred.kind !== "evidence_class" && pred.kind !== "constant_traced") continue;
    if (opts.check === "mechanical" && ["evidence_class", "constant_traced"].includes(pred.kind)) continue;
    if (opts.check === "identity" && !["root_identity", "authority_pin", "oracle_pin"].includes(pred.kind)) continue;
    const r = evaluate(pred as never, c, ctx);
    if (pred.kind === "evidence_class" && r.pass) {
      const claimsHit = (JSON.parse(readFileSync(`${opts.dir}/gate-spec.json`, "utf8")) as { predicates: { kind: string; claims?: string[] }[] })
        .predicates.find((x) => x.kind === "evidence_class")?.claims ?? [];
      claimDetected = claimsHit.some((cl) => new RegExp(`\\b${cl}\\b`, "i").test(c.message));
    }
    if (!r.pass) return { verdict: "REJECT", detail: `REJECT(${r.token}): ${r.detail}\n  Authority: ${r.anchor}\n  Remedy: gek explain ${r.token}` };
  }
  // the armed gate: a completion claim or a judge verdict requires derived thresholds
  const needsThresholds = claimDetected || opts.check === "judge";
  if (needsThresholds && !thresholdsFresh && !process.env.GEK_REDTEAM) {
    const a = spec.predicates.find((x) => x.kind === "armed")?.anchor ?? "gate-spec";
    return { verdict: "REJECT", detail: `REJECT(GEK_NOT_ARMED): thresholds.json absent or stale — gek calibrate must run before the evidence class passes\n  Authority: ${a}\n  Remedy: gek explain GEK_NOT_ARMED` };
  }
  if (opts.check === "identity" || opts.check === "mechanical") return { verdict: "PASS", detail: "mechanical predicates green" };

  // the card + judge leg (gek-judge / full run)
  const law = lawExtract(opts.dir, spec.predicates.map((p) => p.anchor));
  const { state } = buildCard({ law, diff: c.diffText, message: c.message, evidence: JSON.stringify(c.evidence ?? {}) });
  const questions: Record<string, { type: "noul"; instructions: string }> = {};
  spec.cards[0].questions.forEach((q, i) => { questions[`Q${i + 1}`] = { type: "noul", instructions: q.q }; });
  const v = await askJudge(state, questions);
  const thresholds = thresholdsFresh ? JSON.parse(readFileSync(`${opts.dir}/thresholds.json`, "utf8")) : null;
  const t = thresholds?.["commit-substance-v1"] ?? { t_act: 0.5 };
  const bullets = Object.entries(v.ps);
  const maxBullet = Math.max(...bullets.map(([, p]) => p));
  const composite = maxBullet;   // v1: composite = max bullet (own/act flags arrive with the organ pass); thresholds derived on the same shape
  const ledger = process.env.XDG_STATE_HOME ?? `${process.env.HOME}/.local/state`;
  mkdirSync(`${ledger}/gek`, { recursive: true });
  appendFileSync(`${ledger}/gek/verdicts.jsonl`, JSON.stringify({ at: new Date().toISOString(), check: opts.check ?? "full", card_sha: String(state.length), composite, ps: v.ps, latency_ms: v.latency_ms }) + "\n");
  if (composite >= (t.t_act as number)) {
    const worst = bullets.sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, p]) => `${k} p=${p.toFixed(2)}`).join(", ");
    return { verdict: "REJECT", detail: `REJECT(GEK_JUDGE_REJECT): ${worst} ≥ t_act ${t.t_act}\n  Remedy: gek explain GEK_JUDGE_REJECT` };
  }
  return { verdict: "PASS", detail: `judge composite ${composite.toFixed(2)} < t_act ${t.t_act}` };
}

export async function runCheck(opts: CheckOpts, c: Commit): Promise<number> {
  return check(opts, c).then((r) => { console.log(r.verdict === "PASS" ? r.detail : r.detail); return r.verdict === "PASS" ? 0 : 2; })
    .catch((e: unknown) => { if (e instanceof Refusal) { console.error(`${e.token}: ${e.message}`); return 2; } console.error(`GEK_INTERNAL: ${String(e)}`); return 1; });
}
