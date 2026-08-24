// Public API - Money Profile Engine v0.4 complete prototype

export {
  INSTRUMENT_VERSION,
  SCALE_MIN,
  SCALE_MAX,
  RESPONSE_SCALE,
  QUESTIONS,
  DIMENSION_LABELS,
  STANDARD_DIMENSIONS,
  INTERPRETATIONS,
  AUTONOMY_INTERPRETATIONS,
  level3,
  validateAnswers,
  evaluateSurvey,
  buildStoredAssessment,
  getQuestionnaireDefinition,
  runSelfTest,
} from "./core.js";

export {
  PAIR_SIGNAL_VERSION,
  PAIR_SIGNAL_TYPES,
  PAIR_SIGNAL_STRENGTH,
  PAIR_SIGNALS,
  evaluatePairSignals,
  validatePairSignalCatalog,
} from "./pair-signals.js";

export {
  EMERGENT_PATTERN_VERSION,
  PATTERN_POLARITIES,
  EMERGENT_PATTERNS,
  evaluateEmergentPatterns,
  validateEmergentPatternCatalog,
} from "./emergent-patterns.js";

export {
  CONTEXT_OVERRIDE_VERSION,
  CONTEXT_OVERRIDE_RULES,
  applyContextOverrides,
  validateContextOverrideCatalog,
} from "./context-overrides.js";

export {
  NARRATIVE_RESOLVER_VERSION,
  resolveNarrative,
} from "./narrative-resolver.js";

export {
  ANALYSIS_ENGINE_VERSION,
  analyzeMoneyProfile,
} from "./analysis.js";

export {
  CORRELATION_VERSION,
  CORRELATION_RULES,
  evaluateCorrelations,
  contextualDimensionSummary,
} from "./correlations.js";

export {
  REPORT_VERSION,
  generateMoneyProfileReport,
  reportToText,
  generateQuickReport,
  generateQuickReportV2,
  quickReportToText,
  quickReportV2ToText,
} from "./report.js";
