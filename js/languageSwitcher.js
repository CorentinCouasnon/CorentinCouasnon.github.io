import { LOCALE_NAMES, SUPPORTED_LOCALES, activeLocale, setLocale, t, onLocaleChange } from './i18n.js';

const FLAGS = {
  en: 'images/lang/en.svg',
  fr: 'images/lang/fr.svg',
};

const CHEVRON = '<svg class="lang-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" stroke-width="1.5" /></svg>';

function flagImg(locale, className = 'lang-flag') {
  const img = document.createElement('img');
  img.className = className;
  img.src = FLAGS[locale];
  img.alt = LOCALE_NAMES[locale];
  img.width = 22;
  img.height = 22;
  return img;
}

/** Construit le sélecteur de langue et l'insère dans `host`. */
export function mountLanguageSwitcher(host) {
  const root = document.createElement('div');
  root.className = 'lang-switcher';

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'lang-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');

  const triggerFlag = flagImg(activeLocale());
  trigger.appendChild(triggerFlag);
  trigger.insertAdjacentHTML('beforeend', CHEVRON);
  const chevron = trigger.querySelector('.lang-chevron');

  const menu = document.createElement('ul');
  menu.className = 'lang-menu';
  menu.setAttribute('role', 'listbox');
  menu.hidden = true;

  const options = SUPPORTED_LOCALES.map((locale) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'lang-option';
    option.setAttribute('role', 'option');
    option.setAttribute('aria-label', LOCALE_NAMES[locale]);
    option.appendChild(flagImg(locale));
    option.addEventListener('click', () => {
      setLocale(locale);
      close();
    });

    const item = document.createElement('li');
    item.appendChild(option);
    menu.appendChild(item);
    return { locale, option };
  });

  function syncLabels() {
    const current = activeLocale();
    triggerFlag.src = FLAGS[current];
    triggerFlag.alt = LOCALE_NAMES[current];
    trigger.setAttribute('aria-label', t('langSwitcher.label'));
    menu.setAttribute('aria-label', t('langSwitcher.label'));
    for (const { locale, option } of options) {
      option.setAttribute('aria-selected', String(locale === current));
    }
  }

  function open() {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    chevron.classList.add('up');
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    chevron.classList.remove('up');
    document.removeEventListener('pointerdown', onPointerDown);
    document.removeEventListener('keydown', onKeydown);
  }

  function onPointerDown(event) {
    if (!root.contains(event.target)) close();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') close();
  }

  trigger.addEventListener('click', () => {
    if (menu.hidden) open();
    else close();
  });

  onLocaleChange(syncLabels);
  syncLabels();

  root.appendChild(trigger);
  root.appendChild(menu);
  host.appendChild(root);
  return root;
}
