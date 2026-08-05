import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const configs = import.meta.glob('../../firebase-applet-config.json', { eager: true, import: 'default' });
const firebaseConfigLocal = (Object.values(configs)[0] || {}) as any;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigLocal.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigLocal.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigLocal.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigLocal.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigLocal.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigLocal.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || firebaseConfigLocal.measurementId,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || firebaseConfigLocal.firestoreDatabaseId,
};

if (!firebaseConfig.apiKey && import.meta.env.PROD) {
  console.error('Firebase API Key is missing. Please set VITE_FIREBASE_API_KEY in your Vercel environment variables.');
}

// Only initialize if we have at least an API key to avoid "auth/invalid-api-key" error
const app = firebaseConfig.apiKey 
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

if (!app && import.meta.env.PROD) {
  console.error('Firebase configuration is missing! Please set VITE_FIREBASE_* environment variables in your deployment.');
}

let dbInstance;
if (app) {
  try {
    // Attempt to initialize with specific settings
    dbInstance = initializeFirestore(app, { 
      experimentalForceLongPolling: true 
    }, firebaseConfig.firestoreDatabaseId || '(default)');
  } catch (e) {
    // If it fails (usually because it was already initialized during hot-reload), get the existing instance
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');
  }
}

export const auth = app ? getAuth(app) : null as any;
export const db = dbInstance || null as any;
export const storage = app ? getStorage(app) : null as any;

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  if (!auth) throw new Error('Firebase Auth not initialized');
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => auth ? signOut(auth) : Promise.resolve();
