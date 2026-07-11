import GoToTopButton from '../GoToTopButton/GoToTopButton.js';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.js';
import Toast from '../Toast/Toast.js';

export default class ControlsContainer {
  constructor(options = {}) {
    this.rootSelector = options.rootSelector || '#controls-container-root';
    this.isThemeSwitcherEnabled = options.isThemeSwitcherEnabled !== false;
    this.isGoToTopEnabled = options.isGoToTopEnabled !== false;
    this.scrollContainerId = options.scrollContainerId || 'app-main-content';

    this.root = document.querySelector(this.rootSelector);
    if (!this.root) {
      console.error(`ControlsContainer: Root element not found: ${this.rootSelector}`);
      return;
    }

    this.init();
  }

  init() {
    this.render();
    this.initializeComponents();
  }

  render() {
    // Create sub-containers for each component
    if (this.isThemeSwitcherEnabled) {
      const themeSwitcherRoot = document.createElement('div');
      themeSwitcherRoot.id = 'theme-switcher-sub-root';
      this.root.appendChild(themeSwitcherRoot);
    }

    if (this.isGoToTopEnabled) {
      const goToTopRoot = document.createElement('div');
      goToTopRoot.id = 'go-to-top-sub-root';
      this.root.appendChild(goToTopRoot);
    }
  }

  initializeComponents() {
    const toast = this.isThemeSwitcherEnabled
      ? new Toast({
          rootSelector: this.root,
        })
      : null;

    if (this.isThemeSwitcherEnabled) {
      new ThemeSwitcher({
        rootSelector: '#theme-switcher-sub-root',
        isToastEnabled: true,
        toastComponent: toast,
      });
    }

    if (this.isGoToTopEnabled) {
      new GoToTopButton({
        rootSelector: '#go-to-top-sub-root',
        scrollContainerId: this.scrollContainerId,
      });
    }
  }
}
