# Wiki Setup Instructions 📚

This guide will help you set up a comprehensive GitHub wiki for the DevMarket project.

## 🎯 Overview

The wiki includes:
- **Home Page** - Project overview and navigation
- **Quick Start Guide** - 5-minute setup guide
- **API Documentation** - Complete API reference
- **Security Overview** - Security features and best practices
- **Production Deployment** - Deployment guide
- **Project Structure** - Codebase organization

## 🚀 Quick Setup (Automated)

### Prerequisites
1. **GitHub Repository** with wiki enabled
2. **Git configured** with your credentials
3. **Push access** to the repository

### Run the Setup Script
```bash
# Make sure you're in the project root
cd /path/to/digitalmarketplace

# Run the automated setup
./setup-wiki.sh
```

The script will:
1. ✅ Clone your GitHub wiki repository
2. ✅ Copy all wiki files
3. ✅ Commit and push changes
4. ✅ Clean up temporary files

## 🔧 Manual Setup

If you prefer to set up the wiki manually:

### 1. Enable Wiki on GitHub
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Features** section
4. Check **Wikis** checkbox

### 2. Clone Wiki Repository
```bash
git clone https://github.com/yourusername/digitalmarketplace.wiki.git
cd digitalmarketplace.wiki
```

### 3. Copy Wiki Files
```bash
# Copy all wiki files from your project
cp /path/to/digitalmarketplace/wiki/*.md ./
```

### 4. Commit and Push
```bash
git add .
git commit -m "📚 Initial wiki setup with comprehensive documentation"
git push origin master
```

## 📖 Wiki Structure

After setup, your wiki will have these pages:

### 🏠 [Home](https://github.com/akielkucki/digitalmarketplace/wiki)
- Project overview
- Quick navigation
- Feature highlights
- Contributing information

### 🚀 [Quick Start Guide](https://github.com/akielkucki/digitalmarketplace/wiki/Quick-Start-Guide)
- 5-minute setup instructions
- Prerequisites and dependencies
- Environment configuration
- Common troubleshooting

### 📡 [API Documentation](https://github.com/akielkucki/digitalmarketplace/wiki/API-Documentation)
- Complete endpoint reference
- Request/response examples
- Authentication details
- Error handling

### 🔐 [Security Overview](https://github.com/akielkucki/digitalmarketplace/wiki/Security-Overview)
- Security features implemented
- Best practices
- Environment variable security
- Production security requirements

### 🌐 [Production Deployment](https://github.com/akielkucki/digitalmarketplace/wiki/Production-Deployment)
- Deployment platforms (Vercel, Netlify, AWS)
- Environment configuration
- Security setup
- Monitoring and maintenance

### 📁 [Project Structure](https://github.com/akielkucki/digitalmarketplace/wiki/Project-Structure)
- Directory organization
- Architecture patterns
- Module dependencies
- Naming conventions

## 🎨 Customization

### Adding New Pages
1. Create a new `.md` file in the `wiki/` directory
2. Add navigation links to existing pages
3. Run the setup script again or manually copy and commit

### Updating Existing Pages
1. Edit the corresponding `.md` file in `wiki/`
2. Run `./setup-wiki.sh` to update the GitHub wiki
3. Or manually copy the file and commit

### Wiki Navigation
GitHub wikis automatically generate navigation from:
- Page titles (H1 headers)
- Internal links between pages
- Sidebar (if you create a `_Sidebar.md` file)

## 🔗 Linking Between Pages

Use GitHub wiki syntax for internal links:
```markdown
[Quick Start Guide](Quick-Start-Guide)
[API Documentation](API-Documentation)
[Security Overview](Security-Overview)
```

## 📝 Best Practices

### Content Organization
- ✅ Use clear, descriptive page titles
- ✅ Include table of contents for long pages
- ✅ Cross-reference related pages
- ✅ Keep pages focused on specific topics

### Writing Style
- ✅ Use consistent formatting and headers
- ✅ Include code examples with syntax highlighting
- ✅ Add emojis for visual organization
- ✅ Write from the user's perspective

### Maintenance
- ✅ Keep documentation up-to-date with code changes
- ✅ Review and update examples regularly
- ✅ Get feedback from team members
- ✅ Version control your wiki source files

## 🆘 Troubleshooting

### Common Issues

**Wiki not enabled:**
```bash
# Error: repository not found
# Solution: Enable wiki in GitHub repository settings
```

**Permission denied:**
```bash
# Error: Permission denied (publickey)
# Solution: Check your Git SSH keys or use HTTPS
git clone https://github.com/username/repo.wiki.git
```

**Git not configured:**
```bash
# Set your Git credentials
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Verification Steps
1. ✅ Check that wiki is enabled in GitHub settings
2. ✅ Verify you have push access to the repository
3. ✅ Confirm Git is configured with your credentials
4. ✅ Test by visiting the wiki URL

## 📞 Support

If you encounter issues:
1. **Check the GitHub wiki URL**: `https://github.com/username/repo/wiki`
2. **Verify repository permissions**: Ensure you can push to the repo
3. **Review setup script output**: Look for error messages
4. **Manual setup**: Try the manual setup process if automated fails

## 🎉 Success!

Once setup is complete, your wiki will be available at:
**https://github.com/akielkucki/digitalmarketplace/wiki**

Share this URL with your team and contributors for easy access to comprehensive project documentation!

---

**💡 Pro Tip**: GitHub wikis are searchable and support markdown, making them perfect for comprehensive project documentation that's always accessible to your team.
