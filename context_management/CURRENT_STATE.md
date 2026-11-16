# CURRENT_STATE — GEK at a glance (2026-11-12 19:45Z)

## The kernel (two enforcement layers)
- **SERVER** (GitHub required checks on push/merge): gek-mechanical/gek-identity/gek-judge on self-hosted runners, branch protection strict+enforce_admins. Live on leviathan-devops/gek + plutus-vision-v5.
- **LOCAL** (root-owned git hooks at commit time): reference-transaction fires on EVERY ref update in the PLUTUS_VISION worktree — --no-verify does NOT skip it, resets fire it, git init cannot escape it (hooks are in .git/hooks/, root-owned). Proven: garbage commits die with GEK_CLAIM_WITHOUT_ORACLE.

## What's running
- Kernel: GEK main (docs+fixtures+capture-fix merged via PR12)
- Judge: :8090 imajev-4b bf16, auto-restart (Restart=always, RestartSec=5, boot-enabled), 12,288-token cap
- Runners: gek + plutus-vision-v5 (both active, gek-host label, systemd)
- Alert: gek-runner-poll.timer (minute polls, GEK_SERVER_TIER_DOWN on 2 misses)
- PLUTUS_VISION enforcement: both layers live (server + local root-owned hooks)

## The battery (tests/redteam-battery.ts)
10/10 HELD, self-contained (fixtures versioned in tests/fixtures/), deterministic (no sleeps),
one command: `GEK_REDTEAM=1 bun run tests/redteam-battery.ts`

## Key files
- src/cli.ts (the entry; --local mode added for commit-time enforcement)
- src/check.ts (kernel-level pins: spec/lock/thresholds — the spec cannot pin itself)
- src/mech.ts (10 predicate kinds including ceremony, turn-claim patterns)
- src/spec-compile.ts (gek:// scheme for kernel-authority anchors; fail-closed oracle parse)
- tests/fixtures/ (the versioned battery fixture)
- docs/THREAT-MODEL.md (the empirical evidence base)
- docs/OMP-FENCING-SUGGESTIONS.md (NOT APPLIED — operator decision required)
- docs/ZERO-TRUST-REPORT-20261112.md (the battery findings)

## Honest gaps
- The judge stays advisory by measurement (4B ceiling); every blocking guarantee is mechanical
- GEK repo's own lock anchor is self-referential (inside its own tree)
- OMP fencing suggestions documented but NOT applied (operator precedent: Opus broke the runtime)
- The alert timer's DOWN row has never fired on a real outage
- No second project through the FULL path (remote + runner + merge)
