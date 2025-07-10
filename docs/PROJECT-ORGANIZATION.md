# Project Organization 📁

This document explains the clean directory structure of the DevMarket project.

## 🏗️ Root Directory Structure

```
digitalmarketplace/
├── 📄 README.md                 # Project overview and quick start
├── 📄 package.json              # Dependencies and scripts
├── 📄 next.config.js            # Next.js configuration
├── 📄 jsconfig.json             # JavaScript/TypeScript configuration
├── 📄 eslint.config.mjs         # ESLint configuration
├── 📄 postcss.config.mjs        # PostCSS configuration
├── 📄 .gitignore                # Git ignore rules
├── 📄 .env.example              # Environment template
├── 📄 .env.local                # Local environment (git-ignored)
├── 📁 src/                      # Source code
├── 📁 public/                   # Static assets
├── 📁 docs/                     # Documentation
├── 📁 scripts/                  # Utility scripts
├── 📁 .next/                    # Next.js build output (git-ignored)
└── 📁 node_modules/             # Dependencies (git-ignored)
```

## 📂 Directory Purposes

### `/src` - Source Code
```
src/
├── app/                         # Next.js App Router
│   ├── api/                     # API routes
│   ├── (pages)/                 # Application pages
│   ├── globals.css              # Global styles
│   ├── layout.jsx               # Root layout
│   └── page.jsx                 # Homepage
├── components/                  # Reusable UI components
├── constants/                   # Application constants
├── lib/                         # Core utilities and libraries
│   ├── auth.js                  # Authentication utilities
│   ├── db.js                    # Database utilities
│   ├── models/                  # Data models
│   └── utils/                   # Helper functions
└── middleware.js                # Next.js middleware
```

### `/docs` - Documentation
```
docs/
├── SECURITY.md                  # Security guidelines
├── WIKI-SETUP.md               # Wiki setup instructions
└── wiki/                       # GitHub wiki source files
    ├── Home.md
    ├── Quick-Start-Guide.md
    ├── API-Documentation.md
    ├── Security-Overview.md
    ├── Production-Deployment.md
    └── Project-Structure.md
```

### `/scripts` - Utility Scripts
```
scripts/
├── README.md                    # Scripts documentation
└── setup-wiki.sh              # Automated wiki setup
```

### `/public` - Static Assets
```
public/
├── favicon.ico                  # Site favicon
├── *.svg                       # Icon files
└── images/                     # Static images
```

## 🧹 Organization Benefits

### ✅ **Clean Root Directory**
- Only essential configuration files in root
- Easy to navigate and understand
- Reduced clutter and confusion

### ✅ **Logical Grouping**
- **Code**: Everything in `/src`
- **Documentation**: Everything in `/docs`
- **Scripts**: Everything in `/scripts`
- **Assets**: Everything in `/public`

### ✅ **Scalability**
- Easy to add new documentation
- Simple script management
- Clear separation of concerns
- Maintainable structure

### ✅ **Developer Experience**
- Quick file location
- Clear naming conventions
- Consistent organization
- Easy onboarding for new developers

## 📋 File Naming Conventions

### Configuration Files
- `kebab-case.js` (e.g., `next.config.js`)
- `camelCase.json` (e.g., `jsconfig.json`)

### Documentation
- `UPPER-CASE.md` for important docs (e.g., `README.md`, `SECURITY.md`)
- `Title-Case.md` for wiki pages (e.g., `Quick-Start-Guide.md`)

### Scripts
- `kebab-case.sh` (e.g., `setup-wiki.sh`)
- Always include `.sh` extension for shell scripts

### Source Code
- **Components**: `PascalCase.jsx` (e.g., `UserProfile.jsx`)
- **Utilities**: `camelCase.js` (e.g., `validateEmail.js`)
- **Constants**: `camelCase.js` with `UPPER_CASE` exports

## 🔄 Maintenance Guidelines

### Adding New Files

**Documentation** → Place in `/docs`
```bash
# Example: Adding API changelog
touch docs/API-CHANGELOG.md
```

**Scripts** → Place in `/scripts`
```bash
# Example: Adding deployment script
touch scripts/deploy.sh
chmod +x scripts/deploy.sh
# Update scripts/README.md
```

**Components** → Place in `/src/components`
```bash
# Example: Adding new component
touch src/components/UserCard.jsx
```

### Regular Cleanup

**Monthly Tasks:**
- [ ] Review root directory for stray files
- [ ] Update documentation links
- [ ] Clean up temporary files
- [ ] Review and update `.gitignore`

**Before Each Release:**
- [ ] Verify all documentation is current
- [ ] Test all scripts work correctly
- [ ] Check no sensitive files in git
- [ ] Update version numbers

## 🚀 Quick Commands

### Development
```bash
# Start development server
npm run dev

# Run wiki setup
./scripts/setup-wiki.sh

# Build for production
npm run build
```

### File Operations
```bash
# Find files quickly
find src/ -name "*.jsx" | head -10
find docs/ -name "*.md" | head -10

# Count files by type
find . -name "*.js" -o -name "*.jsx" | wc -l
find docs/ -name "*.md" | wc -l
```

### Maintenance
```bash
# Check for large files
find . -size +10M -not -path "./node_modules/*" -not -path "./.next/*"

# Find empty directories
find . -type d -empty -not -path "./node_modules/*"
```

## 🎯 Best Practices

### DO ✅
- Keep root directory minimal
- Use descriptive directory names
- Group related files together
- Maintain consistent naming
- Document directory purposes

### DON'T ❌
- Put scripts in root directory
- Mix documentation with source code
- Use inconsistent naming conventions
- Leave empty directories
- Forget to update documentation

---

**📝 Note**: This organization follows Next.js best practices while adding logical grouping for better maintainability and developer experience.
