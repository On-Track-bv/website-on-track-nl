# 🤝 Contributing to On-Track Website

Thank you for your interest in contributing to the On-Track website! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)

## � Private Project Notice

**⚠️ IMPORTANT**: This is a **private company project** for **On-Track B.V. internal use only**.

### 👥 Access Restrictions

This repository is **NOT open source** and contributions are limited to:
- ✅ **On-Track B.V. employees** only
- ✅ **Authorized contractors** with signed agreements
- ❌ **No external contributors** or public contributions

### 📜 Internal Code of Conduct

All internal contributors must:
- ✅ Be current On-Track B.V. personnel or authorized contractors
- ✅ Follow company coding standards and confidentiality agreements
- ✅ Respect intellectual property and trade secrets
- ✅ Maintain professional communication in all interactions

## 🚀 Getting Started (Internal Team Only)

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Yarn** package manager (`npm install -g yarn`)
- **Git** for version control with company access
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features

### Repository Access

This is a **private repository** with access restricted to:
- 🏢 On-Track B.V. employees with development access
- 👷 Authorized contractors with signed NDAs
- 🔐 Team members added by repository administrators

## 🛠️ Development Setup

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/On-Track-bv/website-on-track-nl.git
cd website-on-track-nl

# Install dependencies
yarn install

# Start development server
yarn dev
```

### 2. Environment Configuration

Create a `.env.local` file for local development:

```env
# Optional: EmailJS configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Google Search Console
VITE_GOOGLE_SEARCH_CONSOLE_ID=your_verification_id
```

### 3. Verify Setup

```bash
# Run linting
yarn lint

# Build project
yarn build

# Preview build
yarn preview
```

## 🔄 Making Changes

### Branch Strategy

We use **Git Flow** with the following branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes

### Creating a Feature Branch

```bash
# Start from main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... edit files ...

# Add and commit changes
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name
```

### Commit Message Convention

We follow **Conventional Commits**:

```bash
# Feature
git commit -m "feat: add new contact form validation"

# Bug fix
git commit -m "fix: resolve mobile navigation issue"

# Documentation
git commit -m "docs: update README with new setup instructions"

# Styling
git commit -m "style: improve responsive design for tablets"

# Refactoring
git commit -m "refactor: optimize SEO component performance"

# Tests
git commit -m "test: add unit tests for contact form"
```

## 🔍 Pull Request Process

### Before Creating a PR

1. **Ensure your branch is up to date**:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Run quality checks**:
   ```bash
   yarn lint          # Check code style
   yarn build         # Ensure build works
   yarn preview       # Test the build
   ```

3. **Test your changes**:
   - Test on desktop and mobile
   - Verify SEO tags are correct
   - Check accessibility features
   - Test contact forms (if modified)

### Creating the Pull Request

1. **Push your branch** to GitHub
2. **Create Pull Request** from GitHub interface
3. **Fill out the PR template**:

```markdown
## 📝 Description
Brief description of what this PR does.

## 🔄 Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💄 UI/UX improvement
- [ ] 📝 Documentation update
- [ ] ⚡ Performance improvement
- [ ] 🔒 Security update

## 🧪 Testing
- [ ] I have tested these changes locally
- [ ] I have tested on mobile devices
- [ ] I have run the linter (`yarn lint`)
- [ ] I have built the project (`yarn build`)

## 📸 Screenshots (if UI changes)
Add screenshots or GIFs if your changes affect the UI.

## 📋 Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have commented complex code sections
- [ ] I have updated documentation if needed
- [ ] My changes don't break existing functionality
```

### Review Process

1. **Automated checks** must pass:
   - ESLint (code style)
   - TypeScript compilation
   - Build process
   - Deployment preview

2. **Code review** by team member:
   - Code quality and consistency
   - Security considerations
   - Performance impact
   - SEO compliance

3. **Testing verification**:
   - Functional testing
   - Cross-browser compatibility
   - Mobile responsiveness

## 🎨 Code Style Guidelines

### TypeScript/JavaScript

```typescript
// ✅ Good
interface UserProps {
  name: string;
  email: string;
  isActive?: boolean;
}

const UserComponent: React.FC<UserProps> = ({ name, email, isActive = true }) => {
  return (
    <div className={classes.userCard}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

// ❌ Avoid
const user = (props) => {
  return <div>{props.name}</div>
}
```

### CSS Modules

```css
/* ✅ Good - Use BEM-like naming */
.userCard {
  padding: 1rem;
  border-radius: 8px;
  background: var(--mantine-color-white);
}

.userCard__title {
  font-size: 1.2rem;
  color: var(--my-primary);
}

.userCard--highlighted {
  border: 2px solid var(--my-accent);
}

/* ❌ Avoid - Generic names */
.card {
  padding: 10px;
}
```

### File Organization

```
src/
├── components/
│   └── feature/
│       ├── Feature.tsx          # Main component
│       ├── Feature.module.css   # Styles
│       └── index.ts            # Export barrel
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Desktop browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile devices**: iOS Safari, Chrome Mobile
- [ ] **Responsive breakpoints**: 320px, 768px, 1024px, 1440px
- [ ] **Dark mode**: Light/dark theme switching
- [ ] **Performance**: Page load time < 3s
- [ ] **SEO**: Meta tags, structured data
- [ ] **Accessibility**: Keyboard navigation, screen readers

### Performance Testing

```bash
# Build and analyze bundle
yarn build

# Check bundle size
ls -la dist/assets/

# Test with Lighthouse (Chrome DevTools)
# Target scores: Performance 90+, Accessibility 95+, SEO 95+
```

## 🔒 Security Guidelines

### Code Security

- ✅ Sanitize all user inputs
- ✅ Use TypeScript for type safety
- ✅ Validate environment variables
- ✅ Keep dependencies updated

### Data Privacy

- ✅ No tracking cookies without consent
- ✅ Minimize data collection
- ✅ GDPR/AVG compliance
- ✅ Secure form submissions

## 📚 Resources

### Documentation

- [React Documentation](https://react.dev/)
- [Mantine Components](https://mantine.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Internal Resources

- **Design System**: Contact design team for brand guidelines
- **Content Guidelines**: Check with marketing team
- **SEO Strategy**: Consult with marketing team

## 🆘 Getting Help

### Slack Channels

- `#development` - General development questions
- `#website-on-track` - Project-specific discussions
- `#design-system` - UI/UX questions

### Direct Contact

- **Tech Lead**: [name]@on-track.nl
- **Project Manager**: [name]@on-track.nl
- **Design Team**: design@on-track.nl

## 📄 License

By contributing to this **private company project**, you acknowledge that:
- All contributions become **proprietary property** of On-Track B.V.
- Your work is subject to existing **employment or contractor agreements**
- **No public licensing** applies - this is internal company software
- See [LICENSE.md](LICENSE.md) for full proprietary terms

---

**Internal development for On-Track B.V. only 🏢**
