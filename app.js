import {
  buildStoredAssessment,
  generateMoneyProfileReport,
  getQuestionnaireDefinition,
  reportToText,
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

function dimensionContextMarkup(dimension, dimensionLabels) {
  const context = dimension.context;
  if (!context || context.state === 'base') return '';

  const relatedKeys = [
    ...context.amplifiedBy,
    ...context.bufferedBy,
    ...context.contextualizedBy,
    ...context.tensionsWith,
    ...context.reinforcedBy,
  ];
  const relatedLabels = [...new Set(relatedKeys)]
    .map(key => dimensionLabels[key] ?? key)
    .join(', ');
  const contextMessages = {
    amplified: 'Este patrón puede ganar fuerza al interactuar con otros elementos del perfil.',
    buffered: 'Otros recursos del perfil pueden amortiguar este patrón.',
    mixed: 'Aquí conviven factores que pueden amplificar y amortiguar este patrón.',
    contextDependent: 'Conviene interpretar este resultado junto con las circunstancias y los demás patrones del perfil.',
    tension: 'Este patrón aparece en tensión con otros elementos del perfil.',
  };
  const relatedText = relatedLabels ? ` Dimensiones relacionadas: ${relatedLabels}.` : '';

  return `
    <div class="dimension-context">
      <span class="context-state state-${escapeHtml(context.state)}">${escapeHtml(contextStateLabels[context.state] ?? context.state)}</span>
      <p>${escapeHtml((contextMessages[context.state] ?? 'Este resultado requiere una lectura contextual.') + relatedText)}</p>
    </div>
  `;
}

function standardDimensionMarkup(dimension, dimensionLabels) {
  return `
    <article class="dimension-result-card">
      <div class="dimension-result-head">
        <div>
          <span class="result-label">${escapeHtml(dimension.label)}</span>
          <h3>${escapeHtml(dimension.pattern)}</h3>
        </div>
        <span class="profile-code">${escapeHtml(dimension.baseCode)}</span>
      </div>
      <p>${escapeHtml(dimension.summary)}</p>
      ${dimensionContextMarkup(dimension, dimensionLabels)}
      <div class="profile-metrics">
        ${metricMarkup('Intensidad', dimension.intensity)}
        ${metricMarkup('Regulación / adaptación', dimension.regulation)}
      </div>
    </article>
  `;
}

function renderAutonomy(dimension, dimensionLabels) {
  const section = $('autonomyContextSection');
  section.hidden = false;

  if (dimension.applicable === false) {
    $('autonomyContextResult').innerHTML = `
      <div class="dimension-result-head"><h3>${escapeHtml(dimension.pattern)}</h3><span class="profile-code">NA</span></div>
      <p>${escapeHtml(dimension.summary)}</p>
    `;
    return;
  }

  $('autonomyContextResult').innerHTML = `
    <div class="dimension-result-head">
      <div><h3>${escapeHtml(dimension.pattern)}</h3><p>${escapeHtml(dimension.summary)}</p></div>
      <span class="profile-code">${escapeHtml(dimension.baseCode)}</span>
    </div>
    ${dimensionContextMarkup(dimension, dimensionLabels)}
    <div class="profile-metrics">
      ${metricMarkup('Intensidad de las señales', dimension.controlIntensity)}
      <div class="context-stat"><span>Amplitud</span><strong>${dimension.breadth.countAtOrAbove4} de ${dimension.breadth.totalItems} señales</strong></div>
      <div class="context-stat"><span>Autonomía actual</span><strong>${escapeHtml(dimension.currentAutonomy.label)}</strong></div>
    </div>
  `;
}

function localizeExecutiveSummary(summary, dimensionLabels) {
  return Object.entries(dimensionLabels).reduce((localized, [key, label]) => (
    localized.replace(new RegExp(`\\b${key}\\b`, 'g'), label.toLowerCase())
  ), summary);
}

function insightMarkup(insight, dimensionLabels) {
  const involvedDimensions = (insight.centralDimensions ?? [])
    .map(key => dimensionLabels[key] ?? key)
    .join(' · ');
  const polarity = insight.polarity ?? 'mixed';

  return `
    <article class="insight-result polarity-${escapeHtml(polarity)}">
      <div class="insight-result-head">
        <span class="insight-polarity">${escapeHtml(insightPolarityLabels[polarity] ?? 'Hallazgo integrado')}</span>
        ${involvedDimensions ? `<span class="insight-dimensions">${escapeHtml(involvedDimensions)}</span>` : ''}
      </div>
      <h3>${escapeHtml(insight.label)}</h3>
      <p>${escapeHtml(insight.summary)}</p>
      ${insight.longContext ? `<p class="insight-context">${escapeHtml(insight.longContext)}</p>` : ''}
    </article>
  `;
}

function renderReport(report) {
  const standardDimensions = report.dimensions.filter(dimension => dimension.dimension !== 'autonomy');
  const autonomy = report.dimensions.find(dimension => dimension.dimension === 'autonomy');
  const dimensionLabels = Object.fromEntries(report.dimensions.map(dimension => [dimension.dimension, dimension.label]));

  $('finalLevel').textContent = 'Siete dimensiones, un perfil integrado';
  $('finalMessage').textContent = localizeExecutiveSummary(report.executiveSummary, dimensionLabels);
  $('primaryProfileCodes').innerHTML = report.dimensions.map(dimension => `
    <span class="primary-code-item"><small>${escapeHtml(dimension.label)}</small><strong>${escapeHtml(dimension.baseCode)}</strong></span>
  `).join('');
  $('dimensionResults').innerHTML = standardDimensions
    .map(dimension => standardDimensionMarkup(dimension, dimensionLabels))
    .join('');
  renderAutonomy(autonomy, dimensionLabels);

  $('primaryInsightsSection').hidden = report.primaryInsights.length === 0;
  $('primaryInsightsResults').innerHTML = report.primaryInsights
    .map(insight => insightMarkup(insight, dimensionLabels))
    .join('');
  $('secondaryInsightsSection').hidden = report.secondaryInsights.length === 0;
  $('secondaryInsightsResults').innerHTML = report.secondaryInsights
    .map(insight => insightMarkup(insight, dimensionLabels))
    .join('');
  $('reportNotices').innerHTML = report.notices.map(notice => `<p>${escapeHtml(notice)}</p>`).join('');
}

function finish() {
  try {
    const autonomyApplicable = state.autonomyApplicable !== false;
    const report = generateMoneyProfileReport(state.answers, {
      autonomyApplicable,
      maxPrimary: 3,
      maxSecondary: 2,
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
      analysisVersion: report.analysisVersion,
      reportVersion: report.reportVersion,
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
  $('primaryInsightsSection').hidden = true;
  $('secondaryInsightsSection').hidden = true;
  $('autonomyContextSection').hidden = true;
  $('dimensionResults').replaceChildren();
  $('primaryInsightsResults').replaceChildren();
  $('secondaryInsightsResults').replaceChildren();
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
$('downloadButton').onclick = () => window.print();
$('shareButton').onclick = async () => {
  if (!lastReport) return;
  const text = reportToText(lastReport);
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
