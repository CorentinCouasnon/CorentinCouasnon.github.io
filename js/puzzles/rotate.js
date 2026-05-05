export function mountRotate(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Réoriente les pièces';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'rotate-stage';
  container.appendChild(stage);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Tape pour faire pivoter';
  container.appendChild(hint);

  // 4 cells, each a window over the same image, with random rotation 90/180/270.
  const rotations = [90, 180, 270, 90];
  // shuffle to randomize per load
  for (let i = rotations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rotations[i], rotations[j]] = [rotations[j], rotations[i]];
  }

  let solved = false;
  const cells = [];

  const update = () => {
    const ok = cells.every(c => c.rot % 360 === 0);
    const n = cells.filter(c => c.rot % 360 === 0).length;
    cells.forEach(c => c.el.classList.toggle('solved', c.rot % 360 === 0));
    if (ok && !solved) {
      solved = true;
      hint.textContent = '✓ Image reconstituée !';
      hint.classList.add('solved');
      setTimeout(onSolve, 350);
    } else {
      hint.textContent = `${n}/4 pièces alignées`;
    }
  };

  for (let i = 0; i < 4; i++) {
    const cell = document.createElement('div');
    cell.className = 'rotate-cell';
    cell.setAttribute('data-pos', i);
    const im = document.createElement('img');
    im.src = image;
    im.alt = '';
    cell.appendChild(im);
    const obj = { el: cell, rot: rotations[i] };
    cell.style.transform = `rotate(${obj.rot}deg)`;
    cell.addEventListener('click', () => {
      if (solved) return;
      obj.rot = (obj.rot + 90) % 360;
      cell.style.transform = `rotate(${obj.rot}deg)`;
      update();
    });
    cells.push(obj);
    stage.appendChild(cell);
  }

  update();
  hint.textContent = 'Tape pour faire pivoter';
}
