# 📁 EV Charging Station - Frontend Project Structure

## 🏗️ Project Architecture

```
ev/frontend/
├── 📁 public/                    # Static assets
│   ├── vite.svg                  # App icon
│   └── index.html                # HTML template
│
├── 📁 src/                       # Source code
│   ├── 📁 assets/                # Static assets (images, icons)
│   │   └── react.svg
│   │
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 admin/             # Admin-specific components
│   │   │   ├── ManageBookings.jsx
│   │   │   ├── ManageSlots.jsx
│   │   │   ├── ManageStations.jsx
│   │   │   └── ManageUsers.jsx
│   │   │
│   │   ├── 📁 user/              # User-specific components
│   │   │   ├── BookingModal.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── SearchStations.jsx
│   │   │
│   │   ├── FastRedirect.jsx      # Optimized redirect component
│   │   ├── Footer.jsx            # App footer
│   │   ├── GoogleButton.jsx      # Google OAuth button
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── OptimizedLoader.jsx   # Loading component
│   │   └── ProtectedRoute.jsx    # Route protection
│   │
│   ├── 📁 context/               # React Context providers
│   │   └── AuthContext.jsx       # Authentication context
│   │
│   ├── 📁 hooks/                 # Custom React hooks
│   │   └── usePreloadDashboard.js # Dashboard preloading
│   │
│   ├── 📁 pages/                 # Page components
│   │   ├── 📁 admin/             # Admin pages
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── 📁 user/              # User pages
│   │   │   └── UserDashboard.jsx
│   │   │
│   │   ├── EmailVerification.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── GoogleCallback.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── 📁 services/              # API services
│   │   └── apiService.js         # Centralized API calls
│   │
│   ├── 📁 utils/                 # Utility functions
│   │   ├── api.js                # Axios configuration
│   │   └── toast.js              # Toast notifications
│   │
│   ├── App.jsx                   # Main app component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # App entry point
│
├── 📄 Configuration Files
├── .gitignore                    # Git ignore rules
├── env.example                   # Environment template
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── vite.config.js                # Vite configuration

├── 📄 Documentation
├── DEPLOYMENT_GUIDE.md           # Deployment instructions
├── ENVIRONMENT_SETUP.md          # Environment setup guide
├── PROJECT_STRUCTURE.md          # This file
└── README.md                     # Project overview
```

## 🎯 Component Organization

### 📱 Pages
- **Purpose**: Top-level route components
- **Location**: `src/pages/`
- **Naming**: PascalCase (e.g., `UserDashboard.jsx`)

### 🧩 Components
- **Purpose**: Reusable UI components
- **Location**: `src/components/`
- **Organization**: Grouped by feature/role
- **Naming**: PascalCase (e.g., `GoogleButton.jsx`)

### 🔧 Services
- **Purpose**: API communication and business logic
- **Location**: `src/services/`
- **Naming**: camelCase (e.g., `apiService.js`)

### 🎣 Hooks
- **Purpose**: Custom React hooks for shared logic
- **Location**: `src/hooks/`
- **Naming**: camelCase with `use` prefix (e.g., `usePreloadDashboard.js`)

### 🌐 Context
- **Purpose**: Global state management
- **Location**: `src/context/`
- **Naming**: PascalCase with `Context` suffix (e.g., `AuthContext.jsx`)

## 🔄 Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Pages       │    │   Components    │    │    Services     │
│                 │    │                 │    │                 │
│ • UserDashboard │◄──►│ • SearchStations│◄──►│ • apiService.js │
│ • AdminDashboard│    │ • ManageUsers   │    │ • api.js        │
│ • Login         │    │ • Profile       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Context      │    │     Hooks       │    │     Utils       │
│                 │    │                 │    │                 │
│ • AuthContext   │    │ • usePreload... │    │ • toast.js      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎨 Styling Architecture

### Tailwind CSS Structure
```css
/* Global Styles (index.css) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Component-specific styles */
.custom-button {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}
```

### Style Organization
- **Global**: `src/index.css`
- **Components**: Inline Tailwind classes
- **Custom**: Tailwind component classes
- **Configuration**: `tailwind.config.js`

## 🔐 Authentication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Login     │───►│ AuthContext │───►│ API Service │
│   Page      │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Google      │    │ Local       │    │ Backend     │
│ OAuth       │    │ Storage     │    │ API         │
└─────────────┘    └─────────────┘    └─────────────┘
```

## 📦 Build & Deployment

### Build Process
1. **Development**: `npm run dev`
2. **Production**: `npm run deploy:build`
3. **Preview**: `npm run preview:prod`

### Output Structure
```
dist/
├── assets/
│   ├── index-[hash].js      # Main application bundle
│   ├── vendor-[hash].js     # Third-party libraries
│   ├── router-[hash].js     # React Router
│   ├── ui-[hash].js         # UI components
│   ├── auth-[hash].js       # Authentication
│   └── index-[hash].css     # Compiled styles
├── index.html               # Entry HTML file
└── vite.svg                 # App icon
```

## 🚀 Performance Optimizations

### Code Splitting
- **Vendor**: React, React DOM
- **Router**: React Router DOM
- **UI**: React Icons, React Toastify
- **Auth**: Google OAuth

### Bundle Optimization
- **Minification**: Terser
- **Tree Shaking**: Automatic unused code removal
- **Asset Optimization**: Image and font optimization
- **Chunk Strategy**: Optimal caching strategy

## 🔧 Development Guidelines

### File Naming Conventions
- **Components**: PascalCase (e.g., `UserDashboard.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.js`)
- **Services**: camelCase (e.g., `apiService.js`)
- **Utils**: camelCase (e.g., `formatDate.js`)

### Import Organization
```javascript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 3. Internal imports
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/apiService';
import Navbar from '../components/Navbar';
```

### Component Structure
```javascript
// 1. Imports
import React, { useState } from 'react';

// 2. Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // 3. State and hooks
  const [state, setState] = useState('');
  
  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 5. Render
  return (
    <div>
      {/* JSX content */}
    </div>
  );
};

// 6. Export
export default ComponentName;
```

## 📚 Key Dependencies

### Core Dependencies
- **React 19.1.1**: UI library
- **React Router DOM 7.9.3**: Client-side routing
- **Axios 1.12.2**: HTTP client
- **React Toastify 11.0.5**: Toast notifications
- **React Icons 5.5.0**: Icon library
- **@react-oauth/google 0.12.2**: Google OAuth

### Development Dependencies
- **Vite 7.1.7**: Build tool
- **Tailwind CSS 3.4.1**: CSS framework
- **ESLint 9.36.0**: Code linting
- **PostCSS 8.4.35**: CSS processing

---

**🎉 This structure provides a scalable, maintainable, and professional frontend architecture for the EV Charging Station system!**