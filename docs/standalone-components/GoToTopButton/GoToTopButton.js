export default class GoToTopButton {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#go-to-top-button-root';
    this.isEnabled = options.isEnabled !== false;
    this.scrollContainerId = options.scrollContainerId || 'app-main-content';

    this.root = document.querySelector(this.rootSelector);
    if (!this.root || !this.isEnabled) return;

    this.scrollContainer = document.getElementById(this.scrollContainerId);
    if (!this.scrollContainer) {
      console.warn(`GoToTopButton: Scroll container not found: ${this.scrollContainerId}`);
      return;
    }

    this.pointsDown = true;
    this.shadow = this.root.attachShadow({ mode: 'open' });

    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
    this.cacheElements();
    this.attachEventListeners();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --gt-color-primary: #1f2937;
        --gt-color-text: #ffffff;
        --gt-color-border: #374151;
        --gt-color-hover: rgba(31, 41, 55, 0.8);
      }

      * {
        all: revert;
      }

      .gt-button {
        all: initial;
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border: 2px solid var(--gt-color-border);
        border-radius: 50%;
        background-color: var(--gt-color-primary);
        color: var(--gt-color-text);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 24px;
        box-sizing: border-box;
      }

      .gt-button:hover {
        background-color: var(--gt-color-hover);
        transform: scale(1.1);
      }

      .gt-button:active {
        transform: scale(0.95);
      }

      @media (max-width: 768px) {
        .gt-button {
          width: 44px;
          height: 44px;
          bottom: 1.5rem;
          right: 1.5rem;
          font-size: 18px;
        }
      }

      @media (max-width: 480px) {
        .gt-button {
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
    container.className = 'gt-button-container';
    container.innerHTML = `
      <button class="gt-button" aria-label="Go to next section" title="Go to next section">
        <svg class="gt-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>
    `;
    this.shadow.appendChild(container);
  }

  cacheElements() {
    this.button = this.shadow.querySelector('.gt-button');
    this.icon = this.shadow.querySelector('.gt-icon');
  }

  attachEventListeners() {
    this.button.addEventListener('click', () => this.scrollToSection());
    this.scrollContainer.addEventListener('scroll', () => this.updateButtonState());
    window.addEventListener('resize', () => this.updateButtonState());

    this.updateButtonState();
  }

  updateButtonState() {
    const scrollTop = this.scrollContainer.scrollTop;
    const scrollableHeight = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;

    const isAtTop = scrollTop < 10;
    const isAtBottom = scrollTop >= scrollableHeight - 10;

    const wasPointingDown = this.pointsDown;

    if (isAtBottom) {
      this.pointsDown = false;
    } else if (isAtTop) {
      this.pointsDown = true;
    }

    // Update icon and label if state changed
    if (wasPointingDown !== this.pointsDown) {
      this.updateIcon();
    }
  }

  updateIcon() {
    const label = this.pointsDown ? 'Go to next section' : 'Go to previous section';
    this.button.setAttribute('aria-label', label);
    this.button.setAttribute('title', label);

    // Update SVG icon
    if (this.pointsDown) {
      this.icon.innerHTML = '<path d="M7 10l5 5 5-5z"/>';
    } else {
      this.icon.innerHTML = '<path d="M7 14l5-5 5 5z"/>';
    }
  }

  scrollToSection() {
    const sections = Array.from(
      this.scrollContainer.querySelectorAll('section, [id*="section"]')
    );

    if (sections.length === 0) return;

    const scrollTop = this.scrollContainer.scrollTop;

    if (this.pointsDown) {
      // Find next section below current position
      const nextSection = sections.find(
        (section) => section.offsetTop > scrollTop + 1
      );
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Find previous section
      let prevSection = null;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < scrollTop - 1) {
          prevSection = sections[i];
          break;
        }
      }
      if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
