// IKIGAI Collective - Complete Firebase Firestore Schema
// Copy this schema definition to your Firebase Console

/*
COLLECTIONS TO CREATE:
1. products
2. users
3. orders
4. reviews
5. cart
6. wishlists
*/

export const FIRESTORE_SCHEMA = {
  // =====================================================
  // PRODUCTS COLLECTION
  // =====================================================
  products: {
    docId: 'auto-generated',
    fields: {
      productId: 'string (auto)',
      name: 'string - Product name',
      description: 'string - Detailed product description',
      price: 'number - Original price in USD',
      salePrice: 'number (optional) - Discounted price',
      category: 'string - Product category',
      tags: 'array - Search tags',
      images: {
        type: 'array',
        items: 'object',
        fields: {
          url: 'string - Image URL',
          alt: 'string - Alt text',
          isPrimary: 'boolean',
        },
      },
      variants: {
        type: 'object',
        fields: {
          sizes: 'array - [XS, S, M, L, XL, XXL]',
          colors: 'array - [{name, hex}]',
          materials: 'array - [100% Cotton, etc]',
        },
      },
      stock: 'number - Available quantity',
      sku: 'string - Stock keeping unit',
      rating: 'number - Average rating (0-5)',
      reviewsCount: 'number - Total reviews',
      featured: 'boolean - Show on homepage',
      collection: 'string - Collection name',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },

  // =====================================================
  // USERS COLLECTION
  // =====================================================
  users: {
    docId: 'userId (from Firebase Auth)',
    fields: {
      userId: 'string - Same as Firebase Auth UID',
      email: 'string - User email',
      displayName: 'string - User display name',
      phone: 'string (optional) - Phone number',
      profileImage: 'string (optional) - Profile picture URL',
      address: {
        type: 'object',
        fields: {
          street: 'string',
          city: 'string',
          state: 'string',
          zipCode: 'string',
          country: 'string',
        },
      },
      wishlist: 'array - [productIds]',
      orders: 'array - [orderIds]',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      role: 'string - user, admin, moderator',
      preferences: {
        type: 'object',
        fields: {
          newsletter: 'boolean',
          notifications: 'boolean',
          theme: 'string - dark, light',
        },
      },
    },
  },

  // =====================================================
  // ORDERS COLLECTION
  // =====================================================
  orders: {
    docId: 'auto-generated',
    fields: {
      orderId: 'string (auto)',
      userId: 'string - Reference to user',
      items: {
        type: 'array',
        items: 'object',
        fields: {
          productId: 'string',
          productName: 'string',
          price: 'number',
          quantity: 'number',
          size: 'string',
          color: 'string',
          image: 'string',
        },
      },
      subtotal: 'number',
      tax: 'number',
      shipping: 'number',
      totalAmount: 'number',
      status: 'string - pending, processing, shipped, delivered, cancelled',
      shippingAddress: {
        type: 'object',
        fields: {
          name: 'string',
          street: 'string',
          city: 'string',
          state: 'string',
          zipCode: 'string',
          country: 'string',
          phone: 'string',
        },
      },
      shippingMethod: 'string - standard, express, overnight',
      trackingNumber: 'string (optional)',
      paymentMethod: 'string - cash_on_delivery (cod), card, apple_pay, google_pay',
      paymentId: 'string - Gateway payment ID (null for COD)',
      invoiceUrl: 'string (optional) - PDF invoice URL',
      notes: 'string (optional) - Order notes',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      estimatedDelivery: 'timestamp',
    },
  },

  // =====================================================
  // REVIEWS COLLECTION
  // =====================================================
  reviews: {
    docId: 'auto-generated',
    fields: {
      reviewId: 'string (auto)',
      productId: 'string - Reference to product',
      userId: 'string - Reference to user',
      userName: 'string - User display name',
      userImage: 'string (optional)',
      rating: 'number - 1-5 stars',
      title: 'string - Review title',
      comment: 'string - Review comment',
      helpful: 'number - Helpful count',
      unhelpful: 'number - Unhelpful count',
      verified: 'boolean - Verified purchase',
      images: 'array (optional) - Review images',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },

  // =====================================================
  // CART COLLECTION
  // =====================================================
  cart: {
    docId: 'userId',
    fields: {
      cartId: 'string - Same as userId',
      userId: 'string - Reference to user',
      items: {
        type: 'array',
        items: 'object',
        fields: {
          productId: 'string',
          productName: 'string',
          price: 'number',
          quantity: 'number',
          size: 'string',
          color: 'string',
          image: 'string',
        },
      },
      totalItems: 'number',
      subtotal: 'number',
      updatedAt: 'timestamp',
    },
  },

  // =====================================================
  // WISHLISTS COLLECTION
  // =====================================================
  wishlists: {
    docId: 'userId',
    fields: {
      wishlistId: 'string - Same as userId',
      userId: 'string - Reference to user',
      items: 'array - [productIds]',
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    },
  },
};

// =====================================================
// FIRESTORE RULES (Security)
// =====================================================
export const FIRESTORE_RULES = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read - Products
    match /products/{document=**} {
      allow read;
    }

    // User authenticated
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // User orders
    match /orders/{orderId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }

    // User cart
    match /cart/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // User wishlist
    match /wishlists/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Reviews
    match /reviews/{reviewId} {
      allow read;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }

    // Admin only
    match /admin/{document=**} {
      allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
`;

// =====================================================
// SAMPLE DATA (For Testing)
// =====================================================
export const SAMPLE_PRODUCT = {
  productId: 'prod_001',
  name: 'Oversized Anime Tee - Blue Gradient',
  description: 'Premium oversized t-shirt featuring exclusive anime artwork with gradient blue effect. Made from 100% organic cotton for maximum comfort and durability.',
  price: 65,
  salePrice: 45,
  category: 'Oversized T-Shirts',
  tags: ['anime', 'tee', 'oversized', 'gradient', 'limited'],
  images: [
    {
      url: 'https://via.placeholder.com/500x600?text=Oversized+Tee',
      alt: 'Front view',
      isPrimary: true,
    },
    {
      url: 'https://via.placeholder.com/500x600?text=Back+View',
      alt: 'Back view',
      isPrimary: false,
    },
  ],
  variants: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Blue Gradient', hex: '#00D4FF' },
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    materials: ['100% Organic Cotton'],
  },
  stock: 150,
  sku: 'ANIM-TEE-001-BLU',
  rating: 4.8,
  reviewsCount: 42,
  featured: true,
  collection: 'summer-2024',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const SAMPLE_USER = {
  userId: 'user_001',
  email: 'customer@example.com',
  displayName: 'Premium Collector',
  phone: '+1234567890',
  profileImage: 'https://via.placeholder.com/200',
  address: {
    street: '123 Fashion St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
  },
  wishlist: ['prod_001', 'prod_002'],
  orders: ['ord_001'],
  createdAt: new Date(),
  updatedAt: new Date(),
  role: 'user',
  preferences: {
    newsletter: true,
    notifications: true,
    theme: 'dark',
  },
};

export const SAMPLE_ORDER = {
  orderId: 'ord_001',
  userId: 'user_001',
  items: [
    {
      productId: 'prod_001',
      productName: 'Oversized Anime Tee',
      price: 45,
      quantity: 2,
      size: 'L',
      color: 'Blue Gradient',
      image: 'https://via.placeholder.com/100',
    },
  ],
  subtotal: 90,
  tax: 7.2,
  shipping: 10,
  totalAmount: 107.2,
  status: 'processing',
  shippingAddress: {
    name: 'Premium Collector',
    street: '123 Fashion St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    phone: '+1234567890',
  },
  shippingMethod: 'express',
  trackingNumber: 'TRACK123456789',
  paymentMethod: 'card',
  paymentId: 'pi_1234567890',
  notes: 'Please handle with care',
  createdAt: new Date(),
  updatedAt: new Date(),
  estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
};
