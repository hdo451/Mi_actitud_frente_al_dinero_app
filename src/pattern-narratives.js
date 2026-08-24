import { EMERGENT_PATTERNS } from "./emergent-patterns.js";

export const PATTERN_NARRATIVE_VERSION = "0.5.0-prototype";

const POLARITY_LANGUAGE = Object.freeze({
  risk: {
    framing: "Este patrón señala una combinación que puede aumentar vulnerabilidad cuando las condiciones que la activan se mantienen en el tiempo.",
    heading: "Área de atención",
  },
  tension: {
    framing: "Este patrón describe dos fuerzas que pueden competir entre sí y generar resultados distintos según el contexto.",
    heading: "Tensión a gestionar",
  },
  protective: {
    framing: "Este patrón representa un recurso potencialmente protector que puede ayudar a manejar otras áreas del perfil.",
    heading: "Recurso protector",
  },
  context: {
    framing: "Este patrón cambia la forma en que deben atribuirse las conductas observadas y exige una lectura contextual antes de concluir que se trata de un rasgo individual.",
    heading: "Contexto prioritario",
  },
  mixed: {
    framing: "Este patrón combina recursos y vulnerabilidades y debe interpretarse evitando conclusiones unidireccionales.",
    heading: "Configuración mixta",
  },
});

const CLUSTER_LANGUAGE = Object.freeze({
  protection: "La interacción se concentra en la manera de proteger recursos y tolerar incertidumbre.",
  reactivity: "La interacción se concentra en decisiones del momento, regulación y consecuencias posteriores.",
  identity: "La interacción se concentra en el papel del dinero dentro de identidad, comparación o percepción de éxito.",
  relationships: "La interacción se concentra en límites económicos, ayuda y presión interpersonal.",
  avoidance: "La interacción se concentra en cómo se enfrentan o postergan asuntos financieros difíciles.",
  power: "La interacción se concentra en acceso, participación y autonomía económica; por eso la atribución individual debe reducirse.",
  integrated: "El patrón integra tres o más elementos del perfil y suele ser más explicativo que cualquiera de sus dimensiones por separado.",
});

