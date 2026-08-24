import { getDimensionNarrative } from "./dimension-narratives.js";
import { getPatternNarrative } from "./pattern-narratives.js";

export const REFLECTION_LIBRARY_VERSION = "0.5.0-prototype";

function addUnique(target, seen, item) {
  const key = item.question.trim().toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);
  target.push(item);
}

export function buildReflectionQuestions({ base, context, primaryPatterns = [], secondaryPatterns = [], max = 7 }) {
  const items = [];
  const seen = new Set();

  for (const pattern of [...primaryPatterns, ...secondaryPatterns]) {
    const narrative = getPatternNarrative(pattern);
    if (narrative.reflection) {
      addUnique(items, seen, {
        sourceType: "pattern",
        sourceId: pattern.id,
        priority: pattern.resolverScore ?? pattern.reportPriority ?? 50,
        question: narrative.reflection,
      });
    }
  }

  for (const [key, dimension] of Object.entries(base.dimensions)) {
    if (key === "autonomy" && dimension.applicable === false) continue;
    const narrative = getDimensionNarrative(dimension, context?.dimensionContexts?.[key]);
    for (const question of narrative.reflections ?? []) {
      addUnique(items, seen, {
        sourceType: "dimension",
        sourceId: dimension.pattern.code,
        priority: 35,
        question,
      });
    }
  }

  return items
    .sort((a, b) => b.priority - a.priority)
    .slice(0, max)
    .map((item, index) => ({ rank: index + 1, ...item }));
}
