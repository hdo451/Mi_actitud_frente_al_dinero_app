import assert from "node:assert/strict";
import {
  INTERPRETATIONS,
  AUTONOMY_INTERPRETATIONS,
  PAIR_SIGNALS,
  EMERGENT_PATTERNS,
  getDimensionNarrative,
  buildInteractionNarrative,
  validatePatternNarrativeCoverage,
  generateProfessionalReport,
  professionalReportToText,
  professionalReportToHtml,
  validateProfessionalReport,
} from "../src/index.js";

// 1) Every standard base code has deterministic narrative coverage.
for (const [dimension, matrix] of Object.entries(INTERPRETATIONS)) {
  for (let r = 0; r < matrix.length; r += 1) {
    for (let c = 0; c < matrix[r].length; c += 1) {
      const [code, label, summary] = matrix[r][c];
      const level = ["low", "medium", "high"];
      const fake = {
        dimension,
        label: dimension,
        intensity: { raw: 3, display100: 40, level: level[c] },
        regulation: { raw: 3, display100: 40, level: level[r] },
        pattern: { code, label, summary },
      };
      const narrative = getDimensionNarrative(fake, { state: "base", attributionConfidence: "high" });
      assert.ok(narrative.overview.length > 40, `Narrativa incompleta para ${code}`);
      assert.ok(narrative.actions.length >= 1, `Sin acciones para ${code}`);
    }
  }
}

// 2) Every autonomy code has deterministic narrative coverage.
for (const [code, [label, summary]] of Object.entries(AUTONOMY_INTERPRETATIONS)) {
  const fake = {
    dimension: "autonomy",
    label: "Autonomía y poder económico",
    applicable: true,
    pattern: { code, label, summary },
  };
  const narrative = getDimensionNarrative(fake, { state: "base", attributionConfidence: "high" });
  assert.ok(narrative.overview.length > 25, `Narrativa incompleta para ${code}`);
}

// 3) Every pair signal can be rendered without AI.
assert.equal(PAIR_SIGNALS.length, 63);
for (const signal of PAIR_SIGNALS) {
  const narrative = buildInteractionNarrative(signal);
  assert.ok(narrative.title);
  assert.ok(narrative.summary);
  assert.equal(narrative.causalClaimAllowed, false);
}

// 4) Every emergent pattern has narrative coverage.
const patternCoverage = validatePatternNarrativeCoverage();
assert.equal(patternCoverage.ok, true);
assert.equal(patternCoverage.patternCount, EMERGENT_PATTERNS.length);

// 5) Full report generation.
const answers = Array(49).fill(3);
for (const id of [1,3,5,6,7]) answers[id-1] = 6; // security intensity high
answers[1] = 6; answers[3] = 6; // reverse -> regulation low => S3
for (const id of [8,9,10,11,12,13,14]) answers[id-1] = 6; // P9
for (const id of [17,18,19,21,15,16,20]) answers[id-1] = 6; // E3
for (const id of [22,23,24,25,26,27]) answers[id-1] = 6; answers[27] = 1; // ST3
for (const id of [29,31,33,34,30]) answers[id-1] = 6; answers[31] = 1; answers[34] = 1; // G3
for (const id of [36,37,38,39,41]) answers[id-1] = 6; answers[39] = 1; answers[41] = 1; // EV3
for (const id of [43,44,45,46,47,48]) answers[id-1] = 6; answers[48] = 1; // A7, current reduced

const report = generateProfessionalReport(answers, {
  subjectName: "Caso de prueba",
  mode: "professional",
  includeTechnical: true,
});

assert.equal(validateProfessionalReport(report).ok, true);
assert.equal(report.metadata.usesGenerativeAI, false);
assert.equal(report.metadata.generationMethod, "deterministic-rules");
assert.equal(report.dimensions.length, 7);
assert.ok(report.primaryPatterns.length >= 1);
assert.ok(report.recommendations.length >= 1);
assert.ok(report.reflectionQuestions.length >= 1);
assert.ok(report.interactions.length >= 1);
assert.ok(report.technical.pairSignals.length >= 1);

const text = professionalReportToText(report);
const html = professionalReportToHtml(report);
assert.ok(text.includes("Resumen ejecutivo"));
assert.ok(!text.includes("IA generativa: no"));
assert.ok(html.startsWith("<!doctype html>"));
assert.ok(!html.includes("Reporte determinístico"));
assert.ok(html.includes("Hispanic_Wealth.png"));
assert.ok(html.includes("Caso de prueba"));

// 6) Autonomy not applicable should work with null answers 43-49.
const noAutonomy = [...answers];
for (let id = 43; id <= 49; id += 1) noAutonomy[id - 1] = null;
const reportNA = generateProfessionalReport(noAutonomy, { autonomyApplicable: false });
assert.equal(reportNA.dimensions.find((d) => d.dimension === "autonomy").code, "NA");

console.log("Professional deterministic-report self-test passed.");
console.log(JSON.stringify({
  baseCodesCovered: 54 + Object.keys(AUTONOMY_INTERPRETATIONS).length,
  pairSignalsCovered: PAIR_SIGNALS.length,
  emergentPatternsCovered: EMERGENT_PATTERNS.length,
  selectedPrimary: report.primaryPatterns.map((p) => p.id),
  recommendations: report.recommendations.length,
  reflections: report.reflectionQuestions.length,
}, null, 2));
