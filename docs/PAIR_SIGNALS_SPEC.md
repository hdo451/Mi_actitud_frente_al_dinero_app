# Layer 1: pair signals

Versión: 0.3.0-working

Este documento especifica la primera capa del motor de correlaciones/interacciones. La palabra "correlación" se usa aquí como nombre de producto; científicamente, estas reglas son interacciones teóricas predefinidas hasta que existan datos de pilotaje que permitan estimar asociaciones empíricas.

## Principios

- Los scores y códigos base de las 7 dimensiones nunca se modifican.
- Una señal puede amplificar, amortiguar, tensionar, contextualizar, reforzar o combinar dos resultados.
- Ninguna señal permite afirmar causalidad.
- Autonomía/poder tiene prioridad contextual: un comportamiento observado no debe atribuirse automáticamente a personalidad cuando existen restricciones económicas externas.
- `priority`, `strength` y `weightedSignalLoad` son variables de ingeniería para ordenar resultados. No son escalas clínicas ni psicométricas.

## Cobertura

- 7 dimensiones.
- 21 pares posibles.
- 63 pair signals.
- 3 señales depuradas por cada par en esta primera versión.
- Cada señal puede proponer un `patternCandidate` para la futura capa 2.

## Catálogo

| ID | Par | Trigger | Tipo | Fuerza | Prioridad | Pattern candidate | Lectura rápida |
|---|---|---|---|---|---:|---|---|
| SP01 | security × planning | security: S2/S3 + planning: P1/P2 | compounds | high | 90 | `THREAT_WITHOUT_STRUCTURE` | Preocupación con poca estructura protectora |
| SP02 | security × planning | security: S2/S3/S6 + planning: P8/P9 | buffers | high | 82 | `PLANNED_SECURITY` | La planificación puede canalizar la necesidad de seguridad |
| SP03 | security × planning | security: S3/S6 + planning: P3 | compounds | high | 95 | `DEFENSIVE_FINANCIAL_CONTROL` | Seguridad y planificación pueden convertirse en rigidez |
| SE01 | security × spontaneity | security: S2/S3 + spontaneity: E2/E3 | compounds | high | 95 | `CONTROL_REBOUND` | Preocupación y gasto reactivo pueden formar un ciclo |
| SE02 | security × spontaneity | security: S8/S9 + spontaneity: E8/E9 | reinforces | medium | 55 | `SAFE_SPONTANEITY` | Protección y disfrute pueden coexistir |
| SE03 | security × spontaneity | security: S2/S3/S6 + spontaneity: E6 | tension | medium | 72 | `PRESENT_FUTURE_TENSION` | Existe tensión entre protección y orientación al presente |
| SST01 | security × status | security: S2/S3/S6 + status: ST2/ST3/ST6 | amplifies | high | 90 | `RELATIVE_INSECURITY` | La sensación de suficiencia puede depender de comparación social |
| SST02 | security × status | security: S8/S9 + status: ST8/ST9 | reinforces | medium | 45 | `STRATEGIC_STATUS_WITH_SECURITY` | Estatus y seguridad pueden utilizarse de manera estratégica |
| SST03 | security × status | security: S2/S3 + status: ST7 | buffers | medium | 58 | `IDENTITY_BUFFER_FOR_SECURITY` | Una identidad independiente del dinero puede amortiguar inseguridad |
| SG01 | security × giving | security: S1/S2/S3 + giving: G2/G3 | compounds | high | 92 | `SACRIFICED_SECURITY` | Ayudar puede competir con la propia seguridad |
| SG02 | security × giving | security: S8/S9 + giving: G8/G9 | reinforces | medium | 50 | `SUSTAINABLE_GIVING` | Generosidad y protección propia aparecen equilibradas |
| SG03 | security × giving | security: S2/S3 + giving: G8/G9 | buffers | medium | 52 | `BOUNDARIES_BUFFER_SECURITY` | Los límites interpersonales pueden proteger la seguridad |
| SAV01 | security × avoidance | security: S2/S3 + avoidance: EV3/EV6 | compounds | critical | 100 | `SECURITY_AVOIDANCE_LOOP` | Seguridad y evitación pueden reforzarse |
| SAV02 | security × avoidance | security: S2/S3 + avoidance: EV7/EV8 | buffers | high | 65 | `SECURITY_WITH_ACTIVE_COPING` | El afrontamiento puede limitar el efecto de la preocupación |
| SAV03 | security × avoidance | security: S8/S9 + avoidance: EV7 | reinforces | medium | 45 | `PREVENTIVE_FINANCIAL_COPING` | Protección y afrontamiento preventivo aparecen alineados |
| SA01 | security × autonomy | security: S2/S3/S6 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `CONTEXTUAL_HYPERVIGILANCE` | La necesidad de seguridad requiere contexto relacional |
| SA02 | security × autonomy | security: S8/S9 + autonomy: A4/A5/A6/A7 | contextualizes | high | 95 | `PROTECTIVE_RESOURCE_CONTROL` | La protección de recursos puede cumplir una función de autonomía |
| SA03 | security × autonomy | security: S1/S2 + autonomy: A4/A5/A6/A7 | compounds | critical | 100 | `FINANCIAL_VULNERABILITY_CONTEXT` | Baja protección y restricciones externas pueden aumentar vulnerabilidad |
| PE01 | planning × spontaneity | planning: P1/P2/P4 + spontaneity: E2/E3 | compounds | high | 95 | `UNSTRUCTURED_REACTIVITY` | Baja estructura y gasto reactivo pueden reforzarse |
| PE02 | planning × spontaneity | planning: P8/P9 + spontaneity: E8/E9 | reinforces | medium | 55 | `STRUCTURED_FLEXIBILITY` | Planificación y espontaneidad pueden coexistir de forma adaptativa |
| PE03 | planning × spontaneity | planning: P3 + spontaneity: E3/E6 | tension | high | 92 | `PLAN_REBOUND_CYCLE` | Rigidez y ruptura del plan pueden alternarse |
| PST01 | planning × status | planning: P1/P2/P4 + status: ST3/ST6 | compounds | high | 85 | `STATUS_WITHOUT_STRUCTURE` | La imagen puede influir sin suficiente contención financiera |
| PST02 | planning × status | planning: P8/P9 + status: ST8/ST9 | reinforces | medium | 45 | `STRATEGIC_STATUS_PLANNING` | La imagen puede gestionarse de forma deliberada |
| PST03 | planning × status | planning: P8/P9 + status: ST3 | contextualizes | high | 72 | `IMAGE_DRIVEN_PLANNING` | La capacidad de planificación no revela por sí sola la motivación de los objetivos |
| PG01 | planning × giving | planning: P1/P2 + giving: G2/G3 | compounds | high | 92 | `UNPLANNED_OVERGIVING` | Poca estructura y límites débiles pueden comprometer recursos |
| PG02 | planning × giving | planning: P8/P9 + giving: G8/G9 | reinforces | medium | 50 | `SUSTAINABLE_PLANNED_GIVING` | La generosidad parece integrada en una planificación sostenible |
| PG03 | planning × giving | planning: P8/P9 + giving: G2/G3 | tension | high | 78 | `RELATIONAL_PLAN_BREACH` | Las relaciones pueden romper planes que funcionan bien en otros ámbitos |
| PEV01 | planning × avoidance | planning: P1/P2 + avoidance: EV3/EV6 | compounds | critical | 100 | `REACTIVE_FINANCIAL_MANAGEMENT` | Baja planificación y evitación pueden empujar a manejar problemas bajo presión |
| PEV02 | planning × avoidance | planning: P8/P9 + avoidance: EV7 | reinforces | medium | 58 | `PROACTIVE_FINANCIAL_MANAGEMENT` | Planificación y afrontamiento forman una combinación protectora |
| PEV03 | planning × avoidance | planning: P8/P9 + avoidance: EV3/EV6/EV9 | contextualizes | high | 88 | `DOMAIN_SPECIFIC_AVOIDANCE` | La evitación parece específica y no una falta general de capacidad |
| PA01 | planning × autonomy | planning: P1/P2 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `CONTEXTUALIZED_LOW_PLANNING` | La baja planificación puede estar condicionada por restricciones externas |
| PA02 | planning × autonomy | planning: P8/P9 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `BLOCKED_FINANCIAL_AGENCY` | La capacidad de planificar puede estar bloqueada por el contexto |
| PA03 | planning × autonomy | planning: P8/P9 + autonomy: A1 | reinforces | low | 35 | `AUTONOMOUS_PLANNING` | La planificación ocurre con autonomía económica relativamente conservada |
| ES01 | spontaneity × status | spontaneity: E2/E3 + status: ST2/ST3/ST6 | compounds | critical | 98 | `VALIDATION_SPENDING` | Imagen social y gasto reactivo pueden interactuar |
| ES02 | spontaneity × status | spontaneity: E2/E3/E6 + status: ST7 | buffers | medium | 50 | `STATUS_INDEPENDENT_REACTIVITY` | Una identidad independiente del dinero reduce la explicación por estatus |
| ES03 | spontaneity × status | spontaneity: E8/E9 + status: ST8/ST9 | reinforces | medium | 48 | `REGULATED_SOCIAL_SPENDING` | Imagen y espontaneidad pueden manejarse de forma regulada |
| EG01 | spontaneity × giving | spontaneity: E2/E3 + giving: G2/G3 | compounds | high | 95 | `RELATIONAL_IMPULSIVITY` | Impulsividad y límites débiles pueden concentrarse en relaciones |
| EG02 | spontaneity × giving | spontaneity: E7 + giving: G2/G3 | contextualizes | high | 70 | `RELATION_SPECIFIC_OVERGIVING` | La dificultad parece interpersonal más que impulsiva en general |
| EG03 | spontaneity × giving | spontaneity: E8/E9 + giving: G8/G9 | reinforces | medium | 45 | `SPONTANEOUS_GENEROSITY` | Generosidad espontánea con límites conservados |
| EEV01 | spontaneity × avoidance | spontaneity: E2/E3 + avoidance: EV3/EV6 | compounds | critical | 100 | `SPEND_AVOIDANCE_LOOP` | Gasto reactivo y evitación pueden formar un ciclo |
| EEV02 | spontaneity × avoidance | spontaneity: E2/E3 + avoidance: EV7/EV8 | buffers | medium | 58 | `ACCOUNTABLE_SPONTANEITY` | El afrontamiento puede contener el impacto del gasto reactivo |
| EEV03 | spontaneity × avoidance | spontaneity: E7 + avoidance: EV3 | contextualizes | medium | 55 | `NON_SPENDING_AVOIDANCE` | La evitación parece provenir de otros factores |
| EA01 | spontaneity × autonomy | spontaneity: E2/E3 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `CONTEXTUAL_FINANCIAL_REACTIVITY` | La reactividad financiera requiere interpretación relacional |
| EA02 | spontaneity × autonomy | spontaneity: E7 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 98 | `CONSTRAINED_SPENDING` | La baja espontaneidad puede reflejar restricciones externas |
| EA03 | spontaneity × autonomy | spontaneity: E2/E3 + autonomy: A1 | contextualizes | low | 30 | `INDIVIDUAL_REACTIVITY_CONTEXT` | La reactividad no aparece acompañada de control económico amplio |
| STG01 | status × giving | status: ST2/ST3 + giving: G2/G3 | compounds | high | 95 | `WORTH_THROUGH_GIVING` | La ayuda puede estar conectada con aprobación o valor personal |
| STG02 | status × giving | status: ST7 + giving: G8/G9 | reinforces | medium | 40 | `AUTONOMOUS_SOCIAL_GENEROSITY` | La generosidad parece relativamente independiente del estatus |
| STG03 | status × giving | status: ST2/ST3 + giving: G8/G9 | buffers | medium | 45 | `BOUNDARIED_STATUS_GIVING` | Los límites al ayudar pueden contener la búsqueda de aprobación |
| STEV01 | status × avoidance | status: ST2/ST3/ST6 + avoidance: EV3/EV6 | compounds | critical | 100 | `IMAGE_REALITY_GAP` | La imagen económica y la evitación pueden reforzarse |
| STEV02 | status × avoidance | status: ST2/ST3 + avoidance: EV7 | buffers | medium | 55 | `STATUS_WITH_REALITY_TESTING` | El afrontamiento directo puede proteger frente al mantenimiento de apariencias |
| STEV03 | status × avoidance | status: ST7/ST8 + avoidance: EV3 | contextualizes | medium | 50 | `NON_STATUS_AVOIDANCE` | La evitación parece poco explicada por estatus |
| STA01 | status × autonomy | status: ST2/ST3/ST6 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `STATUS_DEPENDENCY_VULNERABILITY` | La relación entre estatus y autoestima requiere contexto de autonomía |
| STA02 | status × autonomy | status: ST7/ST8 + autonomy: A4/A5/A6/A7 | contextualizes | high | 82 | `IDENTITY_RESOURCE_IN_CONTROL_CONTEXT` | Una identidad independiente del dinero puede ser un recurso psicológico |
| STA03 | status × autonomy | status: ST2/ST3/ST6 + autonomy: A1 | contextualizes | low | 30 | `INDIVIDUAL_STATUS_CONTEXT` | La sensibilidad al estatus no coincide con control económico amplio |
| GEV01 | giving × avoidance | giving: G2/G3 + avoidance: EV3/EV6 | compounds | critical | 98 | `GIVING_AVOIDANCE_LOOP` | Sobreextensión y evitación pueden mantener un ciclo |
| GEV02 | giving × avoidance | giving: G2/G3 + avoidance: EV7/EV8 | buffers | medium | 55 | `OVERGIVING_WITH_COPING` | El afrontamiento reduce parte del riesgo de límites débiles |
| GEV03 | giving × avoidance | giving: G2 + avoidance: EV3/EV6 | amplifies | high | 88 | `CONFLICT_AVOIDANT_GIVING` | Dar puede funcionar como una forma de evitar conflicto |
| GA01 | giving × autonomy | giving: G2/G3/G6 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `COERCION_SENSITIVE_GIVING` | La conducta de dar requiere contexto de poder |
| GA02 | giving × autonomy | giving: G8/G9 + autonomy: A1 | reinforces | low | 35 | `AUTONOMOUS_GENEROSITY` | Generosidad con autonomía conservada |
| GA03 | giving × autonomy | giving: G7 + autonomy: A4/A5/A6/A7 | contextualizes | high | 80 | `PROTECTIVE_WITHHOLDING_CONTEXT` | Una baja disposición a dar puede reflejar protección de recursos |
| EVA01 | avoidance × autonomy | avoidance: EV3/EV6/EV9 + autonomy: A4/A5/A6/A7 | contextualizes | critical | 100 | `CONTEXTUAL_FINANCIAL_AVOIDANCE` | La evitación puede estar condicionada por la dinámica relacional |
| EVA02 | avoidance × autonomy | avoidance: EV7/EV8 + autonomy: A4/A5/A6/A7 | reinforces | high | 85 | `COPING_UNDER_CONSTRAINT` | El afrontamiento puede funcionar como recurso dentro de un contexto restrictivo |
| EVA03 | avoidance × autonomy | avoidance: EV3/EV6 + autonomy: A1 | contextualizes | low | 30 | `INDIVIDUAL_AVOIDANCE_CONTEXT` | La evitación no aparece acompañada de control económico amplio |

## Salida del motor

`evaluatePairSignals(evaluateSurvey(answers))` devuelve:

```js
{
  version,
  scientificStatus,
  signals: [
    {
      id,
      dimensions,
      type,
      strength,
      priority,
      affects,
      patternCandidate,
      title,
      summary,
      observedCodes
    }
  ],
  centrality: {
    byDimension,
    ranking
  }
}
```

La centralidad se utiliza únicamente para ayudar a las capas posteriores a decidir qué dimensiones organizan más interacciones en un perfil. No debe mostrarse al usuario como un score psicológico.

## Próxima capa

La capa 2 no debe convertir cada pair signal en un párrafo. Debe agrupar señales en patrones emergentes como:

- `SECURITY_AVOIDANCE_LOOP`
- `VALIDATION_SPENDING`
- `SPEND_AVOIDANCE_LOOP`
- `BLOCKED_FINANCIAL_AGENCY`
- `IMAGE_REALITY_GAP`
- `CONTEXTUAL_FINANCIAL_AVOIDANCE`

La presencia de un `patternCandidate` en una señal no significa que el patrón deba activarse automáticamente. La capa 2 deberá definir evidencia obligatoria, opcional, exclusiones y nivel de confianza.
