# NEXT_STEPS — the queue (2026-11-12 19:45Z)

## Immediate (the local enforcement rollout)
1. Wire the root-owned hooks into the BUILD WORKTREE the agent will use (not the source main) —
   the goal prompt mandates an isolated clean worktree at bfa05c4; the hooks install there.
2. Prove the local gate in the worktree: garbage commit refused, proper commit passes, --no-verify dead.
3. The OMP fencing decision: docs/OMP-FENCING-SUGGESTIONS.md (operator reads, decides, applies one at a time)

## Near-term
4. The E1 build under GEK: paste the goal prompt; the agent works in the gated worktree;
   every commit meets the gate; the server tier holds at merge.
5. Exercise the alert row: stop the judge 2 min → GEK_SERVER_TIER_DOWN row → restart.
6. T7 full path: a second project through remote + runner + merge.

## Risk register
- Judge advisory by measurement (mechanical carries the gate)
- GEK's self-anchor
- OMP fence patterns must be tested in isolation (the Opus 800-LOC precedent)
- Rate-limit discipline: read runner logs + tees, budget API calls
