import { DIMENSION_LABELS } from "./core.js";

export const DIMENSION_NARRATIVE_VERSION = "0.5.0-prototype";

const DIMENSION_FRAMES = Object.freeze({
  security: {
    focus: "cómo la persona busca protección, suficiencia y tolerancia frente a la incertidumbre económica",
    intensity: {
      low: "La protección financiera ocupa un lugar relativamente bajo en la toma de decisiones.",
      medium: "La seguridad financiera tiene un peso moderado y suele activarse según las circunstancias.",
      high: "La protección de recursos, la prevención de pérdidas y la búsqueda de seguridad tienen un peso elevado.",
    },
    regulation: {
      low: "La preocupación o la sensación de insuficiencia pueden interferir con la capacidad de usar la seguridad como un recurso flexible.",
      medium: "La respuesta ante la incertidumbre suele ser razonable, aunque puede volverse más rígida bajo presión.",
      high: "La persona parece poder proteger recursos sin que la preocupación domine de forma constante sus decisiones.",
    },
    strengths: {
      low: "Puede existir apertura a usar recursos y aprovechar oportunidades sin una necesidad constante de protección.",
      medium: "Existe una sensibilidad suficiente para anticipar riesgos sin que necesariamente determine todas las decisiones.",
      high: "Hay una orientación clara a conservar recursos, anticipar contingencias y construir reservas.",
    },
    watch: {
      low: "Conviene verificar que la tolerancia a la incertidumbre no se convierta en preparación insuficiente.",
      medium: "Conviene observar qué ocurre cuando aumenta la presión o disminuye la certeza económica.",
      high: "Conviene vigilar que la búsqueda de seguridad no se convierta en acumulación defensiva, rigidez o dificultad para sentir que existe suficiente.",
    },
    actions: [
      "Definir explícitamente qué nivel de reserva o protección se considera suficiente para evitar metas móviles indefinidas.",
      "Separar decisiones de protección de decisiones de crecimiento o disfrute, usando criterios distintos para cada una.",
    ],
    reflections: [
      "¿Qué tendría que ser cierto para que sintieras que tienes suficiente seguridad financiera?",
      "¿Cuándo proteger recursos te ayuda y cuándo empieza a limitar decisiones que también son importantes para ti?",
    ],
  },
  planning: {
    focus: "cómo la persona organiza, anticipa, sostiene y revisa decisiones financieras",
    intensity: {
      low: "La estructura, el seguimiento y la anticipación financiera aparecen relativamente poco desarrollados.",
      medium: "Existe un nivel intermedio de organización y seguimiento, con variación entre situaciones.",
      high: "La planificación, el seguimiento y la orientación futura tienen un papel importante en el manejo del dinero.",
    },
    regulation: {
      low: "La adaptación a nueva información puede ser limitada o inconsistente.",
      medium: "La persona puede revisar decisiones en muchas situaciones, aunque no siempre con la misma facilidad.",
      high: "Existe buena capacidad para reconsiderar planes cuando las circunstancias justifican un cambio.",
    },
    strengths: {
      low: "Puede existir flexibilidad y capacidad de respuesta espontánea cuando la situación cambia.",
      medium: "Hay una base funcional para organizar obligaciones y metas sin depender de una estructura excesiva.",
      high: "Hay recursos claros de disciplina, anticipación, seguimiento y orientación a objetivos.",
    },
    watch: {
      low: "La falta de estructura puede aumentar la dependencia de decisiones urgentes o reactivas.",
      medium: "Conviene identificar qué áreas cuentan con planificación y cuáles siguen manejándose de forma principalmente reactiva.",
      high: "Una planificación fuerte sólo es protectora cuando también permite revisar supuestos y modificar planes obsoletos.",
    },
    actions: [
      "Convertir metas financieras generales en decisiones observables con fechas, montos y criterios de revisión.",
      "Incluir una revisión periódica para distinguir disciplina útil de persistencia en un plan que ya no es adecuado.",
    ],
    reflections: [
      "¿Qué parte de tus finanzas está bien planificada y qué parte sigue dependiendo de resolver problemas cuando ya son urgentes?",
      "¿Qué evidencia te hace cambiar un plan financiero importante?",
    ],
  },
  spontaneity: {
    focus: "cómo la persona equilibra disfrute inmediato, estímulos del momento y control de consecuencias financieras",
    intensity: {
      low: "Las decisiones espontáneas tienen relativamente poca influencia sobre el comportamiento financiero.",
      medium: "Existe apertura moderada a oportunidades y gastos no previstos.",
      high: "Los deseos, oportunidades y experiencias del presente tienen un peso elevado en las decisiones económicas.",
    },
    regulation: {
      low: "Las emociones, estímulos externos o decisiones del momento pueden desplazar con facilidad los límites previamente establecidos.",
      medium: "La persona suele conservar control, aunque existen contextos en los que éste disminuye.",
      high: "La espontaneidad parece coexistir con límites y capacidad para proteger obligaciones futuras.",
    },
    strengths: {
      low: "Existe deliberación y poca dependencia de estímulos inmediatos para decidir.",
      medium: "Hay capacidad para aprovechar oportunidades y disfrutar el presente sin que necesariamente dominen las decisiones.",
      high: "Existe apertura a experiencias, flexibilidad y capacidad para obtener valor del presente.",
    },
    watch: {
      low: "Un estilo muy contenido puede reducir flexibilidad o disfrute si toda desviación del plan se experimenta como problema.",
      medium: "Conviene identificar los contextos específicos en los que el gasto espontáneo deja de ser compatible con las prioridades financieras.",
      high: "Conviene diferenciar espontaneidad elegida de reactividad emocional, social o situacional.",
    },
    actions: [
      "Definir un margen explícito para gasto discrecional de modo que la espontaneidad no dependa de romper el plan.",
      "Identificar los dos o tres disparadores más frecuentes de gasto no previsto y decidir por adelantado cómo responder a ellos.",
    ],
    reflections: [
      "¿En qué situaciones el gasto espontáneo mejora tu vida y en cuáles suele dejar consecuencias que preferirías evitar?",
      "¿Qué emociones o contextos sociales cambian más tu forma habitual de decidir?",
    ],
  },
  status: {
    focus: "cómo el dinero, la comparación, la imagen y la percepción de éxito participan en la identidad personal",
    intensity: {
      low: "La imagen económica y la comparación social tienen relativamente poco peso consciente.",
      medium: "La persona reconoce el valor simbólico del dinero y de la posición económica en determinadas situaciones.",
      high: "La imagen, la comparación o las señales económicas tienen una influencia importante en la manera de evaluar decisiones o éxito.",
    },
    regulation: {
      low: "La valoración personal puede depender demasiado de señales económicas externas o de cómo se imagina la evaluación de otras personas.",
      medium: "Existe cierta independencia entre identidad y posición económica, aunque puede disminuir en contextos socialmente sensibles.",
      high: "La persona parece poder reconocer el valor social del dinero sin depender completamente de él para definir su valor personal.",
    },
    strengths: {
      low: "Puede existir menor interés por competir a través de señales económicas o materiales.",
      medium: "La persona puede utilizar la dimensión social del dinero de manera selectiva.",
      high: "Existe sensibilidad para comprender cómo calidad, presentación, posición o señales económicas funcionan socialmente.",
    },
    watch: {
      low: "Una baja orientación consciente al estatus no elimina necesariamente la posibilidad de sentirse insuficiente frente a comparaciones específicas.",
      medium: "Conviene observar cuándo una preferencia genuina se transforma en presión por mantener determinada impresión.",
      high: "Conviene distinguir objetivos propios de metas mantenidas principalmente para confirmar éxito, pertenencia o comparación.",
    },
    actions: [
      "Antes de una compra simbólicamente importante, separar el valor funcional, el valor personal y el valor de señal social de la decisión.",
      "Definir indicadores de éxito financiero propios que no dependan exclusivamente de ingresos, patrimonio o comparación con otras personas.",
    ],
    reflections: [
      "¿Qué decisiones económicas cambiarían si nadie más fuera a conocerlas?",
      "¿Qué significa para ti sentirte exitoso cuando eliminas la comparación con otras personas?",
    ],
  },
  giving: {
    focus: "cómo la persona utiliza dinero para ayudar y cómo protege límites propios y autonomía de otras personas",
    intensity: {
      low: "La ayuda económica a otras personas tiene un peso relativamente bajo o selectivo.",
      medium: "La ayuda forma parte del uso del dinero, pero su intensidad depende de la situación y de la relación.",
      high: "Ayudar, responder a necesidades de otras personas o asumir responsabilidad económica interpersonal tiene un peso elevado.",
    },
    regulation: {
      low: "Puede ser difícil establecer límites, proteger necesidades propias o separar ayuda de obligación, culpa o influencia.",
      medium: "Existen límites razonables, aunque determinadas relaciones pueden ejercer más presión que otras.",
      high: "La persona parece poder ayudar manteniendo criterios propios, necesidades futuras y autonomía del receptor.",
    },
    strengths: {
      low: "Puede existir claridad para separar recursos propios de responsabilidades que pertenecen a otras personas.",
      medium: "Hay disposición a apoyar sin que la ayuda necesariamente domine la organización financiera.",
      high: "Existe una orientación significativa hacia cooperación, apoyo y uso interpersonal del dinero.",
    },
    watch: {
      low: "Límites muy firmes pueden ser protectores, aunque conviene distinguirlos de desconexión o dificultad para colaborar cuando realmente se desea hacerlo.",
      medium: "Conviene identificar relaciones específicas en las que los límites cambian y por qué.",
      high: "Conviene vigilar que ayudar no sustituya responsabilidades ajenas ni comprometa seguridad, objetivos o autonomía personal.",
    },
    actions: [
      "Definir criterios previos para préstamos, regalos y apoyo económico, incluyendo un límite que proteja necesidades propias.",
      "Separar la decisión de ayudar de la expectativa de controlar cómo la otra persona utilizará posteriormente el dinero.",
    ],
    reflections: [
      "¿Qué hace que una solicitud económica sea difícil de rechazar para ti?",
      "¿Cuándo ayudar fortalece una relación y cuándo empieza a crear presión, resentimiento o dependencia?",
    ],
  },
  avoidance: {
    focus: "cómo la persona enfrenta información, errores, conversaciones y decisiones financieras incómodas",
    intensity: {
      low: "La persona tiende a enfrentar la información financiera en lugar de postergarla.",
      medium: "Algunos temas pueden generar postergación o incomodidad, aunque no de manera generalizada.",
      high: "La incomodidad, la preocupación o la dificultad para pedir ayuda pueden favorecer la postergación de temas financieros importantes.",
    },
    regulation: {
      low: "Existen pocos mecanismos compensatorios para romper la postergación una vez que aparece.",
      medium: "La persona dispone de algunos recursos para retomar asuntos evitados, aunque su efectividad puede variar.",
      high: "Existe capacidad para revisar errores, conversar y actuar aun cuando el tema resulte incómodo.",
    },
    strengths: {
      low: "La persona puede enfrentar información y conversaciones con relativa rapidez.",
      medium: "Hay capacidad para actuar después de una incomodidad inicial en una parte importante de las situaciones.",
      high: "Existe conciencia de los temas que generan malestar, lo que permite identificar con claridad dónde se necesita una estrategia de afrontamiento.",
    },
    watch: {
      low: "Afrontar rápido no garantiza que existan suficientes herramientas técnicas para resolver el problema.",
      medium: "Conviene evitar que pequeños retrasos se conviertan en ciclos de urgencia y corrección.",
      high: "La postergación puede aumentar incertidumbre y costos precisamente porque reduce la información disponible para decidir.",
    },
    actions: [
      "Convertir los asuntos financieros incómodos en tareas pequeñas y fechadas, empezando por obtener información antes de intentar resolver todo el problema.",
      "Definir una persona, profesional o recurso al que acudir cuando un tema excede el conocimiento disponible.",
    ],
    reflections: [
      "¿Qué tipo de información financiera tiendes a posponer más y qué anticipas que ocurrirá si la revisas?",
      "¿Qué cambia cuando compartes un problema financiero antes de que se convierta en una urgencia?",
    ],
  },
});

