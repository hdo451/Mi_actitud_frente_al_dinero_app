const CONFIG = {
  SPREADSHEET_ID: '1oTR7kPLUM3Ftdul_psyDiHuPijFOh5aRpd6q2pdT1Qo',
  SHEET_NAME: 'Respuestas',
  REPORT_FOLDER_ID: '1hJQVgydVi_o-W4ul0YM5PBc3FG1MqILX',
  REPORT_LOGO_FILE_NAME: 'Hispanic_Wealth.png',
  REPORT_FILE_PREFIX: 'Diagnostico financiero',
  TIMEZONE: 'America/Santiago'
};

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error(`No existe la pestaña ${CONFIG.SHEET_NAME}`);
  return sheet;
}
