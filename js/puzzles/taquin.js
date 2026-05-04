export function mountTaquin(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Reconstitue le taquin';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'taquin-stage';
  container.appendChild(stage);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Tape une tuile à côté du vide';
  container.appendChild(hint);

  // 3x3 grid; 9th tile is empty. Start from solved, do a few random valid moves to scramble (always solvable).
  const SIZE = 3;
  let tiles = Array.from({ length: SIZE * SIZE }, (_, i) => i); // 0..7 = pieces, 8 = empty
  let solved = false;

  const idxOfEmpty = () => tiles.indexOf(SIZE * SIZE - 1);
  const neighbors = (idx) => {
    const r = Math.floor(idx / SIZE), c = idx % SIZE;
    const out = [];
    if (r > 0) out.push(idx - SIZE);
    if (r < SIZE - 1) out.push(idx + SIZE);
    if (c > 0) out.push(idx - 1);
    if (c < SIZE - 1) out.push(idx + 1);
    return out;
  };

  // Scramble: ~12 random moves (simple, never produces solved state)
  let prev = -1;
  for (let s = 0; s < 18; s++) {
    const empty = idxOfEmpty();
    const opts = neighbors(empty).filter(n => n !== prev);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    [tiles[empty], tiles[pick]] = [tiles[pick], tiles[empty]];
    prev = empty;
  }
  // ensure not already solved
  if (tiles.every((t, i) => t === i)) {
    [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
  }

  const tileEls = [];
  for (let i = 0; i < SIZE * SIZE; i++) {
    const el = document.createElement('div');
    el.className = 'taquin-tile';
    stage.appendChild(el);
    tileEls.push(el);
  }

  const tilePosition = (val) => {
    // val 0..7 represents the original cell index; bg shows that part of the image
    const r = Math.floor(val / SIZE), c = val % SIZE;
    return `-${c * 60}px -${r * 60}px`;
  };

  const render = () => {
    tiles.forEach((val, slot) => {
      const el = tileEls[slot];
      if (val === SIZE * SIZE - 1) {
        el.className = 'taquin-tile empty';
        el.style.backgroundImage = '';
      } else {
        el.className = 'taquin-tile';
        el.style.backgroundImage = `url('${image}')`;
        el.style.backgroundPosition = tilePosition(val);
      }
    });
    const placed = tiles.filter((t, i) => t === i).length;
    hint.textContent = placed === SIZE * SIZE ? '✓ Reconstitué !' : `${placed}/${SIZE * SIZE} en place`;
  };

  const click = (slot) => {
    if (solved) return;
    const empty = idxOfEmpty();
    if (!neighbors(empty).includes(slot)) return;
    [tiles[empty], tiles[slot]] = [tiles[slot], tiles[empty]];
    render();
    if (tiles.every((t, i) => t === i)) {
      solved = true;
      // fill the empty with the last piece for a clean reveal
      const lastSlot = tiles.length - 1;
      tileEls[lastSlot].classList.remove('empty');
      tileEls[lastSlot].style.backgroundImage = `url('${image}')`;
      tileEls[lastSlot].style.backgroundPosition = tilePosition(lastSlot);
      setTimeout(onSolve, 350);
    }
  };

  tileEls.forEach((el, slot) => el.addEventListener('click', () => click(slot)));
  render();
}
