import { applyTranslations, initLocale, onLocaleChange, t } from './i18n.js';
import { mountLanguageSwitcher } from './languageSwitcher.js';

// Données structurelles des projets : tout le texte vit dans js/locales/*.js,
// indexé par `id` (tags, libellés de liens et légendes suivent l'ordre ci-dessous).
const PROJECTS = [
  {
    id: 'kirae',
    category: 'pro',
    links: ['https://www.youtube.com/watch?v=TCc27GlOGVI'],
    image: 'images/kirae/1.webp',
    accent: '#ff4d4d',
    gallery: ['images/kirae/1.webp', 'images/kirae/2.webp', 'images/kirae/3.webp'],
  },
  {
    id: 'softkids',
    category: 'pro',
    links: [],
    image: 'images/softkids/2.png',
    accent: '#ff8c00',
    gallery: ['images/softkids/1.png', 'images/softkids/2.png', 'images/softkids/3.png', 'images/softkids/4.png'],
  },
  {
    id: 'scrabbland',
    category: 'academic',
    links: ['https://github.com/CorentinCouasnon/Scrabbland'],
    image: 'images/gc/scrabbland.png',
    accent: '#8b5cf6',
  },
  {
    id: 'fps',
    category: 'academic',
    links: ['https://github.com/CorentinCouasnon/MicrogameGC'],
    image: 'images/gc/multijoueur.png',
    accent: '#0ea5e9',
  },
  {
    id: 'snow',
    category: 'academic',
    links: ['https://superzero4.itch.io/snow-sickness'],
    image: 'images/gc/snow.jpg',
    accent: '#22c55e',
  },
  {
    id: 'wordanza',
    category: 'personal',
    links: ['https://wordanza.app'],
    image: 'images/perso/wordanza%201.png',
    accent: '#f59e0b',
    gallery: ['images/perso/wordanza%201.png', 'images/perso/wordanza%202.png', 'images/perso/wordanza%203.png'],
  },
  {
    id: 'mpp',
    category: 'personal',
    links: ['https://app.millionpiecepuzzle.com/play'],
    image: 'images/perso/mpp/mpp%200.webp',
    accent: '#c56a3e',
    gallery: [
      'images/perso/mpp/mpp%209.webp',
      'images/perso/mpp/mpp%200.webp',
      'images/perso/mpp/mpp%204.webp',
      'images/perso/mpp/mpp%201.webp',
      'images/perso/mpp/mpp%202.webp',
      'images/perso/mpp/mpp%205.webp',
      'images/perso/mpp/mpp%206.webp',
      'images/perso/mpp/mpp%208.webp',
      'images/perso/mpp/mpp%2010.webp',
    ],
  },
  {
    id: 'poker',
    category: 'personal',
    links: [],
    image: 'images/perso/poker%20tracker.png',
    accent: '#ec4899',
  },
];

const CATEGORIES = ['pro', 'academic', 'personal'];

/** Textes traduits du projet, dans la langue active. */
function content(project) {
  return t('projects.' + project.id);
}

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
  const text = content(project);
  const captions = text.gallery || [];
  const images = (project.gallery && project.gallery.length)
    ? project.gallery.map((src, i) => ({ src, caption: captions[i] || text.name }))
    : [{ src: project.image, caption: text.name }];
  let index = 0;

  const overlay = el('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true' });
  const img = el('img', { class: 'lightbox-img', alt: '' });
  const caption = el('div', { class: 'lightbox-caption' });
  const counter = el('div', { class: 'lightbox-counter' });
  const figure = el('figure', { class: 'lightbox-figure' }, [img, caption]);
  const closeBtn = el('button', { class: 'lightbox-close', type: 'button', 'aria-label': t('lightbox.close') }, '×');
  const prevBtn = el('button', { class: 'lightbox-nav lightbox-prev', type: 'button', 'aria-label': t('lightbox.prev') }, '‹');
  const nextBtn = el('button', { class: 'lightbox-nav lightbox-next', type: 'button', 'aria-label': t('lightbox.next') }, '›');

  const update = () => {
    const item = images[index];
    img.src = item.src;
    img.alt = item.caption || text.name;
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
  const text = content(project);
  const card = el('div', { class: 'card-revealed' });

  const cover = el('img', {
    class: 'project-image',
    src: project.image,
    alt: text.name,
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
  body.appendChild(el('div', { class: 'project-name' }, text.name));
  body.appendChild(el('div', { class: 'project-desc' }, text.desc));

  if (text.tags?.length) {
    body.appendChild(el('div', { class: 'project-tags' },
      text.tags.map(tag => el('span', { class: 'project-tag', style: `color:${project.accent};border-color:${project.accent}40` }, tag))
    ));
  }

  if (text.subs?.length) {
    body.appendChild(el('div', { class: 'project-subs' },
      text.subs.map(s => el('div', { class: 'project-sub' }, [
        el('div', { class: 'project-sub-name' }, s.name),
        el('div', { class: 'project-sub-desc' }, s.desc),
      ]))
    ));
  }

  if (project.links?.length) {
    body.appendChild(el('div', { class: 'project-links' },
      project.links.map((href, i) => el('a', { class: 'project-link', href, target: '_blank', rel: 'noreferrer', style: `color:${project.accent}` }, text.links?.[i] || href))
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

function renderProjects() {
  const container = document.getElementById('sections');
  container.replaceChildren();
  let globalIdx = 0;

  for (const cat of CATEGORIES) {
    const items = PROJECTS.filter(p => p.category === cat);
    if (!items.length) continue;

    const section = el('section', { class: 'section' });
    section.appendChild(el('h2', { class: 'section-label' }, t('categories.' + cat)));
    const grid = el('div', { class: 'projects-grid' });
    items.forEach(p => grid.appendChild(buildCard(p, globalIdx++)));
    section.appendChild(grid);
    container.appendChild(section);
  }
}

function init() {
  initLocale();
  onLocaleChange(() => {
    applyTranslations();
    renderProjects();
  });

  mountLanguageSwitcher(document.querySelector('.site-header'));
  applyTranslations();
  renderProjects();
}

init();
