# GoToTopButton

Scroll navigation button that toggles between next/previous section based on scroll position.

## Usage

```html
<div id="go-to-top-button-root"></div>

<script type="module">
  import GoToTopButton from './GoToTopButton.js';

  new GoToTopButton({
    rootSelector: '#go-to-top-button-root',
    isEnabled: true,
    scrollContainerId: 'app-main-content'
  });
</script>
```

## Options

- `rootSelector` - Target element (default: `#go-to-top-button-root`)
- `isEnabled` - Show/hide button (default: `true`)
- `scrollContainerId` - Scrollable container ID (default: `app-main-content`)

## Features

- Auto-detects scroll position
- Smart arrow direction (down when at top, up when at bottom)
- Smooth section scrolling
- Mobile responsive
- Keyboard accessible
