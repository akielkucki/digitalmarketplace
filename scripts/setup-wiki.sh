#!/bin/bash

# DevMarket Wiki Setup Script
# This script sets up the GitHub wiki for the DevMarket project

set -e  # Exit on any error

echo "🚀 Setting up DevMarket Wiki..."

# Configuration
REPO_URL="https://github.com/akielkucki/digitalmarketplace"
WIKI_URL="https://github.com/akielkucki/digitalmarketplace.wiki.git"
WIKI_DIR="wiki-repo"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory."
    exit 1
fi

print_step "Checking if wiki directory exists..."
if [ -d "docs/wiki" ]; then
    print_success "Wiki directory found."
else
    print_error "Wiki directory not found. Please ensure you have the wiki files in docs/wiki."
    exit 1
fi

print_step "Cloning the wiki repository..."
if [ -d "$WIKI_DIR" ]; then
    print_warning "Wiki repository directory already exists. Removing..."
    rm -rf "$WIKI_DIR"
fi

# Clone the wiki repository
git clone "$WIKI_URL" "$WIKI_DIR"

if [ $? -ne 0 ]; then
    print_error "Failed to clone wiki repository. Make sure the repository exists and you have access."
    exit 1
fi

print_success "Wiki repository cloned successfully."

print_step "Copying wiki files..."

# Copy all wiki files to the wiki repository
cp docs/wiki/*.md "$WIKI_DIR/"

print_success "Wiki files copied."

print_step "Setting up wiki repository..."
cd "$WIKI_DIR"

# Configure git if needed
if [ -z "$(git config user.name)" ]; then
    print_warning "Git user.name not set. Please configure it:"
    echo "git config --global user.name 'Your Name'"
fi

if [ -z "$(git config user.email)" ]; then
    print_warning "Git user.email not set. Please configure it:"
    echo "git config --global user.email 'your.email@example.com'"
fi

print_step "Staging wiki files..."
git add .

print_step "Committing changes..."
git commit -m "📚 Initial wiki setup with comprehensive documentation

- Add project overview and quick start guide
- Include complete API documentation
- Add security guidelines and best practices
- Include production deployment guide
- Add project structure documentation

Features documented:
- JWT authentication system
- Role-based access control
- Environment variable validation
- Database setup and migrations
- Security best practices"

print_step "Pushing changes to GitHub wiki..."
git push origin master

if [ $? -eq 0 ]; then
    print_success "Wiki successfully updated!"
else
    print_error "Failed to push changes. Please check your permissions."
    cd ..
    exit 1
fi

cd ..

print_step "Cleaning up..."
rm -rf "$WIKI_DIR"

print_success "Wiki setup completed successfully!"
echo ""
echo "🌐 Your wiki is now available at:"
echo "   ${REPO_URL}/wiki"
echo ""
echo "📚 Wiki Pages Created:"
echo "   • Home - Project overview and navigation"
echo "   • Quick Start Guide - Get running in 5 minutes"
echo "   • API Documentation - Complete API reference"
echo "   • Security Overview - Security features and practices"
echo "   • Production Deployment - Deployment guide"
echo "   • Project Structure - Codebase organization"
echo ""
echo "🔧 Next Steps:"
echo "   1. Visit your wiki and verify all pages are correct"
echo "   2. Customize the content for your specific needs"
echo "   3. Add any additional documentation as needed"
echo "   4. Share the wiki URL with your team!"
echo ""
print_success "Happy documenting! 📖"
