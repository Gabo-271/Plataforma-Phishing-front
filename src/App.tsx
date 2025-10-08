import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { CampaignList } from './components/campaigns/CampaignList';
import { CreateCampaign } from './components/campaigns/CreateCampaign';
import { TemplateEditor } from './components/templates/TemplateEditor';
import { Settings } from './components/settings/Settings';
import { LandingPage } from './components/landing/LandingPage';
import { Login } from './components/auth/Login';

/**
 * Aplicación principal con sistema de autenticación Firebase
 * 
 * Configuración Firebase requerida en /firebase/config.js:
 * 
 * import { initializeApp } from 'firebase/app';
 * import { getAuth } from 'firebase/auth';
 * 
 * const firebaseConfig = {
 *   apiKey: "tu-api-key",
 *   authDomain: "utem-ciberseguridad.firebaseapp.com",
 *   projectId: "utem-ciberseguridad",
 *   storageBucket: "utem-ciberseguridad.appspot.com",
 *   messagingSenderId: "123456789",
 *   appId: "1:123456789:web:abcdef123456"
 * };
 * 
 * const app = initializeApp(firebaseConfig);
 * export const auth = getAuth(app);
 */

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  department: string;
  lastLogin: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Simulación de verificación de autenticación al cargar la app
  useEffect(() => {
    const checkAuthState = () => {
      // TODO: Implementar Firebase Auth state listener
      // import { onAuthStateChanged } from 'firebase/auth';
      // import { auth } from './firebase/config';
      // 
      // const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      //   if (firebaseUser) {
      //     setUser({
      //       uid: firebaseUser.uid,
      //       email: firebaseUser.email || '',
      //       displayName: firebaseUser.displayName || 'Usuario UTEM',
      //       role: 'admin', // Obtener de Firestore o custom claims
      //       department: 'Ciberseguridad',
      //       lastLogin: new Date().toISOString()
      //     });
      //   } else {
      //     setUser(null);
      //   }
      //   setAuthLoading(false);
      // });
      // 
      // return unsubscribe;

      // Simulación para desarrollo - verificar localStorage
      const savedUser = localStorage.getItem('utem-user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('utem-user');
        }
      }
      setAuthLoading(false);
    };

    checkAuthState();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    // Guardar en localStorage para persistencia de desarrollo
    localStorage.setItem('utem-user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    // TODO: Implementar Firebase signOut
    // import { signOut } from 'firebase/auth';
    // import { auth } from './firebase/config';
    // 
    // signOut(auth).then(() => {
    //   setUser(null);
    //   localStorage.removeItem('utem-user');
    // });

    // Simulación para desarrollo
    setUser(null);
    localStorage.removeItem('utem-user');
    setCurrentPage('dashboard');
  };

  // Simulación de diferentes vistas basadas en URL params
  const urlParams = new URLSearchParams(window.location.search);
  const isLandingPage = urlParams.get('landing') === 'true';
  
  if (isLandingPage) {
    return <LandingPage campaignId={urlParams.get('c') || 'demo'} userId={urlParams.get('u') || 'demo'} />;
  }

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar login si no hay usuario autenticado
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderMainContent = () => {
    if (currentPage === 'campaigns' && isCreatingCampaign) {
      return <CreateCampaign />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return <CampaignList />;
      case 'detection':
        return (
          <div className="p-6">
            <h1>Módulo de Detección</h1>
            <p className="text-muted-foreground mt-2">
              Sistema avanzado de detección y análisis de amenazas en desarrollo...
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">🛡️ Funcionalidades Planificadas</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Detección automática de emails de phishing</li>
                <li>• Análisis de URLs maliciosas en tiempo real</li>
                <li>• Monitoreo de dominios sospechosos</li>
                <li>• Alertas tempranas de amenazas</li>
                <li>• Dashboard de inteligencia de amenazas</li>
                <li>• Integración con feeds de amenazas externos</li>
                <li>• Análisis de reputación de remitentes</li>
                <li>• Sistema de scoring de riesgo</li>
              </ul>
            </div>
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <h3 className="font-medium mb-2 text-accent-foreground">📊 Endpoints de API</h3>
              <ul className="text-sm text-muted-foreground space-y-1 font-mono">
                <li>• POST /api/detection/analyze-email</li>
                <li>• GET /api/detection/threats/&#123;id&#125;</li>
                <li>• POST /api/detection/url-scan</li>
                <li>• GET /api/detection/dashboard</li>
                <li>• POST /api/detection/threat-feed</li>
              </ul>
            </div>
          </div>
        );
      case 'templates':
        return <TemplateEditor />;
      case 'settings':
      case 'account':
        return <Settings />;
      case 'users':
        return (
          <div className="p-6">
            <h1>Usuarios y Grupos</h1>
            <p className="text-muted-foreground mt-2">
              Módulo de gestión de usuarios en desarrollo...
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">🔧 Funcionalidades Planificadas</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Crear y gestionar grupos de usuarios</li>
                <li>• Importar usuarios desde CSV/LDAP</li>
                <li>• Asignar roles y permisos</li>
                <li>• Historial de participación en campañas</li>
              </ul>
            </div>
          </div>
        );
      case 'landing':
        return (
          <div className="p-6">
            <h1>Páginas de Destino</h1>
            <p className="text-muted-foreground mt-2">
              Editor de landing pages educativas en desarrollo...
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">🔧 Funcionalidades Planificadas</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Editor visual de landing pages</li>
                <li>• Plantillas de páginas educativas</li>
                <li>• Captura de credenciales (para entrenamiento)</li>
                <li>• Métricas de interacción</li>
              </ul>
            </div>
          </div>
        );
      case 'sending':
        return (
          <div className="p-6">
            <h1>Perfiles de Envío</h1>
            <p className="text-muted-foreground mt-2">
              Gestión avanzada de perfiles SMTP en desarrollo...
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">🔧 Funcionalidades Planificadas</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Configuración detallada de SMTP</li>
                <li>• Pruebas de entregabilidad</li>
                <li>• Monitoreo de reputación</li>
                <li>• Rotación automática de servidores</li>
              </ul>
            </div>
          </div>
        );
      case 'management':
        return (
          <div className="p-6">
            <h1>Gestión de Usuarios</h1>
            <p className="text-muted-foreground mt-2">
              Panel administrativo en desarrollo...
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">🔧 Funcionalidades Planificadas</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Gestión de roles: autor, revisor, aprobador, admin</li>
                <li>• Flujo de aprobaciones pendientes</li>
                <li>• Auditoria de acciones</li>
                <li>• Configuración de permisos granulares</li>
              </ul>
            </div>
          </div>
        );
      case 'webhooks':
        return (
          <div className="p-6">
            <h1>Webhooks</h1>
            <p className="text-muted-foreground mt-2">
              Configuración de webhooks y integraciones en desarrollo...
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">🔧 Funcionalidades Planificadas</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Webhooks para eventos de campaña</li>
                <li>• Integración con Slack/Teams</li>
                <li>• Notificaciones en tiempo real</li>
                <li>• API para sistemas externos</li>
              </ul>
            </div>
          </div>
        );
      case 'guide':
        return (
          <div className="p-6">
            <h1>Guía de Usuario</h1>
            <p className="text-muted-foreground mt-2">
              Documentación y tutoriales en desarrollo...
            </p>
          </div>
        );
      case 'api':
        return (
          <div className="p-6">
            <h1>Documentación API</h1>
            <p className="text-muted-foreground mt-2">
              Referencia completa de la API en desarrollo...
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderMainContent()}
      </main>
    </div>
  );
}