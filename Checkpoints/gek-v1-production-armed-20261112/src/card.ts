// src/card.ts — THE one Shape-S builder (blueprint §6): checks and calibration share this code
// byte-for-byte. SECTION BYTE BUDGETS (measured 2026-11-11): the judge answers HTTP 500
// The serving bug that hard-capped requests at 4,096 tokens was fixed 2026-11-11
// (production_server.py max_input_tokens, now env-tunable, default the model window). MEASURED
// ceiling on this 12 GB deployment: a 12k-token state passes (usage 8,913t, 3.4 s); 14k+ hits
// CUDA OOM (model 10.6 GiB + ~350 MiB activations > 12 GB). Budgets (bytes): law 4,000 / diff
// 16,000 (oldest hunks dropped first) / message 2,000 / evidence 3,000 — ~25k bytes ≈ 6.3k
// tokens + questions — half the measured ceiling, headroom for batch 32.
import { refuse } from "./tokens.ts";

export const BUDGET = { law: 4000, diff: 16000, message: 2000, evidence: 3000 } as const;

const cut = (s: string, cap: number): string => (Buffer.byteLength(s, "utf8") <= cap ? s : Buffer.from(s, "utf8").subarray(0, cap).toString("utf8").replace(/\n[^\n]*$/, ""));

export interface CardInput { law: string; diff: string; message: string; evidence: string }

export function buildCard(inp: CardInput): { state: string; truncated: boolean } {
  const law = cut(inp.law, BUDGET.law);
  const message = cut(inp.message, BUDGET.message);
  const evidence = cut(inp.evidence, BUDGET.evidence);
  // diff: drop the OLDEST hunks first (the newest changes carry the signal)
  let hunks = inp.diff.split(/(?=^@@ )/m).filter(Boolean);
  let truncated = false;
  while (hunks.length > 1 && Buffer.byteLength(hunks.join(""), "utf8") > BUDGET.diff) { hunks = hunks.slice(1); truncated = true; }
  let diff = hunks.join("");
  if (Buffer.byteLength(diff, "utf8") > BUDGET.diff) { diff = cut(diff, BUDGET.diff); truncated = true; }
  const state = `${law}\n\n>>> ${diff} <<<\n\nCOMMIT MESSAGE:\n${message}\n\nEVIDENCE ROWS:\n${evidence}`;
  const total = Buffer.byteLength(state, "utf8");
  if (total > 26_000) refuse("GEK_CARD_OVERSIZE", `card is ${total} bytes over the 26,000-byte budget (law ${Buffer.byteLength(law)}, diff ${Buffer.byteLength(diff)}, message ${Buffer.byteLength(message)}, evidence ${Buffer.byteLength(evidence)}) — the measured judge ceiling is ~12k tokens on this GPU`);
  return { state, truncated };
}
