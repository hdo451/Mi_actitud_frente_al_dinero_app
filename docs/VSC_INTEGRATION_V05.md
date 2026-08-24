# Integración en VS Code — v0.5 deterministic report

Esta versión reemplaza la carpeta anterior del engine. No mezcles archivos de v0.2, v0.3, v0.4 y v0.5.

## 1. Copia la carpeta completa

Estructura recomendada:

```text
mi-app/
├── src/
│   └── ...
└── money-profile-engine/
    ├── money-profile-engine.js
    ├── package.json
    ├── src/
    ├── docs/
    ├── examples/
    └── tests/
```

Puedes renombrar `money-profile-engine-v05-deterministic-report` a `money-profile-engine` dentro de tu proyecto.

## 2. Verifica el engine

En la terminal de VS Code:

```bash
cd money-profile-engine
npm test
```

Deben pasar cuatro grupos de pruebas:

- core
- pair signals
- full pipeline
- professional deterministic report

También puedes ejecutar solamente el nuevo reporte:

```bash
npm run test:professional
```

## 3. Importa desde un solo punto

No importes manualmente los módulos internos. Usa el entry point:

```js
import {
  getQuestionnaireDefinition,
  generateProfessionalReport,
  professionalReportToText,
  professionalReportToHtml,
} from "../money-profile-engine/money-profile-engine.js";
```

Ajusta `../` según la ubicación real de tu archivo.

## 4. Renderiza las 49 preguntas

```js
const questionnaire = getQuestionnaireDefinition();

console.log(questionnaire.questions);
console.log(questionnaire.responseScale);
```

Guarda las respuestas como array de 49 números entre 1 y 6 o como objeto `{1: valor, ..., 49: valor}`.

## 5. Genera el reporte profesional sin IA

```js
const report = generateProfessionalReport(answers, {
  subjectName: "Nombre opcional",
  autonomyApplicable: true,
  mode: "professional",
  includeTechnical: false,
});
```

`report.metadata.usesGenerativeAI` siempre es `false` en este flujo.

El objeto incluye:

```text
metadata
executiveSummary
profileOverview
keyPatterns
primaryPatterns
secondaryPatterns
protectiveResources
tensionsAndContext
dimensions
interactions
recommendations
reflectionQuestions
methodology
notices
```

Si `includeTechnical: true`, agrega además la sección `technical` con pair signals, centralidad, emergent patterns y overrides.

## 6. Muestra el reporte en tu interfaz

Puedes construir componentes de React/Vue/Svelte directamente desde el JSON.

Ejemplo básico:

```js
const report = generateProfessionalReport(answers, options);

report.dimensions.forEach((dimension) => {
  console.log(dimension.label, dimension.code, dimension.narrative.overview);
});
```

## 7. Genera texto plano

```js
const text = professionalReportToText(report);
console.log(text);
```

Esto sirve para guardar, enviar o copiar el reporte sin depender de IA.

## 8. Genera HTML profesional

```js
const html = professionalReportToHtml(report);
```

En navegador puedes abrirlo en una nueva ventana:

```js
const blob = new Blob([html], { type: "text/html" });
const url = URL.createObjectURL(blob);
window.open(url, "_blank");
```

También puedes colocar el HTML en una ruta de tu backend y usar la impresión del navegador para generar PDF.

El renderer no llama a servicios externos ni a modelos de IA.

## 9. Si el módulo de autonomía no aplica

No conviertas las preguntas 43–49 en `1` automáticamente. Usa `null` y declara que el módulo no aplica:

```js
const report = generateProfessionalReport(answers, {
  autonomyApplicable: false,
});
```

En ese caso las respuestas 43–49 pueden ser `null`/`undefined` y el engine devolverá `autonomy.code = "NA"`.

## 10. Mantén una sola fuente de verdad

Tu app debe enviar las respuestas al engine y utilizar el JSON resultante. No dupliques reglas de scoring, correlaciones o textos interpretativos dentro de componentes de UI.

Recomendado:

```text
Formulario UI
   ↓
49 respuestas
   ↓
generateProfessionalReport()
   ↓
JSON del reporte
   ↓
React/Vue/Svelte/HTML
```

No recomendado:

```text
Formulario
↓
reglas copiadas en componentes
+
reglas del engine
+
textos duplicados
```

Esto último dificulta mantener versiones y puede producir resultados contradictorios.

## 11. API anterior

Las funciones anteriores siguen disponibles para compatibilidad:

```js
generateMoneyProfileReport()
generateQuickReport()
generateQuickReportV2()
reportToText()
```

Para la nueva interfaz usa preferentemente:

```js
generateProfessionalReport()
professionalReportToText()
professionalReportToHtml()
```

## 12. Estado metodológico

El software es determinístico, pero el instrumento continúa siendo un prototipo teórico. Las reglas de interacción son hipótesis predefinidas, no correlaciones estadísticas demostradas. Los umbrales, pair signals y emergent patterns requieren pilotaje y validación empírica antes de describirse como propiedades psicométricas establecidas.
