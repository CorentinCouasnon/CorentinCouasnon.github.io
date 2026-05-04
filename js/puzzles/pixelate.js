export function mountPixelate(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Clique pour révéler';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'pixelate-stage';
  container.appendChild(stage);

  const canvas = document.createElement('canvas');
  canvas.className = 'pixelate-canvas';
  stage.appendChild(canvas);

  const counter = document.createElement('div');
  counter.className = 'pixelate-counter';
  counter.textContent = '0 / 8';
  container.appendChild(counter);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Clique sur l\'image';
  container.appendChild(hint);

  const TARGET_CLICKS = 8;
  const W = 200, H = 130;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#e8e8e8';
  ctx.fillRect(0, 0, W, H);

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = image;

  let clicks = 0;
  let solved = false;
  let imgReady = false;

  const draw = () => {
    if (!imgReady) return;
    const t = clicks / TARGET_CLICKS;
    // pixel size shrinks from 32 → 1 along an ease curve
    const eased = t * t;
    const pixelSize = Math.max(1, Math.round(32 * (1 - eased)));
    if (pixelSize <= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);
    } else {
      const sw = Math.max(1, Math.floor(W / pixelSize));
      const sh = Math.max(1, Math.floor(H / pixelSize));
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, sw, sh);
      ctx.drawImage(canvas, 0, 0, sw, sh, 0, 0, W, H);
    }
  };

  img.addEventListener('load', () => {
    imgReady = true;
    draw();
  });

  const handleClick = () => {
    if (solved) return;
    clicks++;
    counter.textContent = `${Math.min(clicks, TARGET_CLICKS)} / ${TARGET_CLICKS}`;
    draw();
    if (clicks >= TARGET_CLICKS) {
      solved = true;
      hint.textContent = '✓ Image révélée !';
      setTimeout(onSolve, 300);
    } else {
      hint.textContent = 'Continue à cliquer';
    }
  };

  stage.addEventListener('click', handleClick);
}
