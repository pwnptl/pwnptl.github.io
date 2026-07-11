# Gallery3

A responsive, horizontally-scrolling photo gallery with chevron navigation,
auto-scroll, drag/swipe, and a click-to-zoom modal.

Images are loaded **from a folder** — the folder is the source of truth.
`gallery.json` only *adds value* on top (captions, alt text, ordering, hiding).

---

## Quick start

1. Drop image files into `public/assets/img/gallery/`.
   Supported: `png, jpg, jpeg, gif, webp, avif, svg`.
2. (Optional) Add metadata in `src/data/gallery.json`, keyed by filename.
3. Render:

```jsx
import { Gallery3 } from '@ui';
import { loadGalleryItems, galleryTitle } from '@ui/Gallery3/loadGalleryItems';

const items = loadGalleryItems();
<Gallery3 items={items} />
```

---

## Image loading model

The **folder is the source of truth**. Every image in
`public/assets/img/gallery/` is auto-discovered at build time via Vite's
`import.meta.glob` — no need to list files anywhere.

`gallery.json` is an **overlay**, keyed by filename. It adds captions, alt
text, custom ordering, and can hide specific images. An image with **no**
JSON entry still renders (its filename minus extension becomes the fallback
`alt`, with an empty caption).

### `gallery.json` shape

```json
{
  "title": "Photo Gallery",
  "photos": {
    "gallery-01.png": { "caption": "Landscape", "alt": "Mountain landscape", "order": 1 },
    "gallery-06.jpg": { "caption": "Ultra-Wide", "alt": "Panorama", "order": 6 },
    "draft-99.png":   { "hidden": true }
  }
}
```

| Field     | Type    | Purpose                                                        |
|-----------|---------|----------------------------------------------------------------|
| `caption` | string  | Text shown on hover overlay and in the zoom modal.            |
| `alt`     | string  | Image `alt` attribute. Defaults to filename without extension. |
| `order`   | number  | Sort order (ascending). Un-ordered images fall to the end.    |
| `hidden`  | boolean | When `true`, the image is discovered but not rendered.        |

**Ordering:** items with an explicit `order` sort first (ascending), then any
remaining images sort alphabetically by filename.

---

## Props

| Prop                  | Type      | Default                                        | Description |
|-----------------------|-----------|------------------------------------------------|-------------|
| `items`               | array     | `[]`                                           | Gallery items from `loadGalleryItems()`. Each: `{ id, url, alt, caption, order }`. |
| `showScrollbar`       | boolean   | `true`                                         | Show a thin themed scrollbar under the strip. `false` hides it entirely. |
| `autoScrollSec`       | number    | `4`                                            | Auto-scroll interval in seconds. `0` disables. Positive = scroll right, negative = scroll left. |
| `isRandomArrangement` | boolean   | `false`                                        | `true` shuffles image order on each render. `false` keeps the `order`/filename sort from the loader. |
| `showChevrons`        | object    | `{ mobile: true, tablet: true, desktop: true }`| Per-device chevron visibility. Partial objects merge with defaults. |

### `showChevrons` — per-device navigation

Enable or disable the prev/next chevron buttons per device class. A partial
object merges with the all-`true` default, so you only specify what differs.

```jsx
// Hide chevrons on mobile, keep them on tablet + desktop
<Gallery3 items={items} showChevrons={{ mobile: false }} />

// Desktop only
<Gallery3 items={items} showChevrons={{ mobile: false, tablet: false }} />
```

Breakpoints:

| Device    | Width           |
|-----------|-----------------|
| `mobile`  | ≤ 480px         |
| `tablet`  | 481px – 768px   |
| `desktop` | > 768px         |

---

## Behavior

- **Chevrons** are always mounted. When no further scroll is possible in a
  direction, that chevron **fades** (opacity 0.35) instead of disappearing, so
  layout never shifts.
- **Chevron sets direction:** clicking the left chevron makes auto-scroll
  continue leftward; the right chevron flips it back to rightward.
- **Card-accurate scrolling:** navigation snaps to real card edges (measured
  from live geometry), so it never lands mid-image or skips a photo,
  regardless of image width. Wraps around at both ends.
- **Auto-scroll pauses** while you interact with the images — hover, drag,
  touch, or when an image is open in the zoom modal — and resumes afterward.
- **Drag / swipe:** click-drag (desktop) or swipe (touch) more than 50px to
  advance one card.
- **Zoom modal:** click any image to open it full-size. Close via the ✕
  button, clicking the backdrop, or pressing `Escape`.
- **In-modal zoom + pan:**
  - Desktop: mouse-wheel to zoom, click-drag to pan, double-click to toggle
    between fit and 2.5×.
  - Touch: pinch to zoom, one-finger drag to pan, double-tap to toggle.
  - Zoom range 1×–5×; resets whenever a new image opens.
- **Lazy loading:** images use `loading="lazy"`; scroll bounds recompute on
  image `load` so chevron states stay correct as images arrive.

---

## Files

| File                    | Role                                                        |
|-------------------------|-------------------------------------------------------------|
| `Gallery3.jsx`          | Component: scrolling, chevrons, auto-scroll, drag, modal.  |
| `ZoomableImage.jsx`     | Modal image with wheel/pinch zoom + drag pan.              |
| `Gallery3.scss`         | Styles, responsive breakpoints, chevron fade/hide states.  |
| `loadGalleryItems.js`   | Folder discovery + JSON overlay merge.                     |
| `src/data/gallery.json` | Metadata overlay (title + per-filename caption/alt/order). |
