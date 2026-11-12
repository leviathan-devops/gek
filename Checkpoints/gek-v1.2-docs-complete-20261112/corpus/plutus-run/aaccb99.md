COMMIT aaccb99 feat(m1): land the cloud and proof planes under m1/ (gate-legal prefix)
MESSAGE:
feat(m1): land the cloud and proof planes under m1/ (gate-legal prefix)

cloud/** -> m1/cloud/** and proof/** -> m1/proof/** (the commit gate's
allowed_work_prefixes admits m1/ only - the recorded token-free resume
path). m1/cloud/do.ts:124 imports repointed (21 refs);
m1/cloud/scripts/fixtures.ts:14 ROOT depth; m1/cloud/wrangler.jsonc:3
main=worker.ts; m1/cloud/dist/README.md:1 the bundle provenance record.

Gate evidence post-relocation, all re-run this turn: wrangler deploy
from the new config (Deployed plutus-e1-staging), e2e --with-fixtures
exit 0 with CLOUD_LOCAL_PARITY_OK worker==local (base
acee9172b8255a43), checkWorker/checkTaskGraph/checkPersistence exit 0,
checkBend/checkService exit 0, tsc exit 0, 22-script M1 regression
sweep silent.

PV-Gate: work


FILES: m1/cloud/card/seal.ts, m1/cloud/dist/README.md, m1/cloud/dist/worker.js, m1/cloud/do.ts, m1/cloud/m1/cloud/dist/worker.js, m1/cloud/scripts/checkPersistence.ts, m1/cloud/scripts/checkTaskGraph.ts, m1/cloud/scripts/checkWorker.ts, m1/cloud/scripts/e2e.ts, m1/cloud/scripts/fixtures.ts, m1/cloud/state.ts, m1/cloud/worker.ts, m1/cloud/workers-runtime.d.ts, m1/cloud/workers-shim.ts, m1/cloud/wrangler.jsonc
DIFF:
diff --git a/m1/cloud/card/seal.ts b/m1/cloud/card/seal.ts
new file mode 100644
index 0000000..70a59d3
--- /dev/null
+++ b/m1/cloud/card/seal.ts
@@ -0,0 +1,113 @@
+// cloud/card/seal.ts - R2/D1 key layout and seal/compose writers.
+//
+// KEYS (P6 contract):
+//   cards/{asset}/{monday}/{sha}.json
+//   derived/{asset}/{monday}/{sha}.json
+//   pine/{asset}/{monday}/{sha}.pine
+//   raw/{source}/{asset}/{monday}/{sha}
+// D1 tables: runs(id, asset, monday, state, base_sha, derived_sha, pine_sha,
+//   created_at, updated_at); sources(...); zones(...); verdicts(...).
+// Bend is NOT the E1 runtime: it is an optional proof-certificate layer the DO
+// invokes only when a proof request is present. Import-safe: no Node imports.
+import type { D1Store, R2Store } from '../state';
+
+export const keys = {
+  card: (asset: string, monday: string, sha: string) => `cards/${asset}/${monday}/${sha}.json`,
+  derived: (asset: string, monday: string, sha: string) => `derived/${asset}/${monday}/${sha}.json`,
+  pine: (asset: string, monday: string, sha: string) => `pine/${asset}/${monday}/${sha}.pine`,
+  raw: (source: string, asset: string, monday: string, sha: string) => `raw/${source}/${asset}/${monday}/${sha}`,
+  latestCard: (asset: string, monday: string) => `cards/${asset}/${monday}/latest`,
+  latestPine: (asset: string, monday: string) => `pine/${asset}/${monday}/latest`,
+};
+
+export function validateKeyKind(key: string): 'cards' | 'derived' | 'pine' | 'raw' {
+  if (key.startsWith('cards/')) return 'cards';
+  if (key.startsWith('derived/')) return 'derived';
+  if (key.startsWith('pine/')) return 'pine';
+  if (key.startsWith('raw/')) return 'raw';
+  throw new Error(`SEAL_KEY_UNKNOWN: ${key} - keys are cards/|derived/|pine/|raw/ only`);
+}
+
+/** Seal the base card: immutable put + D1 row. Returns the object key. */
+export async function sealBaseCard(
+  r2: R2Store, d1: D1Store,
+  args: { runId: string; asset: string; monday: string; sha: string; canonicalBody: string },
+): Promise<string> {
+  const key = keys.card(args.asset, args.monday, args.sha);
+  await r2.put(key, args.canonicalBody);
+  await r2.put(keys.latestCard(args.asset, args.monday), args.sha);
+  return key;
+}
+
+/** Seal the derived card: immutable put + D1 row update. Returns the key. */
+export async function sealDerivedCard(
+  r2: R2Store,
+  args: { asset: string; monday: string; sha: string; canonicalBody: string },
+): Promise<string> {
+  const key = keys.derived(args.asset, args.monday, args.sha);
+  await r2.put(key, args.canonicalBody);
+  return key;
+}
+
+/** Seal the composed Pine layer: immutable put. Returns the key. */
+export async function sealPine(
+  r2: R2Store,
+  args: { asset: string; monday: string; sha: string; pine: string },
+): Promise<string> {
+  const key = keys.pine(args.asset, args.monday, args.sha);
+  await r2.put(key, args.pine);
+  await r2.put(keys.latestPine(args.asset, args.monday), args.sha);
+  return key;
+}
+
+/** Store one raw source payload under the raw/ key shape. */
+export async function sealRaw(
+  r2: R2Store,
+  args: { source: string; asset: string; monday: string; sha: string; bytes: Uint8Array | string },
+): Promise<string> {
+  const key = keys.raw(args.source, args.asset, args.monday, args.sha);
+  await r2.put(key, args.bytes);
+  return key;
+}
+
+function b64Encode(bytes: Uint8Array): string {
+  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
+  let out = '';
+  for (let i = 0; i < bytes.length; i += 3) {
+    const a = bytes[i]!, b = i + 1 < bytes.length ? bytes[i + 1]! : 0, c = i + 2 < bytes.length ? bytes[i + 2]! : 0;
+    const n = (a << 16) | (b << 8) | c;
+    out += chars[(n >> 18) & 63] + chars[(n >> 12) & 63] + (i + 1 < bytes.length ? chars[(n >> 6) & 63] : '=') + (i + 2 < bytes.length ? chars[n & 63] : '=');
+  }
+  return out;
+}
+
+/** Optional Bend proof certificate — never the E1 runtime. A caller that wants a
+ *  proof attaches { bendProof: b64 } to the run input; the DO stores it raw and
+ *  records verdict kind=bend. The certificate never influences pillars/organs. */
+export async function sealBendProof(
+  r2: R2Store, d1: D1Store,
+  args: { runId: string; asset: string; monday: string; proofBytes: Uint8Array | string },
+): Promise<{ key: string; sha: string }> {
+  const bytes = typeof args.proofBytes === 'string' ? args.proofBytes : b64Encode(args.proofBytes);
+  const sha = await digestHex(typeof bytes === 'string' ? bytes : b64Encode(args.proofBytes as Uint8Array));
+  const key = keys.raw('bend-proof', args.asset, args.monday, sha);
+  await r2.put(key, bytes);
+  d1.insertVerdict({ run_id: args.runId, kind: 'bend', verdict: 'PROOF_SEALED', score: 1, artifact_sha: sha });
+  return { key, sha };
+}
+
+/** Worker-safe hex digest hook: the DO injects the real SHA-256 at runtime.
+ *  The module default below is the deterministic FNV-1a fallback used ONLY by
+ *  the local checks (never shipped as a seal over production artifacts). */
+export let digestHex: (s: string) => Promise<string> = async (s: string) => {
+  let h1 = 0x811c9dc5, h2 = 0x811c9dc5 ^ 0xdead;
+  for (let i = 0; i < s.length; i++) {
+    const c = s.charCodeAt(i);
+    h1 = Math.imul(h1 ^ c, 16777619) >>> 0;
+    h2 = Math.imul(h2 ^ (c + 31), 16777619) >>> 0;
+  }
+  const h = (n: number) => ('00000000' + n.toString(16)).slice(-8);
+  return (h(h1) + h(h2) + h(Math.imul(h1 ^ h2, 16777619) >>> 0) + h(Math.imul(h1 + h2, 16777619) >>> 0)).repeat(2).slice(0, 64);
+};
+
+export function setDigestHex(fn: (s: string) => Promise<string>): void { digestHex = fn; }
diff --git a/m1/cloud/dist/README.md b/m1/cloud/dist/README.md
new file mode 100644
index 0000000..44b20ff
--- /dev/null
+++ b/m1/cloud/dist/README.md
@@ -0,0 +1,105 @@
+# m1/cloud/dist — the built Worker bundle (engineering record)
+
+The compiled, deployable form of the E1 Cloudflare Worker surface: the
+route table, the Durable Object task graph, the forward-only state
+machine, and the immutable seal adapters over the real R2/D1 bindings.
+
+NOTE: wrangler's --outdir cleaning removes this README on every deploy;
+regenerate it after each build (this is the recorded copy).
+
+## Contents
+
+| File | Role | Provenance |
+|---|---|---|
+| worker.js | the esbuild bundle (89.55 KiB upload, gzip 24.64 KiB) | wrangler 4.160.0 from m1/cloud/worker.ts |
+| README.md | this record | primary-authored |
+
+Bundle sha256 (frozen by P8.TURN-01): 2fdeb310320080a6e6765458f12e33f4a2e0781a8d033c7bf6ef839f3fd00742
+
+## The build command
+
+```bash
+export CLOUDFLARE_API_TOKEN=$(python3 -c "import json,os;print(json.load(open(os.path.expanduser('~/.omp/agent/mcp.json')))['mcpServers']['cloudflare']['headers']['Authorization'][7:])")
+npx wrangler deploy --config m1/cloud/wrangler.jsonc --outdir m1/cloud/dist
+```
+
+## Source of record (read these, not the bundle)
+
+- m1/cloud/worker.ts:1 — the route table: POST /e1/run -> DO run; GET
+  /e1/card/:asset/:monday -> sealed R2; GET /e1/pine/:asset/:monday ->
+  composed R2; GET /e1/status/:run_id -> D1 row; unknown -> 404
+  ROUTE_UNKNOWN. Worker-style: no node: imports; bindings wrapped by
+  RealD1/RealR2 at m1/cloud/worker.ts:63 (depsFromEnv always wraps: a
+  raw R2Bucket ducks as a store but streams its body).
+- m1/cloud/worker.ts:51 — mondayValid + assetValid gates: POST bodies
+  refuse E1_IDENTITY_INVALID on bad asset/week shapes.
+- m1/cloud/worker.ts:118 — the status route reads durable D1 directly
+  (the per-request adapters cannot share cache across requests).
+- m1/cloud/do.ts:124 — E1Run extends DurableObject; the dual-shape
+  constructor accepts (ctx, env) at runtime and (d1, r2) shims in the
+  local checks.
+- m1/cloud/do.ts:180 — run(): idempotent COMPLETE short-circuit,
+  runWindow identity, evidence/pillar/organ allSettled waves, named
+  critical-failure BLOCKED rows, derive+validate chain, R2 seals
+  (cards/derived/pine/raw), D1 rows, optional Bend certificate.
+- m1/cloud/sta