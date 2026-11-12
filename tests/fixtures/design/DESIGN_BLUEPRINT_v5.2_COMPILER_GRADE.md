# DESIGN BLUEPRINT v5.2 — PLUTUS VISION: COMPILER-GRADE PRODUCTION E1

**Status:** FOR OPERATOR REVIEW. The compiler-grade production-E1 design: complete target wiring, exact interfaces, deterministic task graph, organ layer, renderer contract, Bend proof boundary, and model-based-compiler execution contract. `artifact_class: system`
**Live implementation posture:** active M1 remains the current `m1/src` engine and CP-005 EURUSD golden-week baseline. No organ is integrated by this document.
**Authority:** `Original_Canon_Data/Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md` for E1, plus operator rulings in `MASTER_CONTEXT/OPERATOR_RULINGS_PV.md`.
**Donor reference, never authority:** `/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/PLUTUS/ARCHIVE/agent/Checkpoints/v4.5.3_CLEAN_BASELINE`.
**Supersedes upon approval:** `DESIGN_BLUEPRINT_v5.1_CLOUDFLARE.md`; V5.0 remains the original parent. The v4.1 design and archived Cloudflare draft remain non-inputs.
**Review notes:** `design/5.1 update notes.md:1`.
**Scope of this document:** Cloudflare acquisition and mechanical orchestration; complete E1 computation; complete E1 rendering on top of the approved v1 baseline; automatic asset/week selection; the Pinebox acceptance loop. E2 and E3 are explicitly deferred.
**Implementation partner:** `BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md`, the turn-by-turn model-based-compiler workflow for this design.

## MISSION

Deliver the full canonical E1 institutional map for the operator-selected golden week by extending the current M1 engine with the measured v4.5.3 OBCV, LMV, freshness, and pressure organs, sealing every result in an immutable card, and rendering it over the preserved V1 baseline in the running Pinebox instance for operator visual acceptance.

## SCOPE

In scope: E1 computation; OBCV S/D reconciliation; LMV precision rungs; freshness event ledger; pressure/defense state; the immutable E1 card schema; the Pinebox golden week render and A/B organ decision; Cloudflare Worker/DO/R2/D1 target execution; the optional Bend proof-certificate boundary; deferred E2 anchor contracts; and the provenance/failure-mode boundaries defined by this blueprint. Out of scope: old v4.5.3 runtime/clients, invented zones, E3, random-week generalisation before operator unlock, and any Pinebox product-code modification.

## ACCEPTANCE CRITERIA

1. A running Pinebox cloud instance loads the generated composition for the operator-selected golden week and returns a real room/indicator artifact with a nonzero exit code on failure.
2. The sealed E1 card contains every required canonical family and complete OBCV, LMV, freshness, and pressure metadata with donor provenance.
3. The opened Pinebox capture proves the full E1 map over the preserved V1 baseline, with every organ decision measured against the golden-week oracle and no previously accepted family regressed.
4. No organ is promoted without a committed A/B capture, object-budget measurement, provenance SHA, and operator visual verdict.
5. The Cloudflare Worker/DO implementation returns the same deterministic E1 card SHA as the local run for identical typed evidence, and an optional Bend certificate records structural conservation without replacing the E1 runtime.

---

## 0. THE OPERATOR'S TARGET, VERBATIM

> "you need to also integrate this ON TOP OF the foundation laid with /home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/PLUTUS_VISION/Checkpoints/v1-ship-approved-working-baseline ~ this is a combination of LuxAlgo's liquidity + S/D indicators. the Liqudity zones are A+ and the S/D are A- need some minor improvement to catch ALL the relevant zones but this already solves 1 side of the coin so you just need to add the E1 canon from the prompt (2nd side of the coin) to be rendered ON TOP OF this. that way it can auto detect any trading week and render the ACCURATE zones for that specific tradying week. FULL E1 data no partial bullshit"

That is the unchanged acceptance target. V5.2 adds only selected donor organs beneath that target: OBCV repairs S/D coverage, LMV supplies precision edges, and freshness/pressure supply metadata. It does not relax full-E1 acceptance.

**V5.2 donor ruling:** the old MDVE/LMV architecture is valuable, but LuxAlgo remains the visual floor and the current M1 engine remains canonical. Selected organs are transplanted through adapters; the old repository is not merged. It is not "six plausible bands." It is not a harvested JSON file. It is not a Cloudflare health check. It is not a report that mentions the other eight pillars while only one changes pixels.

---

## 1. THE ARCHITECTURE IN ONE PICTURE

```
┌─────────────────────────────┐
│  PINEBOX                    │
│  chart asset + target week  │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  CLOUDFLARE WORKER          │
│  run = asset + Monday       │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  PI-DURABLE OBJECT          │
│  ordered code tasks         │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  SOURCE EXECUTORS           │
│  bars / pages / macro data  │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  NAMED MODEL STEPS ONLY     │
│  Clairic reads, Clef judges │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  FULL E1 CODE               │
│  nine pillars + all classes │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  IMMUTABLE E1 CARD          │
│  evidence → zones → render  │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  V1 BASELINE + E1 LAYER     │
│  one new composition        │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  LOOK AT PINEBOX CHART      │
│  true/false, then Clef/Jev  │
└─────────────────────────────┘
```

There are **two independent source planes**:

1. **Cloudflare** fetches bars, public pages, macro releases, options images and institutional research; stores raw evidence; runs the mechanical E1 pipeline; emits one immutable card per `(asset, week)`.
2. **The local host** does only the two things Cloudflare cannot do: operate the headed investinglive browser and render the real Pinebox chart for visual acceptance.

The two planes meet at named bindings, not an agent loop and not a local orchestration daemon.

---

## 2. THE BASELINE: EXACTLY WHAT IS PRESERVED AND WHAT IS NOT

### 2.1 The file identities, measured on 2026-11-07

| identity | path | lines | SHA-256 |
|---|---|---:|---|
| operator-named working baseline | `Checkpoints/v1-ship-approved-working-baseline/dist/plutus-vision-v1.pine` | 1,179 | `82da437af969a3157bd9454cbe70497ce01cf71fe4681b9e2401b754aa90cd43` |
| archived sealed H1 renderer | `archive/pre-v5-2026-11-08/head/pine-ide/ide/renderer/plutus-vision-v1.pine` | 1,270 | `0d20e8314ce992fc23e27f1b97fed76b981c84e78c647bbe6b3d6e1206517bd1` |

They are different files. **H1 remains untouched.** The composition starts from the operator-named checkpoint baseline, not from an assumption that those two files are identical.

The archived v1 generator, `archive/pre-v5-2026-11-08/head/scripts/lqz_vision_build.py:52-90`, assembles:

- the LuxAlgo SMC section from `archive/pre-v5-2026-11-08/head/plutus-vision-v0.pine`;
- `archive/pre-v5-2026-11-08/head/plutus-vision-lqz/lqz-core.pine`;
- `archive/pre-v5-2026-11-08/head/plutus-vision-lqz/lqz-render.pine`;
- a single indicator declaration.

The baseline contains LuxAlgo S/D/order-block machinery, structural tools and the operator's candle-liquidity engine. Its full-width emitter is `f_lqzRender()` (`Checkpoints/v1-ship-approved-working-baseline/dist/plutus-vision-v1.pine:1140-1160`). It keeps the most recent levels in a bounded buffer (`:886-893`), clusters and scores them, then emits liquidity bands. Its default detector is `"candles"` (`:867`). The LuxAlgo tap functions are stubs returning empty values (`:5-9`).

**Therefore:** this is a working price-structure baseline, not four functioning LuxAlgo liquidity feeds. The v5 design preserves the measured working baseline and does not describe its stubs as external E1.

### 2.2 Add-only composition through the live M1 generator

The active implementation already owns this seam:

```text
m1/src/run.ts        -> m1/out/e1-card-<asset>-<monday>.json
m1/src/compose.ts    -> m1/out/plutus-vision-v5-e1.pine
```

`m1/src/compose.ts:18` reads the exact checkpoint baseline, and `m1/src/compose.ts:148-149` writes the generated composition. V5.2 extends that generator; it does not create the old `scripts/plutus_vision_v5_build.py` path and does not write into the archived `pine-ide/` tree.

The composition reads, never modifies:

- `Checkpoints/v1-ship-approved-working-baseline/dist/plutus-vision-v1.pine`;
- every sealed card under `m1/out/e1-card-*.json`;
- the current E1 renderer emitted by `m1/src/compose.ts`.

The v1 declaration, detector, S/D logic, liquidity clustering and full-width emitter remain intact. New E1 declarations keep the existing `e1v5_` namespace. There is one `indicator()` declaration and one final render block. v1 renders first; E1 draws after it. A later Cloudflare port may reuse this generator contract, but it must not fork a second composition generator without a new operator ruling.

### 2.3 Existing E1 work is not the v5 foundation

The repository already contains partial E1 machinery. It is reusable only where it implements canon, not by inheritance:

- `archive/pre-v5-2026-11-08/head/plutus-vision-lqz/e1-render.pine:18-22` supports at most six zones and a small table.
- `archive/pre-v5-2026-11-08/head/plutus-vision-e1-automatic.pine:2-31` has IP/options/table visibility and fixed historical date inputs.
- `archive/pre-v5-2026-11-08/head/pine-ide/ide/renderer/plutus-vision-v2.pine:1351-1408` contains a chart-derived approximation whose comments describe selected pillars and an intraday proxy.
- `archive/pre-v5-2026-11-08/head/scripts/e1_extract.py:1047-1243` clusters a subset of pillars into a positional ladder and limits the result to five zones (`:1213-1216`).
- `archive/pre-v5-2026-11-08/head/scripts/e1_extract.py:154-183` contains a Yahoo OHLC reader, contrary to R-23.
- `archive/pre-v5-2026-11-08/head/plutus-vision-lqz/e1-render.pine:151-155` still contains the width-derived ZFP function; R-17 makes strength the only ZFP basis.

