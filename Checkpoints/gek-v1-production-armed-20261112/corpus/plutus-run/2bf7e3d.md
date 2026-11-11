COMMIT 2bf7e3d feat(m1): implement the P1 evidence plane
MESSAGE:
feat(m1): implement the P1 evidence plane

P1.TURN-01..05 per BUILD_WORKFLOW_v5.2: RangeBarSource contract + validateBars +
assertAllPreCutoff (bars.ts +41), httpBars with injected fetch, Protocol A typed
extraction (cutoff/hash/https/pair/strike refusals), P4 analyst consensus
(5-pip groups, 2 independent tier1/2 -> dim 2, no proxy), P7 exchange arena
(>=1.5bn tier-1 floor/ceiling, named missing tokens, never-silent fallback),
immutable evidence manifest (canonical-bytes sha256, BEFORE/AFTER/MISSING,
future prediction source refuses). Gates re-run by the primary this turn, all
exit 0: checkBars, checkProtocolA, checkP4, checkP7, checkManifest; every named
token observed in tool output. tsc deferred to the P1 checkpoint (W2's
checkDonors.ts is mid-write in its disjoint set).

PV-Gate: work


FILES: m1/out/v52-execution-ledger.jsonl, m1/out/w1/checkBars.out, m1/out/w1/checkManifest.out, m1/out/w1/checkP4.out, m1/out/w1/checkP7.out, m1/out/w1/checkProtocolA.out, m1/scripts/checkBars.ts, m1/scripts/checkManifest.ts, m1/scripts/checkP4.ts, m1/scripts/checkP7.ts, m1/scripts/checkProtocolA.ts, m1/src/bars.ts, m1/src/evidence/manifest.ts, m1/src/p4.ts, m1/src/p7exchange.ts
DIFF:
diff --git a/m1/out/v52-execution-ledger.jsonl b/m1/out/v52-execution-ledger.jsonl
index 8143199..af124cc 100644
--- a/m1/out/v52-execution-ledger.jsonl
+++ b/m1/out/v52-execution-ledger.jsonl
@@ -2 +2,13 @@
 {"turn": "P0.TURN-02", "status": "PASS", "files": ["m1/src/refusals.ts", "m1/src/run.ts", "m1/out/v52-execution-ledger.jsonl", "m1/out/preflight.txt", "m1/out/preflight.json"], "gate": "bunx tsc --noEmit && test $(grep -cE 'E1_[A-Z0-9_]+' m1/src/refusals.ts) -ge 15", "exit": 0, "tokens": ["tsc_exit=0", "token_count=15", "token gate PASS"], "artifacts": ["m1/src/refusals.ts"], "sha": null, "blocked": null}
