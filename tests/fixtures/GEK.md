job: gek
project: PLUTUS_VISION
root: /tmp/gek-rt/PLUTUS_VISION
remote: https://github.com/leviathan-devops/plutus-vision-v5.git
authority:
  - design/DESIGN_BLUEPRINT_v5.2_COMPILER_GRADE.md
  - design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md
oracles:
  - path: m1/evidence/operator-zones-eurusd/operator-zones.json
    metric: zone_recall>=0.95
evidence:
  claims: [complete, proven, verified, PASS, MATCHED]
  requires_oracle_metric: true
phases:
## phase P5 | turns: P5.TURN-01, P5.TURN-02, P5.TURN-03 | tokens: [PV-Gate: checkpoint@m1/checkpoints/**] | allow: m1/**, design/**, gates/**, GEK.md, GEK.lock, gate-spec.json, thresholds.json, .github/**, m1/evidence/** | deny: archive/**, **/*.sh, **/*.exe, **/*.bin
## phase P4 | turns: P4.TURN-01, P4.TURN-02, P4.TURN-03, P4.TURN-04 | allow: m1/**, design/**, GEK.md, GEK.lock, gate-spec.json, thresholds.json, .github/**, m1/evidence/** | deny: archive/**, **/*.sh, **/*.exe, **/*.bin
