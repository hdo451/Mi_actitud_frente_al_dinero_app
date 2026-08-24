# Integracion nueva con Google Sheets y Google Drive

Esta integracion recibe el resultado profesional de la app, guarda sus respuestas y metadatos en una fila de Google Sheets y guarda el reporte HTML completo en una carpeta de Google Drive. La columna `Reporte` queda como la primera columna y contiene la URL del archivo.

## 1. Crear los recursos

1. En la cuenta que usaras ahora, crea una carpeta de Drive para los reportes.
2. Crea un Google Sheet vacio y deja una pestana llamada `Respuestas`.
3. Copia el ID de cada recurso desde su URL:
   - Carpeta: `https://drive.google.com/drive/folders/ID_DE_CARPETA`
   - Sheet: `https://docs.google.com/spreadsheets/d/ID_DEL_SHEET/edit`

## 2. Crear el proyecto Apps Script

1. Abre el Sheet y entra a **Extensiones > Apps Script**.
2. Borra el archivo de ejemplo y crea tres archivos de script llamados `Code.gs`, `Config.gs` y `appsscript.json`.
3. Copia el contenido de los archivos de esta carpeta al proyecto.
4. En `Config.gs`, reemplaza:
   - `SPREADSHEET_ID` por el ID del Sheet.
   - `REPORT_FOLDER_ID` por el ID de la carpeta de Drive.
5. Guarda el proyecto.
6. En el selector de funciones, elige `setupSheet` y pulsa **Ejecutar** una vez.
7. Acepta los permisos solicitados para leer/escribir Sheets y crear archivos en Drive.

## 3. Publicar el endpoint

1. Pulsa **Implementar > Nueva implementacion**.
2. Tipo: **Aplicacion web**.
3. **Ejecutar como**: tu cuenta administradora del proyecto.
4. **Quien tiene acceso**: `Cualquiera`.
5. Pulsa **Implementar** y copia la URL que termina en `/exec`.
6. En `app.js`, pega esa URL en `APPS_SCRIPT_ENDPOINT`.
7. Publica nuevamente la app.

La aplicacion usa una solicitud `POST` sin leer la respuesta del navegador. Eso permite que el formulario publico envie el resultado sin necesitar credenciales de Google en el navegador. El acceso a Sheets y Drive ocurre bajo la cuenta que publico el Apps Script.

## 4. Prueba completa

1. Abre la app publicada.
2. Completa un diagnostico de prueba.
3. En `Respuestas`, confirma una nueva fila.
4. Confirma que la primera celda de la fila tenga una URL.
5. Abre la URL y verifica que el reporte HTML este completo.
6. Repite el mismo intento solo si quieres comprobar una nueva fila; el `ID de intento` identifica cada resultado.

Si falla, abre Apps Script > **Ejecuciones** y revisa el error. Los casos mas comunes son un ID incorrecto, una carpeta sin acceso para la cuenta que ejecuta el script o una implementacion antigua: al cambiar el codigo, crea una nueva version desde **Implementar > Administrar implementaciones > Editar**.

## 5. Traslado a Hispanic Wealth

La migracion queda separada de la logica:

1. En la cuenta institucional, crea un Sheet y una carpeta institucionales.
2. Comparte o copia los datos historicos si corresponde.
3. Crea el Apps Script desde el nuevo Sheet y copia los mismos tres archivos.
4. Cambia solamente `SPREADSHEET_ID` y `REPORT_FOLDER_ID`.
5. Ejecuta `setupSheet`, autoriza con la cuenta institucional y crea una nueva implementacion.
6. Cambia `APPS_SCRIPT_ENDPOINT` por la nueva URL y vuelve a publicar la app.

No uses IDs de tu cuenta personal en el codigo de la app ni compartas contrasenas. Para una migracion ordenada, conserva este directorio como la fuente versionada del Apps Script y documenta los dos IDs fuera del repositorio.
