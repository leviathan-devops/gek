# GEK → PLUTUS_VISION — the operator sign-off pack (2026-11-11/12)

## What shipped (GEK @ 70739b0+)
- The kernel: `gek` CLI + spec compiler + Shape-S card builder + :8090 judge client + mechanical
  predicate runtime + calibration harness. 27 refusal tokens, JGM exit contract.
- Enforcement: GitHub required checks `gek-mechanical` / `gek-identity` / `gek-judge` on two
  supervised self-hosted runners (GEK-RUNTIME/runner, runner-v5), branch protection with
  enforce_admins on leviathan-devops/gek.
- Calibrated: mechanical = the blocking gate; judge = advisory signal (ledgered every check,
  blocking only in the measured clean-separation band ≥0.85). thresholds v2 + the full sweep
  report (corpus/calibration-report.json) on the 40-row real corpus.
- Server fix: imajev max_input_tokens 4096→env (service at 12,288; the measured 12 GB ceiling).

## The test ladder
- T1 red-team 6/6: three failure commits + decoy REJECT with named tokens; two benign PASS
  (runtime/test-artifacts/t1-core-six.txt).
- T2 tamper: every GEK artifact deleted from the branch → mergeStateStatus BLOCKED
  (t2-tamper-proof.txt).
- T3 calibration report: corpus/calibration-report.json (4 sweeps, honest 3/8 judge recall).
- T4 red/green: the decoy PR BLOCKED server-side (t4-red-pr-blocked.txt); PRs 3/4/5 merged green.
- T5 runner supervised + the minute alert timer (gek-runner-poll.timer; GEK_SERVER_TIER_DOWN rows).
- T7 second project: 5 commands → 6 anchored predicates (anchorless rules dropped+reported).

## P7/T6 — CLOSED (2026-11-12 03:00 UTC)
- plutus-vision-v5 public, rebuilt clean: bootstrap (step_agent lineage) + the MERGED attach
  (PR #1: manifest, 25-predicate gate-spec, the operator oracle byte-identical + sha-pinned,
  v2 thresholds, the three checks) + replay-failure-run (the true 7f88717 tip).
- Branch protection on bootstrap: strict, enforce_admins, the three gek checks required.
- THE REPLAY (PR #2): gek-judge REJECT(GEK_CLAIM_WITHOUT_ORACLE) — the m1-complete commit class
  is physically unmergeable. Proof: docs/test-artifacts/t6-replay-rejected.txt.
- The attach itself survived five honest rejections on its way in (scope x3, unknown predicate,
  authority anchor routing, claim-without-oracle on its own author's commit words) — each fixed
  at the cause, each named. The gate judged its own installer by the same law.
- GEK repo main carries the complete kernel (PR8 runtime + PR10 ceremony/spec, all three checks
  green on each merge); the project-gek skill is published (managed-skills/project-gek).

## The honest gaps (final)
- The judge layer is advisory by measurement (4B discrimination ceiling on real diffs); the
  mechanical layer carries the gate. Ceremony/infra classes are mechanical (GEK_CEREMONY);
  ~9 of 40 corpus rows remain uncategorized-by-any-detector (long tail, in the report).
- PLUTUS full-corpus calibration on ITS OWN history is pending (probe-5 thresholds active).
- The E1 engine work remains frozen per the operator's GEK-first ruling.
