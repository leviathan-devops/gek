# BUILD_STATE — the SHA chain

- blueprint: design/DESIGN_BLUEPRINT_GEK_V1.md @669b715 (validator PASS; the skill now enforces the register)
- kernel main: 766f662 (PR11 battery hardening) ← 3384632 (PR10 ceremony+spec) ← af0580e (PR8 kernel-first)
- production attach: plutus-vision-v5 bootstrap (PR1 merged; PR3 hardened — pending window)
- oracle anchor: locks/PLUTUS_VISION.lock = the merged GEK.lock sha (T-A2 verifies)
- thresholds: v2 (40-row corpus; sweep tables in corpus/calibration-report.json)
- server: models/servers/imajev/production_server.py max_input_tokens env 12288 (bak: .bak-4096-*)
- frozen artifacts: the two sealed checkpoints (Mode A)
