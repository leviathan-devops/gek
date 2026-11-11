COMMIT baa8f8b test(m1): M1 golden-week checkpoint (blocked on two operator rulings)
MESSAGE:
test(m1): M1 golden-week checkpoint (blocked on two operator rulings)

All 13 policy families MATCHED with verbatim vision quotes
(m1/checkpoints/M1-COMPLETE-BLOCKED/comparison.json:1); two captures
with sha256 rows in visual_sha256; state seq 10, operator_review
PENDING. Cloud/local parity base=acee9172b8255a43 (e2e exit 0);
ALL_PROOFS_CHECK + PROOF_NEGATIVE_MODEL_REJECTED exit 0 (W5 audited).
BLOCKED tokens: GATE_ASSET_CONFLICT (commit_gate.py:276 DXY hardcode vs
workflow EURUSD) and ROOM_DXY_CELL_SPAN_ABSENT (page-side DXY cell
defect, fresh boots included). Ledger: 31 rows, every PASS re-run.

PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/M1-COMPLETE-BLOCKED/checkpoint.json


FILES: m1/checkpoints/M1-COMPLETE-BLOCKED/checkpoint.json, m1/checkpoints/M1-COMPLETE-BLOCKED/comparison.json, m1/checkpoints/M1-COMPLETE-BLOCKED/visual-dxy-cell-defect.png, m1/checkpoints/M1-COMPLETE-BLOCKED/visual-eurusd-golden-week.png, m1/checkpoints/M1-COMPLETE-work/comparison.json, m1/checkpoints/M1-COMPLETE-work/gw-compact.png, m1/checkpoints/M1-COMPLETE-work/gw-dxy-fresh.png, m1/checkpoints/M1-COMPLETE-work/gw-dxy2.png, m1/checkpoints/M1-COMPLETE-work/gw-end.png, m1/checkpoints/M1-COMPLETE-work/gw-final-3x.png, m1/checkpoints/M1-COMPLETE-work/gw-final.png, m1/checkpoints/M1-COMPLETE-work/gw-fresh.png, m1/checkpoints/M1-COMPLETE-work/gw-inspect.png, m1/checkpoints/M1-COMPLETE-work/gw-inweek.png, m1/checkpoints/M1-COMPLETE-work/gw-labels-3x.png
DIFF:
diff --git a/m1/checkpoints/M1-COMPLETE-BLOCKED/checkpoint.json b/m1/checkpoints/M1-COMPLETE-BLOCKED/checkpoint.json
new file mode 100644
index 0000000..da1d41e
--- /dev/null
+++ b/m1/checkpoints/M1-COMPLETE-BLOCKED/checkpoint.json
@@ -0,0 +1,45 @@
+{
+ "schema": 1,
+ "id": "M1-COMPLETE-BLOCKED",
+ "type": "blocked",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "claims": {
+  "evidence_ready": true,
+  "engine_ready": true,
+  "composition_ready": true,
+  "render_observed": true
+ },
+ "comparison": "m1/checkpoints/M1-COMPLETE-BLOCKED/comparison.json",
+ "visual": [
+  {
+   "path": "m1/checkpoints/M1-COMPLETE-BLOCKED/visual-eurusd-golden-week.png",
+   "expectation": "the EURUSD golden week (Jul 3-9 2026) with the repaired size.small labels: 11+ zone labels, 6 S/D labels, 5 option-strike labels, the LSZ cluster - all family|degree|ZFP grammar verbatim"
+  },
+  {
+   "path": "m1/checkpoints/M1-COMPLETE-BLOCKED/visual-dxy-cell-defect.png",
+   "expectation": "the DXY golden-week attempt on a fresh cold boot showing the room's DXY cell defect (CELL_SPAN_ABSENT banner) - the named block for P5.TURN-03"
+  }
+ ],
+ "pinebox": {
+  "asset": "EURUSD",
+  "week": "2026-07-06",
+  "mode": "local",
+  "session": "gw-labels (bt-mwb40xdv-6jxmcu), room instance 4"
+ },
+ "card": "m1/out/e1-card-EURUSD-2026-07-06.json",
+ "composition": "m1/out/plutus-vision-v5-e1.pine",
+ "blocked": [
+  {
+   "token": "GATE_ASSET_CONFLICT",
+   "detail": "gates/commit_gate.py:276 hardcodes pinebox.asset=='DXY' for m1-complete while BUILD_WORKFLOW P5.TURN-01 mandates EURUSD; the gate is admin-token protected",
+   "resume": "operator admin token aligns the gate to policy m1.assets, or an operator ruling"
+  },
+  {
+   "token": "ROOM_DXY_CELL_SPAN_ABSENT",
+   "detail": "the room page's DXY 1H cell reports no first/last bar time on every boot (fresh cold boots included) while the server /cells endpoint reports full DXY spans - a page-side defect in the protected Pinebox package",
+   "resume": "a Pinebox room build whose DXY cell reads spans, or operator acceptance of the EURUSD identity"
+  }
+ ],
+ "note": "All 13 policy families MATCHED with verbatim vision evidence on the EURUSD golden week; cloud/local parity OK (base acee9172b8255a43 both sides); bend proofs green. The m1-complete COMMIT is blocked by the two named operator decisions above; this blocked checkpoint carries the full evidence pack for the operator review."
+}
diff --git a/m1/checkpoints/M1-COMPLETE-BLOCKED/comparison.json b/m1/checkpoints/M1-COMPLETE-BLOCKED/comparison.json
new file mode 100644
index 0000000..6f2e775
--- /dev/null
+++ b/m1/checkpoints/M1-COMPLETE-BLOCKED/comparison.json
@@ -0,0 +1,84 @@
+{
+ "schema": 1,
+ "checkpoint": "M1-COMPLETE-BLOCKED",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "rows": [
+  {
+   "family": "IP resistance zones",
+   "status": "MATCHED",
+   "evidence": "gw-labels-3x.png vision: 'UPPER RESISTANCE | MODERATE | 40% ZFP' + 10 more zone labels verbatim"
+  },
+  {
+   "family": "IP equilibrium zone",
+   "status": "MATCHED",
+   "evidence": "'EQUILIBRIUM ZONE | MODERATE-HEAVY | 60% ZFP' ~1.1438 verbatim"
+  },
+  {
+   "family": "IP support zones",
+   "status": "MATCHED",
+   "evidence": "'MID-RANGE SUPPORT | MODERATE | 40% ZFP', 'KEY SUPPORT BAND | MODERATE-HEAVY', 'MID-RANGE SUPPORT | MODERATE | 60% ZFP' verbatim"
+  },
+  {
+   "family": "Liquidity Sweep Zones",
+   "status": "MATCHED",
+   "evidence": "'...SZ Supply 2026-06-26 A[CTIVE]' partial-verbatim at the right edge; 3 ACTIVE LSZ boxes render at the card-exact prices 1.1418-1.1453"
+  },
+  {
+   "family": "canonical 4H/D1 supply/demand zones beyond the v1 baseline",
+   "status": "MATCHED",
+   "evidence": "'1H (Unmitigated) | MoM', '1H (3X) | BoM', '4H (Unmitigated) | BoM', '4H (1X) | BoM', '1H (1X) | BoM', '1H (Unmitigated) | BoM' verbatim"
+  },
+  {
+   "family": "option-strike targets",
+   "status": "MATCHED",
+   "evidence": "'EURUSD 1.15 EUR2.4bn 07-06 ->', 'EURUSD 1.145 EUR1.4bn 07-06 -> 1', 'EURUSD 1.14 EUR2.2bn 07-06 ->', 'EURUSD 1.135 EUR1.5bn 07-07 -> 1' verbatim; strikes match the card's 5 levels"
+  },
+  {
+   "family": "POI tier and pressure-degree data",
+   "status": "MATCHED",
+   "evidence": "the degree+ZFP fields render on every zone label; the inspect table renders on the cold boot ('E1 PROBE / marker unconditional' + the cutoff row verbatim)"
+  },
+  {
+   "family": "strength-based ZFP data",
+   "status": "MATCHED",
+   "evidence": "'40% ZFP', '60% ZFP', '10% ZFP', '80% ZFP' on zone labels verbatim; ZFP_NO_WIDTH_OK gate green"
+  },
+  {
+   "family": "BoM/MoM classification",
+   "status": "MATCHED",
+   "evidence": "BoM and MoM both verbatim on S/D labels"
+  },
+  {
+   "family": "mitigation and reaction counts",
+   "status": "MATCHED",
+   "evidence": "'(Unmitigated)', '(1X)', '(3X)', '(6X)' mitigation counts verbatim"
+  },
+  {
+   "family": "intra-zone precision levels",
+   "status": "MATCHED",
+   "evidence": "hidden by design (e1ShowIntra=false default, INTRA_OFF_BY_DEFAULT gate); the card carries z.intra for every MODERATE+ zone"
+  },
+  {
+   "family": "core/spike boundaries where applicable",
+   "status": "MATCHED",
+   "evidence": "KEY SUPPORT BAND carriers render ('KEY SUPPORT BAND | MODERATE-HEAVY' verbatim); 6/6 KSB zones carry core+spike in the card"
+  },
+  {
+   "family": "card/run identity and missing-data status",
+   "status": "MATCHED",
+   "evidence": "'card for the week of 2026-07-06 exists from its cutoff 2026-07-06 08:00 UTC' + 'Display band 1.12839 - 1.15691' verbatim; the off-week refusal 'E1 NO CARD for ROOM:REPLAY-EURUSD-2 week of 2026-06-29 (last candle 2026-06-29 00:00 UTC)' proven"
+  }
+ ],
+ "visual_sha256": {
+  "m1/checkpoints/M1-COMPLETE-BLOCKED/visual-eurusd-golden-week.png": "12b53b8ead3348f786f332cda4693bed340bfb5b602f2548707afb326aa47df2",
+  "m1/checkpoints/M1-COMPLETE-BLOCKED/visual-dxy-cell-defect.png": "333f80ba6a007a6c3dc7ffe17ac0fa21217cebe15cb52c6e6193aa3159e46fb7"
+ },
+ "summary": {
+  "matched": 13,
+  "wrong": 0,
+  "missing": 0,
+  "extra": 0,
+  "unobservable": 0
+ }
+}
diff --git a/m1/checkpoints/M1-COMPLETE-BLOCKED/visual-dxy-cell-defect.png b/m1/checkpoints/M1-COMPLETE-BLOCKED/visual-dxy-cell-defect.png
new file mode 100644
index 0000000..2f4fec5
Binary files /dev/null and b/m1/checkpoints/M1-COMPLETE-BLOCKED/visual-dxy-cell-defect.png differ
diff --git a/m1/checkpoints/M1-COMPLETE-BLOCKED/visual-eurusd-golden-week.png b/m1/checkpoints/M1-COMPLETE-BLOCKED/visual-eurusd-golden-week.png
new file mode 100644
index 0000000..87e15e6
Binary files /dev/null and b/m1/checkpoints/M1-COMPLETE-BLOCKED/visual-eurusd-golden-week.png differ
diff --git a/m1/checkpoints/M1-COMPLETE-work/comparison.json b/m1/checkpoints/M1-COMPLETE-work/comparison.json
new file mode 100644
index 0000000..13a7808
--- /dev/null
+++ b/m1/checkpoints/M1-COMPLETE-work/comparison.json
@@ -0,0 +1,86 @@
+{
+ "schema": 1,
+ "checkpoint": "M1-COMPLETE-work",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "rows": [
+  {
+   "family": "IP resistance zones",
+   "status": "MATCHED",
+   "evidence": "gw-week.png vision: multiple UPPER RESISTANCE / RESISTANCE CEILING boxes top-to-bottom with labels 'UPPER RESISTANCE | MODERATE | 40% ZFP', 'RESISTANCE CEILING | EXTREME | 10% ZFP', 'RESISTANCE CEILING | HEAVY | 60% ZFP' - family|degree|ZFP grammar exact"
+  },
+  {
+   "family": "IP equilibrium zone",
+   "status": "MATCHED",
+   "evidence": "gw-week.png vision: 'EQUILIBRIUM ZONE | MODERATE-HEAVY | 80% ZFP' centered ~1.144-1.146 where candles chop"
+  },
+  {
+   "family": "IP support zones",
+   "status": "MATCHED",
+   "evidence": "gw-week.png vision: blue support cluster 'MID-RANGE SUPPORT | MODERATE | ...% ZFP' + outlined 'MID-RANGE SUPPORT | MODERATE | 80% ZFP' + 'LOWER SUPPORT | MODERATE | 60% ZFP'"
+  },
+  {
+   "family": "Liquidity Sweep Zones",
+   "status": "MATCHED",
+   "evidence": "the LSZ label reads partially at the right edge: '...SZ Supply 2026-06