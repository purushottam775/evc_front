@echo off
REM ===========================================
REM EV Charging Station - Quick Deployment
REM ===========================================

echo 🚀 EV Charging Station - Quick Deploy
echo Backend: https://evc-backend-tciv.vercel.app/
echo.

REM Create .env from template
echo [INFO] Setting up environment...
copy env.example .env >nul

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install >nul 2>&1

REM Build for production
echo [INFO] Building for production...
call npm run build >nul 2>&1

if exist "dist" (
    echo [SUCCESS] ✅ Build completed!
    echo.
    echo 📦 Your app is ready in the 'dist' folder
    echo 🚀 Deploy options:
    echo   • Drag 'dist' folder to Netlify
    echo   • Upload 'dist' to Vercel
    echo   • Copy 'dist' contents to web server
    echo.
    echo 🎉 Frontend ready for deployment!
) else (
    echo [ERROR] ❌ Build failed!
    echo Run 'deploy.bat' for detailed output
)

pause