# Clara - Diagnóstico financiero

Aplicación web estática para el diagnóstico financiero de Hispanic Wealth. La página puede alojarse en GitHub Pages o en cualquier servidor estático. La URL del backend se configura en `syncConfig.endpoint` dentro de `app.js`.

## Estructura

- `index.html`: pantallas y formulario inicial.
- `app.js`: preguntas, resultados, progreso local y sincronización opcional.
- `stiles.css`: estilos.
- `google-apps-script/`: código para Google Apps Script.
- `google-sheets/estructura-google-sheet.csv`: encabezado inicial de la hoja única.

## Flujo de datos

Cada intento crea una fila en la pestaña `Respuestas`. Las primeras columnas contienen identidad, consentimiento, progreso, estado, fechas y controles de correo. Después se agregan columnas de respuestas con formato `Respuesta | area-nivel-pregunta` y columnas de interés con formato `Aprender más | nombre del tema`.

Una pregunta omitida o no respondida queda vacía. Si una persona inicia otra vez, se crea un nuevo ID y una nueva fila.

## Instalación inicial

1. Crea un Google Sheet desde la cuenta administradora.
2. Renombra la primera pestaña como `Respuestas`.
3. Importa `google-sheets/estructura-google-sheet.csv` o ejecuta `setupSheet()` en Apps Script.
4. Copia los archivos de `google-apps-script/` en el editor de Apps Script vinculado al Sheet.
5. En `Config.gs`, reemplaza `ADMIN_EMAIL` por el correo de Hispanic Wealth.
6. Publica el proyecto como aplicación web, ejecutándolo como el propietario y permitiendo acceso a quienes tengan el enlace.
7. Copia la URL `/exec` publicada en `syncConfig.endpoint` dentro de `app.js`.
8. Ejecuta una prueba completa y autoriza el envío de correos cuando Google lo solicite.
9. Crea un activador diario para `processInactiveAttempts`.

La URL de Apps Script no contiene una contraseña. No coloques credenciales privadas en la página web.

## Estados y recordatorios

- `En progreso`: se asigna al comenzar.
- `Finalizado`: se asigna al completar y dispara los dos correos de resultados.
- `Abandonado`: se asigna a los 14 días si sigue en progreso.

El proceso diario envía un recordatorio al día 7, un aviso de un día restante al día 13 y el aviso de cierre al día 14. Las columnas de control evitan correos duplicados.

## Migración futura

Para pasar de una cuenta personal a una institucional:

1. Crea un Sheet nuevo con una pestaña `Respuestas`.
2. Copia la plantilla y los datos históricos que corresponda conservar.
3. Copia el mismo Apps Script y cambia `ADMIN_EMAIL`.
4. Autoriza y publica la nueva aplicación web desde la cuenta institucional.
5. Actualiza únicamente `syncConfig.endpoint` en `app.js`.
6. Ejecuta las pruebas y conserva el Sheet anterior como respaldo.

Se recomienda usar una cuenta institucional o una unidad compartida de Google Drive para que la propiedad no dependa de una persona.

## Accesos y privacidad

Comparte el Sheet solo con personas que lo necesiten y asigna permisos de lector, comentador o editor según su función. Define con Hispanic Wealth el texto de consentimiento, el plazo de conservación y el procedimiento para corregir o eliminar datos antes de publicar el sistema.
