const CONFIG = {
  SHEET_NAME: 'Respuestas',
  ADMIN_EMAIL: 'hdc12@georgetown.edu',
  COURSE_NAME: 'Diagnóstico financiero Clara',
  ABANDON_AFTER_DAYS: 14,
  REMINDER_AFTER_DAYS: 7,
  FINAL_WARNING_AFTER_DAYS: 13,
  TIMEZONE: Session.getScriptTimeZone()
};

function getSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error(`No existe la hoja ${CONFIG.SHEET_NAME}`);
  return sheet;
}
