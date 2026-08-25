/**
 * Money Profile Engine v0.1.0
 *
 * Purpose:
 * - Register answers from 1 to 6 for a 49-item financial-psychology questionnaire.
 * - Score 7 dimensions.
 * - Produce a fast, deterministic interpretation for each dimension.
 * - Keep the scoring layer separate enough to add cross-dimension rules later.
 *
 * Important:
 * - This is a prototype scoring engine, not a validated clinical instrument.
 * - 0–100 values are normalized display scores, not percentiles or normative scores.
 * - Autonomy/power is treated as a contextual risk/experience module, not a personality trait.
 */

export const INSTRUMENT_VERSION = "1.0.0-prototype";
export const SCALE_MIN = 1;
export const SCALE_MAX = 6;

export const RESPONSE_SCALE = Object.freeze({
  1: "Totalmente en desacuerdo",
  2: "Bastante en desacuerdo",
  3: "Ligeramente en desacuerdo",
  4: "Ligeramente de acuerdo",
  5: "Bastante de acuerdo",
  6: "Totalmente de acuerdo",
});

export const QUESTIONS = Object.freeze([
  // Seguridad financiera
  { id: 1, dimension: "security", role: "intensity", direction: "direct", text: "Tener una reserva de dinero disponible es importante para que pueda sentirme tranquilo/a." },
  { id: 2, dimension: "security", role: "regulation", direction: "reverse", text: "La posibilidad de no tener suficiente dinero en el futuro me preocupa incluso cuando mi situación actual es estable." },
  { id: 3, dimension: "security", role: "intensity", direction: "direct", text: "Antes de utilizar una cantidad importante de dinero, pienso en lo que podría ocurrir si llegara a necesitarlo después." },
  { id: 4, dimension: "security", role: "regulation", direction: "reverse", text: "Me resulta difícil sentir que tengo ‘suficiente’ dinero para estar completamente seguro/a." },
  { id: 5, dimension: "security", role: "intensity", direction: "direct", text: "Prefiero conservar dinero disponible aunque eso signifique renunciar a algo que podría disfrutar o aprovechar ahora." },
  { id: 6, dimension: "security", role: "intensity", direction: "direct", text: "Las pérdidas económicas potenciales ocupan más mi atención que las oportunidades de obtener beneficios." },
  { id: 7, dimension: "security", role: "intensity", direction: "direct", text: "Cuando siento incertidumbre económica, intento aumentar mi control sobre gastos, ahorros o decisiones financieras." },

  // Planificación y autorregulación
  { id: 8, dimension: "planning", role: "intensity", direction: "direct", text: "Planifico con anticipación cómo cubrir mis principales necesidades financieras futuras." },
  { id: 9, dimension: "planning", role: "intensity", direction: "direct", text: "Tengo una idea suficientemente clara de cuánto dinero gasto y en qué lo gasto." },
  { id: 10, dimension: "planning", role: "intensity", direction: "direct", text: "Reservo parte de mis recursos para necesidades futuras antes de utilizar todo lo disponible en el presente." },
  { id: 11, dimension: "planning", role: "intensity", direction: "direct", text: "Cuando establezco un objetivo financiero concreto, suelo mantener las acciones necesarias para alcanzarlo." },
  { id: 12, dimension: "planning", role: "intensity", direction: "direct", text: "Organizo mis obligaciones financieras antes de que se conviertan en problemas urgentes." },
  { id: 13, dimension: "planning", role: "regulation", direction: "direct", text: "Antes de una decisión económica importante, considero diferentes alternativas y sus consecuencias." },
  { id: 14, dimension: "planning", role: "regulation", direction: "direct", text: "Puedo modificar un plan financiero cuando las circunstancias cambian, aunque originalmente estuviera muy comprometido/a con él." },

  // Espontaneidad y regulación emocional
  { id: 15, dimension: "spontaneity", role: "regulation", direction: "reverse", text: "A veces termino gastando más de lo que había decidido previamente." },
  { id: 16, dimension: "spontaneity", role: "regulation", direction: "reverse", text: "Cuando me siento estresado/a, triste o frustrado/a, gastar dinero puede hacerme sentir mejor temporalmente." },
  { id: 17, dimension: "spontaneity", role: "intensity", direction: "direct", text: "Una oferta, descuento u oportunidad inesperada puede llevarme a comprar algo que no tenía previsto." },
  { id: 18, dimension: "spontaneity", role: "intensity", direction: "direct", text: "Las actividades sociales pueden llevarme a gastar más de lo que inicialmente quería." },
  { id: 19, dimension: "spontaneity", role: "intensity", direction: "direct", text: "Algunas veces compro algo porque lo deseo en ese momento sin pensar demasiado en sus consecuencias financieras." },
  { id: 20, dimension: "spontaneity", role: "regulation", direction: "reverse", text: "Después de algunas compras me pregunto por qué tomé esa decisión." },
  { id: 21, dimension: "spontaneity", role: "intensity", direction: "direct", text: "Puedo disfrutar gastando espontáneamente sin perder el control de mis obligaciones económicas." },

  // Estatus e identidad
  { id: 22, dimension: "status", role: "intensity", direction: "direct", text: "Considero que la situación económica de una persona proporciona información sobre cuánto éxito ha alcanzado." },
  { id: 23, dimension: "status", role: "intensity", direction: "direct", text: "Me importa que mis compras o posesiones transmitan una buena imagen de mí." },
  { id: 24, dimension: "status", role: "intensity", direction: "direct", text: "Estoy dispuesto/a a pagar más por algo cuando aumenta la impresión positiva que puedo causar." },
  { id: 25, dimension: "status", role: "intensity", direction: "direct", text: "Comparo algunas veces mi situación económica con la de personas de mi entorno." },
  { id: 26, dimension: "status", role: "intensity", direction: "direct", text: "Mi situación económica influye en cómo evalúo mi propio éxito personal." },
  { id: 27, dimension: "status", role: "regulation", direction: "reverse", text: "Me incomodaría que otras personas pensaran que tengo menos recursos económicos de los que realmente tengo." },
  { id: 28, dimension: "status", role: "regulation", direction: "direct", text: "Puedo sentirme exitoso/a aunque mi nivel de ingresos o patrimonio sea menor que el de personas comparables conmigo." },

  // Generosidad y límites
  { id: 29, dimension: "giving", role: "intensity", direction: "direct", text: "Me produce satisfacción utilizar parte de mi dinero para ayudar a personas que son importantes para mí." },
  { id: 30, dimension: "giving", role: "regulation", direction: "reverse", text: "Me resulta difícil decir que no cuando alguien cercano me pide ayuda económica." },
  { id: 31, dimension: "giving", role: "intensity", direction: "direct", text: "He ayudado económicamente a otras personas aun sabiendo que hacerlo podía perjudicar mis propias necesidades." },
  { id: 32, dimension: "giving", role: "regulation", direction: "direct", text: "Antes de prestar o dar una cantidad importante de dinero, considero también mis propias necesidades futuras." },
  { id: 33, dimension: "giving", role: "intensity", direction: "direct", text: "Me siento responsable de resolver problemas económicos de personas cercanas aunque esos problemas no hayan sido causados por mí." },
  { id: 34, dimension: "giving", role: "intensity", direction: "direct", text: "Me decepciona cuando una persona no utiliza responsablemente el dinero que le he dado o prestado." },
  { id: 35, dimension: "giving", role: "regulation", direction: "direct", text: "Puedo ayudar económicamente a alguien sin sentir que eso me da derecho a influir sobre sus decisiones personales." },

  // Evitación y afrontamiento
  { id: 36, dimension: "avoidance", role: "intensity", direction: "direct", text: "Cuando sospecho que existe un problema financiero, tiendo a posponer la revisión de cuentas, deudas o movimientos de dinero." },
  { id: 37, dimension: "avoidance", role: "intensity", direction: "direct", text: "Hablar detalladamente de mi situación financiera puede hacerme sentir incómodo/a." },
  { id: 38, dimension: "avoidance", role: "intensity", direction: "direct", text: "Si una decisión financiera me genera mucha preocupación, puedo posponerla aunque sé que debería resolverla." },
  { id: 39, dimension: "avoidance", role: "intensity", direction: "direct", text: "Algunas veces prefiero no saber exactamente cuál es mi situación económica." },
  { id: 40, dimension: "avoidance", role: "regulation", direction: "direct", text: "Cuando cometo un error financiero, puedo reconocerlo y analizarlo sin intentar ignorarlo." },
  { id: 41, dimension: "avoidance", role: "intensity", direction: "direct", text: "Me cuesta pedir ayuda o asesoramiento cuando no entiendo un tema relacionado con dinero." },
  { id: 42, dimension: "avoidance", role: "regulation", direction: "direct", text: "Puedo conversar sobre problemas financieros con personas relevantes antes de que se conviertan en una crisis." },

  // Autonomía y poder económico
  { id: 43, dimension: "autonomy", role: "control", direction: "direct", text: "En una relación de pareja he sentido que necesitaba permiso o una justificación excesiva para realizar gastos personales razonables." },
  { id: 44, dimension: "autonomy", role: "control", direction: "direct", text: "Mi pareja ha limitado o intentado limitar mi acceso a dinero o recursos que razonablemente deberían estar disponibles para mí." },
  { id: 45, dimension: "autonomy", role: "control", direction: "direct", text: "Mi pareja ha tomado decisiones económicas importantes que me afectaban sin permitirme participar razonablemente en ellas." },
  { id: 46, dimension: "autonomy", role: "control", direction: "direct", text: "Mi pareja ha dificultado que conozca información relevante sobre ingresos, cuentas, deudas o patrimonio que también me afecta." },
  { id: 47, dimension: "autonomy", role: "control", direction: "direct", text: "Mi pareja ha utilizado el dinero o la posibilidad de retirar apoyo económico para presionarme a tomar una decisión que yo no quería tomar." },
  { id: 48, dimension: "autonomy", role: "control", direction: "direct", text: "Mi pareja ha dificultado mi posibilidad de trabajar, estudiar o generar ingresos propios." },
  { id: 49, dimension: "autonomy", role: "modifier", direction: "direct", text: "En mis decisiones económicas importantes puedo expresar desacuerdo y tomar mis decisiones sin temor a perder apoyo económico de mi pareja como consecuencia." },
]);

