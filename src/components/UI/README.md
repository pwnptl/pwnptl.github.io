---
name: ui_components_library
description: Reusable UI component primitives to reduce plain HTML across the portfolio
metadata:
  type: project
---

## Why UI Components?

Reduces repetitive HTML markup, ensures design consistency, and makes styling changes easier across the entire app.

## Available Components

### **Button**
Flexible button/link component with variants and sizes.

```jsx
import { Button } from './components/UI';

<Button>Click me</Button>
<Button href="/link" variant="secondary" size="lg">Link Button</Button>
<Button variant="ghost">Ghost Button</Button>
```

**Props:**
- `variant` — `'primary'` (default), `'secondary'`, `'ghost'`
- `size` — `'sm'`, `'md'` (default), `'lg'`
- `href` — If provided, renders as `<a>` instead of `<button>`
- Accepts all standard button/anchor props

---

### **Card**
Wrapper for card-style content with hover effects and shadow.

```jsx
<Card>
  <h3>Card Title</h3>
  <p>Card content here</p>
</Card>
```

**Props:**
- `className` — Additional Tailwind classes

---

### **Heading**
Semantic heading with responsive sizes and dark mode support.

```jsx
<Heading level="h1">Main Title</Heading>
<Heading level="h2">Section Title</Heading>
<Heading level="h3" className="text-blue-400">Colored Heading</Heading>
```

**Props:**
- `level` — `'h1'`, `'h2'`, `'h3'`, `'h4'`
- `className` — Additional Tailwind classes

---

### **Text**
Flexible text component with variants for different text styles.

```jsx
<Text variant="body">Regular text</Text>
<Text variant="muted">Muted gray text</Text>
<Text variant="accent">Blue accent text</Text>
<Text variant="light">Lighter gray text</Text>
```

**Props:**
- `variant` — `'body'` (default), `'muted'`, `'light'`, `'accent'`

---

### **Section**
Layout wrapper with consistent padding, max-width, and container.

```jsx
<Section id="about">
  <Heading level="h2">About Me</Heading>
  <Text>Content here</Text>
</Section>
```

**Props:**
- `id` — Section ID for anchor links
- `className` — Additional Tailwind classes (e.g., `"bg-slate-900"`)

---

### **Badge**
Small label/tag with color variants.

```jsx
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
```

**Props:**
- `variant` — `'default'`, `'primary'`, `'success'`, `'warning'`

---

### **Grid**
Responsive grid layout.

```jsx
<Grid cols={3}>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</Grid>
```

**Props:**
- `cols` — `1`, `2`, `3` (default), `4`
- Automatically responsive (mobile → desktop)

---

## Before & After Example

**BEFORE (plain HTML):**
```jsx
<div className="py-16 md:py-24 px-4">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">
      Skills
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map(skill => (
        <div key={skill.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-blue-600">{skill.name}</h3>
        </div>
      ))}
    </div>
  </div>
</div>
```

**AFTER (UI components):**
```jsx
<Section id="skills">
  <Heading level="h2" className="text-center mb-12">Skills</Heading>
  <Grid cols={3}>
    {skills.map(skill => (
      <Card key={skill.id}>
        <Heading level="h3" className="text-blue-400">{skill.name}</Heading>
      </Card>
    ))}
  </Grid>
</Section>
```

**Result:** 50% less markup, more readable, easier to maintain and style globally.

---

## Usage Tips

1. **Import:** `import { Button, Card, Heading, Text, Section, Badge, Grid } from './components/UI';`
2. **All components support `className`** for additional Tailwind classes
3. **Variants control styling** — keep markup simple, let components handle styles
4. **Responsive by default** — no need to add `md:` or `lg:` prefixes unless customizing
5. **Dark mode built-in** — use `dark:` in custom `className` if needed

---

## When to Add New UI Components

Good candidates:
- Patterns that repeat 3+ times across components
- Reusable layout structures (containers, grids, etc.)
- Styled elements that need consistent theming

Not UI components:
- Feature-specific components (e.g., ProjectCard, SkillsTimeline)
- Single-use layouts
- Page sections

Use the Feature Components for those — they can compose UI components internally.
