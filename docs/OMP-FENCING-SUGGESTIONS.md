# GEK LOCAL ENFORCEMENT — OMP FENCING SUGGESTIONS (NOT APPLIED — operator decision required)

> **Why this is a document, not a config edit:** the operator's precedent — an Opus model
> edited the OMP config and wrote 800 LOC of pattern-matching that disabled all tools with
> zero semantic awareness. The host had to be fixed from a different harness. These
> suggestions are minimal, targeted, and testable ONE AT A TIME. The operator decides.

## The current state (no OMP fence changes)

The git-level enforcement is complete and unbypassable on its own:
- **reference-transaction** (root-owned in `.git/hooks/`) fires on every ref update
- `--no-verify` does NOT skip it (no flag exists)
- Reset/ref-update/rebase all fire it
- Root-owned = the agent cannot edit it
- Fail-closed: judge down = every commit refused

The OMP bash fence would add **defense in depth** — blocking the *commands* before they
reach git. Not required for correctness; useful for fail-fast feedback.

## Suggested patterns (ONE AT A TIME, each tested in isolation)

### 1. `git commit` without the wrapper (advisory, not blocking)
```yaml
- pattern: 'git\s+commit(?!.*gek-commit)'
  reason: "GEK: prefer gek-commit (the gated wrapper). Raw git commit works but bypasses the fast pre-commit feedback."
```
**Use case:** the agent gets instant named feedback (the wrapper's REJECT text) instead of
waiting for the reference-transaction hook to fire post-commit.
**Risk:** false positives on `git commit --dry-run`, git log commands mentioning commit, etc.
**Integration:** add to `bash.patterns` in `~/.omp/agent/config.yml`; test with:
`echo test | git commit --dry-run` (should NOT fire) vs `git commit -m test` (should fire).
**Priority:** LOW — the reference-transaction already catches everything.

### 2. `git init` in a registered project (blocking)
```yaml
- pattern: 'git\s+init(?!.*--bare)'
  reason: "GEK: git init creates an ungated repo (the nuclear bypass). Work in the registered worktree."
```
**Use case:** prevents the agent from creating a fresh repo inside the project, committing
400 files of slop with zero hooks.
**Risk:** legitimate `git init` for unrelated work in the same session.
**Integration:** scope to the project root with a path filter if OMP supports it; otherwise
advise + rely on the goal prompt forbidding it.
**Priority:** MEDIUM — the agent could technically `git init /tmp/whatever` and work there.

### 3. Enforcement-dir writes (blocking)
```yaml
- pattern: '[>]{1,2}\s*.*\.gek-enforcement'
  reason: "GEK: the enforcement directory is root-owned; the agent cannot write to it."
```
**Use case:** belt-and-suspenders for the root-owned directory.
**Risk:** almost zero — the directory is already root-owned; the agent can't write to it.
**Integration:** trivially safe.
**Priority:** LOW — filesystem permissions already enforce this.

## What NOT to add (the Opus failure mode)

- **No blanket `git` blocks** — the agent needs `git add`, `git log`, `git diff`, `git status`, `git push` freely
- **No regex against commit message CONTENT** — that's the gate's job, not the fence's
- **No patterns that can't distinguish `git commit` from `git log --oneline | grep commit`** — the Opus 800-LOC failure
- **No tool-level blocks** — the agent needs all tools; the enforcement is at the git layer, not the tool layer

## The integration pathway (if the operator approves)

1. Add ONE pattern to `bash.patterns` in config.yml
2. Restart OMP (config loads at session construction)
3. Test: the pattern fires on the target command, doesn't fire on legitimate neighbors
4. Only if #3 passes, consider the next pattern
5. If ANYTHING breaks, revert that single pattern immediately
