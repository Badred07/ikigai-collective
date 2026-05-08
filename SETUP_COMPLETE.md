# IKIGAI Collective - Complete Setup Guide

## Project Structure Overview

```
ikigai-collective/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedCollections.jsx
│   │   │   ├── TrendingProducts.jsx
│   │   │   └── Newsletter.jsx
│   │   ├── products/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ProductFilter.jsx
│   │   ├── cart/
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── CartPage.jsx
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AuthModal.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ProductManager.jsx
│   │   │   ├── OrderManager.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── UserManager.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Toast.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Collections.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useWishlist.js
│   │   ├── useProducts.js
│   │   └── useOrders.js
│   ├── store/
│   │   ├── cartStore.js
│   │   ├── authStore.js
│   │   ├── wishlistStore.js
│   │   └── filterStore.js
│   ├── services/
│   │   ├── firebase.js
│   │   ├── firestore.js
│   │   ├── payment.js (Cash on Delivery)
│   │   ├── auth.js
│   │   └── products.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── images/
├── .env.example
├── .env.local
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   - Copy `.env.example` to `.env.local`
   - Add your Firebase credentials from Firebase Console

3. **Payment method**
   - Cash on Delivery (COD) is used by default — no payment gateway keys required. If you later enable card payments, add gateway keys to `.env.local`.

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Firebase Configuration

Create `.env.local` with:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
# Payment: Cash on Delivery (COD) used by default; add gateway keys only if enabling card payments
```

## Firestore Database Structure

### Collections

1. **products**
   - productId (auto)
   - name
   - description
   - price
   - salePrice (optional)
   - category
   - tags
   - images (array)
   - variants (sizes, colors)
   - stock
   - rating
   - reviews
   - createdAt
   - updatedAt
   - featured
   - collection

2. **users**
   - userId (same as auth)
   - email
   - displayName
   - phone
   - address
   - city
   - zipCode
   - country
   - profileImage
   - wishlist (array of productIds)
   - createdAt
   - role (user/admin)

3. **orders**
   - orderId (auto)
   - userId
   - items (array)
   - totalAmount
   - status (pending/processing/shipped/delivered)
   - shippingAddress
   - paymentId
   - createdAt
   - updatedAt

4. **reviews**
   - reviewId (auto)
   - productId
   - userId
   - rating
   - comment
   - helpful
   - createdAt

5. **cart**
   - cartId (same as userId)
   - userId
   - items (array)
   - updatedAt

## Key Features Implemented

✅ Luxury landing page with hero section
✅ Product catalog with filtering
✅ Shopping cart system (Zustand)
✅ Secure checkout with Stripe
✅ Firebase authentication
✅ User wishlist
✅ Admin dashboard
✅ Order tracking
✅ Product reviews and ratings
✅ Newsletter subscription
✅ Responsive mobile design
✅ Dark mode (default)
✅ Smooth animations (Framer Motion)
✅ SEO optimization
✅ Loading states
✅ Error handling

## Deployment

### Vercel
```bash
npm run build
vercel deploy
```

### Firebase Hosting
```bash
firebase init hosting
firebase deploy
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Admin Access

Default admin login credentials (set up in Firebase):
- Email: admin@ikigai-collective.com
- Password: [Set in Firebase Console]

To make a user admin, update their role in Firestore users collection.

## Performance Tips

- Images optimized with Next-Gen formats
- Lazy loading for product images
- Code splitting with React Router
- CSS-in-JS optimization
- Firebase caching enabled
- Stripe test mode for development

## Support

For issues, check:
1. `.env.local` configuration
2. Firebase Console rules
3. Stripe API keys
4. Browser console for errors
