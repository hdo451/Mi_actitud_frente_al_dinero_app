import assert from 'node:assert/strict';
import {
  getQuestionnaireDefinition, evaluateSurvey, validateAnswers,
  buildStoredAssessment, generateProfessionalReport,
  professionalReportToHtml, professionalReportToText,
} from '../money-profile-engine.js';

const options = {responseScale: 'three-choice'};
const definition = getQuestionnaireDefinition(options);
assert.deepEqual(Object.values(definition.responseScale), [
  'Si, ese soy yo', 'No, Yo no haría eso', 'A veces si, a veces no.',
]);
assert.notEqual(definition.version, getQuestionnaireDefinition().version);

// The displayed order must never be mistaken for the scoring order.
for (const [choice, expected, reversed] of [[1, 100, 0], [2, 0, 100], [3, 50, 50]]) {
  const answers = Array(49).fill(choice);
  const base = evaluateSurvey(answers, options);
  assert.equal(base.dimensions.security.intensity.display100, expected);
  assert.equal(base.dimensions.security.regulation.display100, reversed);
  assert.equal(base.dimensions.planning.regulation.display100, expected);
  assert.equal(base.dimensions.autonomy.currentAutonomy.display100, expected);
  assert.equal(base.dimensions.autonomy.breadth.countReported, choice === 2 ? 0 : 6);
  const report = generateProfessionalReport(answers, options);
  assert.equal(report.metadata.responseScale, 'three-choice');
  assert.equal(report.metadata.instrumentVersion, definition.version);
  assert.deepEqual(report.profileOverview.primaryProfile, base.primaryProfile);
  assert.match(professionalReportToHtml(report), /menos detalle/);
  assert.match(professionalReportToText(report), /menos detalle/);
  assert.doesNotMatch(professionalReportToHtml(report), /3\.50 \/ 6/);
  const record = buildStoredAssessment({assessmentId: 'three-test', answers, ...options});
  assert.equal(record.answers[1], choice);
  assert.equal(record.responseScale, 'three-choice');
  assert.deepEqual(record.result.primaryProfile, base.primaryProfile);
}

// Equal numbers of Yes and No produce the same midpoint as Sometimes,
// including reverse-scored regulation items.
const mixed = Array(49).fill(3);
mixed[0] = 1; mixed[2] = 2;
mixed[1] = 1; mixed[3] = 2;
const mixedBase = evaluateSurvey(mixed, options);
assert.equal(mixedBase.dimensions.security.intensity.display100, 50);
assert.equal(mixedBase.dimensions.security.regulation.display100, 50);

for (const invalid of [0, 4, 6, 3.5, '1', null, undefined]) {
  const answers = Array(49).fill(3); answers[0] = invalid;
  assert.throws(() => validateAnswers(answers, options), /tres opciones/);
}
assert.throws(() => evaluateSurvey(Array(49).fill(3), {responseScale: 'unknown'}), /Escala desconocida/);
const omitted = Array(49).fill(3).fill(null, 42);
const reportNA = generateProfessionalReport(omitted, {...options, autonomyApplicable: false});
assert.equal(reportNA.profileOverview.primaryProfile.autonomy, 'NA');
assert.throws(() => generateProfessionalReport(omitted, options), /tres opciones/);

// Preserve the legacy scoring for existing stored assessments and API consumers.
assert.equal(evaluateSurvey(Array(49).fill(3)).dimensions.security.intensity.display100, 40);
console.log('Three-choice tests passed: order, scoring, inversions, reports, storage, validation and legacy compatibility.');
