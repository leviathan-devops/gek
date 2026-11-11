COMMIT f73bddc test(m1): the ST-00..ST-08 suite, frozen SHAs, derived card (P8.TURN-01)
MESSAGE:
test(m1): the ST-00..ST-08 suite, frozen SHAs, derived card (P8.TURN-01)

m1/scripts/runAllChecks.ts:1 - the 29-check suite mapping ST-00 preflight
through ST-08 runtime; exit 0 with 29/29 PASS this turn (tokens in
m1/out/trident/container-test-results.json:1 - scenario/specificToken/
passTokenMatch/failTokenAbsent/toolResultContext/timedOut/verdict/
evidence per row; the canonical .trident/ copy stays untracked - the
gate admits m1/ only). m1/scripts/verifyFrozenShas.ts:1 freezes the
four artifact SHAs (card 2247fed1882141b8, derived 7c64d6394c87f257,
pine c581603db686960a, worker 2fdeb310320080a) with drift refusal.
m1/scripts/genDerivedCard.ts:1 derives the golden-week organ card via
the engine contract bound to the run.ts seal convention (envelope
reproduction = the immutability proof; supersedes d8b3ae7933abc653).
m1/scripts/checkRoomBudgetArtifact.ts:1 - ST-07 verifies the measurement
artifact (the live bisection wedges the station inside the suite; three
standalone runs: 2031600 x2, 2031585).

PV-Gate: work


