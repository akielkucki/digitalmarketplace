#!/bin/bash

# DevMarket Wiki Manager
# A comprehensive tool for managing GitHub wiki documentation

set -e  # Exit on any error

# Configuration
REPO_URL="https://github.com/akielkucki/digitalmarketplace"
WIKI_URL="https://github.com/akielkucki/digitalmarketplace.wiki.git"
WIKI_DIR="wiki-repo"
WIKI_SOURCE_DIR="docs/wiki"
VERSION="1.0.0"

# Default values
OPERATION=""
COMMIT_MESSAGE=""
FORCE=false
VERBOSE=true

# Cleanup function
cleanup() {
    if [ -d "$WIKI_DIR" ]; then
        [ "$VERBOSE" = true ] && echo "🧹 Cleaning up temporary directory..."
        rm -rf "$WIKI_DIR"
    fi
}

# Set trap to cleanup on exit (success, error, or interrupt)
trap cleanup EXIT

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

print_info() {
    echo -e "${CYAN}ℹ️ $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🚀 $1${NC}"
}

# Show usage information
show_usage() {
    echo "DevMarket Wiki Manager v$VERSION"
    echo ""
    echo "Usage: $0 [OPERATION] [OPTIONS]"
    echo ""
    echo "OPERATIONS:"
    echo "  setup, init         Initial wiki setup (first time only)"
    echo "  update, sync        Update existing wiki with changes"
    echo "  status              Check wiki repository status"
    echo "  clean               Clean up temporary files"
    echo "  help, --help, -h    Show this help message"
    echo ""
    echo "OPTIONS:"
    echo "  -m, --message MSG   Custom commit message"
    echo "  -f, --force         Force operation (overwrite existing)"
    echo "  --version           Show version information"
    echo ""
    echo "EXAMPLES:"
    echo "  $0 setup                    # Initial wiki setup"
    echo "  $0 update                   # Update wiki with latest changes"
    echo "  $0 update -m \"Add new docs\" # Update with custom message"
    echo "  $0 status                   # Check current status"
    echo ""
}

# Show version information
show_version() {
    echo "DevMarket Wiki Manager v$VERSION"
    echo "A comprehensive tool for managing GitHub wiki documentation"
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            setup|init)
                OPERATION="setup"
                shift
                ;;
            update|sync)
                OPERATION="update"
                shift
                ;;
            status)
                OPERATION="status"
                shift
                ;;
            clean)
                OPERATION="clean"
                shift
                ;;
            help|--help|-h)
                show_usage
                exit 0
                ;;
            --version)
                show_version
                exit 0
                ;;
            -m|--message)
                COMMIT_MESSAGE="$2"
                shift 2
                ;;
            -f|--force)
                FORCE=true
                shift
                ;;
            *)
                print_error "Unknown option: $1"
                echo ""
                show_usage
                exit 1
                ;;
        esac
    done

    # If no operation specified, show usage
    if [ -z "$OPERATION" ]; then
        show_usage
        exit 1
    fi
}

# Pre-flight checks
run_preflight_checks() {
    [ "$VERBOSE" = true ] && print_info "Running pre-flight checks..."

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

    # Check if wiki source directory exists
    if [ ! -d "$WIKI_SOURCE_DIR" ]; then
        print_error "Wiki source directory not found: $WIKI_SOURCE_DIR"
        print_info "Please ensure you have wiki files in the source directory."
        exit 1
    fi

    # Check if there are any .md files in the source directory
    if [ -z "$(find "$WIKI_SOURCE_DIR" -name "*.md" -type f 2>/dev/null)" ]; then
        print_error "No markdown files found in $WIKI_SOURCE_DIR"
        exit 1
    fi

    [ "$VERBOSE" = true ] && print_success "Pre-flight checks passed"
}

# Setup git configuration if needed
setup_git_config() {
    [ "$VERBOSE" = true ] && print_step "Checking git configuration..."
    
    if [ -z "$(git config user.name)" ]; then
        print_warning "Git user.name not set. Please configure it:"
        echo "git config --global user.name 'Your Name'"
        return 1
    fi

    if [ -z "$(git config user.email)" ]; then
        print_warning "Git user.email not set. Please configure it:"
        echo "git config --global user.email 'your.email@example.com'"
        return 1
    fi

    [ "$VERBOSE" = true ] && print_success "Git configuration looks good"
    return 0
}

# Clone the wiki repository
clone_wiki_repo() {
    print_step "Cloning wiki repository..."
    
    if [ -d "$WIKI_DIR" ]; then
        if [ "$FORCE" = true ]; then
            print_warning "Removing existing wiki directory..."
            rm -rf "$WIKI_DIR"
        else
            print_error "Wiki directory already exists: $WIKI_DIR"
            print_info "Use --force to overwrite or clean up manually"
            exit 1
        fi
    fi

    set +e  # Temporarily disable exit on error
    git clone "$WIKI_URL" "$WIKI_DIR" 2>/dev/null
    CLONE_SUCCESS=$?
    set -e  # Re-enable exit on error

    if [ $CLONE_SUCCESS -ne 0 ]; then
        print_error "Failed to clone wiki repository."
        print_info "Make sure the repository exists and you have access:"
        print_info "$WIKI_URL"
        exit 1
    fi

    print_success "Wiki repository cloned successfully"
}

