# EducationSection

Education history display using Timeline component.

## Usage

```html
<div id="education-root"></div>

<script type="module">
  import EducationSection from './EducationSection.js';

  new EducationSection({
    rootSelector: '#education-root',
    items: [
      {
        id: 1,
        date: '2015 - 2019',
        title: 'Bachelor of Science',
        company: 'State University',
        description: 'Computer Science - Focused on web development and software engineering',
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
  date: 'year range',
  title: 'degree type',
  company: 'school/university name',
  description: 'field of study and details',
  logo: 'school logo url'
}
```

## Methods

- `setItems(items)` - Replace all education entries

## Features

- Vertical timeline layout
- School logos or icons
- Year ranges
- Degree and field display
- Mobile responsive
- Same as Experience section but for education
