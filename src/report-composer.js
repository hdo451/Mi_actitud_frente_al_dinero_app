import { analyzeMoneyProfile } from "./analysis.js";
import { getDimensionNarrative } from "./dimension-narratives.js";
import { getPatternNarrative } from "./pattern-narratives.js";
import { selectInteractionNarratives } from "./interaction-narratives.js";
import { buildRecommendations } from "./recommendation-library.js";
import { buildReflectionQuestions } from "./reflection-library.js";
import { PROFESSIONAL_REPORT_VERSION, normalizeProfessionalReportOptions } from "./report-schema.js";

export const REPORT_COMPOSER_VERSION = "0.5.0-prototype";

const DIMENSION_ORDER = ["security", "planning", "spontaneity", "status", "giving", "avoidance", "autonomy"];

function enrichPattern(pattern) {
  const narrative = getPatternNarrative(pattern);
  return {
    id: pattern.id,
    title: narrative.title,
    heading: narrative.heading,
    polarity: pattern.polarity,
    severity: pattern.severity,
    cluster: pattern.cluster,
    confidence: pattern.confidence,
    status: pattern.status ?? "active",
    score: pattern.resolverScore ?? pattern.adjustedNarrativeWeight ?? pattern.narrativeWeight ?? null,
    dimensions: [...(pattern.centralDimensions ?? [])],
    summary: narrative.summary,
    interpretation: narrative.interpretation,
    framing: narrative.framing,
    actions: [...narrative.actions],
    reflection: narrative.reflection,
    overrideNotes: [...(pattern.overrideNotes ?? [])],
  };
}

function buildDimensionEntry(dimension, context) {
  const narrative = getDimensionNarrative(dimension, context);
  const base = {
    dimension: dimension.dimension,
    label: dimension.label,
    code: dimension.pattern.code,
    pattern: dimension.pattern.label,
    baseSummary: dimension.pattern.summary,
    narrative,
    contextualState: context?.state ?? "base",
    attributionConfidence: context?.attributionConfidence ?? "high",
    contextualModifiers: {
      amplifiedBy: [...(context?.amplifiedBy ?? [])],
      bufferedBy: [...(context?.bufferedBy ?? [])],
      contextualizedBy: [...(context?.contextualizedBy ?? [])],
      tensionsWith: [...(context?.tensionsWith ?? [])],
      reinforcedBy: [...(context?.reinforcedBy ?? [])],
      overrides: [...(context?.overrides ?? [])],
    },
  };

  if (dimension.dimension === "autonomy") {
    return {
      ...base,
      applicable: dimension.applicable !== false,
      controlIntensity: dimension.controlIntensity ?? null,
      breadth: dimension.breadth ?? null,
      currentAutonomy: dimension.currentAutonomy ?? null,
    };
  }

  return {
    ...base,
    intensity: dimension.intensity,
    regulation: dimension.regulation,
  };
}

function buildExecutiveSummary({ subjectName, primaryPatterns, protectivePatterns, centralDimensions, contextOverrides }) {
  const subject = subjectName ? `${subjectName}, ` : "";
  if (!primaryPatterns.length) {
    const central = centralDimensions.length
      ? ` Las dimensiones con mayor centralidad interna son ${centralDimensions.map((d) => d.label).join(", ")}.`
      : "";
    return `${subject}el perfil no activa patrones integrados de alta prioridad con las reglas actuales. La interpretación debe apoyarse principalmente en las siete dimensiones base.${central}`;
  }

  const main = primaryPatterns[0];
  const other = primaryPatterns.slice(1).map((p) => p.title);
  const secondSentence = other.length
    ? `También resultan relevantes ${other.join(" y ")}.`
    : "";
  const protective = protectivePatterns.length
    ? ` Como recurso protector destaca ${protectivePatterns[0].title.toLowerCase()}.`
    : "";
  const contextual = contextOverrides.length
    ? " Existen ajustes contextuales que reducen la certeza de atribuir algunas conductas exclusivamente a características individuales."
    : "";

  return `${subject}la lectura integrada del perfil se organiza principalmente alrededor de ${main.title.toLowerCase()}. ${main.summary} ${secondSentence}${protective}${contextual}`.replace(/\s+/g, " ").trim();
}

function centralDimensionsForReport(pairLayer, base, limit = 3) {
  return (pairLayer?.centrality?.ranking ?? []).slice(0, limit).map((item) => ({
    ...item,
    label: base.dimensions[item.dimension]?.label ?? item.dimension,
    note: "La centralidad es una medida interna de conectividad entre reglas; no es una puntuación psicométrica ni un percentil.",
  }));
}

function uniquePatterns(patterns) {
  const seen = new Set();
  return patterns.filter((pattern) => {
    if (seen.has(pattern.id)) return false;
    seen.add(pattern.id);
    return true;
  });
}

