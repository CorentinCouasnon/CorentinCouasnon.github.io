export function mountPixelate(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Cliquez pour révéler';
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
  hint.textContent = 'Cliquez sur l\'image';
  container.appendChild(hint);

  const TARGET_CLICKS = 8;
  const W = 200, H = 130;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#e8e8e8';
  ctx.fillRect(0, 0, W, H);

  const tmp = document.createElement('canvas');
  const tctx = tmp.getContext('2d');

  const img = new Image();
  img.crossOrigin = 'anonymous';

  let clicks = 0;
  let solved = false;
  let imgReady = false;

  const draw = () => {
    if (!imgReady) return;
    // explicit pixel grids so each click is clearly different
    const STEPS = [4, 8, 14, 22, 32, 48, 70, 110, 0];
    const grid = STEPS[Math.min(clicks, STEPS.length - 1)];
    ctx.clearRect(0, 0, W, H);
    if (grid === 0) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, W, H);
      return;
    }
    const sw = grid;
    const sh = Math.max(1, Math.round(grid * H / W));
    tmp.width = sw;
    tmp.height = sh;
    tctx.imageSmoothingEnabled = true;
    tctx.clearRect(0, 0, sw, sh);
    tctx.drawImage(img, 0, 0, sw, sh);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, sw, sh, 0, 0, W, H);
  };

  img.addEventListener('load', () => {
    imgReady = true;
    draw();
  });
  img.src = image;
  if (img.complete && img.naturalWidth > 0) {
    imgReady = true;
    draw();
  }

  const handleClick = () => {
    if (solved) return;
    clicks++;
    counter.textContent = `${Math.min(clicks, TARGET_CLICKS)} / ${TARGET_CLICKS}`;
    draw();
    if (clicks >= TARGET_CLICKS) {
      solved = true;
      hint.textContent = '✓ Image révélée !';
      hint.classList.add('solved');
      setTimeout(onSolve, 300);
    } else {
      hint.textContent = 'Continuez à cliquer';
    }
  };

  stage.addEventListener('click', handleClick);
}
