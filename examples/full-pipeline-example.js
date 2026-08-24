import {
  getQuestionnaireDefinition,
  generateMoneyProfileReport,
  reportToText,
} from "../src/index.js";

const questionnaire = getQuestionnaireDefinition();
console.log(`Preguntas: ${questionnaire.questions.length}`);

// Replace this array with the 49 values collected in your web form.
const answers = Array(49).fill(3);

const report = generateMoneyProfileReport(answers, {
  autonomyApplicable: true,
  maxPrimary: 3,
  maxSecondary: 2,
});

console.log(JSON.stringify(report, null, 2));
console.log("\n--- Texto corto ---\n");
console.log(reportToText(report));
