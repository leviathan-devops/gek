# BUILD WORKFLOW v5.2 — PLUTUS VISION COMPILER-GRADE PRODUCTION E1

**Status:** FOR OPERATOR REVIEW. This is the model-based-compiler execution contract. `artifact_class: system`
**Blueprint:** `design/DESIGN_BLUEPRINT_v5.2_COMPILER_GRADE.md:1`.
**Supersedes on approval:** `design/BUILD_WORKFLOW_v5.1_CLOUDFLARE.md`.
**Execution doctrine:** the builder is a compiler, not a designer. Translate the pseudocode and interfaces in this file into TypeScript. Do not invent market behavior, thresholds, sources, fallbacks, gates, or acceptance criteria.

## MISSION

Compile the complete production E1 indicator from the V5.2 blueprint: nineteen-source evidence plane, nine-pillar engine, OHLC organ adapters, immutable base/derived cards, R36-compliant Pine composition, Pinebox visual acceptance, Cloudflare Worker/DO execution, and optional Bend proof certificate.

## SCOPE

In scope:

- E1 evidence-plane and nine-pillar completion;
- P4 analyst engine;
- P7 exchange arena source;
- OBCV, LMV, freshness, and pressure adapters;
- derived-card sealing;
- presentation repair;
- R36 two-week rendering;
- Pinebox golden week acceptance;
- Cloudflare Worker/DO/R2/D1 target implementation;
- optional local Bend proof service.
Out of scope before operator unlock:

- random-week matrix;
- E2 implementation;
- E3 implementation;
- packaging/push;
- Pinebox modification;
- baseline modification;
- old v4.5.3 runtime import;
- invented zones or substitute sources.

## ACCEPTANCE CRITERIA

1. `bun run m1/scripts/validate_card.ts <card>` exits 0 for the active base and derived cards.
2. `bun run cloud/scripts/e2e.ts --asset EURUSD --week 2026-07-06` exits 0 and returns both card and Pine SHAs.
3. A Pinebox capture of the generated composition is opened and shows every required E1 family without label collision or old-origin crossing.
4. The operator's golden week review returns true at the required accuracy bar.
5. The workflow invalidator exits 0: `python3 gates/validate_workflow.py design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md`.
6. Every commit follows the existing PV gate and carries evidence paths.
7. The Cloudflare Worker/DO E1 run returns the local-parity card SHA; OBCV, LMV, freshness, and pressure are inspectable in the derived card; the optional Bend certificate is a proof artifact, not the E1 runtime.
8. No protected path changes: `archive/`, `Checkpoints/v1-ship-approved-working-baseline/`, `Original_Canon_Data/`, `MASTER_CONTEXT/OPERATOR_RULINGS_PV.md`, sealed H1 renderer, or Pinebox package.

## THE COMPILER CONTRACT

The coding model may:

- convert pseudocode to TypeScript;
- add imports;
- split private helpers;
- format code;
- implement named refusal branches;
- use existing project utilities.

The coding model may not:

- choose different thresholds;
- remove a turn;
- reorder dependency phases;
- substitute a source;
- add a fallback;
- change the Pinebox product;
- edit the baseline;
- start E2/E3;
- lower a gate;
- claim completion without a tool-result artifact.

If a pseudocode line is impossible, stop at that turn with `WORKFLOW_AMBIGUITY:<turn-id>` and report the exact line. Never redesign locally.


## AUTHORITY ANCHORS

- `design/DESIGN_BLUEPRINT_v5.2_COMPILER_GRADE.md:1` — the target architecture and invariants this workflow compiles.
- `design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md:1` — this compiler-grade turn contract.
- `m1/src/run.ts:19` — the live E1 orchestration entry.
- `m1/src/assemble.ts:79` — canonical level scoring and zone assembly.
- `m1/src/compose.ts:30` — baseline-preserving generated composition.
- `m1/EXECUTION_CONTRACT.md:1` — the existing M1 commit/checkpoint law.
- `MASTER_CONTEXT/OPERATOR_RULINGS_PV.md:1` — operator authority; this workflow never overrides a ruling.

## GLOBAL TYPES

Create or preserve these shared contracts. Names are mandatory; private implementation details may vary.

```ts
export type Asset = "DXY" | "EURUSD" | "GBPUSD";

export interface RunIdentity {
  asset: Asset;
  week_monday: "2026-07-06" | `${number}-${number}-${number}`;
  requested_by: string;
}

export interface RunWindow {
  open_utc: number;
  cutoff_utc: number;
  end_utc: number;
  render_from_utc: number;
  render_to_utc: number;
  london_offset_minutes: number;
}

export type Pillar =
  | "P1" | "P2" | "P3" | "P4" | "P5"
  | "P6" | "P7" | "P8" | "P9";

export interface EvidenceRef {
  source_id: string;
  sha256: string;
  published_at: number | null;
  retrieved_at: number;
  cutoff_status: "BEFORE_CUTOFF" | "AFTER_CUTOFF" | "MISSING";
  raw_key?: string;
}

export interface Level {
  id: string;
  pillar: Pillar;
  kind: string;
  price: number;
  evidence: EvidenceRef[];
  timeframe?: "30m" | "1H" | "4H" | "D1" | "W1";
  formed_at?: number;
  legacy?: boolean;
  metadata?: Record<string, unknown>;
}

export interface NamedRefusal {
  token: string;
  detail: string;
  turn_id: string;
}
```

## TARGET FILE MANIFEST

| File | New/Edit | Role |
|---|---|---|
| `m1/src/window.ts` | edit | deterministic run window |
| `m1/src/bars.ts` | edit | BarSource contract and aggregators |
| `m1/src/sources/http-bars.ts` | new | injected Cloudflare bar source |
| `m1/src/sources/protocolA.ts` | new | typed Protocol A evidence |
| `m1/src/sources/analyst.ts` | new | P4 explicit-level evidence |
| `m1/src/sources/macro.ts` | new | release/H.10/FRED/Treasury evidence |
| `m1/src/p4.ts` | new | analyst consensus engine |
| `m1/src/p7exchange.ts` | new | ICE/CME arena executor |
| `m1/src/organs/candlePressure.ts` | new | touch classifier |
| `m1/src/organs/lmv.ts` | new | LMV rung adapter |
| `m1/src/organs/obcv.ts` | new | OBCV adapter |
| `m1/src/organs/freshness.ts` | new | reaction ledger |
| `m1/src/organs/pressure.ts` | new | pressure lifecycle |
| `m1/src/derivedCard.ts` | new | schema-versioned derived card |
| `m1/src/validateCard.ts` | new | production invariants |
| `m1/src/compose.ts` | edit | R36 renderer and inspect layer |
| `cloud/worker.ts` | new | Worker routes |
| `cloud/do.ts` | new | deterministic DO task graph |
| `cloud/state.ts` | new | run state machine |
| `cloud/evidence/manifest.ts` | new | evidence manifest and cutoff checks |
| `cloud/tasks/pillars.ts` | new | parallel pillar scheduler |
| `cloud/card/seal.ts` | new | canonical card sealing |
| `cloud/compose/pine.ts` | new | Worker composition path |
| `cloud/bend/client.ts` | new | optional local proof client |
| `proof/bend/LAWS.bend` | new | proof obligations |
| `proof/bend/MODEL.bend` | new | finite proof model |
| `proof/bend/PROOF.bend` | new | proofs |
| `proof/service/server.ts` | new | local verifier HTTP service |
| `gates/validate_workflow.py` | new | workflow invalidator machine |

