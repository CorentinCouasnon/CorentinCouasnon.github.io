export function mountCaptcha(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Clique sur les bugs';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'captcha-stage';
  container.appendChild(stage);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Trouve les 3 bugs';
  container.appendChild(hint);

  const SIZE = 3;
  const TOTAL = SIZE * SIZE;
  const BUG_COUNT = 3;

  // pick 3 random cells to host bugs
  const indices = Array.from({ length: TOTAL }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const buggy = new Set(indices.slice(0, BUG_COUNT));
  const cleared = new Set();
  let solved = false;

  for (let i = 0; i < TOTAL; i++) {
    const r = Math.floor(i / SIZE), c = i % SIZE;
    const cell = document.createElement('div');
    cell.className = 'captcha-cell';
    cell.style.backgroundImage = `url('${image}')`;
    cell.style.backgroundPosition = `-${c * 60}px -${r * 60}px`;

    if (buggy.has(i)) {
      const bug = document.createElement('div');
      bug.className = 'captcha-bug';
      const emoji = document.createElement('span');
      emoji.textContent = '🐛';
      bug.appendChild(emoji);
      cell.appendChild(bug);
    }

    cell.addEventListener('click', () => {
      if (solved || cleared.has(i)) return;
      if (!buggy.has(i)) return;
      cleared.add(i);
      cell.classList.add('clean');
      hint.textContent = `${cleared.size}/${BUG_COUNT} bugs corrigés`;
      if (cleared.size === BUG_COUNT) {
        solved = true;
        hint.textContent = '✓ Aucun bug !';
        hint.classList.add('solved');
        setTimeout(onSolve, 350);
      }
    });

    stage.appendChild(cell);
  }
}
