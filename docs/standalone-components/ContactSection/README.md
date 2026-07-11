# ContactSection

Contact links with emoji icons for email, phone, social media, etc.

## Usage

```html
<div id="contact-root"></div>

<script type="module">
  import ContactSection from './ContactSection.js';

  new ContactSection({
    rootSelector: '#contact-root',
    items: [
      {
        id: 'contact-email',
        icon: 'email',
        label: 'Email',
        url: 'mailto:user@example.com'
      },
      {
        id: 'contact-github',
        icon: 'github',
        label: 'GitHub',
        url: 'https://github.com/username'
      }
    ]
  });
</script>
```

## Item Structure

```javascript
{
  id: unique_id,
  icon: 'email|phone|whatsapp|github|linkedin|twitter|instagram',
  label: 'display name',
  url: 'link url'
}
```

## Methods

- `setItems(items)` - Replace all links

## Features

- Emoji icon support
- Circular buttons
- Hover effects
- Opens in new tab
- Accessible ARIA labels