## PHASE DEPENDENCY GRAPH

```text
P0 Preflight
  -> P1 Evidence plane
  -> P2 Nine-pillar completion
  -> P3 Organ transplant
  -> P4 Renderer/R36
  -> P5 Pinebox acceptance
  -> P6 Cloudflare deployment
  -> P7 Bend proof
  -> P8 Package/report
```

No later phase starts before the previous phase's phase gate exits 0.

---

# P0 — PREFLIGHT AND INVARIANT FREEZE

## P0.TURN-01 — Verify authority and workspace

**P0 ENTRY**

```bash
cd /home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/PLUTUS_VISION
git status --short
git rev-parse HEAD
```

Entry requirement: no unrelated dirty file is touched by this build.

**ACTION**

```bash
python3 gates/validate_workflow.py design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md
bun run m1/scripts/validate_card.ts m1/out/e1-card-EURUSD-2026-07-06.json || true
sha256sum Checkpoints/v1-ship-approved-working-baseline/dist/plutus-vision-v1.pine
```

Expected baseline SHA:

```text
82da437af969a3157bd9454cbe70497ce01cf71fe4681b9e2401b754aa90cd43
```

**EVIDENCE**

Write `m1/out/preflight.txt`:

```text
workflow_validator_exit=<0|N>
baseline_sha=<measured>
head=<commit>
dirty_paths=<count>
```

**REASON**

The compiler must begin from the authorized workflow, immutable baseline, and known git state.

**GATE**

```bash
test "$(jq -r .baseline_sha m1/out/preflight.json)" = 82da437af969a3157bd9454cbe70497ce01cf71fe4681b9e2401b754aa90cd43
python3 gates/validate_workflow.py design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md
```

**COMMIT**

No commit unless preflight artifacts are added under `m1/out/preflight/`.

## P0.TURN-02 — Freeze type and refusal vocabulary

**ACTION**

Create `m1/src/refusals.ts`:

```ts
export type RefusalToken =
  | "E1_IDENTITY_INVALID"
  | "E1_CUTOFF_VIOLATION"
  | "E1_EVIDENCE_HASH_MISMATCH"
  | "E1_CARD_INVALID"
  | "E1_PILLAR_FAILED"
  | "E1_ORGAN_INPUT_POST_CUTOFF"
  | "E1_OBCV_30M_DATA_MISSING"
  | "E1_LMV_LOOKBACK_TRUNCATED"
  | "E1_ASSET_UNSUPPORTED"
  | "E1_BASE_CARD_MUTATED"
  | "E1_DERIVED_CHAIN_INVALID"
  | "E1_RENDER_BUDGET_EXCEEDED"
  | "E1_COMPOSE_BASELINE_DRIFT"
  | "E1_PROOF_FAILED"
  | "E1_PROOF_UNAVAILABLE";

export class E1Refusal extends Error {
  constructor(readonly token: RefusalToken, readonly detail: string) {
    super(`${token}: ${detail}`);
  }
}
```

**PSEUDOCODE**

```text
throwRefusal(token, detail):
    return new E1Refusal(token, detail)
```

**EVIDENCE**

```bash
bunx tsc --noEmit m1/src/refusals.ts
grep -c 'E1_' m1/src/refusals.ts
```

**GATE**

```bash
bunx tsc --noEmit
test "$(grep -cE 'E1_[A-Z0-9_]+' m1/src/refusals.ts)" -ge 15
```

**COMMIT**

```text
feat(m1): freeze E1 refusal vocabulary
PV-Gate: work
```

---

# P1 — EVIDENCE PLANE

## P1.TURN-01 — Abstract the bar source

**TARGET**

`m1/src/bars.ts`, `m1/src/sources/httpBars.ts`.

**INTERFACE**

```ts
export interface BarSource {
  load(asset: Asset, tf: "30m" | "1H" | "4H" | "D1", from: number, to: number): Promise<Bar[]>;
}
```

**PSEUDOCODE**

```text
httpBars.fetch(asset, tf, from, to):
    url = configured bar endpoint
    response = fetch(url with asset/tf/from/to)
    if status != 200:
        refuse E1_BAR_SOURCE_FAILED
    bars = parse JSON rows
    assert every bar time is integer and increasing
    assert open/high/low/close are finite
    assert high >= max(open, close, low)
    assert low <= min(open, close, high)
    return bars
```

**ACTION**

1. Move filesystem-specific behavior behind `fsSource`.
2. Add `httpBars` with injected `fetch`.
3. Reject non-monotonic timestamps.
4. Reject OHLC shape violations.
5. Never fabricate a missing bar.

**EVIDENCE**

Create `m1/scripts/checkBars.ts` and run against one DXY 1H month.

**GATE**

```bash
bun run m1/scripts/checkBars.ts
```

Pass tokens:

```text
BAR_COUNT_OK
BAR_ORDER_OK
OHLC_SHAPE_OK
POST_CUTOFF_BAR_REJECTED
```

**COMMIT**

```text
feat(m1): inject deterministic bar source
PV-Gate: work
```

## P1.TURN-02 — Protocol A typed evidence

**TARGET**

`m1/src/sources/protocolA.ts`.

**INTERFACE**

```ts
export interface ProtocolAExtraction {
  evidence: EvidenceRef;
  published_at: number;
  spot_at_publication: Record<string, number>;
  expiries: Array<{
    date: string;
    cut: string;
    pair: string;
    notional_ccy: string;
    strikes: Array<[number, number]>;
  }>;
  image_sha256: string;
  source_url: string;
}
```

**PSEUDOCODE**

```text
validateProtocolA(x, identity, cutoff):
    require x.published_at <= cutoff
    require x.image_sha256 is 64 hex
    require source_url is https
    for each spot:
        require finite positive value
    for each expiry:
        require pair is known
        require strike > 0
        require notional >= 0
    classify cutoff status
    return typed extraction
```

**GATE**

```bash
bun run m1/scripts/checkProtocolA.ts
```

Pass tokens:

```text
PROTOCOL_A_VALID
PROTOCOL_A_AFTER_CUTOFF_REJECTED
PROTOCOL_A_MISSING_IMAGE_REJECTED
PROTOCOL_A_BAD_STRIKE_REJECTED
```

**COMMIT**

```text
feat(m1): type Protocol A evidence
PV-Gate: work
```

## P1.TURN-03 — P4 analyst evidence and extractor

**TARGET**

`m1/src/sources/analyst.ts`, `m1/src/p4.ts`.

**INPUT CONTRACT**

```ts
export interface AnalystStatement {
  source_id: string;
  source_tier: 1 | 2 | 3;
  published_at: number;
  asset: Asset;
  level: number;
  interpretation: "support" | "resistance" | "range";
  quoted_span: string;
}
```

