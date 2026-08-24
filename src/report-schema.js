export const PROFESSIONAL_REPORT_VERSION = "0.5.0-prototype";

export const REPORT_MODES = Object.freeze({
  quick: { maxPrimary: 2, maxSecondary: 1, maxInteractions: 4, maxRecommendations: 5, maxReflections: 4 },
  professional: { maxPrimary: 3, maxSecondary: 2, maxInteractions: 8, maxRecommendations: 8, maxReflections: 7 },
});

export const REPORT_SECTION_ORDER = Object.freeze([
  "executiveSummary",
  "profileOverview",
  "keyPatterns",
  "protectiveResources",
  "tensionsAndContext",
  "dimensions",
  "interactions",
  "recommendations",
  "reflections",
  "methodology",
]);

export function normalizeProfessionalReportOptions(options = {}) {
  const mode = options.mode && REPORT_MODES[options.mode] ? options.mode : "professional";
  const defaults = REPORT_MODES[mode];

  return {
    mode,
    subjectName: typeof options.subjectName === "string" && options.subjectName.trim() ? options.subjectName.trim() : null,
    autonomyApplicable: options.autonomyApplicable !== false,
    maxPrimary: Number.isInteger(options.maxPrimary) ? Math.max(1, Math.min(5, options.maxPrimary)) : defaults.maxPrimary,
    maxSecondary: Number.isInteger(options.maxSecondary) ? Math.max(0, Math.min(5, options.maxSecondary)) : defaults.maxSecondary,
    maxInteractions: Number.isInteger(options.maxInteractions) ? Math.max(0, Math.min(12, options.maxInteractions)) : defaults.maxInteractions,
    maxRecommendations: Number.isInteger(options.maxRecommendations) ? Math.max(1, Math.min(12, options.maxRecommendations)) : defaults.maxRecommendations,
    maxReflections: Number.isInteger(options.maxReflections) ? Math.max(1, Math.min(10, options.maxReflections)) : defaults.maxReflections,
    includeTechnical: options.includeTechnical === true,
  };
}

export function validateProfessionalReport(report) {
  const errors = [];
  if (!report || typeof report !== "object") errors.push("El reporte debe ser un objeto.");
  if (!report?.metadata?.reportVersion) errors.push("Falta metadata.reportVersion.");
  if (!Array.isArray(report?.dimensions) || report.dimensions.length !== 7) errors.push("El reporte debe contener 7 dimensiones.");
  if (!Array.isArray(report?.keyPatterns)) errors.push("Falta keyPatterns.");
  if (!Array.isArray(report?.recommendations)) errors.push("Falta recommendations.");
  if (!Array.isArray(report?.reflectionQuestions)) errors.push("Falta reflectionQuestions.");
  return { ok: errors.length === 0, errors };
}
