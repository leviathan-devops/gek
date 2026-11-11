// src/card.ts — THE one Shape-S builder (blueprint §6): checks and calibration share this code
// byte-for-byte. Truncation law: oldest diff hunks dropped first; the law extract is never cut.
import { refuse } from "./tokens.ts";

export const STATE_CAP = 11_000;   // BYTES ≈ a token-safe budget. MEASURED 2026-11-11: the judge
                                    // answers HTTP 500 "Processed request exceeds the 4096-token
                                    // limit" when the state+questions exceed 4,096 tokens. English
                                    // prose ≈ 4 chars/token, so 11,000 bytes + the question set
                                    // (~250 tokens) sits under the limit with headroom. The
                                    // /health "state_char_cap: 24000" is the CHAR ceiling, NOT the
                                    // binding constraint — the token limit binds first.
export interface CardInput { law: string; diff: string; message: string; evidence: string }

export function buildCard(inp: CardInput): { state: string; truncated: boolean } {
  const mark = (s: string) => `>>> ${s} <<<`;
  let state = `${inp.law}\n\n${mark(inp.diff)}\n\nCOMMIT MESSAGE:\n${inp.message}\n\nEVIDENCE ROWS:\n${inp.evidence}`;
  let truncated = false;
  while (Buffer.byteLength(state, "utf8") > STATE_CAP) {
    // drop the OLDEST diff hunk (first @@ block after the marker) — law text never cut
    const m = />>> ([\s\S]*?)<<</.exec(state);
    if (!m) refuse("GEK_CARD_OVERSIZE", `card is ${Buffer.byteLength(state)} bytes with no diff left to drop`);
    const hunks = m[1].split(/(?=^@@ )/m);
    if (hunks.length <= 1) refuse("GEK_CARD_OVERSIZE", `card is ${Buffer.byteLength(state)} bytes — the law extract alone exceeds the cap`);
    truncated = true;
    state = state.replace(m[0], `>>> ${hunks.slice(1).join("")} <<<`);
  }
  return { state, truncated };
}
