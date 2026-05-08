# IKIGAI Collective - Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Firebase Security Rules configured
- [ ] Stripe keys verified (test/production)
- [ ] All components tested locally
- [ ] Performance optimized (images, code splitting)
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility checked
- [ ] SEO metadata configured
- [ ] Error handling implemented
- [ ] Analytics integration done

---

## 1. Vercel Deployment

### Option A: Git-Based Deployment (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial IKIGAI Collective deployment"
git push origin main

# Create account at vercel.com
# Connect GitHub repository
# Vercel auto-deploys on push
```

### Option B: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_FIREBASE_API_KEY": "@firebase_api_key",
    "VITE_FIREBASE_AUTH_DOMAIN": "@firebase_auth_domain",
    "VITE_FIREBASE_PROJECT_ID": "@firebase_project_id",
    "VITE_FIREBASE_STORAGE_BUCKET": "@firebase_storage_bucket",
    "VITE_FIREBASE_MESSAGING_SENDER_ID": "@firebase_messaging_sender_id",
    "VITE_FIREBASE_APP_ID": "@firebase_app_id",
    "VITE_STRIPE_PUBLIC_KEY": "@stripe_public_key"
  }
}
```

### Set Environment Variables on Vercel

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... add all variables
```

---

## 2. Netlify Deployment

### Option A: Connect Git Repository

1. Sign up at netlify.com
2. Connect GitHub/GitLab/Bitbucket
3. Select repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables
6. Deploy!

### Option B: CLI Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

### Netlify Configuration (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  VITE_FIREBASE_API_KEY = "$FIREBASE_API_KEY"
  VITE_FIREBASE_AUTH_DOMAIN = "$FIREBASE_AUTH_DOMAIN"
  VITE_FIREBASE_PROJECT_ID = "$FIREBASE_PROJECT_ID"
  VITE_FIREBASE_STORAGE_BUCKET = "$FIREBASE_STORAGE_BUCKET"
  VITE_FIREBASE_MESSAGING_SENDER_ID = "$FIREBASE_MESSAGING_SENDER_ID"
  VITE_FIREBASE_APP_ID = "$FIREBASE_APP_ID"
  VITE_STRIPE_PUBLIC_KEY = "$STRIPE_PUBLIC_KEY"

[context.production]
  environment = { CONTEXT = "production" }

# Redirect all non-matching routes to index.html (SPA)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables on Netlify

Site Settings → Build & deploy → Environment → Add variables

---

## 3. Firebase Hosting Deployment

### Setup

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize Firebase project
firebase init hosting

# Configuration when prompted:
# - Select your Firebase project
# - Hosting directory: dist
# - Single-page app: Yes
# - Setup GitHub Actions: Yes (optional)
```

