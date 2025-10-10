/**
 * Configuración de Firebase para UTEM Ciberseguridad
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Crear proyecto en Firebase Console (https://console.firebase.google.com)
 * 2. Habilitar Authentication con Email/Password
 * 3. Configurar Firestore Database
 * 4. Agregar dominio autorizado: tu-dominio.com
 * 5. Copiar este archivo como config.js y completar los valores
 * 
 * SEGURIDAD:
 * - Nunca commitear las claves reales al repositorio
 * - Usar variables de entorno en producción
 * - Configurar reglas de seguridad en Firestore
 */

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Configuración de Firebase - REEMPLAZAR CON VALORES REALES
const firebaseConfig = {
  apiKey: "AIzaSyB1pCHfKNCSFFnaYQA-tMY9H0rWQwOkg9s",
  authDomain: "phish-utem.firebaseapp.com",
  projectId: "phish-utem",
  storageBucket: "phish-utem.firebasestorage.app",
  messagingSenderId: "413671359553",
  appId: "1:413671359553:web:d80f5a6e18d367c41a32c0",
  measurementId: "G-QWWEFYRVGN"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configuración para desarrollo local (opcional)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Descomentar para usar emuladores locales
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export default app;

/**
 * REGLAS DE SEGURIDAD FIRESTORE (firestore.rules):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Usuarios solo pueden leer/escribir sus propios datos
 *     match /users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *     }
 *     
 *     // Campañas - acceso basado en roles
 *     match /campaigns/{campaignId} {
 *       allow read: if request.auth != null;
 *       allow write: if request.auth != null && 
 *         (resource.data.createdBy == request.auth.uid || 
 *          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
 *     }
 *     
 *     // Logs de eventos - solo lectura para usuarios, escritura para sistema
 *     match /events/{eventId} {
 *       allow read: if request.auth != null;
 *       allow write: if request.auth != null && 
 *         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'system'];
 *     }
 *   }
 * }
 */

/**
 * ESTRUCTURA DE DATOS SUGERIDA:
 * 
 * /users/{uid}
 * {
 *   email: string,
 *   displayName: string,
 *   role: 'admin' | 'editor' | 'viewer',
 *   department: string,
 *   permissions: string[],
 *   createdAt: timestamp,
 *   lastLogin: timestamp,
 *   isActive: boolean
 * }
 * 
 * /campaigns/{campaignId}
 * {
 *   name: string,
 *   description: string,
 *   status: 'draft' | 'active' | 'completed' | 'paused',
 *   createdBy: string (uid),
 *   createdAt: timestamp,
 *   updatedAt: timestamp,
 *   templateId: string,
 *   targetGroups: string[],
 *   settings: object
 * }
 * 
 * /events/{eventId}
 * {
 *   campaignId: string,
 *   userId: string,
 *   type: 'email_sent' | 'email_opened' | 'link_clicked' | 'data_submitted',
 *   timestamp: timestamp,
 *   metadata: object,
 *   ipAddress: string,
 *   userAgent: string
 * }
 */