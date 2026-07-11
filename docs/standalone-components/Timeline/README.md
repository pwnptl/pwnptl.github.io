# Timeline

Vertical timeline display for chronological items (experience, education).

## Usage

```html
<div id="timeline-root"></div>

<script type="module">
  import Timeline from './Timeline.js';

  new Timeline({
    rootSelector: '#timeline-root',
    items: [
      {
        id: 1,
        date: 'Jan 2023 - Present',
        title: 'Senior Developer',
        company: 'Tech Company',
        description: 'Led development of core features...',
        logo: '/path/to/logo.png' // optional
      }
    ]
  });
</script>
```

## Item Structure

```javascript
{
  id: unique_id,
  date: 'date range',
  title: 'job/degree title',
  company: 'company/school name',
  description: 'details',
  logo: 'optional image url'
}
```

## Methods

- `setItems(items)` - Replace all items
- `addItems(items)` - Add more items

## Features

- Vertical timeline with markers
- Logo or icon support
- Responsive design
- Mobile-friendly
