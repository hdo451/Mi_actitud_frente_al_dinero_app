import { getDimensionNarrative } from "./dimension-narratives.js";
import { getPatternNarrative } from "./pattern-narratives.js";

export const RECOMMENDATION_LIBRARY_VERSION = "0.5.0-prototype";

function unique(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.text.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildRecommendations({ base, context, primaryPatterns = [], secondaryPatterns = [], max = 8 }) {
  const items = [];

  for (const pattern of [...primaryPatterns, ...secondaryPatterns]) {
    const narrative = getPatternNarrative(pattern);
    for (const text of narrative.actions ?? []) {
      items.push({
        sourceType: "pattern",
        sourceId: pattern.id,
        polarity: pattern.polarity,
        priority: pattern.resolverScore ?? pattern.reportPriority ?? 50,
        text,
      });
    }
  }

  for (const [key, dimension] of Object.entries(base.dimensions)) {
    if (key === "autonomy" && dimension.applicable === false) continue;
    const narrative = getDimensionNarrative(dimension, context?.dimensionContexts?.[key]);
    for (const text of narrative.actions ?? []) {
      items.push({
        sourceType: "dimension",
        sourceId: dimension.pattern.code,
        polarity: "descriptive",
        priority: (context?.dimensionContexts?.[key]?.state === "contextDependent" ? 78 : 45),
        text,
      });
    }
  }

  return unique(items)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, max)
    .map((item, index) => ({ rank: index + 1, ...item }));
}
