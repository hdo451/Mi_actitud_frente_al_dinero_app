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

Luego abre `http://localhost:8000`. El botón **Abrir reporte completo** utiliza `professionalReportToHtml()` y permite imprimir o guardar el reporte como PDF desde el navegador. La integración con Google Sheets, Drive y correo se configura en `config.js` y en el proyecto Apps Script; consulta `google-apps-script/README.md`.

## Estado metodológico

Este es un prototipo teórico y determinístico, no un instrumento clínico validado. Los valores 0–100 son transformaciones de visualización y no percentiles. Los pair signals y emergent patterns son hipótesis predefinidas hasta que sean calibradas con datos de pilotaje. El módulo de autonomía describe experiencias/contexto reportado y no debe interpretarse como rasgo de personalidad ni diagnóstico.

## Publicar o trasladar a otro servidor

1. Ejecuta `npm test` y `npm run package:site` (el empaquetado usa Node 18+ y `zip`).
2. Sube el contenido de `dist/sitio/` o descomprime `dist/mi-actitud-frente-al-dinero.zip` en la carpeta pública del servidor. El ZIP contiene solamente los archivos públicos necesarios.
3. Abre `index.html` mediante HTTP/HTTPS. También se admiten subcarpetas como `/diagnostico/`. La dirección antigua `clara-diagnostico-financiero.html` redirige a la entrada actual.
4. Sirve `.js` como `text/javascript` o `application/javascript`, `.css` como `text/css` y conserva nombres y mayúsculas. No redirijas las solicitudes de archivos inexistentes al HTML de inicio. El servidor no necesita ejecutar Node, PHP ni Apps Script.
5. Si cambias de cuenta Google, configura y publica Apps Script siguiendo su README y actualiza `appsScriptEndpoint` en `config.js` antes de empaquetar. Un valor vacío permite usar la app sin enviar datos. Conserva los permisos de Drive privados según corresponda: un enlace no concede acceso por sí solo.
6. Publica los archivos juntos y elimina cachés antiguas del alojamiento/CDN. Evita cachés prolongadas para HTML, `config.js`, `bootstrap.js` y JavaScript sin versionar.
7. Comprueba ambos recorridos: autonomía aplicable y no aplicable; abre el reporte, revisa la fila en Sheets y confirma el correo. Los tests locales no verifican permisos ni la implementación remota de Google.

Usa HTTPS. Si el servidor tiene una política CSP, debe permitir scripts del propio sitio, los estilos inline usados por las barras y el reporte, las fuentes de Google si se desean, y las conexiones con `https://script.google.com` y `https://script.googleusercontent.com`. No publiques `.git`, los archivos de Apps Script, pruebas ni archivos del editor.

La app muestra el resultado aunque falle el almacenamiento local o el envío. El progreso guardado pertenece al navegador y al dominio; no se transfiere automáticamente a un dominio nuevo. El envío directo a Apps Script usa una respuesta opaca (`no-cors`): la página no puede confirmar el guardado ni la entrega del correo, y no reintenta automáticamente. Para confirmar la entrega se necesita una API con respuesta legible. La validación del Apps Script no sustituye autenticación o protección contra abuso de un endpoint público.
