function sendParticipantEmail_(record, subject, body) {
  if (record.email) MailApp.sendEmail({to: record.email, subject, htmlBody: body});
}

function sendAdminCopy_(record, subject, body) {
  if (CONFIG.ADMIN_EMAIL.includes('REEMPLAZAR')) return;
  MailApp.sendEmail({to: CONFIG.ADMIN_EMAIL, subject, htmlBody: body});
}

function resultEmailBody_(record) {
  const areas = (record.sectionScores || []).map(section => `<li>${escapeHtml_(section.area.name)}: ${escapeHtml_(section.score)}%</li>`).join('');
  return `<p>Hola ${escapeHtml_(record.name)},</p><p>Completaste ${escapeHtml_(CONFIG.COURSE_NAME)}.</p><p>Tu resultado general es: <strong>${escapeHtml_(record.result || 'Disponible en la página')}</strong>.</p>${areas ? `<p>Resultado por área:</p><ul>${areas}</ul>` : ''}<p>Gracias por participar.</p><p>Hispanic Wealth</p>`;
}

function reminderEmailBody_(record, daysLeft) {
  return `<p>Hola ${escapeHtml_(record.name)},</p><p>Tu diagnóstico financiero sigue en progreso. ${daysLeft === 1 ? 'Te queda un día para completarlo.' : 'Puedes continuar cuando quieras.'}</p><p>Hispanic Wealth</p>`;
}

function abandonedEmailBody_(record) {
  return `<p>Hola ${escapeHtml_(record.name)},</p><p>Tu prueba se cerró como abandonada porque no fue finalizada dentro del plazo de ${CONFIG.ABANDON_AFTER_DAYS} días.</p><p>Puedes comenzar una nueva cuando quieras.</p><p>Hispanic Wealth</p>`;
}

function escapeHtml_(value) {
  return String(value || '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
