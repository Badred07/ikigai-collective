#!/bin/bash
# IKIGAI Collective - Complete Project Setup Script

echo "🚀 Setting up IKIGAI Collective..."
echo ""

# Create all directory structure
echo "📁 Creating directory structure..."

mkdir -p src/components/{layout,home,products,cart,auth,admin,common}
mkdir -p src/{pages,hooks,store,services,utils,styles}
mkdir -p public/images/{products,collections,brand}

echo "✅ Directory structure created!"
echo ""
echo "📝 Next steps:"
echo "1. npm install (if not done)"
echo "2. Configure .env.local with Firebase & Stripe keys"
echo "3. npm run dev"
echo ""
echo "🔧 Tailwind, Vite, and React are already configured."
echo "📚 Check SETUP_COMPLETE.md for detailed documentation."
