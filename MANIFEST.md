# Manifest v0.5 — deterministic professional report

## Runtime base

- `money-profile-engine.js` — entry point externo único.
- `src/core.js` — 49 preguntas, validación y scoring base.
- `src/pair-signals.js` — Layer 1: 63 señales para los 21 pares.
- `src/emergent-patterns.js` — Layer 2: 30 patrones emergentes.
- `src/context-overrides.js` — Layer 3: contexto, atribución y confianza.
- `src/narrative-resolver.js` — Layer 4: selección de insights.
- `src/analysis.js` — pipeline de análisis completo.
- `src/correlations.js` — compatibilidad con API anterior.
- `src/report.js` — reporte rápido/compatibilidad.
- `src/index.js` — API pública.

## Nuevos archivos de reporte determinístico v0.5

- `src/dimension-narratives.js` — textos y reglas narrativas para las 54 configuraciones base de las seis dimensiones + autonomía.
- `src/pattern-narratives.js` — narrativa, acciones y reflexión para los 30 emergent patterns.
- `src/interaction-narratives.js` — convierte los 63 pair signals en bloques interpretativos auditables.
- `src/recommendation-library.js` — selecciona y deduplica recomendaciones predefinidas.
- `src/reflection-library.js` — selecciona preguntas de reflexión predefinidas.
- `src/report-schema.js` — modos, límites y validación estructural del reporte.
- `src/report-composer.js` — combina dimensiones, patrones, contexto, interacciones, acciones y reflexión.
- `src/professional-report.js` — API final y renderers JSON/texto/HTML.

## Documentación

- `README.md`
- `MANIFEST.md`
- `docs/VSC_INTEGRATION.md` — documento heredado v0.4.
- `docs/VSC_INTEGRATION_V05.md` — instrucciones actuales recomendadas.
- `docs/PAIR_SIGNALS_SPEC.md`

## Ejemplos

- `examples/example.js`
- `examples/pair-signals-example.js`
- `examples/full-pipeline-example.js`
- `examples/professional-report-example.js`

## Tests

- `tests/selftest.js`
- `tests/pair-signals-selftest.js`
- `tests/full-pipeline-selftest.js`
- `tests/professional-report-selftest.js`

## Cobertura determinística de contenido

- 49 preguntas.
- 7 dimensiones.
- 61 códigos base cubiertos por narrativa: 54 configuraciones estándar + 7 códigos de autonomía.
- 21 relaciones entre pares.
- 63 pair signals cubiertos por narrativa.
- 30 emergent patterns cubiertos por narrativa.
- Context overrides integrados.
- Hasta 3 patrones primarios + 2 secundarios por defecto.
- Recomendaciones y preguntas de reflexión deduplicadas.
- Salida JSON, texto y HTML.
- No utiliza IA generativa.

## Verificación

Ejecutar:

```bash
npm test
npm run demo:professional
```
