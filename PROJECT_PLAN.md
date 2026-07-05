# Pfolio - Developer Documentation

Internal documentation for building, customizing, and maintaining the portfolio.

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero/                    # Hero section with intro & image
│   ├── Navigation/              # Side navigation bar
│   ├── Experience/              # Timeline component
│   ├── Projects/                # Projects showcase grid
│   ├── CaseStudy/               # Case study cards component
│   ├── ImageCarousel/           # Slidable image gallery
│   ├── Skills/                  # Skills section with proficiency
│   ├── Testimonials/            # Client & colleague testimonials
│   ├── Blog/                    # Blog/articles listing
│   ├── Publications/            # Publications & research papers
│   ├── Certifications/          # Certifications section
│   ├── Awards/                  # Awards & recognition
│   ├── StatsDashboard/          # GitHub & activity statistics
│   ├── TechStack/               # Tech stack visual breakdown
│   ├── MediaMentions/           # Press coverage & features
│   ├── References/              # Professional references
│   ├── Contact/                 # Contact information & form
│   ├── Links/                   # GitHub, LeetCode, coding platforms
│   ├── Newsletter/              # Newsletter signup form
│   ├── Search/                  # Search functionality
│   ├── Footer/                  # Footer with social links
│   ├── BackToTop/               # Back to top button
│   ├── ThemeToggle/             # Dark mode toggle
│   └── Resume/                  # Resume download/preview
├── assets/                      # Images, icons, media
├── styles/
│   ├── index.css               # Global styles & Tailwind imports
│   └── variables.css           # CSS custom properties (colors, fonts, spacing)
├── data/
│   ├── portfolio.json          # All portfolio content
│   └── config.js               # Site configuration (meta, URLs, etc)
├── hooks/
│   ├── useDarkMode.js          # Dark mode state management
│   ├── useScrollToTop.js       # Scroll to top functionality
│   └── useSearch.js            # Search functionality
├── context/
│   └── ThemeContext.js         # React Context for theme
├── utils/
│   ├── seo.js                  # SEO utilities & meta tags
│   └── helpers.js              # Helper functions (date, color, etc)
├── App.jsx                      # Root component & layout
└── main.jsx                     # React entry point
```

## 🛠️ Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool & dev server with HMR
- **Tailwind CSS 4** — Utility-first CSS framework
- **Headless UI 2** — Unstyled, accessible components
- **React DOM 19** — React renderer
- **ESLint 10** — Code quality

## 🚀 Getting Started

### Installation & Setup
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## ✨ All Features & Sections

| Section | Component | Status | Notes |
|---------|-----------|--------|-------|
| Hero | `<Hero />` | 📋 TODO | Intro, image, CTA |
| Navigation | `<Navigation />` | 📋 TODO | Side nav, smooth scroll |
| Experience | `<Experience />` | 📋 TODO | Timeline view |
| Projects | `<Projects />` | 📋 TODO | Grid layout |
| Case Studies | `<CaseStudy />` | 📋 TODO | With metrics |
| Skills | `<Skills />` | 📋 TODO | Proficiency bars |
| Testimonials | `<Testimonials />` | 📋 TODO | Carousel |
| Blog | `<Blog />` | 📋 TODO | Articles with search |
| Publications | `<Publications />` | 📋 TODO | Research papers |
| Certifications | `<Certifications />` | 📋 TODO | Credentials |
| Awards | `<Awards />` | 📋 TODO | Recognition |
| Tech Stack | `<TechStack />` | 📋 TODO | Visual breakdown |
| Stats Dashboard | `<StatsDashboard />` | 📋 TODO | GitHub API |
| Media Mentions | `<MediaMentions />` | 📋 TODO | Press coverage |
| References | `<References />` | 📋 TODO | Professional refs |
| Contact | `<Contact />` | 📋 TODO | Form & info |
| Links | `<Links />` | 📋 TODO | Social media |
| Newsletter | `<Newsletter />` | 📋 TODO | Email signup |
| Resume | `<Resume />` | 📋 TODO | Download link |
| Search | `<Search />` | 📋 TODO | Global search |
| Image Carousel | `<ImageCarousel />` | 📋 TODO | Gallery |
| Footer | `<Footer />` | 📋 TODO | Social links |
| Back to Top | `<BackToTop />` | 📋 TODO | Scroll button |
| Theme Toggle | `<ThemeToggle />` | 📋 TODO | Dark mode |

## 📝 Configuration

### Content Management

Edit `src/data/portfolio.json` to manage all content:

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Your Title",
    "image": "/profile.jpg",
    "intro": "Your intro text",
    "resumeUrl": "/resume.pdf"
  },
  "skills": [
    {
      "category": "Frontend",
      "items": [
        { "name": "React", "level": 90 },
        { "name": "Tailwind CSS", "level": 85 }
      ]
    }
  ],
  "experiences": [
    {
      "company": "Company Name",
      "role": "Role",
      "startDate": "2020-01",
      "endDate": "2023-12",
      "description": "..."
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "...",
      "image": "/project.jpg",
      "link": "https://...",
      "tags": ["React", "Node.js"]
    }
  ],
  "caseStudies": [...],
  "testimonials": [
    {
      "text": "Great developer...",
      "author": "Name",
      "title": "CEO at Company",
      "image": "/testimonial.jpg",
      "rating": 5
    }
  ],
  "blog": [
    {
      "title": "Article Title",
      "slug": "article-title",
      "excerpt": "...",
      "date": "2024-06-28",
      "tags": ["React"]
    }
  ],
  "publications": [
    {
      "title": "Publication Title",
      "url": "https://...",
      "date": "2024-06-28"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuer",
      "date": "2024-06-28",
      "url": "https://..."
    }
  ],
  "awards": [
    {
      "title": "Award Title",
      "issuer": "Organization",
      "date": "2024-06-28"
    }
  ],
  "stats": {
    "github": "your-username",
    "contributions": 1000,
    "followers": 500,
    "repos": 50
  },
  "techStack": [
    {
      "category": "Frontend",
      "items": ["React", "Vue.js", "Tailwind CSS"]
    }
  ],
  "mediaMentions": [
    {
      "title": "Featured in TechCrunch",
      "url": "https://...",
      "date": "2024-06-28"
    }
  ],
  "references": [
    {
      "name": "Name",
      "title": "Title",
      "company": "Company",
      "email": "email@example.com"
    }
  ],
  "contact": {
    "email": "your@email.com",
    "phone": "+1-xxx-xxx-xxxx",
    "location": "City, Country"
  },
  "socialLinks": {
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/...",
    "twitter": "https://twitter.com/...",
    "email": "mailto:your@email.com"
  },
  "newsletter": {
    "heading": "Subscribe to my newsletter",
    "description": "Get updates on latest posts and projects"
  }
}
```