export const DIMENSION_LABELS = Object.freeze({
  security: "Seguridad financiera",
  planning: "Planificación y autorregulación",
  spontaneity: "Espontaneidad y regulación emocional",
  status: "Estatus e identidad",
  giving: "Generosidad y límites",
  avoidance: "Evitación y afrontamiento",
  autonomy: "Autonomía y poder económico",
});

export const STANDARD_DIMENSIONS = Object.freeze({
  security: {
    intensity: [1, 3, 5, 6, 7],
    regulation: [{ id: 2, reverse: true }, { id: 4, reverse: true }],
  },
  planning: {
    intensity: [8, 9, 10, 11, 12],
    regulation: [{ id: 13 }, { id: 14 }],
  },
  spontaneity: {
    intensity: [17, 18, 19, 21],
    regulation: [{ id: 15, reverse: true }, { id: 16, reverse: true }, { id: 20, reverse: true }],
  },
  status: {
    intensity: [22, 23, 24, 25, 26],
    regulation: [{ id: 27, reverse: true }, { id: 28 }],
  },
  giving: {
    intensity: [29, 31, 33, 34],
    regulation: [{ id: 30, reverse: true }, { id: 32 }, { id: 35 }],
  },
  avoidance: {
    intensity: [36, 37, 38, 39, 41],
    regulation: [{ id: 40 }, { id: 42 }],
  },
});

