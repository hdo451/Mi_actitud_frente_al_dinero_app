# Manifest v0.4

## Runtime

- `money-profile-engine.js` — entry point externo.
- `src/core.js` — preguntas, validación y scoring de 7 dimensiones.
- `src/pair-signals.js` — Layer 1, 63 señales para los 21 pares.
- `src/emergent-patterns.js` — Layer 2, patrones de segundo/tercer orden.
- `src/context-overrides.js` — Layer 3, atribución, confianza y contexto.
- `src/narrative-resolver.js` — Layer 4, selección de 3-5 insights.
- `src/analysis.js` — pipeline completo.
- `src/report.js` — JSON final y versión textual corta.
- `src/correlations.js` — facade de compatibilidad con imports anteriores.
- `src/index.js` — API pública.

## Documentación

- `README.md`
- `docs/VSC_INTEGRATION.md`
- `docs/PAIR_SIGNALS_SPEC.md`

## Ejemplos

- `examples/example.js`
- `examples/pair-signals-example.js`
- `examples/full-pipeline-example.js`

## Tests

- `tests/selftest.js`
- `tests/pair-signals-selftest.js`
- `tests/full-pipeline-selftest.js`

## Estado de implementación

- Scoring base: listo.
- 21 pares / 63 pair signals: listo.
- Emergent patterns: listo como catálogo teórico v0.4.
- Context overrides: listo como catálogo teórico v0.4.
- Narrative resolver: listo como primera implementación determinística.
- Backwards compatibility: aliases conservados para `generateQuickReport` y `generateQuickReportV2`.
- Tests: pasan en Node >=18.
