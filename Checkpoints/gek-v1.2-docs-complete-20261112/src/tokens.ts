// src/tokens.ts — the failure-token contract (blueprint §11). JGM convention: exit 2 + remedy text.
export const TOKENS = [
  "GEK_SPEC_MISSING", "GEK_AUTHORITY_MISSING", "GEK_AUTHORITY_DRIFT", "GEK_ORACLE_MISSING",
  "GEK_ORACLE_DRIFT", "GEK_ORACLE_SELF_AUTHORED", "GEK_CONSTANT_UNTRACED", "GEK_CEREMONY", "GEK_SPEC_DRIFT", "GEK_LOCK_DRIFT", "GEK_THRESHOLDS_DRIFT", "GEK_WORKSPACE_FOREIGN",
  "GEK_JUDGE_DOWN", "GEK_JUDGE_UNPARSEABLE", "GEK_CARD_OVERSIZE", "GEK_PREDICATE_UNEVALUABLE",
  "GEK_CLAIM_WITHOUT_ORACLE", "GEK_PHASE_TOKEN_MISSING", "GEK_SCOPE_VIOLATION",
  "GEK_CALIBRATION_FAILED", "GEK_CALIBRATION_STALE", "GEK_CORPUS_THIN", "GEK_NOT_ARMED",
  "GEK_NOT_INSTALLED", "GEK_REDTEAM_LEAK", "GEK_BUILDER_DRIFT", "GEK_FEEDBACK_VACUOUS",
  "GEK_SERVER_TIER_DOWN", "GEK_COMPILE_ANCHORLESS", "GEK_INTERNAL", "GEK_RANGE_BASE_UNAVAILABLE",
] as const;
export type Token = (typeof TOKENS)[number];
export class Refusal extends Error {
  constructor(public token: Token, public detail: string) { super(`${token}: ${detail}`); }
}
export function refuse(token: Token, detail: string): never {
  throw new Refusal(token, detail);
}
