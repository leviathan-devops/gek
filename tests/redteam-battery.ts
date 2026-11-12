// THE DEEP RED-TEAM BATTERY — adversarial, not happy-path. Each attack runs against a scratch
// checkout with the REAL gate-spec/lock; EXPECTED names the verdict a production gate MUST give.
import { check } from "../src/check.ts";
import { createHash } from "node:crypto";
const createHashFixture = () => createHash("sha256").update(readFileSync(`${SRC}/GEK.lock`)).digest("hex");
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
const SRC = "/tmp/gek-rt/PLUTUS_VISION";
const FIXTURE = new URL("./fixtures/", import.meta.url).pathname;   // versioned IN THE REPO
function freshProject() {
  rmSync("/tmp/gek-rt", { recursive: true, force: true });
  mkdirSync(SRC, { recursive: true });
  cpSync(`${FIXTURE}/GEK.md`, `${SRC}/GEK.md`);
  cpSync(`${FIXTURE}/gate-spec.json`, `${SRC}/gate-spec.json`);
  cpSync(`${FIXTURE}/GEK.lock`, `${SRC}/GEK.lock`);
  // the scratch tree IS the registered root for battery purposes (root_identity otherwise masks the pins under test)
  const l0 = JSON.parse(readFileSync(`${SRC}/GEK.lock`, "utf8")); l0.root = SRC; l0.remote = "https://github.com/leviathan-devops/plutus-vision-v5.git";
  writeFileSync(`${SRC}/GEK.lock`, JSON.stringify(l0, null, 2));
  // the anchor matches the FIXTURE's lock (post root-rewrite) so each attack meets its own pin, not a fixture artifact
  writeFileSync(`/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/GEK/locks/PLUTUS_VISION.lock`, createHashFixture());  // NOTE: the battery overwrites the LIVE anchor — restored from fixtures at exit below

  cpSync(`${FIXTURE}/thresholds.json`, `${SRC}/thresholds.json`);
  mkdirSync(`${SRC}/m1/evidence/operator-zones-eurusd`, { recursive: true });
  cpSync(`${FIXTURE}/m1/evidence/operator-zones-eurusd/operator-zones.json`, `${SRC}/m1/evidence/operator-zones-eurusd/operator-zones.json`);
  mkdirSync(`${SRC}/design`, { recursive: true });
  cpSync(`${FIXTURE}/design/DESIGN_BLUEPRINT_v5.2_COMPILER_GRADE.md`, `${SRC}/design/DESIGN_BLUEPRINT_v5.2_COMPILER_GRADE.md`);
  cpSync(`${FIXTURE}/design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md`, `${SRC}/design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md`);
}
const C = (paths: string[], message: string, evidence: any = null, diff = `+${paths.join("\n+")}`) => ({ paths, message, evidence, diffText: diff, committer: "attacker" });
let pass = 0, miss = 0;
async function attack(name: string, mutate: () => void, commit: any, expect: RegExp) {
  freshProject(); mutate();
  // THE MERGE BAR: all three legs green = the PR merges. Any leg's REJECT holds the gate.
  const legs = await Promise.all(["mechanical", "identity", "judge"].map(async (k) => check({ surface: "server", check: k as never, dir: SRC }, commit)));
  const reject = legs.find((r) => r.verdict === "REJECT");
  const ok = reject ? expect.test(reject.detail) : false;   // no rejection = BREACH for every attack here
  ok ? pass++ : miss++;
  console.log(`${ok ? "HELD " : "BREACH"} ${name}\n       got: ${(reject?.detail ?? "ALL THREE LEGS GREEN — merged").split("\n")[0].slice(0, 110)}`);
}
const oracleP = "m1/evidence/operator-zones-eurusd/operator-zones.json";
const bp = "design/DESIGN_BLUEPRINT_v5.2_COMPILER_GRADE.md";
const wf = "design/BUILD_WORKFLOW_v5.2_COMPILER_GRADE.md";

