# IKIGAI Collective - Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env.local
```

### Step 3: Add Your Credentials

Get from Firebase Console:
```env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc
```

Get from Stripe Dashboard:
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📋 Project File Checklist

Copy these files from COMPONENT_LIBRARY.js into your project:

### Configuration Files ✓
- [x] package.json
- [x] vite.config.js
- [x] tailwind.config.js
- [x] postcss.config.js
- [x] .env.example
- [x] .gitignore

### Documentation Files ✓
- [x] README.md
- [x] IMPLEMENTATION_GUIDE.md
- [x] COMPLETE_SOURCE_FILES.md
- [x] DEPLOYMENT_GUIDE.md
- [x] COMPONENT_LIBRARY.js

### Source Files to Create

**Configuration (src/config/)**
```
firebase.js              ← Firebase initialization
stripe.js              ← Stripe setup
constants.js           ← App constants
```

**Context (src/context/)**
```
AuthContext.jsx        ← Authentication provider
CartContext.jsx        ← Shopping cart provider
ThemeContext.jsx       ← Dark mode provider (optional)
```

**Hooks (src/hooks/)**
```
useAuth.js            ← Auth hook
useCart.js            ← Cart hook
useProducts.js        ← Products hook
useOrders.js          ← Orders hook
useWindowSize.js      ← Responsive hook
```

**Common Components (src/components/common/)**
```
Navbar.jsx            ← Top navigation
Footer.jsx            ← Footer with links
Hero.jsx              ← Hero section
LoadingSpinner.jsx    ← Loading indicator
Button.jsx            ← Reusable button
Card.jsx              ← Reusable card
Modal.jsx             ← Modal component
```

**Product Components (src/components/product/)**
```
ProductCard.jsx       ← Product grid card
ProductGallery.jsx    ← Image gallery
VariantSelector.jsx   ← Size/color picker
ReviewCard.jsx        ← Review display
RatingStars.jsx       ← Star rating
```

**Cart Components (src/components/cart/)**
```
CartItem.jsx          ← Cart item row
CartSummary.jsx       ← Cart total
EmptyCart.jsx         ← Empty state
```

**Auth Components (src/components/auth/)**
```
AuthGuard.jsx         ← Route protection
ProtectedRoute.jsx    ← Protected route wrapper
```

**Pages (src/pages/)**
```
HomePage.jsx          ← Home/landing page
ShopPage.jsx          ← Product listing
ProductPage.jsx       ← Product details
CartPage.jsx          ← Shopping cart
CheckoutPage.jsx      ← Checkout flow
LoginPage.jsx         ← Login form
RegisterPage.jsx      ← Registration form
AdminPage.jsx         ← Admin dashboard
ProfilePage.jsx       ← User profile
CollectionsPage.jsx   ← Collections view
AboutPage.jsx         ← About brand
ContactPage.jsx       ← Contact form
```

**Services (src/services/)**
```
authService.js        ← Authentication logic
productService.js     ← Product API calls
orderService.js       ← Order management
userService.js        ← User management
stripeService.js      ← Stripe integration
uploadService.js      ← File uploads
notificationService.js ← Toast notifications
```

**Utilities (src/utils/)**
```
constants.js          ← Constants/enums
formatters.js         ← Formatting functions
validators.js         ← Validation functions
errorHandlers.js      ← Error handling
helpers.js            ← Helper functions
```

**Styles (src/styles/)**
```
globals.css           ← Global styles
animations.css        ← Animation definitions
responsive.css        ← Media queries
```

---

## 🎯 Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Make Changes
- Edit components in `src/components/`
- Changes auto-reload in browser

### 3. Test Locally
- Use Firebase test data
- Use Stripe test cards (4242 4242 4242 4242)
- Test on mobile using DevTools

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🧪 Testing Stripe Payments

### Test Cards

| Card Number | Use Case |
|---|---|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Declined payment |
| 4000 0025 0000 3155 | Requires authentication |
| 5555 5555 5555 4444 | Mastercard (succeeds) |

Use any future expiry date and any 3-digit CVC.

### Test Mode
All payments are processed in test mode by default. No real charges.

---

## 📚 Component Examples

### Basic Product Card
```jsx
import ProductCard from './components/product/ProductCard'

