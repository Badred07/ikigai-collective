# 🚀 IKIGAI Collective - Deployment Guide

Complete guide for deploying your luxury anime streetwear e-commerce platform to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase project created and configured
- [ ] Stripe account setup with live keys
- [ ] Firestore database initialized with collections
- [ ] Product data uploaded
- [ ] Images optimized and hosted
- [ ] Firebase security rules configured
- [ ] Testing completed
- [ ] SEO metadata configured
- [ ] Performance optimized

---

## Option 1: Deploy to Vercel (Recommended)

### Why Vercel?
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Serverless functions for API
- Best for React apps

### Steps:

1. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

2. **Connect Your Repository**
   ```bash
   git remote add origin https://github.com/yourusername/ikigai-collective.git
   git push -u origin main
   ```

3. **Import Project**
   - Click "New Project" on Vercel dashboard
   - Select your GitHub repository
   - Vercel auto-detects Vite configuration

4. **Configure Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local`:
     ```
     VITE_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID
     VITE_STRIPE_PUBLIC_KEY
     ```

5. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Get your live URL

### Custom Domain (Vercel)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as directed

---

## Option 2: Deploy to Firebase Hosting

### Why Firebase Hosting?
- Same platform as database
- Fast global CDN
- SSL certificate included
- Supports rewrites for SPA

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Public directory: `dist`
   - Configure as single-page app: `Y`
   - Set up automatic builds with GitHub: `N` (we'll do manual)

4. **Build Project**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

6. **View URL**
   ```bash
   firebase hosting:channel:list
   ```

### Set Custom Domain (Firebase)
1. Go to Firebase Console > Hosting > Connect domain
2. Add your domain
3. Update DNS records
4. Firebase handles SSL automatically

---

## Option 3: Deploy to Netlify

### Why Netlify?
- Simple deployment
- Environment variables UI
- Branch deployments
- Form handling
- Great for static sites

### Steps:

1. **Create Netlify Account**
   - Go to [Netlify](https://netlify.com)
   - Sign up with GitHub

2. **Connect GitHub**
   - Click "New site from Git"
   - Select GitHub repository
   - Authorize Netlify

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Environment Variables**
   - Go to Site Settings > Build & Deploy > Environment
   - Add all variables from `.env.local`

5. **Deploy**
   - Click "Deploy site"
   - Netlify builds automatically

### Custom Domain (Netlify)
1. Go to Site Settings > Domain management
2. Add custom domain
3. Update DNS records (guides provided)

---

## Environment Variables for Production

Use these with your **production credentials**:

```bash
# Firebase Production
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=ikigai-collective.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ikigai-collective
VITE_FIREBASE_STORAGE_BUCKET=ikigai-collective.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Production
VITE_STRIPE_PUBLIC_KEY=pk_live_your_live_key

# API
VITE_API_URL=https://your-domain.com
```

⚠️ **IMPORTANT**: Never commit `.env.local` with real credentials!

---

## Optimize for Production

### 1. Build Optimization
```bash
# Check bundle size
npm install -g vite
vite build --analyze

# Output should be < 2MB total
```

### 2. Image Optimization
```bash
# Use next-gen formats (WebP)
# Use responsive images
# Lazy load images
# Compress to <100KB each
```

### 3. Code Splitting
Already configured in `vite.config.js`:
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['react', 'react-dom'],
        'firebase': ['firebase/app', 'firebase/auth'],
      }
    }
  }
}
```

### 4. Caching
Set in your deployment platform:
- Static assets: 1 year
- HTML: no-cache
- API calls: use Firestore caching

---

