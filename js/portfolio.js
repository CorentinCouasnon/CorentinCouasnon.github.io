import { mountJigsaw } from './puzzles/jigsaw.js';
import { mountScratch } from './puzzles/scratch.js';
import { mountPixelate } from './puzzles/pixelate.js';
import { mountRgb } from './puzzles/rgb.js';
import { mountRotate } from './puzzles/rotate.js';
import { mountTaquin } from './puzzles/taquin.js';
import { mountCaptcha } from './puzzles/captcha.js';

const PUZZLES = {
  jigsaw: mountJigsaw,
  scratch: mountScratch,
  pixelate: mountPixelate,
  rgb: mountRgb,
  rotate: mountRotate,
  taquin: mountTaquin,
  captcha: mountCaptcha,
};

const PROJECTS = [
  {
    id: 'kirae',
    name: 'Kirae',
    category: 'Expériences pro',
    desc: "Application mobile de développement et certification des compétences via une dizaine de mini-jeux cognitifs (mémoire, réactivité, planification).",
    tags: ['Unity', 'C#', 'Mobile'],
    links: [{ label: 'Voir la vidéo', href: 'https://www.youtube.com/watch?v=TCc27GlOGVI' }],
    image: 'images/kirae/1.webp',
    puzzle: 'pixelate',
    accent: '#ff4d4d',
    subs: [
      { name: 'Écran des jeux', desc: "Sélection parmi une dizaine de mini-jeux ciblant chacun une compétence cognitive." },
      { name: '"Avec ceci ?"', desc: "Mémorisez les commandes des clients et servez-les correctement." },
      { name: '"Sushi Master"', desc: "Attrapez les sushis, évitez les arêtes. Réactivité et décision rapide." },
    ],
  },
  {
    id: 'softkids',
    name: 'Soft Kids',
    category: 'Expériences pro',
    desc: "Application mobile éducative iOS & Android. 8 programmes de développement socio-émotionnel pour enfants avec espace parents intégré.",
    tags: ['Unity', 'C#', 'Firebase', 'iOS', 'Android'],
    links: [],
    image: 'images/softkids/2.png',
    puzzle: 'scratch',
    accent: '#ff8c00',
    subs: [
      { name: 'Espace parents', desc: "Suivi de la progression par programme et par niveau." },
      { name: 'Mini-jeu de tri', desc: "Système de swipe parmi 30+ types de jeux interactifs." },
      { name: 'Défis quotidiens', desc: "Activités guidées pour ancrer les apprentissages." },
    ],
  },
  {
    id: 'scrabbland',
    name: 'Scrabbland',
    category: 'Gaming Campus',
    desc: "Jeu roguelike autour du Scrabble avec IA au comportement avancé, développé en une semaine.",
    tags: ['Unity', 'C#', 'IA', 'Roguelike'],
    links: [{ label: 'GitHub', href: 'https://github.com/CorentinCouasnon/Scrabbland' }],
    image: 'images/gc/scrabbland.png',
    puzzle: 'jigsaw',
    accent: '#8b5cf6',
  },
  {
    id: 'fps',
    name: 'FPS Multijoueur',
    category: 'Gaming Campus',
    desc: "Ajout d'une fonctionnalité multijoueur à un FPS de démo Unity. Synchronisation des joueurs, netcode.",
    tags: ['Unity', 'C#', 'Multijoueur'],
    links: [{ label: 'GitHub', href: 'https://github.com/CorentinCouasnon/MicrogameGC' }],
    image: 'images/gc/multijoueur.png',
    puzzle: 'rgb',
    accent: '#0ea5e9',
  },
  {
    id: 'snow',
    name: 'Snow Sickness',
    category: 'Gaming Campus',
    desc: "Jeu multijoueur 2D de combat de boules de neige, développé en équipe en une semaine.",
    tags: ['Unity', 'C#', 'Multijoueur', '2D'],
    links: [{ label: 'Itch.io', href: 'https://superzero4.itch.io/snow-sickness' }],
    image: 'images/gc/snow.jpg',
    puzzle: 'rotate',
    accent: '#22c55e',
  },
  {
    id: 'wordhippo',
    name: 'WordHippo',
    category: 'Projets personnels',
    desc: "Jeu de mots multijoueur en ligne inspiré du Scrabble. Grille 19×19, compétences, boutique de power-ups et matchmaking.",
    tags: ['Firebase', 'IA', 'Multijoueur'],
    links: [],
    image: 'images/perso/wordhippo.png',
    puzzle: 'taquin',
    accent: '#f59e0b',
  },
  {
    id: 'poker',
    name: 'Poker Hand Tracker',
    category: 'Projets personnels',
    desc: "Outil de suivi de mains de poker en direct avec coaching IA. Saisie des actions, calcul des stacks, analyse main par main.",
    tags: ['IA', 'Live Tool'],
    links: [],
    image: 'images/perso/poker%20tracker.png',
    puzzle: 'captcha',
    accent: '#ec4899',
  },
];

const CATEGORIES = ['Expériences pro', 'Gaming Campus', 'Projets personnels'];

const storageKey = (id) => `portfolio_unlocked_${id}`;
const isUnlocked = (id) => localStorage.getItem(storageKey(id)) === 'true';
const setUnlocked = (id) => localStorage.setItem(storageKey(id), 'true');

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

function buildRevealedCard(project, indexLabel) {
  const card = el('div', { class: 'card-revealed' });

  card.appendChild(el('img', { class: 'project-image', src: project.image, alt: project.name, loading: 'lazy' }));

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

  body.appendChild(el('div', { class: 'project-card-footer' }, [
    el('div', { class: 'unlocked-badge' }, [
      el('span', { class: 'unlocked-badge-dot' }),
      'Débloqué',
    ]),
  ]));

  card.appendChild(body);
  return card;
}

function buildCard(project, globalIndex) {
  const wrapper = el('div', { class: 'card-wrapper', style: `--accent:${project.accent}` });
  const indexLabel = String(globalIndex + 1).padStart(2, '0');

  const reveal = () => {
    wrapper.innerHTML = '';
    wrapper.appendChild(buildRevealedCard(project, indexLabel));
  };

  if (isUnlocked(project.id)) {
    reveal();
    return wrapper;
  }

  // Locked: show puzzle overlay
  const overlay = el('div', { class: 'locked-overlay', style: `--accent:${project.accent}` });
  wrapper.appendChild(overlay);

  const onSolve = () => {
    setUnlocked(project.id);
    overlay.classList.add('unlocking');
    overlay.addEventListener('animationend', () => {
      overlay.remove();
      wrapper.appendChild(buildRevealedCard(project, indexLabel));
    }, { once: true });
  };

  const mount = PUZZLES[project.puzzle];
  mount(overlay, { accent: project.accent, image: project.image, onSolve });

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
