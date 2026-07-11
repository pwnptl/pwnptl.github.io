# HeroSection

Landing hero section with title, subtitle, description, and call-to-action button.

## Usage

```html
<div id="hero-root"></div>

<script type="module">
  import HeroSection from './HeroSection.js';

  new HeroSection({
    rootSelector: '#hero-root',
    data: {
      title: 'Hi, I\'m Pawan',
      subtitle: 'Full Stack Developer',
      description: 'I build beautiful web applications with modern technologies.',
      cta: {
        label: 'Get In Touch',
        url: '#contact'
      }
    }
  });
</script>
```

## Data Structure

```javascript
{
  title: 'main heading',
  subtitle: 'subheading',
  description: 'detailed text',
  cta: { label: 'button text', url: 'link' }
}
```

## Methods

- `setData(data)` - Update content

## Features

- Gradient background
- Large responsive typography
- CTA button with hover effects
- Mobile responsive
- Full viewport height
