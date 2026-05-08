# IKIGAI Collective - Component Examples & Code Snippets

## 1. Basic Button Component

```jsx
// src/components/common/Button.jsx
import React from 'react'
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-neon-cyan text-black hover:bg-neon-pink',
    secondary: 'border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10',
    ghost: 'text-white hover:text-neon-cyan',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        font-bold rounded transition-all
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
```

## 2. Product Card Component

```jsx
// src/components/product/ProductCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../hooks/useCart'
import Button from '../common/Button'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, { size: 'M', color: 'black' }, 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded bg-luxury-dark h-64 mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badge */}
          {product.isBestseller && (
            <div className="absolute top-4 right-4 bg-neon-pink text-white px-3 py-1 rounded-full text-xs font-bold">
              BESTSELLER
            </div>
          )}

          {/* Overlay */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center"
            >
              <Button onClick={handleAddToCart}>
                ADD TO CART
              </Button>
            </motion.div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-display font-bold text-lg">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm text-gray-400">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-white">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
```

## 3. Cart Item Component

```jsx
// src/components/cart/CartItem.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../../hooks/useCart'
import Button from '../common/Button'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleIncrease = () => {
    updateQuantity(item.id, item.variant, item.quantity + 1)
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.variant, item.quantity - 1)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id, item.variant)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex gap-4 p-4 bg-luxury-dark rounded border border-neon-cyan/20"
    >
      {/* Image */}
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-bold mb-2">{item.name}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {item.variant.size} / {item.variant.color}
        </p>

        {/* Quantity Control */}
        <div className="flex gap-2 items-center">
          <button
            onClick={handleDecrease}
            className="px-2 py-1 bg-luxury-gray rounded hover:bg-neon-cyan/20"
          >
            −
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 py-1 bg-luxury-gray rounded hover:bg-neon-cyan/20"
          >
            +
          </button>
        </div>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <div className="font-bold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-400 text-sm"
        >
          Remove
        </button>
      </div>
    </motion.div>
  )
}
```

## 4. Product Filter Sidebar

```jsx
// src/components/shop/FilterSidebar.jsx
import React, { useState } from 'react'
import { CATEGORIES, COLORS, PRICE_RANGES } from '../../utils/constants'

export default function FilterSidebar({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 500])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
    onFilterChange({
      category: selectedCategory === categoryId ? null : categoryId,
      color: selectedColor,
      price: priceRange,
    })
  }

  const handleColorChange = (colorId) => {
    setSelectedColor(selectedColor === colorId ? null : colorId)
    onFilterChange({
      category: selectedCategory,
      color: selectedColor === colorId ? null : colorId,
      price: priceRange,
    })
  }

  return (
    <div className="w-64 space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-lg mb-4">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => handleCategoryChange(cat.id)}
                className="w-4 h-4"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-bold text-lg mb-4">Colors</h3>
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorChange(color.id)}
              className={`w-8 h-8 rounded border-2 ${
                selectedColor === color.id
                  ? 'border-neon-cyan'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-4">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => {
              const newRange = [priceRange[0], parseInt(e.target.value)]
              setPriceRange(newRange)
              onFilterChange({
                category: selectedCategory,
                color: selectedColor,
                price: newRange,
              })
            }}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategory(null)
          setSelectedColor(null)
          setPriceRange([0, 500])
          onFilterChange({ category: null, color: null, price: [0, 500] })
        }}
        className="w-full py-2 border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan/10"
      >
        Reset Filters
      </button>
    </div>
  )
}
```

## 5. Login Form Component

```jsx
// src/components/auth/LoginForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginUser } from '../../services/authService'
import { validateEmail, validatePassword } from '../../utils/validators'
import Button from '../common/Button'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email) newErrors.email = 'Email required'
    else if (!validateEmail(email)) newErrors.email = 'Invalid email'

    if (!password) newErrors.password = 'Password required'
    else if (!validatePassword(password)) newErrors.password = 'Min 6 characters'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await loginUser(email, password)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
      setErrors({ form: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <h2 className="text-3xl font-display font-bold text-center mb-8">
        Welcome Back
      </h2>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-luxury-dark border border-neon-cyan/50 rounded focus:border-neon-cyan outline-none transition"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-luxury-dark border border-neon-cyan/50 rounded focus:border-neon-cyan outline-none transition"
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      {/* Register Link */}
      <p className="text-center text-gray-400">
        Don't have an account?{' '}
        <a href="/register" className="text-neon-cyan hover:text-neon-pink">
          Sign up
        </a>
      </p>
    </form>
  )
}
```

## 6. Navbar Component (Simplified)

```jsx
// src/components/common/Navbar.jsx (Simplified version)
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-neon-cyan/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-display font-bold gradient-text">
          IKIGAI
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          <li><Link to="/shop" className="hover:text-neon-cyan transition">Shop</Link></li>
          <li><Link to="/about" className="hover:text-neon-cyan transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-neon-cyan transition">Contact</Link></li>
        </ul>

        {/* Right Section */}
        <div className="flex gap-6 items-center">
          {/* Cart */}
          <Link to="/cart" className="relative">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-neon-pink text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex gap-4">
              <Link to="/profile" className="text-sm">Profile</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-sm bg-neon-cyan text-black px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-luxury-dark border-t border-neon-cyan/20 p-4 space-y-2"
        >
          <Link to="/shop" className="block py-2">Shop</Link>
          <Link to="/about" className="block py-2">About</Link>
          <Link to="/contact" className="block py-2">Contact</Link>
        </motion.div>
      )}
    </nav>
  )
}
```

## 7. Animation Patterns

```jsx
// Fade In Animation
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Slide Up Animation
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Hover Scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>

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

## 8. useProducts Hook Example

```jsx
// src/hooks/useProducts.js
import { useState, useEffect } from 'react'
import { getProducts, getProductById } from '../services/productService'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true)
      const data = await getProducts(filters)
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, fetchProducts }
}
```

---

**These examples show production-ready patterns you can copy and customize! 🚀**
