const PROJECTS = [
  {
    id: 'kirae',
    name: 'Kirae',
    category: 'Expériences professionnelles',
    desc: "Application mobile de développement et certification des compétences via une dizaine de mini-jeux cognitifs (mémoire, réactivité, planification).",
    tags: ['Unity', 'C#'],
    links: [{ label: 'Voir la vidéo', href: 'https://www.youtube.com/watch?v=TCc27GlOGVI' }],
    image: 'images/kirae/1.webp',
    accent: '#ff4d4d',
    subs: [
      { name: 'Jouer', desc: "Des sessions courtes et ludiques pensées pour un usage régulier." },
      { name: 'Développer', desc: "Statistiques détaillées pour visualiser la progression de chaque compétence." },
      { name: 'Certifier', desc: "Badges débloqués au fil des performances pour valoriser les compétences acquises." },
    ],
    gallery: [
      { src: 'images/kirae/1.webp', caption: 'Kirae — Écran de sélection des mini-jeux' },
      { src: 'images/kirae/2.webp', caption: 'Kirae — "Avec ceci ?" : mémorisation des commandes' },
      { src: 'images/kirae/3.webp', caption: 'Kirae — "Sushi Master" : réactivité et décision rapide' },
    ],
  },
  {
    id: 'softkids',
    name: 'Soft Kids',
    category: 'Expériences professionnelles',
    desc: "Application mobile éducative iOS & Android. 8 programmes de développement socio-émotionnel pour enfants avec espace parents intégré.",
    tags: ['Unity', 'C#', 'Firebase'],
    links: [],
    image: 'images/softkids/2.png',
    accent: '#ff8c00',
    subs: [
      { name: 'Espace parents', desc: "Suivi de la progression par programme et par niveau." },
      { name: 'Mini-jeux', desc: "Plus de 30 mini-jeux différents pour rendre les apprentissages variés et stimulants." },
      { name: 'Défis quotidiens', desc: "Activités guidées pour ancrer les apprentissages." },
    ],
    gallery: [
      { src: 'images/softkids/1.png', caption: 'Soft Kids — Accueil et programmes' },
      { src: 'images/softkids/2.png', caption: 'Soft Kids — Espace parents' },
      { src: 'images/softkids/3.png', caption: 'Soft Kids — Mini-jeu de tri' },
      { src: 'images/softkids/4.png', caption: 'Soft Kids — Défis quotidiens' },
    ],
  },
  {
    id: 'scrabbland',
    name: 'Scrabbland',
    category: 'Projets académiques',
    desc: "Jeu de mots roguelike avec IA au comportement avancé.",
    tags: ['Unity', 'C#'],
    links: [{ label: 'GitHub', href: 'https://github.com/CorentinCouasnon/Scrabbland' }],
    image: 'images/gc/scrabbland.png',
    accent: '#8b5cf6',
  },
  {
    id: 'fps',
    name: 'FPS Multijoueur',
    category: 'Projets académiques',
    desc: "Ajout d'une fonctionnalité multijoueur à un FPS de démo Unity. Synchronisation des joueurs, netcode.",
    tags: ['Unity', 'C#'],
    links: [{ label: 'GitHub', href: 'https://github.com/CorentinCouasnon/MicrogameGC' }],
    image: 'images/gc/multijoueur.png',
    accent: '#0ea5e9',
  },
  {
    id: 'snow',
    name: 'Snow Sickness',
    category: 'Projets académiques',
    desc: "Jeu multijoueur 2D de combat de boules de neige, développé en équipe.",
    tags: ['Unity', 'C#'],
    links: [{ label: 'Itch.io', href: 'https://superzero4.itch.io/snow-sickness' }],
    image: 'images/gc/snow.jpg',
    accent: '#22c55e',
  },
  {
    id: 'wordhippo',
    name: 'Wordanza',
    category: 'Projets personnels',
    desc: "Jeu de mots multijoueur asynchrone en ligne. Compétences, boutique de power-ups et matchmaking.",
    tags: ['Firebase', 'IA'],
    links: [{ label: 'wordanza.app', href: 'https://wordanza.app' }],
    image: 'images/perso/wordanza%201.png',
    accent: '#f59e0b',
    gallery: [
      { src: 'images/perso/wordanza%201.png', caption: 'Wordanza' },
      { src: 'images/perso/wordanza%202.png', caption: 'Wordanza' },
      { src: 'images/perso/wordanza%203.png', caption: 'Wordanza' },
    ],
  },
  {
    id: 'mpp',
    name: 'Million Piece Puzzle',
    category: 'Projets personnels',
    desc: "Puzzle collaboratif en ligne d'un million de pièces sur un plateau partagé unique. Rendu WebGL zoomable, activité en direct et classement des contributeurs.",
    tags: ['WebGL', 'Temps réel', 'IA'],
    links: [{ label: 'millionpiecepuzzle.com', href: 'https://app.millionpiecepuzzle.com/play' }],
    image: 'images/perso/mpp/mpp%200.webp',
    accent: '#c56a3e',
    gallery: [
      { src: 'images/perso/mpp/mpp%209.webp', caption: 'Million Piece Puzzle — Accueil et progression du plateau' },
      { src: 'images/perso/mpp/mpp%200.webp', caption: 'Million Piece Puzzle — Le plateau partagé en cours d\'assemblage' },
      { src: 'images/perso/mpp/mpp%204.webp', caption: 'Million Piece Puzzle — Zoom sur les pièces individuelles' },
      { src: 'images/perso/mpp/mpp%201.webp', caption: 'Million Piece Puzzle — Vue dézoomée sur les pièces restantes' },
      { src: 'images/perso/mpp/mpp%202.webp', caption: 'Million Piece Puzzle — Une zone du plateau presque terminée' },
      { src: 'images/perso/mpp/mpp%205.webp', caption: 'Million Piece Puzzle — L\'image de référence, "Earth Mosaic"' },
      { src: 'images/perso/mpp/mpp%206.webp', caption: 'Million Piece Puzzle — La référence est elle-même une mosaïque de photos' },
      { src: 'images/perso/mpp/mpp%208.webp', caption: 'Million Piece Puzzle — Puzzle assemblé : 1 000 000 de pièces placées' },
      { src: 'images/perso/mpp/mpp%2010.webp', caption: 'Million Piece Puzzle — Écran de fin et classement final' },
    ],
  },
  {
    id: 'poker',
    name: 'Poker Hand Tracker',
    category: 'Projets personnels',
    desc: "Outil de suivi de mains de poker en direct avec coaching IA. Saisie des actions, calcul des stacks, analyse main par main.",
    tags: ['IA'],
    links: [],
    image: 'images/perso/poker%20tracker.png',
    accent: '#ec4899',
  },
];

