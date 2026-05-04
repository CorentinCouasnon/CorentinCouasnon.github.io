export function mountScratch(container, { accent, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Gratte pour révéler';
  container.appendChild(label);

  const wrap = document.createElement('div');
  wrap.className = 'scratch-area-wrap';
  container.appendChild(wrap);

  const under = document.createElement('div');
  under.className = 'scratch-under';
  under.textContent = 'DÉBLOQUÉ !';
  under.style.color = accent;
  under.style.background = `${accent}1A`;
  wrap.appendChild(under);

  const canvas = document.createElement('canvas');
  canvas.className = 'scratch-canvas';
  canvas.width = 200;
  canvas.height = 88;
  wrap.appendChild(canvas);

  const bar = document.createElement('div');
  bar.className = 'scratch-progress-bar';
  const fill = document.createElement('div');
  fill.className = 'scratch-progress-fill';
  fill.style.background = accent;
  fill.style.width = '0%';
  bar.appendChild(fill);
  container.appendChild(bar);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Gratte la surface grise';
  container.appendChild(hint);

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const grad = ctx.createLinearGradient(0, 0, 200, 88);
  grad.addColorStop(0, '#d0d0d0');
  grad.addColorStop(1, '#b8b8b8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 200, 88);
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  for (let x = -100; x < 280; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 88, 88);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#888';
  ctx.font = 'bold 11px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GRATTE ICI', 100, 42);
  ctx.font = '10px "Space Mono", monospace';
  ctx.fillText('pour révéler', 100, 58);

  let drawing = false;
  let solved = false;
  let lastCheck = 0;

  const scratchAt = (e) => {
    const rect = canvas.getBoundingClientRect();
    const pt = e.touches ? e.touches[0] : e;
    const x = (pt.clientX - rect.left) * (canvas.width / rect.width);
    const y = (pt.clientY - rect.top) * (canvas.height / rect.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    const now = performance.now();
    if (now - lastCheck < 120) return;
    lastCheck = now;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++;
    const pct = Math.round((transparent / (canvas.width * canvas.height)) * 100);
    fill.style.width = `${Math.min((pct / 55) * 100, 100)}%`;
    if (pct < 10) hint.textContent = 'Gratte la surface grise';
    else if (pct < 55) hint.textContent = `${Math.round((pct / 55) * 100)}% révélé…`;
    else hint.textContent = '✓ Révélé !';
    if (pct >= 55 && !solved) {
      solved = true;
      setTimeout(onSolve, 400);
    }
  };

  const start = (e) => { e.preventDefault(); drawing = true; scratchAt(e); };
  const move = (e) => { if (drawing) { e.preventDefault(); scratchAt(e); } };
  const end = () => { drawing = false; };

  wrap.addEventListener('mousedown', start);
  wrap.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  wrap.addEventListener('mouseleave', end);
  wrap.addEventListener('touchstart', start, { passive: false });
  wrap.addEventListener('touchmove', move, { passive: false });
  wrap.addEventListener('touchend', end);
}
