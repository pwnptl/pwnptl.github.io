// Gallery image loader.
//
// The FOLDER is the source of truth: every image in
// public/assets/img/gallery is discovered automatically at build time.
// gallery.json only *adds value* on top — captions, alt text, ordering,
// and hiding — keyed by the image's filename. Images with no JSON entry
// still render (filename becomes the fallback caption/alt).
//
// To add a photo: drop the file in the folder. To caption it: add an
// entry to gallery.json keyed by filename. That's it.

import galleryData from '@data/gallery.json';

// Vite globs the public gallery folder eagerly and returns resolved URLs.
// `import.meta.glob` reaches into /public via a relative path from src/.
const globbed = import.meta.glob(
  '/public/assets/img/gallery/*.{png,jpg,jpeg,gif,webp,avif,svg}',
  { eager: true, query: '?url', import: 'default' }
);

// Map filename -> served URL (strip the leading /public prefix).
const filesByName = {};
for (const path of Object.keys(globbed)) {
  const filename = path.split('/').pop();
  filesByName[filename] = path.replace('/public', '');
}

// JSON metadata overlay, keyed by filename.
// gallery.json shape:
//   { "title": "...", "photos": { "gallery-01.png": { caption, alt, order, hidden } } }
const meta = galleryData.photos || {};

/**
 * Build the merged gallery item list.
 * @returns {Array<{id, url, alt, caption, order}>}
 */
export function loadGalleryItems() {
  const items = Object.entries(filesByName)
    .map(([filename, url]) => {
      const info = meta[filename] || {};
      if (info.hidden) return null;
      return {
        id: filename,
        url,
        filename,
        alt: info.alt ?? filename.replace(/\.[^.]+$/, ''),
        caption: info.caption ?? '',
        order: info.order ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .filter(Boolean);

  // Explicit `order` first (ascending), then remaining by filename.
  items.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.filename.localeCompare(b.filename);
  });

  return items;
}

export const galleryTitle = galleryData.title || 'Gallery';
