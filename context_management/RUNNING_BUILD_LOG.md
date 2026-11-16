# RUNNING_BUILD_LOG — high-frequency build notes

PR8 (kernel-first, backwards-compatible runtime) → unblocked the spec PR10 (ceremony) → PR11 (pins).
v5 rebuilt twice (job-creation wedge after invalid workflows — EN-G06); runner B re-registered
per rebuild (EN-G07). The battery found A/F/G/H/J live; all closed same-session; the fix PR carried
the evidence and STILL met its own claims gate (reworded, artifacts carried).

## [2026-11-12T19:40Z] — GEK-LOCAL: the unskippable commit-time enforcement layer
- WHAT: Root-owned git hooks (pre-commit, commit-msg, reference-transaction) installed in the PLUTUS_VISION worktree's .git/hooks/. The reference-transaction hook is the mechanically unskippable enforcement point — fires on EVERY ref update (commits, resets, update-ref), cannot be bypassed with --no-verify.
- WHY: The server-side gate only fires at push/merge. A malicious agent working locally for days without pushing would never meet it. The local layer enforces the blueprint+workflow at COMMIT time, in the worktree, during the build.
- HOW: reference-transaction hooks fire inside git's ref-update machinery — no CLI flag skips them. Hooks are root-owned (agent runs as leviathan, cannot write root files). git's ownership check (CVE mitigation) blocks core.hooksPath to different-owner dirs; placing hooks in .git/hooks/ directly avoids this.
- KEY FINDING: The `while read` loop in reference-transaction must consume ALL stdin before evaluating — partial consumption loses the exit code (git 2.43). Fix: read all ref updates first, evaluate the last one, exit.
- THE JUDGE: CUDA OOM'd because a duplicate GGUF serving (beellama, 6.2 GiB) was co-resident. Killed the duplicate; the bf16 production judge (10.6 GiB) now loads with 10.4 GiB free. Auto-restart: Restart=always, RestartSec=5, enabled on boot.
- OMP CONFIG: The 5 bash-fence patterns I added were REVERTED per operator order (Opus precedent: 800 LOC that disabled all tools). The fencing suggestions are documented separately, not applied.
- EVIDENCE: test matrix in /tmp/gek-local-test: proper commit PASSES, garbage (claims/COMPLETE/MATCHED) REFUSED with GEK_CLAIM_WITHOUT_ORACLE, --no-verify DOES NOT BYPASS, resets GATED, hook editing DENIED.
- NEXT: the OMP fencing suggestions doc; the threat-model research incorporation; the canon update; the skill update.
