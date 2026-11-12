# GEK DEBUG_LOG — every defect: symptom → root cause → mechanism → fix → verification → lesson

## EN-G01 — the judge answers HTTP 500 past 4,096 processed tokens
- Symptom: the runner's gek-judge leg died in 0.24s with HTTP 500 while identical local calls passed.
- Root cause: production_server.py hardcoded max_input_tokens=4096 beneath the model's 16k window; a 19,531-byte card exceeded it.
- Mechanism: the /health state_char_cap (24,000) is the CHAR ceiling; the request processor enforces TOKENS — the binding limit fired first. Proven by binary ladder: 12k-token state OK (usage 8,917t), 14k+ CUDA OOM (10.6GiB model + ~350MiB activations > 12GB).
- Fix: max_input_tokens env-tunable (IMAJEV_MAX_INPUT_TOKENS, service at 12,288 = the measured ceiling); card budgets law 4k/diff 16k/message 2k/evidence 3k BYTES.
- Verification: corpus/judge-capacity-ladder.json (the full ladder with usage/latency/OOM rows); PR4 passed after.
- Lesson: /health reports config, not constraints — measure the boundary with a ladder before trusting any cap.

## EN-G02 — the spec cannot pin itself (battery attack F)
- Symptom: weakening gate-spec.json (deleting all but root_identity) passed all three legs.
- Root cause: the pin predicate lived IN the spec; deleting it deleted the check. Circular trust.
- Mechanism: the check read the spec's own predicate list — attacker-controlled.
- Fix: kernel-level assertions in check.ts (GEK_SPEC_DRIFT) — the pin lives in the kernel binary, anchored by GEK_HOME being outside the committer's repo. Same for lock (GEK_HOME/locks/<project>.lock → GEK_LOCK_DRIFT) and thresholds (lock.thresholds_sha → GEK_THRESHOLDS_DRIFT).
- Verification: battery attack F HELD with its exact token; re-run on merged main 10/10.
- Lesson: a guard that lives inside the thing it guards is theater. Pins anchor OUTSIDE the attack surface.

## EN-G03 — the operator's oracle was NEVER pinned (battery attack A) — the critical find
- Symptom: tampering the oracle file passed all three legs.
- Root cause: config.ts's oracle regex demanded path+metric on ONE line; the manifest declares them on TWO — the parse yielded ZERO oracle pins in the production attach. Silent.
- Mechanism: m.oracles=[] → no oracle_pin predicate → no ctx.oracles → nothing to compare the file hash against. The most important pin in the system simply did not exist.
- Fix: two-line-aware parse + the compile now REFUSES a declared-oracles section that parses to zero (GEK_ORACLE_MISSING) — an intentionally EMPTY section stays legal (the kernel has none).
- Verification: battery attack A HELD (GEK_ORACLE_DRIFT); the v5 attach recompiled with the oracle pinned (gate-spec carries oracle_pin).
- Lesson: fail-closed on declared-but-unparsed config — a silent zero is the most dangerous value a parser can return.

## EN-G04 — the escaping bug that silently killed the turn-claim regex (battery attack J)
- Symptom: "turn done" claims passed; the pattern matched in Python but not in the check.
- Root cause: a Python string replacement wrote \\b into the TS regex LITERAL — matching a literal backslash-b instead of a word boundary. Green-looking, dead on arrival.
- Mechanism: template strings need \\\\b; regex literals need \b — the replacement served both usages the same bytes.
- Fix: single-escaped literals + the escaping law recorded in the skill (law 6).
- Verification: attack J HELD (GEK_CLAIM_WITHOUT_ORACLE on 'turn-complete').
- Lesson: a regex that compiles is not a regex that matches — every injected pattern needs a live positive/negative control pair.

## EN-G05 — a merge commit launders violating subjects (live, PR2 decoy)
- Symptom: the decoy PR passed mechanical on the merge commit's own message.
- Root cause: the check read HEAD's message; the violating subjects sat underneath.
- Fix: the check judges the PR RANGE — `git log --format=%B origin/<base>..HEAD` aggregated, diff over the same range; --base is REQUIRED and single-sourced (no flag→env→default ladder; the workflow passes origin/$GITHUB_BASE_REF; pull_request-only trigger since push events carry no base).
- Verification: the decoy PR blocked (GEK_CLAIM_WITHOUT_ORACLE on the range message); battery attack D HELD.
- Lesson: judge the aggregate a human will merge, not the commit git happens to have at HEAD.

## EN-G06 — ${{...}} is GitHub expression syntax, not shell
- Symptom: after a workflow edit, runs queued with ZERO jobs — permanently.
- Root cause: a tee fix doubled the braces into ${{PIPESTATUS[0]}} — GitHub parsed an invalid expression and stopped creating jobs. TWICE: also an inline `{ ... }` group after a var assignment (shell syntax error), and a `:?` message containing a YAML mapping colon.
- Fix: literal-block workflows; local `python3 -c "import yaml; yaml.safe_load(...)"` before EVERY workflow push; the law recorded in the skill.
- Verification: PR8/PR10/PR11 all created jobs and merged after the literal rewrite.
- Lesson: GitHub Actions YAML is THREE languages stacked (YAML, ${{}}, bash) — validate each layer in its own parser before pushing.

## EN-G07 — self-hosted runner operational traps (three)
- One runner, three parallel jobs: a single self-hosted runner has ONE work dir — parallel jobs on the same repo collide at checkout → sequence with needs:.
- Runners are repo-scoped under this token: N repos = N registrations (user/org-scope registration 404s for this token class).
- Deleting a repo orphans its runner registration: the listener shows Listening but receives nothing — remove + re-register after any repo recreation.
- Verification: both runners active, dispatching, verified across PR8/10/11 and the v5 runs.
- Lesson: the runner's _diag logs + $HOME tee files are the ground truth; the GitHub API is a lagging, metered view.

## EN-G08 — my own commit words tripped my own gate (twice, correctly)
- PR4's "the measured ladder" + PR9-range "re--verified 6/6" → GEK_CLAIM_WITHOUT_ORACLE; PR11's kernel manifest demanded an oracle the kernel repo doesn't have.
- Fixes: the Evidence: <path> channel loads artifact contents into the card; reworded claims; the kernel repo's manifest declares claims: [] (a manifest with no oracle cannot demand oracle-metric evidence).
- Lesson: the gate judging its author is the gate working. Carry the evidence or don't make the claim.

## EN-G09 — the API rate budget (operational, not billing)
- Thousands of status polls during the flaky-run chase burned GitHub's ~5k/hr management quota + triggered the secondary abuse throttle. No cost, ever (self-hosted runners bill nothing). Fix: the local-channel discipline (runner logs + tees for verdicts; API only for create/merge).
- Lesson: poll the logs, not the platform.
