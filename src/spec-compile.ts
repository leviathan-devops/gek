// src/spec-compile.ts — authority documents → gate-spec.json (blueprint §5). Every rule carries a
// resolvable anchor; an unanchorable rule is DROPPED and reported (GEK_COMPILE_ANCHORLESS), never kept.
import { readFileSync, writeFileSync } from "node:fs";
import { refuse } from "./tokens.ts";
import { loadManifest, sha256 } from "./config.ts";

export interface Predicate { kind: string; expect?: string; in?: string; allow?: string[]; deny?: string[]; claims?: string[]; requires_oracle_metric?: boolean; anchor: string }
export interface Card { id: string; questions: { q: string; anchor: string }[]; composite: string; thresholds_ref: string }

// The kernel's own authority: the six questions, pinned to the kernel blueprint §6 (line anchors
// measured on design/DESIGN_BLUEPRINT_GEK_V1.md @669b715).
const BP = "design/DESIGN_BLUEPRINT_GEK_V1.md";
export const CARDS: Card[] = [{
  id: "commit-substance-v1",
  questions: [
    // POLARITY LAW: every question reads HIGH = VIOLATION PRESENT, with the jm-measured answer-key
    // phrasing ("Answer 1.0 if yes, 0.0 if no" — src/judge pattern, JevManager push-gate). Q3
    // (workspace) is NOT asked: it is the mechanical root_identity predicate, never a judge matter.
    { q: "Does the completion or verification claim in this commit rest on evidence produced by the same artifact it judges rather than an independent oracle? Answer 1.0 if yes, 0.0 if no.", anchor: `${BP}:262` },
    { q: "Does this diff introduce a numeric constant that is NOT traced to a cited authority line or a measured derivation in the evidence rows? Answer 1.0 if yes, 0.0 if no.", anchor: `${BP}:263` },
    { q: "Does the evidence for each touched subsystem fail to name an observable that exists outside the committer's own session (a harness choreography, a self-authored comparison, or a session-local artifact standing in as proof)? Answer 1.0 if yes, 0.0 if no.", anchor: `${BP}:265` },
    { q: "Does the commit message claim a phase or turn is complete while the turn's named gate token is absent from any tool-result artifact in this commit? Answer 1.0 if yes, 0.0 if no.", anchor: `${BP}:266` },
    { q: "Are enforcement, gate, or authority files changed in this commit WITHOUT a recompile and recalibration record carried in the same commit? Answer 1.0 if yes, 0.0 if no.", anchor: `${BP}:267` },
  ],
  composite: "(own*act + v + max(bullet))/3",
  thresholds_ref: "thresholds.json#commit-substance-v1",
}];

const TOKEN_RE = /\b([A-Z][A-Z0-9]*(?:_[A-Z0-9]+){2,})\b/g;   // ALL_DAY_SNAKE with >= 3 segments

export function compile(dir: string): { gate_spec: string; predicates: number; dropped: string[] } {
  const m = loadManifest(dir);
  const authority_sha: Record<string, string> = {};
  const texts: Record<string, string[]> = {};
  for (const rel of m.authority) {
    const p = `${dir}/${rel}`;
    try { authority_sha[rel] = sha256(p); texts[rel] = readFileSync(p, "utf8").split("\n"); }
    catch { refuse("GEK_AUTHORITY_MISSING", `${rel} unreadable — the pinned law must exist at compile time`); }
  }
  const dropped: string[] = [];
  const predicates: Predicate[] = [];
  const push = (p: Predicate) => { if (!/:(\d+|[A-Za-z0-9_.\/-]+:\d+)$/.test(p.anchor) && !/:\d+$/.test(p.anchor)) { dropped.push(`${p.kind}@${p.anchor}`); return; } predicates.push(p); };

  // GEK.md line anchors for the manifest-level rules (an anchor is a resolvable file:line, always)
  const mdLines = readFileSync(`${dir}/GEK.md`, "utf8").split("\n");
  const lineOf = (needle: string): string => { const i = mdLines.findIndex((l) => l.includes(needle)); return `GEK.md:${i >= 0 ? i + 1 : 1}`; };

  push({ kind: "root_identity", anchor: lineOf("root:") });
  for (const rel of m.authority) push({ kind: "authority_pin", anchor: `${rel}:1` });
  for (const o of m.oracles) push({ kind: "oracle_pin", anchor: lineOf(o.path) });
  push({ kind: "armed", anchor: `${BP}:246` });
  push({ kind: "constant_traced", anchor: `${BP}:239` });
  if (m.evidence.claims.length)
    push({ kind: "evidence_class", claims: m.evidence.claims, requires_oracle_metric: m.evidence.requires_oracle_metric, anchor: lineOf("claims:") });

  // per-phase: explicit tokens, else extract ALL_DAY_SNAKE gate tokens near the phase's turn headings
  for (const ph of m.phases) {
    const anchors: string[] = [];
    for (const rel of m.authority) {
      texts[rel].forEach((line, i) => {
        if (ph.turns.some((t) => line.includes(t))) anchors.push(`${rel}:${i + 1}`);
      });
    }
    if (ph.tokens) for (const t of ph.tokens) {
      const [expect, trigger] = t.split("@");
      push({ kind: "token", expect, in: "message", ...(trigger ? { trigger } : {}), anchor: anchors[0] ?? "GEK.md:phase" } as never);
    }
    else if (anchors.length) {
      // harvest long-snake gate tokens from each turn's SECTION (heading line + the following 60 lines)
      const seen = new Set<string>();
      for (const rel of m.authority) {
        const lines = texts[rel];
        lines.forEach((line, i) => {
          for (const t of ph.turns) {
            if (!line.includes(t)) continue;
            for (let j = i; j < Math.min(i + 60, lines.length); j++) {
              for (const seg of lines[j].slice(0, 200).matchAll(TOKEN_RE)) {
                const tok = seg[1];
                if (seen.has(tok) || tok.length < 10 || /^(GEK|HTTP|UTF|JSON|YAML|TIME|DATE)_/.test(tok)) continue;
                seen.add(tok);
                push({ kind: "token", expect: tok, in: "artifact", turn: t, anchor: `${rel}:${j + 1}` } as never);
              }
            }
          }
        });
      }
    }
    if (ph.allow || ph.deny) push({ kind: "scope", allow: ph.allow ?? ["**"], deny: ph.deny ?? [], anchor: anchors[0] ?? "GEK.md:phase" });
  }

  const spec = { schema: 1, project: m.project, authority_sha, predicates, cards: CARDS,
    oracles: m.oracles.map((o) => ({ path: o.path, metric: o.metric, anchor: "GEK.md:oracle" })) };
  const json = JSON.stringify(spec, null, 2) + "\n";
  writeFileSync(`${dir}/gate-spec.json`, json);
  if (!predicates.length) refuse("GEK_COMPILE_ANCHORLESS", "zero anchored predicates survived — the manifest names no resolvable authority");
  return { gate_spec: json, predicates: predicates.length, dropped };
}
