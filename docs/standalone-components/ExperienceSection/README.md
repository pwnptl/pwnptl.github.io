# ExperienceSection

Work history display using Timeline component.

## Usage

```html
<div id="experience-root"></div>

<script type="module">
  import ExperienceSection from './ExperienceSection.js';

  new ExperienceSection({
    rootSelector: '#experience-root',
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
  title: 'job title',
  company: 'company name',
  description: 'job details',
  logo: 'company logo url'
}
```

## Methods

- `setItems(items)` - Replace all experiences

## Features

- Vertical timeline layout
- Company logos or icons
- Date ranges
- Job descriptions
- Mobile responsive
