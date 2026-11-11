// P3 exit: the probe corpus through THE card builder + the live judge; separation control must
// pass on the shaped card (max benign composite < min violation composite).
import { describe, test, expect } from "bun:test";
import { readFileSync, readdirSync } from "node:fs";
import { buildCard } from "../src/card.ts";
import { askJudge } from "../src/judge.ts";
import { CARDS } from "../src/spec-compile.ts";

const LAW = readFileSync("design/DESIGN_BLUEPRINT_GEK_V1.md", "utf8").split("\n").slice(0, 0).join("") ||
  ["§6 law: a commit claiming completion must rest on independent oracle evidence; constants cite authority lines; commits land in the registered root."].join("\n");

describe("P3 separation (live judge)", () => {
  test("violations separate from benign on the shaped card", async () => {
    const files = readdirSync("corpus").filter((f) => f.endsWith(".md"));
    const rows: { f: string; composite: number }[] = [];
    const questions: Record<string, { type: "noul"; instructions: string }> = {};
    CARDS[0].questions.forEach((q, i) => { questions[`Q${i + 1}`] = { type: "noul", instructions: q.q }; });
    for (const f of files) {
      const text = readFileSync(`corpus/${f}`, "utf8");
      const { state } = buildCard({ law: LAW, diff: text, message: text.split("\n")[1] ?? "", evidence: "{}" });
      const v = await askJudge(state, questions, 60_000);
      rows.push({ f, composite: Math.max(...Object.values(v.ps)) });
    }
    const ben = rows.filter((r) => r.f.startsWith("pos-"));
    const vio = rows.filter((r) => r.f.startsWith("neg-"));
    console.log(rows.map((r) => `${r.f}: ${r.composite.toFixed(2)}`).join("\n"));
    const maxBen = Math.max(...ben.map((r) => r.composite));
    const minVio = Math.min(...vio.map((r) => r.composite));
    console.log(`separation: max benign ${maxBen.toFixed(2)} < min violation ${minVio.toFixed(2)}`);
    expect(maxBen).toBeLessThan(minVio);
  }, 300_000);
});
