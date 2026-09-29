import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as engine from '../money-profile-engine.js';

const appSource = readFileSync(new URL('../app.js', import.meta.url), 'utf8').replace(/^import\s*\{[\s\S]*?\}\s*from\s*'[^']+';/, '');
function browserHarness(storageFails = false, networkFails = false) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, {hidden: false, value: '', textContent: '', innerHTML: '', style: {},
      classList: {add() {}, remove() {}, toggle() {}}, setAttribute() {}, focus() {}, replaceChildren() {},
      querySelectorAll: () => [], checkValidity: () => true, reportValidity() {}, parentElement: {setAttribute() {}}});
    return elements.get(id);
  };
  const saved = new Map();
  const sent = [];
  const context = vm.createContext({...engine, MONEY_APP_CONFIG: {appsScriptEndpoint: 'https://example.test/exec'}, console: {warn() {}, error() {}}, URL, Blob, AbortController,
    document: {getElementById: element, baseURI: 'https://example.test/subfolder/index.html'},
    window: {scrollTo() {}}, navigator: {}, setTimeout: () => 1, clearTimeout() {},
    localStorage: Object.fromEntries(['getItem', 'setItem', 'removeItem'].map(method => [method, (key, value) => {
      if (storageFails) throw new Error('Storage denied');
      if (method === 'getItem') return saved.get(key) ?? null;
      if (method === 'setItem') saved.set(key, value);
      if (method === 'removeItem') saved.delete(key);
    }])),
    fetch: async (url, options) => {sent.push(JSON.parse(options.body)); if (networkFails) throw new Error('Offline'); return {};},
  });
  vm.runInContext(appSource, context);
  return {context, element, sent};
}
for (const autonomy of [true, false]) {
  for (const blocked of [false, true]) {
    const {context, element, sent} = browserHarness(blocked, blocked);
    vm.runInContext(`state.participant = {name: 'Prueba', email: 'prueba@example.test'}; start();
      state.answers = Object.fromEntries(Array.from({length: 49}, (_, i) => [i + 1, i >= 42 && !${autonomy} ? null : 3]));
      state.autonomyApplicable = ${autonomy}; finish();`, context);
    await new Promise(resolve => setImmediate(resolve));
    assert.ok(vm.runInContext('lastReport !== null', context), 'Debe generar reporte incluso sin almacenamiento/red');
    assert.ok(element('finalMessage').textContent.length > 0);
    assert.ok(vm.runInContext('localReportHtml(lastReport)', context).includes('https://example.test/subfolder/Hispanic_Wealth.png'));
    assert.equal(sent.length, 1);
    assert.equal(sent[0].autonomyApplicable, autonomy);
    assert.ok(element('syncStatus').textContent.includes(blocked ? 'No se pudo confirmar' : 'no se pueden confirmar'));
  }
}

// Backend simulado: autonomía omitida, fallo de correo y reintento sin duplicar archivo.
const rows = [];
const sheet = {
  getLastRow: () => rows.length,
  getLastColumn: () => rows[0]?.length ?? 0,
  getDataRange: () => ({getValues: () => rows.map(row => [...row])}),
  setFrozenRows() {},
  getRange(row, col, height = 1, width = 1) {
    return {
      getValues: () => Array.from({length: height}, (_, y) => Array.from({length: width}, (_, x) => rows[row - 1 + y]?.[col - 1 + x] ?? '')),
      setValues(values) { values.forEach((line, y) => { rows[row - 1 + y] ||= []; line.forEach((value, x) => { rows[row - 1 + y][col - 1 + x] = value; }); }); },
      setValue(value) { rows[row - 1] ||= []; rows[row - 1][col - 1] = value; },
      setFontWeight() {},
    };
  },
};
let files = 0, emails = 0, failEmail = true;
const backend = vm.createContext({console: {error() {}},
  LockService: {getScriptLock: () => ({waitLock() {}, hasLock: () => true, releaseLock() {}})},
  ContentService: {MimeType: {JSON: 'json'}, createTextOutput: text => ({setMimeType: () => JSON.parse(text)})},
  SpreadsheetApp: {openById: () => ({getSheetByName: () => sheet})},
  DriveApp: {getFolderById: () => ({createFile: () => {files++; return {getUrl: () => 'https://drive.example/report'};}}), getFilesByName: () => ({hasNext: () => false})},
  Utilities: {newBlob: html => html}, MailApp: {sendEmail: () => {if (failEmail) throw new Error('Quota'); emails++;}},
});
vm.runInContext(readFileSync(new URL('../google-apps-script/Config.gs', import.meta.url), 'utf8') + '\n' + readFileSync(new URL('../google-apps-script/Code.gs', import.meta.url), 'utf8'), backend);
const answers = Object.fromEntries(Array.from({length: 49}, (_, i) => [i + 1, i < 42 ? 3 : null]));
const report = engine.generateProfessionalReport(answers, {autonomyApplicable: false});
const payload = {event: 'complete', attemptId: 'test-123', autonomyApplicable: false, participant: {name: '=1+1', email: 'test@example.test'}, answers, report, reportHtml: engine.professionalReportToHtml(report)};
backend.event = {postData: {contents: JSON.stringify(payload)}};
assert.equal(vm.runInContext('doPost(event)', backend).ok, false);
assert.equal(files, 1);
failEmail = false;
assert.equal(vm.runInContext('doPost(event)', backend).ok, true);
assert.equal(vm.runInContext('doPost(event)', backend).ok, true);
assert.equal(files, 1);
assert.equal(emails, 1);
assert.equal(rows.length, 2);
assert.equal(rows[1][rows[0].indexOf('Nombre')], "'=1+1");
assert.equal(rows[1][rows[0].indexOf('Respuesta | 43')], '');
backend.event = {postData: {contents: JSON.stringify({...payload, participant: {name: 'x', email: 'bad'}})}};
assert.equal(vm.runInContext('doPost(event)', backend).ok, false);
console.log('Deployment tests passed: both questionnaire paths, blocked storage/network, report assets, Apps Script null answers and email retry.');
