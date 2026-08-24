import { DIMENSION_LABELS } from "./core.js";

export const INTERACTION_NARRATIVE_VERSION = "0.5.0-prototype";

const TYPE_TEXT = Object.freeze({
  amplifies: "Una dimensión puede aumentar la relevancia interpretativa de la otra.",
  buffers: "Una dimensión puede funcionar como recurso que amortigua parte de la vulnerabilidad observada en la otra.",
  tension: "Las dos dimensiones parecen empujar las decisiones en direcciones parcialmente diferentes.",
  contextualizes: "La segunda dimensión cambia el contexto desde el cual conviene interpretar la primera; no modifica su puntuación base.",
  reinforces: "Las dos dimensiones apuntan en una dirección funcionalmente coherente y pueden reforzarse como recurso.",
  compounds: "Las dos configuraciones pueden combinarse y generar una vulnerabilidad mayor que la lectura aislada de cada dimensión.",
});

const STRENGTH_TEXT = Object.freeze({
  low: "La señal es de baja prioridad dentro del modelo actual.",
  medium: "La señal tiene relevancia moderada dentro del modelo actual.",
  high: "La señal tiene relevancia alta dentro del modelo actual.",
  critical: "La señal tiene prioridad interpretativa muy alta dentro del modelo actual.",
});

export function buildInteractionNarrative(signal) {
  const labels = signal.dimensions.map((d) => DIMENSION_LABELS[d] ?? d);
  return {
    id: signal.id,
    title: signal.title,
    dimensions: [...signal.dimensions],
    dimensionLabels: labels,
    type: signal.type,
    strength: signal.strength,
    priority: signal.priority,
    summary: signal.summary,
    interpretation: `${TYPE_TEXT[signal.type] ?? "Las dimensiones muestran una interacción predefinida."} ${STRENGTH_TEXT[signal.strength] ?? ""}`.trim(),
    patternCandidate: signal.patternCandidate ?? null,
    causalClaimAllowed: false,
  };
}

export function selectInteractionNarratives(pairLayer, { limit = 8 } = {}) {
  return (pairLayer?.signals ?? [])
    .filter((s) => s.reportEligible !== false)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
    .map(buildInteractionNarrative);
}