export const INTERPRETATIONS = Object.freeze({
  security: [
    [
      ["S1", "Inseguridad sin estrategia protectora", "Puede existir preocupación por el dinero sin que se traduzca en conductas protectoras consistentes."],
      ["S2", "Seguridad ansiosa", "Existe búsqueda de protección acompañada de preocupación y dificultad para alcanzar sensación de suficiencia."],
      ["S3", "Hipervigilancia financiera", "Proteger, conservar y controlar el dinero ocupa un lugar central y está acompañado de preocupación persistente o sensación de que nunca es suficiente."],
    ],
    [
      ["S4", "Seguridad de baja prioridad", "La protección económica no domina las decisiones; las preocupaciones aparecen principalmente cuando las circunstancias lo justifican."],
      ["S5", "Prudencia situacional", "Existe preocupación por seguridad y cierta planificación, generalmente proporcional a la situación."],
      ["S6", "Seguridad dominante", "Ahorrar, conservar y anticipar riesgos son prioridades fuertes; bajo estrés puede aparecer rigidez."],
    ],
    [
      ["S7", "Alta tolerancia a la incertidumbre", "La seguridad financiera no domina psicológicamente; conviene distinguir confianza de preparación insuficiente."],
      ["S8", "Prudencia flexible", "La persona protege recursos y anticipa riesgos sin que la preocupación domine sus decisiones."],
      ["S9", "Seguridad robusta", "Existe una fuerte orientación a proteger recursos acompañada de capacidad para utilizarlos y tolerar incertidumbre."],
    ],
  ],
  planning: [
    [
      ["P1", "Baja estructura y baja adaptación", "Hay poco seguimiento financiero y dificultad para reconsiderar decisiones cuando aparecen problemas."],
      ["P2", "Planificación frágil", "Existen intentos de organización, pero pueden volverse inconsistentes o poco adaptativos cuando cambian las circunstancias."],
      ["P3", "Planificación rígida", "Existe mucha estructura, persistencia y control, pero cuesta abandonar planes aunque hayan dejado de ser adecuados."],
    ],
    [
      ["P4", "Manejo reactivo", "La persona organiza algunas áreas, pero frecuentemente responde a las circunstancias más que anticiparlas."],
      ["P5", "Planificación funcional", "Existe un nivel razonable de organización y adaptación."],
      ["P6", "Planificación disciplinada", "Los objetivos y la organización tienen fuerte influencia, con flexibilidad suficiente en la mayoría de las circunstancias."],
    ],
    [
      ["P7", "Flexibilidad poco estructurada", "La persona puede adaptarse bien, pero utiliza relativamente poca planificación formal o sostenida."],
      ["P8", "Planificación adaptativa", "Combina organización con capacidad de revisar decisiones ante nueva información."],
      ["P9", "Planificación estratégica", "Alta disciplina, seguimiento, orientación futura y capacidad para modificar el plan cuando existe una buena razón."],
    ],
  ],
  spontaneity: [
    [
      ["E1", "Desregulación episódica", "La persona no es particularmente espontánea, pero cuando gasta fuera de lo previsto puede perder control o experimentar arrepentimiento."],
      ["E2", "Reactividad financiera", "La situación y las emociones tienen capacidad significativa de alterar las decisiones previstas."],
      ["E3", "Impulsividad financiera elevada", "Deseos, emociones y estímulos externos tienden a dominar la decisión y posteriormente pueden aparecer arrepentimiento o pérdida de control."],
    ],
    [
      ["E4", "Prudencia con excepciones", "Predomina el control, aunque existen situaciones particulares capaces de generar decisiones no previstas."],
      ["E5", "Espontaneidad situacional", "La persona puede disfrutar oportunidades presentes y normalmente mantiene un control razonable."],
      ["E6", "Orientación al presente", "Existe elevada apertura a experiencias y gastos espontáneos, aunque el control depende considerablemente del contexto."],
    ],
    [
      ["E7", "Estilo deliberado", "Existe poca necesidad de decisiones espontáneas y alto control sobre el gasto."],
      ["E8", "Espontaneidad saludable", "La persona puede disfrutar el presente y cambiar planes sin comprometer sus obligaciones."],
      ["E9", "Espontaneidad altamente regulada", "Existe fuerte orientación hacia experiencias, oportunidades y disfrute inmediato, pero con límites financieros sólidos."],
    ],
  ],
  status: [
    [
      ["ST1", "Vulnerabilidad económica latente", "La persona presta poca atención consciente al estatus, pero puede tener dificultades para sentirse exitosa independientemente de su posición económica."],
      ["ST2", "Validación económica vulnerable", "La comparación y la situación económica empiezan a influir de manera importante sobre la evaluación personal."],
      ["ST3", "Identidad dependiente del estatus", "Dinero, posesiones, comparación y valoración personal están estrechamente vinculados."],
    ],
    [
      ["ST4", "Baja orientación al estatus", "La imagen económica tiene poca importancia en la mayoría de las decisiones."],
      ["ST5", "Conciencia social moderada", "La persona reconoce el valor simbólico del dinero y la imagen, sin que necesariamente definan su identidad."],
      ["ST6", "Sensibilidad al estatus", "La impresión producida sobre otros influye significativamente en decisiones económicas."],
    ],
    [
      ["ST7", "Identidad económicamente independiente", "La persona separa con facilidad éxito personal y riqueza material."],
      ["ST8", "Uso selectivo del estatus", "Reconoce y utiliza señales económicas cuando son relevantes sin depender demasiado de ellas para su autoestima."],
      ["ST9", "Estatus estratégico", "La persona atribuye importancia considerable a imagen, calidad o posición, pero conserva una valoración personal relativamente independiente del patrimonio."],
    ],
  ],
  giving: [
    [
      ["G1", "Vulnerabilidad interpersonal", "La persona no tiene una fuerte orientación a dar, pero puede tener dificultad para negar ayuda cuando es solicitada."],
      ["G2", "Generosidad por presión", "Una parte significativa de la ayuda puede surgir de obligación, culpa o dificultad para decir no."],
      ["G3", "Sobreextensión financiera", "Ayudar ocupa un lugar importante y puede ocurrir aun cuando perjudica necesidades propias o mantiene problemas ajenos."],
    ],
    [
      ["G4", "Generosidad selectiva limitada", "La persona ayuda en circunstancias concretas y mantiene algunos límites, aunque pueden variar según la relación."],
      ["G5", "Generosidad situacional", "Existe equilibrio razonable entre ayudar y proteger las propias necesidades."],
      ["G6", "Generosidad intensa con límites variables", "Ayudar es muy importante, aunque determinadas personas o circunstancias pueden producir sobreextensión."],
    ],
    [
      ["G7", "Independencia financiera interpersonal", "La persona ayuda relativamente poco y puede establecer límites con claridad."],
      ["G8", "Generosidad equilibrada", "Puede ayudar de manera significativa conservando autonomía y criterios propios."],
      ["G9", "Generosidad madura", "Ayudar es una parte importante del uso del dinero, pero se mantienen límites, seguridad propia y autonomía del receptor."],
    ],
  ],
  avoidance: [
    [
      ["EV1", "Afrontamiento directo con pocos recursos", "La persona no suele evitar información financiera, aunque puede carecer de herramientas para manejarla eficazmente."],
      ["EV2", "Vulnerabilidad a la postergación", "La incomodidad comienza a interferir con algunas decisiones y existe limitada capacidad de compensarla."],
      ["EV3", "Evitación consolidada", "Información, decisiones o conversaciones financieras tienden a ser postergadas y existen pocos mecanismos eficaces para romper el patrón."],
    ],
    [
      ["EV4", "Afrontamiento generalmente directo", "La persona suele enfrentar los asuntos financieros, aunque determinadas situaciones pueden resultar difíciles."],
      ["EV5", "Evitación situacional", "Algunos problemas generan postergación, pero normalmente terminan siendo afrontados."],
      ["EV6", "Ciclo de evitación y corrección", "La persona puede postergar asuntos importantes y posteriormente intentar resolverlos cuando la presión aumenta."],
    ],
    [
      ["EV7", "Afrontamiento proactivo", "Existe baja evitación y buena capacidad para revisar errores, conversar y pedir ayuda."],
      ["EV8", "Afrontamiento pese al malestar", "Existe incomodidad o tendencia inicial a postergar, pero la persona dispone de estrategias para actuar."],
      ["EV9", "Perfil ambivalente", "Coexisten fuertes tendencias de evitación con capacidades declaradas de afrontamiento; probablemente el comportamiento cambia según contexto o tipo de problema."],
    ],
  ],
});