These are **evidence of partial prior work, not authority**. The v5 card and full-output renderer replace the six-zone/five-slot model and the chart-proxy computation. Canon-correct colour and drawing helpers can be ported; no approximation is promoted because it is convenient.

---

## 3. THE E1 OBJECT: WHAT "FULL" MEANS

The prompt defines Engine 1 at `Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:348`:

> "9-Pillar 6D Hybrid System + 4H Zone Overlay + POI Tier Classification + Zone Reaction Counter + BoM/MoM Classification"

It answers where the walls are, how strong they are, which are real and which still have reactions left.

A complete E1 output has:

- every retained level, its pillar, exact price, provenance, source time and cutoff status;
- all computed IP zones, including zones excluded from the synthesis view;
- all LSZs, with type, priority, source dates and optional BoM overlap;
- all canonical 4H/D1 supply/demand zones, with BoM/MoM and mitigation state;
- intra-zone precision levels and core/spike separation where applicable;
- six-dimension scoring and structural-extreme bonus;
- pressure degree, POI tier, strength-based ZFP and measured-move target when triggered;
- BoM/MoM, mitigation and reaction counts;
- ladder-step status and other E1 metadata needed downstream;
- LMV defended-edge/reaction-extreme precision and freshness/pressure state;
- pair-translation evidence and Layer 2 verdicts for EUR/USD and GBP/USD;
- missing-data records with their impact, never silent omission.

### 3.1 The nine pillars and the baseline boundary

| Pillar | Canonical computation and evidence | Baseline relation |
|---|---|---|
| **P1 — Multi-timeframe pivots** | Classic, Fibonacci, Camarilla; weekly plus each of the last three daily sets; extended overlapping historical periods; arithmetic/order verification before use (`:967-1059`) | **New external computation.** v1 does not implement this variable multi-set pivot engine |
| **P2 — MA confluence** | EMA/SMA 9/10/20/50/100/200, 3+ within 0.15 DXY, recapture of 50/100/200 within three sessions (`:1065-1079`) | **New.** Not the four chart EMAs in the old v2 approximation |
| **P3 — Component option conversion** | Full DXY formula and weights, with current component rates, audit trail and notional tiers (`:1092-1165`) | **New.** Cloudflare calculation; no Pine conversion code |
| **P4 — Institutional commentary** | Explicit analyst levels only; tiers 1/2/3 weights 3/2/1; consensus across sources (`:1179-1199`) | **New.** Named model extraction step, then code scoring |
| **P5 — Structural extremes, price anchors, liquidity engineering** | 90/180-day D1, 4H and conditional 1H scans; order blocks, LSZs, magnets, intra-zone levels, core/spike and BoM/MoM (`:1205-1421`) | **Partial overlap.** Preserve v1 visuals; canonical P5 is independently computed and completes missing zones |
| **P6 — Fibonacci and round-number grid** | Prior-week/extended swings, fib levels and big figures (`:1424-1426`) | **New full implementation.** No arbitrary proximity filter |
| **P7 — Derivatives arena** | Wide pressure-arena boundaries; primary 9-pillar map remains the source of exact zones (`:1430-1432`) | **New.** Supplementary evidence, not a replacement zone source |
| **P8 — EUR/USD primary strike conversion** | EUR/USD strikes and notional confidence using the current K factor; tiers and audit trail (`:1436-1451`) | **New.** EUR/USD P3 output feeds P8; it is not final (`:1163`) |
| **P9 — Regime, ZFP and breakout magnitude** | Regime classification, strength-based failure probability and measured-move projection for ZFP >45% (`:1455-1459`) | **New.** No pixel/width-derived ZFP |

### 3.2 Scoring and zone assembly are not the liquidity cluster

The canonical six dimensions are Technical, Options-Derived, Analyst Consensus, Structural, Psychological and Regime/Dynamic, each 0–2 points, plus up to +2 Structural Extreme Bonus (`:1465-1484`).

- **12–14:** EXTREME
- **10–11:** HEAVY
- **8–9:** MODERATE-HEAVY
- **6–7:** MODERATE
- **4–5:** LIGHT
- **0–3:** MINIMAL

Every level from every pillar is retained without filtering by distance from spot (`:1496-1503`, and the principle at `:722-735`). Levels within 0.15 DXY are high-density; within 0.10 DXY they are tight confluence. A group's pressure degree follows its highest-scoring level.

This is **not** the v1 liquidity clustering algorithm. E1 does not feed its institutional map into `lqzSink()` and call the output canonical. The two engines coexist: v1 draws its price-derived liquidity; E1 draws the canonical institutional map with its own data and provenance.

### 3.3 Full-output versus synthesis

`Part V §5.2.1` says MODERATE and above appear in the clean synthesis, while LIGHT and MINIMAL remain in the full protocol output (`:1631-1646`). v5 preserves both:

- **full card:** all canonical zones and evidence;
- **default chart synthesis:** MODERATE and above;
- **full-data inspection layer:** LIGHT, MINIMAL, excluded and rejected candidates with named reasons, visible on demand and always present in the card.

A display mode is not permission to discard data. A cap of five or six zones is not a canonical substitute for this two-view model.

### 3.4 Classifications that must survive into the card

- **BoM/MoM:** origin versus continuation of a directional move (`:1145-1152`).
- **Reaction count:** 0 virgin, 1–2 active, 3+ depleted (`:1154-1161`).
- **Mitigation:** 0X, 1X, 2X, 3X and paradox 4–5X holding (`:1378-1385`).
- **POI tier:** computed confluence, not a decorative constant.
- **Zone role:** resistance ceiling, upper resistance, equilibrium, mid-range support, key support band, LSZ, breakout extension target.
- **Intra-zone levels:** precision floor/ceiling/mid-anchor and their sources (`:1312-1339`).
- **Core/spike:** body core versus wick extension and its half-score LSZ treatment (`:1411-1420`).

---

## 4. AUTOMATIC ASSET AND WEEK SELECTION

### 4.1 Run identity

Every run has exactly one identity:

```json
{
  "asset": "DXY",
  "week_monday": "2026-07-06",
  "requested_by": "pinebox-week-selection"
}
```

The selected Pinebox week determines the Monday; the chart symbol determines the asset. No default golden-week literal is allowed in production. The golden week is a test fixture, not an engine constant.

The Worker rejects a non-Monday date as `W0_WEEK_NOT_MONDAY`. It rejects an unsupported symbol as `W0_ASSET_UNSUPPORTED`. An unknown chart ticker renders a named refusal, not DXY data.

### 4.2 Time window and no hindsight

The trading week is:

- open: Sunday 22:00 UTC before Monday;
- information cutoff: Monday 09:00 London, including the fixed UK daylight-saving table;
- end: Friday 21:00 UTC.

This is the single window rule carried forward from the archived v4.1 design at `archive/pre-v5-2026-11-08/uncommitted-2026-11-08/design/DESIGN_BLUEPRINT_v4.1_CLOUDFLARE.md:328-339`, and it matches the canon's temporal-boundary requirement at `Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:427-441`.

The selected week's future candles are **test observations**, never E1 inputs. The Pinebox chart can show the week's outcome while E1 uses only evidence available at the boundary. Raw evidence carries publication and retrieval timestamps. A post-cutoff record is stored for audit but cannot affect the prediction.

### 4.3 Render interval

Part X uses the data week's Monday minus 14 days and Friday plus 21 days, with `xloc.bar_time` (`:3755-3769`). The renderer calculates those timestamps from the selected card. There are no fixed April or July dates in the engine.

---

## 5. CLOUDFLARE EXECUTION: A MECHANICAL TREE, NOT AN AGENT LOOP

### 5.1 The control plane

- **Worker:** validates `(asset, week)`, starts or retrieves a run, serves the resulting card and generated Pine.
- **Durable Object named `e1:<asset>:<monday>`:** serialises one run and its write-once base card. A second request reads the first card's hash; it does not overwrite it.
- **Derived V5.2 card:** organ metadata never mutates the base card. A derived card bumps `schema_version`, recomputes SHA-256, records `supersedes_sha256`, and is stored as a new versioned object. The only permitted transition is base → organ-derived for the same asset/week; no second derived generation may branch without an operator ruling.
- **pi-durable code Tasks:** execute the named steps inside the Durable Object (R-21, Option A). The orchestration is a fixed tree of code calls. No model chooses the next step.
- **R2:** immutable raw source bytes, screenshots/images, normalized evidence, base cards, derived cards, and generated Pine. Keys include asset, week, source, card generation, and retrieval timestamp.
- **D1:** searchable run, source, evidence, zone, judgement and acceptance metadata. R2 remains the byte authority.
- **Worker secrets:** the plutus-browser bearer token and any provider credentials, never in the card or Pine.

### 5.2 Ordered run steps

| Step | Owner | Input | Output | Failure |
|---|---|---|---|---|
| **R0 Resolve** | Worker | chart asset + selected Monday | validated run identity and window | named input refusal |
| **R1 Acquire independent sources** | code tasks | source manifest | raw evidence in R2 | per-source named error; no fabricated bytes |
| **R2 Normalize** | code tasks | raw evidence | typed OHLC, macro values, page text, image references | source-specific schema error |
| **R3 Read images/text** | Clairic tasks | stored images and source text | candidate fields with spans and confidence | named extraction failure; no invented numbers |
| **R4 Reconcile** | code | independent reads | confirmed or `[UNCLEAR]` fields | conflicts cannot enter calculations |
| **R5 Compute nine pillars** | code | confirmed evidence | all levels and provenance | missing evidence recorded, no proxy pillar |
| **R6 Assemble E1** | code | all pillar outputs | zones, scores, classifications, reactions and ZFP | arithmetic/provenance error |
| **R7 Judge** | Clef | compact receipts and expected checks | bounded verdicts | model unavailable = unjudged, not approved |
| **R8 Seal** | Durable Object | validated E1 object | immutable card + SHA | write/hash failure |
| **R9 Compose** | code | card + baseline | generated v5 Pine | schema/render-generation error |
| **R10 Accept** | operator + Pinebox | real chart | true/false, then Clef/Jev score | below 95% = not accepted |

