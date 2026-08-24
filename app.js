import {
  buildStoredAssessment,
  generateProfessionalReport,
  getQuestionnaireDefinition,
  professionalReportToHtml,
  professionalReportToText,
} from './money-profile-engine.js';

const questionnaire = getQuestionnaireDefinition();
const questions = questionnaire.questions;
const responseOptions = Object.entries(questionnaire.responseScale).map(([value, label]) => ({
  value: Number(value),
  label,
}));

const progressStorageKey = `moneyAttitudeProgress:${questionnaire.version}`;
const lastAssessmentStorageKey = 'moneyAttitudeLastAssessment';
const views = ['welcomeView', 'quizView', 'resultsView'];
const standardLevelLabels = {
  low: 'Bajo',
  medium: 'Medio',
  high: 'Alto',
};
const contextStateLabels = {
  base: 'Lectura base',
  amplified: 'Patrón amplificado',
  buffered: 'Patrón amortiguado',
  mixed: 'Lectura mixta',
  contextDependent: 'Dependiente del contexto',
  tension: 'Patrón en tensión',
};
const insightPolarityLabels = {
  context: 'Contexto relevante',
  risk: 'Patrón para observar',
  tension: 'Tensión relevante',
  mixed: 'Lectura mixta',
  protective: 'Recurso protector',
};
const $ = id => document.getElementById(id);

let state = createInitialState();
let lastReport = null;

function createInitialState() {
  return {
    instrumentVersion: questionnaire.version,
    index: 0,
    answers: {},
    autonomyApplicable: null,
    assessmentId: null,
    startedAt: null,
  };
}

