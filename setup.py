#!/usr/bin/env python3
"""
IKIGAI Collective - Project Setup Script
This script creates the complete project structure and files
"""

import os
import sys
from pathlib import Path

# Base project directory
BASE_DIR = Path(__file__).parent

# Define all directories to create
DIRECTORIES = [
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
]

# All source files with their content
SOURCE_FILES = {
    'src/index.css': '''/* IKIGAI Collective - Global Styles */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  line-height: 1.6;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.gradient-primary {
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
}

.gradient-secondary {
  background: linear-gradient(135deg, #ff006e 0%, #ff6b00 100%);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.6); }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out;
}

.text-gradient {
  background: linear-gradient(135deg, #00d4ff 0%, #0099ff 50%, #ff006e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn-premium {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 212, 255, 0.3);
}

.card-luxury {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.card-luxury:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1);
  transform: translateY(-4px);
}

.loading-spinner {
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #00d4ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  body { font-size: 14px; }
}
''',

    'src/utils/constants.js': '''export const BRAND = {
  name: 'IKIGAI Collective',
  tagline: 'Luxury Anime Streetwear',
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
  WISHLIST: '/wishlist',
};

export const CATEGORIES = ['Oversized T-Shirts', 'Hoodies', 'Limited Drops', 'Jackets', 'Accessories'];
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const TAX_RATE = 0.08;
export const MIN_ORDER_FOR_FREE_SHIPPING = 100;
''',

    'src/utils/formatters.js': '''export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date));

export const truncate = (text, length) =>
  text.length > length ? text.substring(0, length) + '...' : text;

export const slugify = (text) =>
  text.toString().toLowerCase().trim().replace(/\\s+/g, '-').replace(/[^\\w\\-]+/g, '');
''',

    'src/store/cartStore.js': '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => set((state) => {
        const existing = state.items.find(item => item.id === product.id && item.variant === product.variant);
        return {
          items: existing
            ? state.items.map(item => item.id === product.id && item.variant === product.variant
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item)
            : [...state.items, { ...product, quantity: product.quantity || 1 }],
        };
      }),
      removeItem: (productId, variant) => set((state) => ({
        items: state.items.filter(item => !(item.id === productId && item.variant === variant)),
      })),
      updateQuantity: (productId, variant, quantity) => set((state) => ({
        items: state.items.map(item => item.id === productId && item.variant === variant
          ? { ...item, quantity: Math.max(0, quantity) }
          : item).filter(item => item.quantity > 0),
      })),
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    { name: 'ikigai-cart' }
  )
);
''',

    'src/store/authStore.js': '''import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
''',

    'src/store/wishlistStore.js': '''import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => set((state) => ({
        items: state.items.includes(productId) ? state.items : [...state.items, productId],
      })),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(id => id !== productId),
      })),
      toggleItem: (productId) => set((state) => ({
        items: state.items.includes(productId)
          ? state.items.filter(id => id !== productId)
          : [...state.items, productId],
      })),
      isWishlisted: (productId) => get().items.includes(productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'ikigai-wishlist' }
  )
);
''',

    'src/services/firebase.js': '''import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
''',

    'src/services/auth.js': '''import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const registerUser = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName });
  await setDoc(doc(db, 'users', user.uid), {
    email, displayName, createdAt: new Date().toISOString(), role: 'user', wishlist: [],
  });
  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};
''',

    'src/services/payment.js': '''export const createOrderCOD = async (orderData) => {
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order: orderData, paymentMethod: 'cod' }),
  });
  return response.json();
};

export const getPaymentMethods = () => [{ id: 'cod', label: 'Cash on Delivery' }];
''',

    'src/hooks/useAuth.js': '''import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, setUser, setLoading: setAuthLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser]);

  return { user, isAuthenticated, loading };
};
''',

    'src/hooks/useCart.js': '''import { useCartStore } from '@/store/cartStore';

export const useCart = () => {
  const { items, addItem, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total: getTotal(),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};
''',

    'src/hooks/useWishlist.js': '''import { useWishlistStore } from '@/store/wishlistStore';

export const useWishlist = () => {
  const { items, addItem, removeItem, toggleItem, isWishlisted } = useWishlistStore();
  return { items, addItem, removeItem, toggleItem, isWishlisted, count: items.length };
};
''',

    'src/main.jsx': '''import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
''',
}

def create_directories():
    """Create all required directories"""
    print("📁 Creating directory structure...")
    for directory in DIRECTORIES:
        path = BASE_DIR / directory
        path.mkdir(parents=True, exist_ok=True)
        print(f"  ✅ {directory}")

def create_files():
    """Create all source files"""
    print("\n📝 Creating source files...")
    for file_path, content in SOURCE_FILES.items():
        full_path = BASE_DIR / file_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ {file_path}")

def main():
    """Main setup function"""
    print("=" * 60)
    print("🚀 IKIGAI Collective - Project Setup")
    print("=" * 60)
    print()
    
    try:
        create_directories()
        create_files()
        
        print("\n" + "=" * 60)
        print("✨ Project setup completed successfully!")
        print("=" * 60)
        print("\n📚 Next steps:")
        print("  1. npm install")
        print("  2. Configure .env.local with Firebase & Stripe keys")
        print("  3. npm run dev")
        print("\n📖 For detailed documentation, see SETUP_COMPLETE.md")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error during setup: {e}", file=sys.stderr)
        return 1
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
