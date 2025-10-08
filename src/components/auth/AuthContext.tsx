import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Contexto de Autenticación Firebase para UTEM Ciberseguridad
 * 
 * Este contexto proporciona el estado de autenticación global y funciones
 * para manejar login, logout y verificación de permisos.
 * 
 * Para implementar Firebase Auth:
 * 1. Instalar: npm install firebase
 * 2. Configurar Firebase en /firebase/config.js
 * 3. Implementar los métodos comentados con Firebase Auth SDK
 * 
 * Endpoints Firebase utilizados:
 * - signInWithEmailAndPassword()
 * - signOut()
 * - onAuthStateChanged()
 * - sendPasswordResetEmail()
 * - updateProfile()
 */

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  department: string;
  lastLogin: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implementar listener de Firebase Auth
    // import { onAuthStateChanged } from 'firebase/auth';
    // import { auth } from '../../firebase/config';
    // import { doc, getDoc } from 'firebase/firestore';
    // import { db } from '../../firebase/config';
    // 
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //   if (firebaseUser) {
    //     // Obtener datos adicionales del usuario desde Firestore
    //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    //     const userData = userDoc.data();
    //     
    //     setUser({
    //       uid: firebaseUser.uid,
    //       email: firebaseUser.email || '',
    //       displayName: firebaseUser.displayName || userData?.displayName || 'Usuario UTEM',
    //       role: userData?.role || 'user',
    //       department: userData?.department || 'Sin asignar',
    //       lastLogin: new Date().toISOString(),
    //       permissions: userData?.permissions || []
    //     });
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });
    // 
    // return unsubscribe;

    // Simulación para desarrollo
    const checkAuthState = () => {
      const savedUser = localStorage.getItem('utem-user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('utem-user');
        }
      }
      setLoading(false);
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // TODO: Implementar login con Firebase
      // import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
      // import { auth } from '../../firebase/config';
      // import { doc, setDoc, getDoc } from 'firebase/firestore';
      // import { db } from '../../firebase/config';
      // 
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // const firebaseUser = userCredential.user;
      // 
      // // Actualizar último login en Firestore
      // await setDoc(doc(db, 'users', firebaseUser.uid), {
      //   lastLogin: new Date().toISOString(),
      //   email: firebaseUser.email
      // }, { merge: true });

      // Simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        uid: 'demo-user-123',
        email,
        displayName: 'Usuario Demo UTEM',
        role: 'admin',
        department: 'Ciberseguridad',
        lastLogin: new Date().toISOString(),
        permissions: ['read', 'write', 'admin', 'delete']
      };

      setUser(userData);
      localStorage.setItem('utem-user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
      // TODO: Implementar Google Sign-In con Firebase
      // import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
      // import { auth } from '../../firebase/config';
      // import { doc, setDoc, getDoc } from 'firebase/firestore';
      // import { db } from '../../firebase/config';
      // 
      // const provider = new GoogleAuthProvider();
      // provider.addScope('email');
      // provider.addScope('profile');
      // 
      // // Configurar parámetros adicionales para Google
      // provider.setCustomParameters({
      //   'hd': 'utem.cl', // Restricción a dominio UTEM (opcional)
      //   'prompt': 'select_account'
      // });
      // 
      // const result = await signInWithPopup(auth, provider);
      // const firebaseUser = result.user;
      // 
      // // Verificar dominio del email (opcional para mayor seguridad)
      // if (firebaseUser.email && !firebaseUser.email.endsWith('@utem.cl')) {
      //   throw new Error('UTEM_DOMAIN_REQUIRED');
      // }
      // 
      // // Actualizar información del usuario en Firestore
      // await setDoc(doc(db, 'users', firebaseUser.uid), {
      //   lastLogin: new Date().toISOString(),
      //   email: firebaseUser.email,
      //   displayName: firebaseUser.displayName,
      //   provider: 'google'
      // }, { merge: true });

      // Simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        uid: 'google-user-456',
        email: 'usuario.google@utem.cl',
        displayName: 'Usuario Google UTEM',
        role: 'user',
        department: 'Ciberseguridad',
        lastLogin: new Date().toISOString(),
        permissions: ['read', 'write']
      };

      setUser(userData);
      localStorage.setItem('utem-user', JSON.stringify(userData));
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // TODO: Implementar logout con Firebase
      // import { signOut } from 'firebase/auth';
      // import { auth } from '../../firebase/config';
      // 
      // await signOut(auth);

      // Simulación para desarrollo
      setUser(null);
      localStorage.removeItem('utem-user');
    } catch (error) {
      console.error('Error durante logout:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      // TODO: Implementar reset de contraseña con Firebase
      // import { sendPasswordResetEmail } from 'firebase/auth';
      // import { auth } from '../../firebase/config';
      // 
      // await sendPasswordResetEmail(auth, email);

      // Simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Correo de recuperación enviado a: ${email}`);
    } catch (error) {
      console.error('Error al enviar email de recuperación:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No hay usuario autenticado');

    try {
      // TODO: Implementar actualización de perfil con Firebase
      // import { updateProfile } from 'firebase/auth';
      // import { auth } from '../../firebase/config';
      // import { doc, updateDoc } from 'firebase/firestore';
      // import { db } from '../../firebase/config';
      // 
      // if (data.displayName && auth.currentUser) {
      //   await updateProfile(auth.currentUser, {
      //     displayName: data.displayName
      //   });
      // }
      // 
      // await updateDoc(doc(db, 'users', user.uid), {
      //   ...data,
      //   updatedAt: new Date().toISOString()
      // });

      // Simulación para desarrollo
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('utem-user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) || false;
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin' || hasPermission('admin');
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    hasPermission,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}