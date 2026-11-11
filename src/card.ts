// src/card.ts — THE one Shape-S builder (blueprint §6): checks and calibration share this code
// byte-for-byte. Truncation law: oldest diff hunks dropped first; the law extract is never cut.
import { refuse } from "./tokens.ts";

export const STATE_CAP = 24000;
export interface CardInput { law: string; diff: string; message: string; evidence: string }

export function buildCard(inp: CardInput): { state: string; truncated: boolean } {
  const mark = (s: string) => `>>> ${s} <<<`;
  let state = `${inp.law}\n\n${mark(inp.diff)}\n\nCOMMIT MESSAGE:\n${inp.message}\n\nEVIDENCE ROWS:\n${inp.evidence}`;
  let truncated = false;
  while (state.length > STATE_CAP) {
    // drop the OLDEST diff hunk (first @@ block after the marker) — law text never cut
    const m = />>> ([\s\S]*?)<<</.exec(state);
    if (!m) refuse("GEK_CARD_OVERSIZE", `card is ${state.length} chars with no diff left to drop`);
    const hunks = m[1].split(/(?=^@@ )/m);
    if (hunks.length <= 1) refuse("GEK_CARD_OVERSIZE", `card is ${state.length} chars — the law extract alone exceeds the cap`);
    truncated = true;
    state = state.replace(m[0], `>>> ${hunks.slice(1).join("")} <<<`);
  }
  return { state, truncated };
}