### Site Configuration

Edit `src/data/config.js`:

```javascript
export const config = {
  siteTitle: 'Your Name - Portfolio',
  siteDescription: 'Full Stack Developer Portfolio',
  siteUrl: 'https://yourdomain.com',
  author: 'Your Name',
  twitterHandle: '@yourhandle',
  
  // Sections to show/hide
  sections: {
    hero: true,
    experience: true,
    projects: true,
    skills: true,
    testimonials: true,
    blog: true,
    contact: true
  },
  
  // Theme colors (used in CSS variables)
  colors: {
    primary: '#3b82f6',
    secondary: '#1f2937',
    accent: '#f59e0b'
  }
}
```

## 🧩 Component Architecture

### Core Design Principles

1. **Reusable Components** — Each component is self-contained
2. **Data-Driven** — Content from `portfolio.json`
3. **Prop-Based Configuration** — Components accept props for customization
4. **Headless UI** — Unstyled components with Tailwind styling
5. **Responsive First** — Mobile-first design approach

### Component Template

```jsx
// src/components/ComponentName/ComponentName.jsx
export function ComponentName({ 
  data, 
  className = '',
  variant = 'default'
}) {
  return (
    <section className={`py-12 px-4 ${className}`}>
      {/* Component content */}
    </section>
  )
}
```

### Styling with Headless UI

```jsx
import { Menu } from '@headlessui/react'

<Menu.Item>
  {({ active }) => (
    <button className={`px-4 py-2 ${active ? 'bg-blue-600' : ''}`}>
      Menu Item
    </button>
  )}
</Menu.Item>
```

## 🎨 Styling Guide

### Tailwind CSS
- Use utility classes for all styling
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Dark mode: `dark:` prefix
- Custom CSS variables in `styles/variables.css`

### Responsive Breakpoints

```css
/* Mobile First Approach */
@media (max-width: 640px) { /* sm */ }
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Dark Mode Implementation

```jsx
// In a component
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

## 🔧 Common Tasks

### Add a New Component

1. Create folder: `src/components/ComponentName/`
2. Create files:
   - `ComponentName.jsx` — Component logic
   - `ComponentName.module.css` (optional) — Local styles
3. Export from `src/components/index.js`
4. Import and use in `App.jsx`

