// Minimal Firebase helper for client-side integration.
// Uses Firebase v9 modular SDK from CDN. Copy firebase-config.example.js -> firebase-config.js
// then this module's autoInit() will initialize automatically when imported.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

let app = null;
let auth = null;
let db = null;

export function initFirebase(config) {
  if (app) return { auth, db };
  app = initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
  return { auth, db };
}

export async function autoInit() {
  try {
    const cfg = await import('./firebase-config.js');
    return initFirebase(cfg.firebaseConfig);
  } catch (e) {
    // not configured
    console.warn('firebase-config.js not found. Firebase features disabled.');
    return null;
  }
}

export function onAuthChanged(cb) {
  if (!auth) throw new Error('Firebase not initialized');
  return onAuthStateChanged(auth, cb);
}

export function signUp(email, password) {
  if (!auth) throw new Error('Firebase not initialized');
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  if (!auth) throw new Error('Firebase not initialized');
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  if (!auth) throw new Error('Firebase not initialized');
  return signOut(auth);
}

export async function saveUserCart(uid, cartObj) {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const ref = doc(db, 'carts', uid);
    await setDoc(ref, { cart: cartObj, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (e) {
    console.error('saveUserCart failed', e);
    throw e;
  }
}

export function listenToUserCart(uid, cb) {
  if (!db) throw new Error('Firebase not initialized');
  const ref = doc(db, 'carts', uid);
  return onSnapshot(ref, (snap) => {
    cb(snap.exists() ? (snap.data().cart || {}) : {});
  });
}

export async function saveOrder(uid, order) {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const col = collection(db, 'orders');
    const docRef = await addDoc(col, { uid: uid || null, order, createdAt: new Date().toISOString() });
    return docRef.id;
  } catch (e) {
    console.error('saveOrder failed', e);
    throw e;
  }
}

export async function listOrders() {
  if (!db) throw new Error('Firebase not initialized');
  try {
    const q = await getDocs(collection(db, 'orders'));
    return q.docs.map(d => ({ id: d.id, data: d.data() }));
  } catch (e) {
    console.error('listOrders failed', e);
    throw e;
  }
}
