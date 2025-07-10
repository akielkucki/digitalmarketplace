# Scripts Directory 🛠️

This directory contains utility scripts for the DevMarket project.

## Available Scripts

### `setup-wiki.sh`
Automated script to set up the GitHub wiki with comprehensive documentation.

**Usage:**
```bash
# From project root
./scripts/setup-wiki.sh
```

**What it does:**
- Clones your GitHub wiki repository
- Copies all wiki files from `docs/wiki/`
- Commits and pushes changes
- Cleans up temporary files

**Prerequisites:**
- Git configured with repository access
- Wiki enabled in GitHub repository settings
- Wiki files present in `docs/wiki/` directory

## Adding New Scripts

When adding new utility scripts:

1. **Place them in this directory**
2. **Make them executable**: `chmod +x script-name.sh`
3. **Add documentation** to this README
4. **Use consistent naming**: `kebab-case.sh`
5. **Include error handling** and user feedback

## Script Guidelines

### Best Practices
- ✅ Use `set -e` for error handling
- ✅ Include colored output for better UX
- ✅ Validate prerequisites before running
- ✅ Provide clear error messages
- ✅ Clean up temporary files

### Template Structure
```bash
#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Helper functions
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Your script logic here...
```

---

**📝 Note**: All scripts should be run from the project root directory unless otherwise specified.
