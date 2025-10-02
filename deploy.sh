#!/bin/bash

# ===========================================
# EV Charging Station - Frontend Deployment Script
# ===========================================

set -e  # Exit on any error

echo "🚀 Starting EV Charging Station Frontend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found!"
    print_status "Creating .env from template..."
    cp env.example .env
    print_warning "Please update .env file with your production values before deploying!"
    echo ""
    echo "Required updates in .env:"
    echo "- VITE_API_URL=https://your-backend-domain.com/api"
    echo "- VITE_FRONTEND_URL=https://your-frontend-domain.com"
    echo "- VITE_GOOGLE_CLIENT_ID=your_google_client_id"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

# Validate environment variables
print_status "Validating environment configuration..."

if ! grep -q "VITE_API_URL=" .env; then
    print_error "VITE_API_URL not found in .env file"
    exit 1
fi

if ! grep -q "VITE_FRONTEND_URL=" .env; then
    print_error "VITE_FRONTEND_URL not found in .env file"
    exit 1
fi

print_success "Environment configuration validated"

# Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

# Install dependencies
print_status "Installing dependencies..."
npm install

# Run linting
print_status "Running code linting..."
npm run lint

# Clean previous build
print_status "Cleaning previous build..."
npm run clean

# Build for production
print_status "Building for production..."
npm run build:prod

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed! dist directory not found."
    exit 1
fi

print_success "Build completed successfully!"

# Display build information
print_status "Build information:"
echo "  📁 Output directory: dist/"
echo "  📊 Build size:"
du -sh dist/
echo ""

# Test production build locally
print_status "Testing production build..."
print_warning "Starting preview server on http://localhost:4173"
print_warning "Press Ctrl+C to stop the preview server"
echo ""

# Ask user if they want to preview
read -p "Do you want to preview the build locally? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run preview:prod
fi

print_success "Deployment preparation completed!"
echo ""
echo "📦 Your build is ready in the 'dist/' folder"
echo ""
echo "🚀 Deployment options:"
echo "  1. Static hosting (Netlify, Vercel): Upload 'dist' folder"
echo "  2. Web server: Copy 'dist' contents to web root"
echo "  3. Docker: Use provided Dockerfile"
echo ""
echo "📚 For detailed deployment instructions, see DEPLOYMENT_GUIDE.md"

print_success "🎉 Frontend deployment preparation complete!"