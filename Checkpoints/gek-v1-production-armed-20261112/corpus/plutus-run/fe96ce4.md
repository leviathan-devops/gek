COMMIT fe96ce4 test(m1): P1 evidence-plane checkpoint
MESSAGE:
test(m1): P1 evidence-plane checkpoint

PV-Checkpoint for P1.TURN-01..05. Comparison rows 5/5 MATCHED with gate-output
evidence; visual = Protocol A pass-2 capture (sha 71769468798e7f07377b23141dcd6d654493045321317ea791a566e7d4a588b8, 296761 bytes, PNG magic
verified by the gate). Every gate re-run by the primary this turn: exit 0.

PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P1-EVIDENCE/checkpoint.json


FILES: m1/checkpoints/P1-EVIDENCE/checkpoint.json, m1/checkpoints/P1-EVIDENCE/comparison.json, m1/checkpoints/P1-EVIDENCE/visual-protocol-a.png, m1/state.json
DIFF:
diff --git a/m1/checkpoints/P1-EVIDENCE/checkpoint.json b/m1/checkpoints/P1-EVIDENCE/checkpoint.json
new file mode 100644
index 0000000..af32e4c
--- /dev/null
+++ b/m1/checkpoints/P1-EVIDENCE/checkpoint.json
@@ -0,0 +1,34 @@
+{
+ "schema": 1,
+ "id": "P1-EVIDENCE",
+ "type": "checkpoint",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "claims": {
+  "evidence_ready": true,
+  "engine_ready": false,
+  "composition_ready": false,
+  "render_observed": false
+ },
+ "comparison": "m1/checkpoints/P1-EVIDENCE/comparison.json",
+ "visual": [
+  {
+   "path": "m1/checkpoints/P1-EVIDENCE/visual-protocol-a.png",
+   "expectation": "Protocol A pass-2 capture of EURUSD/USDJPY Monday expiries (investinglive headed page, three-pass extraction source); the evidence plane hashes this exact table image"
+  }
+ ],
+ "pinebox": {
+  "asset": "EURUSD",
+  "week": "2026-07-06",
+  "mode": "local",
+  "note": "evidence-plane checkpoint; no chart render claimed in P1"
+ },
+ "gates": {
+  "checkBars": 0,
+  "checkProtocolA": 0,
+  "checkP4": 0,
+  "checkP7": 0,
+  "checkManifest": 0
+ },
+ "note": "P1.TURN-01..05; primary re-ran every gate this turn (exit 0, all named tokens in tool output); diffs hunk-audited; W1 file scope verified exact"
+}
diff --git a/m1/checkpoints/P1-EVIDENCE/comparison.json b/m1/checkpoints/P1-EVIDENCE/comparison.json
new file mode 100644
index 0000000..c6b84aa
--- /dev/null
+++ b/m1/checkpoints/P1-EVIDENCE/comparison.json
@@ -0,0 +1,43 @@
+{
+ "schema": 1,
+ "checkpoint": "P1-EVIDENCE",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "rows": [
+  {
+   "family": "bar source (deterministic, pre-cutoff)",
+   "status": "MATCHED",
+   "evidence": "m1/out/w1/checkBars.out: BAR_COUNT_OK n=79 DXY 1H July-2026, BAR_ORDER_OK, OHLC_SHAPE_OK, POST_CUTOFF_BAR_REJECTED (adversarial stub refused), gate re-run by primary exit 0"
+  },
+  {
+   "family": "Protocol A typed evidence",
+   "status": "MATCHED",
+   "evidence": "m1/out/w1/checkProtocolA.out: PROTOCOL_A_VALID + three adversarial refusals; fixture sha 10d594f6 from the real 102419-byte capture"
+  },
+  {
+   "family": "P4 analyst consensus",
+   "status": "MATCHED",
+   "evidence": "m1/out/w1/checkP4.out: P4_EXPLICIT_LEVEL_OK, P4_CUTOFF_REJECT, P4_CONSENSUS_2, P4_NO_PROXY, P4_SINGLE_SOURCE_NO_FALSE_CONSENSUS"
+  },
+  {
+   "family": "P7 exchange arena",
+   "status": "MATCHED",
+   "evidence": "m1/out/w1/checkP7.out: P7_EXCHANGE_ARENA_OK, P7_AFTER_CUTOFF_REJECTED, P7_NO_TIER1_WALL_NAMED, P7_EXCHANGE_SOURCE_MISSING_NAMED"
+  },
+  {
+   "family": "evidence manifest",
+   "status": "MATCHED",
+   "evidence": "m1/out/w1/checkManifest.out: MANIFEST_SHA_OK, MANIFEST_CUTOFF_OK, MANIFEST_FUTURE_REJECTED, MANIFEST_MISSING_NAMED, MANIFEST_CANONICAL_STABLE"
+  }
+ ],
+ "visual_sha256": {
+  "m1/checkpoints/P1-EVIDENCE/visual-protocol-a.png": "71769468798e7f07377b23141dcd6d654493045321317ea791a566e7d4a588b8"
+ },
+ "summary": {
+  "matched": 5,
+  "wrong": 0,
+  "missing": 0,
+  "extra": 0,
+  "unobservable": 0
+ }
+}
diff --git a/m1/checkpoints/P1-EVIDENCE/visual-protocol-a.png b/m1/checkpoints/P1-EVIDENCE/visual-protocol-a.png
new file mode 100644
index 0000000..fb76604
Binary files /dev/null and b/m1/checkpoints/P1-EVIDENCE/visual-protocol-a.png differ
diff --git a/m1/state.json b/m1/state.json
index 51af00d..9948135 100644
--- a/m1/state.json
+++ b/m1/state.json
@@ -4,8 +4,8 @@
   "m1_status": "IN_PROGRESS",
-  "checkpoint_seq": 5,
-  "work_commits_since_checkpoint": 2,
-  "last_checkpoint": "CP-005",
+  "checkpoint_seq": 6,
+  "work_commits_since_checkpoint": 0,
+  "last_checkpoint": "P1-EVIDENCE",
   "complete_commit": null,
   "operator_review": "PENDING",
-  "updated_at": "2026-11-10T16:43:46+00:00"
+  "updated_at": "2026-11-10T16:44:35+00:00"
 }
