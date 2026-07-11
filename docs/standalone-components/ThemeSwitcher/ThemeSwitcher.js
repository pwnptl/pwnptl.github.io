import Toast from '../Toast/Toast.js';

const THEMES = {
  deep_blue: { primary: '#1e3a8a', accent: '#3b82f6' },
  vibrant_red: { primary: '#7f1d1d', accent: '#ef4444' },
  forest_green: { primary: '#1f3a13', accent: '#10b981' },
  sun_orange: { primary: '#7c2d12', accent: '#f97316' },
  ocean_teal: { primary: '#134e4a', accent: '#14b8a6' },
  grape_purple: { primary: '#3f0f5c', accent: '#a855f7' },
  rose_pink: { primary: '#500724', accent: '#ec4899' },
  sky_cyan: { primary: '#0c2d47', accent: '#06b6d4' },
  charcoal_gray: { primary: '#1f2937', accent: '#6b7280' },
  gold_yellow: { primary: '#713f12', accent: '#f59e0b' },
  lime_green: { primary: '#365314', accent: '#84cc16' },
};

const THEME_NAMES = Object.keys(THEMES);

export default class ThemeSwitcher {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#theme-switcher-root';
    this.isToastEnabled = options.isToastEnabled !== false;
    this.toastComponent = options.toastComponent || null;

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`ThemeSwitcher: Root element not found: ${this.rootSelector}`);
      return;
    }

    this.currentThemeIndex = 0;
    this.shadow = this.root.attachShadow({ mode: 'open' });

    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
    this.cacheElements();
    this.attachEventListeners();
    this.applyTheme(0);
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --ts-color-primary: #1f2937;
        --ts-color-border: #374151;
        --ts-color-text: #ffffff;
        --ts-color-hover: rgba(31, 41, 55, 0.8);
      }

      * {
        all: revert;
      }

      .ts-button {
        all: initial;
        position: fixed;
        bottom: 2rem;
        right: 5.5rem;
        width: 50px;
        height: 50px;
        border: 2px solid var(--ts-color-border);
        border-radius: 50%;
        background-color: var(--ts-color-primary);
        color: var(--ts-color-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 24px;
        box-sizing: border-box;
      }

      .ts-button:hover {
        background-color: var(--ts-color-hover);
        transform: scale(1.1);
      }

      .ts-button:active {
        transform: scale(0.95);
      }

      @media (max-width: 768px) {
        .ts-button {
          width: 44px;
          height: 44px;
          bottom: 1.5rem;
          right: 1.5rem;
          font-size: 18px;
        }
      }

      @media (max-width: 480px) {
        .ts-button {
          width: 40px;
          height: 40px;
          bottom: 1rem;
          right: 1rem;
          font-size: 16px;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = `
      <button class="ts-button" aria-label="Switch theme" title="Switch theme">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2v12a8 8 0 100-16v4z"/>
        </svg>
      </button>
    `;
    this.shadow.appendChild(container);
  }

  cacheElements() {
    this.button = this.shadow.querySelector('.ts-button');
  }

  attachEventListeners() {
    this.button.addEventListener('click', () => this.switchTheme());
  }

  switchTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % THEME_NAMES.length;
    this.applyTheme(this.currentThemeIndex);

    if (this.isToastEnabled) {
      const themeName = THEME_NAMES[this.currentThemeIndex].replace(/_/g, ' ');
      this.showToastNotification(themeName);
    }
  }

  applyTheme(index) {
    const themeName = THEME_NAMES[index];
    const theme = THEMES[themeName];

    // Apply to document root
    document.documentElement.style.setProperty('--accent-primary', theme.accent);
    document.documentElement.style.setProperty('--accent-secondary', theme.accent);
    document.documentElement.style.setProperty('--navbar-primary', theme.primary);

    // Store in localStorage
    localStorage.setItem('portfolio-theme', themeName);
  }

  showToastNotification(themeName) {
    if (this.toastComponent) {
      this.toastComponent.show({
        message: `Theme: ${themeName}`,
        type: 'info',
        position: 'bottom-center',
        duration: 1500,
      });
    }
  }

  getCurrentTheme() {
    return THEME_NAMES[this.currentThemeIndex];
  }

  setTheme(themeName) {
    const index = THEME_NAMES.indexOf(themeName);
    if (index !== -1) {
      this.currentThemeIndex = index;
      this.applyTheme(index);
    }
  }
}

export { THEME_NAMES, THEMES };
