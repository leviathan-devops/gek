job: gek
project: GEK
root: /home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/GEK
authority:
  - design/DESIGN_BLUEPRINT_GEK_V1.md
oracles:
evidence:
  claims: [complete, proven, verified, PASS]
  requires_oracle_metric: true
phases:
## phase P1 | turns: P1 scaffold | allow: src/**, design/**, tests/**, corpus/**, GEK.md, GEK.lock, gate-spec.json, thresholds.json, .github/** | deny: runtime/**
remote: https://github.com/leviathan-devops/gek.git
