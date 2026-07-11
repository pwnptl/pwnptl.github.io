# ControlsContainer

Combines GoToTopButton and ThemeSwitcher in a fixed-position container.

## Usage

```html
<div id="controls-container-root"></div>

<script type="module">
  import ControlsContainer from './ControlsContainer.js';

  new ControlsContainer({
    rootSelector: '#controls-container-root',
    isThemeSwitcherEnabled: true,
    isGoToTopEnabled: true,
    scrollContainerId: 'app-main-content'
  });
</script>
```

## Options

- `rootSelector` - Target element
- `isThemeSwitcherEnabled` - Show theme switcher (default: `true`)
- `isGoToTopEnabled` - Show scroll button (default: `true`)
- `scrollContainerId` - Scrollable container ID

## Features

- Fixed position (bottom-right)
- Combines two controls
- Independent toggling
- Auto-initializes Toast for notifications
- Fully responsive
