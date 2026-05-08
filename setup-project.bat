@echo off
REM IKIGAI Collective - Complete Project Setup
REM This script creates all necessary directories and copies/creates files

echo Creating directory structure...

REM Create all directories
mkdir src\components\layout
mkdir src\components\home
mkdir src\components\products
mkdir src\components\cart
mkdir src\components\auth
mkdir src\components\admin
mkdir src\components\common
mkdir src\pages
mkdir src\hooks
mkdir src\store
mkdir src\services
mkdir src\utils
mkdir src\styles
mkdir public\images
mkdir public\images\products
mkdir public\images\collections
mkdir public\images\brand

echo Directories created successfully!
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Copy .env.example to .env.local
echo 3. Add Firebase credentials (Stripe optional)
echo 4. Run: npm run dev
echo.
echo All source files will be generated as separate files.