### Firebase Configuration (firebase.json)

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "redirects": [],
    "headers": [
      {
        "source": "**/*.@(css|js|gz)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### Deploy

```bash
# Build project
npm run build

# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy with version tag
firebase deploy --only hosting --message "Release v1.0.0"
```

---

## 4. Performance Optimization

### Image Optimization

```bash
# Install image optimization tools
npm install sharp

# Compress images before deployment
npx sharp -i src/assets/images -o public/images-optimized
```

### Build Optimization

```bash
# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer

# Generate report
npm run build -- --analyze
```

### Code Splitting

Already implemented with React.lazy() in App.jsx

### CSS Optimization

Tailwind CSS is automatically purged in production build

---

## 5. Environment Variables Setup

### Vercel

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
vercel env add VITE_STRIPE_PUBLIC_KEY
vercel env add VITE_ADMIN_EMAIL
```

### Netlify

Dashboard → Site Settings → Build & deploy → Environment → Edit variables

### Firebase

```bash
firebase functions:config:set \
  stripe.key="sk_live_..." \
  firebase.key="..."
```

---

## 6. Firebase Security Rules

### Firestore Rules (firestore.rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public product access
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }

    // User data - only owner can read/write
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth.token.admin == true;
    }

    // Orders - only owner or admin
    match /orders/{orderId} {
      allow read: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
      allow create: if request.auth != null;
      allow update: if request.auth.token.admin == true;
    }

    // Reviews - authenticated users
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId || request.auth.token.admin == true;
    }
  }
}
```

### Storage Rules (storage.rules)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product images - public read
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.token.admin == true;
    }

    // User uploads
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth.token.admin == true;
    }
  }
}
```

---

## 7. SEO Configuration

### Meta Tags in index.html

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="IKIGAI Collective - Luxury Anime Streetwear. Premium oversized t-shirts, hoodies, and collections inspired by Japanese anime culture.">
<meta name="keywords" content="anime, streetwear, luxury, clothing, tees, hoodies, cyberpunk, tokyo">
<meta name="author" content="IKIGAI Collective">
<meta name="theme-color" content="#0a0a0a">

<!-- Open Graph -->
<meta property="og:title" content="IKIGAI Collective - Luxury Anime Streetwear">
<meta property="og:description" content="Premium anime-inspired streetwear collection">
<meta property="og:type" content="website">
<meta property="og:url" content="https://ikigai-collective.com">
<meta property="og:image" content="/og-image.jpg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="IKIGAI Collective">
<meta name="twitter:description" content="Luxury Anime Streetwear">
<meta name="twitter:image" content="/og-image.jpg">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" href="/favicon.png">
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Sitemap: https://ikigai-collective.com/sitemap.xml
```

### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ikigai-collective.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ikigai-collective.com/shop</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ikigai-collective.com/about</loc>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## 8. Monitoring & Analytics

### Google Analytics Setup

```jsx
// In src/main.jsx
import { useEffect } from 'react'

useEffect(() => {
  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date())
  gtag('config', 'GA_ID')
}, [])
```

### Error Monitoring (Sentry)

```bash
npm install @sentry/react @sentry/tracing
```

```jsx
// In src/main.jsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "https://your-sentry-dsn@sentry.io/project-id",
  environment: "production",
  tracesSampleRate: 1.0,
})
```

---

## 9. Continuous Integration/Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 10. Domain Configuration

### For Vercel

1. Domain Settings → Add Domain
2. Follow DNS configuration
3. Configure SSL/TLS

### For Netlify

1. Domain management
2. Point custom domain
3. Enable HTTPS (automatic)

### For Firebase

```bash
firebase hosting:channel:deploy preview --expires 7d
```

---

## 11. Post-Deployment Checklist

- [ ] Test all pages loading
- [ ] Verify Firebase authentication works
- [ ] Test Stripe payment flow
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test search functionality
- [ ] Verify admin dashboard access
- [ ] Check 404 page handling
- [ ] Test error states
- [ ] Verify analytics tracking
- [ ] Check Core Web Vitals
- [ ] Test with screen readers (a11y)

---

## 12. Monitoring Production

### Performance Metrics

- Monitor Lighthouse scores
- Track Core Web Vitals
- Monitor API response times
- Track error rates

### Useful Commands

```bash
# Build analysis
npm run build -- --report

# Performance testing
npx lighthouse https://ikigai-collective.com

# Bundle size analysis
npm install --save-dev webpack-bundle-analyzer
```

---

## Troubleshooting

### Build fails on deployment

```bash
# Clear cache and rebuild
npm cache clean --force
npm run build
```

### Environment variables not found

- Verify variables are set on hosting platform
- Restart deployment
- Check .env.example matches what's deployed

### Firebase connection issues

- Verify firebaseConfig is correct
- Check CORS settings
- Verify security rules allow access

### Stripe payment not working

- Verify Stripe keys are correct
- Check if using test keys
- Verify webhook configuration

---

## Support & Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [React Deployment](https://react.dev/learn/start-a-new-react-project)

---

**Deployment ready! 🚀**
