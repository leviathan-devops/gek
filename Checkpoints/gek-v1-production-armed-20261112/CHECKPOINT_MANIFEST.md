# CHECKPOINT_MANIFEST — gek-v1-production-armed-20261112

- State: GEK v1 production-armed. Both runners active; PLUTUS_VISION re-armed (plutus-vision-v5, bootstrap protected strict+enforce_admins); the replay PR #2 REJECTED (GEK_CLAIM_WITHOUT_ORACLE on the 7f88717 class).
- src/: 9 modules (cli, config, tokens, spec-compile, card, judge, mech, check, calibrate) — the complete kernel.
- corpus/: the 40-row labeled real corpus + calibration-report.json (4 sweeps) + judge-capacity-ladder.json.
- gates: main b3173a5 (PR8 runtime + PR10 ceremony/spec); every merge passed its own three checks.
- visual/runtime-state.png: the live check output + runner/PR state rendered (no GUI runtime; the check IS the runtime).
- HONEST GAPS: judge advisory by measurement (mechanical carries the gate); PR7 branch superseded; PLUTUS E1 engine frozen per operator ruling.

- SEAL CORRECTION (2026-11-12): chattr +i is NOT PERMITTED on this filesystem ("Operation not permitted", verified) — the earlier "SEALED" lines were silent failures. This checkpoint is MODE B (documented mutable): the manifest attests the state at write time; tamper-evidence comes from the git history (the checkpoint is committed) + the kernel-side anchors, not from filesystem immutability.
