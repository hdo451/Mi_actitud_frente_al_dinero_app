import {
  getQuestionnaireDefinition,
  generateQuickReportV2,
  quickReportV2ToText,
  buildStoredAssessment,
} from "../src/index.js";

const questionnaire = getQuestionnaireDefinition();
console.log(`Preguntas disponibles: ${questionnaire.questions.length}`);

// Demo only: production answers come from the web form.
const answers = Array.from({ length: 49 }, (_, i) => (i % 6) + 1);

const report = generateQuickReportV2(answers, {
  autonomyApplicable: true,
  maxResults: 12,
  maxComplexity: 3,
});

console.log("\nPerfil primario:");
console.log(report.primaryProfile);

console.log("\nPerfil contextual:");
console.log(report.contextualProfile);

console.log("\nInterpretación rápida:\n");
console.log(quickReportV2ToText(report));

const record = buildStoredAssessment({
  assessmentId: "demo-001",
  respondentId: "anonymous-demo",
  answers,
  autonomyApplicable: true,
  metadata: {
    source: "example.js",
    correlationVersion: report.correlationVersion,
    reportVersion: report.reportVersion,
  },
});

console.log("\nRegistro listo para base de datos:");
console.log(JSON.stringify(record, null, 2));
