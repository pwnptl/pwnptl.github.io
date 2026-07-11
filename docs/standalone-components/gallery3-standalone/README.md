# Gallery3 Standalone - Isolated Component

Complete isolation using **Shadow DOM** to prevent CSS/JS interference with your existing website.

## Usage

### 1. Add the div to your HTML
```html
<div id="gallery3-root"></div>
```

### 2. Import and initialize
```html
<script type="module">
  import Gallery3 from './gallery3.js';

  document.addEventListener('DOMContentLoaded', () => {
    const items = [
      {
        id: 1,
        url: 'path/to/image1.jpg',
        alt: 'Image 1',
        caption: 'Optional caption'
      },
      // ... more items
    ];

    new Gallery3({
      rootSelector: '#gallery3-root',
      items: items,
    });
  });
</script>
```

Or use the provided `component.html` as a template.

## Isolation Features

✅ **Shadow DOM** - Complete encapsulation of CSS and DOM structure  
✅ **CSS Variables** - All styles use scoped custom properties with `g3-` prefix  
✅ **Namespaced Classes** - All class names prefixed with `g3-`  
✅ **SVG Icons** - No external icon library dependencies  
✅ **Self-contained JS** - No global state pollution  
✅ **XSS Protection** - HTML escaping for captions  

## CSS Customization

Override the CSS variables on the root element:

```html
<div id="gallery3-root" style="
  --g3-color-accent-primary: #ff6b6b;
  --g3-color-button-bg: #333;
"></div>
```

Available variables:
- `--g3-color-bg-primary`
- `--g3-color-bg-secondary`
- `--g3-color-font-primary`
- `--g3-color-accent-primary`
- `--g3-color-button-bg`
- `--g3-color-button-border`
- `--g3-color-navbar-primary`

## API

```javascript
const gallery = new Gallery3(options);

// Update items
gallery.setItems(newItems);

// Add more items
gallery.addItems(moreItems);

// Close zoom programmatically
gallery.closeZoom();
```

## Browser Support

Modern browsers with Shadow DOM support (Chrome 35+, Firefox 63+, Safari 10.1+, Edge 79+)
