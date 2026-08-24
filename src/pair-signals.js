/**
 * Money Profile Engine - Layer 1 Pair Signals v0.3.0-working
 *
 * Purpose:
 * - Detect simple, deterministic interactions between the 7 base dimensions.
 * - Preserve base scores/codes from core.js; this layer NEVER rescales them.
 * - Feed later layers: emergent patterns, context overrides and narrative resolution.
 *
 * Scientific status:
 * - These rules are theory-driven hypotheses, not observed statistical correlations.
 * - causalClaimAllowed is false for every rule in this version.
 * - Thresholds and rule membership must be tested and recalibrated with pilot data.
 */

export const PAIR_SIGNAL_VERSION = "0.3.0-working";

export const PAIR_SIGNAL_TYPES = Object.freeze([
  "amplifies",
  "buffers",
  "tension",
  "contextualizes",
  "reinforces",
  "compounds",
]);

export const PAIR_SIGNAL_STRENGTH = Object.freeze({
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
});

export const PAIR_SIGNALS = Object.freeze([
  {
    "id": "SP01",
    "dimensions": [
      "security",
      "planning"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3"
        ],
        "planning": [
          "P1",
          "P2"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 90,
    "affects": [
      "security",
      "planning"
    ],
    "patternCandidate": "THREAT_WITHOUT_STRUCTURE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Preocupación con poca estructura protectora",
    "summary": "La necesidad de seguridad coincide con una planificación frágil o baja, por lo que la preocupación puede no traducirse en acciones preventivas consistentes."
  },
  {
    "id": "SP02",
    "dimensions": [
      "security",
      "planning"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3",
          "S6"
        ],
        "planning": [
          "P8",
          "P9"
        ]
      }
    },
    "type": "buffers",
    "strength": "high",
    "priority": 82,
    "affects": [
      "security"
    ],
    "patternCandidate": "PLANNED_SECURITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La planificación puede canalizar la necesidad de seguridad",
    "summary": "La orientación hacia seguridad aparece acompañada de recursos sólidos de planificación y adaptación, que pueden funcionar como factor protector."
  },
  {
    "id": "SP03",
    "dimensions": [
      "security",
      "planning"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S3",
          "S6"
        ],
        "planning": [
          "P3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 95,
    "affects": [
      "security",
      "planning"
    ],
    "patternCandidate": "DEFENSIVE_FINANCIAL_CONTROL",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Seguridad y planificación pueden convertirse en rigidez",
    "summary": "La búsqueda de protección y una planificación poco flexible pueden reforzarse mutuamente y dificultar la adaptación a nueva información."
  },
  {
    "id": "SE01",
    "dimensions": [
      "security",
      "spontaneity"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3"
        ],
        "spontaneity": [
          "E2",
          "E3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 95,
    "affects": [
      "security",
      "spontaneity"
    ],
    "patternCandidate": "CONTROL_REBOUND",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Preocupación y gasto reactivo pueden formar un ciclo",
    "summary": "La necesidad de seguridad coexiste con decisiones reactivas que pueden amenazar precisamente la seguridad que la persona intenta proteger."
  },
  {
    "id": "SE02",
    "dimensions": [
      "security",
      "spontaneity"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S8",
          "S9"
        ],
        "spontaneity": [
          "E8",
          "E9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 55,
    "affects": [
      "security",
      "spontaneity"
    ],
    "patternCandidate": "SAFE_SPONTANEITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Protección y disfrute pueden coexistir",
    "summary": "La persona parece capaz de proteger recursos futuros y, al mismo tiempo, permitir gastos espontáneos sin perder control."
  },
  {
    "id": "SE03",
    "dimensions": [
      "security",
      "spontaneity"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3",
          "S6"
        ],
        "spontaneity": [
          "E6"
        ]
      }
    },
    "type": "tension",
    "strength": "medium",
    "priority": 72,
    "affects": [
      "security",
      "spontaneity"
    ],
    "patternCandidate": "PRESENT_FUTURE_TENSION",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Existe tensión entre protección y orientación al presente",
    "summary": "Una fuerte necesidad de seguridad convive con una elevada apertura a gastar o responder al momento; el equilibrio puede depender del contexto."
  },
  {
    "id": "SST01",
    "dimensions": [
      "security",
      "status"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3",
          "S6"
        ],
        "status": [
          "ST2",
          "ST3",
          "ST6"
        ]
      }
    },
    "type": "amplifies",
    "strength": "high",
    "priority": 90,
    "affects": [
      "security"
    ],
    "patternCandidate": "RELATIVE_INSECURITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La sensación de suficiencia puede depender de comparación social",
    "summary": "La seguridad económica y la valoración del estatus aparecen simultáneamente elevadas; la referencia de 'suficiente' puede desplazarse según el grupo de comparación."
  },
  {
    "id": "SST02",
    "dimensions": [
      "security",
      "status"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S8",
          "S9"
        ],
        "status": [
          "ST8",
          "ST9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 45,
    "affects": [
      "security",
      "status"
    ],
    "patternCandidate": "STRATEGIC_STATUS_WITH_SECURITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Estatus y seguridad pueden utilizarse de manera estratégica",
    "summary": "La persona parece poder atender imagen, calidad o posición sin comprometer de forma importante su sensación de seguridad."
  },
  {
    "id": "SST03",
    "dimensions": [
      "security",
      "status"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3"
        ],
        "status": [
          "ST7"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 58,
    "affects": [
      "security"
    ],
    "patternCandidate": "IDENTITY_BUFFER_FOR_SECURITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Una identidad independiente del dinero puede amortiguar inseguridad",
    "summary": "Aunque exista preocupación financiera, una valoración personal menos dependiente del patrimonio puede reducir el componente comparativo de esa preocupación."
  },
  {
    "id": "SG01",
    "dimensions": [
      "security",
      "giving"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S1",
          "S2",
          "S3"
        ],
        "giving": [
          "G2",
          "G3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 92,
    "affects": [
      "security",
      "giving"
    ],
    "patternCandidate": "SACRIFICED_SECURITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Ayudar puede competir con la propia seguridad",
    "summary": "La dificultad para poner límites a la ayuda coincide con una seguridad frágil o ansiosa, aumentando el riesgo de comprometer necesidades propias."
  },
  {
    "id": "SG02",
    "dimensions": [
      "security",
      "giving"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S8",
          "S9"
        ],
        "giving": [
          "G8",
          "G9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 50,
    "affects": [
      "security",
      "giving"
    ],
    "patternCandidate": "SUSTAINABLE_GIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Generosidad y protección propia aparecen equilibradas",
    "summary": "La ayuda económica parece compatible con una protección razonable de las propias necesidades y recursos futuros."
  },
  {
    "id": "SG03",
    "dimensions": [
      "security",
      "giving"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3"
        ],
        "giving": [
          "G8",
          "G9"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 52,
    "affects": [
      "security"
    ],
    "patternCandidate": "BOUNDARIES_BUFFER_SECURITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Los límites interpersonales pueden proteger la seguridad",
    "summary": "Aunque exista preocupación por seguridad, los límites relativamente claros al ayudar reducen la probabilidad de que otras personas agraven esa vulnerabilidad."
  },
  {
    "id": "SAV01",
    "dimensions": [
      "security",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3"
        ],
        "avoidance": [
          "EV3",
          "EV6"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "security",
      "avoidance"
    ],
    "patternCandidate": "SECURITY_AVOIDANCE_LOOP",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Seguridad y evitación pueden reforzarse",
    "summary": "La preocupación por seguridad coincide con postergación o evitación; menos claridad financiera puede mantener la incertidumbre que alimenta la preocupación."
  },
  {
    "id": "SAV02",
    "dimensions": [
      "security",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3"
        ],
        "avoidance": [
          "EV7",
          "EV8"
        ]
      }
    },
    "type": "buffers",
    "strength": "high",
    "priority": 65,
    "affects": [
      "security"
    ],
    "patternCandidate": "SECURITY_WITH_ACTIVE_COPING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "El afrontamiento puede limitar el efecto de la preocupación",
    "summary": "Aunque existe sensibilidad hacia la seguridad, la capacidad de enfrentar problemas financieros puede impedir que la preocupación se convierta en un ciclo de evitación."
  },
  {
    "id": "SAV03",
    "dimensions": [
      "security",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S8",
          "S9"
        ],
        "avoidance": [
          "EV7"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 45,
    "affects": [
      "security",
      "avoidance"
    ],
    "patternCandidate": "PREVENTIVE_FINANCIAL_COPING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Protección y afrontamiento preventivo aparecen alineados",
    "summary": "La persona parece combinar orientación preventiva con disposición a revisar problemas y actuar antes de que se conviertan en crisis."
  },
  {
    "id": "SA01",
    "dimensions": [
      "security",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S2",
          "S3",
          "S6"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "security"
    ],
    "patternCandidate": "CONTEXTUAL_HYPERVIGILANCE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La necesidad de seguridad requiere contexto relacional",
    "summary": "La preocupación o vigilancia financiera aparece junto con señales de control económico; no debe atribuirse automáticamente a personalidad sin considerar experiencias de restricción."
  },
  {
    "id": "SA02",
    "dimensions": [
      "security",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S8",
          "S9"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "high",
    "priority": 95,
    "affects": [
      "security"
    ],
    "patternCandidate": "PROTECTIVE_RESOURCE_CONTROL",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La protección de recursos puede cumplir una función de autonomía",
    "summary": "Una fuerte orientación a proteger recursos puede funcionar parcialmente como estrategia de autonomía dentro de un contexto económico restrictivo."
  },
  {
    "id": "SA03",
    "dimensions": [
      "security",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "security": [
          "S1",
          "S2"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "security",
      "autonomy"
    ],
    "patternCandidate": "FINANCIAL_VULNERABILITY_CONTEXT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Baja protección y restricciones externas pueden aumentar vulnerabilidad",
    "summary": "Una seguridad financiera débil coincide con señales de control económico, combinación que puede reducir la capacidad de afrontar cambios o pérdidas de apoyo."
  },
  {
    "id": "PE01",
    "dimensions": [
      "planning",
      "spontaneity"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P1",
          "P2",
          "P4"
        ],
        "spontaneity": [
          "E2",
          "E3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 95,
    "affects": [
      "planning",
      "spontaneity"
    ],
    "patternCandidate": "UNSTRUCTURED_REACTIVITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Baja estructura y gasto reactivo pueden reforzarse",
    "summary": "La falta de planificación consistente coincide con decisiones reactivas, aumentando la dependencia de circunstancias momentáneas."
  },
  {
    "id": "PE02",
    "dimensions": [
      "planning",
      "spontaneity"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "spontaneity": [
          "E8",
          "E9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 55,
    "affects": [
      "planning",
      "spontaneity"
    ],
    "patternCandidate": "STRUCTURED_FLEXIBILITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Planificación y espontaneidad pueden coexistir de forma adaptativa",
    "summary": "Existe alta organización junto con capacidad para disfrutar o responder a oportunidades sin comprometer obligaciones."
  },
  {
    "id": "PE03",
    "dimensions": [
      "planning",
      "spontaneity"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P3"
        ],
        "spontaneity": [
          "E3",
          "E6"
        ]
      }
    },
    "type": "tension",
    "strength": "high",
    "priority": 92,
    "affects": [
      "planning",
      "spontaneity"
    ],
    "patternCandidate": "PLAN_REBOUND_CYCLE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Rigidez y ruptura del plan pueden alternarse",
    "summary": "Un estilo de planificación rígido coincide con reactividad o fuerte orientación al presente, creando tensión entre control y desviación."
  },
  {
    "id": "PST01",
    "dimensions": [
      "planning",
      "status"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P1",
          "P2",
          "P4"
        ],
        "status": [
          "ST3",
          "ST6"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 85,
    "affects": [
      "status"
    ],
    "patternCandidate": "STATUS_WITHOUT_STRUCTURE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La imagen puede influir sin suficiente contención financiera",
    "summary": "La sensibilidad a estatus aparece junto con planificación baja o frágil, aumentando la posibilidad de que objetivos de imagen tengan costos futuros poco anticipados."
  },
  {
    "id": "PST02",
    "dimensions": [
      "planning",
      "status"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "status": [
          "ST8",
          "ST9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 45,
    "affects": [
      "planning",
      "status"
    ],
    "patternCandidate": "STRATEGIC_STATUS_PLANNING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La imagen puede gestionarse de forma deliberada",
    "summary": "La persona parece integrar consideraciones de imagen o posición dentro de una planificación sólida y relativamente flexible."
  },
  {
    "id": "PST03",
    "dimensions": [
      "planning",
      "status"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "status": [
          "ST3"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "high",
    "priority": 72,
    "affects": [
      "planning",
      "status"
    ],
    "patternCandidate": "IMAGE_DRIVEN_PLANNING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La capacidad de planificación no revela por sí sola la motivación de los objetivos",
    "summary": "Existe planificación sólida, pero algunos objetivos pueden estar influidos por validación económica o comparación social."
  },
  {
    "id": "PG01",
    "dimensions": [
      "planning",
      "giving"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P1",
          "P2"
        ],
        "giving": [
          "G2",
          "G3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 92,
    "affects": [
      "planning",
      "giving"
    ],
    "patternCandidate": "UNPLANNED_OVERGIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Poca estructura y límites débiles pueden comprometer recursos",
    "summary": "La sobreextensión hacia otras personas coincide con planificación insuficiente para proteger necesidades propias."
  },
  {
    "id": "PG02",
    "dimensions": [
      "planning",
      "giving"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "giving": [
          "G8",
          "G9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 50,
    "affects": [
      "planning",
      "giving"
    ],
    "patternCandidate": "SUSTAINABLE_PLANNED_GIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La generosidad parece integrada en una planificación sostenible",
    "summary": "La ayuda económica se combina con organización, previsión y límites relativamente claros."
  },
  {
    "id": "PG03",
    "dimensions": [
      "planning",
      "giving"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "giving": [
          "G2",
          "G3"
        ]
      }
    },
    "type": "tension",
    "strength": "high",
    "priority": 78,
    "affects": [
      "giving"
    ],
    "patternCandidate": "RELATIONAL_PLAN_BREACH",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Las relaciones pueden romper planes que funcionan bien en otros ámbitos",
    "summary": "Existe alta capacidad general de planificación, pero la dificultad para limitar ayuda puede generar excepciones interpersonales relevantes."
  },
  {
    "id": "PEV01",
    "dimensions": [
      "planning",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P1",
          "P2"
        ],
        "avoidance": [
          "EV3",
          "EV6"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "planning",
      "avoidance"
    ],
    "patternCandidate": "REACTIVE_FINANCIAL_MANAGEMENT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Baja planificación y evitación pueden empujar a manejar problemas bajo presión",
    "summary": "Poca estructura coincide con postergación, favoreciendo que los asuntos financieros se atiendan cuando ya son urgentes."
  },
  {
    "id": "PEV02",
    "dimensions": [
      "planning",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "avoidance": [
          "EV7"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 58,
    "affects": [
      "planning",
      "avoidance"
    ],
    "patternCandidate": "PROACTIVE_FINANCIAL_MANAGEMENT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Planificación y afrontamiento forman una combinación protectora",
    "summary": "La persona parece anticipar, revisar información y actuar tempranamente frente a problemas financieros."
  },
  {
    "id": "PEV03",
    "dimensions": [
      "planning",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "avoidance": [
          "EV3",
          "EV6",
          "EV9"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "high",
    "priority": 88,
    "affects": [
      "avoidance"
    ],
    "patternCandidate": "DOMAIN_SPECIFIC_AVOIDANCE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La evitación parece específica y no una falta general de capacidad",
    "summary": "Una alta capacidad de planificación coexiste con evitación, sugiriendo que determinados temas, emociones o relaciones activan la postergación."
  },
  {
    "id": "PA01",
    "dimensions": [
      "planning",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P1",
          "P2"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "planning"
    ],
    "patternCandidate": "CONTEXTUALIZED_LOW_PLANNING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La baja planificación puede estar condicionada por restricciones externas",
    "summary": "Dificultades de organización financiera coinciden con señales de exclusión, falta de información o control económico; no deben atribuirse únicamente a habilidad individual."
  },
  {
    "id": "PA02",
    "dimensions": [
      "planning",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "planning",
      "autonomy"
    ],
    "patternCandidate": "BLOCKED_FINANCIAL_AGENCY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La capacidad de planificar puede estar bloqueada por el contexto",
    "summary": "Existe alta capacidad individual de planificación, pero el contexto relacional puede limitar la ejecución o control real de esas decisiones."
  },
  {
    "id": "PA03",
    "dimensions": [
      "planning",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "planning": [
          "P8",
          "P9"
        ],
        "autonomy": [
          "A1"
        ]
      }
    },
    "type": "reinforces",
    "strength": "low",
    "priority": 35,
    "affects": [
      "planning"
    ],
    "patternCandidate": "AUTONOMOUS_PLANNING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La planificación ocurre con autonomía económica relativamente conservada",
    "summary": "La alta planificación no coincide con un patrón amplio de control económico en las respuestas disponibles."
  },
  {
    "id": "ES01",
    "dimensions": [
      "spontaneity",
      "status"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3"
        ],
        "status": [
          "ST2",
          "ST3",
          "ST6"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 98,
    "affects": [
      "spontaneity",
      "status"
    ],
    "patternCandidate": "VALIDATION_SPENDING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Imagen social y gasto reactivo pueden interactuar",
    "summary": "La reactividad financiera coincide con sensibilidad a comparación o valoración económica; parte del gasto puede cumplir una función de validación o pertenencia."
  },
  {
    "id": "ES02",
    "dimensions": [
      "spontaneity",
      "status"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3",
          "E6"
        ],
        "status": [
          "ST7"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 50,
    "affects": [
      "spontaneity"
    ],
    "patternCandidate": "STATUS_INDEPENDENT_REACTIVITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Una identidad independiente del dinero reduce la explicación por estatus",
    "summary": "Existe gasto reactivo u orientación al presente, pero la valoración personal poco dependiente del dinero hace menos probable que el estatus sea su principal motor."
  },
  {
    "id": "ES03",
    "dimensions": [
      "spontaneity",
      "status"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E8",
          "E9"
        ],
        "status": [
          "ST8",
          "ST9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 48,
    "affects": [
      "spontaneity",
      "status"
    ],
    "patternCandidate": "REGULATED_SOCIAL_SPENDING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Imagen y espontaneidad pueden manejarse de forma regulada",
    "summary": "La persona puede atender calidad, experiencias o presentación sin señales fuertes de pérdida de control financiero."
  },
  {
    "id": "EG01",
    "dimensions": [
      "spontaneity",
      "giving"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3"
        ],
        "giving": [
          "G2",
          "G3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 95,
    "affects": [
      "spontaneity",
      "giving"
    ],
    "patternCandidate": "RELATIONAL_IMPULSIVITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Impulsividad y límites débiles pueden concentrarse en relaciones",
    "summary": "Las decisiones rápidas coinciden con dificultad para negar ayuda, aumentando la posibilidad de gastos o transferencias interpersonales no planificadas."
  },
  {
    "id": "EG02",
    "dimensions": [
      "spontaneity",
      "giving"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E7"
        ],
        "giving": [
          "G2",
          "G3"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "high",
    "priority": 70,
    "affects": [
      "giving"
    ],
    "patternCandidate": "RELATION_SPECIFIC_OVERGIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La dificultad parece interpersonal más que impulsiva en general",
    "summary": "La persona muestra poca espontaneidad global, pero puede tomar decisiones económicas poco convenientes específicamente frente a necesidades de otras personas."
  },
  {
    "id": "EG03",
    "dimensions": [
      "spontaneity",
      "giving"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E8",
          "E9"
        ],
        "giving": [
          "G8",
          "G9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 45,
    "affects": [
      "spontaneity",
      "giving"
    ],
    "patternCandidate": "SPONTANEOUS_GENEROSITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Generosidad espontánea con límites conservados",
    "summary": "Existe capacidad para responder rápidamente a otros o disfrutar dando sin comprometer de manera evidente las propias obligaciones."
  },
  {
    "id": "EEV01",
    "dimensions": [
      "spontaneity",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3"
        ],
        "avoidance": [
          "EV3",
          "EV6"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "spontaneity",
      "avoidance"
    ],
    "patternCandidate": "SPEND_AVOIDANCE_LOOP",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Gasto reactivo y evitación pueden formar un ciclo",
    "summary": "Decisiones no planificadas pueden generar consecuencias incómodas que luego son postergadas, reduciendo claridad y aumentando la probabilidad de nuevos problemas."
  },
  {
    "id": "EEV02",
    "dimensions": [
      "spontaneity",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3"
        ],
        "avoidance": [
          "EV7",
          "EV8"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 58,
    "affects": [
      "spontaneity"
    ],
    "patternCandidate": "ACCOUNTABLE_SPONTANEITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "El afrontamiento puede contener el impacto del gasto reactivo",
    "summary": "Aunque existen decisiones espontáneas o impulsivas, la persona tiende a revisar sus consecuencias y actuar posteriormente."
  },
  {
    "id": "EEV03",
    "dimensions": [
      "spontaneity",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E7"
        ],
        "avoidance": [
          "EV3"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "medium",
    "priority": 55,
    "affects": [
      "avoidance"
    ],
    "patternCandidate": "NON_SPENDING_AVOIDANCE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La evitación parece provenir de otros factores",
    "summary": "La baja espontaneidad hace menos probable que la evitación sea consecuencia principal del gasto impulsivo; conviene explorar otros detonantes."
  },
  {
    "id": "EA01",
    "dimensions": [
      "spontaneity",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "spontaneity"
    ],
    "patternCandidate": "CONTEXTUAL_FINANCIAL_REACTIVITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La reactividad financiera requiere interpretación relacional",
    "summary": "Parte de las decisiones reactivas puede estar influida por presión, restricciones o falta de control; no debe atribuirse automáticamente a impulsividad individual."
  },
  {
    "id": "EA02",
    "dimensions": [
      "spontaneity",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E7"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 98,
    "affects": [
      "spontaneity"
    ],
    "patternCandidate": "CONSTRAINED_SPENDING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La baja espontaneidad puede reflejar restricciones externas",
    "summary": "Un estilo muy contenido puede surgir de preferencias personales, limitaciones reales sobre el acceso al dinero o una combinación de ambas."
  },
  {
    "id": "EA03",
    "dimensions": [
      "spontaneity",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "spontaneity": [
          "E2",
          "E3"
        ],
        "autonomy": [
          "A1"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "low",
    "priority": 30,
    "affects": [
      "spontaneity"
    ],
    "patternCandidate": "INDIVIDUAL_REACTIVITY_CONTEXT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La reactividad no aparece acompañada de control económico amplio",
    "summary": "En ausencia de señales relacionales relevantes, los detonantes del gasto reactivo probablemente deban buscarse principalmente en factores personales o situacionales."
  },
  {
    "id": "STG01",
    "dimensions": [
      "status",
      "giving"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST2",
          "ST3"
        ],
        "giving": [
          "G2",
          "G3"
        ]
      }
    },
    "type": "compounds",
    "strength": "high",
    "priority": 95,
    "affects": [
      "status",
      "giving"
    ],
    "patternCandidate": "WORTH_THROUGH_GIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La ayuda puede estar conectada con aprobación o valor personal",
    "summary": "La necesidad de valoración económica coincide con límites débiles al dar; la generosidad podría cumplir también funciones de pertenencia, reconocimiento o identidad."
  },
  {
    "id": "STG02",
    "dimensions": [
      "status",
      "giving"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST7"
        ],
        "giving": [
          "G8",
          "G9"
        ]
      }
    },
    "type": "reinforces",
    "strength": "medium",
    "priority": 40,
    "affects": [
      "giving",
      "status"
    ],
    "patternCandidate": "AUTONOMOUS_SOCIAL_GENEROSITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La generosidad parece relativamente independiente del estatus",
    "summary": "La ayuda económica aparece con límites sólidos y una valoración personal poco dependiente de riqueza o comparación."
  },
  {
    "id": "STG03",
    "dimensions": [
      "status",
      "giving"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST2",
          "ST3"
        ],
        "giving": [
          "G8",
          "G9"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 45,
    "affects": [
      "status"
    ],
    "patternCandidate": "BOUNDARIED_STATUS_GIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Los límites al ayudar pueden contener la búsqueda de aprobación",
    "summary": "Aunque el dinero influye en la valoración personal, la capacidad de ayudar con límites reduce el riesgo de que la generosidad se convierta en sobreextensión."
  },
  {
    "id": "STEV01",
    "dimensions": [
      "status",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST2",
          "ST3",
          "ST6"
        ],
        "avoidance": [
          "EV3",
          "EV6"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "status",
      "avoidance"
    ],
    "patternCandidate": "IMAGE_REALITY_GAP",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La imagen económica y la evitación pueden reforzarse",
    "summary": "La dificultad para enfrentar información financiera puede aumentar cuando esa información amenaza la imagen económica deseada o la valoración personal."
  },
  {
    "id": "STEV02",
    "dimensions": [
      "status",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST2",
          "ST3"
        ],
        "avoidance": [
          "EV7"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 55,
    "affects": [
      "status"
    ],
    "patternCandidate": "STATUS_WITH_REALITY_TESTING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "El afrontamiento directo puede proteger frente al mantenimiento de apariencias",
    "summary": "Aunque la imagen económica sea importante, existe capacidad para revisar problemas y reducir la discrepancia entre percepción y realidad."
  },
  {
    "id": "STEV03",
    "dimensions": [
      "status",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST7",
          "ST8"
        ],
        "avoidance": [
          "EV3"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "medium",
    "priority": 50,
    "affects": [
      "avoidance"
    ],
    "patternCandidate": "NON_STATUS_AVOIDANCE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La evitación parece poco explicada por estatus",
    "summary": "La valoración personal relativamente independiente del dinero sugiere que la evitación financiera probablemente tenga otros detonantes."
  },
  {
    "id": "STA01",
    "dimensions": [
      "status",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST2",
          "ST3",
          "ST6"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "status"
    ],
    "patternCandidate": "STATUS_DEPENDENCY_VULNERABILITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La relación entre estatus y autoestima requiere contexto de autonomía",
    "summary": "La preocupación por posición o imagen aparece dentro de un contexto de autonomía económica comprometida y no debe interpretarse exclusivamente como rasgo individual."
  },
  {
    "id": "STA02",
    "dimensions": [
      "status",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST7",
          "ST8"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "high",
    "priority": 82,
    "affects": [
      "autonomy"
    ],
    "patternCandidate": "IDENTITY_RESOURCE_IN_CONTROL_CONTEXT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Una identidad independiente del dinero puede ser un recurso psicológico",
    "summary": "La persona parece separar valor personal y riqueza, aunque esa fortaleza no elimina restricciones económicas reales."
  },
  {
    "id": "STA03",
    "dimensions": [
      "status",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "status": [
          "ST2",
          "ST3",
          "ST6"
        ],
        "autonomy": [
          "A1"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "low",
    "priority": 30,
    "affects": [
      "status"
    ],
    "patternCandidate": "INDIVIDUAL_STATUS_CONTEXT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La sensibilidad al estatus no coincide con control económico amplio",
    "summary": "En ausencia de un patrón amplio de restricción económica, la dinámica de estatus probablemente se explique principalmente por factores personales y sociales."
  },
  {
    "id": "GEV01",
    "dimensions": [
      "giving",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "giving": [
          "G2",
          "G3"
        ],
        "avoidance": [
          "EV3",
          "EV6"
        ]
      }
    },
    "type": "compounds",
    "strength": "critical",
    "priority": 98,
    "affects": [
      "giving",
      "avoidance"
    ],
    "patternCandidate": "GIVING_AVOIDANCE_LOOP",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Sobreextensión y evitación pueden mantener un ciclo",
    "summary": "Ayudar sin límites claros puede generar consecuencias financieras que posteriormente se postergan o evitan, impidiendo renegociar esos límites."
  },
  {
    "id": "GEV02",
    "dimensions": [
      "giving",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "giving": [
          "G2",
          "G3"
        ],
        "avoidance": [
          "EV7",
          "EV8"
        ]
      }
    },
    "type": "buffers",
    "strength": "medium",
    "priority": 55,
    "affects": [
      "giving"
    ],
    "patternCandidate": "OVERGIVING_WITH_COPING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "El afrontamiento reduce parte del riesgo de límites débiles",
    "summary": "Aunque existe vulnerabilidad al sobreextenderse, la persona parece capaz de reconocer y enfrentar las consecuencias financieras."
  },
  {
    "id": "GEV03",
    "dimensions": [
      "giving",
      "avoidance"
    ],
    "trigger": {
      "codes": {
        "giving": [
          "G2"
        ],
        "avoidance": [
          "EV3",
          "EV6"
        ]
      }
    },
    "type": "amplifies",
    "strength": "high",
    "priority": 88,
    "affects": [
      "giving"
    ],
    "patternCandidate": "CONFLICT_AVOIDANT_GIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Dar puede funcionar como una forma de evitar conflicto",
    "summary": "La dificultad para decir no coincide con evitación; aceptar una solicitud económica puede reducir malestar o confrontación inmediata, aunque genere costos posteriores."
  },
  {
    "id": "GA01",
    "dimensions": [
      "giving",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "giving": [
          "G2",
          "G3",
          "G6"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "giving"
    ],
    "patternCandidate": "COERCION_SENSITIVE_GIVING",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La conducta de dar requiere contexto de poder",
    "summary": "La dificultad para establecer límites económicos ocurre junto con señales de control o restricción; no es posible atribuir toda transferencia a generosidad voluntaria."
  },
  {
    "id": "GA02",
    "dimensions": [
      "giving",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "giving": [
          "G8",
          "G9"
        ],
        "autonomy": [
          "A1"
        ]
      }
    },
    "type": "reinforces",
    "strength": "low",
    "priority": 35,
    "affects": [
      "giving"
    ],
    "patternCandidate": "AUTONOMOUS_GENEROSITY",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Generosidad con autonomía conservada",
    "summary": "La ayuda económica aparece acompañada de límites relativamente claros y sin un patrón amplio de control económico reportado."
  },
  {
    "id": "GA03",
    "dimensions": [
      "giving",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "giving": [
          "G7"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "high",
    "priority": 80,
    "affects": [
      "giving"
    ],
    "patternCandidate": "PROTECTIVE_WITHHOLDING_CONTEXT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "Una baja disposición a dar puede reflejar protección de recursos",
    "summary": "La poca orientación a ayudar no debe interpretarse automáticamente como falta de generosidad cuando existen restricciones o amenazas a la autonomía económica."
  },
  {
    "id": "EVA01",
    "dimensions": [
      "avoidance",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "avoidance": [
          "EV3",
          "EV6",
          "EV9"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "critical",
    "priority": 100,
    "affects": [
      "avoidance"
    ],
    "patternCandidate": "CONTEXTUAL_FINANCIAL_AVOIDANCE",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La evitación puede estar condicionada por la dinámica relacional",
    "summary": "La postergación, incomodidad o falta de información financiera coincide con restricciones económicas; parte del patrón puede responder al contexto y no sólo al individuo."
  },
  {
    "id": "EVA02",
    "dimensions": [
      "avoidance",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "avoidance": [
          "EV7",
          "EV8"
        ],
        "autonomy": [
          "A4",
          "A5",
          "A6",
          "A7"
        ]
      }
    },
    "type": "reinforces",
    "strength": "high",
    "priority": 85,
    "affects": [
      "autonomy"
    ],
    "patternCandidate": "COPING_UNDER_CONSTRAINT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "El afrontamiento puede funcionar como recurso dentro de un contexto restrictivo",
    "summary": "La persona conserva capacidad para revisar, conversar o actuar sobre asuntos financieros aun cuando existen señales de autonomía comprometida."
  },
  {
    "id": "EVA03",
    "dimensions": [
      "avoidance",
      "autonomy"
    ],
    "trigger": {
      "codes": {
        "avoidance": [
          "EV3",
          "EV6"
        ],
        "autonomy": [
          "A1"
        ]
      }
    },
    "type": "contextualizes",
    "strength": "low",
    "priority": 30,
    "affects": [
      "avoidance"
    ],
    "patternCandidate": "INDIVIDUAL_AVOIDANCE_CONTEXT",
    "evidenceLevel": "theoretical",
    "causalClaimAllowed": false,
    "reportEligible": true,
    "title": "La evitación no aparece acompañada de control económico amplio",
    "summary": "En ausencia de señales relacionales relevantes, la evitación probablemente requiera una explicación principalmente individual, emocional o experiencial."
  }
]);

const ALL_DIMENSIONS = Object.freeze([
  "security",
  "planning",
  "spontaneity",
  "status",
  "giving",
  "avoidance",
  "autonomy",
]);

function requireSurveyResult(result) {
  if (!result?.dimensions) {
    throw new TypeError(
      "evaluatePairSignals requiere el resultado de evaluateSurvey()."
    );
  }
}

function codeOf(result, dimension) {
  return result?.dimensions?.[dimension]?.pattern?.code ?? null;
}

function matchesCodes(result, codesByDimension) {
  return Object.entries(codesByDimension).every(([dimension, acceptedCodes]) => {
    const code = codeOf(result, dimension);
    return Array.isArray(acceptedCodes) && acceptedCodes.includes(code);
  });
}

function matchesRule(result, rule) {
  if (rule.dimensions.includes("autonomy")) {
    const autonomy = result?.dimensions?.autonomy;
    if (autonomy?.applicable === false) return false;
  }

  return matchesCodes(result, rule.trigger.codes);
}

function emptyCentrality() {
  return Object.fromEntries(
    ALL_DIMENSIONS.map((dimension) => [
      dimension,
      {
        signalCount: 0,
        prioritySum: 0,
        weightedSignalLoad: 0,
        byType: {
          amplifies: 0,
          buffers: 0,
          tension: 0,
          contextualizes: 0,
          reinforces: 0,
          compounds: 0,
        },
      },
    ])
  );
}

function buildCentrality(signals) {
  const centrality = emptyCentrality();

  for (const signal of signals) {
    const strengthWeight = PAIR_SIGNAL_STRENGTH[signal.strength] ?? 1;

    for (const dimension of signal.dimensions) {
      const node = centrality[dimension];
      node.signalCount += 1;
      node.prioritySum += signal.priority;
      node.weightedSignalLoad += signal.priority * strengthWeight;
      node.byType[signal.type] += 1;
    }
  }

  // Ranking only. This is NOT a psychometric score.
  const ranking = Object.entries(centrality)
    .sort(([, a], [, b]) => {
      if (b.weightedSignalLoad !== a.weightedSignalLoad) {
        return b.weightedSignalLoad - a.weightedSignalLoad;
      }
      return b.signalCount - a.signalCount;
    })
    .map(([dimension, metrics], index) => ({
      rank: index + 1,
      dimension,
      ...metrics,
    }));

  return { byDimension: centrality, ranking };
}

/**
 * Evaluates all 63 theory-driven pair signals.
 *
 * options:
 * - maxSignals: optional positive integer. Omit to return every matched signal.
 * - reportEligibleOnly: when true, excludes internal-only rules.
 */
export function evaluatePairSignals(
  result,
  { maxSignals = null, reportEligibleOnly = false } = {}
) {
  requireSurveyResult(result);

  let matched = PAIR_SIGNALS
    .filter((rule) => (!reportEligibleOnly || rule.reportEligible))
    .filter((rule) => matchesRule(result, rule))
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return (PAIR_SIGNAL_STRENGTH[b.strength] ?? 0) -
        (PAIR_SIGNAL_STRENGTH[a.strength] ?? 0);
    });

  if (maxSignals != null) {
    if (!Number.isInteger(maxSignals) || maxSignals <= 0) {
      throw new RangeError("maxSignals debe ser un entero positivo o null.");
    }
    matched = matched.slice(0, maxSignals);
  }

  const signals = matched.map((rule) => ({
    id: rule.id,
    dimensions: [...rule.dimensions],
    type: rule.type,
    strength: rule.strength,
    priority: rule.priority,
    affects: [...rule.affects],
    patternCandidate: rule.patternCandidate,
    evidenceLevel: rule.evidenceLevel,
    causalClaimAllowed: rule.causalClaimAllowed,
    reportEligible: rule.reportEligible,
    title: rule.title,
    summary: rule.summary,
    observedCodes: Object.fromEntries(
      rule.dimensions.map((dimension) => [dimension, codeOf(result, dimension)])
    ),
  }));

  return {
    version: PAIR_SIGNAL_VERSION,
    scientificStatus:
      "Interacciones teóricas predefinidas; no representan correlaciones estadísticas observadas ni permiten inferir causalidad.",
    signals,
    centrality: buildCentrality(signals),
  };
}

/**
 * Small validation utility useful in CI.
 */
export function validatePairSignalCatalog() {
  const ids = new Set();
  const pairSet = new Set();
  const errors = [];

  for (const rule of PAIR_SIGNALS) {
    if (ids.has(rule.id)) errors.push(`ID duplicado: ${rule.id}`);
    ids.add(rule.id);

    if (!PAIR_SIGNAL_TYPES.includes(rule.type)) {
      errors.push(`Tipo inválido en ${rule.id}: ${rule.type}`);
    }

    if (!(rule.strength in PAIR_SIGNAL_STRENGTH)) {
      errors.push(`Strength inválido en ${rule.id}: ${rule.strength}`);
    }

    if (!Number.isInteger(rule.priority) || rule.priority < 0 || rule.priority > 100) {
      errors.push(`Priority inválida en ${rule.id}: ${rule.priority}`);
    }

    if (rule.causalClaimAllowed !== false) {
      errors.push(`causalClaimAllowed debe ser false en ${rule.id}`);
    }

    if (!Array.isArray(rule.dimensions) || rule.dimensions.length !== 2) {
      errors.push(`Cada pair signal debe tener exactamente 2 dimensiones: ${rule.id}`);
    } else {
      const pair = [...rule.dimensions].sort().join("::");
      pairSet.add(pair);
    }
  }

  const expectedPairs = (ALL_DIMENSIONS.length * (ALL_DIMENSIONS.length - 1)) / 2;
  if (pairSet.size !== expectedPairs) {
    errors.push(
      `Se esperaban ${expectedPairs} pares cubiertos y se encontraron ${pairSet.size}.`
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    ruleCount: PAIR_SIGNALS.length,
    pairCount: pairSet.size,
    expectedPairs,
  };
}
