# Gallery Components Structure

## Active Implementation

### Gallery3 (Current)
- **Location**: `/src/components/UI/Gallery3/` and `/src/components/Sections/Gallery3/`
- **Component**: `Gallery3.jsx`
- **Section**: `Gallery3Section.jsx`
- **Features**:
  - Horizontal scrollable gallery showing all items
  - Fixed height items with responsive width based on image aspect ratio
  - Smooth scrolling with chevron navigation
  - Click-to-zoom modal
  - Swipe gesture support (mobile & desktop)
  - No pagination dots
  - Smart chevron buttons (appear/disappear based on scroll)

## Archived Versions

### Gallery1 (v1 - Archived)
- **Location**: `/src/components/UI/Gallery1/` and `/src/components/Sections/Gallery1/`
- **Component**: `Gallery.jsx`
- **Section**: `GallerySection.jsx`
- **Features**:
  - Square items (1:1 aspect ratio)
  - Paginated view
  - Pagination dots
  - Circular navigation
  - Click-to-zoom

### Gallery2 (v2 - Archived)
- **Location**: `/src/components/UI/Gallery2/` and `/src/components/Sections/Gallery2/`
- **Component**: `Gallery.jsx`
- **Section**: `Gallery2Section.jsx`
- **Features**:
  - Fixed height with responsive width
  - Paginated view with smooth scrolling
  - Pagination dots
  - Chevron navigation
  - Click-to-zoom

## Switching Between Versions

To activate Gallery1 or Gallery2:

1. **Update UI exports** (`src/components/UI/index.js`):
   ```js
   export { Gallery } from './Gallery1/Gallery';
   // or
   export { Gallery } from './Gallery2/Gallery';
   ```

2. **Update Section exports** (`src/components/Sections/index.js`):
   ```js
   export { default as GallerySection } from './Gallery1/GallerySection';
   // or
   export { default as Gallery2Section } from './Gallery2/Gallery2Section';
   ```

3. **Update App.jsx** if needed to use the appropriate section

4. **Run build**: `npm run build`