export const AUTONOMY_INTERPRETATIONS = Object.freeze({
  A1: ["Sin evidencia significativa o señal aislada", "No aparece un patrón amplio de control económico en las respuestas."],
  A2: ["Señal focal", "Existe una conducta concreta que merece contextualización, pero no evidencia suficiente para describir un patrón multidimensional."],
  A3: ["Control focal intenso", "Una conducta específica aparece con mucha intensidad; su concentración en una sola área no reduce necesariamente su importancia."],
  A4: ["Patrón de control multidimensional", "Aparecen varias formas relacionadas de restricción, exclusión o presión económica."],
  A5: ["Control multidimensional intenso", "Varias formas de control aparecen con alta intensidad."],
  A6: ["Patrón amplio de control económico", "Las conductas aparecen en numerosos dominios de autonomía."],
  A7: ["Patrón amplio e intenso", "Existe una concentración elevada de indicadores de restricción, coerción, información, decisión o sabotaje económico."],
});

function assertScaleValue(value, id) {
  if (!Number.isInteger(value) || value < SCALE_MIN || value > SCALE_MAX) {
    throw new RangeError(`La respuesta ${id} debe ser un entero entre ${SCALE_MIN} y ${SCALE_MAX}. Recibido: ${value}`);
  }
}

function mean(values) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function reverse(value) {
  return SCALE_MAX + SCALE_MIN - value; // 7 - value for a 1–6 scale
}

