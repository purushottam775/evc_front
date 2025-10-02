import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development Server Configuration
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // Production Build Configuration
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['react-icons', 'react-toastify'],
          auth: ['@react-oauth/google']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsDir: 'assets',
    target: 'es2015'
  },
  
  // Environment Variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  
  // Preview Server (for production testing)
  preview: {
    port: 4173,
    host: true
  }
})