R1 independent reads run concurrently with per-source result capture. The stages that consume evidence remain ordered. No failed source turns into a fabricated substitute; its missing-data row states the impact.

### 5.3 Model boundaries

**Clairic** reads an image or source document into typed candidate values. It does not decide a zone's pressure, trade direction, next step or completion. Protocol A uses its three required image passes and two-of-three reconciliation (`Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:836-853`).

**Clef** judges explicit receipts and chart failures. It does not create source data, repair missing values or declare acceptance on its own.

**Jev** is used for local calibrated classification/scoring where applicable. The code owns all branches and effects. No model verdict can replace a chart observation.

---

## 6. SOURCE EXECUTORS: ALL NINETEEN CANONICAL INPUT FAMILIES

The source list is `Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:747-767`, with execution order at `:778-800`. The v5 implementation uses the source **data**, not the prompt's obsolete tool brand names. The existing local `z-ai` commands are not a Cloudflare architecture.

| Canon item | Executor in v5 | Evidence required | Measured status on 2026-11-07 |
|---|---|---|---|
| investinglive OTC expiries | **Local plutus-browser**, called through Worker VPC binding | date-specific page URL, embedded image bytes, three-pass extraction, reconciliation | Headed page and expiry rows read; Worker→tunnel `/health` proven. Full Protocol A image pipeline **not built** |
| ForexFactory calendar | Cloudflare Browser Run or direct parser where sufficient | event name, exact date/time, impact, forecast/previous | Page retrieval measured working |
| TreasuryDirect auctions | HTTP JSON | auction date/security/CUSIP, bid-to-cover | Plain API available; v5 parser not built |
| FRED RRP | HTTP CSV/data endpoint | value and publication date | Direct browser retrieval unsuitable; data fetch to implement |
| EIA WPSR | HTTP PDF/document + extraction | release time and inventory deviation | Release-window restrictions recorded; parser not built |
| Fed H.10 | HTTP page/table | current component rates and publication date | Retrieval measured working |
| Yahoo DXY history | **Replaced by TradingView OHLC** (R-23) | daily/weekly H/L/C and timestamps | No Yahoo dependency allowed |
| TradingView DXY OHLC | **TradingView tvDatafeed-compatible client in Cloudflare** | D1/4H/1H bars sufficient for 90/180-day scans | Not implemented in the Worker |
| TradingView DXY technicals | Cloudflare Browser Run/HTTP DOM extraction | EMA/SMA values and buy/sell/neutral counts | Page loads; MA-value extraction unproven |
| forex.com DXY research index | Cloudflare page retrieval | article URL, title, timestamp | Index measured loading |
| DXY institutional search | Approved web search/retrieval step | dated article text and explicit levels | Executor not selected/deployed |
| DXY technical research | Cloudflare page retrieval | dated institutional text | Not built |
| DXY Q&A research | Cloudflare page retrieval | dated institutional text | Not built |
| TradingView DXY structured research | Cloudflare page retrieval | structured dated levels | Not built |
| EUR/USD technicals | Cloudflare page retrieval + pair OHLC | pair MAs, consensus, H/L/C | Not built |
| GBP/USD technicals | Cloudflare page retrieval + pair OHLC | pair MAs, consensus, H/L/C | Not built |
| AUD/USD technicals | Cloudflare page retrieval + pair OHLC | pair MAs, consensus, H/L/C | Not part of the three-asset acceptance set; source family retained |
| EUR/USD institutional search | Approved retrieval step | pair-specific dated explicit levels | Not built |
| GBP/USD institutional search | Approved retrieval step | pair-specific dated explicit levels | Not built |
| AUD/USD institutional search | Approved retrieval step | pair-specific dated explicit levels | Source family retained |

### 6.1 The headed acquisition path

```
┌─────────────────────────────┐
│  WORKER / PI-DURABLE        │
└──────────────┬──────────────┘
               │ BROWSER.fetch
               ▼
┌─────────────────────────────┐
│  WORKERS VPC SERVICE        │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  NAMED TUNNEL               │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  PLUTUS-BROWSER ID 20       │
│  local port 30020           │
└──────────────┬──────────────┘
               ▼
┌─────────────────────────────┐
│  IMAGE + URL TO R2          │
└─────────────────────────────┘
```

The production call is a Worker `vpc_services` binding named `BROWSER` to service `01a1b53f-a0b8-7de2-a193-78f0b6d5f835`, reaching `http://localhost:30020` through named tunnel `972a42d8-fad2-44c9-8abb-cb39b9d823c3`.

The Worker uses the bearer token from a Worker secret for every route except `/health`. The local instance is started with `plutus-browser up --id 20`. plutus-browser is **not** the orchestrator, not a second Pinebox and not a substitute chart environment.

### 6.2 The tunnel is historically proven, not production-complete

Historical pre-R-39 proof: a probe Worker returned `/health` 200 with the local instance PID and `/status` 401 without the bearer token; the probe Worker was then deleted and the instance stopped. R-39 now forbids this build from reading, copying, listing, or editing the external plutus-browser/package trees, so that evidence is historical context only and no V5.2 build step may read it.

Remaining operational work:

- run cloudflared as a supervised service, not a one-off `setsid` process;
- define the startup/health contract for instance 20 before a harvest;
- store the token as a Worker secret;
- prove the complete date-page → image → R2 → Clairic chain, not only `/health`.

---

## 7. PAIR ARCHITECTURE: DXY DIRECTION, PAIR-SPECIFIC PRICES

The causal model is one-directional: USD macro forces → DXY → EUR/USD and GBP/USD (`Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:3261-3310`).

**The only valid translation is Structural Equivalence (Approach B):**

1. Complete and verify the DXY E1 map.
2. Read DXY directional conviction and map its role to the pair role.
3. Harvest the pair's own MAs, swings, research, options, fib and round levels.
4. Match the conviction to the pair's own structural levels.
5. Apply Layer 2 verification.
6. Record the source DXY zone, mapping rule, pair sources, verification, divergences and final status.

DXY resistance maps to pair support; DXY support maps to pair resistance; LSZ direction inverts. The **prices never convert arithmetically** (`:3336-3360`). P3/P8 option-strike conversion is an E1 input to the **DXY** map; it is not a licence to convert DXY zones into pair prices.

### 7.1 Layer 2 requirements

For each pair and translated zone:

- two independent spot sources agreeing within five pips;
- TradingView 200-day MA;
- at least three institutional S/R levels from at least two independent sources;
- MA signal consensus;
- prior-week H/L/C from the pair's own bars;
- pair options data where available, otherwise the named no-data status;
- translated zone within 100 pips of a verified pair structural level.

The statuses are VERIFIED HIGH (7/7), VERIFIED MODERATE (5–6/7), PARTIALLY VERIFIED (3–4/7), UNVERIFIED (<3/7), with the treatment specified at `:3466-3485`. Zone edge roles ultimately follow the pair's own data where it conflicts with the DXY implication (`:3647`). Every translated zone carries the audit fields at `:3660-3683`.

Yahoo/yfinance references in this canon section are superseded by R-23: all OHLC and bar-derived pair data come from TradingView.

---

## 8. THE E1 CARD: CONTRACT BETWEEN COMPUTATION AND RENDERING

### 8.1 Versioned immutable object

Each card has `schema_version`, `asset`, `week_monday`, `window`, `source_manifest`, `pillars`, `zones`, `translation`, `missing_data`, `judgements`, and `render_policy`. The Durable Object seals it once. Its SHA is embedded in the generated Pine and displayed in its audit table.

### 8.2 Evidence record

Every external value retains:

```json
{
  "source_id": "investinglive",
  "source_url": "https://investinglive.com/orders/...",
  "retrieved_at": "...",
  "published_at": "...",
  "raw_r2_key": "e1/DXY/2026-07-06/investinglive/....png",
  "content_sha256": "...",
  "extractor": "clairic-protocol-a",
  "extractor_version": "...",
  "span": "...",
  "confidence": null,
  "cutoff_status": "BEFORE_CUTOFF"
}
```

A model cannot manufacture an evidence record. A missing value has a named missing-data record instead.

### 8.3 Level and zone records

A level carries `id`, `pillar`, `kind`, `price`, `source_evidence_ids`, `timeframe`, `formed_at`, `scores`, `legacy_bonus`, `structural_bonus`, `verification` and `notes`.

A zone carries at minimum:

- `id`, `top`, `bottom`, `mid`, `role`, `name`, `timeframe`;
- constituent `level_ids` and independent `pillar_ids`;
- six dimension scores, structural-extreme bonus, total score and pressure degree;
- POI tier, strength-based ZFP and optional measured-move target;
- BoM/MoM, mitigation count, reaction count and their source bars;
- sweep status, ladder-step status, entry/TP classification where E1 requires it;
- LSZ type/priority/extension/source dates where applicable;
- intra-zone precision levels and core/spike fields where applicable;
- synthesis visibility and the reason for any exclusion;
- pair translation audit and Layer 2 verdict when on EUR/USD or GBP/USD.

The card is self-describing: the chart does not infer BoM/MoM, ZFP or POI tier from colours or widths.

### 8.4 Refusal and incomplete data

