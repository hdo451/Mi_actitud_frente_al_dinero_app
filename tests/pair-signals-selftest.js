import assert from "node:assert/strict";

import {
  evaluateSurvey,
  PAIR_SIGNALS,
  evaluatePairSignals,
  validatePairSignalCatalog,
} from "../src/index.js";

const catalog = validatePairSignalCatalog();
assert.equal(catalog.ok, true, catalog.errors.join("\n"));
assert.equal(catalog.ruleCount, 63);
assert.equal(catalog.pairCount, 21);

// Construct a profile intended to activate several high-priority vulnerability signals.
// Start neutral then set targeted items.
const answers = Array(49).fill(3);

// Security: S3-ish (high intensity, low regulation)
for (const id of [1,3,5,6,7]) answers[id-1] = 6;
answers[1] = 6; // Q2 reverse => low regulation
answers[3] = 6; // Q4 reverse => low regulation

// Planning: P9-ish
for (const id of [8,9,10,11,12,13,14]) answers[id-1] = 6;

// Spontaneity: E3-ish (high intensity, low regulation)
for (const id of [17,18,19,21]) answers[id-1] = 6;
for (const id of [15,16,20]) answers[id-1] = 6; // reverse regulation => low

// Status: ST3-ish
for (const id of [22,23,24,25,26,27]) answers[id-1] = 6;
answers[27] = 1; // Q28 regulation direct => low

// Giving: G3-ish
for (const id of [29,31,33,34]) answers[id-1] = 6;
answers[29] = 6; // Q30 reverse regulation => low
answers[31] = 1; // Q32 direct regulation => low
answers[34] = 1; // Q35 direct regulation => low

// Avoidance: EV3-ish
for (const id of [36,37,38,39,41]) answers[id-1] = 6;
answers[39] = 1; // Q40 direct regulation => low
answers[41] = 1; // Q42 direct regulation => low

// Autonomy: A7-ish, current autonomy reduced
for (const id of [43,44,45,46,47,48]) answers[id-1] = 6;
answers[48] = 1; // Q49 reduced autonomy

const result = evaluateSurvey(answers);
const layer1 = evaluatePairSignals(result);

assert.ok(layer1.signals.length > 10);
assert.ok(layer1.signals.some((s) => s.id === "SAV01"));
assert.ok(layer1.signals.some((s) => s.id === "EA01"));
assert.ok(layer1.signals.some((s) => s.id === "GA01"));
assert.ok(layer1.signals.some((s) => s.id === "EVA01"));

assert.equal(layer1.centrality.ranking.length, 7);
assert.ok(layer1.centrality.ranking[0].signalCount > 0);

console.log("Pair-signals self-test passed.");
console.log(JSON.stringify({
  catalog,
  primaryProfile: result.primaryProfile,
  matchedSignalCount: layer1.signals.length,
  topSignals: layer1.signals.slice(0, 8).map((s) => s.id),
  centralityRanking: layer1.centrality.ranking.map((x) => ({
    rank: x.rank,
    dimension: x.dimension,
    signalCount: x.signalCount,
    weightedSignalLoad: x.weightedSignalLoad,
  })),
}, null, 2));
