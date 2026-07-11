export default class Toast {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#toast-root';
    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`Toast: Root element not found: ${this.rootSelector}`);
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
        --toast-bg-info: #3b82f6;
        --toast-bg-success: #10b981;
        --toast-bg-warning: #f59e0b;
        --toast-bg-error: #ef4444;
        --toast-text: #ffffff;
      }

      * {
        all: revert;
      }

      .toast {
        all: initial;
        position: fixed;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: var(--toast-text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 0.95rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
        z-index: 10000;
        box-sizing: border-box;
        max-width: 90vw;
      }

      .toast.info {
        background-color: var(--toast-bg-info);
      }

      .toast.success {
        background-color: var(--toast-bg-success);
      }

      .toast.warning {
        background-color: var(--toast-bg-warning);
      }

      .toast.error {
        background-color: var(--toast-bg-error);
      }

      /* Positions */
      .toast.bottom-center {
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
      }

      .toast.bottom-right {
        bottom: 2rem;
        right: 2rem;
      }

      .toast.bottom-left {
        bottom: 2rem;
        left: 2rem;
      }

      .toast.top-center {
        top: 2rem;
        left: 50%;
        transform: translateX(-50%);
      }

      .toast.top-right {
        top: 2rem;
        right: 2rem;
      }

      .toast.top-left {
        top: 2rem;
        left: 2rem;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }

      .toast.hide {
        animation: slideOut 0.3s ease-out forwards;
      }

      @media (max-width: 480px) {
        .toast {
          padding: 0.875rem 1.25rem;
          font-size: 0.875rem;
          max-width: 85vw;
        }

        .toast.bottom-center,
        .toast.bottom-right,
        .toast.bottom-left,
        .toast.top-center,
        .toast.top-right,
        .toast.top-left {
          left: 0.5rem;
          right: 0.5rem;
          bottom: auto;
          top: auto;
        }

        .toast.bottom-center,
        .toast.bottom-right,
        .toast.bottom-left {
          bottom: 1rem;
        }

        .toast.top-center,
        .toast.top-right,
        .toast.top-left {
          top: 1rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = `<div class="toast"></div>`;
    this.shadow.appendChild(container);
  }

  cacheElements() {
    this.toastEl = this.shadow.querySelector('.toast');
  }

  show(options = {}) {
    const { message = '', duration = 3000, position = 'bottom-center', type = 'info' } = options;

    this.toastEl.className = `toast ${type} ${position}`;
    this.toastEl.textContent = message;
    this.toastEl.style.display = 'block';

    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.toastEl.classList.add('hide');
    this.hideTimeout = setTimeout(() => {
      this.toastEl.style.display = 'none';
      this.toastEl.classList.remove('hide');
    }, 300);
  }
}
