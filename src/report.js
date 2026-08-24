import { analyzeMoneyProfile } from "./analysis.js";

export const REPORT_VERSION = "0.4.0-prototype";

function summarizeDimension(dimension, context) {
  if (dimension.dimension === "autonomy") {
    if (dimension.applicable === false) {
      return {
        dimension: "autonomy",
        label: dimension.label,
        applicable: false,
        baseCode: "NA",
        pattern: dimension.pattern.label,
        summary: dimension.pattern.summary,
        context,
      };
    }
    return {
      dimension: "autonomy",
      label: dimension.label,
      applicable: true,
      baseCode: dimension.pattern.code,
      pattern: dimension.pattern.label,
      summary: dimension.pattern.summary,
      controlIntensity: dimension.controlIntensity,
      breadth: dimension.breadth,
      currentAutonomy: dimension.currentAutonomy,
      context,
    };
  }

  return {
    dimension: dimension.dimension,
    label: dimension.label,
    baseCode: dimension.pattern.code,
    pattern: dimension.pattern.label,
    summary: dimension.pattern.summary,
    intensity: dimension.intensity,
    regulation: dimension.regulation,
    context,
  };
}

export function generateMoneyProfileReport(rawAnswers, options = {}) {
  const analysis = analyzeMoneyProfile(rawAnswers, options);
  const { base, pairSignals, emergentPatterns, context, narrative } = analysis;

  const dimensions = Object.entries(base.dimensions).map(([key, dimension]) =>
    summarizeDimension(dimension, context.dimensionContexts[key])
  );

  return {
    instrumentVersion: base.instrumentVersion,
    reportVersion: REPORT_VERSION,
    analysisVersion: analysis.analysisVersion,
    generatedAt: base.generatedAt,
    primaryProfile: base.primaryProfile,
    contextualProfile: Object.fromEntries(
      Object.entries(context.dimensionContexts).map(([key, value]) => [key, {
        baseCode: value.baseCode,
        contextualState: value.state,
        attributionConfidence: value.attributionConfidence,
      }])
    ),
    dimensions,
    correlations: pairSignals.signals,
    totalCorrelationMatches: pairSignals.signals.length,
    executiveSummary: narrative.executiveSummary,
    primaryInsights: narrative.primaryInsights,
    secondaryInsights: narrative.secondaryInsights,
    centralDimensions: narrative.centralDimensions,
    technical: {
      matchedPairSignals: pairSignals.signals,
      pairSignalCentrality: pairSignals.centrality,
      emergentPatterns: emergentPatterns.patterns,
      activeOverrides: context.activeOverrides,
      diagnostics: narrative.diagnostics,
    },
    notices: [
      base.interpretationNotice,
      pairSignals.scientificStatus,
      emergentPatterns.notice,
      context.notice,
      narrative.notice,
      "Los resultados base nunca se modifican por las interacciones entre dimensiones.",
      "Las interacciones y patrones son hipótesis teóricas predefinidas hasta que sean calibradas con datos de pilotaje.",
      "El módulo de autonomía y poder económico describe experiencias o contexto reportado; no es una dimensión de personalidad ni un diagnóstico.",
    ],
  };
}

export function reportToText(report) {
  const lines = ["Perfil psicológico-financiero", "", report.executiveSummary, ""];

  if (report.primaryInsights?.length) {
    lines.push("Ideas principales");
    for (const insight of report.primaryInsights) {
      lines.push(`- ${insight.label}: ${insight.summary}`);
    }
    lines.push("");
  }

  if (report.secondaryInsights?.length) {
    lines.push("Factores complementarios");
    for (const insight of report.secondaryInsights) {
      lines.push(`- ${insight.label}: ${insight.summary}`);
    }
    lines.push("");
  }

  lines.push("Dimensiones base");
  for (const d of report.dimensions) {
    lines.push(`- ${d.label}: ${d.baseCode} — ${d.pattern}`);
  }

  return lines.join("\n");
}

// Backwards-compatible names used in previous versions.
export const generateQuickReport = generateMoneyProfileReport;
export const generateQuickReportV2 = generateMoneyProfileReport;
export const quickReportToText = reportToText;
export const quickReportV2ToText = reportToText;
