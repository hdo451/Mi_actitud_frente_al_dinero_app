function doGet() {
  return json_({ok: true, service: 'money-profile-engine'});
}

function doPost(event) {
  const lock = LockService.getScriptLock();
  try {
    const payload = JSON.parse(event.postData.contents);
    if (!payload.attemptId) throw new Error('Falta attemptId');

    lock.waitLock(10000);
    const sheet = getSheet_();
    setupSheet();
    const row = findOrCreateRow_(sheet, payload);
    writePayload_(sheet, row, payload);
    return json_({ok: true, attemptId: payload.attemptId});
  } catch (error) {
    console.error(error);
    return json_({ok: false, error: error.message});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function setupSheet() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, baseHeaders_().length).setValues([baseHeaders_()]);
  ensureHeaders_(sheet, baseHeaders_());
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');
}

function findOrCreateRow_(sheet, payload) {
  const values = sheet.getDataRange().getValues();
  const headers = values[0] || [];
  const idColumn = headers.indexOf('ID de intento');
  if (idColumn >= 0) {
    const found = values.slice(1).findIndex(row => String(row[idColumn]) === String(payload.attemptId));
    if (found >= 0) return found + 2;
  }
  return sheet.getLastRow() + 1;
}

function writePayload_(sheet, row, payload) {
  const report = payload.report || {};
  const answerHeaders = Object.keys(payload.answers || {}).map(id => `Respuesta | ${id}`);
  const dimensionHeaders = (report.dimensions || [])
    .filter(dimension => dimension.dimension !== 'autonomy')
    .map(dimension => `Resultado | ${dimension.label}`);
  ensureHeaders_(sheet, answerHeaders.concat(dimensionHeaders));

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const existing = row <= sheet.getLastRow()
    ? sheet.getRange(row, 1, 1, headers.length).getValues()[0]
    : Array(headers.length).fill('');
  const data = Object.fromEntries(headers.map((header, index) => [header, existing[index]]));
  const now = new Date();
  const metadata = payload.metadata || {};

  data['ID de intento'] = payload.attemptId;
  data['Nombre'] = payload.participant?.name || '';
  data['Correo electrónico'] = payload.participant?.email || '';
  data['Fecha de recepción'] = now;
  data['Fecha de inicio'] = metadata.startedAt || data['Fecha de inicio'] || now;
  data['Fecha de finalización'] = metadata.completedAt || now;
  data['Estado'] = payload.event === 'complete' ? 'Finalizado' : 'Recibido';
  data['Versión instrumento'] = report.metadata?.instrumentVersion || '';
  data['Versión reporte'] = report.metadata?.reportVersion || '';
  data['Resumen ejecutivo'] = report.executiveSummary || '';
  data['Aplicabilidad autonomía'] = payload.autonomyApplicable === false ? 'No' : 'Sí';
  data['Patrones principales'] = labels_(report.primaryPatterns);
  data['Patrones secundarios'] = labels_(report.secondaryPatterns);
  data['Recursos protectores'] = labels_(report.protectiveResources);
  data['Tensiones y contexto'] = labels_(report.tensionsAndContext);
  data['Recomendaciones'] = texts_(report.recommendations, 'text');
  data['Preguntas de reflexión'] = texts_(report.reflectionQuestions, 'question');

  (report.dimensions || [])
    .filter(dimension => dimension.dimension !== 'autonomy')
    .forEach(dimension => {
      data[`Resultado | ${dimension.label}`] = dimension.intensity?.display100 ?? '';
    });
  Object.entries(payload.answers || {}).forEach(([id, answer]) => {
    data[`Respuesta | ${id}`] = typeof answer === 'object' ? answer.value : answer;
  });

  sheet.getRange(row, 1, 1, headers.length).setValues([headers.map(header => data[header] ?? '')]);

  if (!data['Reporte']) {
    const reportUrl = createReportFile_(payload);
    const reportColumn = headers.indexOf('Reporte') + 1;
    if (reportColumn > 0) sheet.getRange(row, reportColumn).setValue(reportUrl);
    if (payload.participant?.email) {
      sendReportEmail_(payload, reportUrl);
      const emailColumn = headers.indexOf('Correo enviado') + 1;
      if (emailColumn > 0) sheet.getRange(row, emailColumn).setValue('Sí');
    }
  }
}

function createReportFile_(payload) {
  if (CONFIG.REPORT_FOLDER_ID.includes('REEMPLAZAR')) {
    throw new Error('Configura REPORT_FOLDER_ID antes de recibir resultados');
  }
  const folder = DriveApp.getFolderById(CONFIG.REPORT_FOLDER_ID);
  const safeId = String(payload.attemptId || Date.now()).replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${CONFIG.REPORT_FILE_PREFIX} - ${safeId}.html`;
  const html = embedLogo_(payload.reportHtml || `<pre>${escapeHtml_(JSON.stringify(payload.report || payload, null, 2))}</pre>`);
  const file = folder.createFile(Utilities.newBlob(html, 'text/html', filename));
  return file.getUrl();
}

function embedLogo_(html) {
  const logoFileName = CONFIG.REPORT_LOGO_FILE_NAME || 'Hispanic_Wealth.png';
  const files = DriveApp.getFilesByName(logoFileName);
  if (!files.hasNext()) return html;
  const blob = files.next().getBlob();
  const dataUri = `data:${blob.getContentType()};base64,${Utilities.base64Encode(blob.getBytes())}`;
  return html.replaceAll('src="Hispanic_Wealth.png"', `src="${dataUri}"`);
}

function baseHeaders_() {
  const headers = [
    'Reporte', 'ID de intento', 'Fecha de recepción', 'Fecha de inicio',
    'Fecha de finalización', 'Estado', 'Versión instrumento', 'Versión reporte',
    'Aplicabilidad autonomía', 'Nombre', 'Correo electrónico', 'Correo enviado', 'Resumen ejecutivo', 'Patrones principales',
    'Patrones secundarios', 'Recursos protectores', 'Tensiones y contexto',
    'Recomendaciones', 'Preguntas de reflexión'
  ];
  return headers.concat(Array.from({length: 49}, (_, index) => `Respuesta | ${index + 1}`));
}

function sendReportEmail_(payload, reportUrl) {
  const email = payload.participant.email;
  const name = payload.participant.name || 'participante';
  const html = embedLogo_(payload.reportHtml || `<pre>${escapeHtml_(JSON.stringify(payload.report || payload, null, 2))}</pre>`);
  const attachment = Utilities.newBlob(html, 'text/html', `Reporte financiero - ${payload.attemptId}.html`);
  MailApp.sendEmail({
    to: email,
    subject: 'Tu lectura financiera',
    htmlBody: `<p>Hola ${escapeHtml_(name)},</p><p>Adjuntamos tu reporte completo. También puedes abrirlo aquí: <a href="${reportUrl}">ver reporte</a>.</p><p>Hispanic Wealth</p>`,
    attachments: [attachment]
  });
}

function labels_(items) {
  return (items || []).map(item => item.title || item.heading || '').filter(Boolean).join(' | ');
}

function texts_(items, property) {
  return (items || []).map(item => item[property] || '').filter(Boolean).join(' | ');
}

function ensureHeaders_(sheet, required) {
  const current = sheet.getLastColumn()
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];
  const additions = required.filter(header => header && !current.includes(header));
  if (additions.length) {
    sheet.getRange(1, current.length + 1, 1, additions.length).setValues([additions]);
  }
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
