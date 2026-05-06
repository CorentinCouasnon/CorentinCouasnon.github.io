export function mountRotate(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Réorientez les pièces';
  container.appendChild(label);

  const stage = document.createElement('div');
  stage.className = 'rotate-stage';
  container.appendChild(stage);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Tapez pour faire pivoter';
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
    cell.style.backgroundImage = `url('${image}')`;
    const obj = { el: cell, rot: rotations[i] };
    cell.style.transform = `rotate(${obj.rot}deg)`;
    cell.addEventListener('click', () => {
      // Lock the cell once it's at a correct (multiple-of-360) orientation
      if (solved || obj.rot % 360 === 0) return;
      // Keep an absolute (always-increasing) rotation so the CSS transition
      // always rotates clockwise — going from 270 to 360 visually lands on 0
      // without unwinding backwards through 180/90.
      obj.rot += 90;
      cell.style.transform = `rotate(${obj.rot}deg)`;
      update();
    });
    cells.push(obj);
    stage.appendChild(cell);
  }

  update();
  hint.textContent = 'Tapez pour faire pivoter';
}
