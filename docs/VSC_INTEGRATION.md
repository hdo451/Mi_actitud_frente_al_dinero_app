# Integración en VS Code

## Qué debes subir

La carpeta completa `money-profile-engine-v04-complete` es autocontenida. Si ya tienes una versión anterior en tu proyecto, la forma más segura es reemplazar la carpeta del engine completa y no mezclar archivos v0.2/v0.3 con v0.4.

Archivos de runtime que necesita la app:

```text
money-profile-engine.js
src/core.js
src/pair-signals.js
src/emergent-patterns.js
src/context-overrides.js
src/narrative-resolver.js
src/analysis.js
src/report.js
src/correlations.js
src/index.js
package.json
```

Archivos que no son necesarios en producción pero conviene conservar:

```text
README.md
docs/VSC_INTEGRATION.md
docs/PAIR_SIGNALS_SPEC.md
examples/
tests/
```

## Opción recomendada: copiar como módulo interno

Supongamos que tu app tiene esta estructura:

```text
my-app/
  src/
  package.json
```

Copia la carpeta completa dentro del proyecto:

```text
my-app/
  money-profile-engine/
    src/
    money-profile-engine.js
    package.json
    ...
  src/
    ...
```

Luego importa desde tu app:

```js
import {
  getQuestionnaireDefinition,
  generateMoneyProfileReport,
} from "../money-profile-engine/money-profile-engine.js";
```

Ajusta `../` según la ubicación real del archivo que hace el import.

## Renderizar las 49 preguntas

```js
import { getQuestionnaireDefinition } from "../money-profile-engine/money-profile-engine.js";

const questionnaire = getQuestionnaireDefinition();

console.log(questionnaire.questions);
console.log(questionnaire.responseScale);
```

Cada respuesta debe guardarse como número entero 1, 2, 3, 4, 5 o 6.

Puedes mantenerlas como array:

```js
const answers = [
  4, 5, 3, 6, // ... hasta 49
];
```

O como objeto:

```js
const answers = {
  1: 4,
  2: 5,
  3: 3,
  // ...
  49: 6,
};
```

## Obtener el reporte completo

```js
import { generateMoneyProfileReport } from "../money-profile-engine/money-profile-engine.js";

const report = generateMoneyProfileReport(answers, {
  autonomyApplicable: true,
  maxPrimary: 3,
  maxSecondary: 2,
});
```

La estructura principal resultante es:

```js
{
  primaryProfile,
  dimensions,
  executiveSummary,
  primaryInsights,
  secondaryInsights,
  centralDimensions,
  technical,
  notices
}
```

## Qué mostrar al usuario

Para una interfaz rápida recomendamos mostrar:

```js
report.executiveSummary
report.primaryInsights
report.secondaryInsights
report.dimensions
```

No recomendamos mostrar al usuario final, salvo en un panel profesional o de depuración:

```js
report.technical.matchedPairSignals
report.technical.pairSignalCentrality
report.technical.activeOverrides
```

Esos campos explican cómo llegó el motor al resultado y son útiles para auditoría.

## Si las preguntas 43-49 no aplican

No las conviertas artificialmente a 1.

```js
const report = generateMoneyProfileReport(answers, {
  autonomyApplicable: false,
});
```

En ese caso las respuestas 43-49 pueden quedar vacías/null según cómo construyas el objeto que envías al engine.

## Flujo interno

```text
49 respuestas
   ↓
core.js
   ↓
7 dimensiones base
   ↓
pair-signals.js
   ↓
emergent-patterns.js
   ↓
context-overrides.js
   ↓
narrative-resolver.js
   ↓
report.js
   ↓
JSON para UI / API / LLM
```

## Regla crítica

Nunca uses un LLM para recalcular los scores. El LLM, si se usa, debe recibir el JSON ya calculado y sólo redactar una narrativa más extensa.

Ejemplo de payload para un LLM:

```js
const llmPayload = {
  primaryProfile: report.primaryProfile,
  primaryInsights: report.primaryInsights,
  secondaryInsights: report.secondaryInsights,
  dimensions: report.dimensions,
  notices: report.notices,
};
```

## React

Ejemplo mínimo:

```jsx
import { useMemo, useState } from "react";
import {
  getQuestionnaireDefinition,
  generateMoneyProfileReport,
} from "../money-profile-engine/money-profile-engine.js";

export default function MoneyTest() {
  const q = useMemo(() => getQuestionnaireDefinition(), []);
  const [answers, setAnswers] = useState({});
  const [report, setReport] = useState(null);

  function setAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: Number(value) }));
  }

  function finish() {
    setReport(generateMoneyProfileReport(answers));
  }

  return (
    <div>
      {q.questions.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
          <select
            value={answers[item.id] ?? ""}
            onChange={(e) => setAnswer(item.id, e.target.value)}
          >
            <option value="">Selecciona</option>
            {[1,2,3,4,5,6].map((n) => (
              <option key={n} value={n}>{n} - {q.responseScale[n]}</option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={finish}>Ver resultado</button>
      {report && <pre>{JSON.stringify(report, null, 2)}</pre>}
    </div>
  );
}
```

## Verificar después de copiar

Abre la terminal integrada de VS Code dentro de la carpeta del engine y ejecuta:

```bash
npm test
```

Debe terminar con los mensajes:

```text
Self-test passed.
Pair-signals self-test passed.
Full-pipeline self-test passed.
```

También puedes ejecutar:

```bash
npm run demo:full
```

## No mezclar versiones

Si tu app todavía importa funciones antiguas como:

```js
import { generateQuickReport } from "...";
```

v0.4 mantiene ese alias por compatibilidad. Aun así, para código nuevo usa:

```js
generateMoneyProfileReport
```

## Producción

Antes de desplegar públicamente:

1. Guarda `instrumentVersion`, `analysisVersion` y `reportVersion` con cada evaluación.
2. Guarda las 49 respuestas originales además de los resultados derivados.
3. No llames a los resultados diagnósticos clínicos.
4. Mantén `technical` disponible para auditoría, aunque no se muestre al usuario.
5. Cuando existan datos de pilotaje, recalibra reglas sin sobrescribir evaluaciones históricas.
