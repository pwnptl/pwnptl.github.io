export default class ContactSection {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#contact-root';
    this.items = options.items || [];

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`ContactSection: Root element not found: ${this.rootSelector}`);
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
        --contact-font-primary: #000000;
        --contact-accent-primary: #3b82f6;
      }

      * {
        all: revert;
      }

      .contact-section {
        all: initial;
        padding: 4rem 2rem;
        background-color: white;
        box-sizing: border-box;
      }

      .contact-heading {
        all: initial;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--contact-font-primary);
        margin: 0 0 3rem 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .contact-links {
        all: initial;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem;
        box-sizing: border-box;
      }

      .contact-link {
        all: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: var(--contact-accent-primary);
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
        font-size: 28px;
        border: 2px solid var(--contact-accent-primary);
        box-sizing: border-box;
      }

      .contact-link:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .contact-link:active {
        transform: translateY(-2px);
      }

      .contact-icon {
        all: initial;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @media (max-width: 768px) {
        .contact-section {
          padding: 2rem 1.5rem;
        }

        .contact-heading {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .contact-links {
          gap: 1.5rem;
        }

        .contact-link {
          width: 52px;
          height: 52px;
          font-size: 24px;
        }
      }

      @media (max-width: 480px) {
        .contact-section {
          padding: 1.5rem 1rem;
        }

        .contact-heading {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .contact-links {
          gap: 1rem;
        }

        .contact-link {
          width: 48px;
          height: 48px;
          font-size: 20px;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const section = document.createElement('section');
    section.className = 'contact-section';

    const heading = document.createElement('h2');
    heading.className = 'contact-heading';
    heading.textContent = 'Get In Touch';

    const linksContainer = document.createElement('div');
    linksContainer.className = 'contact-links';

    const iconMap = {
      email: '✉️',
      phone: '☎️',
      whatsapp: '💬',
      github: '🐙',
      linkedin: '💼',
      twitter: '𝕏',
      instagram: '📷',
    };

    this.items.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'contact-link';
      link.href = item.url || '#';
      link.title = item.label || '';
      link.setAttribute('aria-label', item.label || '');
      link.target = '_blank';

      const iconEl = document.createElement('span');
      iconEl.className = 'contact-icon';
      iconEl.textContent = iconMap[item.icon] || '●';

      link.appendChild(iconEl);
      linksContainer.appendChild(link);
    });

    section.appendChild(heading);
    section.appendChild(linksContainer);
    this.shadow.appendChild(section);
  }

  setItems(items) {
    this.items = items;
    this.shadow.innerHTML = '';
    this.init();
  }
}
