export function mountJigsaw(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Reconstitue';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'jigsaw-stage';
  container.appendChild(stage);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Glisse les pièces vers le centre';
  container.appendChild(hint);

  const targets = [
    { x: -35, y: -35 }, { x: 35, y: -35 },
    { x: -35, y: 35 }, { x: 35, y: 35 },
  ];
  // Random scattered start positions, kept outside the central target area
  // and far enough from each other to avoid stacking.
  const randStart = (others) => {
    for (let attempt = 0; attempt < 40; attempt++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 180;
      if (Math.abs(x) < 60 && Math.abs(y) < 60) continue;
      const tooClose = others.some(o => Math.hypot(o.x - x, o.y - y) < 70);
      if (tooClose) continue;
      return { x, y };
    }
    return { x: (Math.random() - 0.5) * 200, y: (Math.random() - 0.5) * 180 };
  };
  const starts = [];
  for (let i = 0; i < 4; i++) starts.push(randStart(starts));
  const corners = [
    { borderTopLeftRadius: '10px' },
    { borderTopRightRadius: '10px' },
    { borderBottomLeftRadius: '10px' },
    { borderBottomRightRadius: '10px' },
  ];

  const placed = [false, false, false, false];
  const positions = starts.map(p => ({ ...p }));
  const targetEls = [];
  const pieceEls = [];

  targets.forEach((t, i) => {
    const tEl = document.createElement('div');
    tEl.className = 'jigsaw-target';
    tEl.style.left = `${70 + t.x - 32}px`;
    tEl.style.top = `${70 + t.y - 32}px`;
    stage.appendChild(tEl);
    targetEls.push(tEl);
  });

  const placePiece = (i, x, y) => {
    positions[i] = { x, y };
    pieceEls[i].style.left = `${70 + x - 32}px`;
    pieceEls[i].style.top = `${70 + y - 32}px`;
  };

  const updateHint = () => {
    const n = placed.filter(Boolean).length;
    hint.classList.toggle('solved', n === 4);
    if (n === 0) hint.textContent = 'Glisse les pièces vers le centre';
    else if (n < 4) hint.textContent = `${n}/4 pièces placées`;
    else hint.textContent = '✓ Parfait !';
  };

  let solved = false;
  let topZ = 10;

  const bgPositions = [
    '0 0', '-64px 0',
    '0 -64px', '-64px -64px',
  ];

  for (let i = 0; i < 4; i++) {
    const piece = document.createElement('div');
    piece.className = 'jigsaw-piece';
    Object.assign(piece.style, corners[i]);
    piece.style.backgroundImage = `url('${image}')`;
    piece.style.backgroundPosition = bgPositions[i];
    pieceEls.push(piece);
    stage.appendChild(piece);
    placePiece(i, starts[i].x, starts[i].y);

    let dragging = false;
    let offsetX = 0, offsetY = 0;

    const onDown = (e) => {
      if (placed[i] || solved) return;
      e.preventDefault();
      dragging = true;
      piece.classList.add('dragging');
      // bring all other unplaced pieces back to baseline so the picked one is on top
      pieceEls.forEach((el, j) => { if (j !== i && !placed[j]) el.style.zIndex = ''; });
      piece.style.zIndex = ++topZ;
      const pt = e.touches ? e.touches[0] : e;
      offsetX = pt.clientX - positions[i].x;
      offsetY = pt.clientY - positions[i].y;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const pt = e.touches ? e.touches[0] : e;
      const nx = pt.clientX - offsetX;
      const ny = pt.clientY - offsetY;
      placePiece(i, nx, ny);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      piece.classList.remove('dragging');
      const t = targets[i];
      const dx = positions[i].x - t.x;
      const dy = positions[i].y - t.y;
      if (Math.hypot(dx, dy) < 44) {
        placePiece(i, t.x, t.y);
        placed[i] = true;
        piece.classList.add('placed');
        piece.style.zIndex = '';
        targetEls[i].classList.add('placed');
        updateHint();
        if (placed.every(Boolean) && !solved) {
          solved = true;
          setTimeout(onSolve, 300);
        }
      }
    };

    piece.addEventListener('mousedown', onDown);
    piece.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  }
}