**PSEUDOCODE**

```text
pillar4(statements, asset, unit):
    filter statements:
        asset matches
        published_at <= cutoff
        level finite and positive

    for each valid statement:
        emit Level(
            pillar=P4,
            kind=analyst,
            price=level,
            evidence=statement,
            formed_at=published_at
        )

    group levels within 5 pips
    if group has 2 independent tier1/tier2 sources:
        analyst_dimension = 2
    else if group has 1 valid source:
        analyst_dimension = 1
    else:
        analyst_dimension = 0
        write missing_data row
```

Rules:

- no paraphrased implicit level;
- no averaging contradictory levels;
- one source may support multiple separated levels;
- source tier is explicit, never guessed.

**GATE**

```bash
bun run m1/scripts/checkP4.ts
```

Pass tokens:

```text
P4_EXPLICIT_LEVEL_OK
P4_CUTOFF_REJECT
P4_CONSENSUS_2
P4_NO_PROXY
```

**COMMIT**

```text
feat(m1): implement P4 analyst consensus
PV-Gate: work
```

## P1.TURN-04 — P7 exchange arena source

**TARGET**

`m1/src/p7exchange.ts`.

**INTERFACE**

```ts
export interface ArenaInput {
  source: "ICE" | "CME";
  published_at: number;
  walls: Array<{ pair: string; price: number; notional_usd: number }>;
}
```

**PSEUDOCODE**

```text
pillar7Exchange(input, asset, cutoff):
    reject if published_at > cutoff
    filter pair == asset
    include walls with notional >= 1_500_000_000
    if none:
        return { arena: null, missing: "P7_NO_TIER1_WALL" }
    floor = min included price
    ceiling = max included price
    return arena with evidence
```

Do not silently use the existing option-wall fallback when exchange evidence is configured. If exchange acquisition fails, record `P7_EXCHANGE_SOURCE_MISSING` and use the blueprint fallback only for this M1 run.

**GATE**

```bash
bun run m1/scripts/checkP7.ts
```

Pass tokens:

```text
P7_EXCHANGE_ARENA_OK
P7_AFTER_CUTOFF_REJECTED
P7_NO_TIER1_WALL_NAMED
```

**COMMIT**

```text
feat(m1): add exchange arena source
PV-Gate: work
```

## P1.TURN-05 — Evidence manifest

**TARGET**

`m1/src/evidence/manifest.ts`.

**PSEUDOCODE**

```text
buildManifest(sources, identity):
    for each source:
        bytes = canonical bytes
        sha = sha256(bytes)
        cutoff_status =
            published_at == null ? MISSING :
            published_at <= cutoff ? BEFORE_CUTOFF : AFTER_CUTOFF

    require every prediction source BEFORE_CUTOFF
    return manifest rows with:
        source_id, source_kind, pillar, sha, published_at,
        retrieved_at, cutoff_status, raw_key, impact
```

**GATE**

```bash
bun run m1/scripts/checkManifest.ts
```

Pass tokens:

```text
MANIFEST_SHA_OK
MANIFEST_CUTOFF_OK
MANIFEST_FUTURE_REJECTED
MANIFEST_MISSING_NAMED
```

**COMMIT**

```text
feat(m1): build immutable evidence manifest
PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P1-EVIDENCE/checkpoint.json
```

---

# P2 — NINE-PILLAR ENGINE COMPLETION

## P2.TURN-01 — Window determinism

**TARGET**

`m1/src/window.ts`.

**PSEUDOCODE**

```text
runWindow(asset, monday):
    require monday is Monday 00:00 UTC
    london_offset = UK DST table lookup(monday)
    cutoff = monday 09:00 London
    open = previous Sunday 22:00 UTC
    end = friday 21:00 UTC
    render_from = monday - 7 days
    render_to = end
    return deterministic object
```

**GATE**

```bash
bun run m1/scripts/checkWindow.ts
```

Pass tokens:

```text
WINDOW_MONDAY_OK
WINDOW_CUTOFF_OK
WINDOW_R36_OK
WINDOW_NON_MONDAY_REJECTED
```

**COMMIT**

```text
feat(m1): enforce deterministic run window
PV-Gate: work
```

## P2.TURN-02 — P1 variable pivot set

**TARGET**

`m1/src/p1.ts`.

**REQUIRED CHANGES**

1. Rename the conceptual output from fixed 42 levels to variable multi-set output.
2. Record every source set and variant.
3. Verify classic/fib/camarilla formulas.
4. Reject malformed OHLC.
5. Preserve all levels; no spot-distance filter.

**PSEUDOCODE**

```text
pillar1:
    for source in [priorWeek] + priorDays + overlappingHistory:
        for variant in [classic, fib, camarilla]:
            levels = formulas(source, variant)
            verify formulas
            verify ordering and range
            append levels
    return { levels, sets: count, audit }
```

**GATE**

```bash
bun run m1/scripts/checkP1.ts
```

Pass tokens:

```text
P1_FORMULA_OK
P1_ORDER_OK
P1_SET_COUNT_OK
P1_NO_SPOT_FILTER
```

**COMMIT**

```text
feat(m1): complete variable P1 pivot engine
PV-Gate: work
```

## P2.TURN-03 — P2 MA grid exactness

**TARGET**

`m1/src/p2.ts`.

**PSEUDOCODE**

```text
pillar2:
    require >= 200 completed D1 sessions
    calculate SMA and EMA for 9,10,20,50,100,200
    for 50/100/200:
        if close crossed above MA in last 3 sessions:
            tag recapture
    cluster 3+ MAs within 15 pips
    emit individual levels plus cluster levels
```

**GATE**

```bash
bun run m1/scripts/checkP2.ts
```

Pass tokens:

```text
P2_HISTORY_REJECT
P2_MA_COUNT_12
P2_CLUSTER_3_PLUS
P2_RECAPTURE_OK
```

**COMMIT**

```text
feat(m1): enforce P2 MA grid and recapture
PV-Gate: work
```

## P2.TURN-04 — P3/P8 decimal audit

**TARGET**

`m1/src/options.ts`.

**PSEUDOCODE**

```text
pillar3and8:
    validate extraction cutoff and publication week
    resolve spot at publication
    K = DXY_ref * EURUSD_spot^0.576 for DXY
    for each expiry:
        notional_usd = currency-aware conversion
        tier = >=1.5B ? 1 : >=850M ? 2 : 3
        if tier == 3: audit only
        convert DXY strike with component weight
        native pair strike remains in pair price space
        emit P3 or P8 level with image evidence
```

Use decimal arithmetic where available. Do not round before tier comparison.

**GATE**

```bash
bun run m1/scripts/checkOptions.ts
```

Pass tokens:

```text
P3_K_EXACT
P3_TIER_ORDER_OK
P8_NATIVE_STRIKE_OK
P3_TIER3_AUDIT_ONLY
```

**COMMIT**

```text
feat(m1): audit P3/P8 decimal conversion
PV-Gate: work
```

## P2.TURN-05 — P5 structure completeness

**TARGET**

`m1/src/p5.ts`.