function toDisplay100(value) {
  if (value == null) return null;
  return Math.round(((value - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100);
}

/**
 * Three descriptive bands used only to select the first-layer interpretation.
 * These are prototype cut points, not normative clinical thresholds.
 */
export function level3(value) {
  if (value < 2.5) return "low";
  if (value < 4.5) return "medium";
  return "high";
}

function levelIndex(level) {
  return { low: 0, medium: 1, high: 2 }[level];
}

function answersToObject(answers) {
  if (Array.isArray(answers)) {
    if (answers.length !== 49) {
      throw new Error(`Si answers es un array debe contener 49 respuestas; recibió ${answers.length}.`);
    }
    return Object.fromEntries(answers.map((value, index) => [index + 1, value]));
  }
  if (answers && typeof answers === "object") return answers;
  throw new TypeError("answers debe ser un array de 49 valores o un objeto {1: valor, ..., 49: valor}.");
}

/**
 * Validates input without silently converting strings to numbers.
 * autonomyApplicable=false allows questions 43–49 to be null/undefined.
 */
export function validateAnswers(rawAnswers, { autonomyApplicable = true } = {}) {
  const answers = answersToObject(rawAnswers);

  for (let id = 1; id <= 49; id += 1) {
    const value = answers[id];
    const isAutonomy = id >= 43;

    if (isAutonomy && !autonomyApplicable && (value == null || value === "")) {
      continue;
    }

    assertScaleValue(value, id);
  }

  return true;
}

function scoreStandardDimension(key, answers) {
  const cfg = STANDARD_DIMENSIONS[key];
  const intensityValues = cfg.intensity.map((id) => answers[id]);
  const regulationValues = cfg.regulation.map(({ id, reverse: isReverse = false }) =>
    isReverse ? reverse(answers[id]) : answers[id]
  );

  const intensity = mean(intensityValues);
  const regulation = mean(regulationValues);
  const intensityLevel = level3(intensity);
  const regulationLevel = level3(regulation);

  // Matrix rows = regulation (low, medium, high), columns = intensity (low, medium, high)
  const [code, label, summary] = INTERPRETATIONS[key][levelIndex(regulationLevel)][levelIndex(intensityLevel)];

  return {
    dimension: key,
    label: DIMENSION_LABELS[key],
    intensity: {
      raw: round(intensity),
      display100: toDisplay100(intensity),
      level: intensityLevel,
      itemIds: cfg.intensity,
    },
    regulation: {
      raw: round(regulation),
      display100: toDisplay100(regulation),
      level: regulationLevel,
      itemIds: cfg.regulation.map((item) => item.id),
    },
    pattern: { code, label, summary },
  };
}

function autonomyModifier(value) {
  if (value <= 2) return { level: "reduced", label: "Autonomía actual reducida" };
  if (value <= 4) return { level: "partial", label: "Autonomía actual parcial o dependiente del contexto" };
  return { level: "preserved", label: "Autonomía actual conservada o recuperada" };
}

function breadthLevel(count) {
  if (count <= 1) return "low";
  if (count <= 3) return "medium";
  return "high";
}

function autonomyIntensityLevel(value) {
  // In this module, 1–3 express disagreement and should not by themselves
  // create a positive control signal. Thresholds therefore differ from the
  // generic 3-band descriptive scoring used for personality-style dimensions.
  if (value < 3.5) return "low";
  if (value < 4.5) return "medium";
  return "high";
}

function autonomyCode(intensityLevel, breadth) {
  if (breadth === "low" && intensityLevel === "low") return "A1";
  if (breadth === "low" && intensityLevel === "medium") return "A2";
  if (breadth === "low" && intensityLevel === "high") return "A3";
  if (breadth === "medium" && intensityLevel === "medium") return "A4";
  if (breadth === "medium" && intensityLevel === "high") return "A5";
  if (breadth === "high" && intensityLevel === "medium") return "A6";
  if (breadth === "high" && intensityLevel === "high") return "A7";

  // Low mean + medium/high breadth is mathematically unusual with six 1–6 items.
  // Keep it visible instead of forcing an interpretation.
  return "REVIEW";
}

function scoreAutonomy(answers, { autonomyApplicable = true } = {}) {
  if (!autonomyApplicable) {
    return {
      dimension: "autonomy",
      label: DIMENSION_LABELS.autonomy,
      applicable: false,
      pattern: {
        code: "NA",
        label: "No aplicable",
        summary: "El módulo de autonomía y poder económico no fue aplicado.",
      },
    };
  }

  const controlIds = [43, 44, 45, 46, 47, 48];
  const values = controlIds.map((id) => answers[id]);
  const intensity = mean(values);
  const intensityLevel = autonomyIntensityLevel(intensity);
  const breadthCount = values.filter((value) => value >= 4).length;
  const breadth = breadthLevel(breadthCount);
  const code = autonomyCode(intensityLevel, breadth);
  const modifier = autonomyModifier(answers[49]);

  const interpretation = code === "REVIEW"
    ? ["Patrón que requiere revisión", "La combinación de amplitud e intensidad es inusual; conviene revisar las respuestas antes de interpretarla automáticamente."]
    : AUTONOMY_INTERPRETATIONS[code];

  return {
    dimension: "autonomy",
    label: DIMENSION_LABELS.autonomy,
    applicable: true,
    controlIntensity: {
      raw: round(intensity),
      display100: toDisplay100(intensity),
      level: intensityLevel,
      itemIds: controlIds,
    },
    breadth: {
      countAtOrAbove4: breadthCount,
      totalItems: controlIds.length,
      level: breadth,
    },
    currentAutonomy: {
      raw: answers[49],
      display100: toDisplay100(answers[49]),
      ...modifier,
      itemId: 49,
    },
    pattern: {
      code,
      label: interpretation[0],
      summary: interpretation[1],
    },
  };
}

/**
 * Evaluates the 49 answers and returns the first-layer profile.
 * Stage 2 cross-dimension logic can consume this output without changing the questionnaire UI.
 */
export function evaluateSurvey(rawAnswers, options = {}) {
  const { autonomyApplicable = true } = options;
  const answers = answersToObject(rawAnswers);
  validateAnswers(answers, { autonomyApplicable });

  const dimensions = {
    security: scoreStandardDimension("security", answers),
    planning: scoreStandardDimension("planning", answers),
    spontaneity: scoreStandardDimension("spontaneity", answers),
    status: scoreStandardDimension("status", answers),
    giving: scoreStandardDimension("giving", answers),
    avoidance: scoreStandardDimension("avoidance", answers),
    autonomy: scoreAutonomy(answers, { autonomyApplicable }),
  };

  return {
    instrumentVersion: INSTRUMENT_VERSION,
    generatedAt: new Date().toISOString(),
    scale: { min: SCALE_MIN, max: SCALE_MAX },
    dimensions,
    primaryProfile: Object.fromEntries(
      Object.entries(dimensions).map(([key, value]) => [key, value.pattern.code])
    ),
    interpretationNotice:
      "Interpretación descriptiva de un prototipo. No constituye diagnóstico, percentil normativo ni resultado clínico validado.",
  };
}

/**
 * Convenience function for UI/API storage.
 * It preserves raw answers and derived output together so future scoring versions can be audited.
 */
export function buildStoredAssessment({ assessmentId, respondentId = null, answers, autonomyApplicable = true, metadata = {}, participant = null }) {
  const normalizedAnswers = answersToObject(answers);
  const result = evaluateSurvey(normalizedAnswers, { autonomyApplicable });

  return {
    assessmentId,
    respondentId,
    participant,
    instrumentVersion: INSTRUMENT_VERSION,
    scoringVersion: INSTRUMENT_VERSION,
    autonomyApplicable,
    answers: normalizedAnswers,
    result,
    metadata,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Useful for rendering the questionnaire dynamically in React/Vue/Svelte/etc.
 */
export function getQuestionnaireDefinition() {
  return {
    version: INSTRUMENT_VERSION,
    responseScale: RESPONSE_SCALE,
    questions: QUESTIONS,
    dimensions: DIMENSION_LABELS,
  };
}

/**
 * Minimal smoke test. Throws if a core invariant breaks.
 */
export function runSelfTest() {
  const allThrees = Array(49).fill(3);
  const result = evaluateSurvey(allThrees);

  if (!result.primaryProfile.security) throw new Error("Self-test failed: missing security profile.");
  if (Object.keys(result.dimensions).length !== 7) throw new Error("Self-test failed: expected 7 dimensions.");

  return {
    ok: true,
    instrumentVersion: INSTRUMENT_VERSION,
    samplePrimaryProfile: result.primaryProfile,
  };
}
