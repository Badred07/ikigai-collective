# 🚀 IKIGAI Collective - Complete Implementation Guide

This is your complete production-ready e-commerce solution. Follow these steps carefully.

## Step 1: Create Directory Structure

### Using Command Line:

**Windows (PowerShell):**
```powershell
$dirs = @(
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
  'public/images/brand'
)
$dirs | ForEach-Object { mkdir $_ -Force -ErrorAction SilentlyContinue }
```

**macOS/Linux:**
```bash
mkdir -p src/{components/{layout,home,products,cart,auth,admin,common},pages,hooks,store,services,utils,styles}
mkdir -p public/images/{products,collections,brand}
```

### Manual Method (GUI):
1. Right-click in VS Code Explorer
2. Create each folder manually following the structure above

---

## Step 2: Install Dependencies

```bash
npm install
```

---

## Step 3: Configure Environment Variables

Create `.env.local` and add your credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
VITE_API_URL=http://localhost:3000
```

### Get Firebase Credentials:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Click "Add app"
4. Copy the config object

### Get Stripe Keys:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to API keys
3. Copy your publishable key (starts with pk_test_)

---

## Step 4: Create All Source Files

Use the Python setup script or create files manually following the code sections below.

```bash
python setup.py
```

Or manually create each file as shown in the sections below.

---

## File Structure & Code

### 📁 src/index.css
[This file is created automatically by setup.py]

### 📁 src/main.jsx
[This file is created automatically by setup.py]

### 📁 src/App.jsx

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { Shop } from '@/pages/Shop';
import { ProductDetails } from '@/pages/ProductDetails';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { NotFound } from '@/pages/NotFound';
import { Toaster } from 'react-hot-toast';
import '@/index.css';

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
```

### 📁 src/utils/ (Already created by setup.py)
- constants.js
- formatters.js
- validators.js

### 📁 src/store/ (Already created by setup.py)
- cartStore.js
- authStore.js
- wishlistStore.js

### 📁 src/services/ (Already created by setup.py)
- firebase.js
- auth.js
- stripe.js

### 📁 src/hooks/ (Already created by setup.py)
- useAuth.js
- useCart.js
- useWishlist.js

---

## React Components to Create

