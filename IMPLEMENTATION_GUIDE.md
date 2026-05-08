# IKIGAI Collective - Complete Implementation Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
cp .env.example .env.local
# Add your Firebase and Stripe credentials

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **State Management**: Context API + custom hooks
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: Stripe
- **Routing**: React Router DOM

### Directory Structure Explanation

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Navbar, Footer, Hero, Modals
│   ├── home/           # Homepage specific components
│   ├── shop/           # Shop page components
│   ├── product/        # Product page components
│   ├── cart/           # Cart & checkout components
│   ├── auth/           # Auth forms & guards
│   ├── admin/          # Admin dashboard components
│   └── checkout/       # Stripe checkout flow
├── pages/              # Page components (route level)
├── services/           # API & Firebase services
├── hooks/              # Custom React hooks
├── context/            # React Context providers
├── config/             # Configuration files
├── utils/              # Helper functions
└── styles/             # Global CSS

```

## Core Concepts

### Authentication Flow
1. User lands on site
2. Can browse public pages (Home, Shop, Collections)
3. Clicks "Sign Up" → RegisterPage with form validation
4. Firebase creates auth account + Firestore user doc
5. User logged in, can add to cart
6. Checkout requires user to be authenticated
7. Admin dashboard checks role === 'admin'

### E-commerce Flow
1. **Browse**: User browses products on ShopPage
2. **Filter**: Apply filters (category, price, size)
3. **Add to Cart**: Click "Add to Cart" → CartContext updates
4. **Cart Review**: CartPage shows all items with animations
5. **Checkout**: Proceed to CheckoutPage
6. **Shipping**: Enter shipping address
7. **Payment**: Stripe payment form
8. **Confirmation**: Order created in Firestore, user sees order details

### Admin Flow
1. Admin visits `/admin` route
2. AuthGuard checks `user.role === 'admin'`
3. Dashboard displays 4 main sections:
   - Product Management (CRUD)
   - Order Management (view, update status)
   - User Management (view, manage roles)
   - Analytics (revenue, orders, customers)

## Component Implementation Examples

### Example 1: Basic Component Structure

```jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'

