@echo off
REM ===========================================
REM EV Charging Station - Frontend Deployment Script (Windows)
REM ===========================================

echo 🚀 Starting EV Charging Station Frontend Deployment...
echo Backend URL: https://evc-backend-tciv.vercel.app/
echo.

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] .env file not found!
    echo [INFO] Creating .env from template...
    copy env.example .env
    echo [WARNING] Please update .env file with your production values before deploying!
    echo.
    echo Required updates in .env:
    echo - VITE_API_URL=https://your-backend-domain.com/api
    echo - VITE_FRONTEND_URL=https://your-frontend-domain.com
    echo - VITE_GOOGLE_CLIENT_ID=your_google_client_id
    echo.
    pause
)

REM Validate environment variables
echo [INFO] Validating environment configuration...

findstr /C:"VITE_API_URL=" .env >nul
if errorlevel 1 (
    echo [ERROR] VITE_API_URL not found in .env file
    pause
    exit /b 1
)

findstr /C:"VITE_FRONTEND_URL=" .env >nul
if errorlevel 1 (
    echo [ERROR] VITE_FRONTEND_URL not found in .env file
    pause
    exit /b 1
)

echo [SUCCESS] Environment configuration validated
echo.

REM Check Node.js version
echo [INFO] Checking Node.js version...
node --version
echo.

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

REM Run linting
echo [INFO] Running code linting...
call npm run lint
if errorlevel 1 (
    echo [WARNING] Linting issues found, but continuing...
)

REM Clean previous build
echo [INFO] Cleaning previous build...
call npm run clean

REM Build for production
echo [INFO] Building for production...
call npm run build:prod
if errorlevel 1 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

REM Check if build was successful
if not exist "dist" (
    echo [ERROR] Build failed! dist directory not found.
    pause
    exit /b 1
)

echo [SUCCESS] Build completed successfully!
echo.

REM Display build information
echo [INFO] Build information:
echo   📁 Output directory: dist/
echo   📊 Build contents:
dir dist /s
echo.

REM Ask user if they want to preview
set /p preview="Do you want to preview the build locally? (y/n): "
if /i "%preview%"=="y" (
    echo [INFO] Starting preview server on http://localhost:4173
    echo [WARNING] Press Ctrl+C to stop the preview server
    call npm run preview:prod
)

echo.
echo [SUCCESS] Deployment preparation completed!
echo.
echo 📦 Your build is ready in the 'dist/' folder
echo.
echo 🚀 Deployment options:
echo   1. Static hosting (Netlify, Vercel): Upload 'dist' folder
echo   2. Web server: Copy 'dist' contents to web root
echo   3. Docker: Use provided Dockerfile
echo.
echo 📚 For detailed deployment instructions, see DEPLOYMENT_GUIDE.md
echo.
echo [SUCCESS] 🎉 Frontend deployment preparation complete!
pause