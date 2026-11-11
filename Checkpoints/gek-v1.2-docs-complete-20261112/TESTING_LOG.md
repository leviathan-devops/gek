# GEK TESTING_LOG — the plan + the results (local, container=runner, server=GitHub)

## The instruments
- tests/redteam-battery.ts — THE ten-attack adversarial suite; every attack through the full three-leg merge bar; a hold counts ONLY when the attack meets its OWN named pin. Run: `GEK_REDTEAM=1 bun run tests/redteam-battery.ts`. Non-time-dependent: no sleeps, no waits, pure check calls + file mutations (deterministic).
- tests/p3-separation.test.ts — the judge card's separation control on the probe corpus (live judge).
- tests/p4-redteam.test.ts — the labeled-corpus replay (labels.json is the source of truth, never filename prefixes).
- corpus/calibration-report.json — 4 sweep tables; thresholds are outputs, never typed.
- docs/test-artifacts/ — T1-T6 + the zero-trust report, each with its captured output.

## The scenario matrix (final states)
| Scenario | Verdict | Artifact |
|---|---|---|
| T1 red-team core six (7f88717/7d1e6a9/2f81ff44/a16b2ad/9511e56/decoy) | 6/6 (3 REJECT + decoy REJECT, 2 PASS) | docs/test-artifacts/t1-core-six.txt |
| T2 tamper (GEK deleted from branch) | mergeStateStatus BLOCKED | t2-tamper-proof.txt |
| T3 calibration | 4 sweeps recorded; holdout 0 false; judge recall 3/8 honest → mechanical gate + advisory judge | corpus/calibration-report.json |
| T4 bad PR blocked / good merged | decoy PR2 judge-leg REJECT; PR8/10/11 merged green | t4-red-pr-blocked.txt + PR history |
| T5 supervision | runners active; gek-runner-poll.timer active (minute polls; GEK_SERVER_TIER_DOWN on 2 misses) | systemctl state |
| T6 the replay | PR2 v5: gek-judge REJECT(GEK_CLAIM_WITHOUT_ORACLE) — the 7f88717 class unmergeable | t6-replay-rejected.txt |
| T7 universality | second project: 5 commands → 11 anchored predicates, anchorless rules dropped+reported | skill project-gek |
| Battery A-K (oracle/authority/claim-case/laundering/scope/spec/lock/thresholds/forgery/ceremony) | 10/10 HELD | ZERO-TRUST-REPORT-20261112.md |

## Pending (the reset suite at /tmp/gek-reset-suite.sh, self-firing on the API window)
- T-A: v5 PR3 contexts + merge + post-merge lock==anchor hash check
- T-B: replay PR2 final mergeStateStatus capture
- T-C: the pull_request-only workflow lands via PR
- T-D: the tamper test ON v5 (must BLOCK)
- T-E: stale PR7 closed

## Honest gaps
- The judge stays advisory by measurement (4B ceiling on real diffs) — every blocking guarantee is mechanical.
- The GEK repo's own lock anchor lives inside its own tree (self-referential; every other project's is external).
- The alert timer's DOWN row has never fired on a real outage (exercise: stop the judge 2 min, read the row).
- No second project has run the FULL path (remote + runner + merge) — T7 was the local dry-run.
