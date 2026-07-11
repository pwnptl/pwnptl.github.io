export default class Timeline {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#timeline-root';
    this.items = options.items || [];

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`Timeline: Root element not found: ${this.rootSelector}`);
      return;
    }

    this.shadow = this.root.attachShadow({ mode: 'open' });
    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
    this.cacheElements();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --tl-accent-primary: #3b82f6;
        --tl-accent-secondary: #6b7280;
        --tl-bg-primary: #ffffff;
        --tl-bg-secondary: #f9fafb;
        --tl-font-primary: #000000;
        --tl-font-secondary: #6b7280;
        --tl-border: #e5e7eb;
      }

      * {
        all: revert;
      }

      .tl-container {
        all: initial;
        width: 100%;
        padding: 2rem 0;
      }

      .tl-main {
        all: initial;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: relative;
      }

      .tl-main::before {
        content: '';
        position: absolute;
        left: 21px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--tl-border);
      }

      .tl-item {
        all: initial;
        display: flex;
        gap: 2rem;
        position: relative;
        padding-left: 2rem;
        box-sizing: border-box;
      }

      .tl-marker {
        all: initial;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: var(--tl-accent-primary);
        border: 3px solid var(--tl-bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: absolute;
        left: -1px;
        top: 0;
        box-sizing: border-box;
      }

      .tl-logo {
        all: initial;
        width: 28px;
        height: 28px;
        object-fit: contain;
      }

      .tl-content {
        all: initial;
        flex: 1;
        box-sizing: border-box;
      }

      .tl-card {
        all: initial;
        background-color: var(--tl-bg-secondary);
        border-left: 4px solid var(--tl-accent-primary);
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-sizing: border-box;
      }

      .tl-date {
        all: initial;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--tl-accent-primary);
        margin-bottom: 0.5rem;
      }

      .tl-title {
        all: initial;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--tl-font-primary);
        margin-bottom: 0.25rem;
      }

      .tl-company {
        all: initial;
        font-size: 1rem;
        font-weight: 500;
        color: var(--tl-accent-secondary);
        margin-bottom: 0.75rem;
      }

      .tl-description {
        all: initial;
        font-size: 0.95rem;
        color: var(--tl-font-secondary);
        line-height: 1.6;
        margin: 0;
      }

      @media (max-width: 768px) {
        .tl-main::before {
          left: 13px;
        }

        .tl-item {
          gap: 1.5rem;
          padding-left: 1.5rem;
        }

        .tl-marker {
          width: 28px;
          height: 28px;
          left: -2px;
        }

        .tl-logo {
          width: 18px;
          height: 18px;
        }

        .tl-card {
          padding: 1.25rem;
        }

        .tl-title {
          font-size: 1.1rem;
        }

        .tl-company {
          font-size: 0.95rem;
        }

        .tl-description {
          font-size: 0.9rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const container = document.createElement('div');
    container.className = 'tl-container';

    const main = document.createElement('div');
    main.className = 'tl-main';

    this.items.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'tl-item';

      const marker = document.createElement('div');
      marker.className = 'tl-marker';

      if (item.logo) {
        const logo = document.createElement('img');
        logo.className = 'tl-logo';
        logo.src = item.logo;
        logo.alt = item.company || 'Logo';
        marker.appendChild(logo);
      }

      const content = document.createElement('div');
      content.className = 'tl-content';

      const card = document.createElement('div');
      card.className = 'tl-card';

      card.innerHTML = `
        <div class="tl-date">${this.escapeHtml(item.date || '')}</div>
        <div class="tl-title">${this.escapeHtml(item.title || '')}</div>
        <div class="tl-company">${this.escapeHtml(item.company || '')}</div>
        <p class="tl-description">${this.escapeHtml(item.description || '')}</p>
      `;

      content.appendChild(card);
      itemEl.appendChild(marker);
      itemEl.appendChild(content);

      main.appendChild(itemEl);
    });

    container.appendChild(main);
    this.shadow.appendChild(container);
  }

  cacheElements() {
    // Not needed for this component
  }

  setItems(items) {
    this.items = items;
    this.shadow.innerHTML = '';
    this.init();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