const PATTERN_ACTIONS = Object.freeze({
  SECURITY_AVOIDANCE_LOOP: ["Programar revisiones financieras breves y frecuentes para reducir incertidumbre antes de que aumente la preocupación.", "Definir qué información concreta falta antes de tomar decisiones de protección adicionales."],
  PLANNED_SECURITY: ["Usar la planificación para convertir preocupaciones generales en criterios concretos de reserva, cobertura y revisión.", "Mantener fechas de revisión para evitar que una estrategia protectora se vuelva automática o innecesariamente rígida."],
  DEFENSIVE_FINANCIAL_CONTROL: ["Añadir criterios explícitos para modificar planes cuando cambien las circunstancias.", "Distinguir decisiones destinadas a reducir riesgo real de aquellas destinadas principalmente a reducir ansiedad."],
  CONTROL_REBOUND: ["Crear márgenes deliberados de gasto o flexibilidad dentro del plan en lugar de depender de rupturas ocasionales.", "Identificar qué situaciones suelen preceder a decisiones reactivas después de periodos de fuerte restricción."],
  RELATIVE_INSECURITY: ["Definir métricas propias de suficiencia financiera y revisarlas sin utilizar comparación social como referencia principal.", "Separar objetivos de seguridad de objetivos de imagen o posición."],
  SACRIFICED_SECURITY: ["Establecer un límite de ayuda que no invada fondos destinados a necesidades propias o reservas esenciales.", "Decidir criterios de ayuda antes de recibir solicitudes concretas."],
  STRUCTURED_FLEXIBILITY: ["Conservar un margen explícito para cambios y oportunidades dentro de la planificación.", "Usar esta capacidad como recurso para compensar áreas más rígidas del perfil."],
  PLAN_REBOUND_CYCLE: ["Reducir reglas financieras demasiado absolutas y sustituirlas por límites graduados.", "Revisar después de una desviación qué parte del plan era poco realista antes de endurecerlo."],
  RELATIONAL_PLAN_BREACH: ["Definir reglas específicas para préstamos, regalos y apoyo antes de enfrentar presión interpersonal.", "Separar el presupuesto personal del presupuesto disponible para ayuda."],
  PROACTIVE_FINANCIAL_MANAGEMENT: ["Mantener revisiones preventivas y conversaciones tempranas antes de que los problemas se conviertan en urgencias.", "Documentar qué prácticas actuales funcionan para replicarlas en áreas más difíciles."],
  DOMAIN_SPECIFIC_AVOIDANCE: ["Identificar exactamente qué temas se evitan en lugar de tratar la situación como una falta general de disciplina.", "Aplicar las habilidades de planificación ya existentes al dominio específico que genera incomodidad."],
  BLOCKED_FINANCIAL_AGENCY: ["Separar capacidad personal de posibilidad real de ejecución dentro del contexto actual.", "Priorizar acceso a información y participación en decisiones antes de evaluar el éxito de un plan."],
  VALIDATION_SPENDING: ["Identificar compras en las que la función principal es imagen, pertenencia o comparación y aplicar un período de espera.", "Definir formas alternativas de expresar identidad o pertenencia que no dependan del gasto."],
  SPEND_AVOIDANCE_LOOP: ["Revisar las consecuencias de una decisión reactiva dentro de un plazo fijo, evitando que la incomodidad se convierta en postergación.", "Automatizar alertas o revisiones de cuentas después de periodos de mayor gasto discrecional."],
  RELATIONAL_IMPULSIVITY: ["Aplicar una regla de espera antes de transferir, prestar o gastar por solicitud de otra persona.", "Preparar respuestas intermedias que permitan posponer la decisión sin convertir el aplazamiento en rechazo definitivo."],
  IMAGE_REALITY_GAP: ["Crear una revisión privada y objetiva de la situación financiera que no dependa de la imagen que se desea mantener.", "Separar conversaciones de datos financieros de conversaciones sobre identidad o éxito."],
  WORTH_THROUGH_GIVING: ["Observar si la disposición a ayudar cambia cuando existe posibilidad de decepcionar a otra persona.", "Definir formas de contribuir que no requieran comprometer recursos por encima de límites propios."],
  GIVING_AVOIDANCE_LOOP: ["Revisar periódicamente préstamos, ayudas y compromisos para renegociar antes de que aparezca resentimiento o presión.", "Registrar el impacto de la ayuda sobre objetivos propios, no sólo la intención de ayudar."],
  CONFLICT_AVOIDANT_GIVING: ["Preparar frases y criterios para rechazar o limitar solicitudes sin tener que decidir bajo presión.", "Distinguir el costo de una conversación incómoda del costo financiero de evitarla."],
  CONTEXTUAL_FINANCIAL_AVOIDANCE: ["Evaluar primero si existe acceso suficiente a información y libertad para actuar antes de interpretar la evitación como falta de responsabilidad.", "Identificar qué asuntos pueden abordarse de forma segura y autónoma dentro del contexto actual."],
  CONTEXTUAL_HYPERVIGILANCE: ["Distinguir estrategias de protección necesarias del contexto de hábitos que podrían mantenerse después de que la amenaza cambie.", "Evitar recomendar simplemente 'relajarse' o gastar más sin comprender primero las restricciones reportadas."],
  FINANCIAL_VULNERABILITY_CONTEXT: ["Priorizar conocimiento de recursos disponibles, acceso a información y capacidad de decisión.", "No basar el plan exclusivamente en cambios de conducta individual cuando existen restricciones externas relevantes."],
  COERCION_SENSITIVE_GIVING: ["No asumir que todas las transferencias económicas son decisiones voluntarias de generosidad.", "Analizar por separado ayuda elegida, obligación, presión y disponibilidad real de alternativas."],
  CONSTRAINED_SPENDING: ["No interpretar automáticamente el bajo gasto como autocontrol elevado.", "Distinguir límites elegidos de límites impuestos por acceso o autorización."],
  STATUS_DEPENDENCY_VULNERABILITY: ["Separar valoración personal de dependencia económica al revisar decisiones importantes.", "Evitar inferir motivos relacionales; concentrarse en qué decisiones pueden tomarse con información y libertad suficientes."],
  ADAPTIVE_MONEY_MANAGEMENT: ["Mantener las prácticas de planificación y afrontamiento que ya funcionan y extenderlas gradualmente a áreas menos consistentes.", "Usar este patrón como recurso protector antes de añadir controles adicionales."],
  THREAT_AVOIDANCE_SYSTEM: ["Reducir el ciclo empezando por información concreta y tareas pequeñas en lugar de responder a la preocupación con más control general.", "Combinar planificación flexible con revisiones tempranas de los temas que suelen postergarse."],
  VALIDATION_CONSUMPTION_AVOIDANCE_LOOP: ["Separar el disparador social de la decisión de gasto y programar una revisión posterior objetiva.", "Identificar qué compras tienden a ser más difíciles de revisar cuando ya se realizaron."],
  RELATIONAL_PRESSURE_SYSTEM: ["Priorizar contexto, autonomía y seguridad de participación antes de atribuir las decisiones a falta de límites personales.", "Distinguir solicitudes económicas normales de situaciones en las que existen consecuencias relevantes por negarse o cuestionar."],
  AUTONOMOUS_SUSTAINABLE_GIVING: ["Conservar criterios de ayuda que protejan necesidades propias y autonomía del receptor.", "Utilizar este patrón como referencia para evaluar solicitudes futuras."],
});

