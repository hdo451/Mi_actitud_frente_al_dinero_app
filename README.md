# Money Profile Engine v0.4

Motor determinístico de interpretación para un cuestionario prototipo de 49 preguntas y 7 dimensiones de relación psicológica con el dinero.

## Estado

Esta versión completa implementa las cuatro capas diseñadas:

1. Pair Signals
2. Emergent Patterns
3. Context Overrides
4. Narrative Resolution

El instrumento sigue siendo un prototipo teórico. Las reglas de interacción no son correlaciones estadísticas observadas y los resultados no constituyen diagnóstico clínico.

## Arquitectura

```text
49 respuestas (1-6)
      ↓
core.js
      ↓
7 dimensiones base
      ↓
pair-signals.js
      ↓
63 señales entre los 21 pares de dimensiones
      ↓
emergent-patterns.js
      ↓
patrones de segundo y tercer orden
      ↓
context-overrides.js
      ↓
modificación de atribución/confianza, nunca del score base
      ↓
narrative-resolver.js
      ↓
3 insights principales + hasta 2 secundarios
      ↓
report.js
```

## Archivos

```text
money-profile-engine.js           punto de entrada externo
src/core.js                       49 preguntas + scoring base
src/pair-signals.js               Layer 1
src/emergent-patterns.js          Layer 2
src/context-overrides.js          Layer 3
src/narrative-resolver.js         Layer 4
src/analysis.js                   orquestador del pipeline
src/report.js                     reporte JSON determinístico
src/correlations.js               compatibilidad con versiones previas
src/index.js                      API pública
examples/                         ejemplos
 tests/                           pruebas automáticas
 docs/                            documentación de integración
```

## Uso mínimo

```js
import {
  getQuestionnaireDefinition,
  generateMoneyProfileReport,
} from "./money-profile-engine.js";

const questionnaire = getQuestionnaireDefinition();
const answers = Array(49).fill(3);
const report = generateMoneyProfileReport(answers);

console.log(report.executiveSummary);
console.log(report.primaryInsights);
```

## Qué nunca cambia por correlaciones

Las respuestas, scores y códigos base son inmutables. Si Security es `S3`, seguirá siendo `S3` después de las cuatro capas. El contexto puede marcarla como amplificada, amortiguada o dependiente del contexto, pero no recodificarla.

## Tests

```bash
npm test
```

## Probar la interfaz web

Como la aplicación usa módulos de JavaScript, ábrela desde un servidor local en lugar de abrir `index.html` directamente:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000`. La interfaz guarda el progreso y la última evaluación en el almacenamiento local del navegador; todavía no envía datos a Apps Script.

## Integración en VS Code

Ver `docs/VSC_INTEGRATION.md`.

## Uso con IA

El engine debe calcular scores y reglas. Un LLM sólo debería usarse después para transformar el JSON estructurado en un informe narrativo más largo. No se recomienda enviar las 49 respuestas al LLM y pedirle que improvise la puntuación.
