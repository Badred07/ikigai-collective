/**
 * IKIGAI Collective - Complete Component Library
 * This file documents all components with their implementations
 */

// ============================================================================
// COMMON COMPONENTS
// ============================================================================

// src/components/common/Navbar.jsx
export const NavbarCode = `
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="luxury-container flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-display font-bold gradient-text">
          IKIGAI
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          <li><Link to="/shop" className="hover:text-neon-cyan transition">Shop</Link></li>
          <li><Link to="/collections/anime" className="hover:text-neon-cyan transition">Collections</Link></li>
          <li><Link to="/about" className="hover:text-neon-cyan transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-neon-cyan transition">Contact</Link></li>
        </ul>

        {/* Right Actions */}
        <div className="flex gap-6 items-center">
          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:text-neon-cyan transition">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth Links */}
          {user ? (
            <div className="flex gap-4 items-center">
              <Link to="/profile" className="text-sm hover:text-neon-cyan">Profile</Link>
              <button onClick={logout} className="text-sm hover:text-neon-cyan">Logout</button>
              {user.role === 'admin' && <Link to="/admin" className="text-sm hover:text-neon-cyan">Admin</Link>}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-sm hover:text-neon-cyan">Login</Link>
              <Link to="/register" className="text-sm bg-neon-cyan text-black px-4 py-2 rounded hover:bg-neon-pink transition">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-luxury-dark border-t border-neon-cyan/20"
        >
          <ul className="flex flex-col gap-4 p-4">
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/collections/anime">Collections</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </motion.div>
      )}
    </nav>
  )
}
`

// src/components/common/Footer.jsx
export const FooterCode = `
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-luxury-dark border-t border-neon-cyan/20 mt-20">
      <div className="luxury-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-bold gradient-text mb-4">IKIGAI</h3>
            <p className="text-gray-400 text-sm">Luxury anime streetwear collective.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/collections/anime">Anime Collection</Link></li>
              <li><Link to="/collections/drops">Limited Drops</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Shipping Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-cyan/20 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 IKIGAI Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
`

// src/components/common/Hero.jsx
export const HeroCode = `
import React from 'react'
import { motion } from 'framer-motion'

export default function Hero({ title, subtitle, imageSrc, cta, ctaLink }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: \`url(\${imageSrc})\` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.a
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            href={ctaLink}
            className="inline-block px-8 py-4 bg-neon-cyan text-black font-bold rounded hover:bg-neon-pink transition"
          >
            {cta}
          </motion.a>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        ↓
      </motion.div>
    </motion.section>
  )
}
`

// src/components/common/LoadingSpinner.jsx
export const LoadingSpinnerCode = `
import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-luxury-black">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-16 h-16 border-4 border-neon-cyan border-t-neon-pink rounded-full"
      />
    </div>
  )
}
`

// ============================================================================
// CONTEXT PROVIDERS
// ============================================================================

// src/context/AuthContext.jsx
export const AuthContextCode = `
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName,
          avatar: currentUser.photoURL,
          role: 'customer', // Get from Firestore user doc
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
`

// src/context/CartContext.jsx
export const CartContextCode = `
import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ikigai_cart')
    if (saved) setCartItems(JSON.parse(saved))
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('ikigai_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, variant, quantity = 1) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && 
      item.variant.size === variant.size &&
      item.variant.color === variant.color
    )

    if (existingItem) {
      existingItem.quantity += quantity
      setCartItems([...cartItems])
    } else {
      setCartItems([...cartItems, { ...product, variant, quantity }])
    }
  }

  const removeFromCart = (productId, variant) => {
    setCartItems(cartItems.filter(
      item => !(item.id === productId && 
      item.variant.size === variant.size &&
      item.variant.color === variant.color)
    ))
  }

  const updateQuantity = (productId, variant, quantity) => {
    const item = cartItems.find(
      i => i.id === productId && 
      i.variant.size === variant.size &&
      i.variant.color === variant.color
    )
    if (item) item.quantity = quantity
    setCartItems([...cartItems])
  }

  const clearCart = () => setCartItems([])

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
    }}>
      {children}
    </CartContext.Provider>
  )
}
`

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

// src/hooks/useAuth.js
export const useAuthCode = `
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
`

// src/hooks/useCart.js
export const useCartCode = `
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
`

