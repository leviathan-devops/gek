# GEK BUILD_REPORT — the git enforcement kernel, v1.1 battery-hardened

## Executive summary
GEK compiles a project's design blueprint + execution workflow into that project's merge gates:
mechanical predicates + a local System One judge, enforced server-side (GitHub required checks on
self-hosted gek-host runners, branch protection strict + enforce_admins). Built P1→P8 per
design/DESIGN_BLUEPRINT_GEK_V1.md (validator PASS, 421 lines, commit 669b715); hardened by a
ten-attack red-team battery to 10/10 HELD; proven in production on PLUTUS_VISION (plutus-vision-v5:
the attach merged green; the 25-commit failure run REJECTED — GEK_CLAIM_WITHOUT_ORACLE on the
7f88717 m1-complete class).

## Architecture (what runs where)
```
 agent ─ git push (plain git; nothing local is a gate)
   └─ GitHub branch protection (strict, enforce_admins) ─ THE ENFORCEMENT
        ├─ gek-mechanical  ─ gek check --server --check=mechanical
        ├─ gek-identity    ─ ... --check=identity        } self-hosted runner (gek-host),
        └─ gek-judge       ─ ... --check=judge           } GEK_HOME outside every project repo
 kernel (GEK repo main 766f662):
   src/cli.ts:22        compile|install|calibrate|check|explain|status (JGM exit contract: 0 JSON / 1 internal / 2 refuse+remedy)
   src/spec-compile.ts  authority docs → gate-spec.json; EVERY rule carries file:line or gek:// anchors;
                        anchorless rules dropped+reported; declared-but-unparsed oracles REFUSE (GEK_ORACLE_MISSING)
   src/check.ts         THE execution order: identity → KERNEL-LEVEL PINS (spec/lock/thresholds — the
                        spec cannot pin itself, battery F) → armed → mech predicates → card+judge → ledger
   src/mech.ts          the predicate catalogue: root_identity (remote-based server identity), authority_pin,
                        oracle_pin, spec/lock/thresholds_pin, scope, token (turn/path-triggered),
                        evidence_class (claims + turn/phase-complete phrasing), constant_traced, ceremony
   src/card.ts          THE one Shape-S builder (checks + calibration share it): law 4k/diff 16k/message 2k/
                        evidence 3k BYTES (the judge's binding limit is 4,096 PROCESSED tokens — measured)
   src/judge.ts         :8090 imajev-4b; one batched request; fail-closed GEK_JUDGE_DOWN; raw kept on unparseable
   src/calibrate.ts     labels→thresholds; TRAIN zero-false; holdout; separation; refuses to arm thin
   locks/<project>.lock the kernel-side anchor (outside every project repo; GEK's own is self-referential — recorded)
```

## The decision record (why it is shaped this way)
- Mechanical gate + advisory judge: 4 calibration runs on the 40-row real corpus — composite gap
  -0.175, per-bullet interleaving; the 4B judge discriminates the hand-described flagship class
  (0.89 vs 0.08) but not real-diff ceremony rows. Three identical failures attacked the premise;
  every blocking guarantee became mechanical. The judge ledgered on every check, blocking ≥0.85.
- Kernel-level pins: a pin predicate inside the spec is attacker-deletable (battery F). The pins
  live in the kernel binary + GEK_HOME/locks/ — outside the committer's reach.
- PR-range judging: merge commits launder subjects (live: the decoy PR passed on its merge message).
- pull_request-only trigger: push events carry no GITHUB_BASE_REF; the :? guard refuses rather
  than defaults (no-fallback law; TTSR fires on ladders — it fired twice on me, both deleted with
  proof pairs).

## The build waves (gates green on every merge)
P1 scaffold+CLI · P2 compiler (PLUTUS v5.2 pair → 24 anchored predicates; skew/doctor/drift tests)
· P3 card+judge (separation matrix; the byte→token cap saga EN-G01) · P4 gek check + red-team 5/5
· P5 calibration (the honest advisory verdict) · P6 runners+protection (PR3 merged green) ·
P7 the PLUTUS attach (survived five honest rejections on its way in — EN-G08) · P8 the skill ·
PR8 kernel-first / PR10 spec (kernel-before-spec law) · PR11 the battery hardening (10/10).

## Bugs fixed (full entries: DEBUG_LOG.md EN-G01..G09)
The 4096-token server cap (measured ladder) · spec-pins-spec circularity · the silent-zero oracle
parse (the operator's ground truth had been UNPINNED in production) · the escaping regex-kill ·
merge laundering · the three workflow-expression bugs · runner topology traps · the polling burn.

## Container (runner) + server results
Every PR merged through the real three-check gate on the real runner; the decoy/tamper/replay PRs
BLOCKED with named tokens; artifacts: docs/test-artifacts/ (T1-T6 + ZERO-TRUST-REPORT-20261112.md).

## Residuals + artifact index
Pending: the reset-suite items (PR3 merge+anchor-hash, v5 tamper, pr-only workflow PR, PR2 final
state, PR7 close) — /tmp/gek-reset-suite.log when the window opens. Known limits: judge advisory;
GEK's self-anchor; the alert row never outage-fired; T7 was dry-run. Full index: CHECKPOINT_MANIFEST
of gek-v1.1-battery-hardened-20261112 (sealed) and this report's siblings.

## Proof of state
main = 766f662 (PR11, battery-hardened); both runners active; gek-runner-poll.timer active;
the battery 10/10 re-run on main; the skill project-gek updated with the nine laws; checkpoints
gek-v1-production-armed-20261112 + gek-v1.1-battery-hardened-20261112 sealed (Mode A).
