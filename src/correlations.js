/**
 * Compatibility facade.
 * New projects should import the explicit 4-layer modules from index.js.
 */
import { evaluatePairSignals, PAIR_SIGNAL_VERSION, PAIR_SIGNALS } from "./pair-signals.js";
import { evaluateEmergentPatterns, EMERGENT_PATTERN_VERSION } from "./emergent-patterns.js";
import { applyContextOverrides, CONTEXT_OVERRIDE_VERSION } from "./context-overrides.js";

export const CORRELATION_VERSION = `pairs:${PAIR_SIGNAL_VERSION}|patterns:${EMERGENT_PATTERN_VERSION}|context:${CONTEXT_OVERRIDE_VERSION}`;
export const CORRELATION_RULES = PAIR_SIGNALS;

export function evaluateCorrelations(result, options = {}) {
  const pairLayer = evaluatePairSignals(result, options);
  const patternLayer = evaluateEmergentPatterns(result, pairLayer, options);
  const contextLayer = applyContextOverrides(result, pairLayer, patternLayer);

  return {
    version: CORRELATION_VERSION,
    matches: pairLayer.signals,
    totalMatches: pairLayer.signals.length,
    pairSignals: pairLayer,
    emergentPatterns: patternLayer.patterns,
    dimensionContexts: contextLayer.dimensionContexts,
    contextualProfile: Object.fromEntries(
      Object.entries(contextLayer.dimensionContexts).map(([key, value]) => [key, {
        baseCode: value.baseCode,
        contextualState: value.state,
        attributionConfidence: value.attributionConfidence,
      }])
    ),
    notice: "Compatibilidad: la antigua capa de correlaciones ahora expone Pair Signals + Emergent Patterns + Context Overrides.",
  };
}

export function contextualDimensionSummary(result, dimension) {
  const analysis = evaluateCorrelations(result);
  return analysis.dimensionContexts?.[dimension] ?? null;
}
