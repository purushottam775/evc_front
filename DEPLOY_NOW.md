# 🚀 DEPLOY NOW - Single Command Setup

## ⚡ Quick Deployment (30 seconds)

Your backend is already running at: **https://evc-backend-tciv.vercel.app/**

### 1. Create Environment File
```bash
# Copy the pre-configured template
cp env.example .env
```

### 2. Build for Production
```bash
# Install dependencies and build
npm install
npm run deploy:build
```

### 3. Deploy
Upload the `dist/` folder to your hosting service:
- **Netlify**: Drag & drop `dist` folder
- **Vercel**: Connect GitHub repo or upload `dist`
- **GitHub Pages**: Upload `dist` contents

## 🔧 Environment Configuration

The `env.example` is already configured with your production backend:

```env
VITE_API_URL=https://evc-backend-tciv.vercel.app/api
VITE_APP_ENVIRONMENT=production
```

## ✅ What's Pre-configured

- ✅ Backend URL: https://evc-backend-tciv.vercel.app/api
- ✅ Production build settings
- ✅ Optimized bundle configuration
- ✅ Security settings for production

## 🎯 Next Steps

1. **Copy env file**: `cp env.example .env`
2. **Build**: `npm run deploy:build`
3. **Deploy**: Upload `dist/` folder
4. **Update**: Change `VITE_FRONTEND_URL` in `.env` after deployment

## 🔗 Your Backend Status

Backend is live and running: [https://evc-backend-tciv.vercel.app/](https://evc-backend-tciv.vercel.app/)

**Ready to deploy in 3 commands!** 🚀