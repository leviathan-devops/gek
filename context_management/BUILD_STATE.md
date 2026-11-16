# BUILD_STATE — the SHA chain (2026-11-12 19:45Z)

- Blueprint: design/DESIGN_BLUEPRINT_GEK_V1.md @669b715 (validator PASS + selftest PASS)
- Kernel main: PR12 merged (docs+fixtures+capture-fix+battery) — includes all battery hardening
- Production: plutus-vision-v5 bootstrap (attach PR3 merged; replay PR2 REJECTED; tamper PR4 BLOCKED)
- Local enforcement: root-owned hooks in PLUTUS_VISION/.git/hooks/{pre-commit,commit-msg,reference-transaction}
- Kernel-side anchor: locks/PLUTUS_VISION.lock = the merged production GEK.lock sha
- Thresholds: v2 (40-row corpus, sweep tables in corpus/calibration-report.json)
- Judge: models/servers/imajev/production_server.py max_input_tokens env 12288 (measured ceiling)
- Judge service: Restart=always, RestartSec=5, boot-enabled (the CUDA OOM root-caused to beellama co-residency)
- Checkpoints: gek-v1-production-armed, gek-v1.1-battery-hardened, gek-v1.2-docs-complete (Mode B: chattr unavailable on this fs)
- Threat model: docs/THREAT-MODEL.md (the empirical evidence base for the guardrail design)
- OMP fencing: documented, NOT applied (operator decision)
