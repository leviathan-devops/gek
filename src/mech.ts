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

export function evaluate(pred: { kind: string; expect?: string; in?: string; allow?: string[]; deny?: string[]; claims?: string[]; requires_oracle_metric?: boolean; anchor: string }, c: Commit, ctx: { root: string; toplevel: string; remote?: string; authority: Record<string, string>; oracles: Record<string, string>; thresholdsFresh: boolean }): Result {
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
      const hit = claims.find((cl) => new RegExp(`\\b${cl}\\b`, "i").test(c.message));
      if (!hit) return ok();
      const hasOracle = (c.evidence?.observables ?? []).some((o) => o.kind === "oracle_metric" && typeof o.value === "number");
      return pred.requires_oracle_metric && !hasOracle
        ? bad("GEK_CLAIM_WITHOUT_ORACLE", `message claims '${hit}' but no oracle_metric observable is carried — a completion claim requires operator ground truth`)
        : ok();
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
