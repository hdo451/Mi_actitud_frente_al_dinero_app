/**
 * Money Profile Engine - Layer 3 Context Overrides v0.4.0-prototype
 *
 * Overrides never change base scores or base pattern codes.
 * They change attribution confidence, narrative eligibility and interpretation context.
 */

export const CONTEXT_OVERRIDE_VERSION = "0.4.0-prototype";

const DIMENSIONS = ["security", "planning", "spontaneity", "status", "giving", "avoidance", "autonomy"];
const HIGH_CONTROL_CODES = new Set(["A4", "A5", "A6", "A7"]);

function code(result, dimension) {
  return result?.dimensions?.[dimension]?.pattern?.code ?? null;
}

function currentAutonomyLevel(result) {
  return result?.dimensions?.autonomy?.currentAutonomy?.level ?? null;
}

function signalIds(pairLayer) {
  return new Set((pairLayer?.signals ?? []).map((s) => s.id));
}

function patternIds(patternLayer) {
  return new Set((patternLayer?.patterns ?? []).map((p) => p.id));
}

function baseDimensionContexts(result, pairLayer) {
  const byDimension = Object.fromEntries(DIMENSIONS.map((d) => [d, {
    dimension: d,
    baseCode: code(result, d),
    state: "base",
    attributionConfidence: "high",
    amplifiedBy: [],
    bufferedBy: [],
    contextualizedBy: [],
    tensionsWith: [],
    reinforcedBy: [],
    overrides: [],
  }]));

  for (const s of pairLayer?.signals ?? []) {
    for (const affected of s.affects ?? []) {
      const ctx = byDimension[affected];
      if (!ctx) continue;
      const others = s.dimensions.filter((d) => d !== affected);
      if (s.type === "amplifies" || s.type === "compounds") ctx.amplifiedBy.push(...others);
      else if (s.type === "buffers") ctx.bufferedBy.push(...others);
      else if (s.type === "contextualizes") ctx.contextualizedBy.push(...others);
      else if (s.type === "tension") ctx.tensionsWith.push(...others);
      else if (s.type === "reinforces") ctx.reinforcedBy.push(...others);
    }
  }

  for (const ctx of Object.values(byDimension)) {
    for (const key of ["amplifiedBy", "bufferedBy", "contextualizedBy", "tensionsWith", "reinforcedBy"]) {
      ctx[key] = [...new Set(ctx[key])];
    }
    const hasRisk = ctx.amplifiedBy.length > 0;
    const hasBuffer = ctx.bufferedBy.length > 0 || ctx.reinforcedBy.length > 0;
    const hasContext = ctx.contextualizedBy.length > 0;
    const hasTension = ctx.tensionsWith.length > 0;
    if (hasContext) ctx.state = "contextDependent";
    else if (hasRisk && hasBuffer) ctx.state = "mixed";
    else if (hasRisk) ctx.state = "amplified";
    else if (hasBuffer) ctx.state = "buffered";
    else if (hasTension) ctx.state = "tension";
  }

  return byDimension;
}