**REQUIRED SURFACES**

1. 90-day scan with conditional 180-day extension.
2. Qualified fractal swings.
3. D1 order blocks.
4. 4H/1H singular-candle S/D.
5. LSZ bands/extensions.
6. Repeated extremes and role reversals.
7. Anchors and HWC/LWC.
8. Intra-zone levels.

**PSEUDOCODE**

```text
pillar5:
    completedDays = sessions ending before cutoff
    swings = five-bar fractals with qualified wick
    if spot near 90-180d boundary:
        scanDays = 180
    else:
        scanDays = 90

    d1OrderBlocks = directionalBase + impulse qualification
    sd4h = scanSd(h4)
    sd1h = scanSd(h1)
    lsz = band around qualified swing
    magnets = repeated extremes and role reversals
    anchors = prior closes, weekly close, HWC, LWC
    intra = close/prior-close/fib/round anchors inside zones

    reject invalid geometry
    return P5Out
```

**GATE**

```bash
bun run m1/scripts/checkP5.ts
```

Pass tokens:

```text
P5_SCAN_DAYS_OK
P5_SWING_WICK_OK
P5_SD_WIDTH_REJECT
P5_LSZ_BAND_OK
P5_MAGNET_BONUS_OK
```

**COMMIT**

```text
feat(m1): complete P5 structural scan
PV-Gate: work
```

## P2.TURN-06 — P6/P7 deterministic grids

**TARGET**

`m1/src/p6p7.ts`, `m1/src/p7exchange.ts`.

**PSEUDOCODE**

```text
pillar6:
    fibLevels(priorWeek, ratios)
    fibLevels(latestSwing, ratios)
    roundQuarterGrid(scannedRange, 25 pips, major every 50 pips)

pillar7:
    prefer exchange arena
    fallback only when exchange source is named missing
```

**GATE**

```bash
bun run m1/scripts/checkP6P7.ts
```

Pass tokens:

```text
P6_FIB_COUNT_OK
P6_ROUND_GRID_OK
P7_EXCHANGE_PREFERRED
P7_FALLBACK_NAMED
```

**COMMIT**

```text
feat(m1): deterministic P6/P7 grids
PV-Gate: work
```

## P2.TURN-07 — P9 and assembly invariants

**TARGET**

`m1/src/assemble.ts`.

**PSEUDOCODE**

```text
scoreLevel:
    technical 0..2
    options 0..2
    analyst 0..2
    structural 0..2
    psychological 0..2
    regime 0..2
    structural bonus <= 2
    total <= 14

assemble:
    deduplicate levels by pillar|kind|rounded price
    cluster around highest-scoring seed within 7.5 pips
    zone score = max member score
    assign role from spot
    count qualifying reactions
    classify ZFP by strength/type
    compute measured move if ZFP > 45
```

**GATE**

```bash
bun run m1/scripts/checkAssembly.ts
```

Pass tokens:

```text
SCORE_BOUNDS_OK
DEGREE_MAP_OK
CLUSTER_15_PIP_OK
REACTION_STATE_OK
ZFP_NO_WIDTH_OK
```

**COMMIT**

```text
feat(m1): enforce assembly invariants
PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P2-PILLARS/checkpoint.json
```

---

# P3 — ORGAN TRANSPLANT

## P3.TURN-01 — Quarantine donors

**TARGET**

`m1/donors/v453/reference/`.

**ACTION**

Copy exactly these donor bytes as `.txt` files:

```text
lmv.ts.txt
lqz-matrix.ts.txt
freshness.ts.txt
zone-pressure.ts.txt
obcv.ts.txt
bom-mom.ts.txt
ob-engine.ts.txt
shape-brain.ts.txt
storyline-engine.ts.txt
```

Create `PROVENANCE.json`:

```json
{
  "source_root": "/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/PLUTUS/ARCHIVE/agent/Checkpoints/v4.5.3_CLEAN_BASELINE",
  "files": [
    { "source": "src/mdve/lmv.ts", "copy": "lmv.ts.txt", "sha256": "..." }
  ]
}
```

**RULES**

- no runtime import resolves into `m1/donors`;
- no old dependency is copied;
- no file is executable TypeScript;
- `ob-engine`, `shape-brain`, and `storyline-engine` are reference-only.

**GATE**

```bash
bun run m1/scripts/checkDonors.ts
```

Pass tokens:

```text
DONOR_SHA_OK
DONOR_NON_EXECUTABLE_OK
DONOR_NO_RUNTIME_IMPORT
DONOR_FORBIDDEN_FILES_ABSENT
```

**COMMIT**

```text
build(m1): quarantine v4.5.3 reference donors
PV-Gate: work
```

## P3.TURN-02 — Candle-pressure adapter

**TARGET**

`m1/src/organs/candlePressure.ts`.

**PSEUDOCODE**

```text
classifyTouch(zone, before, test, after):
    if test bar crosses defended edge and returns:
        return SWEEP
    if wick enters and close stays on originating side:
        return WICK_REJECT
    if body enters and close stays on originating side:
        return BODY_DEFEND
    if >=2 closes stay inside without direction:
        return CONSOL_DWELL
    if body closes through far edge:
        return PASS_THROUGH
    return UNCLASSIFIED_REFUSED
```

Every emitted event includes:

```text
time, kind, pre_side, test_bar_id, exit_bar_id,
pierce, reclaim, gap_through
```

**GATE**

```bash
bun run m1/scripts/checkCandlePressure.ts
```

Pass tokens:

```text
TOUCH_SWEEP_OK
TOUCH_WICK_REJECT_OK
TOUCH_BODY_DEFEND_OK
TOUCH_PASS_THROUGH_AUDIT_ONLY
TOUCH_POST_CUTOFF_REJECTED
```

**COMMIT**

```text
feat(m1): port candle-pressure machine
PV-Gate: work
```

## P3.TURN-03 — LMV adapter

**TARGET**

`m1/src/organs/lmv.ts`.

**PSEUDOCODE**

```text
buildLmvRungs(preBars, unit):
    if bar_count < 720:
        record LMV_LOOKBACK_TRUNCATED available=<count>
    strictSwings = local extrema
    clusters = swings within 2 pips and max span 4 pips
    for each cluster:
        reactions = candles touching cluster
        kinds = distinct valid touch kinds excluding PASS_THROUGH
        if count(reactions) >= 3 and count(kinds) >= 2:
            center = modal body close
            defendedEdge = side-facing reaction extreme
            emit rung
    return rungs
```

**GATE**

```bash
bun run m1/scripts/checkLmv.ts
```

Pass tokens:

```text
LMV_CLUSTER_OK
LMV_REACTION_3_OK
LMV_KIND_2_OK
LMV_DEFENDED_EDGE_OK
LMV_TRUNCATION_NAMED
```

**COMMIT**

```text
feat(m1): port LMV defended-edge engine
PV-Gate: work
```

## P3.TURN-04 — OBCV adapter

**TARGET**

`m1/src/organs/obcv.ts`.

**PSEUDOCODE**

