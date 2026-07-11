export default class ProjectsSection {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#projects-root';
    this.items = options.items || [];

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`ProjectsSection: Root element not found: ${this.rootSelector}`);
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
        --proj-font-primary: #000000;
        --proj-accent-primary: #3b82f6;
        --proj-bg-secondary: #f9fafb;
        --proj-border: #e5e7eb;
      }

      * {
        all: revert;
      }

      .projects-section {
        all: initial;
        padding: 4rem 2rem;
        background-color: white;
        box-sizing: border-box;
      }

      .projects-heading {
        all: initial;
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--proj-font-primary);
        margin: 0 0 3rem 0;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .projects-grid {
        all: initial;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        box-sizing: border-box;
      }

      .project-card {
        all: initial;
        background-color: var(--proj-bg-secondary);
        border: 1px solid var(--proj-border);
        border-radius: 0.75rem;
        overflow: hidden;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
      }

      .project-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }

      .project-image {
        all: initial;
        width: 100%;
        height: 200px;
        object-fit: cover;
        display: block;
        background-color: var(--proj-border);
      }

      .project-content {
        all: initial;
        padding: 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-sizing: border-box;
      }

      .project-title {
        all: initial;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--proj-font-primary);
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .project-description {
        all: initial;
        font-size: 0.95rem;
        color: #6b7280;
        line-height: 1.6;
        margin: 0;
        flex: 1;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .project-link {
        all: initial;
        display: inline-block;
        color: var(--proj-accent-primary);
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 0.95rem;
      }

      .project-link:hover {
        text-decoration: underline;
        opacity: 0.8;
      }

      @media (max-width: 768px) {
        .projects-section {
          padding: 2rem 1.5rem;
        }

        .projects-heading {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .projects-grid {
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .projects-section {
          padding: 1.5rem 1rem;
        }

        .projects-heading {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .projects-grid {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .project-image {
          height: 150px;
        }

        .project-content {
          padding: 1.25rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const section = document.createElement('section');
    section.className = 'projects-section';

    const heading = document.createElement('h2');
    heading.className = 'projects-heading';
    heading.textContent = 'Projects';

    const grid = document.createElement('div');
    grid.className = 'projects-grid';

    this.items.forEach((project) => {
      const card = this.createProjectCard(project);
      grid.appendChild(card);
    });

    section.appendChild(heading);
    section.appendChild(grid);
    this.shadow.appendChild(section);
  }

  createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const img = document.createElement('img');
    img.className = 'project-image';
    img.src = project.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23ddd" width="400" height="200"/%3E%3C/svg%3E';
    img.alt = project.title;

    const content = document.createElement('div');
    content.className = 'project-content';

    const title = document.createElement('h3');
    title.className = 'project-title';
    title.textContent = project.title;

    const desc = document.createElement('p');
    desc.className = 'project-description';
    desc.textContent = project.description;

    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = project.url || '#';
    link.textContent = 'View Project →';
    link.target = '_blank';

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(link);

    card.appendChild(img);
    card.appendChild(content);

    return card;
  }

  setItems(items) {
    this.items = items;
    this.shadow.innerHTML = '';
    this.init();
  }
}
