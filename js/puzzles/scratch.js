export function mountScratch(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Grattez pour révéler';
  container.appendChild(label);

  const wrap = document.createElement('div');
  wrap.className = 'scratch-area-wrap';
  container.appendChild(wrap);

  const under = document.createElement('div');
  under.className = 'scratch-under';
  under.style.backgroundImage = `url('${image}')`;
  wrap.appendChild(under);

  const canvas = document.createElement('canvas');
  canvas.className = 'scratch-canvas';
  canvas.width = 220;
  canvas.height = 130;
  wrap.appendChild(canvas);

  const bar = document.createElement('div');
  bar.className = 'scratch-progress-bar';
  const fill = document.createElement('div');
  fill.className = 'scratch-progress-fill';
  fill.style.width = '0%';
  bar.appendChild(fill);
  container.appendChild(bar);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Grattez la surface grise';
  container.appendChild(hint);

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const W = 220, H = 130;
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#c4c4c4');
  grad.addColorStop(1, '#9e9e9e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  for (let x = -160; x < 360; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + H, H);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#555';
  ctx.font = 'bold 13px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('GRATTEZ ICI', W / 2, H / 2 - 4);
  ctx.font = '10px "Space Mono", monospace';
  ctx.fillText('pour révéler le projet', W / 2, H / 2 + 14);

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
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    const now = performance.now();
    if (now - lastCheck < 120) return;
    lastCheck = now;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 128) transparent++;
    const pct = Math.round((transparent / (canvas.width * canvas.height)) * 100);
    fill.style.width = `${Math.min((pct / 90) * 100, 100)}%`;
    if (pct < 10) hint.textContent = 'Grattez la surface grise';
    else if (pct < 90) hint.textContent = `${Math.round((pct / 90) * 100)}% révélé…`;
    else { hint.textContent = '✓ Révélé !'; hint.classList.add('solved'); }
    if (pct >= 90 && !solved) {
      solved = true;
      setTimeout(onSolve, 400);
    }
  };

  const isInside = (e) => {
    const rect = canvas.getBoundingClientRect();
    const pt = e.touches ? e.touches[0] : e;
    return pt.clientX >= rect.left && pt.clientX <= rect.right
        && pt.clientY >= rect.top  && pt.clientY <= rect.bottom;
  };
  const start = (e) => { e.preventDefault(); drawing = true; scratchAt(e); };
  const moveOnWrap = (e) => { if (drawing) { e.preventDefault(); scratchAt(e); } };
  const moveGlobal = (e) => { if (drawing && isInside(e)) scratchAt(e); };
  const end = () => { drawing = false; };

  wrap.addEventListener('mousedown', start);
  wrap.addEventListener('mousemove', moveOnWrap);
  window.addEventListener('mousemove', moveGlobal);
  window.addEventListener('mouseup', end);
  wrap.addEventListener('touchstart', start, { passive: false });
  wrap.addEventListener('touchmove', moveOnWrap, { passive: false });
  window.addEventListener('touchmove', moveGlobal, { passive: true });
  window.addEventListener('touchend', end);
}