<ProductCard 
  product={product}
  onAddToCart={(variant) => cart.add(product, variant)}
/>
```

### Add to Cart
```jsx
import { useCart } from './hooks/useCart'

const { addToCart } = useCart()
addToCart(product, { size: 'M', color: 'black' }, 1)
```

### Protected Route
```jsx
import { useAuth } from './hooks/useAuth'

const { user, loading } = useAuth()
if (!loading && !user) return <Redirect to="/login" />
```

### Fetch Products
```jsx
import { getProducts } from './services/productService'

useEffect(() => {
  const products = await getProducts({ category: 't-shirts' })
  setProducts(products)
}, [])
```

---

## 🔧 Common Tasks

### Add New Product
1. Create document in Firestore `/products` collection
2. Upload images to Firebase Storage `/products/`
3. Update Firestore doc with image URLs

### Create Admin User
1. Create user account normally
2. Go to Firestore → users collection
3. Edit user doc, set `role: "admin"`

### Change Pricing
1. Edit product price in Firestore
2. Changes reflect immediately (real-time)

### Modify Collections
1. Edit COLLECTIONS in src/utils/constants.js
2. Create Firestore products with matching collection ID
3. Collections auto-filter products

### Update Categories
1. Edit CATEGORIES in src/utils/constants.js
2. Add products with category ID
3. ShopPage filters automatically

---

## 🎨 Customization

### Theme Colors
Edit `src/styles/globals.css`:
```css
:root {
  --color-primary: #00f0ff;
  --color-secondary: #ff006e;
  /* ... */
}
```

### Logo & Branding
1. Replace images in `src/assets/images/`
2. Update `src/components/common/Navbar.jsx`
3. Update site title in `index.html`

### Hero Section
1. Edit `src/pages/HomePage.jsx`
2. Update hero image URL
3. Modify heading text and CTA

---

## 🐛 Debugging

### Enable DevTools
```jsx
// In src/main.jsx
React.StrictMode will show warnings
```

### Firebase Errors
- Check browser console
- Verify Firestore security rules
- Check Firebase project settings

### Stripe Errors
- Check Stripe keys in .env.local
- Verify Stripe account is in test mode
- Check browser console for errors

### Component Not Rendering
- Check import paths
- Verify component exports default
- Check for syntax errors

---

## 📱 Mobile Testing

### Chrome DevTools
1. Open DevTools (F12)
2. Click device icon (mobile view)
3. Select device type
4. Test responsiveness

### Real Device
```bash
# Get local IP
ipconfig getifaddr en0  # Mac
ipconfig              # Windows

# Connect to: http://LOCAL_IP:3000
```

---

## 🚀 Performance Tips

### Optimize Images
```bash
npm install --save-dev imagemin
```

### Lazy Load Components
```jsx
const ProductPage = lazy(() => import('./pages/ProductPage'))
```

### Monitor Bundle Size
```bash
npm run build -- --report
```

---

## 📞 Support Resources

- **Firebase**: https://firebase.google.com/docs
- **Stripe**: https://stripe.com/docs
- **React**: https://react.dev
- **Tailwind**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/

---

## ✅ Before Going Live

- [ ] Test all pages
- [ ] Test authentication (login/register/logout)
- [ ] Test checkout flow
- [ ] Verify mobile responsive
- [ ] Check accessibility (keyboard nav, contrast)
- [ ] Test with slow network (DevTools → Throttling)
- [ ] Verify all images load
- [ ] Test error states
- [ ] Check performance (Lighthouse)
- [ ] Setup monitoring/analytics
- [ ] Configure domain
- [ ] Setup SSL/TLS
- [ ] Backup database

---

## 🎉 You're Ready!

Your IKIGAI Collective store is now set up and ready to customize!

1. Follow the file checklist to create all source files
2. Implement each component using the code samples
3. Test locally with `npm run dev`
4. Deploy to Vercel/Netlify/Firebase
5. Monitor and iterate

Happy building! 🚀

---

**For detailed implementation, see IMPLEMENTATION_GUIDE.md**
**For deployment, see DEPLOYMENT_GUIDE.md**