function createAssessmentId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `assessment-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function currentQuestion() {
  return questions[state.index];
}

function answeredCount() {
  return Object.values(state.answers).filter(Number.isInteger).length;
}

function totalApplicableQuestions() {
  return state.autonomyApplicable === false ? 42 : questions.length;
}

function show(id) {
  views.forEach(view => $(view).classList.toggle('active', view === id));
  window.scrollTo(0, 0);
}

function saveProgress() {
  localStorage.setItem(progressStorageKey, JSON.stringify(state));
  $('resumeButton').hidden = false;
}

function clearProgress() {
  localStorage.removeItem(progressStorageKey);
  $('resumeButton').hidden = true;
}

function render() {
  const question = currentQuestion();
  const selectedValue = state.answers[question.id];
  const answered = answeredCount();
  const total = totalApplicableQuestions();
  const percentage = answered / total * 100;

  $('progressLabel').textContent = `${answered} de ${total} respondidas`;
  $('progressBar').style.width = `${Math.max(answered ? 3 : 0, percentage)}%`;
  const progressTrack = $('progressBar').parentElement;
  progressTrack.setAttribute('aria-valuemax', String(total));
  progressTrack.setAttribute('aria-valuenow', String(answered));
  $('questionCount').textContent = `Pregunta ${state.index + 1} de ${total}`;
  $('questionText').textContent = question.text;
  $('answers').innerHTML = responseOptions.map(option => `
    <button class="answer ${selectedValue === option.value ? 'selected' : ''}" type="button" data-value="${option.value}" aria-pressed="${selectedValue === option.value}">
      <span class="answer-key">${option.value}</span>
      <span>${escapeHtml(option.label)}</span>
    </button>
  `).join('');

  $('answers').querySelectorAll('.answer').forEach(button => {
    button.onclick = () => selectAnswer(Number(button.dataset.value));
  });
  $('nextButton').disabled = !Number.isInteger(selectedValue);
  $('nextButton').innerHTML = state.index === questions.length - 1
    ? 'Ver mi perfil &nbsp;→'
    : 'Siguiente &nbsp;→';
  $('backButton').disabled = state.index === 0;
  updateCoach();
}

function selectAnswer(value) {
  state.answers[currentQuestion().id] = value;
  saveProgress();
  render();
}

function updateCoach() {
  const position = (state.index + 1) / questions.length;
  if (position < .34) {
    $('coachKicker').textContent = 'RESPONDE CON HONESTIDAD';
    $('coachTitle').innerHTML = 'No hay respuestas<br>correctas o incorrectas.';
    $('coachText').textContent = 'Elige la opción que mejor describa cómo piensas, sientes o actúas hoy.';
  } else if (position < .7) {
    $('coachKicker').textContent = 'SIGUE A TU RITMO';
    $('coachTitle').innerHTML = 'Cada respuesta<br>completa tu perfil.';
    $('coachText').textContent = 'Puedes volver a una afirmación anterior si deseas cambiar tu respuesta.';
  } else {
    $('coachKicker').textContent = 'ÚLTIMO TRAMO';
    $('coachTitle').innerHTML = 'Ya casi terminas<br>el recorrido.';
    $('coachText').textContent = 'Lee cada afirmación con calma y responde según tu experiencia.';
  }
}

function showAutonomyGate() {
  $('questionWrap').classList.add('section-paused');
  $('autonomyGate').hidden = false;
  $('autonomyAppliesButton').focus();
}

function hideAutonomyGate() {
  $('autonomyGate').hidden = true;
  $('questionWrap').classList.remove('section-paused');
}

function chooseAutonomyApplicability(isApplicable) {
  state.autonomyApplicable = isApplicable;
  hideAutonomyGate();

  if (isApplicable) {
    saveProgress();
    navigateTo(42);
    return;
  }

  for (let id = 43; id <= 49; id += 1) state.answers[id] = null;
  saveProgress();
  finish();
}

function fadeInQuestion() {
  const wrap = $('questionWrap');
  wrap.classList.remove('question-fade-out');
  void wrap.offsetWidth;
  wrap.classList.add('question-fade-in');
  setTimeout(() => wrap.classList.remove('question-fade-in'), 350);
  $('questionText').focus({preventScroll: true});
}

function navigateTo(nextIndex) {
  const wrap = $('questionWrap');
  $('nextButton').disabled = true;
  $('backButton').disabled = true;
  wrap.classList.remove('question-fade-in');
  wrap.classList.add('question-fade-out');
  setTimeout(() => {
    state.index = nextIndex;
    saveProgress();
    render();
    fadeInQuestion();
  }, 250);
}

function next() {
  if (!Number.isInteger(state.answers[currentQuestion().id])) return;

  if (state.index === 41 && state.autonomyApplicable === null) {
    showAutonomyGate();
    return;
  }

  if (state.index === 41 && state.autonomyApplicable === false) {
    finish();
    return;
  }

  if (state.index === questions.length - 1) {
    finish();
    return;
  }

  navigateTo(state.index + 1);
}

function back() {
  if (state.index === 0) return;
  navigateTo(state.index - 1);
}

function metricMarkup(label, metric) {
  return `
    <div class="profile-metric">
      <div class="profile-metric-head">
        <span>${escapeHtml(label)}</span>
        <strong>${metric.display100}/100 · ${standardLevelLabels[metric.level] ?? metric.level}</strong>
      </div>
      <div class="area-line" role="meter" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${metric.display100}">
        <i style="width:${metric.display100}%"></i>
      </div>
    </div>
  `;
}

function dimensionContextMarkup(dimension) {
  if (!dimension.narrative?.context && !dimension.narrative?.specialNote) return '';
  return `
    <div class="dimension-context">
      <span class="context-state state-${escapeHtml(dimension.contextualState)}">${escapeHtml(contextStateLabels[dimension.contextualState] ?? dimension.contextualState)}</span>
      ${dimension.narrative.specialNote ? `<p><strong>Nota:</strong> ${escapeHtml(dimension.narrative.specialNote)}</p>` : ''}
      ${dimension.narrative.context ? `<p>${escapeHtml(dimension.narrative.context)}</p>` : ''}
    </div>
  `;
}

function listMarkup(items) {
  if (!items?.length) return '';
  return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function dimensionNarrativeMarkup(dimension) {
  return `
    <div class="dimension-narrative-grid">
      <div><strong>Fortalezas o recursos</strong>${listMarkup(dimension.narrative.strengths)}</div>
      <div><strong>Aspectos a observar</strong>${listMarkup(dimension.narrative.watchouts)}</div>
    </div>
  `;
}

function standardDimensionMarkup(dimension) {
  return `
    <article class="dimension-result-card">
      <div class="dimension-result-head">
        <div>
          <span class="result-label">${escapeHtml(dimension.label)}</span>
          <h3>${escapeHtml(dimension.pattern)}</h3>
        </div>
        <span class="profile-code">${escapeHtml(dimension.code)}</span>
      </div>
      <p>${escapeHtml(dimension.narrative.overview)}</p>
      ${dimensionContextMarkup(dimension)}
      <div class="profile-metrics">
        ${metricMarkup('Intensidad', dimension.intensity)}
        ${metricMarkup('Regulación / adaptación', dimension.regulation)}
      </div>
      ${dimensionNarrativeMarkup(dimension)}
    </article>
  `;
}

function renderAutonomy(dimension) {
  const section = $('autonomyContextSection');
  section.hidden = false;

  if (dimension.applicable === false) {
    $('autonomyContextResult').innerHTML = `
      <div class="dimension-result-head"><h3>${escapeHtml(dimension.pattern)}</h3><span class="profile-code">NA</span></div>
      <p>${escapeHtml(dimension.narrative.overview)}</p>
    `;
    return;
  }

  $('autonomyContextResult').innerHTML = `
    <div class="dimension-result-head">
      <div><h3>${escapeHtml(dimension.pattern)}</h3><p>${escapeHtml(dimension.narrative.overview)}</p></div>
      <span class="profile-code">${escapeHtml(dimension.code)}</span>
    </div>
    ${dimensionContextMarkup(dimension)}
    <div class="profile-metrics">
      ${metricMarkup('Intensidad de las señales', dimension.controlIntensity)}
      <div class="context-stat"><span>Amplitud</span><strong>${dimension.breadth.countAtOrAbove4} de ${dimension.breadth.totalItems} señales</strong></div>
      <div class="context-stat"><span>Autonomía actual</span><strong>${escapeHtml(dimension.currentAutonomy.label)}</strong></div>
    </div>
    ${dimensionNarrativeMarkup(dimension)}
  `;
}

function patternMarkup(pattern, dimensionLabels) {
  const involvedDimensions = (pattern.dimensions ?? [])
    .map(key => dimensionLabels[key] ?? key)
    .join(' · ');
  const polarity = pattern.polarity ?? 'mixed';

  return `
    <article class="insight-result polarity-${escapeHtml(polarity)}">
      <div class="insight-result-head">
        <span class="insight-polarity">${escapeHtml(pattern.heading ?? insightPolarityLabels[polarity] ?? 'Hallazgo integrado')}</span>
        ${involvedDimensions ? `<span class="insight-dimensions">${escapeHtml(involvedDimensions)}</span>` : ''}
      </div>
      <h3>${escapeHtml(pattern.title)}</h3>
      <p>${escapeHtml(pattern.summary)}</p>
      <p class="insight-context">${escapeHtml(pattern.interpretation)}</p>
      ${pattern.overrideNotes?.length ? `<div class="override-notes">${listMarkup(pattern.overrideNotes)}</div>` : ''}
    </article>
  `;
}

function renderCollection(sectionId, resultsId, items, renderer) {
  $(sectionId).hidden = items.length === 0;
  $(resultsId).innerHTML = items.map(renderer).join('');
}

function interactionMarkup(interaction) {
  return `
    <article class="interaction-result">
      <span>${interaction.dimensionLabels.map(escapeHtml).join(' · ')}</span>
      <h3>${escapeHtml(interaction.title)}</h3>
      <p>${escapeHtml(interaction.summary)}</p>
      <p class="interaction-interpretation">${escapeHtml(interaction.interpretation)}</p>
    </article>
  `;
}

function renderReport(report) {
  const standardDimensions = report.dimensions.filter(dimension => dimension.dimension !== 'autonomy');
  const autonomy = report.dimensions.find(dimension => dimension.dimension === 'autonomy');
  const dimensionLabels = Object.fromEntries(report.dimensions.map(dimension => [dimension.dimension, dimension.label]));

  $('finalLevel').textContent = 'Reporte profesional determinístico';
  $('finalMessage').textContent = report.executiveSummary;
  $('reportMetadata').textContent = `Versión ${report.metadata.reportVersion} · ${report.metadata.usesGenerativeAI ? 'Con IA generativa' : 'Sin IA generativa'}`;
  $('primaryProfileCodes').innerHTML = report.dimensions.map(dimension => `
    <span class="primary-code-item"><small>${escapeHtml(dimension.label)}</small><strong>${escapeHtml(dimension.code)}</strong></span>
  `).join('');
  $('dimensionResults').innerHTML = standardDimensions.map(standardDimensionMarkup).join('');
  renderAutonomy(autonomy);

  renderCollection('primaryInsightsSection', 'primaryInsightsResults', report.primaryPatterns, pattern => patternMarkup(pattern, dimensionLabels));
  renderCollection('secondaryInsightsSection', 'secondaryInsightsResults', report.secondaryPatterns, pattern => patternMarkup(pattern, dimensionLabels));
  renderCollection('protectiveResourcesSection', 'protectiveResourcesResults', report.protectiveResources, pattern => patternMarkup(pattern, dimensionLabels));
  renderCollection('tensionsSection', 'tensionsResults', report.tensionsAndContext, pattern => patternMarkup(pattern, dimensionLabels));
  renderCollection('interactionsSection', 'interactionsResults', report.interactions, interactionMarkup);
  renderCollection('recommendationsSection', 'recommendationsResults', report.recommendations, recommendation => `
    <li><span>${recommendation.rank}</span><p>${escapeHtml(recommendation.text)}</p></li>
  `);
  renderCollection('reflectionSection', 'reflectionResults', report.reflectionQuestions, reflection => `
    <li><span>${reflection.rank}</span><p>${escapeHtml(reflection.question)}</p></li>
  `);
  $('reportMethodology').innerHTML = `
    <p>${escapeHtml(report.methodology.status)}</p>
    <p>${escapeHtml(report.methodology.scoring)}</p>
    <p>${escapeHtml(report.methodology.interactions)}</p>
    <p>${escapeHtml(report.methodology.causality)}</p>
    <p>${escapeHtml(report.methodology.scorePreservation)}</p>
    ${listMarkup(report.methodology.limitations)}
  `;
  $('reportNotices').innerHTML = report.notices.map(notice => `<p>${escapeHtml(notice)}</p>`).join('');
}

function finish() {
  try {
    const autonomyApplicable = state.autonomyApplicable !== false;
    const report = generateProfessionalReport(state.answers, {
      autonomyApplicable,
      mode: 'professional',
      includeTechnical: true,
    });
    const storedAssessment = buildStoredAssessment({
      assessmentId: state.assessmentId,
      answers: state.answers,
      autonomyApplicable,
      metadata: {
        locale: 'es',
        source: 'web-prototype',
        startedAt: state.startedAt,
        completedAt: new Date().toISOString(),
      },
    });
    const auditableRecord = {
      ...storedAssessment,
      analysisVersion: report.metadata.analysisVersion,
      reportVersion: report.metadata.reportVersion,
      generationMethod: report.metadata.generationMethod,
      usesGenerativeAI: report.metadata.usesGenerativeAI,
      report,
    };

    localStorage.setItem(lastAssessmentStorageKey, JSON.stringify(auditableRecord));
    lastReport = report;
    renderReport(report);
    clearProgress();
    show('resultsView');
    $('saveExit').hidden = true;
    $('resultsTitle').focus({preventScroll: true});
  } catch (error) {
    console.error(error);
    toast('No fue posible calcular el perfil. Revisa que todas las afirmaciones estén respondidas.');
  }
}

function start(fresh = true) {
  if (fresh) {
    state = createInitialState();
    state.assessmentId = createAssessmentId();
    state.startedAt = new Date().toISOString();
    saveProgress();
  }

  hideAutonomyGate();
  show('quizView');
  $('saveExit').hidden = false;
  render();
  $('questionText').focus({preventScroll: true});
}

function resetResultPanels() {
  [
    'primaryInsightsSection',
    'secondaryInsightsSection',
    'protectiveResourcesSection',
    'tensionsSection',
    'interactionsSection',
    'recommendationsSection',
    'reflectionSection',
    'autonomyContextSection',
  ].forEach(id => { $(id).hidden = true; });
  $('dimensionResults').replaceChildren();
  [
    'primaryInsightsResults',
    'secondaryInsightsResults',
    'protectiveResourcesResults',
    'tensionsResults',
    'interactionsResults',
    'recommendationsResults',
    'reflectionResults',
  ].forEach(id => $(id).replaceChildren());
  $('autonomyContextResult').replaceChildren();
  $('primaryProfileCodes').replaceChildren();
}

function restart() {
  clearProgress();
  state = createInitialState();
  lastReport = null;
  resetResultPanels();
  hideAutonomyGate();
  show('welcomeView');
  $('saveExit').hidden = true;
  $('startButton').focus();
}

function toast(text) {
  $('toast').textContent = text;
  $('toast').classList.add('show');
  setTimeout(() => $('toast').classList.remove('show'), 2500);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function loadSavedProgress() {
  const saved = localStorage.getItem(progressStorageKey);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    const isValid = parsed.instrumentVersion === questionnaire.version
      && Number.isInteger(parsed.index)
      && parsed.index >= 0
      && parsed.index < questions.length
      && parsed.answers
      && typeof parsed.answers === 'object';

    if (!isValid) throw new Error('Progreso incompatible');
    state = parsed;
    $('resumeButton').hidden = false;
  } catch {
    localStorage.removeItem(progressStorageKey);
  }
}

$('startButton').onclick = () => start(true);
$('resumeButton').onclick = () => start(false);
$('nextButton').onclick = next;
$('backButton').onclick = back;
$('autonomyAppliesButton').onclick = () => chooseAutonomyApplicability(true);
$('autonomyNotApplicableButton').onclick = () => chooseAutonomyApplicability(false);
$('saveExit').onclick = () => {
  saveProgress();
  hideAutonomyGate();
  show('welcomeView');
  $('saveExit').hidden = true;
  toast('Progreso guardado en este dispositivo');
};
$('restartButton').onclick = restart;
$('downloadButton').onclick = () => {
  if (!lastReport) return;
  const html = professionalReportToHtml(lastReport, {title: 'Mi actitud frente al dinero'});
  const url = URL.createObjectURL(new Blob([html], {type: 'text/html'}));
  const reportWindow = window.open(url, '_blank');
  if (reportWindow) reportWindow.opener = null;
  else toast('Permite ventanas emergentes para abrir el reporte completo');
  setTimeout(() => URL.revokeObjectURL(url), 60000);
};
$('shareButton').onclick = async () => {
  if (!lastReport) return;
  const text = professionalReportToText(lastReport);
  try {
    if (navigator.share) {
      await navigator.share({title: 'Mi actitud frente al dinero', text});
    } else {
      await navigator.clipboard.writeText(text);
      toast('Resultado copiado al portapapeles');
    }
  } catch (error) {
    if (error.name !== 'AbortError') toast('No fue posible compartir el resultado');
  }
};

loadSavedProgress();