# Copy wiki files from source to wiki repo
copy_wiki_files() {
    print_step "Copying wiki files..."
    
    # Remove existing .md files in wiki repo (except .git)
    find "$WIKI_DIR" -name "*.md" -type f -delete 2>/dev/null || true
    
    # Copy all .md files from source
    cp "$WIKI_SOURCE_DIR"/*.md "$WIKI_DIR/" 2>/dev/null || {
        print_error "Failed to copy wiki files from $WIKI_SOURCE_DIR to $WIKI_DIR"
        exit 1
    }

    local file_count=$(find "$WIKI_DIR" -name "*.md" -type f | wc -l | tr -d ' ')
    print_success "Copied $file_count wiki files"
}

# Check if there are any changes to commit
check_for_changes() {
    cd "$WIKI_DIR"
    
    # Check if there are any changes (staged or unstaged)
    if git diff --quiet && git diff --cached --quiet; then
        return 1  # No changes
    else
        return 0  # Changes found
    fi
}

# Generate automatic commit message based on changes
generate_commit_message() {
    local operation="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    if [ -n "$COMMIT_MESSAGE" ]; then
        echo "$COMMIT_MESSAGE"
        return
    fi

    case "$operation" in
        "setup")
            echo "📚 Initial wiki setup - $timestamp

- Complete project documentation setup
- API documentation and guides
- Security and deployment information
- Project structure overview"
            ;;
        "update")
            echo "📝 Wiki documentation update - $timestamp

- Updated wiki content from latest source
- Synchronized with project changes
- Refreshed documentation"
            ;;
        *)
            echo "📖 Wiki update - $timestamp"
            ;;
    esac
}

# Commit and push changes
commit_and_push() {
    local operation="$1"
    
    cd "$WIKI_DIR"
    
    print_step "Staging changes..."
    git add .
    
    # Check if there are actually changes to commit
    if ! check_for_changes; then
        print_info "No changes to commit - wiki is already up to date"
        cd ..
        return 0
    fi

    print_step "Committing changes..."
    local commit_msg=$(generate_commit_message "$operation")
    
    set +e
    git commit -m "$commit_msg"
    COMMIT_SUCCESS=$?
    set -e

    if [ $COMMIT_SUCCESS -ne 0 ]; then
        print_error "Failed to commit changes"
        cd ..
        exit 1
    fi

    print_step "Pushing to GitHub wiki..."
    set +e
    git push origin master
    PUSH_SUCCESS=$?
    set -e

    cd ..

    if [ $PUSH_SUCCESS -eq 0 ]; then
        print_success "Wiki successfully updated!"
        return 0
    else
        print_error "Failed to push changes. Please check your permissions."
        exit 1
    fi
}

# Operation: Setup (initial wiki creation)
operation_setup() {
    print_header "Setting up DevMarket Wiki (Initial Setup)"
    
    run_preflight_checks
    
    if ! setup_git_config; then
        print_error "Please configure git before proceeding"
        exit 1
    fi
    
    clone_wiki_repo
    copy_wiki_files
    commit_and_push "setup"
    
    show_success_info
}

# Operation: Update (sync existing wiki)
operation_update() {
    print_header "Updating DevMarket Wiki"
    
    run_preflight_checks
    
    if ! setup_git_config; then
        print_error "Please configure git before proceeding"
        exit 1
    fi
    
    clone_wiki_repo
    copy_wiki_files
    
    # Check if update is needed
    cd "$WIKI_DIR"
    if ! check_for_changes; then
        print_success "Wiki is already up to date - no changes needed"
        cd ..
        return 0
    fi
    cd ..
    
    commit_and_push "update"
    show_success_info
}

# Operation: Status (check current state)
operation_status() {
    print_header "Wiki Status Check"
    
    run_preflight_checks
    
    print_info "Repository: $REPO_URL"
    print_info "Wiki URL: ${REPO_URL}/wiki"
    print_info "Source directory: $WIKI_SOURCE_DIR"
    
    local file_count=$(find "$WIKI_SOURCE_DIR" -name "*.md" -type f | wc -l | tr -d ' ')
    print_info "Wiki files in source: $file_count"
    
    # List wiki files
    if [ "$VERBOSE" = true ]; then
        echo ""
        print_step "Wiki files found:"
        find "$WIKI_SOURCE_DIR" -name "*.md" -type f -exec basename {} \; | sort
    fi
    
    # Try to get remote wiki status
    print_step "Checking remote wiki status..."
    set +e
    git ls-remote --heads "$WIKI_URL" master >/dev/null 2>&1
    REMOTE_SUCCESS=$?
    set -e
    
    if [ $REMOTE_SUCCESS -eq 0 ]; then
        print_success "Remote wiki repository is accessible"
    else
        print_warning "Cannot access remote wiki repository"
        print_info "Wiki may not be initialized yet - use 'setup' operation"
    fi
}

# Operation: Clean (remove temporary files)
operation_clean() {
    print_header "Cleaning up temporary files"
    
    if [ -d "$WIKI_DIR" ]; then
        rm -rf "$WIKI_DIR"
        print_success "Removed temporary directory: $WIKI_DIR"
    else
        print_info "No temporary files to clean"
    fi
}

# Show success information
show_success_info() {
    echo ""
    print_success "Wiki operation completed successfully!"
    echo ""
    echo "🌐 Your wiki is available at:"
    print_info "   ${REPO_URL}/wiki"
    echo ""
    echo "📚 Available wiki pages:"
    if [ -d "$WIKI_SOURCE_DIR" ]; then
        find "$WIKI_SOURCE_DIR" -name "*.md" -type f -exec basename {} .md \; | sort | while read -r page; do
            echo "   • $page"
        done
    fi
    echo ""
}

# Main function
main() {
    # Parse command line arguments
    parse_args "$@"
    
    # Execute the requested operation
    case "$OPERATION" in
        "setup")
            operation_setup
            ;;
        "update")
            operation_update
            ;;
        "status")
            operation_status
            ;;
        "clean")
            operation_clean
            ;;
        *)
            print_error "Unknown operation: $OPERATION"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