export const CONTEXT_OVERRIDE_RULES = Object.freeze([
  {
    id: "OV_AUTONOMY_SECURITY",
    targetDimensions: ["security"],
    action: "contextualize",
    priority: 100,
    applies: ({ result, signals }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && (signals.has("SA01") || signals.has("SA02") || signals.has("SA03")),
    reason: "La orientación hacia seguridad puede estar influida por experiencias de restricción o necesidad real de proteger recursos.",
  },
  {
    id: "OV_AUTONOMY_PLANNING",
    targetDimensions: ["planning"],
    action: "contextualize",
    priority: 100,
    applies: ({ result, signals }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && (signals.has("PA01") || signals.has("PA02")),
    reason: "La capacidad observada para planificar puede no equivaler a libertad para ejecutar decisiones financieras.",
  },
  {
    id: "OV_AUTONOMY_SPONTANEITY",
    targetDimensions: ["spontaneity"],
    action: "downgrade",
    priority: 100,
    applies: ({ result, signals }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && (signals.has("EA01") || signals.has("EA02")),
    reason: "El patrón de gasto puede estar condicionado por restricciones externas; se reduce la confianza para atribuirlo exclusivamente a autorregulación o impulsividad personal.",
  },
  {
    id: "OV_AUTONOMY_STATUS",
    targetDimensions: ["status"],
    action: "contextualize",
    priority: 98,
    applies: ({ result, signals }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && (signals.has("STA01") || signals.has("STA02")),
    reason: "La relación entre imagen, recursos y autovaloración debe interpretarse dentro del contexto de autonomía económica.",
  },
  {
    id: "OV_AUTONOMY_GIVING",
    targetDimensions: ["giving"],
    action: "downgrade",
    priority: 105,
    applies: ({ result, signals }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && signals.has("GA01"),
    reason: "No toda transferencia o cesión económica puede atribuirse con seguridad a generosidad voluntaria cuando existe autonomía comprometida.",
  },
  {
    id: "OV_AUTONOMY_AVOIDANCE",
    targetDimensions: ["avoidance"],
    action: "downgrade",
    priority: 110,
    applies: ({ result, signals }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && signals.has("EVA01"),
    reason: "Parte de la evitación puede reflejar temor, exclusión, falta de acceso o consecuencias relacionales; se reduce la atribución a un estilo individual estable.",
  },
  {
    id: "OV_RECOVERED_AUTONOMY",
    targetDimensions: ["security", "planning", "spontaneity", "status", "giving", "avoidance"],
    action: "contextualize",
    priority: 92,
    applies: ({ result }) => HIGH_CONTROL_CODES.has(code(result, "autonomy")) && currentAutonomyLevel(result) === "preserved",
    reason: "Las respuestas sugieren experiencias de control junto con autonomía actual conservada o recuperada; algunos patrones pueden persistir después del cambio de contexto.",
  },
  {
    id: "OV_DOMAIN_SPECIFIC_AVOIDANCE",
    targetDimensions: ["avoidance"],
    action: "downgrade",
    priority: 80,
    applies: ({ patterns }) => patterns.has("DOMAIN_SPECIFIC_AVOIDANCE"),
    reason: "La presencia de planificación sólida sugiere que la evitación puede estar concentrada en determinados temas y no representar incapacidad financiera general.",
  },
  {
    id: "OV_STATUS_SECURITY_COMPARISON",
    targetDimensions: ["security"],
    action: "contextualize",
    priority: 74,
    applies: ({ patterns }) => patterns.has("RELATIVE_INSECURITY"),
    reason: "La sensación de suficiencia puede depender parcialmente de estándares sociales o comparación económica.",
  },
  {
    id: "OV_PLANNING_REACTIVITY_SPECIFIC",
    targetDimensions: ["spontaneity"],
    action: "downgrade",
    priority: 72,
    applies: ({ result }) => ["P8", "P9"].includes(code(result, "planning")) && ["E2", "E3"].includes(code(result, "spontaneity")),
    reason: "La alta capacidad general de planificación hace menos plausible interpretar la reactividad como incapacidad financiera global; puede ser específica de ciertos contextos.",
  },
]);

const confidenceRank = { low: 1, medium: 2, high: 3 };
function lowerConfidence(current) {
  const rank = confidenceRank[current] ?? 3;
  return rank >= 3 ? "medium" : "low";
}

function applyDimensionAction(ctx, rule) {
  ctx.overrides.push({ id: rule.id, action: rule.action, priority: rule.priority, reason: rule.reason });
  if (rule.action === "contextualize") {
    ctx.state = "contextDependent";
    if (ctx.attributionConfidence === "high") ctx.attributionConfidence = "medium";
  } else if (rule.action === "downgrade") {
    ctx.state = "contextDependent";
    ctx.attributionConfidence = lowerConfidence(ctx.attributionConfidence);
  }
}

function applyPatternOverrides(patterns, result) {
  const highControl = HIGH_CONTROL_CODES.has(code(result, "autonomy"));
  const reduced = currentAutonomyLevel(result) === "reduced";

  return patterns.map((p) => {
    const copy = { ...p, status: "active", overrideNotes: [], adjustedNarrativeWeight: p.narrativeWeight };

    if (highControl && ["WORTH_THROUGH_GIVING", "RELATIONAL_IMPULSIVITY", "GIVING_AVOIDANCE_LOOP", "CONFLICT_AVOIDANT_GIVING"].includes(p.id)) {
      copy.status = reduced ? "contextualized" : "contextualized";
      copy.overrideNotes.push("Autonomía comprometida reduce la certeza de atribuir este patrón exclusivamente a características individuales.");
      copy.adjustedNarrativeWeight += reduced ? 8 : 4;
    }

    if (highControl && p.id === "CONSTRAINED_SPENDING") {
      copy.status = "contextualized";
      copy.adjustedNarrativeWeight += 12;
    }

    if (p.id === "DOMAIN_SPECIFIC_AVOIDANCE") {
      copy.status = "contextualized";
    }

    return copy;
  });
}

export function applyContextOverrides(result, pairLayer, patternLayer) {
  if (!result?.dimensions) throw new TypeError("applyContextOverrides requiere el resultado de evaluateSurvey().");
  const signals = signalIds(pairLayer);
  const patterns = patternIds(patternLayer);
  const contexts = baseDimensionContexts(result, pairLayer);

  const activeOverrides = [];
  for (const rule of CONTEXT_OVERRIDE_RULES) {
    if (!rule.applies({ result, signals, patterns })) continue;
    activeOverrides.push({ id: rule.id, action: rule.action, priority: rule.priority, targetDimensions: [...rule.targetDimensions], reason: rule.reason });
    for (const dimension of rule.targetDimensions) {
      if (contexts[dimension]) applyDimensionAction(contexts[dimension], rule);
    }
  }

  const adjustedPatterns = applyPatternOverrides(patternLayer?.patterns ?? [], result)
    .sort((a, b) => b.adjustedNarrativeWeight - a.adjustedNarrativeWeight);

  return {
    version: CONTEXT_OVERRIDE_VERSION,
    dimensionContexts: contexts,
    activeOverrides: activeOverrides.sort((a, b) => b.priority - a.priority),
    patterns: adjustedPatterns,
    notice: "Los context overrides modifican atribución y prioridad narrativa, nunca las puntuaciones ni códigos base.",
  };
}

export function validateContextOverrideCatalog() {
  const ids = new Set();
  const errors = [];
  for (const rule of CONTEXT_OVERRIDE_RULES) {
    if (ids.has(rule.id)) errors.push(`ID duplicado: ${rule.id}`);
    ids.add(rule.id);
    if (!["retain", "contextualize", "downgrade", "suppress"].includes(rule.action)) errors.push(`Acción inválida: ${rule.id}`);
  }
  return { ok: errors.length === 0, errors, ruleCount: CONTEXT_OVERRIDE_RULES.length };
}
