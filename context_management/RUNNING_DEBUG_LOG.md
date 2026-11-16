# RUNNING_DEBUG_LOG — the live-channel notes

Verdicts read from: GEK-RUNTIME/runner*/_diag/{Runner,Worker}_*.log + ~/gek-*.log tees.
The 500-era dumps: ~/.local/state/gek/raw/ (each keeps the response AND the exact request body).
The verdict ledger: ~/.local/state/gek/verdicts.jsonl. The reset suite: /tmp/gek-reset-suite.log.

## [2026-11-12T19:40Z] — reference-transaction exit code not propagating (git 2.43)
- SYMPTOM: the hook printed the refusal but the commit still landed (ref updated, git log showed the garbage commit).
- ROOT CAUSE: the `while read` loop reading from stdin — exit 1 inside the loop doesn't reliably abort the transaction when stdin has multiple entries. The hook also needed to consume ALL stdin before evaluating.
- FIX: two-phase — first read ALL stdin lines (consume everything), capture the last NEW/OLD; then evaluate and exit. The exit code now reliably aborts the ref update.
- LESSON: git hooks reading stdin must consume the entire stream before making decisions; partial reads + early exits have undefined behavior in git 2.43.
- EVIDENCE: the test matrix — the fixed hook produces `fatal: ref updates aborted by hook` + EXIT 128 on garbage.

## [2026-11-12T19:30Z] — the judge CUDA OOM
- SYMPTOM: :8090 unreachable; systemd restart loop; CUDA OOM in the startup log.
- ROOT CAUSE: beellama GGUF (6.17 GiB) + nomic-embed (830 MiB) + hindsight-api (498 MiB) on the same 11.6 GiB GPU left only 39 MiB free — the bf16 judge needs 10.6 GiB.
- FIX: killed the beellama GGUF (a duplicate quantized serving of the same imajev-4b model); freed 6.17 GiB; judge loads cleanly at 10.4 GiB free.
- LESSON: co-resident GPU processes must be inventoried before blaming the service; the beellama GGUF was the silent VRAM thief.
- EVIDENCE: nvidia-smi before (14 MiB free) / after (10.4 GiB free); judge health OK.
