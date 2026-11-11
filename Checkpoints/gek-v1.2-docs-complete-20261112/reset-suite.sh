#!/usr/bin/env bash
# THE RATE-RESET SUITE — runs the moment the GitHub window opens; every step writes to the log.
L=/tmp/gek-reset-suite.log; : > $L; log(){ echo "[$(date -u +%H:%M:%S)] $*" >> $L; }
# wait for the window (poll /rate_limit — free, doesn't count against core)
until gh api /rate_limit -q .resources.core.remaining 2>/dev/null | grep -qvE '^(0|-)$'; do sleep 60; done
log "WINDOW OPEN (remaining: $(gh api /rate_limit -q .resources.core.remaining))"
R5=leviathan-devops/plutus-vision-v5; GK=leviathan-devops/gek
# T-A: PR3 contexts + merge
gh pr checks 3 --repo $R5 >> $L 2>&1
if gh pr checks 3 --repo $R5 2>/dev/null | grep -qv '^-\|pending'; then
  gh pr merge 3 --repo $R5 --squash >> $L 2>&1 && log "T-A: PR3 MERGED"
  # post-merge: the production lock must equal the kernel-side anchor
  git -C /tmp/pl-attach fetch -q v5 bootstrap && H=$(git -C /tmp/pl-attach show FETCH_HEAD:GEK.lock | sha256sum | cut -d' ' -f1)
  A=$(cat /home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/GEK/locks/PLUTUS_VISION.lock)
  [ "$H" = "$A" ] && log "T-A2: production lock == kernel anchor ($H)" || log "T-A2 MISMATCH: merged $H vs anchor $A"
else log "T-A: contexts not green yet — left open"; fi
# T-B: the replay must still be blocked
gh pr view 2 --repo $R5 --json mergeable,mergeStateStatus -q '"T-B: replay \(.mergeable)/\(.mergeStateStatus)"' >> $L 2>&1
# T-C: land the pull_request-only workflow on GEK main (committed locally, never pushed)
cd /home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/GEK
git diff origin/main --name-only | grep -q workflows && { git checkout -q -b fix/pr-only-trigger; git push -q -u origin fix/pr-only-trigger; gh pr create --title "build(gek): pull_request-only trigger" --body "Push events carry no GITHUB_BASE_REF; PRs are the gated surface." >> $L 2>&1; sleep 100; gh pr merge --squash >> $L 2>&1 && log "T-C: pr-only workflow merged"; } || log "T-C: nothing pending (main == origin/main)"
# T-D: v5 tamper — delete the gate from a branch; the merge must be BLOCKED
cd /tmp/pl-attach && git checkout -q -b tamper/remove-gate gek/attach 2>/dev/null; git rm -q GEK.md GEK.lock gate-spec.json thresholds.json .github/workflows/gek.yml 2>/dev/null
git commit -q -m "tamper: remove every GEK artifact" && git push -q v5 tamper/remove-gate
gh pr create --repo $R5 --base bootstrap --head tamper/remove-gate --title "tamper: gate removed" --body "T2 on v5: must be BLOCKED." >> $L 2>&1 && sleep 90
gh pr view --repo $R5 --json number,mergeStateStatus -q '"T-D: tamper PR#\(.number) \(.mergeStateStatus)"' >> $L 2>&1
# T-E: close the stale PR7 + branches
gh pr close 7 --repo $GK --delete-branch >> $L 2>&1; log "T-E: PR7 closed"
log "SUITE COMPLETE"
