# 🚀 On-Track Website

[![Build Status](https://github.com/On-Track-bv/website-on-track-nl/actions/workflows/deploy.yml/badge.svg)](https://github.com/On-Track-bv/website-on-track-nl/actions)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE.md)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg)](https://vitejs.dev/)

Professional website for **On-Track B.V.** - Building connections in business networks.

## ✨ Features

- 🎨 **Modern React UI** - Built with Mantine component library
- 🔒 **Privacy-first** - No tracking cookies, GDPR/AVG compliant
- 🛡️ **Crawler Protection** - Multi-layer bot protection (moderate level)
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **SEO Optimized** - Google-friendly with structured data
- ⚡ **Fast Performance** - Vite-powered build system
- 🌙 **Dark Mode Support** - Automatic theme switching
- 📧 **Contact Forms** - Email integration with validation
- 🔍 **TypeScript** - Type-safe development

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + TypeScript
- **UI Framework**: Mantine 8.1.3
- **Build Tool**: Vite 7.0.4
- **Styling**: CSS Modules + Mantine themes
- **Icons**: Tabler Icons
- **Form Handling**: Mantine Forms + EmailJS
- **Deployment**: GitHub Actions + GitHub Pages

## 📦 Package Manager

This project uses **Yarn** as the package manager. Make sure you have Yarn installed:

```bash
# Install Yarn globally (if not already installed)
npm install -g yarn

# Verify installation
yarn --version
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **Yarn** package manager
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/On-Track-bv/website-on-track-nl.git
cd website-on-track-nl

# Install dependencies with Yarn
yarn install

# Start development server
yarn dev
```

The development server will start at `http://localhost:5173`

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with hot reload |
| `yarn build` | Build production bundle |
| `yarn preview` | Preview production build locally |
| `yarn lint` | Run ESLint code linting |
| `yarn lint --fix` | Auto-fix linting issues |

### Development Workflow

```bash
# Start development
yarn dev

# Run linting
yarn lint

# Build for production
yarn build

# Preview build
yarn preview
```

## 🏗️ Build & Deployment

### GitHub Actions Workflow

The project uses GitHub Actions for automated deployment:

**Workflow file**: `.github/workflows/deploy.yml`

```yaml
# Automatic deployment on push to main branch
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'yarn'
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Build
        run: yarn build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Manual Build

```bash
# Install dependencies
yarn install

# Build for production
yarn build

# Files will be generated in ./dist/
# Upload dist/ folder to your web server
```

### Build Output

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-*.js     # Bundled JavaScript
│   ├── index-*.css    # Bundled CSS
│   └── images/        # Optimized images
├── sitemap.xml        # SEO sitemap
├── robots.txt         # Crawler instructions
└── favicon.png        # Site icon
```

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── header/        # Navigation header
│   ├── home/          # Homepage sections
│   ├── services/      # Services pages
│   ├── aboutUs/       # About us page
│   ├── contact/       # Contact forms
│   ├── footer/        # Footer component
│   ├── crawlerProtection/  # Security components
│   └── seo/          # SEO components
├── contexts/          # React contexts
├── styles/           # Global styles
├── assets/           # Images and media
├── theme.ts          # Mantine theme config
└── main.tsx         # App entry point

public/
├── sitemap.xml       # SEO sitemap
├── robots.txt        # Crawler instructions
├── .htaccess        # Apache server config
└── favicon.png      # Site icon
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# EmailJS Configuration (optional)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Search Console (optional)
VITE_GOOGLE_SEARCH_CONSOLE_ID=your_verification_id
```

### Theme Customization

Edit `src/theme.ts` to customize the Mantine theme:

```typescript
export const theme = createTheme({
    fontFamily: 'Nunito, Arial, sans-serif',
    // Add your custom theme settings
});
```

### SEO Configuration

Update SEO settings in `src/components/seo/SEO.tsx`:

```typescript
<SEO 
  title="Your Custom Title"
  description="Your custom description"
  keywords="your, custom, keywords"
  canonical="https://your-domain.com"
/>
```

## 🔒 Security & Privacy

### Privacy-First Design
- ✅ **No tracking cookies** - GDPR/AVG compliant by default
- ✅ **No third-party analytics** - Privacy-friendly approach
- ✅ **Local data only** - No external data collection

### Crawler Protection
- 🛡️ **Multi-layer protection** - robots.txt, meta tags, JavaScript detection
- 🎯 **Moderate level** - Blocks aggressive scrapers, allows search engines
- 📋 **Configurable** - Easy to adjust protection levels

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-Robots-Tag: noarchive, nosnippet`

## 🌐 Browser Support

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- 📱 **Mobile browsers** - iOS Safari, Chrome Mobile

## 📊 Performance

- ⚡ **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- 📦 **Bundle Size**: ~300KB gzipped
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Optimized**: Core Web Vitals compliant

## 🤝 Contributing

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Install dependencies**: `yarn install`
4. **Start development**: `yarn dev`
5. **Make your changes**
6. **Run linting**: `yarn lint`
7. **Build and test**: `yarn build && yarn preview`
8. **Commit changes**: `git commit -m 'Add amazing feature'`
9. **Push to branch**: `git push origin feature/amazing-feature`
10. **Create Pull Request**

### Code Style

- **ESLint**: Enforced code style
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (run with `yarn lint --fix`)

## 📄 License

This project is proprietary software owned by **On-Track B.V.**

- ❌ **No redistribution** without explicit permission
- ❌ **No commercial use** without license
- ✅ **Internal development** for On-Track B.V. only

See [LICENSE.md](LICENSE.md) for full details.

## 📞 Contact & Support

**On-Track B.V.**
- 🌐 **Website**: [on-track.nl](https://on-track.nl)
- 📧 **Email**: info@on-track.nl
- 💼 **Business**: Building professional connections

For technical support or questions about this codebase, please contact the development team.

---

**Made with ❤️ by On-Track B.V. development team**