import assert from "node:assert/strict";
import {
  evaluateSurvey,
  evaluatePairSignals,
  evaluateEmergentPatterns,
  applyContextOverrides,
  resolveNarrative,
  analyzeMoneyProfile,
  generateMoneyProfileReport,
  validatePairSignalCatalog,
  validateEmergentPatternCatalog,
  validateContextOverrideCatalog,
} from "../src/index.js";

assert.equal(validatePairSignalCatalog().ok, true);
assert.equal(validateEmergentPatternCatalog().ok, true);
assert.equal(validateContextOverrideCatalog().ok, true);

const answers = Array(49).fill(3);

// S3
for (const id of [1,3,5,6,7]) answers[id-1] = 6;
answers[1] = 6; answers[3] = 6;
// P9
for (const id of [8,9,10,11,12,13,14]) answers[id-1] = 6;
// E3
for (const id of [17,18,19,21,15,16,20]) answers[id-1] = 6;
// ST3
for (const id of [22,23,24,25,26,27]) answers[id-1] = 6;
answers[27] = 1;
// G3
for (const id of [29,31,33,34,30]) answers[id-1] = 6;
answers[31] = 1; answers[34] = 1;
// EV3
for (const id of [36,37,38,39,41]) answers[id-1] = 6;
answers[39] = 1; answers[41] = 1;
// A7 + reduced autonomy
for (const id of [43,44,45,46,47,48]) answers[id-1] = 6;
answers[48] = 1;

const base = evaluateSurvey(answers);
const pairs = evaluatePairSignals(base);
const patterns = evaluateEmergentPatterns(base, pairs);
const context = applyContextOverrides(base, pairs, patterns);
const narrative = resolveNarrative(base, pairs, context);
const analysis = analyzeMoneyProfile(answers);
const report = generateMoneyProfileReport(answers);

assert.equal(Object.keys(base.dimensions).length, 7);
assert.ok(pairs.signals.length >= 10);
assert.ok(patterns.patterns.length >= 5);
assert.ok(context.activeOverrides.length >= 1);
assert.ok(narrative.primaryInsights.length >= 1 && narrative.primaryInsights.length <= 3);
assert.ok(narrative.secondaryInsights.length <= 2);
assert.equal(analysis.base.primaryProfile.security, base.primaryProfile.security);
assert.equal(report.primaryProfile.security, base.primaryProfile.security);
assert.ok(report.executiveSummary.length > 20);
assert.ok(report.notices.length >= 5);

// Base score must survive every layer unchanged.
assert.equal(report.dimensions.find((d) => d.dimension === "security").baseCode, "S3");

console.log("Full-pipeline self-test passed.");
console.log(JSON.stringify({
  primaryProfile: report.primaryProfile,
  pairSignals: pairs.signals.length,
  emergentPatterns: patterns.patterns.map((p) => p.id),
  activeOverrides: context.activeOverrides.map((o) => o.id),
  primaryInsights: narrative.primaryInsights.map((p) => p.id),
  secondaryInsights: narrative.secondaryInsights.map((p) => p.id),
  centralDimensions: narrative.centralDimensions.map((d) => d.dimension),
}, null, 2));