```text
detectObcvCandidates(bars30m, bars1h, bars4h, unit, cutoff):
    lanes = available pre-cutoff timeframes
    if 30m absent:
        record OBCV_30M_DATA_MISSING

    for each lane:
        atr = rolling ATR excluding candidate
        displacement_floor = 50/30/20 pips by 4H/1H/30m
        for each impulse candidate:
            require displacementPips >= floor
            require body multiplier >= 1.5
            require forward confirmation
            require structure break
            require origin candle singular
            classify BoM/MoM/PHANTOM_BOM
            emit candidate with deterministic ID
```

**GATE**

```bash
bun run m1/scripts/checkObcv.ts
```

Pass tokens:

```text
OBCV_4H_FLOOR_50
OBCV_1H_FLOOR_30
OBCV_30M_FLOOR_20
OBCV_30M_MISSING_NAMED
OBCV_POST_CUTOFF_REJECTED
```

**COMMIT**

```text
feat(m1): port OBCV order-block vision
PV-Gate: work
```

## P3.TURN-05 — OBCV canonical reconciliation

**TARGET**

`m1/src/organs/reconcile.ts`.

**PSEUDOCODE**

```text
reconcile(currentP5Sd, obcvCandidates):
    for each candidate:
        find origin-equivalent current zone:
            same side and timeframe
            origin within one timeframe bar
        if equivalent:
            overlap = intersection / min(width)
            if overlap >= 0.5:
                class = AGREED
            else:
                class = EDGE_CONFLICT
        else:
            class = OBCV_ADDITIONAL
        reject failed gates

    additional candidates become P5 Levels
    canonical assemble decides zone creation
```

Forbidden:

- direct OBCV zone creation;
- geometry replacement on edge conflict;
- duplicate addition.

**GATE**

```bash
bun run m1/scripts/checkObcvReconcile.ts
```

Pass tokens:

```text
OBCV_AGREED_OK
OBCV_EDGE_CONFLICT_OK
OBCV_ADDITIONAL_LEVEL_ONLY
OBCV_NO_CANONICAL_SCORE_REJECTED
```

**COMMIT**

```text
feat(m1): reconcile OBCV through canonical assembly
PV-Gate: work
```

## P3.TURN-06 — Freshness ledger

**TARGET**

`m1/src/organs/freshness.ts`.

**PSEUDOCODE**

```text
buildFreshness(zone, preBars):
    events = classify qualifying touches before cutoff
    state =
        0 -> FRESH
        1 -> TESTED_1X
        2 -> TESTED_2X
        >=3 -> DEPLETED
    if qualifying pierce battle:
        state = VIOLATED
        pierced = true
    gap_through is not depletion
    return state, events, derived reactionState
```

**GATE**

```bash
bun run m1/scripts/checkFreshness.ts
```

Pass tokens:

```text
FRESHNESS_STATE_MAP_OK
FRESHNESS_VIOLATED_OK
FRESHNESS_GAP_NOT_DEPLETED
FRESHNESS_EVENT_COUNT_OK
```

**COMMIT**

```text
feat(m1): port freshness ledger
PV-Gate: work
```

## P3.TURN-07 — Pressure machine

**TARGET**

`m1/src/organs/pressure.ts`.

**PSEUDOCODE**

```text
buildPressure(zone, zones, liquidity):
    battles = qualifying battles
    pierced = any pierce battle
    lifecycle =
        0 -> VIRGIN
        1 -> ACTIVE_1
        2 -> ACTIVE_2
        3 -> DEPLETED
        4+ holds no pierce -> FORTRESS
        pierced -> BROKEN
    nested = nearest contained liquidity
    shield = nearest front-side liquidity
    absorption = opposite reaction without progress
    operativeDefense = shield present ? SHIELD_FUEL : PRESSURE_STRUCTURE
```

**GATE**

```bash
bun run m1/scripts/checkPressure.ts
```

Pass tokens:

```text
PRESSURE_LIFECYCLE_OK
PRESSURE_FORTRESS_OK
PRESSURE_SHIELD_OK
PRESSURE_GAP_NOT_BATTLE
```

**COMMIT**

```text
feat(m1): port pressure lifecycle
PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P3-ORGANS/checkpoint.json
```

---

# P4 — RENDERER AND R36

## P4.TURN-01 — Derived card schema

**TARGET**

`m1/src/derivedCard.ts`.

**PSEUDOCODE**

```text
deriveCard(base, organs):
    require base.sha256 exists
    derived = structuredClone(base)
    derived.schema_version += 1
    derived.supersedes_sha256 = base.sha256
    derived.unassignedPrecision = LMV rungs with no zone
    attach zone precision/freshness/pressure
    canonical JSON
    derived.sha256 = sha256(bytes)
    return derived
```

**GATE**

```bash
bun run m1/scripts/checkDerivedCard.ts
```

Pass tokens:

```text
DERIVED_SCHEMA_OK
DERIVED_BASE_IMMUTABLE
DERIVED_SUPERSEDES_OK
UNASSIGNED_PRECISION_OK
```

**COMMIT**

```text
feat(m1): seal derived organ card
PV-Gate: work
```

## P4.TURN-02 — R36 clipping and temporal anchors

**TARGET**

`m1/src/compose.ts`.

**PSEUDOCODE**

```text
renderWindow(card):
    left = monday - 7 days
    right = friday 21:00 UTC
    every box/line/label uses xloc.bar_time
    object start = max(origin, left, last_pre_cutoff_reaction)
    object end = min(natural_end, right)
```

Forbidden:

- old origin crossing the active week;
- 25-day right extension;
- long-origin LSZ drawn from origin.

**GATE**

```bash
bun run m1/scripts/checkR36.ts
```

Pass tokens:

```text
R36_LEFT_7D_OK
R36_RIGHT_FRIDAY_OK
R36_OLD_ORIGIN_NOT_DRAWN
R36_ALL_OBJECTS_CLIPPED
```

**COMMIT**

```text
fix(m1): enforce R36 two-week render window
PV-Gate: work
```

## P4.TURN-03 — Presentation de-clutter

**TARGET**

`m1/src/compose.ts`.

**ACTION**

1. Remove the always-on card dump table from the chart.
2. Move card data to an inspect command/table toggled off by default.
3. IP labels show only family, degree, and ZFP.
4. Colliding labels re-stagger deterministically.
5. S/D text is limited to BoM/MoM and reaction state.
6. Intra-zone levels remain hidden by default.

**PSEUDOCODE**

```text
layoutLabels(objects):
    sort by price then priority
    for each overlapping label:
        move to next free vertical slot
    if no slot:
        drop lowest-priority label
        record dropped object ID
```

**GATE**

```bash
bun run m1/scripts/checkPresentation.ts
```

Pass tokens:

```text
TABLE_OFF_BY_DEFAULT
LABEL_COLLISION_ZERO
SD_TEXT_COMPACT
INTRA_OFF_BY_DEFAULT
```

**COMMIT**

```text
fix(m1): repair E1 presentation layer
PV-Gate: work
```

## P4.TURN-04 — Object budget measurement

**TARGET**

`m1/out/room-budget-<checkpoint>.json`.

**PSEUDOCODE**

