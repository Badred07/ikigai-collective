@echo off
REM IKIGAI Collective - Complete Project Setup
REM This script creates all necessary directories

setlocal enabledelayedexpansion

cd /d C:\Users\Badred\python

echo Creating directory structure for IKIGAI Collective...
echo.

REM Components
mkdir src\components\layout
mkdir src\components\home
mkdir src\components\products
mkdir src\components\cart
mkdir src\components\auth
mkdir src\components\admin
mkdir src\components\common

REM Core directories
mkdir src\pages
mkdir src\hooks
mkdir src\store
mkdir src\services
mkdir src\utils
mkdir src\styles

REM Public directories
mkdir public\images\products
mkdir public\images\collections
mkdir public\images\brand

echo ✅ All directories created successfully!
echo.
echo Project Structure:
echo.
dir /s /b src > NUL && echo src/ - React components and pages
dir /s /b public > NUL && echo public/ - Static assets

echo.
echo Next steps:
echo 1. npm install (to install all dependencies)
echo 2. Configure .env.local with Firebase and Stripe keys
echo 3. npm run dev (to start development server)
echo.
echo For detailed information, see SETUP_COMPLETE.md
echo.
pause