const SPECIAL_CODE_NOTES = Object.freeze({
  S1: "La combinación merece atención porque preocupación y protección efectiva pueden estar desacopladas.",
  S3: "La prioridad interpretativa es distinguir prevención útil de una vigilancia que se mantiene incluso cuando la situación está razonablemente protegida.",
  S9: "La configuración es protectora cuando la reserva y la tolerancia a la incertidumbre permanecen al servicio de objetivos más amplios.",
  P1: "La principal oportunidad no es aumentar control indiscriminadamente, sino construir una estructura mínima que permita anticipar y revisar.",
  P3: "La disciplina ya existe; el foco debería estar en mejorar flexibilidad y criterios de revisión, no en añadir más rigidez.",
  P9: "La planificación puede funcionar como recurso transversal para compensar vulnerabilidades en otras dimensiones.",
  E3: "La interpretación debe centrarse en disparadores y contextos, evitando asumir una falta global de capacidad financiera.",
  E9: "La elevada espontaneidad no es necesariamente problemática cuando las obligaciones y límites permanecen protegidos.",
  ST3: "La comparación y la identidad económica merecen analizarse conjuntamente porque pueden cambiar el significado de otras decisiones financieras.",
  ST7: "La independencia entre identidad y riqueza puede funcionar como amortiguador frente a presión social o comparación.",
  G3: "La prioridad es distinguir generosidad elegida de sobreextensión, presión interpersonal o responsabilidad asumida por problemas ajenos.",
  G9: "La ayuda parece estar integrada con límites y respeto por la autonomía, una combinación potencialmente protectora.",
  EV3: "La evitación sostenida puede convertirse en un mecanismo central del perfil si también aparece vinculada con seguridad, planificación, estatus o espontaneidad.",
  EV7: "El afrontamiento proactivo puede ser un recurso protector aun cuando otras dimensiones muestren tensión.",
  EV9: "La aparente contradicción sugiere que el comportamiento probablemente dependa del dominio o del contexto específico.",
});

