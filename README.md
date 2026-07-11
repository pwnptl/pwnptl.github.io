# Pfolio - Developer Portfolio

Welcome to my professional portfolio! A modern, responsive showcase of my experience, projects, skills, and achievements.

## 📑 What You'll Find

- **Profile & Resume** — Introduction and downloadable resume
- **Experience** — Work timeline and case studies
- **Skills & Expertise** — Technical proficiencies with levels
- **Projects & Portfolio** — Featured work with live links
- **Testimonials** — Feedback from clients and colleagues
- **Blog & Publications** — Articles, research, and certifications
- **Recognition** — Awards, media mentions, statistics
- **Contact** — Multiple ways to reach out and subscribe

## ✨ Features

- Fully responsive (mobile, tablet, desktop)
- Dark mode support
- Search functionality
- Accessible design (WCAG compliant)
- SEO optimized
- Fast performance

## 🚀 Quick Start

- Use the **side navigation** to jump between sections
- **Search bar** to find projects and articles
- **Back to top button** for quick scrolling
- Contact form or social links to get in touch

## 📁 Project Structure

```
pfolio/
├── src/                    # All source code (React components, styles, config)
├── public/                 # All non-code files (images, SVGs, PDFs, media)
├── vite.config.js          # Build configuration
├── package.json            # Dependencies
├── index.html              # Entry point
└── README.md               # This file
```

---

## 🖥️ Working on Different Machines

### Transfer Code Only (Recommended)

If you want to **transfer code to a different laptop** without large files:

#### Step 1: Create Code-Only Archive
```bash
cd /path/to/pfolio

# Exclude public folder (large files)
zip -r pfolio-code-only.zip \
  src/ \
  standalone-components/ \
  package.json \
  package-lock.json \
  vite.config.js \
  index.html \
  .gitignore \
  .eslintrc.cjs \
  .prettierrc \
  --exclude='node_modules/*' \
  --exclude='.git/*' \
  --exclude='dist/*' \
  --exclude='public/*'
```

#### Step 2: Transfer to Different Laptop
```bash
# Transfer pfolio-code-only.zip to new laptop
unzip pfolio-code-only.zip -d ~/Projects/pfolio

cd ~/Projects/pfolio
npm install
```

#### Step 3: Get Public Files

**Option A: Transfer separately** (Recommended)
```bash
# Copy public folder via USB/Cloud/Network to the same pfolio directory
# Check: ls public/ should show assets/, favicon.svg, icons.svg
```

**Option B: Download from primary laptop (if on same network)**
```bash
scp -r user@primary-laptop:~/Projects/pfolio/public ./
```

**Option C: Work without public files** (Temporary)
```bash
# Create empty structure - app works but images won't load
mkdir -p public/assets/{img,video,pdf,doc,font,icon}

# Fix later by transferring public folder
```

#### Step 4: Start Development
```bash
npm run dev
```

---

## 📋 Files to Include When Transferring Code

**Include these (code):**
```
✅ src/                    # All source code
✅ standalone-components/  # Component library
✅ package.json            # Dependencies list
✅ package-lock.json       # Dependency lock
✅ vite.config.js          # Build config
✅ index.html              # Entry point
✅ .gitignore              # Ignore patterns
✅ .eslintrc.cjs           # Linter config
✅ .prettierrc              # Format config
```

**Transfer separately (non-code):**
```
📦 public/                 # Images, SVGs, PDFs (transfer separately via USB/Cloud)
```

**Recreate locally:**
```
❌ node_modules/           # Reinstall with npm install
❌ dist/                   # Rebuild with npm run build
```

---

## 🔄 Sync Workflow Between Machines

### Code Changes
```bash
# Transfer code changes to another machine
scp -r ~/Projects/pfolio/src user@laptop2:~/Projects/pfolio/

# Or specific updates
scp -r ~/Projects/pfolio/src/data user@laptop2:~/Projects/pfolio/src/
scp ~/Projects/pfolio/package.json user@laptop2:~/Projects/pfolio/
```

### Public Files (Images, etc.)
```bash
# One-time transfer, then only sync changes
scp -r ~/Projects/pfolio/public user@laptop2:~/Projects/pfolio/
```

---

## 🔗 Connect

- [GitHub](https://github.com) | [LinkedIn](https://linkedin.com) | [Twitter](https://twitter.com) | [Email](mailto:contact@example.com)

---

**Questions?** Use the contact section or reach out via social media. Thanks for visiting! 👋