export function composeProfessionalReport(rawAnswers, options = {}) {
  const cfg = normalizeProfessionalReportOptions(options);
  const analysis = analyzeMoneyProfile(rawAnswers, cfg);
  const { base, pairSignals, context, narrative } = analysis;

  const selectedPatterns = uniquePatterns([
    ...(narrative.primaryInsights ?? []),
    ...(narrative.secondaryInsights ?? []),
  ]).map(enrichPattern);

  const primaryPatterns = (narrative.primaryInsights ?? []).map(enrichPattern);
  const secondaryPatterns = (narrative.secondaryInsights ?? []).map(enrichPattern);
  const allContextPatterns = (context.patterns ?? []).filter((p) => p.status !== "suppressed");
  const protectivePatterns = allContextPatterns
    .filter((p) => p.polarity === "protective")
    .slice(0, 3)
    .map(enrichPattern);
  const attentionPatterns = allContextPatterns
    .filter((p) => ["risk", "tension", "context"].includes(p.polarity))
    .slice(0, 5)
    .map(enrichPattern);

  const dimensions = DIMENSION_ORDER.map((key) =>
    buildDimensionEntry(base.dimensions[key], context.dimensionContexts[key])
  );

  const centralDimensions = centralDimensionsForReport(pairSignals, base, 3);
  const interactions = selectInteractionNarratives(pairSignals, { limit: cfg.maxInteractions });
  const recommendations = buildRecommendations({
    base,
    context,
    primaryPatterns: narrative.primaryInsights ?? [],
    secondaryPatterns: narrative.secondaryInsights ?? [],
    max: cfg.maxRecommendations,
  });
  const reflectionQuestions = buildReflectionQuestions({
    base,
    context,
    primaryPatterns: narrative.primaryInsights ?? [],
    secondaryPatterns: narrative.secondaryInsights ?? [],
    max: cfg.maxReflections,
  });

  const executiveSummary = buildExecutiveSummary({
    subjectName: cfg.subjectName,
    primaryPatterns,
    protectivePatterns,
    centralDimensions,
    contextOverrides: context.activeOverrides ?? [],
  });

  const report = {
    metadata: {
      reportVersion: PROFESSIONAL_REPORT_VERSION,
      composerVersion: REPORT_COMPOSER_VERSION,
      instrumentVersion: base.instrumentVersion,
      analysisVersion: analysis.analysisVersion,
      generatedAt: base.generatedAt,
      mode: cfg.mode,
      subjectName: cfg.subjectName,
      generationMethod: "deterministic-rules",
      usesGenerativeAI: false,
    },
    executiveSummary,
    profileOverview: {
      primaryProfile: base.primaryProfile,
      centralDimensions,
      activeContextOverrides: (context.activeOverrides ?? []).map((o) => ({
        id: o.id,
        action: o.action,
        priority: o.priority,
        targetDimensions: o.targetDimensions,
        reason: o.reason,
      })),
    },
    keyPatterns: selectedPatterns,
    primaryPatterns,
    secondaryPatterns,
    protectiveResources: protectivePatterns,
    tensionsAndContext: attentionPatterns,
    dimensions,
    interactions,
    recommendations,
    reflectionQuestions,
    methodology: {
      scoring: "Las seis dimensiones de estilo usan intensidad y regulación. Autonomía y poder económico se interpreta como módulo contextual de experiencias reportadas, no como rasgo de personalidad.",
      causality: "El reporte no establece causalidad. Las expresiones como puede, coincide o aparece junto con describen compatibilidad teórica entre respuestas.",
      scorePreservation: "Las interacciones nunca cambian los códigos ni las puntuaciones base; sólo modifican contexto, prioridad narrativa y confianza atribucional.",
      displayScores: "Los valores 0–100, cuando se muestran, son transformaciones lineales para visualización; no son percentiles normativos.",
      limitations: [
        "No constituye diagnóstico clínico, financiero, legal ni de relaciones.",
        "Los umbrales y reglas deben revisarse con datos reales antes de presentarse como instrumento validado.",
        "Un resultado contextual de autonomía no permite inferir por sí solo causas, intenciones o características de otra persona.",
      ],
    },
    notices: [
      base.interpretationNotice,
      pairSignals.scientificStatus,
      context.notice,
      narrative.notice,
      "Este reporte se genera exclusivamente mediante reglas y textos predeterminados; no utiliza IA generativa.",
    ],
  };

  if (cfg.includeTechnical) {
    report.technical = {
      pairSignals: pairSignals.signals,
      centrality: pairSignals.centrality,
      emergentPatterns: analysis.emergentPatterns.patterns,
      contextPatterns: context.patterns,
      overrides: context.activeOverrides,
      narrativeDiagnostics: narrative.diagnostics,
    };
  }

  return report;
}
