const entity = {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"};
export const escape = value => String(value).replace(/[&<>"']/g, char => entity[char]);

export function rich(value) {
  return String(value).split(/(\$\$[\s\S]+?\$\$|\$[^\n$]+?\$)/g).map((part, index) => {
    if (index % 2 === 0) return escape(part).replace(/\r?\n/g, "<br>");
    const displayMode = part.startsWith("$$");
    const offset = displayMode ? 2 : 1;
    if (!window.katex) return escape(part);
    const rendered = window.katex.renderToString(part.slice(offset, -offset), {
      displayMode, throwOnError: false, strict: "ignore", trust: false,
    });
    return displayMode ? rendered : '<span class="math-scroll">' + rendered + "</span>";
  }).join("");
}

const icons = {
  chapters: '<path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0 0 4h14M4 5v16m4-13h8m-8 4h6"/>',
  custom: '<path d="M3 6h6m4 0h8M3 12h11m4 0h3M3 18h3m4 0h11"/><circle cx="11" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
  bank: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
  wrong: '<path d="M4 11a8 8 0 1 1 2 6m-2-1v-5h5m3-4v5m0 0 3 2"/>',
  done: '<path d="M4 12l5 5L20 6"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5m-18 4 9 5 9-5"/>',
};

export function icon(name) {
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + "</svg>";
}

export function drawWave(canvas) {
  const {width, height} = canvas.getBoundingClientRect();
  if (!width || !height) return;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.ceil(width * pixelRatio);
  canvas.height = Math.ceil(height * pixelRatio);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(pixelRatio, pixelRatio);
  const mid = height * .48;
  const center = width * .49;
  const sigma = width * .19;
  const amplitude = height * .31;
  const amplitudeAt = x => Math.exp(-.5 * ((x - center) / sigma) ** 2);
  const glow = ctx.createRadialGradient(center, mid, 0, center, mid, Math.max(width, height) * .61);
  glow.addColorStop(0, "#67419c");
  glow.addColorStop(1, "#231739");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  const grid = ctx.createLinearGradient(0, 0, width, 0);
  grid.addColorStop(0, "transparent");
  grid.addColorStop(.18, "#e0c6ff24");
  grid.addColorStop(.84, "#e0c6ff24");
  grid.addColorStop(1, "transparent");
  ctx.strokeStyle = grid;
  ctx.beginPath();
  for (let x = width * .06; x < width; x += 25) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
  for (let y = mid % 24; y < height; y += 24) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
  ctx.stroke();
  function line(curve, color, size, dash = []) {
    ctx.beginPath();
    for (let x = 0; x <= width; x += 1) {
      const y = curve(x);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.setLineDash(dash);
    ctx.stroke();
  }
  line(x => mid - amplitude * amplitudeAt(x), "#e4cdfb91", 1, [4, 5]);
  line(x => mid + amplitude * amplitudeAt(x), "#e4cdfb91", 1, [4, 5]);
  line(x => mid - amplitude * amplitudeAt(x) * Math.sin((x - center) * 65 / width), "#e5ceff", 1.8);
}
