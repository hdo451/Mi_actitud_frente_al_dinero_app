# Money Profile Engine v0.5 — reporte profesional determinístico

Motor JavaScript para un cuestionario de 49 preguntas y 7 dimensiones de psicología financiera.

Esta versión conserva el scoring y las cuatro capas de interpretación de v0.4 y agrega un sistema completo para generar reportes profesionales mediante textos y reglas predeterminadas, sin IA generativa.

## Pipeline

```text
49 respuestas
  ↓
core.js
  ↓
7 dimensiones base
  ↓
pair-signals.js — 63 señales / 21 pares
  ↓
emergent-patterns.js — 30 patrones
  ↓
context-overrides.js
  ↓
narrative-resolver.js
  ↓
report-composer.js
  ↓
professional-report.js
  ↓
JSON / texto / HTML
```

Las interacciones nunca cambian las puntuaciones ni los códigos base.

## Uso recomendado

```js
import {
  getQuestionnaireDefinition,
  generateProfessionalReport,
  professionalReportToHtml,
} from "./money-profile-engine.js";

const questionnaire = getQuestionnaireDefinition();

const report = generateProfessionalReport(answers, {
  subjectName: "Nombre opcional",
  autonomyApplicable: true,
  mode: "professional",
});

const html = professionalReportToHtml(report);
```

## Modos

`mode: "professional"` produce hasta 3 patrones primarios, 2 secundarios, 8 interacciones, 8 recomendaciones y 7 preguntas de reflexión por defecto.

`mode: "quick"` reduce el volumen de contenido conservando exactamente el mismo scoring y las mismas reglas.

## Cobertura narrativa

La versión v0.5 incluye contenido determinístico para:

- 61 códigos base posibles: 54 configuraciones de las seis dimensiones estándar y 7 configuraciones de autonomía.
- 63 pair signals.
- 30 emergent patterns.
- Context overrides.
- Recomendaciones y preguntas de reflexión seleccionadas por reglas.

No se intenta almacenar un texto separado para cada combinación cartesiana de las siete dimensiones. El reporte se compone determinísticamente a partir de módulos predefinidos y reglas de prioridad. Esto permite cubrir perfiles complejos sin millones de plantillas duplicadas.

## Pruebas

```bash
npm test
```

Para probar sólo el nuevo reporte:

```bash
npm run test:professional
```

Ejemplo completo:

```bash
npm run demo:professional
```

## Integración en VS Code

Consulta `docs/VSC_INTEGRATION_V05.md`.

## Interfaz web incluida

La aplicación de este repositorio consume el engine únicamente desde `money-profile-engine.js` y genera el reporte con `generateProfessionalReport()` en modo profesional. La pantalla muestra las secciones narrativas del JSON y mantiene la sección `technical` oculta dentro del registro local para auditoría.

Para probarla desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000`. El botón **Abrir reporte completo** utiliza `professionalReportToHtml()` y permite imprimir o guardar el reporte como PDF desde el navegador. La integración con Apps Script todavía no está implementada.

## Estado metodológico

Este es un prototipo teórico y determinístico, no un instrumento clínico validado. Los valores 0–100 son transformaciones de visualización y no percentiles. Los pair signals y emergent patterns son hipótesis predefinidas hasta que sean calibradas con datos de pilotaje. El módulo de autonomía describe experiencias/contexto reportado y no debe interpretarse como rasgo de personalidad ni diagnóstico.
