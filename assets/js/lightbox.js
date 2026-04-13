document.addEventListener('DOMContentLoaded', () => {
  // Build overlay DOM
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML = `
    <div id="lb-box">
      <button id="lb-close" aria-label="Fermer">×</button>
      <div id="lb-nav">
        <button id="lb-prev" aria-label="Précédent">‹</button>
        <img id="lb-img" src="" alt="">
        <button id="lb-next" aria-label="Suivant">›</button>
      </div>
      <div id="lb-info">
        <h3 id="lb-title"></h3>
        <p id="lb-desc"></p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let currentGroup = [];
  let currentIndex = 0;

  function show(group, index) {
    currentGroup = group;
    currentIndex = index;
    update();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function update() {
    const card = currentGroup[currentIndex];
    const img = document.getElementById('lb-img');
    img.src = card.img;
    img.alt = card.alt;
    document.getElementById('lb-title').textContent = card.title;
    document.getElementById('lb-desc').textContent = card.desc;

    const hasSiblings = currentGroup.length > 1;
    document.getElementById('lb-prev').style.visibility = hasSiblings ? 'visible' : 'hidden';
    document.getElementById('lb-next').style.visibility = hasSiblings ? 'visible' : 'hidden';
  }

  function hide() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    update();
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentGroup.length;
    update();
  }

  // Build card groups per .cards-container block
  document.querySelectorAll('.cards-container').forEach(container => {
    const cards = Array.from(container.querySelectorAll('.project-card'));
    const group = cards.map(card => ({
      img:   card.querySelector('img').src,
      alt:   card.querySelector('img').alt,
      title: card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '',
      desc:  card.querySelector('p')  ? card.querySelector('p').textContent.trim()  : ''
    }));

    cards.forEach((card, i) => {
      const link = card.querySelector('a');
      if (!link) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        show(group, i);
      });
    });
  });

  // Controls
  document.getElementById('lb-close').addEventListener('click', hide);
  document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); prev(); });
  document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); next(); });
  overlay.addEventListener('click', e => { if (e.target === overlay) hide(); });

  // Back to top button
  const topBtn = document.createElement('button');
  topBtn.id = 'back-to-top';
  topBtn.textContent = '↑';
  topBtn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(topBtn);

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 300);
  });

  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')     hide();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });
});
