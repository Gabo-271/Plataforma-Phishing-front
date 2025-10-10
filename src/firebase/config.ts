// Firebase configuration and singletons
// Reads values from Vite env variables. Provide them in a .env file with VITE_ prefix.

import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  type Firestore,
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  // measurementId is optional; only for analytics-enabled projects
};

// Initialize Firebase app once
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Optional: connect to emulators in development if enabled
const useEmulators = import.meta.env.VITE_FIREBASE_USE_EMULATORS === 'true';
if (useEmulators) {
  try {
    connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_HOST || 'http://localhost:9099');
  } catch {}
  try {
    connectFirestoreEmulator(
      db,
      (import.meta.env.VITE_FIRESTORE_EMULATOR_HOST || 'localhost') as string,
      Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080)
    );
  } catch {}
  try {
    connectStorageEmulator(
      storage,
      (import.meta.env.VITE_STORAGE_EMULATOR_HOST || 'localhost') as string,
      Number(import.meta.env.VITE_STORAGE_EMULATOR_PORT || 9199)
    );
  } catch {}
}

export default app;
