/**
 * Money Profile Engine - Layer 4 Narrative Resolution v0.4.0-prototype
 *
 * Selects the 3-5 most informative insights from a potentially large set of
 * patterns without changing scores. It also exposes centrality for UI/reporting.
 */

export const NARRATIVE_RESOLVER_VERSION = "0.4.0-prototype";

const CLUSTER_LIMIT_DEFAULT = 1;
const POLARITY_ORDER = { context: 5, risk: 4, tension: 3, mixed: 2, protective: 1 };

function centralityMap(pairLayer) {
  return pairLayer?.centrality?.byDimension ?? {};
}

function patternCentralityBonus(pattern, pairLayer) {
  const map = centralityMap(pairLayer);
  const loads = (pattern.centralDimensions ?? []).map((d) => map[d]?.weightedSignalLoad ?? 0);
  if (!loads.length) return 0;
  const max = Math.max(...loads);
  return Math.min(20, Math.round(max / 120));
}

function scorePattern(pattern, pairLayer) {
  const base = pattern.adjustedNarrativeWeight ?? pattern.narrativeWeight ?? pattern.reportPriority ?? 0;
  const centralityBonus = patternCentralityBonus(pattern, pairLayer);
  const contextualBonus = pattern.polarity === "context" ? 8 : 0;
  const severityBonus = pattern.severity === "high" ? 6 : 2;
  return base + centralityBonus + contextualBonus + severityBonus;
}

function selectDiverse(patterns, pairLayer, maxPrimary, maxSecondary, clusterLimit) {
  const scored = patterns
    .filter((p) => p.status !== "suppressed")
    .map((p) => ({ ...p, resolverScore: scorePattern(p, pairLayer) }))
    .sort((a, b) => b.resolverScore - a.resolverScore || (POLARITY_ORDER[b.polarity] ?? 0) - (POLARITY_ORDER[a.polarity] ?? 0));

  const primary = [];
  const secondary = [];
  const clusterCount = new Map();

  for (const p of scored) {
    const count = clusterCount.get(p.cluster) ?? 0;
    if (primary.length < maxPrimary && count < clusterLimit) {
      primary.push(p);
      clusterCount.set(p.cluster, count + 1);
      continue;
    }
    if (secondary.length < maxSecondary) secondary.push(p);
  }

  // Ensure at least one protective insight when a meaningful one exists.
  const hasProtective = [...primary, ...secondary].some((p) => p.polarity === "protective");
  if (!hasProtective) {
    const protective = scored.find((p) => p.polarity === "protective" && !primary.some((x) => x.id === p.id));
    if (protective) {
      if (secondary.length < maxSecondary) secondary.push(protective);
      else if (secondary.length) secondary[secondary.length - 1] = protective;
      else if (primary.length && maxSecondary === 0) primary[primary.length - 1] = protective;
    }
  }

  return { primary, secondary, allScored: scored };
}

function resolveCentralDimensions(pairLayer, limit = 3) {
  const ranking = pairLayer?.centrality?.ranking ?? [];
  return ranking.slice(0, limit).map((item) => ({
    dimension: item.dimension,
    signalCount: item.signalCount,
    weightedSignalLoad: item.weightedSignalLoad,
    rank: item.rank,
    interpretation: "Centralidad interna del motor: indica cuántas interacciones relevantes atraviesan la dimensión; no es una puntuación psicométrica.",
  }));
}

function executiveSummary(primary, centralDimensions) {
  if (!primary.length) {
    return "No se detectaron patrones emergentes suficientemente fuertes con las reglas teóricas actuales. El reporte debe apoyarse principalmente en las siete dimensiones base.";
  }
  const labels = primary.map((p) => p.label).join("; ");
  const central = centralDimensions.length ? ` Las dimensiones con mayor centralidad contextual son ${centralDimensions.map((d) => d.dimension).join(", ")}.` : "";
  return `El perfil integrado se organiza principalmente alrededor de: ${labels}.${central}`;
}

export function resolveNarrative(result, pairLayer, contextLayer, {
  maxPrimary = 3,
  maxSecondary = 2,
  clusterLimit = CLUSTER_LIMIT_DEFAULT,
} = {}) {
  if (!result?.dimensions) throw new TypeError("resolveNarrative requiere el resultado de evaluateSurvey().");
  if (!contextLayer?.patterns) throw new TypeError("resolveNarrative requiere la salida de applyContextOverrides().");

  const { primary, secondary, allScored } = selectDiverse(contextLayer.patterns, pairLayer, maxPrimary, maxSecondary, clusterLimit);
  const centralDimensions = resolveCentralDimensions(pairLayer, 3);

  return {
    version: NARRATIVE_RESOLVER_VERSION,
    primaryInsights: primary,
    secondaryInsights: secondary,
    centralDimensions,
    executiveSummary: executiveSummary(primary, centralDimensions),
    diagnostics: {
      candidatePatternCount: contextLayer.patterns.length,
      scoredPatternCount: allScored.length,
      selectedPrimaryCount: primary.length,
      selectedSecondaryCount: secondary.length,
    },
    notice: "La resolución narrativa selecciona y prioriza hipótesis interpretativas; no convierte centralidad o prioridad en medidas clínicas.",
  };
}
