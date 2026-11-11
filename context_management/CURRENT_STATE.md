# CURRENT_STATE — GEK at a glance

- Kernel: main 766f662 (PR11). Modules: cli/config/tokens/spec-compile/card/judge/mech/check/calibrate (src/).
- Gate shape: mechanical = blocking; judge = advisory (ledgered, blocking ≥0.85).
- Pins: kernel-level (spec/lock/thresholds — src/check.ts pins block; the spec cannot pin itself).
- Anchors: locks/GEK.lock (self-referential — recorded gap), locks/PLUTUS_VISION.lock (external).
- Runners: actions.runner.leviathan-devops-{gek,plutus-vision-v5}.LeviathanLocal — both active, label gek-host.
- Alert: gek-runner-poll.timer (user unit) — minute polls, GEK_SERVER_TIER_DOWN row on 2 misses.
- Judge: :8090 imajev-4b healthy; IMAJEV_MAX_INPUT_TOKENS=12288 (drop-in gek-capacity.conf).
- Production: plutus-vision-v5 — attach merged (PR1), hardened re-attach PR3 (runner-green, merge
  pending the API window), replay PR2 REJECTED, bootstrap protected strict+enforce_admins.
- Skill: managed-skills/project-gek (five commands, nine laws).
- Checkpoints: gek-v1-production-armed-20261112, gek-v1.1-battery-hardened-20261112 (both Mode A).
