function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);
    const sheet = getSheet_();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const row = findOrCreateRow_(sheet, payload);
      writePayload_(sheet, row, payload);
    } finally {
      lock.releaseLock();
    }
    return json_({ok: true});
  } catch (error) {
    console.error(error);
    return json_({ok: false, error: error.message});
  }
}

function setupSheet() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) sheet.appendRow(baseHeaders_());
  ensureHeaders_(sheet, baseHeaders_());
  sheet.setFrozenRows(1);
}

function processInactiveAttempts() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;
  const headers = values[0];
  const columns = indexHeaders_(headers);
  const now = new Date();
  values.slice(1).forEach((row, offset) => {
    const record = recordFromRow_(headers, row);
    if (!record.attemptId || record.status !== 'En progreso') return;
    const start = new Date(record.startDate);
    const age = Math.floor((now - start) / 86400000);
    const sheetRow = offset + 2;
    if (age >= CONFIG.ABANDON_AFTER_DAYS) {
      setCell_(sheet, sheetRow, columns['Estado'], 'Abandonado');
      setCell_(sheet, sheetRow, columns['Fecha de abandono'], now);
      if (record.abandonedSent !== 'Sí') {
        const body = abandonedEmailBody_(record);
        sendParticipantEmail_(record, `${CONFIG.COURSE_NAME}: prueba cerrada`, body);
        setCell_(sheet, sheetRow, columns['Aviso de abandono enviado'], 'Sí');
      }
    } else if (age >= CONFIG.FINAL_WARNING_AFTER_DAYS && record.finalWarningSent !== 'Sí') {
      const body = reminderEmailBody_(record, 1);
      sendParticipantEmail_(record, `${CONFIG.COURSE_NAME}: queda un día`, body);
      setCell_(sheet, sheetRow, columns['Aviso de 13 días enviado'], 'Sí');
    } else if (age >= CONFIG.REMINDER_AFTER_DAYS && record.reminderSent !== 'Sí') {
      const body = reminderEmailBody_(record, CONFIG.ABANDON_AFTER_DAYS - age);
      sendParticipantEmail_(record, `${CONFIG.COURSE_NAME}: continúa tu diagnóstico`, body);
      setCell_(sheet, sheetRow, columns['Recordatorio de 7 días enviado'], 'Sí');
    }
  });
}

function findOrCreateRow_(sheet, payload) {
  const values = sheet.getDataRange().getValues();
  const headers = values.length ? values[0] : [];
  const attemptColumn = headers.indexOf('ID de intento');
  if (attemptColumn >= 0) {
    const rowIndex = values.slice(1).findIndex(row => String(row[attemptColumn]) === String(payload.attemptId));
    if (rowIndex >= 0) return rowIndex + 2;
  }
  ensureHeaders_(sheet, baseHeaders_());
  return sheet.getLastRow() + 1;
}

function writePayload_(sheet, row, payload) {
  const answerHeaders = Object.keys(payload.answers || {}).map(key => `Respuesta | ${key}`);
  const learnHeaders = (payload.learn || []).map(item => `Aprender más | ${item.topic}`);
  const sectionHeaders = (payload.sectionScores || []).map(section => `Resultado | ${section.area.name}`);
  ensureHeaders_(sheet, answerHeaders.concat(sectionHeaders, learnHeaders));
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const existing = row <= sheet.getLastRow() ? sheet.getRange(row, 1, 1, headers.length).getValues()[0] : Array(headers.length).fill('');
  const data = Object.fromEntries(headers.map((header, index) => [header, existing[index]]));
  const now = new Date();
  data['ID de intento'] = payload.attemptId;
  data['Nombre completo'] = payload.user?.name || data['Nombre completo'] || '';
  data['Correo electrónico'] = payload.user?.email || data['Correo electrónico'] || '';
  data['Consentimiento'] = payload.user?.consent ? 'Sí' : data['Consentimiento'] || 'No';
  data['Fecha de inicio'] = data['Fecha de inicio'] || now;
  data['Última actividad'] = now;
  data['Último paso alcanzado'] = `${payload.area + 1}-${payload.level + 1}-${payload.index + 1}`;
  data['Porcentaje de progreso'] = progress_(payload);
  if (payload.event === 'complete') {
    data['Estado'] = 'Finalizado';
    data['Fecha de finalización'] = now;
    data['Resultado final'] = payload.diagnosis?.overall ?? '';
    (payload.sectionScores || []).forEach(section => { data[`Resultado | ${section.area.name}`] = `${section.score}%`; });
    const record = {...recordFromRow_(headers, Object.values(data)), sectionScores: payload.sectionScores || []};
    const body = resultEmailBody_(record);
    sendParticipantEmail_(record, `${CONFIG.COURSE_NAME}: tus resultados`, body);
    sendAdminCopy_(record, `${CONFIG.COURSE_NAME}: nuevo resultado`, body);
    data['Correo de resultados enviado'] = 'Sí';
  } else if (!data['Estado']) data['Estado'] = 'En progreso';
  Object.entries(payload.answers || {}).forEach(([key, answer]) => { data[`Respuesta | ${key}`] = answer.value; });
  (payload.learn || []).forEach(item => { data[`Aprender más | ${item.topic}`] = item.topic; });
  sheet.getRange(row, 1, 1, headers.length).setValues([headers.map(header => data[header] ?? '')]);
}

function baseHeaders_() { return ['ID de intento','Nombre completo','Correo electrónico','Consentimiento','Fecha de inicio','Última actividad','Último paso alcanzado','Porcentaje de progreso','Estado','Fecha de finalización','Fecha de abandono','Resultado final','Correo de resultados enviado','Recordatorio de 7 días enviado','Aviso de 13 días enviado','Aviso de abandono enviado']; }
function ensureHeaders_(sheet, required) { const current = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : []; const additions = required.filter(header => header && !current.includes(header)); if (additions.length) sheet.getRange(1, current.length + 1, 1, additions.length).setValues([additions]); }
function indexHeaders_(headers) { return Object.fromEntries(headers.map((header, index) => [header, index + 1])); }
function setCell_(sheet, row, column, value) { if (column) sheet.getRange(row, column).setValue(value); }
function progress_(payload) { const answered = Object.keys(payload.answers || {}).length; return Math.round(answered / Math.max(1, payload.totalQuestions || answered) * 100) / 100; }
function recordFromRow_(headers, row) { const get = name => row[headers.indexOf(name)]; return {attemptId:get('ID de intento'),name:get('Nombre completo'),email:get('Correo electrónico'),startDate:get('Fecha de inicio'),status:get('Estado'),result:get('Resultado final'),reminderSent:get('Recordatorio de 7 días enviado'),finalWarningSent:get('Aviso de 13 días enviado'),abandonedSent:get('Aviso de abandono enviado')}; }
function json_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