No card is labelled COMPLETE unless the required protocol evidence and validations are present. If a source is missing, the card says what is missing and the impact. It does not silently turn the missing source into a neutral score. A run that cannot establish required arithmetic or provenance returns `E1_CARD_INVALID` and no renderable card.

---

## 9. RENDERING: EVERY E1 FAMILY ON TOP OF V1

### 9.1 The layering law

The new composition draws **v1 first**, then E1. v1's LuxAlgo S/D and liquidity bands remain available. E1's renderer never mutates v1 arrays or changes v1 zone meaning.

The E1 payload is generated from the card. Pine contains final verified pair-specific prices, timestamps, labels and classifications. It contains no DXY formula, no reverse pair conversion, no web access and no agent decision loop.

### 9.2 Render coverage matrix

| E1 object | Chart representation | Data/inspection representation |
|---|---|---|
| IP resistance | RED pressure-ladder box, 30% fill, solid border | name, degree, strength-based ZFP, score, provenance |
| IP equilibrium | **#FF9800** orange pressure-ladder box | same complete receipt |
| IP support | TEAL pressure-ladder box | same complete receipt |
| LSZ | GREEN boxes; ACTIVE brighter/thicker | source swing/date, side, priority, BoM overlap and extension |
| Option strikes | AMBER lines; width 2 for ≥$1.5B, width 1 otherwise | strike, notional, source date/time, tier and expiry status |
| Canonical S/D | v1 LuxAlgo S/D **plus** canonical 4H/D1 zones not represented by v1 | origin candle date, BoM/MoM, mitigation and exact edges |
| POI tier/confluence | visible label/audit table | all six dimensions and structural bonus |
| BoM/MoM | S/D label and audit row | origin evidence and directional leg |
| Reaction/mitigation | audit row and optional compact label | counted events with bar/time references |
| Intra-zone levels | fine time-anchored lines within the parent zone | type and source (1H, fib, close, round) |
| Core/spike | distinct core/spike boundaries or audit rows | body-core versus wick-LSZ role |
| Regime/measured move | E1 audit table | regime, ZFP receipt and target when ZFP >45% |
| Missing data | visible named status, never a blank silent layer | protocol, reason, impact |
| Card/run identity | audit table | asset, Monday, window, card SHA, schema version |

This matrix is an implementation requirement. "Full E1" is false if any canonical family is merely computed and then omitted from the chart or its inspectable map.

### 9.3 The Part X S/D conflict and its resolution

Part X says S/D zones are not auto-mapped (`Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:3714`, `:3919`). R-30 later orders the **entire E1** on top of a baseline that already draws LuxAlgo S/D.

The design therefore separates two render paths:

- **Part X auto-generated E1 layers:** IP, LSZ and option strikes follow Part X's drawing rules.
- **R-30 operator-authorized composition:** the v1 S/D layer is retained and the canonical P5 4H/D1 zones are additionally rendered with their BoM/MoM and mitigation evidence.

This is the narrow, explicit resolution: **do not violate Part X's E1 render template; satisfy the later operator order by adding the separate canonical S/D overlay.** It does not delete S/D, hide it, or pretend LuxAlgo's approximation is the complete canonical scan.

### 9.4 Drawing contract

- `xloc=xloc.bar_time` for E1 boxes, lines and labels.
- **R-36 two-week clip:** every E1 object is clipped to `[week_monday - 7 days, week_friday 21:00 UTC]`; no object may start one month early or extend three weeks into the future.
- LSZ render start is its last qualifying pre-cutoff reaction or the left clip boundary, never an old origin candle by itself; old origins stay card-only.
- IP fill `color.new(base, 70)`, borders fully opaque.
- IP label: `"{ZoneName} | {PressureDegree} | {strength-based ZFP}% ZFP"`; full degree names.
- LSZ uses green boxes with no default text clutter; details remain inspectable.
- Option strike label at the interval midpoint.
- IP zones sorted top-to-bottom; independent blocks per asset.
- E1 drawing budgets declared explicitly; card validation counts required primitives before composition. A declared count is not proof the host runtime accepts it; the first Pinebox run measures actual capacity and refuses overflow by name.
- `var` arrays for generated data; separate asset blocks rather than ternary array selection.
- Price format: DXY `#.##`; EUR/USD and GBP/USD `#.####`.
- Unknown ticker: `E1_ASSET_UNSUPPORTED`, not a DXY render.
- Missing/invalid card: `E1_CARD_INVALID` with reason; v1 still renders, but no substitute E1 zones appear.

### 9.5 S/D correction work

The existing LuxAlgo order-block list is bounded and can delete zones on mitigation. That is a candidate explanation for missing zones, not a measured diagnosis.

The correction sequence is:

1. Compare v1's S/D objects with canonical P5's exact origin-candle zones on the golden week.
2. Identify missing, wrongly edged and wrongly classified zones separately.
3. Preserve the v1 visual language while adding every canonical zone required by P5.
4. Do not "fix" the problem by drawing every historical LuxAlgo block forever.
5. Re-render and inspect overlap, labels and candle readability after each change.

---

## 10. THE BUILD ORDER: E1 FIRST, E2/E3 LATER

E3 remains governed by `Original_Canon_Data/TRIDENT_v5.3.3_CORRECTED_E3_ENGINE.md`, not by the archived Python engine. It does not enter the implementation until E1 and E2 are accepted.

E2 is also outside this build's first acceptance gate. The new v5 composition must not inherit the existing v2 E2 path merely because the source file exists. Its table has no fabricated chain, alternative or trade rows.

The E1 pipeline can emit the fields E2 will need later—zone reactions, ZFP, role, ladder steps—without drawing an E2 path now.

---

## 11. THE ONLY ACCEPTANCE LOOP

### 11.1 Golden week

1. Start the required local browser and tunnel services.
2. Select the operator-designated golden-week asset in Pinebox — the live CP-005 review baseline is **EURUSD** (`m1/checkpoints/CP-005/checkpoint.json:5`); DXY remains an approved M1 asset — for the week **July 6–10**.
3. Run the complete Cloudflare acquisition and E1 computation for that week with its real information cutoff.
4. Generate and load the v5 composition in Pinebox.
5. Open the actual chart capture.
6. Compare the complete E1 map against the operator's oracle: all IP/LSZ/S/D/options and classifications.
7. **True at 95%+ or false.**
8. If false, score with **Clef/Jev**, name the incorrect family and mechanism, repair it and repeat the exact same chart scenario.
9. A corrected family cannot regress a previously accepted v1 or E1 family.

### 11.2 Generalisation

After the golden week:

- 15 random trading weeks since **2025-01-20**;
- DXY, EUR/USD and GBP/USD;
- uniform **95%+** acceptance;
- no hardcoded week prices, week-specific labels, zone literals or golden-week code branches.

The historical V5.0 fixture `archive/pre-v5-2026-11-08/head/fixtures/bars/2026-07-06.json` contained 382 1H DXY bars and was never a 90/180-day generalisation proof. The live build reads golden-week bars from the current M1/Pinebox data contract. Neither the archived fixture nor the current store is a random-week claim; the random-week matrix remains locked behind operator review.

### 11.3 What is not acceptance

- a Worker health check;
- a successful options page fetch;
- a card with arbitrary levels;
- a six-zone screenshot;
- a passing parser or unit battery;
- a model's assertion that the chart looks right;
- a source-only review.

---

## 12. IMPLEMENTATION WORKSTREAMS

### W0 — Freeze identity and the input contract

Define asset/week/window, card schema version, evidence timestamps, cutoff checks and immutable run identity. Establish the exact baseline input SHA and new output path.

### W1 — Cloudflare acquisition

Implement the Worker, Durable Object, pi-durable code tasks, R2/D1 records, TradingView bars, the remaining source executors, plutus-browser production binding and supervised local service startup.

### W2 — Extraction and reconciliation

Implement source schemas, Clairic Protocol A three-pass image reading, analyst-level extraction with source spans, reconciliation and missing-data records. Models cannot enter the orchestration path.

### W3 — Nine-pillar engine

Implement P1–P9 with formulas and verification. P1 runs all required weekly/daily/historical pivot sets. P5 includes its full structural and liquidity scans. P3/P8 retain current-rate audit trails. P9 uses strength only.

### W3a — Organ transplant

Quarantine reference copies, port adapters, run shadow organs, attach LMV/freshness/pressure metadata, convert OBCV candidates into canonically scored P5 levels before assembly, and promote nothing beyond an M1 candidate until the operator unlock. The complete stage contract is §16.11.

### W4 — E1 assembly and translation

Implement zone assembly, scoring, classifications, reactions, intra-zone levels, ZFP and measured move. Then DXY-first pair translation with Layer 2 verification and full audit trails.

### W5 — Card, derived metadata, and full renderer

Seal the immutable base card, write organ metadata only to a schema-versioned derived card, extend `m1/src/compose.ts`, and emit `m1/out/plutus-vision-v5-e1.pine` from the exact baseline. Implement IP, LSZ, options, canonical S/D and all required inspection layers. Remove the old five/six-zone and width-ZFP constraints from this path.

### W6 — Pinebox acceptance and repair

Run the golden-week visual loop, repair by measured defect family, then the random-week/three-asset matrix. The loop ends only on uniform chart acceptance or a named hard block.

### W7 — Package the working system

After chart acceptance, update the ship record and package the **actual deployed Worker artifacts, source inputs, baseline hash, E1 composition and acceptance evidence**. Do not package a design as a working indicator.

---

## 13. FAILURE MODES THE DESIGN MUST PREVENT

