# ProjectsSection

Grid display of project cards with images, descriptions, and links.

## Usage

```html
<div id="projects-root"></div>

<script type="module">
  import ProjectsSection from './ProjectsSection.js';

  new ProjectsSection({
    rootSelector: '#projects-root',
    items: [
      {
        id: 'project-1',
        title: 'Portfolio Website',
        image: '/path/to/image.jpg',
        description: 'Modern responsive portfolio built with React...',
        url: 'https://example.com'
      }
    ]
  });
</script>
```

## Item Structure

```javascript
{
  id: unique_id,
  title: 'project name',
  image: 'image url',
  description: 'project description',
  url: 'project link'
}
```

## Methods

- `setItems(items)` - Replace all projects

## Features

- Responsive CSS Grid
- Hover effects
- Image support
- External links
- Mobile responsive (single column)
