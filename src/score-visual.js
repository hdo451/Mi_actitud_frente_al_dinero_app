// Inline SVG keeps the filled portion visible when printing or saving as PDF.
export function scoreCircleMarkup(value) {
  if (!Number.isFinite(value)) return '';
  const percentage = Math.max(0, Math.min(100, value));
  const angle = percentage / 100 * 2 * Math.PI;
  const x = (50 + 42 * Math.sin(angle)).toFixed(4);
  const y = (50 - 42 * Math.cos(angle)).toFixed(4);
  const fill = percentage === 100
    ? '<circle cx="50" cy="50" r="42" fill="#238653" />'
    : percentage === 0 ? ''
      : `<path d="M 50 50 L 50 8 A 42 42 0 ${percentage > 50 ? 1 : 0} 1 ${x} ${y} Z" fill="#238653" />`;
  return `<svg class="score-circle" viewBox="0 0 100 100" width="88" height="88" role="img" aria-label="${percentage} de 100" focusable="false">
    <circle cx="50" cy="50" r="42" fill="#e4ebe7" />
    ${fill}
    <circle cx="50" cy="50" r="42" fill="none" stroke="#cedbd3" stroke-width="1" />
  </svg>`;
}
