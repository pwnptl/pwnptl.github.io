export default class EducationSection {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#education-root';
    this.items = options.items || [];

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`EducationSection: Root element not found: ${this.rootSelector}`);
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
        --edu-accent-primary: #3b82f6;
        --edu-font-primary: #000000;
        --edu-font-secondary: #6b7280;
        --edu-bg-secondary: #f9fafb;
        --edu-border: #e5e7eb;
      }

      * {
        all: revert;
      }

      .edu-section {
        all: initial;
        padding: 4rem 2rem;
        background-color: white;
        box-sizing: border-box;
      }

      .edu-heading {
        all: initial;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--edu-font-primary);
        margin: 0 0 3rem 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .edu-timeline {
        all: initial;
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        box-sizing: border-box;
      }

      .edu-timeline::before {
        content: '';
        position: absolute;
        left: 21px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--edu-border);
      }

      .edu-item {
        all: initial;
        display: flex;
        gap: 2rem;
        position: relative;
        padding-left: 2rem;
        margin-bottom: 2rem;
        box-sizing: border-box;
      }

      .edu-marker {
        all: initial;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: var(--edu-accent-primary);
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        position: absolute;
        left: -1px;
        top: 0;
        box-sizing: border-box;
      }

      .edu-logo {
        all: initial;
        width: 28px;
        height: 28px;
        object-fit: contain;
      }

      .edu-content {
        all: initial;
        flex: 1;
        box-sizing: border-box;
      }

      .edu-card {
        all: initial;
        background-color: var(--edu-bg-secondary);
        border-left: 4px solid var(--edu-accent-primary);
        border-radius: 0.5rem;
        padding: 1.5rem;
        box-sizing: border-box;
      }

      .edu-date {
        all: initial;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--edu-accent-primary);
        margin-bottom: 0.5rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .edu-title {
        all: initial;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--edu-font-primary);
        margin-bottom: 0.25rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .edu-school {
        all: initial;
        font-size: 1rem;
        font-weight: 500;
        color: var(--edu-accent-primary);
        margin-bottom: 0.75rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .edu-description {
        all: initial;
        font-size: 0.95rem;
        color: var(--edu-font-secondary);
        line-height: 1.6;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      @media (max-width: 768px) {
        .edu-section {
          padding: 2rem 1.5rem;
        }

        .edu-heading {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .edu-timeline::before {
          left: 13px;
        }

        .edu-item {
          gap: 1.5rem;
          padding-left: 1.5rem;
        }

        .edu-marker {
          width: 28px;
          height: 28px;
          left: -2px;
        }

        .edu-logo {
          width: 18px;
          height: 18px;
        }

        .edu-card {
          padding: 1.25rem;
        }

        .edu-title {
          font-size: 1.1rem;
        }

        .edu-school {
          font-size: 0.95rem;
        }

        .edu-description {
          font-size: 0.9rem;
        }
      }

      @media (max-width: 480px) {
        .edu-section {
          padding: 1.5rem 1rem;
        }

        .edu-heading {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .edu-timeline::before {
          left: 10px;
        }

        .edu-item {
          gap: 1rem;
          padding-left: 1rem;
        }

        .edu-marker {
          width: 24px;
          height: 24px;
          left: -3px;
        }

        .edu-logo {
          width: 16px;
          height: 16px;
        }

        .edu-card {
          padding: 1rem;
        }

        .edu-title {
          font-size: 1rem;
        }

        .edu-school {
          font-size: 0.9rem;
        }

        .edu-description {
          font-size: 0.85rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const section = document.createElement('section');
    section.className = 'edu-section';

    const heading = document.createElement('h2');
    heading.className = 'edu-heading';
    heading.textContent = 'Education';

    const timeline = document.createElement('div');
    timeline.className = 'edu-timeline';

    this.items.forEach((item) => {
      const timelineItem = this.createTimelineItem(item);
      timeline.appendChild(timelineItem);
    });

    section.appendChild(heading);
    section.appendChild(timeline);
    this.shadow.appendChild(section);
  }

  createTimelineItem(item) {
    const itemEl = document.createElement('div');
    itemEl.className = 'edu-item';

    const marker = document.createElement('div');
    marker.className = 'edu-marker';

    if (item.logo) {
      const logo = document.createElement('img');
      logo.className = 'edu-logo';
      logo.src = item.logo;
      logo.alt = item.company;
      marker.appendChild(logo);
    }

    const content = document.createElement('div');
    content.className = 'edu-content';

    const card = document.createElement('div');
    card.className = 'edu-card';

    card.innerHTML = `
      <div class="edu-date">${this.escapeHtml(item.date || '')}</div>
      <div class="edu-title">${this.escapeHtml(item.title || '')}</div>
      <div class="edu-school">${this.escapeHtml(item.company || '')}</div>
      <p class="edu-description">${this.escapeHtml(item.description || '')}</p>
    `;

    content.appendChild(card);
    itemEl.appendChild(marker);
    itemEl.appendChild(content);

    return itemEl;
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
