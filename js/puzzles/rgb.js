export function mountRgb(container, { accent, image, onSolve }) {
  container.innerHTML = '';
  const label = document.createElement('div');
  label.className = 'puzzle-label';
  label.textContent = 'Règle les couleurs';
  container.appendChild(label);

  const wrap = document.createElement('div');
  wrap.className = 'rgb-image-wrap';
  const img = document.createElement('img');
  img.className = 'rgb-image';
  img.src = image;
  img.alt = '';
  wrap.appendChild(img);
  container.appendChild(wrap);

  const sliders = document.createElement('div');
  sliders.className = 'rgb-sliders';
  container.appendChild(sliders);

  const hint = document.createElement('div');
  hint.className = 'puzzle-hint';
  hint.textContent = 'Centre les 3 sliders';
  container.appendChild(hint);

  // Each slider: -100 to 100, target = 0, tolerance ±10.
  // R = hue-rotate(value * 1.8 deg), G = saturate offset, B = brightness offset.
  const channels = [
    { key: 'r', label: 'R', color: '#ef4444', start: 70 },
    { key: 'g', label: 'G', color: '#22c55e', start: -55 },
    { key: 'b', label: 'B', color: '#3b82f6', start: 60 },
  ];

  const values = {};
  let solved = false;

  const applyFilter = () => {
    const hue = values.r * 1.8;
    const sat = 1 + values.g / 100;
    const bright = 1 + values.b / 200;
    img.style.filter = `hue-rotate(${hue}deg) saturate(${sat}) brightness(${bright})`;
  };

  const checkSolved = () => {
    if (solved) return;
    const ok = Object.values(values).every(v => Math.abs(v) <= 10);
    if (ok) {
      solved = true;
      img.style.filter = 'none';
      hint.textContent = '✓ Couleurs corrigées !';
      hint.classList.add('solved');
      setTimeout(onSolve, 350);
    } else {
      const off = Object.values(values).filter(v => Math.abs(v) > 10).length;
      hint.textContent = `${3 - off}/3 canaux alignés`;
    }
  };

  channels.forEach(ch => {
    values[ch.key] = ch.start;
    const row = document.createElement('div');
    row.className = 'rgb-slider-row';
    const lbl = document.createElement('span');
    lbl.className = 'rgb-label';
    lbl.style.color = ch.color;
    lbl.textContent = ch.label;
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = -100;
    slider.max = 100;
    slider.value = ch.start;
    slider.className = 'rgb-slider';
    slider.style.setProperty('--thumb', ch.color);
    slider.addEventListener('input', () => {
      values[ch.key] = +slider.value;
      applyFilter();
      checkSolved();
    });
    row.appendChild(lbl);
    row.appendChild(slider);
    sliders.appendChild(row);
  });

  applyFilter();
}