const AUTONOMY_CONTENT = Object.freeze({
  NA: {
    overview: "El módulo de autonomía y poder económico no fue aplicado y no debe utilizarse para modificar la interpretación de las otras dimensiones.",
    strengths: [], watchouts: [], actions: [], reflections: [],
  },
  A1: {
    overview: "No aparece un patrón amplio de restricciones económicas relacionales en las respuestas disponibles.",
    strengths: ["La interpretación de las otras dimensiones requiere menos ajustes por restricciones económicas externas reportadas."],
    watchouts: ["Una señal baja en este módulo no demuestra ausencia absoluta de dificultades relacionales; sólo describe las respuestas al cuestionario."],
    actions: ["Mantener claridad sobre acceso a información, participación en decisiones y disponibilidad razonable de recursos compartidos."],
    reflections: ["¿Sientes que puedes conocer, discutir y participar en las decisiones económicas que te afectan?"],
  },
  A2: {
    overview: "Aparece una señal focal de restricción o control económico que conviene interpretar en su contexto específico.",
    strengths: ["La señal parece concentrada más que generalizada."],
    watchouts: ["Conviene identificar si la conducta es aislada, histórica, situacional o parte de una dinámica más persistente."],
    actions: ["Distinguir con precisión qué decisión, acceso o recurso está involucrado y si la situación sigue vigente."],
    reflections: ["¿En qué circunstancias aparece la restricción y qué tan libre te sientes para cuestionarla?"],
  },
  A3: {
    overview: "Existe una señal focal de alta intensidad. Aunque no aparezca en muchas áreas, su intensidad justifica una interpretación contextual cuidadosa.",
    strengths: ["La amplitud limitada permite localizar mejor el ámbito que necesita atención."],
    watchouts: ["Una conducta focal puede ser importante aun cuando no exista un patrón amplio."],
    actions: ["Registrar qué recurso o decisión está afectado y qué alternativas reales existen para participar o discrepar."],
    reflections: ["¿Qué consecuencias anticipas si expresas desacuerdo sobre esa decisión económica?"],
  },
  A4: {
    overview: "Aparecen varias señales de restricción económica de intensidad moderada, por lo que algunas conductas financieras deben interpretarse dentro de ese contexto.",
    strengths: ["La identificación de áreas concretas permite diferenciar preferencia personal de limitación externa."],
    watchouts: ["No conviene atribuir automáticamente evitación, bajo gasto o dificultad de planificación a rasgos individuales."],
    actions: ["Revisar por separado acceso a información, participación en decisiones, disponibilidad de recursos y libertad para expresar desacuerdo."],
    reflections: ["¿Qué decisiones económicas puedes tomar libremente y cuáles dependen de autorización, información o reacción de otra persona?"],
  },
  A5: {
    overview: "Se reportan restricciones económicas multidimensionales de intensidad elevada. El contexto debe tener prioridad sobre explicaciones puramente personales.",
    strengths: ["Reconocer la dimensión contextual evita interpretar como defecto individual conductas que pueden estar condicionadas por el entorno."],
    watchouts: ["Las conclusiones sobre generosidad, evitación, planificación o espontaneidad requieren cautela atribucional."],
    actions: ["Priorizar claridad sobre acceso, información, participación y capacidad real de decisión antes de formular metas de comportamiento financiero."],
    reflections: ["¿Qué parte de tu forma actual de manejar dinero representa una elección y qué parte responde a restricciones del contexto?"],
  },
  A6: {
    overview: "Las señales de restricción económica aparecen en una parte amplia de los ámbitos evaluados. Aunque la intensidad media no sea máxima, la amplitud es interpretativamente relevante.",
    strengths: ["Diferenciar amplitud de intensidad permite reconocer un contexto extendido sin exagerar la gravedad de cada conducta individual."],
    watchouts: ["Una restricción amplia puede afectar conocimiento financiero, participación y confianza para actuar incluso sin episodios extremos."],
    actions: ["Mapear qué áreas de información, recursos y decisiones están disponibles de forma autónoma y cuáles no."],
    reflections: ["¿En cuántas áreas financieras importantes puedes participar con información suficiente y capacidad real de decisión?"],
  },
  A7: {
    overview: "Se reporta un patrón amplio e intenso de restricciones económicas. Las interpretaciones de comportamiento deben contextualizarse antes de atribuirse a personalidad o capacidad individual.",
    strengths: ["El módulo permite separar, al menos parcialmente, características personales de restricciones externas reportadas."],
    watchouts: ["No corresponde convertir este código en un diagnóstico; sí requiere reducir la certeza de explicaciones exclusivamente individuales."],
    actions: ["Priorizar evaluación contextual de acceso a recursos, información y participación antes de exigir cambios de conducta financiera."],
    reflections: ["¿Qué decisiones, recursos o información económica están realmente bajo tu control en este momento?"],
  },
  REVIEW: {
    overview: "La combinación de amplitud e intensidad es inusual y debe revisarse antes de interpretarse automáticamente.",
    strengths: [],
    watchouts: ["No utilizar esta configuración para conclusiones automáticas hasta verificar las respuestas."],
    actions: ["Revisar las respuestas 43–49 y confirmar que la escala fue comprendida correctamente."],
    reflections: ["¿Las respuestas reflejan con precisión tu experiencia y el período que tenías en mente al contestar?"],
  },
});

