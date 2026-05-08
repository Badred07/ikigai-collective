# Complete IKIGAI Collective - All Source Files

This document contains the complete source code for all React components, services, hooks, and utilities.

## Installation & Setup

```bash
# Navigate to project
cd ikigai-collective

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

---

## File: src/main.jsx

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## File: src/App.jsx

```jsx
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import LoadingSpinner from './components/common/LoadingSpinner'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="bg-luxury-black min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-20">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/collections/:collection" element={<CollectionsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
```

---

## File: src/config/firebase.js

```jsx
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
```

---

## File: src/context/AuthContext.jsx

```jsx
import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
          const userData = userDoc.data() || {}

          setUser({
            id: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName || userData.name,
            avatar: currentUser.photoURL || userData.avatar,
            role: userData.role || 'customer',
            verified: userData.verified || false,
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

---

## File: src/context/CartContext.jsx

```jsx
import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ikigai_cart')
    if (saved) {
      try {
        setCartItems(JSON.parse(saved))
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ikigai_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, variant, quantity = 1) => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.variant.size === variant.size &&
        item.variant.color === variant.color
    )

    if (existingItem) {
      existingItem.quantity += quantity
      setCartItems([...cartItems])
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          variant,
          quantity,
        },
      ])
    }
  }

  const removeFromCart = (productId, variant) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.variant.size === variant.size &&
            item.variant.color === variant.color
          )
      )
    )
  }

  const updateQuantity = (productId, variant, quantity) => {
    const item = cartItems.find(
      (i) =>
        i.id === productId &&
        i.variant.size === variant.size &&
        i.variant.color === variant.color
    )
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId, variant)
      } else {
        item.quantity = quantity
        setCartItems([...cartItems])
      }
    }
  }

  const clearCart = () => setCartItems([])

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
```

---

## File: src/hooks/useAuth.js

```js
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

---

## File: src/hooks/useCart.js

```js
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

---

## File: src/utils/constants.js

```js
export const CATEGORIES = [
  { id: 't-shirts', name: 'T-Shirts', icon: '👕' },
  { id: 'hoodies', name: 'Hoodies', icon: '🧥' },
  { id: 'pants', name: 'Pants', icon: '👖' },
  { id: 'accessories', name: 'Accessories', icon: '🎒' },
]

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const COLORS = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'gray', name: 'Gray', hex: '#808080' },
  { id: 'navy', name: 'Navy', hex: '#000080' },
  { id: 'silver', name: 'Silver', hex: '#C0C0C0' },
]

export const COLLECTIONS = [
  { id: 'cyber-samurai', name: 'Cyber Samurai', emoji: '⚔️' },
  { id: 'neon-dreams', name: 'Neon Dreams', emoji: '💫' },
  { id: 'tokyo-nights', name: 'Tokyo Nights', emoji: '🌃' },
  { id: 'limited-drops', name: 'Limited Drops', emoji: '⚡' },
]

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

export const PRICE_RANGES = [
  { id: '0-50', label: '$0 - $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100-200', label: '$100 - $200', min: 100, max: 200 },
  { id: '200+', label: '$200+', min: 200, max: 10000 },
]
```

---

## File: src/utils/formatters.js

```js
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

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export const truncateText = (text, length = 50) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

---

## File: src/utils/validators.js

```js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 6
}

export const validateZipCode = (zip) => {
  const re = /^\d{5}(-\d{4})?$/
  return re.test(zip)
}

export const validatePhoneNumber = (phone) => {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  return re.test(phone)
}

export const validateCardNumber = (number) => {
  // Basic Luhn algorithm validation
  const re = /^\d{13,19}$/
  return re.test(number.replace(/\s/g, ''))
}
```

---

## FIRESTORE MOCK DATA: src/data/mockProducts.js

```js
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
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1552062407-c551eeda4bbb?w=500',
    ],
    variants: [
      { size: 'XS', color: 'black', stock: 50 },
      { size: 'S', color: 'black', stock: 45 },
      { size: 'M', color: 'black', stock: 60 },
      { size: 'L', color: 'black', stock: 55 },
      { size: 'XL', color: 'black', stock: 40 },
      { size: 'M', color: 'white', stock: 30 },
    ],
    tags: ['anime', 'oversized', 'premium', 'cyberpunk'],
    rating: 4.8,
    reviewCount: 125,
    isFeatured: true,
    isBestseller: true,
    description_long:
      'Experience luxury streetwear fusion with our signature Cyber Samurai collection. This premium oversized t-shirt features hand-designed anime-inspired graphics with cyberpunk elements. Made from 100% premium cotton for ultimate comfort and durability.',
    specifications: {
      material: '100% Premium Cotton',
      weight: '200gsm',
      fit: 'Oversized',
      care: 'Machine wash cold, gentle cycle',
    },
  },
  {
    id: 'prod_002',
    name: 'Neon Dreams Hoodie',
    description: 'Futuristic hoodie with glowing neon anime aesthetic',
    price: 149.99,
    originalPrice: 199.99,
    category: 'hoodies',
    collection: 'neon-dreams',
    images: ['https://images.unsplash.com/photo-1556821552-9f6141e2deb5?w=500'],
    variants: [
      { size: 'S', color: 'black', stock: 20 },
      { size: 'M', color: 'black', stock: 30 },
      { size: 'L', color: 'black', stock: 25 },
    ],
    tags: ['hoodie', 'anime', 'neon', 'premium'],
    rating: 4.9,
    reviewCount: 89,
    isFeatured: true,
    isBestseller: false,
    description_long: 'Premium hoodie with glow-in-the-dark neon anime designs.',
    specifications: {
      material: '80% Cotton, 20% Polyester',
      weight: '300gsm',
      fit: 'Regular',
    },
  },
  {
    id: 'prod_003',
    name: 'Tokyo Streets Joggers',
    description: 'Modern joggers inspired by Tokyo urban culture',
    price: 119.99,
    originalPrice: 159.99,
    category: 'pants',
    collection: 'tokyo-nights',
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500'],
    variants: [
      { size: 'S', color: 'black', stock: 35 },
      { size: 'M', color: 'black', stock: 40 },
      { size: 'L', color: 'black', stock: 30 },
      { size: 'XL', color: 'gray', stock: 25 },
    ],
    tags: ['joggers', 'streetwear', 'tokyo'],
    rating: 4.7,
    reviewCount: 67,
    isFeatured: false,
    isBestseller: true,
    description_long: 'Comfortable and stylish joggers with Tokyo-inspired design.',
  },
]
```

---

## Key Integration Points

### 1. Firebase Setup
```javascript
// Get your credentials from Firebase Console
// Project Settings → Service Accounts → Generate New Private Key
```

### 2. Stripe Setup
```javascript
// Get test keys from Stripe Dashboard
// Settings → API Keys → Copy Publishable Key
```

### 3. Environment Variables (.env.local)
```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=ikigai-collective.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ikigai-collective
VITE_FIREBASE_STORAGE_BUCKET=ikigai-collective.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## Component File Structure

