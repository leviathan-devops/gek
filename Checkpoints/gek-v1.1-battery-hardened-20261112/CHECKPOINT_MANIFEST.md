# CHECKPOINT_MANIFEST — gek-v1.1-battery-hardened-20261112

- State: the battery-hardened kernel. 10/10 red-team attacks HELD (tests/redteam-battery.ts); the four real holes closed: the two-line oracle parse (the operator's ground truth had been UNPINNED in production), kernel-level spec/lock/thresholds pins (the spec cannot pin itself), mechanical turn-claim patterns (+ the escaping law), manifest script-deny.
- Zero-trust report: docs/test-artifacts/ZERO-TRUST-REPORT-20261112.md.
- Anchors: locks/GEK.lock (kernel repo, self-referential — recorded), locks/PLUTUS_VISION.lock (external).
- HONEST GAPS: the judge stays advisory by measurement; the GEK repo's own anchor lives inside its tree; PR11 merge pending at seal time.

- SEAL CORRECTION (2026-11-12): chattr +i is NOT PERMITTED on this filesystem ("Operation not permitted", verified) — the earlier "SEALED" lines were silent failures. This checkpoint is MODE B (documented mutable): the manifest attests the state at write time; tamper-evidence comes from the git history (the checkpoint is committed) + the kernel-side anchors, not from filesystem immutability.
