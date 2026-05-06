export function mountTaquin(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Reconstituez le taquin';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'taquin-stage';
  container.appendChild(stage);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Tapez une tuile à côté du vide';
  container.appendChild(hint);

  // 3 cols × 2 rows = 6 cells, last is empty.
  const COLS = 2, ROWS = 2;
  const TOTAL = COLS * ROWS;
  const TILE = 90;
  let solved = false;
  let tiles = Array.from({ length: TOTAL }, (_, i) => i);

  const idxOfEmpty = () => tiles.indexOf(TOTAL - 1);
  const neighbors = (idx) => {
    const r = Math.floor(idx / COLS), c = idx % COLS;
    const out = [];
    if (r > 0) out.push(idx - COLS);
    if (r < ROWS - 1) out.push(idx + COLS);
    if (c > 0) out.push(idx - 1);
    if (c < COLS - 1) out.push(idx + 1);
    return out;
  };

  // Random walk of valid swaps from solved → keeps parity, always solvable.
  // No "no-undo" filter: on a 2x2 the empty has only 2 neighbours so blocking
  // the previous move would force a deterministic loop.
  // On a 2x2, even-vs-odd move counts unlock different halves of the
  // 12 solvable permutations, so randomise the parity to cover all of them.
  const SCRAMBLE = 30 + Math.floor(Math.random() * 2);
  for (let s = 0; s < SCRAMBLE; s++) {
    const empty = idxOfEmpty();
    const opts = neighbors(empty);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    [tiles[empty], tiles[pick]] = [tiles[pick], tiles[empty]];
  }
  // If we randomly land on the solved state, do one more swap to scramble it.
  if (tiles.every((t, i) => t === i)) {
    const empty = idxOfEmpty();
    const opts = neighbors(empty);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    [tiles[empty], tiles[pick]] = [tiles[pick], tiles[empty]];
  }

  const tileEls = [];
  for (let i = 0; i < TOTAL; i++) {
    const el = document.createElement('div');
    el.className = 'taquin-tile';
    stage.appendChild(el);
    tileEls.push(el);
  }

  const tileBgPosition = (val) => {
    const r = Math.floor(val / COLS), c = val % COLS;
    return `-${c * TILE}px -${r * TILE}px`;
  };

  const render = () => {
    tiles.forEach((val, slot) => {
      const el = tileEls[slot];
      if (val === TOTAL - 1) {
        el.className = 'taquin-tile empty';
        el.style.backgroundImage = '';
      } else {
        el.className = 'taquin-tile';
        el.style.backgroundImage = `url('${image}')`;
        el.style.backgroundPosition = tileBgPosition(val);
      }
    });
    const placed = tiles.filter((t, i) => t === i).length;
    hint.classList.toggle('solved', placed === TOTAL);
    hint.textContent = placed === TOTAL ? '✓ Reconstitué !' : `${placed}/${TOTAL} en place`;
  };

  const click = (slot) => {
    if (solved) return;
    const empty = idxOfEmpty();
    if (!neighbors(empty).includes(slot)) return;
    [tiles[empty], tiles[slot]] = [tiles[slot], tiles[empty]];
    render();
    if (tiles.every((t, i) => t === i)) {
      solved = true;
      const lastSlot = TOTAL - 1;
      tileEls[lastSlot].classList.remove('empty');
      tileEls[lastSlot].style.backgroundImage = `url('${image}')`;
      tileEls[lastSlot].style.backgroundPosition = tileBgPosition(lastSlot);
      setTimeout(onSolve, 350);
    }
  };

  tileEls.forEach((el, slot) => el.addEventListener('click', () => click(slot)));
  render();
}
