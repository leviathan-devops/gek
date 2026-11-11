// src/config.ts — GEK.md manifest + GEK.lock (blueprint §4). All shapes exact per the blueprint.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { refuse } from "./tokens.ts";

export const sha256 = (p: string): string => createHash("sha256").update(readFileSync(p)).digest("hex");

export interface Manifest {
  project: string; root: string; remote?: string;
  authority: string[]; oracles: { path: string; metric: string }[];
  evidence: { claims: string[]; requires_oracle_metric: boolean };
  phases: { id: string; turns: string[]; tokens?: string[]; allow?: string[]; deny?: string[] }[];
}

export function loadManifest(dir: string): Manifest {
  const p = `${dir}/GEK.md`;
  if (!existsSync(p)) refuse("GEK_SPEC_MISSING", `${p} absent — write the manifest (job: gek; authority paths; oracle paths; phases)`);
  const text = readFileSync(p, "utf8");
  if (!/^job: gek$/m.test(text)) refuse("GEK_SPEC_MISSING", `${p} first declaration must be 'job: gek'`);
  const grab = (re: RegExp): string[] => [...text.matchAll(re)].map((m) => m[1].trim());
  const m: Manifest = {
    project: /project:\s*(.+)/.exec(text)?.[1]?.trim() ?? refuse("GEK_SPEC_MISSING", "project: missing"),
    root: /root:\s*(.+)/.exec(text)?.[1]?.trim() ?? refuse("GEK_SPEC_MISSING", "root: missing"),
    remote: /remote:\s*(.+)/.exec(text)?.[1]?.trim(),
    authority: grab(/^\s*-\s*(design\/[^\s#]+\.md)\s*$/gm),
    oracles: [...text.matchAll(/^\s*-\s*path:\s*(\S+).*metric:\s*(\S+)/gm)].map((x) => ({ path: x[1], metric: x[2] })),
    evidence: {
      claims: [...text.matchAll(/claims:\s*\[([^\]]*)\]/gm)].flatMap((x) => x[1].split(",").map((s) => s.trim()).filter(Boolean)),
      requires_oracle_metric: /requires_oracle_metric:\s*true/.test(text),
    },
    phases: [...text.matchAll(/## phase (\S+)[\s\S]*?(?=## phase |\s*$)/g)].map(() => ({} as never)), // replaced below
  };
  // phases: '## phase P5 | turns: P5.TURN-01, P5.TURN-02 | tokens: [PV-Gate: checkpoint] | allow: m1/**, design/** | deny: archive/**'
  m.phases = [...text.matchAll(/^## phase (\S+)(.*)$/gm)].map((x) => {
    const rest = x[2];
    const nums = (key: string): string[] => {
      const v = new RegExp(`${key}:\\s*([^|]*)`).exec(rest)?.[1] ?? "";
      return v.split(",").map((s) => s.trim()).filter(Boolean);
    };
    const toks = /tokens:\s*\[([^\]]*)\]/.exec(rest)?.[1]?.split(",").map((s) => s.trim()).filter(Boolean);
    return { id: x[1], turns: nums("turns"), tokens: toks, allow: nums("allow") || undefined, deny: nums("deny") || undefined };
  });
  if (!m.phases.length) refuse("GEK_SPEC_MISSING", "no '## phase <id> | turns: …' sections in GEK.md");
  return m;
}

export interface Lock { schema: number; project: string; root: string; remote?: string; authority: Record<string, string>; oracles: Record<string, string>; gate_spec: string; thresholds?: string; armed: boolean; server_checks: string[] }
export function loadLock(dir: string): Lock | null {
  const p = `${dir}/GEK.lock`;
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8")) as Lock;
}
export function writeLock(dir: string, lock: Lock): void { writeFileSync(`${dir}/GEK.lock`, JSON.stringify(lock, null, 2) + "\n"); }
