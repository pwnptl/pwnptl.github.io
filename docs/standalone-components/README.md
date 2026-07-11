# Standalone Portfolio Components

Complete, isolated HTML/CSS/JS versions of all portfolio components using **Shadow DOM** for complete CSS/JS isolation. Each component is self-contained and can be dropped into any existing website without interference.

## 📁 Component Structure

```
standalone-components/
├── GoToTopButton/
│   ├── GoToTopButton.js
│   └── index.html
├── Toast/
│   ├── Toast.js
│   └── index.html
├── Timeline/
│   ├── Timeline.js
│   └── index.html
├── ThemeSwitcher/
│   ├── ThemeSwitcher.js
│   └── index.html
├── ControlsContainer/
│   ├── ControlsContainer.js
│   └── index.html
├── HeroSection/
│   ├── HeroSection.js
│   └── index.html
├── ProjectsSection/
│   ├── ProjectsSection.js
│   └── index.html
├── ContactSection/
│   ├── ContactSection.js
│   └── index.html
├── ExperienceSection/
│   ├── ExperienceSection.js
│   └── index.html
├── EducationSection/
│   ├── EducationSection.js
│   └── index.html
├── Gallery3-Standalone/ (moved from gallery3-standalone/)
│   ├── component.html
│   ├── gallery3.js
│   └── README.md
└── README.md (this file)
```

## 🔐 Isolation Features

All components use **Shadow DOM** for complete isolation:

✅ **CSS Encapsulation** - Styles can't leak in or out  
✅ **Namespace Prefixing** - All classes prefixed with component name (e.g., `gt-*`, `ts-*`, `hero-*`)  
✅ **XSS Protection** - HTML escaping for all user content  
✅ **No Dependencies** - Zero external libraries required  
✅ **Themeable** - CSS custom properties for color customization  
✅ **Responsive** - Mobile-first design built-in  

## 🚀 Quick Start

### Single Component Example

```html

<div id="hero-root"></div>

<script type="module">
    import HeroSection from './HeroSection.js';

    document.addEventListener('DOMContentLoaded', () => {
        new HeroSection({
            rootSelector: '#hero-root',
            data: {
                title: 'Hi, I\'m Developer',
                subtitle: 'Full Stack Engineer',
                description: 'Building amazing web experiences...',
                cta: {label: 'Get Started', url: '#projects'}
            }
        });
    });
</script>
```

### Multiple Components

```html
<div id="hero-root"></div>
<div id="projects-root"></div>
<div id="contact-root"></div>
<div id="controls-root"></div>

<script type="module">
  import HeroSection from './HeroSection/HeroSection.js';
  import ProjectsSection from './ProjectsSection/ProjectsSection.js';
  import ContactSection from './ContactSection/ContactSection.js';
  import ControlsContainer from './ControlsContainer/ControlsContainer.js';

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new HeroSection({ rootSelector: '#hero-root', data: heroData });
    new ProjectsSection({ rootSelector: '#projects-root', items: projects });
    new ContactSection({ rootSelector: '#contact-root', items: contacts });
    new ControlsContainer({ rootSelector: '#controls-root' });
  });
</script>
```

## 📦 Component API Reference

### GoToTopButton

Scrolls to next/previous section based on scroll position.

```javascript
new GoToTopButton({
  rootSelector: '#go-to-top-button-root',
  isEnabled: true,
  scrollContainerId: 'app-main-content',
});
```

**Options:**
- `rootSelector` - Target element ID
- `isEnabled` - Show/hide button (default: true)
- `scrollContainerId` - ID of scrollable container (default: 'app-main-content')

---

### Toast

Temporary notification messages.

```javascript
const toast = new Toast({ rootSelector: '#toast-root' });

toast.show({
  message: 'Success!',
  type: 'success',        // 'info' | 'success' | 'warning' | 'error'
  position: 'bottom-center', // 'bottom-center' | 'bottom-right' | 'top-center' | etc.
  duration: 3000,
});
```

---

### Timeline

Chronological timeline display (used for Experience, Education).

```javascript
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
```

---

### ThemeSwitcher

Cycles through 11 color themes.

```javascript
const toast = new Toast({ rootSelector: '#toast-root' });

new ThemeSwitcher({
  rootSelector: '#theme-switcher-root',
  isToastEnabled: true,
  toastComponent: toast,
});
```

**Available Themes:**
- deep_blue, vibrant_red, forest_green, sun_orange, ocean_teal
- grape_purple, rose_pink, sky_cyan, charcoal_gray, gold_yellow, lime_green

---

### ControlsContainer

Combines GoToTopButton + ThemeSwitcher in one fixed-position container.

