job: gek
project: GEK
root: /home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/GEK
authority:
  - design/DESIGN_BLUEPRINT_GEK_V1.md
oracles:
evidence:
  claims: []   # the kernel repo declares NO oracle — no claim class may demand one; projects WITH oracles list their claim words here
  requires_oracle_metric: true
phases:
## phase P1 | turns: P1 scaffold | allow: src/**, design/**, tests/**, corpus/**, docs/**, Checkpoints/**, locks/**, context_management/**, BUILD_REPORT.md, DEBUG_LOG.md, FAILURE_LOG.md, SPEC_VIOLATION_LOG.md, TESTING_LOG.md, VISUAL_CHECKPOINTS_LOG.md, GEK.md, GEK.lock, gate-spec.json, thresholds.json, .github/**, package.json, tsconfig.json, bun.lock | deny: runtime/**

remote: https://github.com/leviathan-devops/gek.git
