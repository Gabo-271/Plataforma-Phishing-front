import { useState } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  Mail, 
  Globe, 
  Send, 
  Settings, 
  UserCheck, 
  Webhook,
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'campaigns', icon: Target, label: 'Campañas' },
    { id: 'detection', icon: Shield, label: 'Detección' },
    { id: 'users', icon: Users, label: 'Usuarios y Grupos' },
    { id: 'templates', icon: Mail, label: 'Plantillas de Email' },
    { id: 'landing', icon: Globe, label: 'Páginas de Destino' },
    { id: 'sending', icon: Send, label: 'Perfiles de Envío' },
    { id: 'account', icon: Settings, label: 'Configuración de Cuenta' },
  ];

  const adminItems = [
    { id: 'management', icon: UserCheck, label: 'Gestión de Usuarios', badge: 'Admin' },
    { id: 'webhooks', icon: Webhook, label: 'Webhooks', badge: 'Admin' },
  ];

  const helpItems = [
    { id: 'guide', icon: BookOpen, label: 'Guía de Usuario' },
    { id: 'api', icon: FileText, label: 'Documentación API' },
  ];

  return (
    <div className={`bg-primary text-primary-foreground transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-primary-foreground/20 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">UTEM</span>
              <span className="text-xs text-primary-foreground/70">Ciberseguridad</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-primary-foreground hover:bg-primary-foreground/20 p-1.5"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-sm">A</span>
            </div>
            <div>
              <p className="text-sm">admin</p>
              <p className="text-xs text-primary-foreground/70">en línea</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* Main Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 text-left h-10 ${
                currentPage === item.id 
                  ? "bg-secondary text-white" 
                  : "text-primary-foreground hover:bg-primary-foreground/20"
              } ${isCollapsed ? 'px-2' : 'px-3'}`}
              onClick={() => onPageChange(item.id)}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Button>
          ))}
        </div>

        {/* Admin Section */}
        {!isCollapsed && (
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70 px-3 mb-2">
              Administración
            </p>
            {adminItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 text-left h-10 ${
                  currentPage === item.id 
                    ? "bg-secondary text-white" 
                    : "text-primary-foreground hover:bg-primary-foreground/20"
                } px-3`}
                onClick={() => onPageChange(item.id)}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate flex-1">{item.label}</span>
                <Badge variant="outline" className="text-xs border-primary-foreground/30 text-primary-foreground/70">
                  {item.badge}
                </Badge>
              </Button>
            ))}
          </div>
        )}

        {/* Help Section */}
        {!isCollapsed && (
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-primary-foreground/70 px-3 mb-2">
              Ayuda
            </p>
            {helpItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 text-left h-10 ${
                  currentPage === item.id 
                    ? "bg-secondary text-white" 
                    : "text-primary-foreground hover:bg-primary-foreground/20"
                } px-3`}
                onClick={() => onPageChange(item.id)}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Button>
            ))}
          </div>
        )}
      </nav>

      {/* Version */}
      {!isCollapsed && (
        <div className="p-4 border-t border-primary-foreground/20 text-xs text-primary-foreground/70">
          https://127.0.0.15333/landing_pages
        </div>
      )}
    </div>
  );
}