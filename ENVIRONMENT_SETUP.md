# 🔧 Frontend Environment Setup

## 📋 **Environment Variables Required**

### **Required Variables:**
- `VITE_API_URL` - Backend API URL
- `VITE_FRONTEND_URL` - Frontend URL for redirects

### **Optional Variables:**
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth Client ID (currently disabled)
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_APP_ENVIRONMENT` - Environment type

---

## 🚀 **Setup Instructions**

### **1. Create Environment File**
```bash
# Copy the example file
cp .env.example .env.local

# Or create manually
touch .env.local
```

### **2. Configure Variables**
Add these variables to your `.env.local` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Google OAuth Configuration (Optional - Currently Disabled)
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here

# Development Configuration
VITE_APP_NAME=EV Charging Station
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# Frontend URL (for redirects)
VITE_FRONTEND_URL=http://localhost:5173
```

### **3. Production Configuration**
For production, update the URLs:

```env
# Production API Configuration
VITE_API_URL=https://your-api-domain.com/api

# Production Frontend URL
VITE_FRONTEND_URL=https://your-frontend-domain.com
```

---

## 🔒 **Security Notes**

### **Files to Ignore:**
- `.env.local` - Local development variables
- `.env.development.local` - Development variables
- `.env.production.local` - Production variables
- `.env` - General environment variables

### **Files to Commit:**
- `.env.example` - Template file (safe to commit)
- `ENVIRONMENT_SETUP.md` - This documentation

---

## 🧪 **Testing Environment**

### **Check Variables:**
```javascript
// In your React components
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('App Name:', import.meta.env.VITE_APP_NAME);
```

### **Default Values:**
If environment variables are not set, the app uses these defaults:
- `VITE_API_URL` → `http://localhost:5000/api`
- `VITE_GOOGLE_CLIENT_ID` → `YOUR_GOOGLE_CLIENT_ID_HERE`

---

## 🚀 **GitHub Deployment**

### **For GitHub Pages:**
1. Set environment variables in GitHub repository settings
2. Use production URLs in environment variables
3. Ensure `.env.local` is in `.gitignore`

### **For Vercel/Netlify:**
1. Add environment variables in deployment platform settings
2. Use production API URLs
3. Configure build settings

---

## 📝 **Environment File Structure**

```
frontend/
├── .env.example          # Template file (committed)
├── .env.local           # Local development (ignored)
├── .env.development.local # Development (ignored)
├── .env.production.local  # Production (ignored)
└── ENVIRONMENT_SETUP.md  # This documentation
```

---

## ✅ **Ready for GitHub**

Your frontend is now configured with:
- ✅ **Environment template** - `.env.example` for reference
- ✅ **Git ignore** - Sensitive files excluded
- ✅ **Documentation** - Setup instructions included
- ✅ **Security** - No sensitive data committed

**Your frontend is ready for GitHub upload!** 🎯