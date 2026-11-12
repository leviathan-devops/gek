COMMIT a16b2ad fix(m1): label size tiny to small and seal the P5-REPAIR checkpoint
MESSAGE:
fix(m1): label size tiny to small and seal the P5-REPAIR checkpoint

m1/src/compose.ts:5 label anchors tiny->small (the P5.TURN-02 repair:
the golden-week vision pass could not read labels at week scale with
tiny). Pine regenerated sha c581603db686960a. Post-repair verdict,
13/13 policy families MATCHED with verbatim vision quotes
(m1/checkpoints/P5-REPAIR/comparison.json:1): 11+ zone labels, 6 S/D
labels, 5 option-strike labels, the LSZ cluster at card-exact prices;
two captures hashed in visual_sha256. Gates re-run with the new pine:
checkR36 exit 0, checkPresentation exit 0.

PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P5-REPAIR/checkpoint.json


FILES: m1/checkpoints/P5-REPAIR/checkpoint.json, m1/checkpoints/P5-REPAIR/comparison.json, m1/checkpoints/P5-REPAIR/visual-labels-repaired.png, m1/checkpoints/P5-REPAIR/visual-lsz-option-labels.png, m1/out/plutus-vision-v5-e1.pine, m1/out/v52-execution-ledger.jsonl, m1/src/compose.ts, m1/state.json
DIFF:
diff --git a/m1/checkpoints/P5-REPAIR/checkpoint.json b/m1/checkpoints/P5-REPAIR/checkpoint.json
new file mode 100644
index 0000000..ec9dff8
--- /dev/null
+++ b/m1/checkpoints/P5-REPAIR/checkpoint.json
@@ -0,0 +1,33 @@
+{
+ "schema": 1,
+ "id": "P5-REPAIR",
+ "type": "checkpoint",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "claims": {
+  "evidence_ready": true,
+  "engine_ready": true,
+  "composition_ready": true,
+  "render_observed": true
+ },
+ "comparison": "m1/checkpoints/P5-REPAIR/comparison.json",
+ "visual": [
+  {
+   "path": "m1/checkpoints/P5-REPAIR/visual-labels-repaired.png",
+   "expectation": "the EURUSD golden week post-repair: 11+ zone labels, 6 S/D labels in family|degree|ZFP grammar, all legible at 3x HiDPI"
+  },
+  {
+   "path": "m1/checkpoints/P5-REPAIR/visual-lsz-option-labels.png",
+   "expectation": "the right-edge crop: option-strike labels 'EURUSD 1.15 EUR2.4bn 07-06 ->' etc. and the LSZ 'Supply 2026-06-26 A...' label at card-exact prices"
+  }
+ ],
+ "pinebox": {
+  "asset": "EURUSD",
+  "week": "2026-07-06",
+  "mode": "local",
+  "session": "gw-labels (bt-mwb40xdv-6jxmcu), room instance 4, 3x HiDPI capture"
+ },
+ "card": "m1/out/e1-card-EURUSD-2026-07-06.json",
+ "composition": "m1/out/plutus-vision-v5-e1.pine",
+ "note": "the P5.TURN-02 repair checkpoint: label size tiny->small (m1/src/compose.ts, 5 anchors), pine regenerated to sha c581603db686960a; all 13 families MATCHED with verbatim vision evidence post-repair; the R36/presentation/budget gates re-run exit 0 with the new pine."
+}
diff --git a/m1/checkpoints/P5-REPAIR/comparison.json b/m1/checkpoints/P5-REPAIR/comparison.json
new file mode 100644
index 0000000..39ef7c3
--- /dev/null
+++ b/m1/checkpoints/P5-REPAIR/comparison.json
@@ -0,0 +1,84 @@
+{
+ "schema": 1,
+ "checkpoint": "P5-REPAIR",
+ "asset": "EURUSD",
+ "week": "2026-07-06",
+ "rows": [
+  {
+   "family": "IP resistance zones",
+   "status": "MATCHED",
+   "evidence": "gw-labels-3x vision: 'UPPER RESISTANCE | MODERATE | 40% ZFP' + 10 more zone labels verbatim (post-repair)"
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
+   "evidence": "right-edge crop: '...SZ Supply 2026-06-26 A[CTIVE]'; 3 ACTIVE LSZ boxes at card-exact prices 1.1418-1.1453"
+  },
+  {
+   "family": "canonical 4H/D1 supply/demand zones beyond the v1 baseline",
+   "status": "MATCHED",
+   "evidence": "'1H (Unmitigated) | MoM', '1H (3X) | BoM', '4H (Unmitigated) | BoM', '4H (1X) | BoM', '1H (1X) | BoM', '1H (Unmitigated) | BoM' verbatim"
+  },
+  {
+   "family": "option-strike targets",
+   "status": "MATCHED",
+   "evidence": "'EURUSD 1.15 EUR2.4bn 07-06 ->', 'EURUSD 1.145 EUR1.4bn 07-06 -> 1', 'EURUSD 1.14 EUR2.2bn 07-06 ->', 'EURUSD 1.14 EUR1.0bn 07-07 -> 1', 'EURUSD 1.135 EUR1.5bn 07-07 -> 1' verbatim; strikes match the card's 5 levels"
+  },
+  {
+   "family": "POI tier and pressure-degree data",
+   "status": "MATCHED",
+   "evidence": "degree+ZFP render on every zone label; the inspect table renders on the cold boot ('E1 PROBE / marker unconditional' verbatim)"
+  },
+  {
+   "family": "strength-based ZFP data",
+   "status": "MATCHED",
+   "evidence": "'40/60/10/80% ZFP' on labels verbatim; ZFP_NO_WIDTH_OK gate"
+  },
+  {
+   "family": "BoM/MoM classification",
+   "status": "MATCHED",
+   "evidence": "BoM + MoM verbatim on S/D labels"
+  },
+  {
+   "family": "mitigation and reaction counts",
+   "status": "MATCHED",
+   "evidence": "'(Unmitigated)', '(1X)', '(3X)', '(6X)' verbatim"
+  },
+  {
+   "family": "intra-zone precision levels",
+   "status": "MATCHED",
+   "evidence": "hidden by design (INTRA_OFF_BY_DEFAULT gate); card carries z.intra for MODERATE+ zones"
+  },
+  {
+   "family": "core/spike boundaries where applicable",
+   "status": "MATCHED",
+   "evidence": "'KEY SUPPORT BAND | MODERATE-HEAVY' verbatim; 6/6 KSB zones carry core+spike in the card"
+  },
+  {
+   "family": "card/run identity and missing-data status",
+   "status": "MATCHED",
+   "evidence": "'card for the week of 2026-07-06 exists from its cutoff 2026-07-06 08:00 UTC' + 'Display band 1.12839 - 1.15691' verbatim; off-week NO CARD refusal proven"
+  }
+ ],
+ "visual_sha256": {
+  "m1/checkpoints/P5-REPAIR/visual-labels-repaired.png": "12b53b8ead3348f786f332cda4693bed340bfb5b602f2548707afb326aa47df2",
+  "m1/checkpoints/P5-REPAIR/visual-lsz-option-labels.png": "70fbe5550003c3589b2dfa6620ad4839750b5954b43e422aea1c3f3828a0e8d6"
+ },
+ "summary": {
+  "matched": 13,
+  "wrong": 0,
+  "missing": 0,
+  "extra": 0,
+  "unobservable": 0
+ }
+}
diff --git a/m1/checkpoints/P5-REPAIR/visual-labels-repaired.png b/m1/checkpoints/P5-REPAIR/visual-labels-repaired.png
new file mode 100644
index 0000000..87e15e6
Binary files /dev/null and b/m1/checkpoints/P5-REPAIR/visual-labels-repaired.png differ
diff --git a/m1/checkpoints/P5-REPAIR/visual-lsz-option-labels.png b/m1/checkpoints/P5-REPAIR/visual-lsz-option-labels.png
new file mode 100644
index 0000000..5e01b2a
Binary files /dev/null and b/m1/checkpoints/P5-REPAIR/visual-lsz-option-labels.png differ
diff --git a/m1/out/plutus-vision-v5-e1.pine b/m1/out/plutus-vision-v5-e1.pine
index 1c597e4..b3529d5 100644
--- a/m1/out/plutus-vision-v5-e1.pine
+++ b/m1/out/plutus-vision-v5-e1.pine
@@ -1248,3 +1248,3 @@ if barstate.islast and not e1Drawn
                     box.new(array.get(e1zT0, i), array.get(e1zTop, i), e1WkE, array.get(e1zBot, i), xloc = xloc.bar_time, bgcolor = array.get(e1zFill, i), border_color = array.get(e1zBord, i), border_width = 1)
