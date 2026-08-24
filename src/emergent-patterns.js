/**
 * Money Profile Engine - Layer 2 Emergent Patterns v0.4.0-prototype
 *
 * Converts Layer 1 pair signals into higher-order, deterministic hypotheses.
 * These patterns are theory-driven and must not be treated as validated diagnoses.
 */

export const EMERGENT_PATTERN_VERSION = "0.4.0-prototype";

export const PATTERN_POLARITIES = Object.freeze([
  "risk",
  "protective",
  "tension",
  "context",
  "mixed",
]);

export const EMERGENT_PATTERNS = Object.freeze([
  {
    id: "SECURITY_AVOIDANCE_LOOP",
    label: "Ciclo de seguridad y evitación",
    cluster: "avoidance",
    polarity: "risk",
    severity: "high",
    reportPriority: 96,
    centralDimensions: ["security", "avoidance"],
    requiredSignals: ["SAV01"],
    optionalSignals: ["SP01", "PEV01", "SST01"],
    summary: "La preocupación por seguridad y la evitación parecen reforzarse: menos claridad puede mantener la incertidumbre que alimenta la necesidad de control.",
    longContext: "Este patrón no establece causalidad. Describe una configuración en la que sensibilidad a la seguridad y postergación o evitación aparecen juntas y pueden mantener un circuito de incertidumbre.",
  },
  {
    id: "PLANNED_SECURITY",
    label: "Seguridad canalizada por planificación",
    cluster: "protection",
    polarity: "protective",
    severity: "moderate",
    reportPriority: 72,
    centralDimensions: ["security", "planning"],
    requiredSignals: ["SP02"],
    optionalSignals: ["SAV02", "PEV02"],
    summary: "La necesidad de seguridad aparece acompañada de recursos de planificación que pueden convertir preocupación en prevención y acción concreta.",
    longContext: "La planificación no elimina la sensibilidad hacia la seguridad, pero puede funcionar como recurso compensatorio cuando es flexible y ejecutable.",
  },
  {
    id: "DEFENSIVE_FINANCIAL_CONTROL",
    label: "Control financiero defensivo",
    cluster: "protection",
    polarity: "risk",
    severity: "high",
    reportPriority: 92,
    centralDimensions: ["security", "planning"],
    requiredSignals: ["SP03"],
    optionalSignals: ["PEV01", "SAV01"],
    summary: "La búsqueda de seguridad y una planificación rígida pueden reforzarse, haciendo difícil revisar decisiones cuando cambian las circunstancias.",
    longContext: "El rasgo central no es planificar mucho, sino utilizar estructura y control de forma poco flexible frente a incertidumbre o amenaza percibida.",
  },
  {
    id: "CONTROL_REBOUND",
    label: "Ciclo de restricción y rebote",
    cluster: "reactivity",
    polarity: "risk",
    severity: "high",
    reportPriority: 90,
    centralDimensions: ["security", "spontaneity"],
    requiredSignals: ["SE01"],
    optionalSignals: ["PE03", "EEV01"],
    summary: "Una fuerte necesidad de protección puede coexistir con decisiones reactivas que rompen el control y posteriormente aumentan la preocupación.",
    longContext: "Este patrón es especialmente relevante cuando también aparecen rigidez de planificación o evitación posterior a las decisiones reactivas.",
  },
  {
    id: "RELATIVE_INSECURITY",
    label: "Inseguridad relativa o comparativa",
    cluster: "identity",
    polarity: "risk",
    severity: "moderate",
    reportPriority: 82,
    centralDimensions: ["security", "status"],
    requiredSignals: ["SST01"],
    optionalSignals: ["STEV01", "ES01"],
    summary: "La idea de tener suficiente puede depender en parte de comparación social, imagen o posición económica percibida.",
    longContext: "La seguridad puede estar influida no sólo por recursos absolutos, sino por el estándar de comparación utilizado para evaluar éxito o suficiencia.",
  },
  {
    id: "SACRIFICED_SECURITY",
    label: "Seguridad sacrificada por ayudar",
    cluster: "relationships",
    polarity: "risk",
    severity: "high",
    reportPriority: 86,
    centralDimensions: ["security", "giving"],
    requiredSignals: ["SG01"],
    optionalSignals: ["GEV01", "PG01"],
    summary: "La dificultad para limitar la ayuda a otros puede competir con necesidades propias de seguridad y continuidad financiera.",
    longContext: "El patrón es más relevante cuando la ayuda también genera evitación de consecuencias o rompe planes previamente establecidos.",
  },
  {
    id: "STRUCTURED_FLEXIBILITY",
    label: "Flexibilidad estructurada",
    cluster: "protection",
    polarity: "protective",
    severity: "moderate",
    reportPriority: 64,
    centralDimensions: ["planning", "spontaneity"],
    requiredSignals: ["PE02"],
    optionalSignals: ["SE02", "PEV02"],
    summary: "La persona parece combinar planificación con capacidad de disfrutar, cambiar planes o responder a oportunidades sin perder control general.",
    longContext: "La coexistencia de estructura y flexibilidad suele ser más informativa que cualquiera de los dos polos por separado.",
  },
  {
    id: "PLAN_REBOUND_CYCLE",
    label: "Rigidez y ruptura del plan",
    cluster: "reactivity",
    polarity: "tension",
    severity: "high",
    reportPriority: 88,
    centralDimensions: ["planning", "spontaneity"],
    requiredSignals: ["PE03"],
    optionalSignals: ["SE01", "EEV01"],
    summary: "Planes rígidos y episodios reactivos pueden alternarse, produciendo ciclos de restricción, ruptura y posterior endurecimiento del control.",
    longContext: "La dificultad puede estar en la rigidez del sistema y no únicamente en una falta general de disciplina.",
  },
  {
    id: "RELATIONAL_PLAN_BREACH",
    label: "Ruptura relacional del plan",
    cluster: "relationships",
    polarity: "tension",
    severity: "moderate",
    reportPriority: 78,
    centralDimensions: ["planning", "giving"],
    requiredSignals: ["PG03"],
    optionalSignals: ["GEV03", "EG01"],
    summary: "La planificación general puede ser sólida, pero determinadas relaciones o solicitudes económicas pueden romper los límites establecidos.",
    longContext: "Este patrón diferencia una dificultad interpersonal específica de una incapacidad general para organizar el dinero.",
  },
  {
    id: "PROACTIVE_FINANCIAL_MANAGEMENT",
    label: "Gestión financiera proactiva",
    cluster: "protection",
    polarity: "protective",
    severity: "moderate",
    reportPriority: 68,
    centralDimensions: ["planning", "avoidance"],
    requiredSignals: ["PEV02"],
    optionalSignals: ["SAV02", "SAV03", "SP02"],
    summary: "La organización se traduce en afrontamiento: los problemas tienden a revisarse y abordarse antes de convertirse en crisis.",
    longContext: "Es un patrón protector porque une capacidad de planificación con ejecución y afrontamiento directo.",
  },
  {
    id: "DOMAIN_SPECIFIC_AVOIDANCE",
    label: "Evitación localizada",
    cluster: "avoidance",
    polarity: "context",
    severity: "moderate",
    reportPriority: 80,
    centralDimensions: ["planning", "avoidance"],
    requiredSignals: ["PEV03"],
    optionalSignals: ["EEV03", "STEV03"],
    summary: "Existe capacidad general de organización, pero determinados temas financieros parecen activar evitación específica.",
    longContext: "La evitación no debería interpretarse como incapacidad general cuando la persona demuestra recursos sólidos en otros dominios financieros.",
  },
  {
    id: "BLOCKED_FINANCIAL_AGENCY",
    label: "Agencia financiera bloqueada",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 99,
    centralDimensions: ["planning", "autonomy"],
    requiredSignals: ["PA02"],
    optionalSignals: ["EVA01", "GA01", "EA01", "SA01"],
    summary: "La persona parece contar con capacidad de planificación, pero el contexto relacional puede limitar su posibilidad de ejecutar decisiones o controlar recursos.",
    longContext: "Este patrón obliga a separar competencia financiera individual de libertad efectiva para actuar sobre las propias decisiones.",
  },
  {
    id: "VALIDATION_SPENDING",
    label: "Gasto asociado a validación",
    cluster: "identity",
    polarity: "risk",
    severity: "high",
    reportPriority: 94,
    centralDimensions: ["spontaneity", "status"],
    requiredSignals: ["ES01"],
    optionalSignals: ["SST01", "STEV01", "EEV01"],
    summary: "Parte del gasto reactivo puede estar asociado con comparación, pertenencia, imagen o necesidad de validación económica.",
    longContext: "No implica que toda compra tenga esa función; indica que la reactividad y la sensibilidad al estatus aparecen simultáneamente.",
  },
  {
    id: "SPEND_AVOIDANCE_LOOP",
    label: "Ciclo de gasto y evitación",
    cluster: "avoidance",
    polarity: "risk",
    severity: "high",
    reportPriority: 96,
    centralDimensions: ["spontaneity", "avoidance"],
    requiredSignals: ["EEV01"],
    optionalSignals: ["ES01", "STEV01", "SE01"],
    summary: "Las decisiones reactivas pueden generar consecuencias incómodas que después son postergadas o evitadas, reduciendo claridad y control.",
    longContext: "El ciclo puede sostenerse aunque la persona tenga buenas capacidades generales en otras dimensiones.",
  },
  {
    id: "RELATIONAL_IMPULSIVITY",
    label: "Reactividad económica relacional",
    cluster: "relationships",
    polarity: "risk",
    severity: "moderate",
    reportPriority: 82,
    centralDimensions: ["spontaneity", "giving"],
    requiredSignals: ["EG01"],
    optionalSignals: ["PG03", "GEV03", "GA01"],
    summary: "Las decisiones económicas rápidas parecen especialmente vulnerables cuando otras personas solicitan ayuda o existe presión interpersonal.",
    longContext: "Esto puede ser específico de relaciones y no reflejar impulsividad global en todos los ámbitos financieros.",
  },
  {
    id: "IMAGE_REALITY_GAP",
    label: "Brecha entre imagen y realidad financiera",
    cluster: "identity",
    polarity: "risk",
    severity: "high",
    reportPriority: 94,
    centralDimensions: ["status", "avoidance"],
    requiredSignals: ["STEV01"],
    optionalSignals: ["ES01", "SST01", "PST01"],
    summary: "Puede existir mayor dificultad para enfrentar información cuando ésta amenaza la imagen económica o la forma en que la persona evalúa su propio éxito.",
    longContext: "El patrón se refiere a una posible discrepancia psicológica, no a engaño o falsedad sobre la situación financiera.",
  },
  {
    id: "WORTH_THROUGH_GIVING",
    label: "Valor personal asociado a ayudar",
    cluster: "relationships",
    polarity: "risk",
    severity: "moderate",
    reportPriority: 80,
    centralDimensions: ["status", "giving"],
    requiredSignals: ["STG01"],
    optionalSignals: ["GEV03", "SG01", "EG01"],
    summary: "La generosidad puede estar relacionada no sólo con ayudar, sino también con reconocimiento, pertenencia o sensación de ser valioso para otros.",
    longContext: "Debe presentarse como hipótesis de función interpersonal y no como afirmación de que la persona intenta comprar afecto o influencia.",
  },
  {
    id: "GIVING_AVOIDANCE_LOOP",
    label: "Ciclo de ayuda y evitación",
    cluster: "relationships",
    polarity: "risk",
    severity: "high",
    reportPriority: 88,
    centralDimensions: ["giving", "avoidance"],
    requiredSignals: ["GEV01"],
    optionalSignals: ["PG03", "SG01", "GEV03"],
    summary: "Ayudar por encima de los propios límites puede generar consecuencias que posteriormente resultan difíciles de revisar, discutir o renegociar.",
    longContext: "El patrón puede mantener límites poco claros porque las consecuencias económicas no se procesan de forma suficientemente directa.",
  },
  {
    id: "CONFLICT_AVOIDANT_GIVING",
    label: "Ayuda asociada a evitación de conflicto",
    cluster: "relationships",
    polarity: "risk",
    severity: "moderate",
    reportPriority: 84,
    centralDimensions: ["giving", "avoidance"],
    requiredSignals: ["GEV03"],
    optionalSignals: ["GEV01", "PG03", "STG01"],
    summary: "Aceptar solicitudes económicas puede funcionar, en algunos contextos, como una manera de evitar culpa, tensión o conversaciones difíciles.",
    longContext: "No se asume que la persona ayude siempre por esta razón; se identifica una configuración compatible con esa función interpersonal.",
  },
  {
    id: "CONTEXTUAL_FINANCIAL_AVOIDANCE",
    label: "Evitación financiera contextual",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 100,
    centralDimensions: ["avoidance", "autonomy"],
    requiredSignals: ["EVA01"],
    optionalSignals: ["SA01", "PA01", "PA02", "EA01", "STA01", "GA01"],
    summary: "La evitación aparece en un contexto de restricciones económicas, por lo que parte de la conducta puede estar relacionada con acceso, temor, exclusión o menor libertad para decidir.",
    longContext: "Este patrón reduce la confianza para atribuir la evitación exclusivamente a un estilo individual.",
  },
  {
    id: "CONTEXTUAL_HYPERVIGILANCE",
    label: "Vigilancia financiera contextual",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 98,
    centralDimensions: ["security", "autonomy"],
    requiredSignals: ["SA01"],
    optionalSignals: ["EVA01", "PA02"],
    summary: "La necesidad de proteger o controlar recursos ocurre junto con señales de restricción económica y puede cumplir parcialmente una función adaptativa de autoprotección.",
    longContext: "La vigilancia no debe leerse automáticamente como rasgo excesivamente controlador cuando existe un contexto relacional restrictivo.",
  },
  {
    id: "FINANCIAL_VULNERABILITY_CONTEXT",
    label: "Vulnerabilidad financiera en contexto restrictivo",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 100,
    centralDimensions: ["security", "autonomy"],
    requiredSignals: ["SA03"],
    optionalSignals: ["PA01", "EVA01", "GA01"],
    summary: "Una base de seguridad frágil coincide con restricciones económicas externas, lo que puede aumentar la vulnerabilidad ante cambios de apoyo o acceso a recursos.",
    longContext: "Debe priorizarse el contexto de autonomía antes de interpretar la inseguridad como una característica estable de personalidad.",
  },
  {
    id: "COERCION_SENSITIVE_GIVING",
    label: "Transferencias económicas sensibles al contexto de poder",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 100,
    centralDimensions: ["giving", "autonomy"],
    requiredSignals: ["GA01"],
    optionalSignals: ["EVA01", "STA01", "EG01", "PG03"],
    summary: "La dificultad para establecer límites económicos aparece junto con señales de autonomía comprometida; no toda transferencia debe interpretarse como generosidad voluntaria.",
    longContext: "Este patrón exige cautela atribucional y evita convertir conductas potencialmente condicionadas por presión en rasgos individuales.",
  },
  {
    id: "CONSTRAINED_SPENDING",
    label: "Gasto condicionado por restricciones externas",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 96,
    centralDimensions: ["spontaneity", "autonomy"],
    requiredSignals: ["EA02"],
    optionalSignals: ["PA02", "EVA01"],
    summary: "La baja espontaneidad observada puede reflejar tanto autocontrol como limitaciones reales sobre la capacidad de utilizar dinero o decidir.",
    longContext: "La conducta contenida no debe equipararse automáticamente con elevada autorregulación cuando existe autonomía reducida.",
  },
  {
    id: "STATUS_DEPENDENCY_VULNERABILITY",
    label: "Vulnerabilidad entre estatus y dependencia económica",
    cluster: "power",
    polarity: "context",
    severity: "high",
    reportPriority: 96,
    centralDimensions: ["status", "autonomy"],
    requiredSignals: ["STA01"],
    optionalSignals: ["GA01", "EVA01", "SST01"],
    summary: "La valoración personal ligada al dinero aparece junto con autonomía económica comprometida, combinación que puede aumentar vulnerabilidad interpersonal.",
    longContext: "No permite inferir motivos de permanencia en una relación; sólo indica que identidad económica y autonomía merecen interpretarse conjuntamente.",
  },
  {
    id: "ADAPTIVE_MONEY_MANAGEMENT",
    label: "Base adaptativa de manejo financiero",
    cluster: "integrated",
    polarity: "protective",
    severity: "moderate",
    reportPriority: 78,
    centralDimensions: ["security", "planning", "avoidance"],
    requiredSignals: ["PEV02"],
    anyOfSignals: [["SP02", "SAV02", "SAV03"]],
    optionalSignals: ["PE02", "SE02", "SG02"],
    summary: "Planificación, afrontamiento y recursos preventivos parecen trabajar de forma coordinada, ofreciendo una base funcional para manejar incertidumbre y decisiones futuras.",
    longContext: "Es un patrón protector integrado; no implica ausencia de dificultades en otros dominios, pero sí recursos consistentes para abordarlas.",
  },
  {
    id: "THREAT_AVOIDANCE_SYSTEM",
    label: "Sistema de amenaza y evitación",
    cluster: "integrated",
    polarity: "risk",
    severity: "high",
    reportPriority: 101,
    centralDimensions: ["security", "avoidance", "planning"],
    requiredSignals: ["SAV01", "PEV01"],
    optionalSignals: ["SP01", "SP03", "SST01"],
    summary: "La preocupación, la evitación y una estructura insuficiente o rígida parecen formar un sistema más amplio que cualquiera de las dimensiones por separado.",
    longContext: "Este patrón merece prioridad narrativa porque integra amenaza percibida, postergación y dificultades para convertir preocupación en acción flexible.",
  },
  {
    id: "VALIDATION_CONSUMPTION_AVOIDANCE_LOOP",
    label: "Ciclo de validación, consumo y evitación",
    cluster: "integrated",
    polarity: "risk",
    severity: "high",
    reportPriority: 102,
    centralDimensions: ["status", "spontaneity", "avoidance"],
    requiredSignals: ["ES01", "EEV01", "STEV01"],
    optionalSignals: ["SST01", "PEV03"],
    summary: "Comparación o validación, gasto reactivo y evitación posterior aparecen conectados en un patrón coherente de mayor complejidad.",
    longContext: "No se afirma una secuencia causal; se reconoce que las tres configuraciones coexisten y pueden ser narrativamente más explicativas en conjunto.",
  },
  {
    id: "RELATIONAL_PRESSURE_SYSTEM",
    label: "Sistema de presión económica relacional",
    cluster: "integrated",
    polarity: "context",
    severity: "high",
    reportPriority: 103,
    centralDimensions: ["giving", "autonomy", "avoidance"],
    requiredSignals: ["GA01"],
    anyOfSignals: [["GEV03", "GEV01", "EG01", "PG03"], ["EVA01", "STA01"]],
    optionalSignals: ["SG01", "PA02"],
    summary: "Límites económicos vulnerables, evitación o presión interpersonal aparecen dentro de un contexto de autonomía comprometida y requieren interpretación relacional prioritaria.",
    longContext: "Este patrón desplaza la explicación desde una supuesta debilidad individual hacia una lectura contextual de las decisiones económicas.",
  },
  {
    id: "AUTONOMOUS_SUSTAINABLE_GIVING",
    label: "Generosidad autónoma y sostenible",
    cluster: "integrated",
    polarity: "protective",
    severity: "moderate",
    reportPriority: 66,
    centralDimensions: ["giving", "security", "autonomy"],
    requiredSignals: ["GA02"],
    anyOfSignals: [["SG02", "PG02", "EG03"]],
    optionalSignals: ["PEV02"],
    summary: "La ayuda aparece acompañada de límites, protección propia y ausencia de señales amplias de control económico.",
    longContext: "Es una configuración protectora que distingue generosidad elegida de sobreextensión o presión relacional.",
  },
]);