```text
measureRoomBudget(baselineComposition):
    lo = object_count(baseline)
    hi = double objects until render fails
    while hi-lo > 1:
        mid = (lo+hi)/2
        clone composition with mid synthetic disabled objects
        capture Pinebox
        if frame nonempty and renderer accepted:
            lo = mid
        else:
            hi = mid
    return lo
```

The synthetic objects exist only in a scratch copy and never enter git.

**GATE**

```bash
bun run m1/scripts/checkRoomBudget.ts
```

Pass tokens:

```text
ROOM_BUDGET_INTEGER
ROOM_BUDGET_METHOD_BISECTION
ROOM_CAPTURE_SHAS_RECORDED
```

**COMMIT**

```text
test(m1): measure Pinebox room object budget
PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P4-RENDER/checkpoint.json
```

---

# P5 — PINEBOX ACCEPTANCE

## P5.TURN-01 — Active golden-week baseline

**ASSET**

```text
EURUSD
```

**WEEK**

```text
2026-07-06
```

**ACTION**

```bash
bun run m1/src/run.ts EURUSD 2026-07-06
bun run m1/src/compose.ts m1/out/e1-card-EURUSD-2026-07-06.json
# load generated Pine in Pinebox through the existing tool
# capture full chart and plot section
```

**REQUIRED FAMILIES**

1. IP resistance.
2. IP equilibrium.
3. IP support.
4. LSZ.
5. canonical S/D.
6. option strikes.
7. POI/pressure metadata in inspect layer.
8. strength ZFP.
9. BoM/MoM.
10. mitigation/reactions.
11. intra-zone levels.
12. core/spike.
13. card identity/missing data.

**GATE**

A vision-capable reader opens the capture. Every family is classified:

```text
MATCHED | WRONG | MISSING | EXTRA | UNOBSERVABLE
```

M1 candidate requires:

```text
no MISSING required family
no WRONG required family
no EXTRA harmful object
operator visual approval
```

No commit occurs for this measurement turn; evidence is copied into `m1/checkpoints/M1-COMPLETE/` only after the comparison gate passes.

## P5.TURN-02 — Repair loop

**PSEUDOCODE**

```text
while comparison has defect:
    defectClass = classify(row)
    owner =
        source plane if evidence wrong
        pillar if arithmetic wrong
        assembly if zone wrong
        renderer if visible family wrong
        presentation if geometry right but unreadable
    repair owner
    rerun same asset/week
    recapture
    recomparison
    assert previously MATCHED rows remain MATCHED
```

Stop conditions:

**GATE**

```bash
test "$(jq -r '.summary.missing' m1/checkpoints/M1-COMPLETE/comparison.json)" = 0
test "$(jq -r '.summary.wrong' m1/checkpoints/M1-COMPLETE/comparison.json)" = 0
```

- all required families matched and operator approves;
- hard block proven with named token and evidence.

## P5.TURN-03 — M1-complete checkpoint

**ACTION**

Create `m1/checkpoints/M1-COMPLETE/` with:

- checkpoint.json;
- comparison.json;
- full chart PNG;
- plot-only PNG;
- base and derived card SHAs;
- Pine SHA;
- Pinebox run identity;
- room budget artifact;
- operator review request.

**GATE**

Existing git gate must accept `PV-Gate: m1-complete`.

**STOP**

No random weeks, E2, E3, packaging, or push until operator unlock.

---

# P6 — CLOUDFLARE WORKER/DO

## P6.TURN-01 — Worker scaffold

**TARGET**

`cloud/worker.ts`.

**PSEUDOCODE**

```ts
export default {
  async fetch(request, env) {
    route POST /e1/run -> validate body -> env.E1_RUN.get(id).run(input)
    route GET /e1/card/:asset/:monday -> read sealed R2 object
    route GET /e1/pine/:asset/:monday -> read composed R2 object
    route GET /e1/status/:run_id -> read D1 state
    unknown -> 404 ROUTE_UNKNOWN
  }
}
```

**GATE**

```bash
bun run cloud/scripts/checkWorker.ts
```

Pass tokens:

```text
ROUTE_RUN_OK
ROUTE_CARD_OK
ROUTE_PINE_OK
ROUTE_STATUS_OK
ROUTE_UNKNOWN_404
```

**COMMIT**

```text
feat(cloud): implement E1 Worker routes
PV-Gate: work
```

## P6.TURN-02 — Durable Object task graph

**TARGET**

`cloud/do.ts`, `cloud/state.ts`.

**PSEUDOCODE**

```text
run(input):
    if D1 state SEALED:
        return existing SHAs

    state = RESOLVED
    identity = runWindow(input)
    evidenceTasks = allSettled(acquire sources)
    record missing_data
    critical failure -> BLOCKED and return named refusal

    pillarTasks = allSettled(run pillars)
    organTasks = allSettled(run organs)
    reconcile OBCV
    derive card
    validate card
    optional Bend proof
    seal R2
    compose Pine
    update D1 state
    return SHAs
```

**GATE**

```bash
bun run cloud/scripts/checkTaskGraph.ts
```

Pass tokens:

```text
DO_IDEMPOTENT_OK
DO_PARALLEL_TASKS_OK
DO_CRITICAL_FAILURE_NAMED
DO_STATE_FORWARD_ONLY
```

**COMMIT**

```text
feat(cloud): implement deterministic E1 task graph
PV-Gate: work
```

## P6.TURN-03 — R2/D1 persistence

**TARGET**

`cloud/card/seal.ts`, `cloud/state.ts`.

**KEYS**

```text
cards/{asset}/{monday}/{sha}.json
derived/{asset}/{monday}/{sha}.json
pine/{asset}/{monday}/{sha}.pine
raw/{source}/{asset}/{monday}/{sha}
```

D1 tables:

```sql
runs(id, asset, monday, state, base_sha, derived_sha, pine_sha, created_at, updated_at)
sources(run_id, source_id, kind, pillar, sha256, cutoff_status, published_at)
zones(run_id, zone_id, role, degree, score, top, bottom, lifecycle)

verdicts(run_id, kind, verdict, score, artifact_sha)
```

Bend is not the E1 runtime; it is an optional proof-certificate layer.

**GATE**

```bash
bun run cloud/scripts/checkPersistence.ts
```

Pass tokens:

```text
R2_IMMUTABLE_PUT_OK
D1_RUN_ROW_OK
D1_SOURCE_ROWS_OK
DUPLICATE_RUN_IDEMPOTENT
```

**COMMIT**

```text
feat(cloud): seal E1 artifacts in R2 and D1
PV-Gate: work
```

## P6.TURN-04 — Cloud E2E

**ACTION**

Deploy a staging Worker and run:

```bash
bun run cloud/scripts/e2e.ts --asset EURUSD --week 2026-07-06
```

**GATE**

Pass tokens in tool result:

```text
CLOUD_RUN_CREATED
CLOUD_CARD_SHA_RETURNED
CLOUD_PINE_SHA_RETURNED
CLOUD_CARD_VALID
CLOUD_LOCAL_PARITY_OK
```