| Failure | Mechanism prevented |
|---|---|
| A handful of chart bands is called "full E1" | nine-pillar run manifest + full card + render coverage matrix |
| v1 liquidity is mistaken for the canonical map | separate E1 computation and renderer; v1 arrays untouched |
| Only six strongest zones survive | full-output and synthesis views; no positional five-slot ladder |
| DXY arithmetic creates pair prices | pair-specific acquisition and Part IX audit trail |
| Future week data changes the forecast | publication/cutoff checks on every evidence record |
| Options page text substitutes for the required image | embedded-image evidence + three-pass reconciliation |
| Model prose becomes a zone | typed evidence spans, code-owned calculations and immutable raw bytes |
| Width becomes ZFP | strength/type-based ZFP and modifiers only |
| Missing source silently becomes a valid score | named missing-data records and impact classification |
| Part X hides S/D | separate operator-authorized canonical S/D overlay |
| Pine is edited by hand for a week | generated card-specific arrays and timestamps |
| A passing local test is called indicator acceptance | Pinebox chart observation and Clef/Jev scoring |
| Old E2/E3 leaks into E1 delivery | v5 E1 composition has no inherited E2/E3 computation or path |
| Browser tool exists but harvest fails | production service supervision and full image-chain test |

---

## 14. CURRENT EVIDENCE AND HONEST REMAINDER

### 14.1 Proven

- The named v1 baseline exists at the measured hash above and its modular generator is understood.
- The complete E1 canon ranges governing this design were read first-hand, including Parts II–V, IX and X and Appendices A–C/E.
- Historical pre-R-39 state: plutus-browser was installed as a separate host tool, read real investinglive data, produced an opened capture, and proved Worker→VPC→named-tunnel `/health` 200 with unauthenticated `/status` 401.
- R-39 now places all plutus-browser/package trees outside this build; no V5.2 step reads or modifies them.
- The current partial E1 implementation's limits have been inspected: fixed/limited zones, chart-derived approximations, Yahoo references and width-derived ZFP remain in legacy paths and are not adopted.
- V5.0 exists and was forked into this V5.2 review document; `design/5.1 update notes.md:1` records the donor rationale.
- A local/disk M1 implementation exists and has produced a golden-week card and composition through CP-005 (`m1/src/run.ts:1`, `m1/src/compose.ts:1`).
- CP-003 measured operator-zone overlap `9 YES / 4 PARTIAL / 0 MISS`; CP-004 measured outcome `6/8 = 75.0%`; CP-005 recorded the operator review that the data render is correct but presentation is unreadable (`m1/checkpoints/CP-005/checkpoint.json:50-61`).
- The non-bypassable git gate is live and has accepted visual checkpoints CP-001 through CP-005.

### 14.2 Not built or not proven

- No v4.5.3 organ is copied, adapted, shadow-run, or promoted yet.
- No production Cloudflare Worker/DO/pi-durable E1 pipeline is deployed.
- TradingView acquisition in Cloudflare, the full nineteen-source production matrix, and the Protocol A R2 image chain are not deployed.
- `plutus_browser` tool-surface invocation and reboot-persistent tunnel supervision remain unproven in the production pipeline.
- No 95% E1 result or random-week generalisation claim exists. CP-005 presentation must be repaired before organ promotion.

---

## 15. REVIEW POINTS FOR THE OPERATOR

These are explicit design consequences, not requests to reduce scope:

1. **Baseline:** v5 starts from the named 1,179-line checkpoint and never edits the 1,270-line H1 seal.
2. **Full E1:** the old five/six-zone output is rejected as the v5 target. Full protocol output and MODERATE+ synthesis coexist.
3. **S/D:** the later full-E1 order is implemented as a separate canonical S/D overlay while Part X's IP/LSZ/options render rules are preserved.
4. **Cloudflare:** pi-durable code Tasks inside a Durable Object, not the archived Cloudflare Workflow plan and not a host bar uploader.
5. **Week:** Pinebox's selected asset/week is the run identity; future candles are only test evidence.
6. **Models:** Clairic reads, Clef/Jev judges, code decides and executes.
7. **Donor boundary:** v4.5.3 organs enter through adapters with SHA provenance; they never override canon, replace LuxAlgo, or add synthetic zones.
8. **Delivery:** E1 is built and visually accepted before E2/E3 work begins.
---

## 16. THE V5.2 ORGAN-TRANSPLANT LAYER

This section is the V5.2 delta. Everything outside it inherits V5.0 unless explicitly amended here.

### 16.1 The transplant law

```text
Trident 5.3.3 prompt
        ↓
operator rulings
        ↓
V5.2 canonical card and current M1 engine
        ↓
v4.5.3 donor organs through adapters
        ↓
preserved V1 LuxAlgo/SMC visual floor
```

The law is explicit:

1. The 5.3.3 prompt remains authority.
2. Operator rulings remain authority.
3. The current M1 engine remains the canonical E1 implementation.
4. The V1 checkpoint remains the untouched visual price-structure floor.
5. Donor code is reference machinery, never authority.
6. Every donor output enters the card through a current-type adapter and provenance record.
7. A donor/canon conflict rejects the donor output by name.
8. No donor organ may create synthetic evidence, synthetic zones, wall-clock IDs, or a second chart runtime.

### 16.2 Why each organ is relevant

| Organ | Problem it solves | LuxAlgo relation | Initial integration |
|---|---|---|---|
| OBCV | Missing/weak S/D detection | Attacks the known A− side | Second S/D candidate generator |
| LMV rungs | Exact defended edges and reaction taxonomy | Does not replace the A+ liquidity visual | Hidden metadata layer |
| Freshness | Reaction event anatomy and depletion state | LuxAlgo does not expose it | Attach to canonical zones |
| Zone pressure | Shield/nested/fortress/operative defense | LuxAlgo does not expose it | Attach to canonical zones |
| E2 anchors | Future shape chain needs zone IDs, not prices | Not a LuxAlgo concern | Contract now, implement after M1 |
| Storyline | Operator-facing contested-zone explanation | Not a LuxAlgo concern | Read-only future layer |

### 16.3 Donor inventory, exact identities, and dispositions

All source paths are under:

`/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/PLUTUS/ARCHIVE/agent/Checkpoints/v4.5.3_CLEAN_BASELINE`

| Donor | Lines | SHA-256 | Disposition |
|---|---:|---|---|
| `src/mdve/lmv.ts` | 707 | `b636f1790fd12cf4faf925f06dc475e5e2b3b1234cacdbc5cc7f7f3d39742eea` | Executable-port source |
| `src/mdve/lqz-matrix.ts` | 658 | `68c87752a993f5f43f7b3005efe4f72eff3af9953a29fcaaf4c3d3cf92576d8a` | Executable-port source |
| `src/mdve/freshness.ts` | 202 | `7dbcd5b4edd0be164014d74fa3b545c508873f44ae048cda4c7dd7a07fa2ac59` | Executable-port source |
| `src/mdve/zone-pressure.ts` | 368 | `c79c509f824334fbe77a047e0fb1e018ffed4b2a50937f356be97ba23db5afcc` | Executable-port source |
| `src/mdve/obcv.ts` | 518 | `7054ddf53790900f05121bba256b54598a0a4cb220b4572051c8a179b7984a4b` | Executable-port source |
| `src/mdve/bom-mom.ts` | 292 | `e92209d7e8bd1101d534ce27dd8597c5d0a9c550edae993105109cda69c119c3` | Executable-port source |
| `src/mdve/ob-engine.ts` | 505 | `9f912c4f3773c7d81554671474e274d56b5c40a1f59178f77771746d10a020e8` | Reference only; never execute/import |
| `src/brains/shape-brain.ts` | 2483 | `a1055008f4352c7fe8eadb8bbbf5bcd14b332e061c07d6ef1f003e0f759b194c` | Contract reference only |
| `src/brains/storyline-engine.ts` | 567 | `d93156ebb2371139018e27b286a7283814263526dd833ef62ecf3cc33203fbf8` | Future read-only reference |
| `diag-lmv-golden-fx.ts` | 121 | `dd4b3717f2d91d46ca4e573db11f769e83b6cfee451b904b8ca11b24c9f99c1a` | Historical oracle reference |
| `report_v452.md` | 254 | `f82358156329b07751777ee3a9354ae2832cf3b2488ee3c05acfc85280404314` | Historical evidence reference |

**Quarantine contract:** frozen copies live under `m1/donors/v453/reference/` with a `.txt` suffix (for example `lmv.ts.txt`) so no bundler, type-checker, or runtime can import them. Their bytes and SHA-256 remain identical to the donor. `m1/src/organs/*.ts` are hand/kernel ports to current M1 types; they never import the quarantine and never copy the donor's unresolved dependency graph. A port that cannot reproduce a required donor behavior is a named blocker, not permission to import the old tree.

Never copy or execute:

- `src/engine/data-source-router.ts`;
- `src/tools/plutus-omni-vision.ts`;
- `src/brains/synthesis-lobe.ts`;
- old clients, runtime, pipeline, E3 engine, knowledge graph, or their transitive imports.

The selected donor modules are deliberately **not standalone**: they import old `types.ts`, `util.ts`, constants, and brains. That is why the adapter-port boundary above is mandatory.

### 16.4 OBCV S/D reconciliation

OBCV is a second candidate generator beside current P5. It never edits LuxAlgo and never replaces the V1 visual floor.

```text
current P5 S/D ──┐
                 ├── reconcile ── canonical S/D set
OBCV scan ───────┘
```

Reconciliation outcomes:

| Outcome | Rule | Card action |
|---|---|---|
| `AGREED` | Same side/timeframe/origin with overlap | Keep current geometry; attach OBCV metadata |
| `OBCV_ADDITIONAL` | Valid OBCV candidate with no current equivalent | Emit a P5 candidate level; canonical assembly must score/cluster it before any zone exists |
| `OBCV_MISSING_CURRENT` | Current zone exists; OBCV does not confirm | Keep current zone and record disagreement |
| `EDGE_CONFLICT` | Same structure, different boundaries | Keep current geometry; record OBCV proposal |
| `REJECT` | Failed displacement, structure, or BoM gate | Do not add |

