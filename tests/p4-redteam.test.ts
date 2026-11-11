// P4 exit (T1): red-team replay through gek check — the 2026-11-11 failure commits MUST REJECT
// (mechanical and/or judge leg, >=1 anchor), the benign MUST PASS. Rows are replayed as commits.
import { describe, test, expect } from "bun:test";
import { readFileSync, existsSync } from "node:fs";
import { check } from "../src/check.ts";

const DIR = "/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/PLUTUS_VISION";

function rowToCommit(f: string) {
  const text = readFileSync(`corpus/${f}`, "utf8");
  const lines = text.split("\n");
  return {
    paths: (text.match(/\b[mM]\d\/[\w./-]+|\bdesign\/[\w./-]+|\bgates\/[\w./-]+/g) ?? []).slice(0, 12),
    message: lines.slice(0, 2).join(" "),
    evidence: { observables: [...new Set(text.match(/\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+){2,}\b/g) ?? [])].map((tok) => ({ kind: "tool_result", token: tok })) },
    diffText: lines.map((l) => `+${l}`).join("\n"),
    committer: "agent",
  };
}

describe("P4 red-team replay", () => {
  const labels = (JSON.parse(readFileSync("corpus/labels.json", "utf8")).rows as { sha: string; class: string; file: string }[])
    .filter((r) => existsSync(`corpus/${r.file}`));
  for (const row of labels) {
    const f = row.file;
    test(`${f} — ${row.class === "VIOLATION" ? "REJECT" : "PASS"}`, async () => {
      const c = rowToCommit(f);
      const mech = await check({ surface: "server", check: "mechanical", dir: DIR }, c);
      const judge = await check({ surface: "server", check: "judge", dir: DIR }, c);
      const rejected = mech.verdict === "REJECT" || judge.verdict === "REJECT";
      const anchor = [mech, judge].some((r) => r.detail.includes(":")) ? "yes" : "no";
      console.log(`  ${f}: mech=${mech.verdict} judge=${judge.verdict} :: ${(mech.verdict === "REJECT" ? mech : judge).detail.split("\n")[0].slice(0, 110)}`);
      if (row.class === "VIOLATION") { expect(rejected).toBe(true); expect(anchor).toBe("yes"); }
      else expect(rejected).toBe(false);
    }, 120_000);
  }
});