`CLOUD_LOCAL_PARITY_OK` means the Worker card SHA equals the local deterministic card SHA for identical typed evidence.

**COMMIT**

```text
test(cloud): prove E1 cloud/local parity
PV-Gate: checkpoint
PV-Checkpoint: m1/checkpoints/P6-CLOUD/checkpoint.json
```

---

# P7 — OPTIONAL BEND PROOF

## P7.TURN-01 — Finite proof model

**TARGET**

`proof/bend/LAWS.bend`, `MODEL.bend`, `PROOF.bend`.

**PSEUDOCODE**

```text
Model:
    RunState = RESOLVED | EVIDENCE | PILLARS | ORGANS
             | DERIVED | SEALED | COMPOSED | COMPLETE
    WorkBudget = Nat <= 2
    Card = { sha: Nat, cutoff: Nat, levels: List<Level> }

Laws:
    no evidence timestamp exceeds cutoff
    input levels are conserved
    scores are bounded
    checkpoint sequence strictly increases
    work budget never exceeds two
    complete state cannot advance without unlock
```

**GATE**

```bash
PATH="$HOME/.bend/bin:$PATH" bend PROOF.bend
```

Pass token:

```text
ALL PROOFS CHECK
```

**COMMIT**

```text
build(proof): add E1 conservation laws
PV-Gate: work
```

## P7.TURN-02 — Local proof service

**TARGET**

`proof/service/server.ts`.

**PSEUDOCODE**

```text
POST /prove:
    validate body SHAs
    normalize card to Nat/U32 finite model
    write job
    run bend PROOF.bend
    return job_id

GET /verdict/:id:
    return PASS/FAIL and obligation rows
```

**GATE**

Pass tokens:

```text
PROOF_HEALTH_OK
PROOF_JOB_CREATED
PROOF_PASS_VERDICT
PROOF_NEGATIVE_MODEL_REJECTED
```

Wire the Worker client only after both positive and negative proof controls pass.

**COMMIT**

```text
build(proof): expose local Bend verifier service
PV-Gate: work
```

---

# P8 — PACKAGE AND REPORT

## P8.TURN-01 — Freeze artifacts

No commit occurs in this turn; the measured SHAs become package evidence only after operator unlock.

**ACTION**

```bash
sha256sum m1/out/e1-card-EURUSD-2026-07-06.json
sha256sum m1/out/e1-derived-EURUSD-2026-07-06.json
sha256sum m1/out/plutus-vision-v5-e1.pine
sha256sum cloud/dist/worker.js
```

**GATE**

```bash
bun run m1/scripts/verifyFrozenShas.ts
```

## P8.TURN-02 — Package only after operator approval

Do not package before operator unlock. When ordered:

1. run ship-package skill;
2. include local engine, cloud source, Worker dist, proof artifacts, workflow invalidator, cards, Pine, captures, and audit records;
3. audit zero secrets;
4. tag only after PACKAGE_AUDIT PASS.

**GATE**

```bash
bash SHIP_PACKAGES/plutus-vision/DEPLOY.sh --verify-only
```

---

# WORKFLOW INVALIDATOR MACHINE

Create `gates/validate_workflow.py`.

It must reject a workflow that is only a checklist.

## Required structural checks

1. at least 1,500 lines;
2. at least 40 `## ` headings;
3. exact phase headings P0 through P8;
4. at least 40 `## ` turn headings matching `P[0-8].TURN-[0-9]+`;
5. every turn contains `**ACTION**`, `**GATE**`, and either `**COMMIT**` or an explicit no-commit rule;
6. at least 80 fenced code blocks;
7. no placeholder markers, unfinished-work markers, or deferred-work markers;
8. every `**GATE**` has a code fence or command;
9. every phase has at least one pass token;
10. at least 100 distinct named pass tokens;
11. all target paths are either existing paths or declared in TARGET FILE MANIFEST;
12. all protected paths are named forbidden;
13. no banned market-data source, wall-clock identity, invented zone, or Pinebox edit instruction;
14. E2/E3 are marked deferred;
15. random weeks are locked behind operator unlock;
16. Bend is marked optional proof layer, not E1 runtime;
17. R36 clipping is present;
18. room budget measurement is present;
19. base/derived card sealing is present;
20. Cloudflare local parity is present.

## Exit contract

```text
0 = valid compiler-grade workflow
1 = REJECT(WORKFLOW_INVALIDATOR): <reason>
```

Wire into `.githooks/pre-commit` whenever a staged path matches:

```text
design/BUILD_WORKFLOW*.md
gates/validate_workflow.py
```

---

# THE SCRIPT TESTING SUITE

Every script named below is pre-written before implementation. It uses the `script-test` law: real modules, real side effects, observable outcomes, adversarial and legitimate halves, one exit-code verdict.

## Harness contract

```ts
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function withSandbox<T>(fn: (dir: string) => Promise<T>): Promise<T> {
  const dir = mkdtempSync(join(tmpdir(), "pv-e1-"));
  return fn(dir).finally(() => rmSync(dir, { recursive: true, force: true }));
}

function expectRefusal(token: string, error: unknown) {
  if (!(error instanceof Error) || !error.message.includes(token)) {
    throw new Error(`EXPECTED_REFUSAL ${token}: ${String(error)}`);
  }
}

function pass(name: string) {
  console.log(`PASS ${name}`);
}
```

## Required ST scripts

| Script | Positive token | Adversarial token |
|---|---|---|
| `checkWindow.ts` | `WINDOW_MONDAY_OK` | `WINDOW_NON_MONDAY_REJECTED` |
| `checkBars.ts` | `BAR_ORDER_OK` | `POST_CUTOFF_BAR_REJECTED` |
| `checkProtocolA.ts` | `PROTOCOL_A_VALID` | `PROTOCOL_A_AFTER_CUTOFF_REJECTED` |
| `checkP4.ts` | `P4_CONSENSUS_2` | `P4_NO_PROXY` |
| `checkP7.ts` | `P7_EXCHANGE_ARENA_OK` | `P7_NO_TIER1_WALL_NAMED` |
| `checkManifest.ts` | `MANIFEST_CUTOFF_OK` | `MANIFEST_FUTURE_REJECTED` |
| `checkP1.ts` | `P1_FORMULA_OK` | `P1_NO_SPOT_FILTER` |
| `checkP2.ts` | `P2_CLUSTER_3_PLUS` | `P2_HISTORY_REJECT` |
| `checkOptions.ts` | `P3_TIER_ORDER_OK` | `P3_TIER3_AUDIT_ONLY` |
| `checkP5.ts` | `P5_LSZ_BAND_OK` | `P5_SD_WIDTH_REJECT` |
| `checkAssembly.ts` | `ZFP_NO_WIDTH_OK` | `DEGREE_MAP_OK` |
| `checkDonors.ts` | `DONOR_SHA_OK` | `DONOR_NO_RUNTIME_IMPORT` |
| `checkLmv.ts` | `LMV_DEFENDED_EDGE_OK` | `LMV_TRUNCATION_NAMED` |
| `checkObcv.ts` | `OBCV_4H_FLOOR_50` | `OBCV_30M_MISSING_NAMED` |
| `checkFreshness.ts` | `FRESHNESS_STATE_MAP_OK` | `FRESHNESS_GAP_NOT_DEPLETED` |
| `checkPressure.ts` | `PRESSURE_FORTRESS_OK` | `PRESSURE_GAP_NOT_BATTLE` |
| `checkDerivedCard.ts` | `DERIVED_BASE_IMMUTABLE` | `DERIVED_SUPERSEDES_OK` |
| `checkR36.ts` | `R36_ALL_OBJECTS_CLIPPED` | `R36_OLD_ORIGIN_NOT_DRAWN` |
| `checkPresentation.ts` | `LABEL_COLLISION_ZERO` | `TABLE_OFF_BY_DEFAULT` |
| `checkRoomBudget.ts` | `ROOM_BUDGET_INTEGER` | `ROOM_CAPTURE_SHAS_RECORDED` |
| `checkWorker.ts` | `ROUTE_RUN_OK` | `ROUTE_UNKNOWN_404` |
| `checkTaskGraph.ts` | `DO_IDEMPOTENT_OK` | `DO_CRITICAL_FAILURE_NAMED` |
| `checkPersistence.ts` | `R2_IMMUTABLE_PUT_OK` | `DUPLICATE_RUN_IDEMPOTENT` |

