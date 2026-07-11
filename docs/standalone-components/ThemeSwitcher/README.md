# ThemeSwitcher

Cycle through 11 predefined color themes with optional toast notification.

## Usage

```html

<div id="theme-switcher-root"></div>
<div id="toast-root"></div>

<script type="module">
    import ThemeSwitcher from './ThemeSwitcher.js';
    import Toast from './Toast.js';

    const toast = new Toast({rootSelector: '#toast-root'});

    new ThemeSwitcher({
        rootSelector: '#theme-switcher-root',
        isToastEnabled: true,
        toastComponent: toast
    });
</script>
```

## Options

- `rootSelector` - Target element
- `isToastEnabled` - Show theme name toast (default: `true`)
- `toastComponent` - Toast instance for notifications

## Available Themes

deep_blue, vibrant_red, forest_green, sun_orange, ocean_teal, grape_purple, rose_pink, sky_cyan, charcoal_gray, gold_yellow, lime_green

## Methods

- `switchTheme()` - Manually cycle to next theme
- `setTheme(name)` - Set specific theme
- `getCurrentTheme()` - Get current theme name

## Features

- 11 color themes
- Applies to all components
- Persists in localStorage
- Click to cycle themes