const PATTERN_REFLECTIONS = Object.freeze({
  protection: "¿Qué información o criterio te permitiría saber que estás suficientemente protegido sin seguir aumentando control?",
  reactivity: "¿Qué ocurre justo antes y justo después de las decisiones que más se alejan de tus planes?",
  identity: "¿Qué parte de esta decisión seguiría siendo importante si nadie más fuera a conocerla?",
  relationships: "¿Qué cambia en tus decisiones económicas cuando temes decepcionar, generar conflicto o parecer poco dispuesto a ayudar?",
  avoidance: "¿Qué asunto financiero se vuelve más difícil cuanto más tiempo esperas para revisarlo?",
  power: "¿Qué parte de esta conducta representa una elección propia y qué parte puede estar condicionada por acceso, información o reacción de otra persona?",
  integrated: "Si tuvieras que intervenir en un solo punto de este sistema, ¿qué cambio tendría más posibilidades de mejorar las demás áreas?",
});

export const PATTERN_NARRATIVES = Object.freeze(Object.fromEntries(
  EMERGENT_PATTERNS.map((pattern) => {
    const polarity = POLARITY_LANGUAGE[pattern.polarity] ?? POLARITY_LANGUAGE.mixed;
    return [pattern.id, {
      id: pattern.id,
      title: pattern.label,
      heading: polarity.heading,
      summary: pattern.summary,
      interpretation: `${pattern.longContext} ${CLUSTER_LANGUAGE[pattern.cluster] ?? ""}`.trim(),
      framing: polarity.framing,
      actions: [...(PATTERN_ACTIONS[pattern.id] ?? [])],
      reflection: PATTERN_REFLECTIONS[pattern.cluster] ?? PATTERN_REFLECTIONS.integrated,
    }];
  })
));

export function getPatternNarrative(pattern) {
  return PATTERN_NARRATIVES[pattern.id] ?? {
    id: pattern.id,
    title: pattern.label,
    heading: "Patrón integrado",
    summary: pattern.summary,
    interpretation: pattern.longContext ?? pattern.summary,
    framing: "Esta configuración debe interpretarse como una hipótesis descriptiva predefinida.",
    actions: [],
    reflection: PATTERN_REFLECTIONS.integrated,
  };
}

export function validatePatternNarrativeCoverage() {
  const missing = EMERGENT_PATTERNS.filter((p) => !PATTERN_NARRATIVES[p.id]).map((p) => p.id);
  return { ok: missing.length === 0, missing, patternCount: EMERGENT_PATTERNS.length };
}
