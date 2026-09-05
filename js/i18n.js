import fr from './locales/fr.js';
import en from './locales/en.js';

export const SUPPORTED_LOCALES = ['en', 'fr'];
export const DEFAULT_LOCALE = 'en';

// Endonymes : chaque langue est affichée dans son propre nom, quelle que soit
// la langue active de l'interface.
export const LOCALE_NAMES = { en: 'English', fr: 'Français' };

const MESSAGES = { en, fr };
const STORAGE_KEY = 'portfolio.locale';
const listeners = new Set();

let current = DEFAULT_LOCALE;

function isSupported(value) {
  return !!value && SUPPORTED_LOCALES.includes(value);
}

function detectLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isSupported(stored)) return stored;
  } catch {
    // navigation privée ou stockage désactivé : on retombe sur la langue du navigateur
  }
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of candidates) {
    const base = tag?.toLowerCase().split('-')[0];
    if (isSupported(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function activeLocale() {
  return current;
}

/** Résout une clé pointée ("bio.title") dans la locale active, avec repli sur l'anglais. */
export function t(key) {
  const resolve = (locale) => key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), MESSAGES[locale]);
  const value = resolve(current) ?? resolve(DEFAULT_LOCALE);
  return value === undefined ? key : value;
}

export function setLocale(locale) {
  if (!isSupported(locale) || locale === current) return;
  current = locale;
  document.documentElement.setAttribute('lang', locale);
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // au pire, la langue reste changée en mémoire pour cette visite
  }
  for (const listener of listeners) listener(locale);
}

export function onLocaleChange(listener) {
  listeners.add(listener);
}

/** Applique la locale détectée. À appeler une fois avant le premier rendu. */
export function initLocale() {
  current = detectLocale();
  document.documentElement.setAttribute('lang', current);
  return current;
}

/**
 * Traduit les nœuds statiques : `data-i18n` remplace le texte, `data-i18n-html`
 * le contenu HTML (paragraphes contenant des <strong>).
 */
export function applyTranslations(root = document) {
  for (const node of root.querySelectorAll('[data-i18n]')) {
    node.textContent = t(node.getAttribute('data-i18n'));
  }
  for (const node of root.querySelectorAll('[data-i18n-html]')) {
    node.innerHTML = t(node.getAttribute('data-i18n-html'));
  }
  document.title = t('meta.title');
}
