import Timeline from '../Timeline/Timeline.js';

export default class ExperienceSection {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#experience-root';
    this.items = options.items || [];

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`ExperienceSection: Root element not found: ${this.rootSelector}`);
      return;
    }

    this.shadow = this.root.attachShadow({ mode: 'open' });
    this.timelineComponent = null;
    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
    this.initializeTimeline();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --exp-font-primary: #000000;
      }

      * {
        all: revert;
      }

      .exp-section {
        all: initial;
        padding: 4rem 2rem;
        background-color: #f9fafb;
        box-sizing: border-box;
      }

      .exp-heading {
        all: initial;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--exp-font-primary);
        margin: 0 0 3rem 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .exp-timeline-container {
        all: initial;
        max-width: 800px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      @media (max-width: 768px) {
        .exp-section {
          padding: 2rem 1.5rem;
        }

        .exp-heading {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
      }

      @media (max-width: 480px) {
        .exp-section {
          padding: 1.5rem 1rem;
        }

        .exp-heading {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const section = document.createElement('section');
    section.className = 'exp-section';

    const heading = document.createElement('h2');
    heading.className = 'exp-heading';
    heading.textContent = 'Experience';

    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'exp-timeline-container';
    timelineContainer.id = 'experience-timeline-root';

    section.appendChild(heading);
    section.appendChild(timelineContainer);
    this.shadow.appendChild(section);
  }

  initializeTimeline() {
    setTimeout(() => {
      const timelineRoot = this.shadow.querySelector('#experience-timeline-root');
      if (timelineRoot) {
        this.timelineComponent = new Timeline({
          rootSelector: '#experience-timeline-root',
          items: this.items,
        });
      }
    }, 0);
  }

  setItems(items) {
    this.items = items;
    if (this.timelineComponent) {
      this.timelineComponent.setItems(items);
    }
  }
}