### Add New Content Section

1. Add data to `src/data/portfolio.json`
2. Create component in `src/components/`
3. Import component in `App.jsx`
4. Add navigation link in `Navigation` component

### Customize Colors

Edit `src/styles/variables.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #1f2937;
  --color-accent: #f59e0b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #60a5fa;
    --color-secondary: #f3f4f6;
  }
}
```

### Enable/Disable Sections

Edit `src/data/config.js`:

```javascript
sections: {
  hero: true,
  experience: true,
  projects: false, // Hide projects
  skills: true,
}
```

## 🔍 SEO & Meta Tags

### Dynamic Meta Tags

Update in `src/utils/seo.js`:

```javascript
export function updateMetaTags(page) {
  document.title = `${page.title} - Your Name`
  
  const description = document.querySelector('meta[name="description"]')
  description.setAttribute('content', page.description)
  
  // Open Graph tags
  const ogImage = document.querySelector('meta[property="og:image"]')
  ogImage.setAttribute('content', page.image)
}
```

### Structured Data (Schema.org)

Add in components or `App.jsx`:

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Your Name",
    "url": "https://yoursite.com",
    "image": "/profile.jpg"
  })}
</script>
```

## 🌙 Dark Mode Implementation

### Context Setup

`src/context/ThemeContext.js`:

```jsx
import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setIsDark(saved === 'dark')
  }, [])
  
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

### Usage in Components

```jsx
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function MyComponent() {
  const { isDark } = useContext(ThemeContext)
  
  return (
    <div className={isDark ? 'dark' : ''}>
      {/* content */}
    </div>
  )
}
```

## 📱 Responsive Design

### Mobile-First Approach

```jsx
{/* Mobile (default), then override for larger screens */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Each column becomes wider on larger screens */}
</div>
```

### Common Patterns

```jsx
// Responsive Typography
<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>

// Responsive Spacing
<div className="px-4 md:px-8 lg:px-16 py-6 md:py-10">
  Content
</div>

// Responsive Images
<img 
  src="/image.jpg" 
  className="w-full md:w-1/2 lg:w-1/3 h-auto"
  alt="Description"
/>

// Responsive Grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</div>
```

## 🐛 Development Tips

### Hot Module Reload (HMR)
- Changes to `.jsx`, `.css` files auto-refresh in browser
- State is preserved during HMR

### Browser DevTools
- Use React DevTools for component inspection
- Use Lighthouse for performance audits
- Test responsiveness with device emulation

### Debugging
```javascript
// Console logs in development
console.log('Debug:', value)

// React DevTools: Inspect component props
// Lighthouse: Check performance, accessibility, SEO
```

## 📦 Build & Deploy

### Production Build

```bash
npm run build
# Creates /dist folder with optimized build
```

### Deploy Options

1. **Vercel** — Recommended for Vite apps
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify** — Connect GitHub repo and auto-deploy

3. **GitHub Pages** — Free hosting with static build

4. **Self-Hosted** — Upload `/dist` to any web server

## ✅ Development Workflow

### Before Committing

```bash
# Run linting
npm run lint

# Fix lint issues
npm run lint -- --fix

# Test responsiveness
# Open DevTools → Toggle device toolbar
# Test on: mobile (320px), tablet (768px), desktop (1920px)

# Test in different browsers
```

### Component Checklist

- [ ] Component is responsive (mobile/tablet/desktop)
- [ ] Component is accessible (keyboard nav, screen readers)
- [ ] Component works in dark mode
- [ ] Component uses Tailwind CSS utilities
- [ ] Component accepts data from `portfolio.json`
- [ ] Component has proper TypeScript hints (JSDoc)
- [ ] No console errors or warnings
- [ ] Matches design system colors/spacing

## 📚 Resources

- **Tailwind CSS** — https://tailwindcss.com
- **Headless UI** — https://headlessui.com
- **React** — https://react.dev
- **Vite** — https://vitejs.dev
- **ESLint** — https://eslint.org

## 🎯 Next Steps

1. ✅ Project structure created
2. ✅ Tech stack configured
3. 📋 Create component directory structure
4. 📋 Build foundational components (Hero, Navigation, Footer)
5. 📋 Implement theme switching (Dark Mode)
6. 📋 Build content sections (Experience, Projects, Skills, etc.)
7. 📋 Add search functionality
8. 📋 Optimize for SEO
9. 📋 Test responsiveness
10. 📋 Deploy to production

---

**Last Updated:** 2026-06-28  
**Status:** 🚀 Ready for development
