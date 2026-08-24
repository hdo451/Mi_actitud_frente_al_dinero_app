import { evaluateSurvey } from "./core.js";
import { evaluatePairSignals } from "./pair-signals.js";
import { evaluateEmergentPatterns } from "./emergent-patterns.js";
import { applyContextOverrides } from "./context-overrides.js";
import { resolveNarrative } from "./narrative-resolver.js";

export const ANALYSIS_ENGINE_VERSION = "0.4.0-prototype";

/**
 * Full deterministic pipeline.
 * 1) Base scoring
 * 2) Pair signals
 * 3) Emergent patterns
 * 4) Context overrides
 * 5) Narrative resolution
 */
export function analyzeMoneyProfile(rawAnswers, options = {}) {
  const base = evaluateSurvey(rawAnswers, options);
  const pairSignals = evaluatePairSignals(base, options);
  const emergentPatterns = evaluateEmergentPatterns(base, pairSignals, options);
  const context = applyContextOverrides(base, pairSignals, emergentPatterns);
  const narrative = resolveNarrative(base, pairSignals, context, options);

  return {
    analysisVersion: ANALYSIS_ENGINE_VERSION,
    base,
    pairSignals,
    emergentPatterns,
    context,
    narrative,
  };
}
