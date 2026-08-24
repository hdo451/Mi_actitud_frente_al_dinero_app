import { composeProfessionalReport } from "./report-composer.js";
import { validateProfessionalReport } from "./report-schema.js";

export const PROFESSIONAL_REPORT_RENDERER_VERSION = "0.5.0-prototype";

export function generateProfessionalReport(rawAnswers, options = {}) {
  const report = composeProfessionalReport(rawAnswers, options);
  const validation = validateProfessionalReport(report);
  if (!validation.ok) {
    throw new Error(`Reporte profesional inválido: ${validation.errors.join(" | ")}`);
  }
  return report;
}

function formatScore(score) {
  if (!score || typeof score !== "object") return "—";
  if (typeof score.raw === "number") return `${score.raw.toFixed(2)} / 6 (${score.display100}/100 visual)`;
  return "—";
}

export function professionalReportToText(report) {
  const lines = [];
  const name = report.metadata.subjectName ? ` — ${report.metadata.subjectName}` : "";
  lines.push(`Perfil psicológico-financiero${name}`);
  lines.push("");
  lines.push("Resumen ejecutivo");
  lines.push(report.executiveSummary);
  lines.push("");

  if (report.primaryPatterns.length) {
    lines.push("Patrones principales");
    for (const item of report.primaryPatterns) {
      lines.push(`- ${item.title}: ${item.summary}`);
      lines.push(`  ${item.interpretation}`);
    }
    lines.push("");
  }

  if (report.protectiveResources.length) {
    lines.push("Recursos protectores");
    for (const item of report.protectiveResources) lines.push(`- ${item.title}: ${item.summary}`);
    lines.push("");
  }

  lines.push("Dimensiones");
  for (const d of report.dimensions) {
    lines.push(`${d.label} — ${d.code}: ${d.pattern}`);
    if (d.dimension !== "autonomy") {
      lines.push(`  Intensidad: ${formatScore(d.intensity)}`);
      lines.push(`  Regulación: ${formatScore(d.regulation)}`);
    } else if (d.applicable) {
      lines.push(`  Intensidad de control reportado: ${formatScore(d.controlIntensity)}`);
      lines.push(`  Amplitud: ${d.breadth?.countAtOrAbove4 ?? "—"}/${d.breadth?.totalItems ?? 6}`);
      lines.push(`  Autonomía actual: ${d.currentAutonomy?.label ?? "—"}`);
    }
    lines.push(`  ${d.narrative.overview}`);
    if (d.narrative.specialNote) lines.push(`  Nota: ${d.narrative.specialNote}`);
    if (d.narrative.context) lines.push(`  Contexto: ${d.narrative.context}`);
  }
  lines.push("");

  if (report.interactions.length) {
    lines.push("Interacciones principales");
    for (const x of report.interactions) {
      lines.push(`- ${x.title}: ${x.summary}`);
      lines.push(`  ${x.interpretation}`);
    }
    lines.push("");
  }

  if (report.recommendations.length) {
    lines.push("Acciones sugeridas");
    for (const r of report.recommendations) lines.push(`${r.rank}. ${r.text}`);
    lines.push("");
  }

  if (report.reflectionQuestions.length) {
    lines.push("Preguntas para reflexión");
    for (const q of report.reflectionQuestions) lines.push(`${q.rank}. ${q.question}`);
    lines.push("");
  }

  lines.push("Nota metodológica");
  lines.push(report.methodology.status);
  lines.push(report.methodology.interactions);
  lines.push(report.methodology.causality);
  for (const item of report.methodology.limitations) lines.push(`- ${item}`);

  return lines.join("\n");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function htmlList(items, formatter) {
  if (!items?.length) return "";
  return `<ul>${items.map((item) => `<li>${formatter(item)}</li>`).join("")}</ul>`;
}

function patternCard(item) {
  return `
    <article class="card pattern-card">
      <div class="eyebrow">${escapeHtml(item.heading)} · ${escapeHtml(item.polarity)}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <p class="muted">${escapeHtml(item.interpretation)}</p>
      ${item.overrideNotes?.length ? htmlList(item.overrideNotes, (x) => escapeHtml(x)) : ""}
    </article>`;
}

function dimensionCard(d) {
  const scores = d.dimension === "autonomy"
    ? (d.applicable ? `
        <div class="metrics">
          <div><span>Control reportado</span><strong>${escapeHtml(formatScore(d.controlIntensity))}</strong></div>
          <div><span>Amplitud</span><strong>${escapeHtml(`${d.breadth?.countAtOrAbove4 ?? "—"}/${d.breadth?.totalItems ?? 6}`)}</strong></div>
          <div><span>Autonomía actual</span><strong>${escapeHtml(d.currentAutonomy?.label ?? "—")}</strong></div>
        </div>` : `<p class="muted">Módulo no aplicado.</p>`)
    : `
        <div class="metrics">
          <div><span>Intensidad</span><strong>${escapeHtml(formatScore(d.intensity))}</strong></div>
          <div><span>Regulación</span><strong>${escapeHtml(formatScore(d.regulation))}</strong></div>
          <div><span>Contexto</span><strong>${escapeHtml(d.contextualState)}</strong></div>
        </div>`;

  return `
    <article class="card dimension-card">
      <div class="code">${escapeHtml(d.code)}</div>
      <h3>${escapeHtml(d.label)}</h3>
      <div class="pattern-name">${escapeHtml(d.pattern)}</div>
      ${scores}
      <p>${escapeHtml(d.narrative.overview)}</p>
      ${d.narrative.specialNote ? `<p class="note">${escapeHtml(d.narrative.specialNote)}</p>` : ""}
      ${d.narrative.context ? `<p class="context"><strong>Lectura contextual:</strong> ${escapeHtml(d.narrative.context)}</p>` : ""}
      <div class="two-col">
        <div><h4>Fortalezas o recursos</h4>${htmlList(d.narrative.strengths, (x) => escapeHtml(x))}</div>
        <div><h4>Aspectos a observar</h4>${htmlList(d.narrative.watchouts, (x) => escapeHtml(x))}</div>
      </div>
    </article>`;
}

export function professionalReportToHtml(report, { title = "Perfil psicológico-financiero" } = {}) {
  const subject = report.metadata.subjectName ? ` · ${escapeHtml(report.metadata.subjectName)}` : "";
  const primaryHtml = report.primaryPatterns.map(patternCard).join("");
  const protectiveHtml = report.protectiveResources.map(patternCard).join("");
  const attentionHtml = report.tensionsAndContext.map(patternCard).join("");
  const dimensionHtml = report.dimensions.map(dimensionCard).join("");
  const interactionHtml = report.interactions.map((x) => `
    <article class="interaction">
      <h4>${escapeHtml(x.title)}</h4>
      <p>${escapeHtml(x.summary)}</p>
      <p class="muted">${escapeHtml(x.interpretation)}</p>
    </article>`).join("");

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}${subject}</title>
  <style>
  :root { color-scheme: light; --ink:#172b4d; --muted:#5f6f85; --line:#dce4ed; --paper:#ffffff; --soft:#f4f7fa; --accent:#173b68; --gold:#d99b18; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color:var(--ink); background:var(--soft); line-height:1.55; }
    main { max-width: 980px; margin: 0 auto; background:var(--paper); padding:56px 64px 80px; }
    header { padding-bottom:28px; border-bottom:3px solid var(--gold); margin-bottom:32px; }
    .brand { display:flex; align-items:center; min-height:58px; margin-bottom:28px; }
    .brand img { width:250px; max-width:75%; height:auto; display:block; }
    h1 { font-size:34px; line-height:1.15; margin:0 0 10px; font-weight:650; }
    h2 { font-size:24px; margin:42px 0 18px; font-weight:650; }
    h3 { font-size:18px; margin:6px 0 8px; }
    h4 { margin:16px 0 6px; font-size:14px; }
    p { margin:8px 0 12px; }
    .subtitle,.muted { color:var(--muted); }
    .summary { font-size:18px; line-height:1.65; padding:22px 24px; background:var(--soft); border-left:4px solid var(--accent); }
    .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
    .card { border:1px solid var(--line); border-radius:12px; padding:20px; break-inside:avoid; }
    .eyebrow { font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); }
    .code { display:inline-block; font-size:12px; padding:3px 8px; border-radius:999px; background:var(--soft); border:1px solid var(--line); }
    .pattern-name { color:var(--accent); margin-bottom:10px; }
    .metrics { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px; margin:14px 0; }
    .metrics div { background:var(--soft); padding:10px; border-radius:8px; }
    .metrics span { display:block; color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:.04em; }
    .metrics strong { display:block; margin-top:3px; font-size:12px; font-weight:600; }
    .two-col { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
    .note,.context { padding:10px 12px; background:var(--soft); border-radius:8px; }
    .interaction { border-bottom:1px solid var(--line); padding:12px 0; }
    ol,ul { padding-left:22px; }
    li { margin:7px 0; }
    .method { font-size:13px; color:var(--muted); }
    footer { margin-top:44px; padding-top:20px; border-top:1px solid var(--line); font-size:12px; color:var(--muted); }
    @media (max-width:760px) { main{padding:32px 20px 56px}.grid,.two-col{grid-template-columns:1fr}.metrics{grid-template-columns:1fr} }
    @media print { body{background:#fff} main{max-width:none;padding:28px 36px} .card{break-inside:avoid} }
  </style>
</head>
<body>
<main>
  <header>
    <h1>${escapeHtml(title)}${subject}</h1>
    <div class="brand"><img src="Hispanic_Wealth.png" alt="Hispanic Wealth"></div>
    <div class="subtitle">Lectura personal sobre la relación con el dinero</div>
  </header>

  <section>
    <h2>Resumen ejecutivo</h2>
    <div class="summary">${escapeHtml(report.executiveSummary)}</div>
  </section>

  <section>
    <h2>Patrones principales</h2>
    <div class="grid">${primaryHtml || "<p>No se detectaron patrones integrados prioritarios con las reglas actuales.</p>"}</div>
  </section>

  ${protectiveHtml ? `<section><h2>Recursos protectores</h2><div class="grid">${protectiveHtml}</div></section>` : ""}
  ${attentionHtml ? `<section><h2>Tensiones y contexto</h2><div class="grid">${attentionHtml}</div></section>` : ""}

  <section>
    <h2>Las siete dimensiones</h2>
    <div class="grid">${dimensionHtml}</div>
  </section>

  ${interactionHtml ? `<section><h2>Interacciones principales</h2>${interactionHtml}</section>` : ""}

  <section>
    <h2>Acciones sugeridas</h2>
    <ol>${report.recommendations.map((r) => `<li>${escapeHtml(r.text)}</li>`).join("")}</ol>
  </section>

  <section>
    <h2>Preguntas para reflexión</h2>
    <ol>${report.reflectionQuestions.map((q) => `<li>${escapeHtml(q.question)}</li>`).join("")}</ol>
  </section>

  <section class="method">
    <h2>Nota metodológica</h2>
    <p>${escapeHtml(report.methodology.causality)}</p>
    <ul>${report.methodology.limitations.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
  </section>

  <footer>
    Los resultados base se preservan sin modificaciones. Las interacciones cambian contexto y prioridad narrativa, no las puntuaciones originales.
  </footer>
</main>
</body>
</html>`;
}