**No OBCV object bypasses canonical assembly.** An `OBCV_ADDITIONAL` candidate becomes a `Level` with pillar `P5`, structural kind, geometry, provenance, and OBCV metadata. Current `m1/src/assemble.ts` then applies the six dimensions, bonus, clustering, POI, ZFP, and degree. If it overlaps an existing zone, it merges as provenance; if it stands alone, it becomes a zone only through the normal canonical score. An OBCV-only geometric box with no canonical score is invalid.

Equivalence is mechanical:

```text
same side
same timeframe
origin timestamps equal or within one bar of that timeframe
overlap_ratio = intersection_width / min(current_width, obcv_width)

origin-equivalent + overlap_ratio >= 0.50 -> AGREED
origin-equivalent + overlap_ratio <  0.50 -> EDGE_CONFLICT
no origin-equivalent current object       -> OBCV_ADDITIONAL
```

Temporal law:

```text
anchorMs = card.window.cutoff (Monday 09:00 London)
every OBCV input bar.timestamp <= anchorMs
any later bar -> ORGAN_INPUT_POST_CUTOFF, shadow run fails
```

Classifier of record: OBCV metadata uses the donor BoM/MoM classifier; canonical card BoM/MoM remains current M1 P5. A disagreement is recorded in `sd.obcv.bom`/the reconciliation matrix and never silently overwrites either classifier.

Required OBCV metadata:

- displacement field;
- rolling ATR excluding the candidate bar;
- body displacement;
- forward confirmation;
- structure-break reference;
- origin candle;
- width gates;
- donor BoM body/wick and body-fraction classification;
- prior move classification;
- available parent/child timeframes;
- partition/nesting result;
- deterministic timestamp ID.

The 30m lane runs only when pre-cutoff 30m bars exist in the typed evidence contract. If absent, the shadow record says `OBCV_30M_DATA_MISSING`; it must not silently imply a scanned 30m lane or invent candidates.

### 16.5 LMV precision assignment

LMV does not create another default liquidity wallpaper. It assigns rungs to existing canonical zones.

Rung fields:

- modal body-close center;
- defended edge;
- reaction extreme;
- sweep count;
- touch kinds;
- week span;
- touch/sweep strength receipt;
- source swing/reaction timestamps.

The LMV receipt records reaction strength and recurrence only. **It is not a ZFP value and must never overwrite or feed canonical `zone.zfp`.** Canonical ZFP remains the current M1 strength/type calculation.

Assignment:

1. Calculate rungs from pre-cutoff bars.
2. Match each rung to an existing canonical zone by price/time overlap.
3. Attach rung IDs to `zone.precision`.
4. Select the strongest rung for the defended edge.
5. Preserve unmatched rungs in the full card as unassigned precision evidence.
6. Render nothing by default.

Render modes:

| Mode | Default | Rule |
|---|---:|---|
| `LMV_HIDDEN` | yes | Card metadata only |
| `LMV_THIN` | off | One defended-edge line per selected zone |
| `LMV_INSPECT` | on demand | Table/label detail |
| `LMV_ZONE_FAMILY` | forbidden initially | Requires a new operator ruling |

### 16.6 Freshness event ledger

The canonical reaction count becomes an event ledger.

Event fields:

- timestamp;
- pre-cutoff status;
- touch kind;
- pierce;
- reclaim;
- gap-through;
- battle result;
- contributing bar IDs.

States:

```text
FRESH(0x) → TESTED_1X → TESTED_2X → DEPLETED(3x+)
any state → VIOLATED after a qualifying pierce battle
gap-through does not equal depletion
```

Validation mapping is mechanical:

- zero qualifying tests ⇒ `FRESH`;
- one ⇒ `TESTED_1X`;
- two ⇒ `TESTED_2X`;
- three or more ⇒ `DEPLETED`;
- `VIOLATED` requires a pierce battle event and does not reset the event count;
- a claimed state with no event ledger is `E1_CARD_INVALID`.

Canonical ZFP remains computed by current M1 rules. Freshness supplies event anatomy and state; it may feed only modifiers the 5.3.3 prompt explicitly allows.

### 16.7 Pressure and operative defense

Every canonical zone gains:

- lifecycle;
- battle list;
- pierced state;
- nested liquidity link;
- shield liquidity link;
- absorption state;
- operative defense.

Lifecycle:

```text
VIRGIN | ACTIVE_1 | ACTIVE_2 | DEPLETED | FORTRESS | BROKEN | CONFLUENCE
```

Defense:

```text
SHIELD_FUEL        front liquidity still protects the zone
PRESSURE_STRUCTURE shielding liquidity has been consumed
```

Rendering is inspect-first. A compact defense tag is allowed only where it does not collide with existing labels or exceed the room object budget.

### 16.8 E2 anchor architecture

E2 remains deferred until E1 acceptance, but V5.2 fixes its future contract now.

```text
canonical E1 zone
   ├── LMV defended edge
   ├── freshness state
   ├── pressure state
   ▼
ShapeDayZone anchor
   ▼
pressure-aware transition
   ▼
week shape chain
```

`ShapeDayZone` fields:

- day;
- shape;
- direction;
- key zone ID;
- supply zone ID;
- demand zone ID;
- deep demand zone ID;
- key zone type;
- projected TP zone ID.

Non-negotiables:

- E2 emits IDs, never prices;
- LONG consumes demand-side structure;
- SHORT consumes supply-side structure;
- both sides must resolve;
- transition tables come from 5.3.3 Part IV;
- old `SHAPE_TRAVEL` constants are not imported;
- old E3 mirror logic is not imported.

### 16.9 Storyline as a read-only reasoner

The storyline engine may later read:

- contested zone pressure;
- break validation;
- strength comparison;
- macro arc;
- warframe phase.

It must not:

- choose zones;
- modify the shape chain;
- emit prices;
- gate E3;
- substitute for the operator's chart review.

### 16.10 Card schema extension

Add to `E1Zone`:

```text
sd: {
  detector,
  reconciliation,
  obcv?: {
    displacement,
    structureBreak,
    bom,
    priorMove,
    parentZone
  }
}

precision: {
  lmvRungIds,
  center,
  defendedEdge,
  reactionExtreme,
  sweepCount,
  touchKinds,
  weekSpan
}

freshness: {
  state,
  events[],
  lastEvent
}

pressure: {
  lifecycle,
  battles[],
  pierced,
  nestedLiquidityId,
  shieldLiquidityId,
  absorption,
  operativeDefense
}

donorProvenance: {
  modules[],
  sha256[],
  adapters[]
}
```

Add to the derived `E1Card`:

```text
schema_version        // bumped from the base card
supersedes_sha256     // the immutable base card hash
unassignedPrecision[] // complete LMV rungs that matched no zone
organShadowPath       // the shadow artifact provenance
```

Existing downstream fields remain as derived views:

```text
reactionsPreCutoff = freshness.qualifyingTestCount
FRESH                -> reactionState Virgin
TESTED_1X/TESTED_2X  -> reactionState Active
DEPLETED             -> reactionState Depleted
VIOLATED             -> reactionState Depleted + pressure.pierced=true
```

Card validation rejects:

- an OBCV-added zone without complete OBCV metadata and a canonical score/degree from `m1/src/assemble.ts`;
- a defended edge without an LMV rung ID;
- any LMV receipt written into canonical `zfp`;
- a freshness state inconsistent with its mechanical event mapping;
- a pressure link to a nonexistent liquidity object;
- donor output without module SHA and adapter identity;
- a donor reference file imported by runtime code.

### 16.11 Organ build stages

| Stage | Output | Card effect | Chart effect |
|---|---|---|---|
| W3a.0 quarantine | `.ts.txt` reference copies, SHA manifest, adapter ports | none | none |
| W3a.1 shadow | organ-adapter output JSON beside the card | none | none |
| W3a.2 metadata attach | schema-versioned derived card and supersedes link | enriched existing zones plus `unassignedPrecision` | none |
| W3a.3 OBCV reconcile | candidate levels + reconciliation matrix | only canonically scored additions/merges | optional overlay |
| W3a.4 A/B render | six legible Pinebox captures including frame 0 baseline | candidate selection | measured comparison |
| W3a.5 M1 decision | `M1_CANDIDATE`, `METADATA_ONLY`, or `REJECTED` | candidate schema | only candidate/inspect visuals |
| post-unlock promotion | `PROMOTED` or final rejection | frozen schema | final promoted visuals |

### 16.12 A/B test matrix

Render the same operator-active golden-week asset and week — currently EURUSD 2026-07-06 at CP-005, unless the operator changes it:

0. a legible post-CP-005 presentation baseline;
1. current M1 composition only;
2. current plus hidden metadata;
3. current plus canonically scored OBCV additions;
4. current plus pressure/LMV inspection;
5. full V5.2 candidate.

W3a.4 does not run while the CP-005 defect is still present (giant table, overlapping IP labels, S/D text collisions). A polluted, unreadable frame cannot measure label collision or operator visual preference.

Measure:

- operator-band recall against the 13 collapsed operator bands from `m1/evidence/operator-zones-eurusd/operator-zones.json` and the CP-003 method (`m1/checkpoints/CP-003/zone-overlap-and-outcome.md:24-25`, `:52-55`);
- `YES` = a rendered canonical band covers the operator band;
- `PARTIAL` = a canonical edge reaches within 5 pips but does not cover;
- `MISS` = no canonical band at that level;
- false additions outside the operator set;
- edge error in pips;
- label collisions;
- object count against the measured room budget;
- regression of every previously accepted family;
- operator visual verdict.

