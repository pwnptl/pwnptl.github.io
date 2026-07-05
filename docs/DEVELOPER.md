# Pfolio - Developer Documentation

Internal documentation for building, customizing, and maintaining the portfolio.

## 📁 Project Structure

```
src/
├── components/          # 23 portfolio components
├── assets/             # Images, icons, media
├── styles/             # Global CSS & Tailwind imports
├── data/               # portfolio.json & config.js
├── hooks/              # useDarkMode, useScrollToTop, useSearch
├── context/            # ThemeContext.js
├── utils/              # seo.js & helpers.js
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

**Components:** Hero, Navigation, Experience, Projects, CaseStudy, Skills, Testimonials, Blog, Publications, Certifications, Awards, TechStack, StatsDashboard, MediaMentions, References, Contact, Links, Newsletter, Resume, Search, ImageCarousel, Footer, BackToTop, ThemeToggle

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

## ✨ Components Status

| Component | Status | Notes |
|-----------|--------|-------|
| Hero, Navigation, Footer | 📋 TODO | Core layout |
| Skills, Experience, Projects | 📋 TODO | Main content |
| Testimonials, Blog, Publications | 📋 TODO | Social proof |
| Certifications, Awards, TechStack | 📋 TODO | Credentials |
| Search, ThemeToggle, BackToTop | 📋 TODO | UX features |
| Contact, Links, Resume, Newsletter | 📋 TODO | Engagement |
| CaseStudy, ImageCarousel, StatsDashboard | 📋 TODO | Advanced |

## 📝 Configuration

**Content:** Edit `src/data/portfolio.json`
```json
{
  "profile": { "name", "title", "image", "intro", "resumeUrl" },
  "skills": [{ "category", "items": [{ "name", "level" }] }],
  "experiences": [{ "company", "role", "startDate", "endDate", "description" }],
  "projects": [{ "title", "description", "image", "link", "tags" }],
  "testimonials": [{ "text", "author", "title", "image", "rating" }],
  "blog": [{ "title", "slug", "excerpt", "date", "tags" }],
  "certifications": [{ "name", "issuer", "date", "url" }],
  "awards": [{ "title", "issuer", "date" }],
  "contact": { "email", "phone", "location" },
  "socialLinks": { "github", "linkedin", "twitter", "email" }
}
```

**Site Config:** Edit `src/data/config.js`
```javascript
export const config = {
  siteTitle: 'Your Name - Portfolio',
  siteDescription: 'Full Stack Developer',
  sections: { hero: true, experience: true, projects: true },
  colors: { primary: '#3b82f6', secondary: '#1f2937' }
}
```

## 🧩 Component Architecture

**Design Principles:**
- Reusable, self-contained components
- Data-driven from `portfolio.json`
- Prop-based configuration
- Headless UI + Tailwind styling
- Mobile-first responsive design

**Component Template:**
```jsx
export function ComponentName({ data, className = '' }) {
  return (
    <section className={`py-12 px-4 ${className}`}>
      {/* Content */}
    </section>
  )
}
```

**With Headless UI:**
```jsx
<Menu.Item>
  {({ active }) => (
    <button className={`px-4 py-2 ${active ? 'bg-blue-600' : ''}`}>
      Item
    </button>
  )}
</Menu.Item>
```

## 🎨 Styling

- Use Tailwind classes: `px-4 py-2 bg-blue-600 rounded`
- Responsive: `sm:px-8 md:px-12 lg:px-16`
- Dark mode: `dark:bg-gray-900 dark:text-white`
- Custom vars in `src/styles/variables.css`

## 🔧 Common Tasks

**Add Component:** Create `src/components/ComponentName/ComponentName.jsx` → Export → Import in App

**Update Content:** Edit `src/data/portfolio.json` with new data

**Customize Colors:** Edit `src/styles/variables.css` CSS variables

**Enable/Disable Sections:** Toggle in `src/data/config.js`

## 🔍 SEO

Add in `App.jsx`:
```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Your Name"
  })}
</script>
```

## 🌙 Dark Mode

`src/context/ThemeContext.js`:
```jsx
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    localStorage.getItem('theme') === 'dark' && setIsDark(true)
  }, [])
  
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## 📱 Responsive Patterns

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Auto-responsive grid */}
</div>

<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>

<img src="/img.jpg" className="w-full md:w-1/2 lg:w-1/3" alt="Desc" />
```

## 📦 Build & Deploy

```bash
npm run build        # Creates /dist
npm run preview      # Test production build
```

**Deploy to:** Vercel (recommended) | Netlify | GitHub Pages

## ✅ Workflow Checklist

- [ ] Component responsive (mobile/tablet/desktop)
- [ ] Works in dark mode
- [ ] Uses Tailwind CSS
- [ ] Data from `portfolio.json`
- [ ] No console errors
- [ ] ESLint passes: `npm run lint`

## 📚 Resources

[Tailwind Docs](https://tailwindcss.com) | [Headless UI](https://headlessui.com) | [React](https://react.dev) | [Vite](https://vitejs.dev)

## 🎯 Next Steps

1. Create component directories
2. Build core components (Hero, Nav, Footer)
3. Implement dark mode
4. Build content sections
5. Add search & interactions
6. SEO optimization
7. Deploy

---

**Last Updated:** 2026-06-28 | **Status:** 🚀 Ready
