export default class Gallery3 {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#gallery3-root';
    this.items = options.items || [];

    // Get root element
    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`Gallery3: Root element not found: ${this.rootSelector}`);
      return;
    }

    // Shadow DOM for complete isolation
    this.shadow = this.root.attachShadow({ mode: 'open' });

    // State
    this.dragStart = null;
    this.dragEnd = null;
    this.canScrollLeft = false;
    this.canScrollRight = true;
    this.zoomItem = null;

    this.init();
  }

  init() {
    this.injectStyles();
    this.render();
    this.cacheElements();
    this.attachEventListeners();
    this.checkScrollPosition();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --g3-color-bg-primary: #ffffff;
        --g3-color-bg-secondary: #f5f5f5;
        --g3-color-font-primary: #000000;
        --g3-color-accent-primary: #3b82f6;
        --g3-color-button-bg: #1f2937;
        --g3-color-button-border: #374151;
        --g3-color-navbar-primary: #000000;
      }

      * {
        all: revert;
      }

      .g3-container {
        all: initial;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 2rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background-color: var(--g3-color-bg-primary);
        color: var(--g3-color-font-primary);
        box-sizing: border-box;
      }

      .g3-nav-row {
        all: initial;
        display: flex;
        align-items: center;
        gap: 1rem;
        user-select: none;
        width: 100%;
        box-sizing: border-box;
      }

      .g3-nav-btn {
        all: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 2px solid var(--g3-color-button-border);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0;
        background-color: var(--g3-color-button-bg);
        color: #ffffff;
        font-size: 20px;
        box-sizing: border-box;
      }

      .g3-nav-btn:hover {
        transform: scale(1.1);
        opacity: 0.8;
      }

      .g3-nav-btn:active {
        transform: scale(0.95);
      }

      .g3-items-wrapper {
        all: initial;
        flex: 1;
        overflow: hidden;
        box-sizing: border-box;
      }

      .g3-items {
        all: initial;
        display: flex;
        gap: 1rem;
        width: 100%;
        scroll-behavior: smooth;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding-bottom: 0.5rem;
        box-sizing: border-box;
      }

      .g3-items::-webkit-scrollbar {
        display: none;
      }

      .g3-items {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .g3-item {
        all: initial;
        position: relative;
        border: 2px solid var(--g3-color-accent-primary);
        border-radius: 8px;
        overflow: hidden;
        height: 300px;
        width: auto;
        cursor: grab;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        flex-shrink: 0;
        scroll-snap-align: start;
        background-color: var(--g3-color-bg-secondary);
        box-sizing: border-box;
      }

      .g3-item:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .g3-item:active {
        cursor: grabbing;
      }

      .g3-image {
        all: initial;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .g3-caption {
        all: initial;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0.75rem;
        background: rgba(0, 0, 0, 0.5);
        font-size: 0.875rem;
        font-weight: 500;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: #ffffff;
        box-sizing: border-box;
      }

      .g3-item:hover .g3-caption {
        opacity: 1;
      }

      .g3-zoom-overlay {
        all: initial;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: g3-fadeIn 0.3s ease;
        background-color: rgba(0, 0, 0, 0.8);
        box-sizing: border-box;
      }

      @keyframes g3-fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .g3-zoom-content {
        all: initial;
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        animation: g3-slideUp 0.3s ease;
        box-sizing: border-box;
      }

      @keyframes g3-slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .g3-zoom-close {
        all: initial;
        position: absolute;
        top: -50px;
        right: 0;
        width: 44px;
        height: 44px;
        border: 2px solid var(--g3-color-button-border);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--g3-color-button-bg);
        color: #ffffff;
        font-size: 24px;
        box-sizing: border-box;
      }

      .g3-zoom-close:hover {
        transform: scale(1.1);
      }

      .g3-zoom-close:active {
        transform: scale(0.95);
      }

      .g3-zoom-image {
        all: initial;
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
        display: block;
      }

      .g3-zoom-caption {
        all: initial;
        font-size: 1.1rem;
        font-weight: 500;
        padding: 0 1rem;
        text-align: center;
        max-width: 90vw;
        color: var(--g3-color-font-primary);
        box-sizing: border-box;
      }

      @media (max-width: 768px) {
        .g3-container {
          padding: 1.5rem;
        }

        .g3-nav-row {
          gap: 0.75rem;
        }

        .g3-nav-btn {
          width: 36px;
          height: 36px;
          font-size: 16px;
        }

        .g3-items {
          gap: 0.75rem;
        }

        .g3-item {
          height: 250px;
        }

        .g3-caption {
          padding: 0.5rem;
          font-size: 0.75rem;
        }

        .g3-zoom-close {
          top: -40px;
          width: 36px;
          height: 36px;
          font-size: 18px;
        }

        .g3-zoom-image {
          max-height: 70vh;
        }

        .g3-zoom-caption {
          font-size: 1rem;
        }
      }

      @media (max-width: 480px) {
        .g3-container {
          padding: 1rem;
        }

        .g3-nav-row {
          gap: 0.5rem;
        }

        .g3-nav-btn {
          width: 32px;
          height: 32px;
          font-size: 14px;
        }

        .g3-items {
          gap: 0.5rem;
        }

        .g3-item {
          height: 200px;
        }

        .g3-zoom-close {
          top: -35px;
          width: 32px;
          height: 32px;
          font-size: 16px;
        }

        .g3-zoom-image {
          max-height: 60vh;
        }

        .g3-zoom-caption {
          font-size: 0.9rem;
        }
      }
    `;
    this.shadow.appendChild(style);
  }

  render() {
    const container = document.createElement('div');
    container.className = 'g3-container';

    container.innerHTML = `
      <div class="g3-nav-row">
        <button class="g3-nav-btn g3-prev-btn" aria-label="Previous photos" style="display: none;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.41 7.41L11 6l-6 6 6 6 1.41-1.41L7.83 12l4.58-4.59z"/>
          </svg>
        </button>

        <div class="g3-items-wrapper">
          <div class="g3-items"></div>
        </div>

        <button class="g3-nav-btn g3-next-btn" aria-label="Next photos" style="display: none;">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 6.41L9.41 5 15 10.59 9.41 16 8 14.59 12.17 10 8 6.41z"/>
          </svg>
        </button>
      </div>

      <div class="g3-zoom-overlay" style="display: none;">
        <div class="g3-zoom-content">
          <button class="g3-zoom-close" aria-label="Close zoom">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
          </button>
          <img class="g3-zoom-image" alt="">
          <p class="g3-zoom-caption" style="display: none;"></p>
        </div>
      </div>
    `;

    this.shadow.appendChild(container);
  }

  cacheElements() {
    this.prevBtn = this.shadow.querySelector('.g3-prev-btn');
    this.nextBtn = this.shadow.querySelector('.g3-next-btn');
    this.itemsContainer = this.shadow.querySelector('.g3-items');
    this.zoomOverlay = this.shadow.querySelector('.g3-zoom-overlay');
    this.zoomContent = this.shadow.querySelector('.g3-zoom-content');
    this.zoomImage = this.shadow.querySelector('.g3-zoom-image');
    this.zoomCaption = this.shadow.querySelector('.g3-zoom-caption');
    this.zoomClose = this.shadow.querySelector('.g3-zoom-close');

    this.renderItems();
  }

  renderItems() {
    this.itemsContainer.innerHTML = '';
    this.items.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'g3-item';
      itemEl.innerHTML = `
        <img src="${item.url}" alt="${item.alt}" class="g3-image">
        ${item.caption ? `<div class="g3-caption">${this.escapeHtml(item.caption)}</div>` : ''}
      `;
      itemEl.addEventListener('click', () => this.openZoom(item));
      this.itemsContainer.appendChild(itemEl);
    });
  }

  attachEventListeners() {
    // Scroll listeners
    this.itemsContainer.addEventListener('scroll', () => this.checkScrollPosition());
    window.addEventListener('resize', () => this.checkScrollPosition());

    // Navigation buttons
    this.prevBtn.addEventListener('click', () => this.goToPrevious());
    this.nextBtn.addEventListener('click', () => this.goToNext());

    // Mouse drag
    this.itemsContainer.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.itemsContainer.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.itemsContainer.addEventListener('mouseup', () => this.handleMouseUp());
    this.itemsContainer.addEventListener('mouseleave', () => this.handleMouseUp());

    // Touch drag
    this.itemsContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.itemsContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.itemsContainer.addEventListener('touchend', () => this.handleTouchEnd());

    // Zoom controls
    this.zoomOverlay.addEventListener('click', () => this.closeZoom());
    this.zoomClose.addEventListener('click', () => this.closeZoom());
    this.zoomContent.addEventListener('click', (e) => e.stopPropagation());

    // Keyboard
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.zoomItem) {
        this.closeZoom();
      }
    });
  }

  checkScrollPosition() {
    const { scrollLeft, scrollWidth, clientWidth } = this.itemsContainer;
    this.canScrollLeft = scrollLeft > 0;
    this.canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;

    this.prevBtn.style.display = this.canScrollLeft ? 'flex' : 'none';
    this.nextBtn.style.display = this.canScrollRight ? 'flex' : 'none';
  }

  scroll(direction) {
    const scrollAmount = 300;
    const newScrollLeft =
      this.itemsContainer.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    this.itemsContainer.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  }

  goToPrevious() {
    this.scroll('left');
  }

  goToNext() {
    this.scroll('right');
  }

  handleMouseDown(e) {
    this.dragStart = e.clientX;
    this.dragEnd = null;
  }

  handleMouseMove(e) {
    if (this.dragStart !== null) {
      this.dragEnd = e.clientX;
    }
  }

  handleMouseUp() {
    if (this.dragStart !== null && this.dragEnd !== null) {
      const diff = this.dragStart - this.dragEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goToNext();
        } else {
          this.goToPrevious();
        }
      }
    }
    this.dragStart = null;
    this.dragEnd = null;
  }

  handleTouchStart(e) {
    this.dragStart = e.touches[0].clientX;
  }

  handleTouchMove(e) {
    this.dragEnd = e.touches[0].clientX;
  }

  handleTouchEnd() {
    if (this.dragStart !== null && this.dragEnd !== null) {
      const diff = this.dragStart - this.dragEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goToNext();
        } else {
          this.goToPrevious();
        }
      }
    }
    this.dragStart = null;
    this.dragEnd = null;
  }

  openZoom(item) {
    this.zoomItem = item;
    this.zoomImage.src = item.url;
    this.zoomImage.alt = item.alt;

    if (item.caption) {
      this.zoomCaption.textContent = item.caption;
      this.zoomCaption.style.display = 'block';
    } else {
      this.zoomCaption.style.display = 'none';
    }

    this.zoomOverlay.style.display = 'flex';
  }

  closeZoom() {
    this.zoomOverlay.style.display = 'none';
    this.zoomItem = null;
  }

  setItems(items) {
    this.items = items;
    this.renderItems();
    this.checkScrollPosition();
  }

  addItems(newItems) {
    this.items.push(...newItems);
    this.renderItems();
    this.checkScrollPosition();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