An organ can become an M1 candidate only if `YES` increases or the operator explicitly accepts a metadata-clarity gain, `MISS` does not increase, and no previously accepted family regresses.

The room budget is not guessed. Before W3a.4, measure the legible baseline's object count and find the render-failure boundary by bisection; write the integer boundary and method to `m1/out/room-budget-<checkpoint>.json`. That measured integer is the A/B ceiling. The known CP-004 flip is evidence that a boundary exists (intra-on produced a 194,567-byte empty frame; intra-off produced a 353,106-byte render), not the boundary itself.

### 16.13 Constants, unit conversion, and generalisation

| Class | Rule |
|---|---|
| Canon-derived | Retain only with a 5.3.3 anchor |
| Absolute pip threshold | Keep the pip number; convert only pip → asset tick size |
| Structural count | Keep as structural state-machine semantics |
| Historical tuning | Shadow/M1-candidate only; final promotion after the operator-unlocked random-week gate |
| Week-specific | Reject |
| Magic number | Reject |

Required initial donor-constant decisions:

| Constant | Donor value | V5.2 decision |
|---|---:|---|
| OBCV displacement floor 4H | 50 pips | Keep absolute; convert to ticks |
| OBCV displacement floor 1H | 30 pips | Keep absolute; convert to ticks |
| OBCV displacement floor 30m | 20 pips | Keep absolute when a 30m lane exists |
| OBCV body multiplier | 1.5 | Donor metadata classifier |
| OBCV ATR period | 14 | Donor metadata classifier |
| OBCV structure-break half | 0.5 | Donor structural predicate |
| LMV swing neighborhood | 1 bar | Keep |
| LMV minimum prominence | 1 pip | Convert to ticks |
| LMV cluster tolerance | 2 pips | Convert to ticks |
| LMV cluster max span | 4 pips | Convert to ticks |
| LMV minimum reactions | 3 | Keep |
| LMV minimum distinct kinds | 2 | Keep |
| LMV minimum rung candles | 2 | Keep for modal emission |
| LMV default lookback | 720 bars | Run when available; otherwise record `LMV_LOOKBACK_TRUNCATED` with available count |
| Freshness state thresholds | 0/1/2/3+ tests | Keep structural mapping |
| Donor freshness ZFP ladders | BoM 10/18/32/65; MoM 65/22/38/70 | Do not import into canonical ZFP |
| Pressure shield proximity | 20 pips | Convert to ticks; M1-candidate only |
| Pressure fortress threshold | 4 battles, zero pierces | Keep as lifecycle metadata |
| BoM sweep lookback | 24 bars | Donor OBCV metadata only |
| BoM sweep close fraction | 0.5 | Donor OBCV metadata only |
| BoM consolidation overlap | 0.5 | Donor OBCV metadata only |

The golden week may expose a defect but may not become a tuning set.

### 16.14 V5.2 failure modes

| Failure | Mechanism |
|---|---|
| Duplicate S/D inflation | OBCV additions must pass reconciliation, no-overlap checks, and canonical scoring |
| Organ authority drift | Donor outputs carry provenance and cannot override canon |
| LMV wallpaper regression | LMV starts hidden and cannot become a zone family without a ruling |
| LMV ZFP leakage | LMV strength receipts are metadata only and cannot enter canonical `zfp` |
| Metadata bloat | Freshness/pressure default to inspect tables |
| Provenance loss | Card validation requires donor SHA and adapter |
| Old runtime import | Runtime code never imports the quarantine or old dependency graph |
| Unresolved donor dependency | Reference copies are `.txt`; executable behavior is ported to current M1 types |
| Hardcoded recurrence | Constants must be asset-aware and generalized after unlock |
| Premature random-week tuning | Random weeks remain locked until operator unlock |
| E2 premature start | E2 organs remain contract-only until E1 acceptance |
| Synthetic zones | Old synthesis creators are forbidden |
| Wall-clock identity | IDs derive from bar timestamps only |
| Secret leakage | `src/engine/data-source-router.ts` and `src/tools/plutus-omni-vision.ts` are never copied |

## 17. AUTHORITY INDEX

| Subject | Source |
|---|---|
| Engine 1 purpose | `Original_Canon_Data/Trident_System_Prompt_v5.3.3_DOWNLOAD_ME.md:347-350` |
| E1 foundations and classifications | same file `:468-504`, `:1145-1161` |
| 19-source acquisition | same file `:739-800` |
| Protocol A image extraction | same file `:808-867` |
| Nine pillars and DXY conversion | same file `:923-1459` |
| Scoring and zone assembly | same file `:1465-1503` |
| Full versus synthesis output | same file `:1627-1646` |
| Pair translation and Layer 2 | same file `:3257-3683` |
| Pine rendering | same file `:3688-4004` |
| ZFP and pivot checks | same file `:4052-4107` |
| Baseline identity and generator | `Checkpoints/v1-ship-approved-working-baseline/dist/plutus-vision-v1.pine`; `archive/pre-v5-2026-11-08/head/scripts/lqz_vision_build.py:1-90` |
| Existing partial renderer | `archive/pre-v5-2026-11-08/head/plutus-vision-lqz/e1-render.pine:1-314`; `archive/pre-v5-2026-11-08/head/pine-ide/ide/renderer/plutus-vision-v2.pine:1300-1415` |
| Existing partial engine | `archive/pre-v5-2026-11-08/head/scripts/e1_extract.py:1-183`, `:1047-1243`; `archive/pre-v5-2026-11-08/head/scripts/e1_zfp.py:1-138` |
| v4.5.3 organ donors | `PLUTUS/ARCHIVE/agent/Checkpoints/v4.5.3_CLEAN_BASELINE/src/mdve/*.ts`; `src/brains/shape-brain.ts`; `src/brains/storyline-engine.ts` |
| Browser/tunnel history | Historical pre-R-39 measurement recorded in §6.2; external trees are unread by this build |
| V5.2 review notes | `design/5.1 update notes.md:1` |
| OBCV donor | v4.5.3 `src/mdve/obcv.ts:1` |
| LMV donor | v4.5.3 `src/mdve/lmv.ts:1` |
| Freshness donor | v4.5.3 `src/mdve/freshness.ts:1` |
| Pressure donor | v4.5.3 `src/mdve/zone-pressure.ts:1` |
| E2 contract donor | v4.5.3 `src/brains/shape-brain.ts:1089` |
| Week window carried forward | `archive/pre-v5-2026-11-08/uncommitted-2026-11-08/design/DESIGN_BLUEPRINT_v4.1_CLOUDFLARE.md:328-339` |

The following V5.2 sections are the compiler-grade additions. They do not replace V5.1; they complete its target wiring.

## 18. TARGET CLOUDFLARE IMPLEMENTATION MAP

### 18.1 Deployment topology

```text
┌────────────────────────────────────────────────────────────┐
│ Cloudflare edge                                           │
│ Worker plutus-e1                                          │
│   POST /e1/run {asset, week_monday}                       │
│   GET  /e1/card/{asset}/{monday}                          │
│   GET  /e1/pine/{asset}/{monday}                          │
│   GET  /e1/status/{run_id}                                │
└───────────────────────────┬────────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────────┐
│ Durable Object e1:<asset>:<monday>                        │
│ deterministic scheduler + write-once card generation      │
└───────────────────────────┬────────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────────┐
│ Pure task library (same code as local M1)                 │
│ P1 P2 P3/P8 P4 P5 P6 P7 P9 OBCV LMV freshness pressure   │
└───────────────────────────┬────────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────────┐
│ Immutable storage                                         │
│ R2 raw evidence, base cards, derived cards, Pine          │
│ D1 run/source/evidence/zone/verdict metadata              │
└────────────────────────────────────────────────────────────┘
```

The Worker never contains a second market interpretation. It imports the same pure modules used locally, behind injected source interfaces.

### 18.2 Target file manifest

| Target file | Responsibility | Depends on |
|---|---|---|
| `cloud/worker.ts` | HTTP routes, auth, request validation | `cloud/do.ts` |
| `cloud/do.ts` | one serialized run per asset/week, task graph, retry policy | pure engine |
| `cloud/env.ts` | typed bindings: R2, D1, BROWSER, BEND, secrets | Workers runtime |
| `cloud/state.ts` | run state machine and idempotent resume | D1 |
| `cloud/sources/bars.ts` | TradingView/Pinebox bar source | `BarSource` |
| `cloud/sources/protocolA.ts` | Protocol A image/text evidence acquisition | plutus-browser VPC |
| `cloud/sources/analyst.ts` | P4 explicit-level research acquisition | approved retrieval |
| `cloud/sources/macro.ts` | H.10, Treasury, FRED, EIA, calendar | HTTP executors |
| `cloud/evidence/manifest.ts` | evidence hashing, cutoff classification, missing-data rows | source outputs |
| `cloud/tasks/pillars.ts` | parallel P1/P2/P3P8/P4/P5/P6/P7/P9 tasks | pure modules |
| `cloud/organs/runner.ts` | OBCV/LMV/freshness/pressure shadow and attach | organ adapters |
| `cloud/card/schema.ts` | base and derived card types | `m1/src/card.ts` |
| `cloud/card/validate.ts` | cutoff, provenance, score, lifecycle validation | card schema |
| `cloud/card/seal.ts` | canonical JSON, SHA, immutable R2 put | validator |
| `cloud/compose/pine.ts` | generated Pine from sealed derived card | `m1/src/compose.ts` |
| `cloud/bend/client.ts` | optional local proof verifier client | VPC/tunnel |
| `cloud/index.ts` | Workers entry export | worker + DO |

### 18.3 Pure/shared module contract

Every function called by the DO must satisfy all six conditions:

