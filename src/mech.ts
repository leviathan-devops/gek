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

export function evaluate(pred: { kind: string; expect?: string; in?: string; allow?: string[]; deny?: string[]; claims?: string[]; requires_oracle_metric?: boolean; anchor: string }, c: Commit, ctx: { root: string; toplevel: string; authority: Record<string, string>; oracles: Record<string, string>; thresholdsFresh: boolean }): Result {
  const ok = (): Result => ({ pass: true, anchor: pred.anchor });
  const bad = (token: Token, detail: string): Result => ({ pass: false, token, detail, anchor: pred.anchor });
  switch (pred.kind) {
    case "root_identity":
      return ctx.toplevel === ctx.root ? ok() : bad("GEK_WORKSPACE_FOREIGN", `commit root ${ctx.toplevel} != registered ${ctx.root}`);
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
      const surface = pred.in === "message" ? c.message : JSON.stringify(c.evidence ?? {}) + c.paths.join(" ");
      if (pred.in === "artifact" && !surface.includes(pred.expect!)) return bad("GEK_PHASE_TOKEN_MISSING", `'${pred.expect}' absent from the commit's evidence/paths`);
      if (pred.in === "message" && !surface.includes(pred.expect!)) return bad("GEK_PHASE_TOKEN_MISSING", `'${pred.expect}' absent from the message`);
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
        if (/^\+.*\d{2,}\s*\*\s*\d{5,}/.test(line) && !/source:/.test(line) && !/\/\//.test(line)) {
          const num = /\d{2,}\s*\*\s*\d{5,}/.exec(line)?.[0];
          return bad("GEK_CONSTANT_UNTRACED", `new constant '${num}' without a source: comment citing authority (line: ${line.slice(0, 100)})`);
        }
      }
      return ok();
    }
    default: return bad("GEK_PREDICATE_UNEVALUABLE", `unknown predicate kind ${pred.kind}`);
  }
}
