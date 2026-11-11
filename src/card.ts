// src/card.ts — THE one Shape-S builder (blueprint §6): checks and calibration share this code
// byte-for-byte. SECTION BYTE BUDGETS (measured 2026-11-11): the judge answers HTTP 500
// "Processed request exceeds the 4096-token limit" past 4,096 tokens — /health's 24,000-char
// ceiling is NOT the binding constraint. Budgets (bytes, UTF-8): law 2,000 (never cut mid-line),
// diff 6,000 (oldest hunks dropped first), message 1,000, evidence 1,500 — total ~10.5k ≈ 2.6k
// tokens + questions (~250 tokens) — under the limit with headroom.
import { refuse } from "./tokens.ts";

export const BUDGET = { law: 2000, diff: 6000, message: 1000, evidence: 1500 } as const;

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
  if (total > 11_000) refuse("GEK_CARD_OVERSIZE", `card is ${total} bytes over the 11,000-byte token-safe budget (law ${Buffer.byteLength(law)}, diff ${Buffer.byteLength(diff)}, message ${Buffer.byteLength(message)}, evidence ${Buffer.byteLength(evidence)})`);
  return { state, truncated };
}
