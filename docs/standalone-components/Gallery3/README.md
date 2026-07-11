# Gallery3 - Isolated Photo Gallery Component

Complete isolation using **Shadow DOM** to prevent CSS/JS interference with your existing website.

## Usage

### 1. Add the root div to your HTML
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

## Features

- **Horizontal Scrolling** - Smooth scroll with navigation buttons
- **Swipe/Drag** - Mouse and touch gesture support
- **Click to Zoom** - Modal zoom view with overlay
- **Captions** - Optional hover captions on each image
- **Responsive** - Mobile-first design
- **Keyboard Support** - ESC to close zoom
- **Accessibility** - ARIA labels and semantic HTML

## CSS Customization

Override the CSS variables on the root element:

```html
<div id="gallery3-root" style="
  --g3-color-accent-primary: #ff6b6b;
  --g3-color-button-bg: #333;
"></div>
```

Available variables:
- `--g3-color-bg-primary` (default: white)
- `--g3-color-bg-secondary` (default: #f5f5f5)
- `--g3-color-font-primary` (default: black)
- `--g3-color-accent-primary` (default: #3b82f6)
- `--g3-color-button-bg` (default: #1f2937)
- `--g3-color-button-border` (default: #374151)
- `--g3-color-navbar-primary` (default: black)

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

## Data Format

Each item should have:
```javascript
{
  id: unique_id,           // required
  url: 'image_url',        // required
  alt: 'alt_text',         // required
  caption: 'Image caption' // optional
}
```

## Browser Support

Modern browsers with Shadow DOM support (Chrome 35+, Firefox 63+, Safari 10.1+, Edge 79+)

## Example

See `component.html` and `index.html` for complete working examples.