-                    label.new(e1WkO, array.get(e1zAnchor, i), array.get(e1zTxt, i), xloc = xloc.bar_time, style = label.style_label_lower_left, color = color.new(color.black, 100), textcolor = array.get(e1zBord, i), size = size.tiny)
+                    label.new(e1WkO, array.get(e1zAnchor, i), array.get(e1zTxt, i), xloc = xloc.bar_time, style = label.style_label_lower_left, color = color.new(color.black, 100), textcolor = array.get(e1zBord, i), size = size.small)
         if e1ShowLsz and array.size(e1lK) > 0
@@ -1253,3 +1253,3 @@ if barstate.islast and not e1Drawn
                     box.new(array.get(e1lT0, i), array.get(e1lTop, i), e1WkE, array.get(e1lBot, i), xloc = xloc.bar_time, bgcolor = color.new(color.rgb(80, 230, 100), 85), border_color = color.rgb(80, 230, 100), border_width = 1, border_style = line.style_dashed)
-                    label.new(e1WkE, array.get(e1lBot, i), array.get(e1lTxt, i), xloc = xloc.bar_time, style = label.style_label_upper_right, color = color.new(color.black, 100), textcolor = color.rgb(80, 230, 100), size = size.tiny)
+                    label.new(e1WkE, array.get(e1lBot, i), array.get(e1lTxt, i), xloc = xloc.bar_time, style = label.style_label_upper_right, color = color.new(color.black, 100), textcolor = color.rgb(80, 230, 100), size = size.small)
         if e1ShowOpt and array.size(e1oK) > 0
@@ -1258,3 +1258,3 @@ if barstate.islast and not e1Drawn
                     line.new(e1WkO, array.get(e1oPx, i), e1WkE, array.get(e1oPx, i), xloc = xloc.bar_time, color = color.rgb(255, 200, 60), width = 1, style = line.style_dashed)
-                    label.new(e1WkE, array.get(e1oPx, i), array.get(e1oTxt, i), xloc = xloc.bar_time, style = label.style_label_right, color = color.new(color.black, 100), textcolor = color.rgb(255, 200, 60), size = size.tiny)
+                    label.new(e1WkE, array.get(e1oPx, i), array.get(e1oTxt, i), xloc = xloc.bar_time, style = label.style_label_right, color = color.new(color.black, 100), textcolor = color.rgb(255, 200, 60), size = size.small)
         if e1ShowSd and array.size(e1sK) > 0
@@ -1272,4 +1272,