## Runner

```bash
bun run m1/scripts/runAllChecks.ts
```

Exit 0 only when every script prints its positive tokens and every adversarial shape refuses with its named token.

---

# THE DEEP CONTAINER / RUNTIME TESTING SUITE

## Plan-first object

Write `.trident/test-plan.json` before testing:

```json
{
  "objective": "Prove the production E1 Worker and renderer behavior against the V5.2 workflow",
  "tools_under_test": ["cloud/dist/worker.js", "m1/out/plutus-vision-v5-e1.pine"],
  "scenarios": [
    { "name": "auth", "passToken": "AUTH_PROBE_OK", "failToken": "silent_auth_failure" },
    { "name": "identity", "passToken": "E1_IDENTITY_INVALID", "failToken": "accepted-invalid-identity" },
    { "name": "boundary", "passToken": "E1_CUTOFF_VIOLATION", "failToken": "future-evidence-accepted" },
    { "name": "state", "passToken": "DO_IDEMPOTENT_OK", "failToken": "duplicate-run-mutated" },
    { "name": "integration", "passToken": "CLOUD_LOCAL_PARITY_OK", "failToken": "cloud-local-divergence" }
  ],
  "pass_criteria": "Every positive token in a tool result; every negative operation unmuted; Phase E complete."
}
```

## Required angles

1. IDENTITY — invalid asset/week rejected.
2. TOOLS — Worker routes callable.
3. FIREWALL — protected baseline/Pinebox untouched.
4. AUDIT — card validator finds real malformed cards.
5. LIFECYCLE — DO run state forward-only and idempotent.
6. ERRORS — source failures named.
7. BOUNDARY — empty/max/malformed evidence rejected.
8. PERMISSIONS — Worker secrets not exposed.
9. STATE — corrupt D1/R2 state loudly rejected.
10. CONFIG — missing binding named.
11. CONCURRENCY — duplicate same-week requests converge.
12. INTEGRATION — local and cloud card parity.

## Positive suite

Every malformed shape must fire its own token:

```text
E1_IDENTITY_INVALID
E1_CUTOFF_VIOLATION
E1_EVIDENCE_HASH_MISMATCH
E1_CARD_INVALID
E1_ORGAN_INPUT_POST_CUTOFF
E1_BASE_CARD_MUTATED
E1_DERIVED_CHAIN_INVALID
E1_RENDER_BUDGET_EXCEEDED
E1_COMPOSE_BASELINE_DRIFT
```

A generic 500 replacing a specific token is `UNOBSERVED`, not pass.

## Negative suite

Legitimate operations must pass with zero misfire:

- valid EURUSD run;
- valid missing P7 fallback;
- valid unassigned LMV rung;
- valid 30m absence;
- valid optional proof absence;
- valid hidden intra-zone rendering;
- valid operator review stop.

## Phase E circuit breaker

All ten must hold:

1. deployed Worker SHA matches built artifact;
2. auth probe succeeded;
3. every planned scenario executed;
4. every pass token matched in tool-result context;
5. every fail token absent;
6. no circular agent-typed token;
7. no timeout treated as pass;
8. blast radius covered;
9. adversarial behaved as designed;
10. results artifact written.

## Results artifact

`.trident/container-test-results.json` records per scenario:

```json
{
  "name": "boundary-cutoff",
  "specificToken": "E1_CUTOFF_VIOLATION",
  "passTokenMatch": true,
  "failTokenAbsent": true,
  "toolResultContext": true,
  "verdict": "PASS"
}
```

---

# THE SPEC ILLUSTRATED

## Master view

```text
┌──────────────────────────────────────────────────────────────┐
│ P0 Preflight: authority, baseline, refusal vocabulary        │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P1 Evidence: bars, Protocol A, P4 analysts, P7 exchange      │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P2 Pillars: P1 P2 P3/P8 P4 P5 P6 P7 P9 assembly              │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P3 Organs: candle pressure, LMV, OBCV, freshness, pressure   │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P4 Render: derived card, R36 clip, presentation, budget      │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P5 Pinebox: golden week, repair loop, M1 complete            │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P6 Cloud: Worker, DO, R2/D1, cloud/local parity              │
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P7 Bend proof (optional): state/card conservation certificate│
└───────────────────────────┬──────────────────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────┐
│ P8 Package: frozen SHAs, audit, operator-approved ship       │
└──────────────────────────────────────────────────────────────┘
```

## Core state machine

```text
RESOLVED → EVIDENCE_READY → PILLARS_READY → ORGANS_READY
        → DERIVED_VALID → SEALED → COMPOSED
        → RENDER_CANDIDATE → OPERATOR_REVIEW
```

## Error map

```text
identity → E1_IDENTITY_INVALID
cutoff → E1_CUTOFF_VIOLATION
hash → E1_EVIDENCE_HASH_MISMATCH
schema → E1_CARD_INVALID
pillar → E1_PILLAR_FAILED
organ time → E1_ORGAN_INPUT_POST_CUTOFF
30m source → E1_OBCV_30M_DATA_MISSING
LMV history → E1_LMV_LOOKBACK_TRUNCATED
asset → E1_ASSET_UNSUPPORTED
base seal → E1_BASE_CARD_MUTATED
derived chain → E1_DERIVED_CHAIN_INVALID
render budget → E1_RENDER_BUDGET_EXCEEDED
baseline → E1_COMPOSE_BASELINE_DRIFT
proof → E1_PROOF_FAILED / E1_PROOF_UNAVAILABLE
```

---

# FINAL EXECUTION LAW

1. Execute turns in order.
2. Run every gate.
3. Capture every evidence artifact.
4. Commit only the named files.
5. Never weaken this workflow.
6. Never substitute a source or fallback.
7. Stop at M1-complete for operator review.
8. Report blocked states by token, never as passes.

**End of V5.2 compiler-grade workflow.**