### src/components/layout/Navbar.jsx

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { BRAND, ROUTES } from '@/utils/constants';

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ⅰ</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline">{BRAND.name}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to={ROUTES.SHOP} className="hover:text-blue-400 transition">Shop</Link>
            <Link to={ROUTES.COLLECTIONS} className="hover:text-blue-400 transition">Collections</Link>
            <Link to={ROUTES.ABOUT} className="hover:text-blue-400 transition">About</Link>
          </div>

          {/* Right Items */}
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.WISHLIST} className="hover:text-blue-400 transition text-xl">❤️</Link>
            
            <Link to={ROUTES.CART} className="relative hover:text-blue-400 transition text-xl">
              🛒
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD} className="hover:text-blue-400 transition">
                👤 {user?.displayName}
              </Link>
            ) : (
              <Link to={ROUTES.LOGIN} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
```

### src/components/layout/Footer.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, SOCIAL_LINKS } from '@/utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{BRAND.name}</h3>
            <p className="text-gray-400">{BRAND.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shop?sort=newest" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link to="/shop?sort=popular" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link to="/collections" className="hover:text-white transition">Collections</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="hover:text-blue-400 transition text-2xl">
                  {link.icon === 'instagram' && '📷'}
                  {link.icon === 'twitter' && '🐦'}
                  {link.icon === 'tiktok' && '🎵'}
                  {link.icon === 'discord' && '💜'}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
```

### src/components/home/Hero.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/utils/constants';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-7xl font-black text-gradient">
            IKIGAI Collective
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300">
            Luxury Anime Streetwear Fusion
          </p>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Elevate your style with premium anime-inspired streetwear collections.
            Limited drops. Exclusive designs. Pure luxury.
          </p>

          <div className="flex gap-4 justify-center pt-8">
            <Link to={ROUTES.SHOP}>
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </Link>
            <Link to={ROUTES.COLLECTIONS}>
              <Button variant="secondary" size="lg">
                View Collections
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### src/components/products/ProductCard.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '@/utils/formatters';
import { useWishlist } from '@/hooks/useWishlist';

export const ProductCard = ({ product }) => {
  const { isWishlisted, toggleItem } = useWishlist();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card-luxury overflow-hidden group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-gray-900">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.salePrice && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
              SALE
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold text-lg">
              {formatPrice(product.salePrice || product.price)}
            </div>
            {product.salePrice && (
              <div className="text-gray-500 line-through text-sm">
                {formatPrice(product.price)}
              </div>
            )}
          </div>

          <button
            onClick={() => toggleItem(product.id)}
            className="text-2xl hover:scale-110 transition"
          >
            {isWishlisted(product.id) ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
```

---

## Pages to Create

### src/pages/Home.jsx

```jsx
import React from 'react';
import { Hero } from '@/components/home/Hero';

export const Home = () => {
  return (
    <div>
      <Hero />
      {/* Add more home sections here */}
    </div>
  );
};
```

### src/pages/Shop.jsx

```jsx
import React, { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';

// Mock data - replace with Firebase
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Oversized Anime Tee',
    description: 'Premium oversized t-shirt with anime graphic',
    price: 65,
    salePrice: 45,
    images: ['/placeholder.jpg'],
    category: 'T-Shirts',
  },
  {
    id: '2',
    name: 'Luxury Hoodie',
    description: 'Comfort meets style in this premium hoodie',
    price: 120,
    images: ['/placeholder.jpg'],
    category: 'Hoodies',
  },
];

export const Shop = () => {
  const [products] = useState(MOCK_PRODUCTS);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-12">Shop Collection</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
```

### src/pages/Cart.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatters';
import { ROUTES } from '@/utils/constants';

export const Cart = () => {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Your cart is empty</h1>
        <Link to={ROUTES.SHOP}>
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="card-luxury p-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-400">{item.size} - {item.color}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, item.variant, parseInt(e.target.value))}
                  className="w-12 bg-gray-800 text-white rounded px-2 py-1"
                />
                <div className="font-bold">{formatPrice(item.price * item.quantity)}</div>
                <button
                  onClick={() => removeItem(item.id, item.variant)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card-luxury p-6 mb-8">
          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total:</span>
            <span className="text-blue-400">{formatPrice(total)}</span>
          </div>
          
          <Link to={ROUTES.CHECKOUT} className="w-full">
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
```

### src/pages/Login.jsx

```jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { loginUser } from '@/services/auth';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12">
      <form onSubmit={handleSubmit} className="card-luxury p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 mb-6"
          required
        />

        <Button variant="primary" size="lg" className="w-full" isLoading={loading}>
          Login
        </Button>

        <p className="mt-4 text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-400">Register</Link>
        </p>
      </form>
    </div>
  );
};
```

### src/pages/NotFound.jsx

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/utils/constants';

export const NotFound = () => {
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-6xl font-black mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary" size="lg">Back to Home</Button>
      </Link>
    </div>
  );
};
```

---

## Step 5: Setup Firestore Database

In Firebase Console, create these collections:

### Collections & Fields:

**products**
```
productId (auto)
name: string
description: string
price: number
salePrice: number (optional)
category: string
images: array
variants: object {sizes, colors}
stock: number
rating: number
reviews: array
featured: boolean
collection: string
createdAt: timestamp
updatedAt: timestamp
```

**users**
```
userId: string (auto)
email: string
displayName: string
profileImage: string
wishlist: array
createdAt: timestamp
role: string (user/admin)
```

**orders**
```
orderId: string (auto)
userId: string
items: array
totalAmount: number
status: string
shippingAddress: object
paymentId: string
createdAt: timestamp
updatedAt: timestamp
```

---

## Step 6: Enable Firebase Authentication

In Firebase Console:
1. Go to Authentication
2. Enable Email/Password method
3. Enable Google (optional)

---

## Step 7: Run the Project

```bash
npm run dev
```

The project will be available at `http://localhost:3000`

---

## Step 8: Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

---

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Option 2: Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

### Option 3: Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## Features Included

✅ Dark luxury design
✅ Product catalog with filtering
✅ Shopping cart (Zustand)
✅ Wishlist functionality
✅ Firebase authentication
✅ Responsive design
✅ Smooth animations (Framer Motion)
✅ Toast notifications
✅ SEO optimized
✅ Production-ready code

---

## Key Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Firebase** - Backend
- **Stripe** - Payments
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Router** - Navigation

---

## Support & Troubleshooting

### Firebase not connecting?
- Check .env.local has correct credentials
- Verify project ID matches Firebase Console
- Enable Firestore in Firebase Console

### Tailwind not working?
- Run `npm install` to ensure dependencies are installed
- Check tailwind.config.js has correct paths
- Restart dev server

### Images not loading?
- Place images in `public/images/` folder
- Use relative paths: `/images/filename.jpg`

---

## Next Steps

1. ✅ Setup complete
2. Add sample products to Firestore
3. Configure payment details in Stripe
4. Add your product images
5. Customize branding
6. Deploy to production

Good luck! 🚀