```javascript
new ControlsContainer({
  rootSelector: '#controls-container-root',
  isThemeSwitcherEnabled: true,
  isGoToTopEnabled: true,
  scrollContainerId: 'app-main-content',
});
```

---

### HeroSection

Landing section with title, subtitle, description, CTA.

```javascript
new HeroSection({
  rootSelector: '#hero-root',
  data: {
    title: 'Hi, I\'m Pawan',
    subtitle: 'Full Stack Developer',
    description: 'I build beautiful web applications...',
    cta: { label: 'Get In Touch', url: '#contact' }
  }
});
```

---

### ProjectsSection

Grid display of project cards.

```javascript
new ProjectsSection({
  rootSelector: '#projects-root',
  items: [
    {
      id: 'project-1',
      title: 'Portfolio Website',
      image: '/path/to/image.jpg',
      description: 'Modern responsive portfolio...',
      url: 'https://example.com'
    }
  ]
});
```

---

### ContactSection

Contact links with emoji icons.

```javascript
new ContactSection({
  rootSelector: '#contact-root',
  items: [
    {
      id: 'contact-email',
      icon: 'email',    // email | phone | whatsapp | github | linkedin | twitter | instagram
      label: 'Email',
      url: 'mailto:user@example.com'
    }
  ]
});
```

---

### ExperienceSection

Work history display (uses Timeline component).

```javascript
new ExperienceSection({
  rootSelector: '#experience-root',
  items: experienceArray // same format as Timeline
});
```

---

### EducationSection

Education history with card layout.

```javascript
new EducationSection({
  rootSelector: '#education-root',
  items: [
    {
      id: 1,
      logo: '/path/to/logo.png',
      institution: 'State University',
      degree: 'Bachelor',
      field: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
      description: 'Focused on web development...',
      skills: ['JavaScript', 'React', 'Databases']
    }
  ]
});
```

---

## 🎨 Theming

Customize colors via CSS custom properties:

```html
<div id="hero-root" style="
  --hero-font-primary: #1a1a1a;
  --hero-accent-primary: #ff6b6b;
  --hero-font-secondary: #666;
"></div>
```

Each component has its own color variable namespace (prefix):
- `--gt-*` (GoToTopButton)
- `--ts-*` (ThemeSwitcher)
- `--tl-*` (Timeline)
- `--hero-*` (HeroSection)
- `--proj-*` (ProjectsSection)
- `--contact-*` (ContactSection)
- `--exp-*` (ExperienceSection)
- `--edu-*` (EducationSection)
- `--toast-*` (Toast)

---

## 📱 Responsive Breakpoints

All components are mobile-responsive with breakpoints at:
- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

---

## 🔒 Security

- **XSS Protection**: All user text is escaped via `textContent`, not `innerHTML`
- **URL Validation**: Links validated before rendering
- **Content Isolation**: Shadow DOM prevents style injection

---

## 🐛 Browser Support

- **Chrome/Edge**: 76+
- **Firefox**: 63+
- **Safari**: 10.1+
- **Mobile**: All modern browsers with Shadow DOM support

---

## 💡 Best Practices

1. **Create container divs first:**
   ```html
   <div id="component-name-root"></div>
   ```

2. **Initialize after DOM ready:**
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     // Initialize components
   });
   ```

3. **Use type="module"** for ES6 imports:
   ```html
   <script type="module">
     import Component from './Component.js';
   </script>
   ```

4. **Pass data at initialization:**
   ```javascript
   new Component({ rootSelector: '#root', data: yourData });
   ```

5. **No global state pollution:**
   - Components are self-contained
   - Each instance is isolated
   - Safe to run multiple components on one page

---

## 📄 File Sizes (Minified)

- GoToTopButton: ~2 KB
- Toast: ~2 KB
- Timeline: ~3 KB
- ThemeSwitcher: ~3 KB
- ControlsContainer: ~2 KB
- HeroSection: ~3 KB
- ProjectsSection: ~4 KB
- ContactSection: ~3 KB
- ExperienceSection: ~2 KB
- EducationSection: ~4 KB
- **Total: ~28 KB** (unminified, without gzip)

---

## 🤝 Integration Tips

### With Existing Websites

1. Drop the component folder into your project
2. Add mount points: `<div id="component-root"></div>`
3. Import and initialize components
4. No CSS/JS conflicts - Shadow DOM handles isolation

### With React/Vue/Angular

Components work as-is, but for integration with frameworks:
1. Initialize in `useEffect` / `mounted` / `ngOnInit`
2. Store component references if you need to call methods
3. Pass data through constructor options

### With WordPress/CMS

1. Create a custom template or page
2. Add component container divs
3. Enqueue JavaScript file with type="module"
4. Initialize on page load

---

## 📝 License

All components are standalone and ready to integrate into any project.