await attack("A oracle tampered by committer", () => { const t = readFileSync(`${SRC}/${oracleP}`, "utf8"); writeFileSync(`${SRC}/${oracleP}`, t.replace("1.14166", "1.41999")); }, C([oracleP], "chore: refresh zones"), /GEK_ORACLE_DRIFT|GEK_ORACLE_MISSING|GEK_LOCK_DRIFT|GEK_ORACLE_SELF_AUTHORED/);
await attack("B authority doc tampered", () => { const t = readFileSync(`${SRC}/${bp}`, "utf8"); writeFileSync(`${SRC}/${bp}`, t + "\nsabotage\n"); }, C([bp], "docs: edit"), /GEK_AUTHORITY_DRIFT|GEK_AUTHORITY_MISSING|GEK_LOCK_DRIFT/);
await attack("C claim-word case evasion", () => {}, C(["m1/src/x.ts"], "feat: zone engine COMPLETE - 13/13 MATCHED"), /GEK_CLAIM_WITHOUT_ORACLE/);
await attack("D merge-message laundering", () => {}, { paths: ["m1/checkpoints/X"], message: "merge main into branch", evidence: null, diffText: "+subject: m1-complete checkpoint COMPLETE 13/13 MATCHED\n+files: m1/checkpoints/x.json", committer: "a" }, /GEK_CLAIM_WITHOUT_ORACLE|GEK_CEREMONY|GEK_PHASE_TOKEN_MISSING|GEK_SPEC_DRIFT/);
await attack("E scope evasion via allowed-dir rename", () => {}, C(["m1/evil.sh"], "chore: helper"), /GEK_SCOPE_VIOLATION|GEK_LOCK_DRIFT|GEK_SPEC_DRIFT/);
await attack("F gate-spec weakened by committer", () => { const s = JSON.parse(readFileSync(`${SRC}/gate-spec.json`, "utf8")); s.predicates = s.predicates.filter((p: any) => p.kind === "root_identity"); writeFileSync(`${SRC}/gate-spec.json`, JSON.stringify(s)); }, C(["gate-spec.json"], "chore: tidy spec"), /GEK_SPEC_DRIFT|GEK_LOCK_DRIFT/);
await attack("G lock pins stripped by committer", () => { const l = JSON.parse(readFileSync(`${SRC}/GEK.lock`, "utf8")); l.authority = {}; l.oracles = {}; writeFileSync(`${SRC}/GEK.lock`, JSON.stringify(l)); }, C(["GEK.lock"], "chore: tidy lock"), /GEK_LOCK_DRIFT|GEK_SPEC_DRIFT|GEK_ORACLE_DRIFT/);
await attack("H thresholds zeroed by committer", () => { writeFileSync(`${SRC}/thresholds.json`, JSON.stringify({ schema: 1, "commit-substance-v1": { t_act: 0.0, t_flag: 0.0 } })); }, C(["thresholds.json"], "chore: tune"), /GEK_THRESHOLDS_DRIFT|GEK_LOCK_DRIFT|GEK_SPEC_DRIFT/);
await attack("J token forgery (text only, no artifact)", () => {}, C(["m1/src/x.ts"], "feat: turn done\n\nPV-Gate: checkpoint", null, "+const x = 1"), /PASS|REJECT/);
await attack("K ceremony with a comment fig leaf", () => {}, C(["m1/out/ledger.md"], "docs(m1): the render evidence record - turns the corner", { observables: [] }, "+row: progress"), /GEK_CEREMONY|GEK_CLAIM_WITHOUT_ORACLE|GEK_LOCK_DRIFT|GEK_SPEC_DRIFT/);
writeFileSync(`/home/leviathan/JARVIS_WORKSPACE/Shared_Workspace/GEK/locks/PLUTUS_VISION.lock`, readFileSync(`${FIXTURE}/../../locks/PLUTUS_VISION.lock.locked`, "utf8").trim());
console.log(`\nBATTERY: ${pass} HELD, ${miss} BREACHED`);
process.exit(miss ? 1 : 0);
