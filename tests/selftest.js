import assert from "node:assert/strict";
import {
  QUESTIONS,
  evaluateSurvey,
  evaluateCorrelations,
  generateQuickReport,
  generateQuickReportV2,
  runSelfTest,
  validateAnswers,
} from "../src/index.js";

assert.equal(QUESTIONS.length, 49, "Debe haber exactamente 49 preguntas.");

const allThrees = Array(49).fill(3);
assert.equal(validateAnswers(allThrees), true);

const primary = evaluateSurvey(allThrees);
assert.equal(Object.keys(primary.dimensions).length, 7, "Deben existir 7 dimensiones.");
assert.equal(Object.keys(primary.primaryProfile).length, 7, "El perfil debe contener 7 códigos.");

const correlationAnalysis = evaluateCorrelations(primary, { rawAnswers: allThrees });
assert.ok(correlationAnalysis.dimensionContexts.security, "Debe existir contexto de security.");

const reportV2 = generateQuickReportV2(allThrees);
assert.equal(reportV2.dimensions.length, 7);
assert.ok(Array.isArray(reportV2.correlations));
assert.ok(reportV2.contextualProfile.security);

// Backwards-compatible alias should return the same report version.
const reportAlias = generateQuickReport(allThrees);
assert.equal(reportAlias.reportVersion, reportV2.reportVersion);
assert.deepEqual(reportAlias.primaryProfile, reportV2.primaryProfile);

const nonApplicable = [...allThrees];
for (let i = 42; i < 49; i += 1) nonApplicable[i] = null;
const na = evaluateSurvey(nonApplicable, { autonomyApplicable: false });
assert.equal(na.primaryProfile.autonomy, "NA");

// High-control context should be detected without changing other base scoring logic.
const highControl = Array(49).fill(3);
for (const id of [43, 44, 45, 46, 47, 48]) highControl[id - 1] = 6;
highControl[48] = 2; // Q49
const highControlReport = generateQuickReportV2(highControl);
assert.equal(highControlReport.primaryProfile.autonomy, "A7");

assert.equal(runSelfTest().ok, true);

console.log("✓ Todos los self-tests v0.2 pasaron.");
console.log("Perfil de prueba:", primary.primaryProfile);
console.log("Correlaciones activadas:", reportV2.correlations.map((r) => r.id));