## Firebase Security Rules for Production

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - Public read only
    match /products/{document=**} {
      allow read;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Users - Own data only
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Orders - Own orders only
    match /orders/{orderId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.userId || 
        (request.auth != null && 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Cart - Own cart only
    match /cart/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Reviews
    match /reviews/{reviewId} {
      allow read;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }

    // Admin access
    match /admin/{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Stripe Configuration

### 1. Switch to Live Keys
- Go to Stripe Dashboard
- Toggle to "Live" mode
- Copy live public key (starts with `pk_live_`)
- Update `VITE_STRIPE_PUBLIC_KEY`

### 2. Add Webhook Endpoint
```bash
# Your domain should be:
https://your-domain.com/api/stripe-webhook

# Add in Stripe Dashboard > Developers > Webhooks
# Listen for: payment_intent.succeeded, payment_intent.failed
```

### 3. Update Terms & Conditions
- Add Stripe terms link
- Add payment disclaimer

---

## Post-Deployment

### 1. Monitor Performance
- Vercel: Analytics dashboard
- Firebase: Firestore usage
- Stripe: Dashboard transactions
- Sentry: Error tracking (optional)

### 2. Set Up Analytics
```javascript
// Add Google Analytics (optional)
import { getAnalytics } from 'firebase/analytics';
const analytics = getAnalytics(app);
```

### 3. Backup Strategy
```bash
# Weekly backups
firebase firestore:delete --collections-to-ignore=products,users
```

### 4. SSL Certificate
- Vercel: Automatic
- Firebase: Automatic
- Netlify: Automatic
- Custom domain: Automatic Let's Encrypt

---

## Troubleshooting Deployment

### Vercel Issues
```
Error: Module not found
Solution: npm install && npm run build locally first

Error: Cannot find Firebase keys
Solution: Check Environment Variables in Vercel dashboard

Error: Build failed
Solution: Check Vite config, run npm run build locally
```

### Firebase Hosting Issues
```
Error: Permission denied
Solution: Update Firestore rules for authenticated users

Error: 404 on page refresh
Solution: Add rewrite rule in firebase.json:
{
  "rewrites": [
    {
      "source": "/**",
      "destination": "/index.html"
    }
  ]
}

Error: Images not loading
Solution: Check Firebase Storage rules and image paths
```

### Netlify Issues
```
Error: Deploy failed
Solution: Check build command and environment variables

Error: Functions not working
Solution: Use serverless functions or Netlify Functions

Error: Environment variables not working
Solution: Rebuild site after adding variables
```

---

## Performance Monitoring

### Recommended Tools
1. **Google Analytics** - User behavior
2. **Sentry** - Error tracking
3. **Lighthouse** - Performance scores
4. **Firebase Crashlytics** - App crashes

### Add Sentry (Error Tracking)
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
});
```

---

## Scaling Strategies

### As You Grow:

1. **Database**
   - Firestore auto-scales
   - Consider Firestore pricing limits
   - Use indexes for faster queries

2. **Storage**
   - Move images to CDN (Cloudflare, Bunny)
   - Use image resizing services

3. **Functions**
   - Move API logic to Cloud Functions
   - Add caching layer (Redis)

4. **Auth**
   - Consider Firebase Authentication limitations
   - Plan for custom auth if needed

---

## Maintenance

### Daily
- Monitor error logs
- Check payment processing
- Review customer orders

### Weekly
- Update security patches
- Review analytics
- Backup database

### Monthly
- Review performance metrics
- Update dependencies
- Security audit

---

## Support Links

- [Vercel Docs](https://vercel.com/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Netlify Docs](https://docs.netlify.com)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Vite Guide](https://vitejs.dev/guide/)

---

## Final Checklist Before Going Live

- [ ] All environment variables set correctly
- [ ] SSL certificate installed
- [ ] Stripe live keys configured
- [ ] Database rules reviewed
- [ ] Images optimized and loading
- [ ] Performance tested (Lighthouse score > 90)
- [ ] Mobile responsive tested
- [ ] Forms tested (registration, checkout)
- [ ] Email notifications working
- [ ] Error logging configured
- [ ] Backups enabled
- [ ] 404 page shows
- [ ] Favicon configured
- [ ] Meta tags for SEO
- [ ] Analytics tracking installed

You're ready to launch! 🎉
