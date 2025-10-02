# 🚀 EV Charging Station - Frontend Deployment Guide

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Deployment Options](#deployment-options)
- [Production Checklist](#production-checklist)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### 1. Environment Configuration
```bash
# Copy environment template
cp env.example .env

# Edit .env file with your production values
nano .env
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build for Production
```bash
npm run deploy:build
```

### 4. Test Production Build
```bash
npm run preview:prod
```

## 🔧 Environment Setup

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.yourapp.com/api` |
| `VITE_FRONTEND_URL` | Frontend URL | `https://yourapp.com` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789.apps.googleusercontent.com` |
| `VITE_APP_ENVIRONMENT` | Environment | `production` |

### Environment File Setup
```bash
# 1. Copy the template
cp env.example .env

# 2. Update the following variables:
VITE_API_URL=https://your-backend-domain.com/api
VITE_FRONTEND_URL=https://your-frontend-domain.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
VITE_APP_ENVIRONMENT=production
```

## 🏗️ Build Process

### Development Build
```bash
npm run dev
```

### Production Build
```bash
# Clean and build for production
npm run deploy:build

# Or step by step:
npm run clean
npm run build:prod
```

### Build Output
- **Location**: `dist/` folder
- **Assets**: Optimized CSS, JS, and images
- **Chunks**: Vendor, router, UI, and auth chunks for better caching

## 🌐 Deployment Options

### Option 1: Static Hosting (Netlify, Vercel)
```bash
# Build the project
npm run deploy:build

# Deploy the dist folder
# - Drag and drop dist folder to Netlify
# - Connect GitHub repo to Vercel
```

### Option 2: Traditional Web Server (Apache, Nginx)
```bash
# Build the project
npm run deploy:build

# Copy dist folder to web server
scp -r dist/* user@server:/var/www/html/
```

### Option 3: Docker Deployment
```dockerfile
# Dockerfile example
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run deploy:build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## ✅ Production Checklist

### Before Deployment
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Update `VITE_FRONTEND_URL` to production frontend URL
- [ ] Add Google OAuth Client ID if using Google login
- [ ] Set `VITE_APP_ENVIRONMENT=production`
- [ ] Test build locally with `npm run preview:prod`
- [ ] Run linting with `npm run lint`

### After Deployment
- [ ] Test all login methods (email/password, Google OAuth)
- [ ] Verify API connections are working
- [ ] Test user dashboard functionality
- [ ] Test admin dashboard functionality
- [ ] Verify booking system works
- [ ] Check responsive design on mobile devices

## 🔍 Troubleshooting

### Common Issues

#### 1. API Connection Failed
```bash
# Check if VITE_API_URL is correct
echo $VITE_API_URL

# Verify backend is running and accessible
curl https://your-backend-url.com/api/health
```

#### 2. Google OAuth Not Working
- Verify `VITE_GOOGLE_CLIENT_ID` is set correctly
- Check Google Console authorized domains
- Ensure redirect URIs are configured

#### 3. Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### 4. Environment Variables Not Loading
- Ensure `.env` file is in the root directory
- Variables must start with `VITE_`
- Restart development server after changes

## 📊 Performance Optimization

### Build Optimization Features
- **Code Splitting**: Automatic vendor and route-based splitting
- **Tree Shaking**: Removes unused code
- **Minification**: Terser minification for smaller bundles
- **Asset Optimization**: Optimized images and fonts
- **Chunk Strategy**: Separate chunks for better caching

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js and build to see bundle size
npm run build
```

## 🔒 Security Considerations

### Production Security
- Environment variables are build-time only
- No sensitive data in frontend code
- HTTPS required for production
- Secure cookie settings for authentication
- CSP headers recommended

### Environment Variables Security
```bash
# ❌ Never expose sensitive data
VITE_DATABASE_PASSWORD=secret123  # Wrong!

# ✅ Only expose frontend-safe variables
VITE_API_URL=https://api.example.com  # Correct!
```

## 📞 Support

### Deployment Commands Reference
```bash
# Development
npm run dev              # Start development server
npm run lint             # Run linting
npm run lint:fix         # Fix linting issues

# Production
npm run deploy:build     # Clean and build for production
npm run preview:prod     # Preview production build
npm run serve            # Build and serve locally

# Maintenance
npm run clean            # Clean dist folder
```

### Useful Links
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deploying)
- [Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**🎉 Your EV Charging Station frontend is ready for deployment!**

For additional support, check the troubleshooting section or contact the development team.