export default function MyComponent() {
  const [data, setData] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    // Fetch data on mount
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Component JSX */}
    </motion.div>
  )
}
```

### Example 2: Form with Validation

```jsx
import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../../utils/validators'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!validateEmail(email)) newErrors.email = 'Invalid email'
    if (!validatePassword(password)) newErrors.password = 'Min 6 characters'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      // Login logic
      toast.success('Logged in successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 bg-luxury-dark border border-neon-cyan/50 rounded"
        placeholder="Email"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-neon-cyan text-black font-bold rounded hover:bg-neon-pink transition"
      >
        Login
      </button>
    </form>
  )
}
```

### Example 3: Product Listing with Filters

```jsx
import React, { useState, useEffect } from 'react'
import { getProducts } from '../../services/productService'
import ProductCard from '../../components/product/ProductCard'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    category: null,
    minPrice: 0,
    maxPrice: 500,
  })

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts(filters)
      setProducts(data)
    }
    loadProducts()
  }, [filters])

  return (
    <div className="flex gap-8">
      {/* Filters */}
      <aside className="w-64">
        {/* Category filter */}
        {/* Price range filter */}
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

## Firebase Firestore Schema

### Collections Structure

**`/products`**
```
{
  id: "prod_001"
  name: "Cyber Samurai Oversized Tee"
  price: 89.99
  category: "t-shirts"
  collection: "cyber-samurai"
  variants: [
    { size: "M", color: "black", stock: 50 }
  ]
  images: ["url1", "url2"]
  tags: ["anime", "oversized"]
  rating: 4.8
  reviews: 125
  isFeatured: true
  createdAt: timestamp
}
```

**`/users`**
```
{
  email: "user@example.com"
  name: "John Doe"
  role: "customer" | "admin"
  preferences: { newsletter: true }
  createdAt: timestamp
}
```

**`/orders`**
```
{
  userId: "user_123"
  items: [
    { productId: "prod_001", variant: {size: "M"}, quantity: 2, price: 89.99 }
  ]
  total: 179.98
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: { street, city, state, zip }
  createdAt: timestamp
  trackingNumber: "1Z123456"
}
```

**`/reviews`**
```
{
  productId: "prod_001"
  userId: "user_123"
  rating: 5
  title: "Amazing quality!"
  content: "Best anime tee I've bought"
  verified: true
  createdAt: timestamp
}
```

## Styling Guidelines

### Color Palette
```css
/* Base */
Background: #0a0a0a (luxury-black)
Surface: #1a1a1a (luxury-dark)
Tertiary: #2a2a2a (luxury-gray)
Text: #ffffff

/* Accent Colors */
Cyan: #00f0ff (neon-cyan)
Pink: #ff006e (neon-pink)
Purple: #b537f2 (neon-purple)
```

### Custom CSS Classes
```css
.glass-effect          /* Glassmorphism effect */
.gradient-text         /* Cyan to purple gradient text */
.neon-border          /* Cyan border with glow */
.luxury-shadow        /* Deep shadow */
.grid-responsive      /* Responsive grid layout */
```

### Common Tailwind Patterns
```jsx
// Hero Section
<section className="h-screen flex items-center justify-center bg-gradient-luxury">

// Card with Glass Effect
<div className="glass-effect rounded-lg p-6 backdrop-blur">

// Button
<button className="px-6 py-3 bg-neon-cyan text-black rounded font-bold hover:bg-neon-pink transition">

// Badge
<span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan rounded-full text-sm">
```

## Animation Patterns

### Using Framer Motion

```jsx
// Fade In
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

// Slide Up
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>

// Scale
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>

// Stagger Children
<motion.div>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

## API Endpoints (Backend)

If you extend this with a backend, here are typical endpoints:

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/products
GET    /api/products/:id
GET    /api/products/search
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id
<!-- PaymentIntent endpoint removed: project uses Cash on Delivery (COD) by default -->
POST   /api/reviews
DELETE /api/admin/products/:id
```

## Performance Optimization

### Code Splitting
```jsx
const LazyPage = lazy(() => import('./pages/ProductPage'))

<Suspense fallback={<LoadingSpinner />}>
  <LazyPage />
</Suspense>
```

### Image Optimization
```jsx
<img src="/images/product.jpg" alt="Product" loading="lazy" />
```

### Memoization
```jsx
import { memo } from 'react'

const ProductCard = memo(({ product }) => (
  // Component
))
```

## Testing Strategy

### Unit Tests (Vitest)
- Test utilities (formatters, validators)
- Test hooks (useAuth, useCart)
- Test service functions

### Component Tests (React Testing Library)
- Test component rendering
- Test user interactions
- Test error states

### E2E Tests (Playwright/Cypress)
- Test complete user flows
- Test checkout process
- Test admin functions

## Deployment

### Build Optimization
```bash
npm run build  # Creates optimized production build
```

### Vercel Deployment
```bash
vercel deploy --prod
```

### Netlify Deployment
```bash
netlify deploy --prod --dir=dist
```

### Firebase Hosting
```bash
firebase deploy --only hosting
```

## Environment Variables

```env
# Firebase
VITE_FIREBASE_API_KEY=sk_...
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456
VITE_FIREBASE_APP_ID=1:123456:web:abc

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# App
VITE_ADMIN_EMAIL=admin@ikigai.com
```

## Common Issues & Solutions

### Issue: Cart not persisting
**Solution**: Check localStorage is enabled, useEffect dependency array

### Issue: Firebase not initializing
**Solution**: Verify .env variables, check Firebase project settings

### Issue: Images not loading
**Solution**: Check Firebase Storage rules, verify image URLs

### Issue: Stripe errors
**Solution**: Verify public key, check test mode enabled

## Next Steps

1. Setup Firebase project and credentials
2. Install dependencies: `npm install`
3. Create `.env.local` with your credentials
4. Build out individual components following examples
5. Implement each page with component composition
6. Test authentication flow
7. Test checkout with Stripe test cards
8. Deploy to Vercel/Netlify

## Resources

- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

---

**Happy building! 🚀**