const POLARITY_WEIGHT = Object.freeze({ risk: 1.0, protective: 0.85, tension: 0.9, context: 1.05, mixed: 0.95 });

function signalSet(pairLayer) {
  return new Set((pairLayer?.signals ?? []).map((s) => s.id));
}

function meetsAnyOf(set, groups = []) {
  return groups.every((group) => group.some((id) => set.has(id)));
}

function confidenceFor(rule, set) {
  const required = rule.requiredSignals ?? [];
  const optional = rule.optionalSignals ?? [];
  const anyOf = rule.anyOfSignals ?? [];
  const optionalHits = optional.filter((id) => set.has(id));
  const anyOfHits = anyOf.reduce((sum, group) => sum + (group.some((id) => set.has(id)) ? 1 : 0), 0);

  const base = 0.68;
  const optionalBonus = optional.length ? 0.22 * (optionalHits.length / optional.length) : 0;
  const anyOfBonus = anyOf.length ? 0.1 * (anyOfHits / anyOf.length) : 0;
  const requiredBonus = required.length >= 2 ? 0.05 : 0;
  return Math.min(0.99, Math.round((base + optionalBonus + anyOfBonus + requiredBonus) * 100) / 100);
}

export function evaluateEmergentPatterns(result, pairLayer, { maxPatterns = null } = {}) {
  if (!result?.dimensions) throw new TypeError("evaluateEmergentPatterns requiere el resultado de evaluateSurvey().");
  if (!pairLayer?.signals) throw new TypeError("evaluateEmergentPatterns requiere el resultado de evaluatePairSignals().");

  const set = signalSet(pairLayer);
  let patterns = EMERGENT_PATTERNS
    .filter((rule) => (rule.requiredSignals ?? []).every((id) => set.has(id)))
    .filter((rule) => meetsAnyOf(set, rule.anyOfSignals ?? []))
    .map((rule) => {
      const supportingSignals = [
        ...(rule.requiredSignals ?? []),
        ...(rule.optionalSignals ?? []).filter((id) => set.has(id)),
        ...(rule.anyOfSignals ?? []).flat().filter((id) => set.has(id)),
      ];
      const confidence = confidenceFor(rule, set);
      return {
        id: rule.id,
        label: rule.label,
        cluster: rule.cluster,
        polarity: rule.polarity,
        severity: rule.severity,
        reportPriority: rule.reportPriority,
        centralDimensions: [...rule.centralDimensions],
        confidence,
        confidenceLabel: confidence >= 0.86 ? "high" : confidence >= 0.74 ? "medium" : "provisional",
        supportingSignals: [...new Set(supportingSignals)],
        summary: rule.summary,
        longContext: rule.longContext,
        evidenceLevel: "theoretical",
        causalClaimAllowed: false,
        narrativeWeight: Math.round(rule.reportPriority * confidence * (POLARITY_WEIGHT[rule.polarity] ?? 1)),
      };
    })
    .sort((a, b) => b.narrativeWeight - a.narrativeWeight || b.reportPriority - a.reportPriority);

  if (maxPatterns != null) {
    if (!Number.isInteger(maxPatterns) || maxPatterns <= 0) throw new RangeError("maxPatterns debe ser un entero positivo o null.");
    patterns = patterns.slice(0, maxPatterns);
  }

  return {
    version: EMERGENT_PATTERN_VERSION,
    patterns,
    notice: "Patrones emergentes teóricos derivados de reglas determinísticas; no constituyen factores estadísticamente validados ni permiten inferir causalidad.",
  };
}

export function validateEmergentPatternCatalog() {
  const ids = new Set();
  const errors = [];
  for (const rule of EMERGENT_PATTERNS) {
    if (ids.has(rule.id)) errors.push(`ID duplicado: ${rule.id}`);
    ids.add(rule.id);
    if (!PATTERN_POLARITIES.includes(rule.polarity)) errors.push(`Polarity inválida en ${rule.id}`);
    if (!Array.isArray(rule.requiredSignals) || rule.requiredSignals.length === 0) errors.push(`requiredSignals vacío en ${rule.id}`);
    if (!Number.isInteger(rule.reportPriority) || rule.reportPriority < 0 || rule.reportPriority > 120) errors.push(`reportPriority inválida en ${rule.id}`);
  }
  return { ok: errors.length === 0, errors, patternCount: EMERGENT_PATTERNS.length };
}