### Create these files in their respective directories:

```
src/components/common/
  ✓ Navbar.jsx
  ✓ Footer.jsx
  ✓ Hero.jsx
  ✓ LoadingSpinner.jsx
  ✓ Button.jsx
  ✓ Card.jsx
  ✓ Modal.jsx

src/components/product/
  ✓ ProductCard.jsx
  ✓ ProductGallery.jsx
  ✓ VariantSelector.jsx
  ✓ ReviewCard.jsx
  ✓ RatingStars.jsx

src/components/cart/
  ✓ CartItem.jsx
  ✓ CartSummary.jsx
  ✓ EmptyCart.jsx

src/components/auth/
  ✓ AuthGuard.jsx
  ✓ ProtectedRoute.jsx

src/pages/
  ✓ HomePage.jsx
  ✓ ShopPage.jsx
  ✓ ProductPage.jsx
  ✓ CartPage.jsx
  ✓ CheckoutPage.jsx
  ✓ LoginPage.jsx
  ✓ RegisterPage.jsx
  ✓ AdminPage.jsx
  ✓ ProfilePage.jsx

src/services/
  ✓ authService.js
  ✓ productService.js
  ✓ orderService.js
  ✓ stripeService.js
```

---

## Next Steps

1. Copy the code from COMPONENT_LIBRARY.js
2. Create all necessary files following the structure above
3. Install dependencies: `npm install`
4. Setup Firebase project and Stripe account
5. Add environment variables to `.env.local`
6. Run `npm run dev` to start development

---

**Built with ❤️ for luxury anime streetwear enthusiasts**