function contextParagraph(context) {
  if (!context) return null;
  const stateText = {
    base: "No se detectaron interacciones que cambien de forma importante la lectura base de esta dimensión.",
    amplified: "Otras dimensiones aumentan la relevancia interpretativa de este resultado.",
    buffered: "Existen recursos en otras dimensiones que pueden amortiguar parte de esta configuración.",
    tension: "Esta dimensión mantiene una tensión relevante con otra parte del perfil y puede expresarse de manera diferente según el contexto.",
    unchanged: "Las interacciones detectadas no cambian de forma importante la lectura base de esta dimensión.",
    slightly_heightened: "Otras dimensiones aumentan ligeramente la relevancia de este resultado.",
    heightened_concern: "Varias interacciones aumentan la relevancia interpretativa de este resultado.",
    slightly_buffered: "Existen recursos en otras dimensiones que pueden amortiguar parte de esta configuración.",
    buffered: "Existen factores protectores claros en otras dimensiones que deben considerarse junto con este resultado.",
    mixed: "La dimensión presenta simultáneamente factores que pueden intensificarla y recursos que pueden compensarla.",
    contextualized: "El significado de esta dimensión depende de información contextual de otras áreas.",
    context_priority: "El contexto detectado tiene prioridad y reduce la certeza de atribuir este resultado exclusivamente a características individuales.",
    contextDependent: "El significado de esta dimensión depende de información contextual y debe interpretarse con menor certeza atribucional.",
  };
  return stateText[context.state] ?? null;
}

