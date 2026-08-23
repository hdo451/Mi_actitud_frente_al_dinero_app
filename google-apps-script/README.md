# Google Apps Script

Este código se copia en un proyecto de Apps Script vinculado al Google Sheet que contiene la pestaña `Respuestas`.

## Configuración

1. Copia `Code.gs`, `Config.gs`, `EmailTemplates.gs` y `appsscript.json` al proyecto.
2. En `Config.gs`, configura `ADMIN_EMAIL` y, si corresponde, la zona horaria del proyecto.
3. Ejecuta `setupSheet()` una vez.
4. Publica como aplicación web: ejecutar como propietario y acceso para cualquiera con el enlace.
5. Copia la URL `/exec` en `syncConfig.endpoint` de `app.js`.
6. Crea un activador basado en tiempo para `processInactiveAttempts`, una vez al día.

La hoja debe tener una sola línea por intento. Los encabezados de respuestas y de temas se agregan automáticamente cuando llegan datos nuevos.

## Migración

Para cambiar de administrador o cuenta, crea un Sheet nuevo, copia la plantilla y los datos que deban conservarse, instala estos mismos archivos, autoriza el proyecto y publica una nueva URL. Después cambia la URL en `app.js`. El código no depende de un correo personal ni de un ID fijo de cuenta.

## Prueba recomendada

Completa un intento de prueba con un correo controlado, verifica la fila y los dos correos, comprueba una pregunta omitida y revisa que los checkboxes marcados creen las columnas `Aprender más | ...`.
