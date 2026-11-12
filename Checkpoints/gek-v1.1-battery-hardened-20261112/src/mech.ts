// src/mech.ts — the predicate runtime (blueprint §5 catalogue). Pure functions over
// (gate-spec, diff paths, message, evidence, lock, disk) — no git side effects.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { refuse, type Token } from "./tokens.ts";

export interface Commit { paths: string[]; message: string; evidence: { observables?: { kind: string; metric?: string; value?: number }[] } | null; diffText: string; lastOracleAuthor?: string; committer: string }
export interface Result { pass: boolean; token?: Token; detail?: string; anchor?: string }

const glob = (pat: string, p: string): boolean => {
  const re = new RegExp("^" + pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "\u0000").replace(/\*/g, "[^/]*").replace(/\u0000/g, ".*") + "$");
  return re.test(p);
};

export function evaluate(pred: { kind: string; expect?: string; in?: string; allow?: string[]; deny?: string[]; claims?: string[]; requires_oracle_metric?: boolean; anchor: string }, c: Commit, ctx: { root: string; toplevel: string; remote?: string; authority: Record<string, string>; oracles: Record<string, string>; thresholdsFresh: boolean; specPin?: string; lockAnchor?: string; thresholdsPin?: string }): Result {
  const ok = (): Result => ({ pass: true, anchor: pred.anchor });
  const bad = (token: Token, detail: string): Result => ({ pass: false, token, detail, anchor: pred.anchor });
  switch (pred.kind) {
    case "root_identity": {
      // SERVER IDENTITY = THE REGISTERED REMOTE (a runner checkout lives anywhere); the local
      // path check remains for the explain context. Normalized: git@h:o/r == https://h/o/r.git
      const norm = (x: string): string => x.replace(/^git@([^:]+):/, "https://$1/").replace(/\.git$/, "").toLowerCase().replace(/\/$/, "");
      const want = (ctx as { remote?: string }).remote;
      if (want) {
        if (!ctx.remote) return bad("GEK_WORKSPACE_FOREIGN", "no origin remote on this checkout — a server check requires one");
        return norm(ctx.remote) === norm(want) ? ok() : bad("GEK_WORKSPACE_FOREIGN", `remote ${ctx.remote} != registered ${want}`);
      }
      return ctx.toplevel === ctx.root ? ok() : bad("GEK_WORKSPACE_FOREIGN", `commit root ${ctx.toplevel} != registered ${ctx.root}`);
    }
    case "authority_pin":
      for (const [rel, sha] of Object.entries(ctx.authority)) {
        let disk: string;
        try { disk = createHash("sha256").update(readFileSync(`${ctx.toplevel}/${rel}`)).digest("hex"); }
        catch { return bad("GEK_AUTHORITY_MISSING", `${rel} unreadable at check time`); }
        if (disk !== sha) return bad("GEK_AUTHORITY_DRIFT", `${rel} sha ${disk.slice(0, 12)} != pinned ${sha.slice(0, 12)} — recompile+recalibrate in the same commit`);
      }
      return ok();
    case "oracle_pin":
      for (const [rel, sha] of Object.entries(ctx.oracles)) {
        let disk: string;
        try { disk = createHash("sha256").update(readFileSync(`${ctx.toplevel}/${rel}`)).digest("hex"); }
        catch { return bad("GEK_ORACLE_MISSING", `${rel} unreadable — oracle files are mandatory for the evidence class`); }
        if (disk !== sha) return bad("GEK_ORACLE_DRIFT", `${rel} drifted — operator re-pin required`);
      }
      if (ctx.oracles["__selfauth__"]) return bad("GEK_ORACLE_SELF_AUTHORED", "an oracle file was modified by the committer");
      return ok();
    case "spec_pin": {
      // the gate-spec is the GATE ITSELF: a committer who weakens it must never pass.
      // Pin: the spec's sha256 must equal the lock's gate_spec AND the kernel-side anchor
      // (GEK_HOME/locks/<project>.lock) — an anchor outside the repo the committer controls.
      const specSha = createHash("sha256").update(readFileSync(`${ctx.toplevel}/gate-spec.json`)).digest("hex");
      if (ctx.specPin && specSha !== ctx.specPin) return bad("GEK_SPEC_DRIFT", `gate-spec sha ${specSha.slice(0, 12)} != pinned ${ctx.specPin.slice(0, 12)} — the gate itself was modified. Remedy: restore the spec or land a recompile+recalibrate with an operator ticket`);
      return ok();
    }
    case "lock_pin": {
      const lockSha = createHash("sha256").update(readFileSync(`${ctx.toplevel}/GEK.lock`)).digest("hex");
      if (ctx.lockAnchor && lockSha !== ctx.lockAnchor) return bad("GEK_LOCK_DRIFT", `GEK.lock sha ${lockSha.slice(0, 12)} != the kernel-side anchor ${ctx.lockAnchor.slice(0, 12)} — the pins were tampered. Remedy: operator re-anchors via gek install`);
      return ok();
    }
    case "thresholds_pin": {
      let thSha: string;
      try { thSha = createHash("sha256").update(readFileSync(`${ctx.toplevel}/thresholds.json`)).digest("hex"); }
      catch { return ok(); }   // absent thresholds -> the armed gate refuses separately
      if (ctx.thresholdsPin && thSha !== ctx.thresholdsPin) return bad("GEK_THRESHOLDS_DRIFT", `thresholds sha ${thSha.slice(0, 12)} != pinned — recalibration requires an operator ticket`);
      return ok();
    }
    case "armed":
      return ctx.thresholdsFresh ? ok() : bad("GEK_NOT_ARMED", "thresholds.json absent or stale — gek calibrate must run before the evidence class passes");
    case "scope": {
      for (const p of c.paths) {
        if ((pred.deny ?? []).some((d) => glob(d, p))) return bad("GEK_SCOPE_VIOLATION", `${p} matches deny '${pred.deny!.join(",")}'`);
        if (!(pred.allow ?? ["**"]).some((a) => glob(a, p))) return bad("GEK_SCOPE_VIOLATION", `${p} matches no allow pattern`);
      }
      return ok();
    }
    case "token": {
      const trig = (pred as { trigger?: string }).trigger;
      const turn = (pred as { turn?: string }).turn;
      if (turn && !c.message.includes(turn)) return ok();   // turn tokens apply to commits executing that turn
      if (trig && !c.paths.some((p2) => glob(trig, p2))) return ok();   // trigger glob not hit: N/A
      const surface = pred.in === "message" ? c.message : JSON.stringify(c.evidence ?? {}) + c.paths.join(" ");
      if (!surface.includes(pred.expect!)) return bad("GEK_PHASE_TOKEN_MISSING", `'${pred.expect}' absent from the ${pred.in === "message" ? "message" : "commit's evidence/paths"}`);
      return ok();
    }
    case "evidence_class": {
      const claims = pred.claims ?? [];
      const claimRe = (cl: string) => new RegExp(`\\b${cl}\\b`, "i");
      const hit = claims.find((cl) => claimRe(cl).test(c.message))
        ?? (/\b(turn|phase)\b.{0,24}\b(done|complete|completed|finished|green|pass)\b/i.test(c.message) ? "turn-complete" : undefined)
        ?? (/\bP\d\b.{0,24}\b(done|complete|completed|finished)\b/i.test(c.message) ? "phase-complete" : undefined);
      if (!hit) return ok();
      const hasOracle = (c.evidence?.observables ?? []).some((o) => o.kind === "oracle_metric" && typeof o.value === "number");
      return pred.requires_oracle_metric && !hasOracle
        ? bad("GEK_CLAIM_WITHOUT_ORACLE", `message claims '${hit}' but no oracle_metric observable is carried — a completion claim requires operator ground truth`)
        : ok();
    }
    case "ceremony": {
      // docs/ledger-only diff + advancement language + no gate token = bookkeeping sold as progress
      const docsOnly = c.paths.length > 0 && c.paths.every((p2) => /\.(md|jsonl|json)$/.test(p2) && !/(package|tsconfig)\.json$/.test(p2));
      const codeFiles = c.paths.some((p2) => /\.(ts|js|py|sh|pine|yml|yaml)$/.test(p2));
      const adv = /(progress|turns? the corner|advanc|reconcil|record|landed|seal|complete|evidence)/i.test(c.message);
      const hasToken = (c.evidence?.observables ?? []).some((o) => (o as { token?: string }).token) || /(R36|DERIVED|_OK|PV-Gate|GEK_)[A-Z0-9_: -]{3,}/.test(c.message + c.diffText.slice(0, 4000));
      if (docsOnly && !codeFiles && adv && !hasToken) return bad("GEK_CEREMONY", "docs/ledger-only diff carrying advancement language with no gate token - bookkeeping is not progress; land it under a turn with its named token or fold it into the code commit");
      return ok();
    }
    case "constant_traced": {
      for (const line of c.diffText.split("\n")) {
        if (/^\+.*\b\d+\s*\*\s*\d{5,}\b/.test(line) && !/source:/.test(line) && !/\/\//.test(line)) {
          const num = /\d+\s*\*\s*\d{5,}/.exec(line)?.[0];
          return bad("GEK_CONSTANT_UNTRACED", `new constant '${num}' without a source: comment citing authority (line: ${line.slice(0, 100)})`);
        }
      }
      return ok();
    }
    default: return bad("GEK_PREDICATE_UNEVALUABLE", `unknown predicate kind ${pred.kind}`);
  }
}