+{"turn": "P1.TURN-01", "status": "PASS", "files": ["m1/src/bars.ts", "m1/src/sources/httpBars.ts", "m1/scripts/checkBars.ts"], "gate": "bun run m1/scripts/checkBars.ts", "exit": 0, "tokens": ["BAR_COUNT_OK", "BAR_ORDER_OK", "OHLC_SHAPE_OK", "POST_CUTOFF_BAR_REJECTED"], "artifacts": ["m1/out/w1/checkBars.out"], "sha": null, "blocked": null, "note": {"audited": "primary re-ran the gate this turn; diff hunk-audited; scope verified"}}
+{"turn": "P1.TURN-02", "status": "PASS", "files": ["m1/src/sources/protocolA.ts", "m1/scripts/checkProtocolA.ts"], "gate": "bun run m1/scripts/checkProtocolA.ts", "exit": 0, "tokens": ["PROTOCOL_A_VALID", "PROTOCOL_A_AFTER_CUTOFF_REJECTED", "PROTOCOL_A_MISSING_IMAGE_REJECTED", "PROTOCOL_A_BAD_STRIKE_REJECTED"], "artifacts": ["m1/out/w1/checkProtocolA.out"], "sha": null, "blocked": null, "note": {"audited": "primary re-ran the gate this turn; diff hunk-audited; scope verified"}}
+{"turn": "P1.TURN-03", "status": "PASS", "files": ["m1/src/sources/analyst.ts", "m1/src/p4.ts", "m1/scripts/checkP4.ts"], "gate": "bun run m1/scripts/checkP4.ts", "exit": 0, "tokens": ["P4_EXPLICIT_LEVEL_OK", "P4_CUTOFF_REJECT", "P4_CONSENSUS_2", "P4_NO_PROXY"], "artifacts": ["m1/out/w1/checkP4.out"], "sha": null, "blocked": null, "note": {"audited": "primary re-ran the gate this turn; diff hunk-audited; scope verified"}}
+{"turn": "P1.TURN-04", "status": "PASS", "files": ["m1/src/p7exchange.ts", "m1/scripts/checkP7.ts"], "gate": "bun run m1/scripts/checkP7.ts", "exit": 0, "tokens": ["P7_EXCHANGE_ARENA_OK", "P7_AFTER_CUTOFF_REJECTED", "P7_NO_TIER1_WALL_NAMED"], "artifacts": ["m1/out/w1/checkP7.out"], "sha": null, "blocked": null, "note": {"audited": "primary re-ran the gate this turn; diff hunk-audited; scope verified"}}
+{"turn": "P1.TURN-05", "status": "PASS", "files": ["m1/src/evidence/manifest.ts", "m1/scripts/checkManifest.ts"], "gate": "bun run m1/scripts/checkManifest.ts", "exit": 0, "tokens": ["MANIFEST_SHA_OK", "MANIFEST_CUTOFF_OK", "MANIFEST_FUTURE_REJECTED", "MANIFEST_MISSING_NAMED"], "artifacts": ["m1/out/w1/checkManifest.out"], "sha": null, "blocked": null, "note": {"audited": "primary re-ran the gate this turn; diff hunk-audited; scope verified"}}
+{"turn": "P3.TURN-01", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
+{"turn": "P3.TURN-02", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
+{"turn": "P3.TURN-03", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
+{"turn": "P3.TURN-04", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
+{"turn": "P3.TURN-05", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
+{"turn": "P3.TURN-06", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
+{"turn": "P3.TURN-07", "status": "RUNNING", "files": [], "gate": null, "exit": null, "tokens": [], "artifacts": [], "sha": null, "blocked": null, "note": {"dispatched": "2026-11-10T16:30:31+00:00", "worker": "W2Organs", "model_note": "task surface rejects model pins (seance-only); worker on session default; primary reruns every gate"}}
diff --git a/m1/out/w1/checkBars.out b/m1/out/w1/checkBars.out
new file mode 100644
index 0000000..6283b55
--- /dev/null
+++ b/m1/out/w1/checkBars.out
@@ -0,0 +1,6 @@
+BAR_COUNT_OK count=79 range=[2026-07-01T00:00:00.000Z,2026-07-06T07:00:00.000Z]
+BAR_ORDER_OK n=79
+OHLC_SHAPE_OK n=79
+HTTP_SOURCE_REFUSALS_OK non200/nonmonotonic/ohlc all refused
+POST_CUTOFF_BAR_REJECTED E1_CUTOFF_VIOLATION
+CUTOFF_SLICE_OK preCutoffMax=2026-07-06T07:00:00.000Z cutoff=2026-07-06T08:00:00.000Z
diff --git a/m1/out/w1/checkManifest.out b/m1/out/w1/checkManifest.out
new file mode 100644
index 0000000..d6faca0
--- /dev/null
+++ b/m1/out/w1/checkManifest.out
@@ -0,0 +1,5 @@
+MANIFEST_SHA_OK image_sha256=10d594f6491d5b12... bytes=102419
+MANIFEST_CANONICAL_STABLE
+MANIFEST_CUTOFF_OK rows=2
+MANIFEST_FUTURE_REJECTED
+MANIFEST_MISSING_NAMED source_id=ice-walls
diff --git a/m1/out/w1/checkP4.out b/m1/out/w1/checkP4.out
new file mode 100644
index 0000000..4fc2771
--- /dev/null
+++ b/m1/out/w1/checkP4.out
@@ -0,0 +1,5 @@
+P4_EXPLICIT_LEVEL_OK id=P4|analyst|ing|99.5 dimension=1
+P4_CUTOFF_REJECT
+P4_CONSENSUS_2 groups=1 independent=2 dimension=2
+P4_SINGLE_SOURCE_NO_FALSE_CONSENSUS independent=1
+P4_NO_PROXY implicit="quoted_span names no exact price - paraphrased implicit levels are not evidence" missing_rows=1
diff --git a/m1/out/w1/checkP7.out b/m1/out/w1/checkP7.out
new file mode 100644
index 0000000..aef95bf
--- /dev/null
+++ b/m1/out/w1/checkP7.out
@@ -0,0 +1,4 @@
+P7_EXCHANGE_ARENA_OK floor=99.2 ceiling=100.8 walls=2
+P7_AFTER_CUTOFF_REJECTED
+P7_NO_TIER1_WALL_NAMED
+P7_EXCHANGE_SOURCE_MISSING_NAMED
diff --git a/m1/out/w1/checkProtocolA.out b/m1/out/w1/checkProtocolA.out
new file mode 100644
index 0000000..1ae1e02
--- /dev/null
+++ b/m1/out/w1/checkProtocolA.out
@@ -0,0 +1,4 @@
+PROTOCOL_A_VALID published_at=2026-07-06T05:47:00.000Z expiries=9 pairs=EURUSD,USDJPY,USDCHF,AUDUSD,USDCAD image=10d594f6491d5b12...
+PROTOCOL_A_AFTER_CUTOFF_REJECTED
+PROTOCOL_A_MISSING_IMAGE_REJECTED
+PROTOCOL_A_BAD_STRIKE_REJECTED
diff --git a/m1/scripts/checkBars.ts b/m1/scripts/checkBars.ts
new file mode 100644
index 0000000..2b93233
--- /dev/null
+++ b/m1/scripts/checkBars.ts
@@ -0,0 +1,57 @@
+// checkBars.ts - P1.TURN-01 gate. Runs the deterministic bar source against one DXY 1H
+// month (the fixture the engine already reads via fsSource), then exercises the HTTP
+// source's adversarial shapes with injected stub fetches. Every pass token is printed
+// by a real tool-result path, never prose.
+import { readFileSync } from 'node:fs';
+import { runWindow } from '../src/window';
+import { fsSource } from '../src/fs-source';
+import { rangeFromMonths, validateBars, assertAllPreCutoff, type Bar } from '../src/bars';
+import { httpBars } from '../src/sources/httpBars';
+
+const W = runWindow('DXY', '