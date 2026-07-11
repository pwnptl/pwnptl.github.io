export default class HeroSection {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#hero-root';
    this.data = options.data || {
      title: 'Hi, I\'m Developer',
      subtitle: 'Full Stack Developer',
      description: 'I build beautiful and functional web applications with modern technologies.',
      cta: { label: 'Get In Touch', url: '#contact' },
    };

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`HeroSection: Root element not found: ${this.rootSelector}`);
      return;
    }

    this.shadow = this.root.attachShadow({ mode: 'open' });
    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --hero-font-primary: #000000;
        --hero-accent-primary: #3b82f6;
        --hero-font-secondary: #6b7280;
      }

      * {
        all: revert;
      }

      .hero-section {
        all: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 4rem 2rem;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        box-sizing: border-box;
      }

      .hero-content {
        all: initial;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        box-sizing: border-box;
      }

      .hero-title {
        all: initial;
        font-size: 3.5rem;
        font-weight: 800;
        color: var(--hero-font-primary);
        line-height: 1.2;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .hero-subtitle {
        all: initial;
        font-size: 2rem;
        font-weight: 600;
        color: var(--hero-accent-primary);
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .hero-description {
        all: initial;
        font-size: 1.125rem;
        color: var(--hero-font-secondary);
        line-height: 1.8;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .hero-cta-btn {
        all: initial;
        display: inline-block;
        padding: 1rem 2rem;
        background-color: var(--hero-accent-primary);
        color: white;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 1rem;
        width: fit-content;
        box-sizing: border-box;
      }

      .hero-cta-btn:hover {
        opacity: 0.9;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .hero-cta-btn:active {
        transform: translateY(0);
      }

      @media (max-width: 768px) {
        .hero-section {
          padding: 3rem 1.5rem;
          min-height: 80vh;
        }

        .hero-title {
          font-size: 2.5rem;
        }

        .hero-subtitle {
          font-size: 1.5rem;
        }

        .hero-description {
          font-size: 1rem;
        }
      }

      @media (max-width: 480px) {
        .hero-section {
          padding: 2rem 1rem;
          min-height: 100vh;
        }

        .hero-title {
          font-size: 2rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
        }

        .hero-description {
          font-size: 0.95rem;
        }

        .hero-cta-btn {
          padding: 0.875rem 1.5rem;
          font-size: 0.95rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const section = document.createElement('section');
    section.className = 'hero-section';

    const content = document.createElement('div');
    content.className = 'hero-content';

    content.innerHTML = `
      <h1 class="hero-title">${this.escapeHtml(this.data.title)}</h1>
      <h2 class="hero-subtitle">${this.escapeHtml(this.data.subtitle)}</h2>
      <p class="hero-description">${this.escapeHtml(this.data.description)}</p>
      <a href="${this.escapeUrl(this.data.cta.url)}" class="hero-cta-btn">
        ${this.escapeHtml(this.data.cta.label)}
      </a>
    `;

    section.appendChild(content);
    this.shadow.appendChild(section);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  escapeUrl(url) {
    try {
      new URL(url, window.location.origin);
      return url;
    } catch {
      return '#';
    }
  }

  setData(data) {
    this.data = { ...this.data, ...data };
    this.shadow.innerHTML = '';
    this.init();
  }
}
