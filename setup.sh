#!/bin/bash

# IKIGAI Collective - Project Setup Script
# Creates complete project structure and all necessary files

set -e

echo "🚀 IKIGAI Collective - Setting up project..."

# Create directory structure
echo "📁 Creating directory structure..."

mkdir -p src/{components/{common,home,shop,cart,auth,admin,product,checkout},pages,services,hooks,context,utils,config,styles,assets/{images,icons}}
mkdir -p public

echo "✅ Directories created"

# The individual component and page files will be created by the development team
# This structure provides the foundation for the IKIGAI Collective platform

echo "📦 Installing dependencies..."
npm install

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env.local and add your Firebase credentials (payment: Cash on Delivery)"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "Happy coding! 🎨"
