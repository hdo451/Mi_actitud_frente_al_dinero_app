import fs from "node:fs";
import {
  generateProfessionalReport,
  professionalReportToText,
  professionalReportToHtml,
} from "../src/index.js";

// Sustituye estos valores por las 49 respuestas de tu formulario.
const answers = Array(49).fill(3);

const report = generateProfessionalReport(answers, {
  subjectName: "Ejemplo",
  autonomyApplicable: true,
  mode: "professional",
  includeTechnical: false,
});

console.log(JSON.stringify(report, null, 2));
console.log("\n--- TEXTO ---\n");
console.log(professionalReportToText(report));

fs.writeFileSync("professional-report-example.html", professionalReportToHtml(report), "utf8");
console.log("\nSe creó professional-report-example.html");
