#!/usr/bin/env bun
// src/cli.ts — gek <compile|install|calibrate|check|explain|status> (blueprint §14).
import { compile } from "./spec-compile.ts";
import { loadManifest, loadLock, writeLock, sha256 } from "./config.ts";
import { runCheck } from "./check.ts";
import { readFileSync } from "node:fs";

const [verb, ...rest] = Bun.argv.slice(2);
const dir = rest.find((a) => !a.startsWith("--")) ?? process.cwd();
const USAGE = `gek — the git enforcement kernel
  gek compile <dir>          authority docs → gate-spec.json + GEK.lock
  gek install <dir>          branch protection + required checks + runner registration
  gek calibrate <dir>        labeled corpus → thresholds.json (ARMED)
  gek check <dir> [--server|--explain] [--check mechanical|judge|identity]
  gek explain <TOKEN>        the remedy text for a refusal token
  gek status <dir>           lock, pins, armed state`;

switch (verb) {
  case undefined: case "--help": case "help": console.log(USAGE); process.exit(0);
  case "compile": {
    const m = loadManifest(dir);
    const r = compile(dir);
    const authority: Record<string, string> = {}; for (const rel of m.authority) authority[rel] = sha256(`${dir}/${rel}`);
    const oracles: Record<string, string> = {}; for (const o of m.oracles) oracles[o.path] = sha256(`${dir}/${o.path}`);
    writeLock(dir, { schema: 1, project: m.project, root: m.root, ...(m.remote ? { remote: m.remote } : {}), authority, oracles, gate_spec: sha256(`${dir}/gate-spec.json`), armed: false, server_checks: ["gek-mechanical", "gek-judge", "gek-identity"] });
    console.log(JSON.stringify({ ok: true, predicates: r.predicates, dropped: r.dropped, gate_spec: `${dir}/gate-spec.json` }));
    process.exit(r.dropped.length ? 0 : 0);
  }
  case "status": {
    const lock = loadLock(dir);
    console.log(JSON.stringify(lock ?? { ok: false, reason: "GEK_NOT_INSTALLED" }, null, 1)); process.exit(0);
  }
  case "check": {
    const surface = rest.includes("--explain") ? "explain" : "server";
    const checkKind = (rest.find((a) => a.startsWith("--check")) ?? "--check=full").split("=")[1] as never;
    // minimal commit capture for the server context: HEAD diff vs parent, message, evidence row if staged
    // THE PR RANGE with NO FALLBACK BASE: a single-commit capture launders violating subjects
    // out of the judged message (measured live: the decoy PR passed on its merge-commit message),
    // and a `|| HEAD~1` fallback would silently narrow the range when the base ref is missing.
    // A missing base refuses by name (fallback-slop law).
    // THE BASE IS REQUIRED AND SINGLE-SOURCED: no flag->env->default ladder. The workflow passes
    // --base=origin/$GITHUB_BASE_REF (the tracking-ref form; the bare name is NOT a ref). Absent
    // flag, empty base, or an unresolvable ref all refuse by name - never a substitute range.
    const baseArg = rest.find((a) => a.startsWith("--base="))?.split("=")[1]?.trim();
    if (!baseArg) {
      console.error("GEK_RANGE_BASE_UNAVAILABLE: --base=<ref> is required on the server check (pass --base=origin/$GITHUB_BASE_REF from the workflow). No default base exists - a default would silently narrow the judged range.");
      process.exit(2);
    }
    const baseRef = baseArg;
    const baseOk = Bun.spawnSync(["sh", "-c", `cd ${dir} && git rev-parse --verify ${baseRef}`], { stdout: "pipe" });
    if (baseOk.exitCode !== 0) {
      console.error(`GEK_RANGE_BASE_UNAVAILABLE: ${baseRef} does not resolve - the server check judges the PR RANGE and requires the base tracking-ref (actions/checkout fetch-depth: 0 fetches it). A narrowed range would silently hide commits. Remedy: pass the fetched tracking-ref form (origin/<branch>); never fall back.`);
      process.exit(2);
    }
    const proc = Bun.spawnSync(["sh", "-c", `cd ${dir} && git log --format=%B ${baseRef}..HEAD | head -80 && echo --- && git diff --name-only ${baseRef}..HEAD && echo --- && git diff ${baseRef}..HEAD | head -400`], { stdout: "pipe" });
    const out = proc.stdout.toString();
    const [message, names, diff] = out.split("\n---\n");
    const paths = (names ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
    // Evidence rows: the commit message may cite artifacts with 'Evidence: <path>' lines; they are
    // loaded into the card's evidence slot (the judge sees the measured numbers, not just a citation).
    const evidencePaths = [...(message ?? "").matchAll(/^Evidence:\s*(\S+)$/gm)].map((m) => m[1]);
    let evidence: { observables?: { kind: string; excerpt?: string; source?: string }[] } | null = null;
    if (evidencePaths.length) {
      try { evidence = { observables: evidencePaths.map((ep) => ({ kind: "tool_result", source: ep, excerpt: readFileSync(`${dir}/${ep}`, "utf8").slice(0, 1200) })) }; }
      catch { evidence = { observables: [] }; }
    }
    process.exit(await runCheck({ surface, check: checkKind, dir }, { paths, message: message ?? "", evidence, diffText: diff ?? "", committer: "" }));
  }
  case "explain": {
    const t = rest[0] ?? "";
    const map: Record<string, string> = {
      GEK_JUDGE_REJECT: "The card scored ≥ t_act on a substance question. Fix what the bullet names: cite the authority line, carry an oracle-metric evidence row, or land in the registered root — then re-run gek check --explain.",
      GEK_CLAIM_WITHOUT_ORACLE: "The message claims completion but no oracle_metric observable is carried. Add an evidence row citing an operator-owned oracle file with the measured value.",
      GEK_CONSTANT_UNTRACED: "A new numeric constant has no source. Add a `source: <authority>:<line>` comment or a derivation in the evidence rows.",
      GEK_AUTHORITY_DRIFT: "An authority document changed past its pin. Run gek compile && gek calibrate in the SAME commit as the doc change.",
      GEK_WORKSPACE_FOREIGN: "The commit is outside the registered root. Move the work into the root named in GEK.lock.",
      GEK_NOT_ARMED: "thresholds.json is absent or stale. Run gek calibrate (needs ≥20 labeled negatives).",
    };
    console.log(map[t] ?? `No remedy text for ${t} — see design/DESIGN_BLUEPRINT_GEK_V1.md §11.`); process.exit(0);
  }
  case "install": case "calibrate": console.error(`${verb.toUpperCase()}_PENDING: ${verb} lands in P5/P6 per the build sequence`); process.exit(2);
  default: console.error(`unknown verb ${verb}`); console.log(USAGE); process.exit(2);
}