const CATEGORIES = ['Expériences professionnelles', 'Projets académiques', 'Projets personnels'];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'style') node.setAttribute('style', v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  }
  for (const child of [].concat(children)) {
    if (child == null || child === false) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function openLightbox(project) {
  const images = (project.gallery && project.gallery.length)
    ? project.gallery
    : [{ src: project.image, caption: project.name }];
  let index = 0;

  const overlay = el('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true' });
  const img = el('img', { class: 'lightbox-img', alt: '' });
  const caption = el('div', { class: 'lightbox-caption' });
  const counter = el('div', { class: 'lightbox-counter' });
  const figure = el('figure', { class: 'lightbox-figure' }, [img, caption]);
  const closeBtn = el('button', { class: 'lightbox-close', type: 'button', 'aria-label': 'Fermer' }, '×');
  const prevBtn = el('button', { class: 'lightbox-nav lightbox-prev', type: 'button', 'aria-label': 'Précédent' }, '‹');
  const nextBtn = el('button', { class: 'lightbox-nav lightbox-next', type: 'button', 'aria-label': 'Suivant' }, '›');

  const update = () => {
    const item = images[index];
    img.src = item.src;
    img.alt = item.caption || project.name;
    caption.textContent = item.caption || '';
    counter.textContent = images.length > 1 ? `${index + 1} / ${images.length}` : '';
  };
  const step = (delta) => { index = (index + delta + images.length) % images.length; update(); };
  const close = () => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
    overlay.remove();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && images.length > 1) step(-1);
    else if (e.key === 'ArrowRight' && images.length > 1) step(1);
  };

  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); step(-1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); step(1); });
  document.addEventListener('keydown', onKey);

  overlay.appendChild(closeBtn);
  if (images.length > 1) {
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(counter);
  }
  overlay.appendChild(figure);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  update();
}

function buildRevealedCard(project, indexLabel) {
  const card = el('div', { class: 'card-revealed' });

  const cover = el('img', {
    class: 'project-image',
    src: project.image,
    alt: project.name,
    loading: 'lazy',
    onclick: () => openLightbox(project),
  });
  card.appendChild(cover);

  const body = el('div', { class: 'project-card' });

  const top = el('div', { class: 'project-card-top' }, [
    el('span', { class: 'project-accent-dot', style: `background:${project.accent}` }),
    el('span', { class: 'project-number', style: `color:${project.accent}` }, indexLabel),
  ]);
  body.appendChild(top);
  body.appendChild(el('div', { class: 'project-name' }, project.name));
  body.appendChild(el('div', { class: 'project-desc' }, project.desc));

  if (project.tags?.length) {
    body.appendChild(el('div', { class: 'project-tags' },
      project.tags.map(t => el('span', { class: 'project-tag', style: `color:${project.accent};border-color:${project.accent}40` }, t))
    ));
  }

  if (project.subs?.length) {
    body.appendChild(el('div', { class: 'project-subs' },
      project.subs.map(s => el('div', { class: 'project-sub' }, [
        el('div', { class: 'project-sub-name' }, s.name),
        el('div', { class: 'project-sub-desc' }, s.desc),
      ]))
    ));
  }

  if (project.links?.length) {
    body.appendChild(el('div', { class: 'project-links' },
      project.links.map(l => el('a', { class: 'project-link', href: l.href, target: '_blank', rel: 'noreferrer', style: `color:${project.accent}` }, l.label))
    ));
  }

  card.appendChild(body);
  return card;
}

function buildCard(project, globalIndex) {
  const wrapper = el('div', { class: 'card-wrapper' });
  const indexLabel = String(globalIndex + 1).padStart(2, '0');
  wrapper.appendChild(buildRevealedCard(project, indexLabel));
  return wrapper;
}

function init() {
  const container = document.getElementById('sections');
  let globalIdx = 0;

  for (const cat of CATEGORIES) {
    const items = PROJECTS.filter(p => p.category === cat);
    if (!items.length) continue;

    const section = el('section', { class: 'section' });
    section.appendChild(el('h2', { class: 'section-label' }, cat));
    const grid = el('div', { class: 'projects-grid' });
    items.forEach(p => grid.appendChild(buildCard(p, globalIdx++)));
    section.appendChild(grid);
    container.appendChild(section);
  }
}

init();
