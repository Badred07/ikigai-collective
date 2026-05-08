#!/usr/bin/env node

/**
 * IKIGAI Collective - Complete Project Generator
 * This script creates all necessary project files and structure
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = 'src';
const FILES = {
  // Utils
  'src/utils/constants.js': `export const BRAND = {
  name: 'IKIGAI Collective',
  tagline: 'Luxury Anime Streetwear',
  description: 'World-class luxury anime streetwear fusion',
  year: new Date().getFullYear(),
};

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT_DETAIL: '/product/:id',
  COLLECTIONS: '/collections',
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
  WISHLIST: '/wishlist',
};

export const CATEGORIES = [
  'Oversized T-Shirts',
  'Hoodies',
  'Limited Drops',
  'Jackets',
  'Accessories',
  'Collaborations',
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Top Rated', value: 'rated' },
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const SHIPPING_METHODS = [
  { id: 'standard', label: 'Standard (5-7 days)', price: 10 },
  { id: 'express', label: 'Express (2-3 days)', price: 25 },
  { id: 'overnight', label: 'Overnight', price: 50 },
];

export const TAX_RATE = 0.08;
export const MIN_ORDER_FOR_FREE_SHIPPING = 100;

export const SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://instagram.com/ikigai-collective' },
  { platform: 'Twitter', url: 'https://twitter.com/ikigai-collective' },
  { platform: 'TikTok', url: 'https://tiktok.com/@ikigai-collective' },
  { platform: 'Discord', url: 'https://discord.gg/ikigai' },
];
`,

  'src/utils/formatters.js': `export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-');
};
`,

  'src/utils/validators.js': `export const validateEmail = (email) => {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\\s.\\-]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/;
  return regex.test(phone);
};
`,
};

// Create directories
const dirs = [
  'src/components/layout',
  'src/components/home',
  'src/components/products',
  'src/components/cart',
  'src/components/auth',
  'src/components/admin',
  'src/components/common',
  'src/pages',
  'src/hooks',
  'src/store',
  'src/services',
  'src/utils',
  'src/styles',
  'public/images/products',
  'public/images/collections',
  'public/images/brand',
];

console.log('📁 Creating directory structure...');
dirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  ✅ ${dir}`);
  }
});

console.log('\\n📝 Creating source files...');
Object.entries(FILES).forEach(([filePath, content]) => {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`  ✅ ${filePath}`);
  }
});

console.log('\\n✨ Project structure created successfully!');
console.log('\\n📚 Next steps:');
console.log('  1. npm install');
  console.log('  2. Configure .env.local with Firebase keys (payment: Cash on Delivery)');
console.log('  3. npm run dev');