1. no wall clock;
2. no filesystem;
3. no global mutable state;
4. no uncontrolled randomness;
5. every input is JSON-serializable or a typed `BarSource` result;
6. every failure is a named refusal token.

The local runner may read files. The Cloudflare runner injects evidence. Market logic remains identical.

```ts
interface E1ComputeInput {
  identity: RunIdentity;
  bars: BarsByTimeframe;
  extraction: ProtocolAExtraction | null;
  analyst: AnalystEvidence | null;
  organs: OrganShadow | null;
}

interface E1ComputeOutput {
  baseCard: E1Card;
  derivedCard: DerivedE1Card | null;
  refusals: NamedRefusal[];
}
```

### 18.4 Task graph

```text
T0 ResolveWindow
T1 Acquire bars
T2 Acquire Protocol A
T3 Acquire analyst research
T4 Acquire macro/release evidence
T5 Run pillars in parallel
T6 Run organ adapters in parallel
T7 Reconcile OBCV through canonical assembly
T8 Attach LMV/freshness/pressure metadata
T9 Validate derived card
T10 Optional Bend proof certificate
T11 Seal card in R2
T12 Compose Pine
T13 Return card/pine SHAs
```

Hard dependencies:

```text
T0 -> T1..T4
T1 -> T5(P1,P2,P5,P6,P9)
T2 -> T5(P3,P8) and T5(P7)
T3 -> T5(P4)
T5 -> T6
T5+T6 -> T7
T7 -> T8
T8 -> T9
T9 -> T10
T9 or T10 -> T11
T11 -> T12
T12 -> T13
```

A failed non-critical source writes `missing_data` and does not abort. A critical cutoff/provenance failure aborts with its named token.

## 19. OHLC INTELLIGENCE E1 SUBSTRATE

The old OHLC Intelligence Lexicon is the source grammar for the organ layer.

### 19.1 Candle-pressure machine

```ts
type TouchKind =
  | "SWEEP"
  | "WICK_REJECT"
  | "BODY_DEFEND"
  | "CONSOL_DWELL"
  | "PASS_THROUGH";

function classifyTouch(zone, before, test, after): TouchKind:
    if test crosses beyond defended edge and returns:
        return "SWEEP"
    if wick enters zone and closes on the originating side:
        return "WICK_REJECT"
    if body enters zone and closes on the originating side:
        return "BODY_DEFEND"
    if multiple closes remain inside without direction:
        return "CONSOL_DWELL"
    if body crosses far edge and closes beyond:
        return "PASS_THROUGH"
```

Rules:

- `PASS_THROUGH` is audit-only and never a reaction.
- each event records pre-touch side, test bar, exit bar, pierce, reclaim, and gap-through;
- events after cutoff never change prediction metadata.

### 19.2 Zone-classification machine

```ts
type ZoneClass =
  | "IP"
  | "LSZ"
  | "BoM"
  | "MoM"
  | "PHANTOM_BOM"
  | "REJECT";

function classifyZone(obcv, currentP5, history):
    if width/displacement/structure gates fail:
        return "REJECT"
    if prior same-side unbroken zone exists and origin retraced below 0.5:
        return "MoM"
    if labelled MoM but reaction history shows fortress/defensive behavior:
        return "PHANTOM_BOM"
    return "BoM"
```

Death-rule scope:

```text
30m virgin MoM -> death rule applies
1H type-1 virgin MoM -> death rule applies
4H zones -> never death zones
```

### 19.3 Zone-pressure machine

```text
0 battle       -> VIRGIN
1 battle       -> ACTIVE_1
2 battles      -> ACTIVE_2
3 battles      -> DEPLETED
4+ holds no pierce -> FORTRESS
pierce battle  -> BROKEN/VIOLATED
gap-through    -> no battle
```

Pressure outputs:

- nested liquidity ID;
- shield liquidity ID;
- absorption;
- operative defense (`SHIELD_FUEL` or `PRESSURE_STRUCTURE`);
- HTF precedence result.

## 20. BEND PROOF BOUNDARY

### 20.1 Live toolchain facts

Measured from `BendLang/bend` at commit `335f239`:

- targets C, Metal, CUDA, and JavaScript;
- JavaScript target is sequential;
- no JSON, TLS, HTTP, or regex standard library;
- numeric types are `Nat`, `U32`, `F32`;
- `F32` is axiomatic and cannot be proven;
- native GPU execution is local;
- one GPU per program;
- no multi-machine execution;
- laws are proven about Bend semantics, while backends can differ;
- parser/translation into the verdict kernel is not itself proven.

### 20.2 Architecture decision

Bend is not the E1 runtime. It is a proof/certificate layer.

```text
TypeScript computes the market interpretation.
Bend proves structural conservation.
Pinebox and the operator judge market accuracy.
```

### 20.3 Local Bend verifier service

Optional target files:

```text
proof/bend/LAWS.bend
proof/bend/MODEL.bend
proof/bend/PROOF.bend
proof/service/server.ts
```

Routes:

```text
GET  /health
POST /prove { model_sha, card_sha, laws_sha }
GET  /verdict/{job_id}
```

The service is local because native/GPU Bend is local. Cloudflare reaches it through the same VPC/tunnel pattern as plutus-browser. Proof is optional until the operator promotes it.

### 20.4 Initial proof obligations

1. M1 checkpoint state conservation.
2. Every evidence timestamp is at or before cutoff.
3. Every input level is consumed by a zone, `unassignedPrecision`, or named rejection.
4. Every output member has a source level.
5. Scores and degrees are bounded and mapped exactly.
6. Freshness state follows event count.
7. OBCV reconciliation classes are total and disjoint.
8. Base card SHA is immutable; derived card records `supersedes_sha256`.

### 20.5 Proof certificate

```json
{
  "schema": 1,
  "subject_sha256": "...",
  "laws_sha256": "...",
  "model_sha256": "...",
  "checker": "bend-fast",
  "verdict": "PASS",
  "checked_at": "...",
  "obligations": [
    { "id": "cutoff_conservation", "verdict": "PASS" }
  ]
}
```

A failed or absent optional proof is `PROOF_UNAVAILABLE`, never a market pass. A promoted proof failure rejects the card.

## 21. PRODUCTION CARD STATE MACHINE

```text
RESOLVED
  -> EVIDENCE_READY
  -> PILLARS_READY
  -> ORGANS_READY
  -> DERIVED_CARD_VALID
  -> PROOF_PASS_OR_OPTIONALLY_UNAVAILABLE
  -> SEALED
  -> COMPOSED
  -> RENDER_CANDIDATE
  -> OPERATOR_REVIEW
```

Legal transitions are forward-only except:

```text
any state -> BLOCKED<source_token>
BLOCKED<source> -> the state where the source is retried
```

A sealed base card can never return to computation. Organ changes produce a derived card generation, never a mutation.

## 22. PRODUCTION INVARIANTS

| ID | Invariant | Enforcement |
|---|---|---|
| I-01 | cutoff conservation | every evidence timestamp <= cutoff |
| I-02 | source provenance | every level references an evidence SHA |
| I-03 | level conservation | input levels -> zone/unassigned/reject |
| I-04 | no synthetic zone | zone member ancestry is mandatory |
| I-05 | canonical scoring | dimensions 0..2, bonus 0..2, total 0..14 |
| I-06 | degree exactness | degree mapping is total and deterministic |
| I-07 | reaction state exactness | state derives from event ledger |
| I-08 | ZFP strength-only | no width term |
| I-09 | base immutability | base SHA never changes |
| I-10 | derived chain | one base -> one derived generation |
| I-11 | OBCV assembly | no unscored OBCV geometry |
| I-12 | LMV hidden-first | metadata only unless promoted |
| I-13 | two-week render clip | R-36 window |
| I-14 | object budget | measured integer ceiling |
| I-15 | visual acceptance | opened chart pixels + operator review |

## 23. PRODUCTION FAILURE SURFACE

| Token | Meaning |
|---|---|
| `E1_IDENTITY_INVALID` | asset/week invalid |
| `E1_CUTOFF_VIOLATION` | future evidence influenced prediction |
| `E1_EVIDENCE_HASH_MISMATCH` | source bytes changed |
| `E1_CARD_INVALID` | schema/provenance failure |
| `E1_PILLAR_FAILED` | named pillar arithmetic/refusal |
| `E1_ORGAN_INPUT_POST_CUTOFF` | organ saw future bars |
| `E1_OBCV_30M_DATA_MISSING` | 30m lane absent |
| `E1_LMV_LOOKBACK_TRUNCATED` | fewer than 720 bars |
| `E1_ASSET_UNSUPPORTED` | no card for ticker |
| `E1_BASE_CARD_MUTATED` | base SHA changed |
| `E1_DERIVED_CHAIN_INVALID` | second derived generation without ruling |
| `E1_RENDER_BUDGET_EXCEEDED` | measured object ceiling crossed |
| `E1_COMPOSE_BASELINE_DRIFT` | v1 baseline changed |
| `E1_PROOF_FAILED` | promoted Bend law failed |
| `E1_PROOF_UNAVAILABLE` | optional proof absent |

## 24. MODEL-BASED-COMPILER BUILD LAW

The blueprint plus workflow are intended to be compiled by a coding model with no design discretion.

Allowed:

- translating pseudocode into TypeScript;
- choosing local syntax;
- naming private helpers;
- formatting;
- adding imports;
- adding named refusal paths specified by the design.

Forbidden:

- changing thresholds;
- dropping pillars;
- replacing data sources;
- relaxing gates;
- editing Pinebox;
- editing the baseline;
- introducing fallbacks;
- changing card semantics;
- promoting organs;
- starting E2/E3;
- claiming completion without the named evidence.

The execution workflow is the compiler input. Its turns are lexical work units, not suggestions.

**End of V5.2 compiler-grade design for operator review.**