// ============================================================================
// FIREBASE SERVICES
// ============================================================================

// src/services/authService.js
export const authServiceCode = `
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth'
import { auth, db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const loginUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const registerUser = async (email, password, name) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName: name })
    
    // Create user doc in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      email,
      name,
      role: 'customer',
      createdAt: new Date(),
    })

    return result.user
  } catch (error) {
    throw new Error(error.message)
  }
}
`

// src/services/productService.js
export const productServiceCode = `
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

export const getProducts = async (filters = {}) => {
  try {
    let q = collection(db, 'products')
    const docs = await getDocs(q)
    let products = docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    if (filters.category) {
      products = products.filter(p => p.category === filters.category)
    }
    if (filters.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice)
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice)
    }

    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)
    return { id: docSnap.id, ...docSnap.data() }
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const getFeaturedProducts = async () => {
  try {
    const q = query(collection(db, 'products'), where('isFeatured', '==', true))
    const docs = await getDocs(q)
    return docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }
}
`

// src/services/stripeService.js
export const stripeServiceCode = `
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export const processPayment = async (token, amount, orderDetails) => {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        orderDetails,
      }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Payment error:', error)
    throw error
  }
}

export const getStripe = () => stripePromise
`

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockProductsData = `
export const MOCK_PRODUCTS = [
  {
    id: 'prod_001',
    name: 'Cyber Samurai Oversized Tee',
    description: 'Premium oversized t-shirt with anime-inspired cyberpunk graphic',
    price: 89.99,
    originalPrice: 129.99,
    category: 't-shirts',
    collection: 'cyber-samurai',
    images: [
      '/images/cyber-samurai-1.jpg',
      '/images/cyber-samurai-2.jpg',
      '/images/cyber-samurai-3.jpg',
    ],
    variants: [
      { size: 'XS', color: 'black', stock: 50 },
      { size: 'S', color: 'black', stock: 45 },
      { size: 'M', color: 'black', stock: 60 },
      { size: 'L', color: 'black', stock: 55 },
      { size: 'XL', color: 'black', stock: 40 },
      { size: 'M', color: 'white', stock: 30 },
      { size: 'L', color: 'white', stock: 25 },
    ],
    tags: ['anime', 'oversized', 'premium', 'cyberpunk'],
    rating: 4.8,
    reviews: 125,
    isFeatured: true,
    isBestseller: true,
    description_long: 'Experience luxury streetwear fusion with our signature Cyber Samurai collection. This premium oversized t-shirt features hand-designed anime-inspired graphics with cyberpunk elements. Made from 100% premium cotton for ultimate comfort and durability.',
    specifications: {
      material: '100% Premium Cotton',
      weight: '200gsm',
      fit: 'Oversized',
      care: 'Machine wash cold, gentle cycle',
    },
  },
  // ... more products
]
`

// ============================================================================
// UTILITIES
// ============================================================================

// src/utils/formatters.js
export const formattersCode = `
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}
`

// src/utils/validators.js
export const validatorsCode = `
export const validateEmail = (email) => {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateZipCode = (zip) => {
  const re = /^\\d{5}(-\\d{4})?$/
  return re.test(zip)
}
`

// ============================================================================
// CONSTANTS
// ============================================================================

export const constantsCode = `
export const CATEGORIES = [
  { id: 't-shirts', name: 'T-Shirts' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'pants', name: 'Pants' },
  { id: 'accessories', name: 'Accessories' },
]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const COLORS = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'gray', name: 'Gray', hex: '#808080' },
  { id: 'silver', name: 'Silver', hex: '#C0C0C0' },
]

export const COLLECTIONS = [
  { id: 'cyber-samurai', name: 'Cyber Samurai' },
  { id: 'neon-dreams', name: 'Neon Dreams' },
  { id: 'tokyo-nights', name: 'Tokyo Nights' },
  { id: 'limited-drops', name: 'Limited Drops' },
]

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}
`

export default {
  NavbarCode,
  FooterCode,
  HeroCode,
  LoadingSpinnerCode,
  AuthContextCode,
  CartContextCode,
  useAuthCode,
  useCartCode,
  authServiceCode,
  productServiceCode,
  stripeServiceCode,
  mockProductsData,
  formattersCode,
  validatorsCode,
  constantsCode,
}