FILES: m1/out/e1-derived-EURUSD-2026-07-06.json, m1/out/frozen-shas.json, m1/out/room-budget-P4-RENDER.json, m1/out/trident/container-test-results.json, m1/out/v52-execution-ledger.jsonl, m1/scripts/checkRoomBudgetArtifact.ts, m1/scripts/genDerivedCard.ts, m1/scripts/runAllChecks.ts, m1/scripts/verifyFrozenShas.ts, m1/state.json
DIFF:
diff --git a/m1/out/e1-derived-EURUSD-2026-07-06.json b/m1/out/e1-derived-EURUSD-2026-07-06.json
new file mode 100644
index 0000000..0f7af51
--- /dev/null
+++ b/m1/out/e1-derived-EURUSD-2026-07-06.json
@@ -0,0 +1,8865 @@
+{
+ "schema_version": "pv-e1-card/11",
+ "asset": "EURUSD",
+ "week_monday": "2026-07-06",
+ "window": {
+  "open": "2026-07-05T22:00:00.000Z",
+  "cutoff": "2026-07-06T08:00:00.000Z",
+  "end": "2026-07-10T21:00:00.000Z",
+  "render_from": "2026-06-22T00:00:00.000Z",
+  "render_to": "2026-07-31T23:59:59.000Z"
+ },
+ "spot_at_cutoff": 1.14265,
+ "regime": {
+  "state": "consolidation",
+  "direction": "up",
+  "ema200Cross": false,
+  "basis": "spot 1.14265 vs prior week [1.13617, 1.14728], 5-session change 0.001 vs half-range 0.006"
+ },
+ "unit": 0.01,
+ "pip": 0.0001,
+ "source_manifest": {
+  "bars": "TradingView store EURUSD 1H/4H",
+  "prior_week": {
+   "key": "2026-06-29",
+   "from": 1782684000000,
+   "to": 1783285200000,
+   "open": 1.13796,
+   "close": 1.1434,
+   "high": 1.14728,
+   "low": 1.13617,
+   "bars": 120
+  },
+  "prior_days": [
+   {
+    "key": "2026-06-29",
+    "from": 1782684000000,
+    "to": 1782766800000,
+    "open": 1.13796,
+    "close": 1.1423699999999999,
+    "high": 1.14305,
+    "low": 1.13796,
+    "bars": 24
+   },
+   {
+    "key": "2026-06-30",
+    "from": 1782770400000,
+    "to": 1782853200000,
+    "open": 1.1423699999999999,
+    "close": 1.14212,
+    "high": 1.14366,
+    "low": 1.13826,
+    "bars": 24
+   },
+   {
+    "key": "2026-07-01",
+    "from": 1782856800000,
+    "to": 1782939600000,
+    "open": 1.14212,
+    "close": 1.13783,
+    "high": 1.14228,
+    "low": 1.13617,
+    "bars": 24
+   },
+   {
+    "key": "2026-07-02",
+    "from": 1782943200000,
+    "to": 1783026000000,
+    "open": 1.13783,
+    "close": 1.14333,
+    "high": 1.14728,
+    "low": 1.13748,
+    "bars": 24
+   },
+   {
+    "key": "2026-07-03",
+    "from": 1783029600000,
+    "to": 1783108800000,
+    "open": 1.14333,
+    "close": 1.14329,
+    "high": 1.14623,
+    "low": 1.14206,
+    "bars": 23
+   },
+   {
+    "key": "2026-07-05",
+    "from": 1783285200000,
+    "to": 1783285200000,
+    "open": 1.14382,
+    "close": 1.1434,
+    "high": 1.14382,
+    "low": 1.14322,
+    "bars": 1
+   }
+  ],
+  "protocol_a": {
+   "path": "m1/evidence/protocol-a/extraction.json",
+   "sha256": "6a19ef94732bd44b362af02386fa6d683a4b8164d3a559bf64f2a93b011bf09f",
+   "image_sha256": "10d594f6491d5b127ee798531281e6abcf7da624a95ab0c83b894a8ea90f4c6c"
+  }
+ },
+ "pillars": {
+  "P1": {
+   "sets": 27,
+   "audit": [
+    "Pivot Verification: W:2026-06-29 classic - H=1.14728 L=1.13617 C=1.14340 | PP=1.14228 R1=1.14840 S1=1.13729 | R1+L=2.28457 2xPP=2.28457 | R2-S2=0.02222 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: W:2026-06-29 fibonacci - H=1.14728 L=1.13617 C=1.14340 | PP=1.14228 R1=1.14653 S1=1.13804 | R1+L=2.28270 2xPP=2.28457 | R2-S2=0.01373 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: W:2026-06-29 camarilla - H=1.14728 L=1.13617 C=1.14340 | R4=1.14951 S4=1.13729 R4-S4=0.01222 1.1x(H-L)=0.01222 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-02 classic - H=1.14728 L=1.13748 C=1.14333 | PP=1.14270 R1=1.14791 S1=1.13811 | R1+L=2.28539 2xPP=2.28539 | R2-S2=0.01960 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-02 fibonacci - H=1.14728 L=1.13748 C=1.14333 | PP=1.14270 R1=1.14644 S1=1.13895 | R1+L=2.28392 2xPP=2.28539 | R2-S2=0.01211 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-02 camarilla - H=1.14728 L=1.13748 C=1.14333 | R4=1.14872 S4=1.13794 R4-S4=0.01078 1.1x(H-L)=0.01078 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-03 classic - H=1.14623 L=1.14206 C=1.14329 | PP=1.14386 R1=1.14566 S1=1.14149 | R1+L=2.28772 2xPP=2.28772 | R2-S2=0.00834 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-03 fibonacci - H=1.14623 L=1.14206 C=1.14329 | PP=1.14386 R1=1.14545 S1=1.14227 | R1+L=2.28751 2xPP=2.28772 | R2-S2=0.00515 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-03 camarilla - H=1.14623 L=1.14206 C=1.14329 | R4=1.14558 S4=1.14100 R4-S4=0.00459 1.1x(H-L)=0.00459 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-05 classic - H=1.14382 L=1.14322 C=1.14340 | PP=1.14348 R1=1.14374 S1=1.14314 | R1+L=2.28696 2xPP=2.28696 | R2-S2=0.00120 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-05 fibonacci - H=1.14382 L=1.14322 C=1.14340 | PP=1.14348 R1=1.14371 S1=1.14325 | R1+L=2.28693 2xPP=2.28696 | R2-S2=0.00074 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: D:2026-07-05 camarilla - H=1.14382 L=1.14322 C=1.14340 | R4=1.14373 S4=1.14307 R4-S4=0.00066 1.1x(H-L)=0.00066 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-09 classic - H=1.16672 L=1.14110 C=1.14222 | PP=1.15001 R1=1.15893 S1=1.13331 | R1+L=2.30003 2xPP=2.30003 | R2-S2=0.05124 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-09 fibonacci - H=1.16672 L=1.14110 C=1.14222 | PP=1.15001 R1=1.15980 S1=1.14023 | R1+L=2.30090 2xPP=2.30003 | R2-S2=0.03167 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-09 camarilla - H=1.16672 L=1.14110 C=1.14222 | R4=1.15631 S4=1.12813 R4-S4=0.02818 1.1x(H-L)=0.02818 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-16 classic - H=1.16162 L=1.14142 C=1.15379 | PP=1.15228 R1=1.16313 S1=1.14293 | R1+L=2.30455 2xPP=2.30455 | R2-S2=0.04040 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-16 fibonacci - H=1.16162 L=1.14142 C=1.15379 | PP=1.15228 R1=1.15999 S1=1.14456 | R1+L=2.30141 2xPP=2.30455 | R2-S2=0.02497 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-16 camarilla - H=1.16162 L=1.14142 C=1.15379 | R4=1.16490 S4=1.14268 R4-S4=0.02222 1.1x(H-L)=0.02222 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-30 classic - H=1.16271 L=1.14430 C=1.15195 | PP=1.15299 R1=1.16167 S1=1.14326 | R1+L=2.30597 2xPP=2.30597 | R2-S2=0.03682 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-30 fibonacci - H=1.16271 L=1.14430 C=1.15195 | PP=1.15299 R1=1.16002 S1=1.14595 | R1+L=2.30432 2xPP=2.30597 | R2-S2=0.02275 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-03-30 camarilla - H=1.16271 L=1.14430 C=1.15195 | R4=1.16208 S4=1.14182 R4-S4=0.02025 1.1x(H-L)=0.02025 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-06-15 classic - H=1.16220 L=1.14178 C=1.14589 | PP=1.14996 R1=1.15813 S1=1.13771 | R1+L=2.29991 2xPP=2.29991 | R2-S2=0.04084 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-06-15 fibonacci - H=1.16220 L=1.14178 C=1.14589 | PP=1.14996 R1=1.15776 S1=1.14216 | R1+L=2.29954 2xPP=2.29991 | R2-S2=0.02524 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-06-15 camarilla - H=1.16220 L=1.14178 C=1.14589 | R4=1.15712 S4=1.13466 R4-S4=0.02246 1.1x(H-L)=0.02246 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-06-22 classic - H=1.14736 L=1.13245 C=1.13796 | PP=1.13926 R1=1.14606 S1=1.13115 | R1+L=2.27851 2xPP=2.27851 | R2-S2=0.02982 | FORMULA: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-06-22 fibonacci - H=1.14736 L=1.13245 C=1.13796 | PP=1.13926 R1=1.14495 S1=1.13356 | R1+L=2.27740 2xPP=2.27851 | R2-S2=0.01843 | FORMULA: PASS SYMMETRY: PASS RANGE: PASS SANITY: PASS",
+    "Pivot Verification: H:2026-06-22 camarilla - H=1.14736 L=1.13245 C=1.13796 | R4=1.14616 S4=1.12976 R4-S4=0.01640 1.1x(H-L)=0.01640 | FORMULA: PASS RANGE: PASS SANITY: PASS"
+   ]
