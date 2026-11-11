// src/judge.ts — the :8090 System One client (blueprint §5). One batched request per card,
// fail-closed named refusals, raw answers retained on unparseable. Wire ported from
// JevManager/src/judge/{transport,client}.ts (MIT, same author): {state, model, questions}.
import { mkdirSync, writeFileSync } from "node:fs";
import { refuse } from "./tokens.ts";

const ENDPOINT = process.env.GEK_JUDGE_URL ?? "http://127.0.0.1:8090/v1/systemone";
const MODEL = process.env.GEK_JUDGE_MODEL ?? "imajev-4b";
const KEY = process.env.GEK_JUDGE_KEY ?? "local";   // the host-local judge takes the loopback bearer
const OUT_CAP = 262_144;

export interface JudgeVerdict { ps: Record<string, number>; latency_ms: number; requests: number }

export async function askJudge(state: string, questions: Record<string, { type: "noul"; instructions: string }>, timeoutMs = 30_000): Promise<JudgeVerdict> {
  const body = JSON.stringify({ state, model: MODEL, questions });
  if (body.length > OUT_CAP) refuse("GEK_CARD_OVERSIZE", `judge payload ${body.length} > ${OUT_CAP}`);
  const t0 = Date.now();
  let resp: Response;
  try {
    resp = await fetch(ENDPOINT, { method: "POST", headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" }, body, signal: AbortSignal.timeout(timeoutMs) });
  } catch (e) {
    refuse("GEK_JUDGE_DOWN", `${ENDPOINT} unreachable (${(e as Error).name}) — resume: bring the judge up (health at :8090/health), then re-run; never a pass`);
  }
  if (!resp.ok) refuse("GEK_JUDGE_DOWN", `${ENDPOINT} answered HTTP ${resp.status}`);
  let data: { answers?: Record<string, { noul?: number; type?: string }> };
  try { data = await resp.json(); } catch { refuse("GEK_JUDGE_UNPARSEABLE", `non-JSON judge answer (HTTP ${resp.status})`); }
  const ps: Record<string, number> = {};
  for (const [k, q] of Object.entries(questions)) {
    const a = data.answers?.[k];
    if (!a || typeof a.noul !== "number" || !Number.isFinite(a.noul)) {
      const raw = JSON.stringify(data).slice(0, 4000);
      const dir = process.env.XDG_STATE_HOME ?? `${process.env.HOME}/.local/state`;
      mkdirSync(`${dir}/gek/raw`, { recursive: true });
      const p = `${dir}/gek/raw/${Date.now()}.json`;
      writeFileSync(p, JSON.stringify(data, null, 1));
      refuse("GEK_JUDGE_UNPARSEABLE", `answer for '${k}' missing/non-finite (kept at ${p}); question was: ${q.instructions.slice(0, 120)}`);
    }
    ps[k] = a.noul;
  }
  return { ps, latency_ms: Date.now() - t0, requests: 1 };
}