export function getDimensionNarrative(dimensionResult, context = null) {
  const key = dimensionResult.dimension;
  const code = dimensionResult.pattern.code;

  if (key === "autonomy") {
    const content = AUTONOMY_CONTENT[code] ?? AUTONOMY_CONTENT.REVIEW;
    return {
      dimension: key,
      label: DIMENSION_LABELS[key],
      code,
      pattern: dimensionResult.pattern.label,
      baseSummary: dimensionResult.pattern.summary,
      focus: "experiencias reportadas de acceso, participación, información y poder económico dentro de relaciones",
      overview: content.overview,
      context: contextParagraph(context),
      strengths: [...content.strengths],
      watchouts: [...content.watchouts],
      actions: [...content.actions],
      reflections: [...content.reflections],
      attributionConfidence: context?.attributionConfidence ?? "high",
    };
  }

  const frame = DIMENSION_FRAMES[key];
  const intensityLevel = dimensionResult.intensity.level;
  const regulationLevel = dimensionResult.regulation.level;
  const special = SPECIAL_CODE_NOTES[code] ?? null;

  return {
    dimension: key,
    label: DIMENSION_LABELS[key],
    code,
    pattern: dimensionResult.pattern.label,
    baseSummary: dimensionResult.pattern.summary,
    focus: frame.focus,
    overview: `${dimensionResult.pattern.summary} ${frame.intensity[intensityLevel]} ${frame.regulation[regulationLevel]}`,
    specialNote: special,
    context: contextParagraph(context),
    strengths: [frame.strengths[intensityLevel]],
    watchouts: [frame.watch[intensityLevel]],
    actions: [...frame.actions],
    reflections: [...frame.reflections],
    attributionConfidence: context?.attributionConfidence ?? "high",
  };
}

export function validateDimensionNarrativeCoverage(result) {
  const errors = [];
  for (const [key, dimension] of Object.entries(result.dimensions ?? {})) {
    try {
      const narrative = getDimensionNarrative(dimension, null);
      if (!narrative?.overview) errors.push(`Sin narrativa para ${key}:${dimension.pattern?.code}`);
    } catch (error) {
      errors.push(`${key}:${dimension.pattern?.code} -> ${error.message}`);
    }
  }
  return { ok: errors.length === 0, errors };
}
