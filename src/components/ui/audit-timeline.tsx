import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Avatar, AvatarFallback } from './avatar';
import { 
  Mail, 
  MousePointer, 
  Eye, 
  Flag, 
  Clock,
  CheckCircle,
  XCircle,
  User,
  Send,
  AlertTriangle
} from 'lucide-react';

interface AuditEvent {
  id: string;
  type: 'email_sent' | 'email_opened' | 'link_clicked' | 'data_submitted' | 'reported' | 'completed_training' | 'campaign_created' | 'campaign_approved' | 'campaign_started' | 'campaign_completed';
  timestamp: string;
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  details?: string;
  metadata?: Record<string, any>;
}

interface AuditTimelineProps {
  events: AuditEvent[];
  className?: string;
  showUserInfo?: boolean;
  maxEvents?: number;
}

export function AuditTimeline({ 
  events, 
  className, 
  showUserInfo = true, 
  maxEvents 
}: AuditTimelineProps) {
  const displayEvents = maxEvents ? events.slice(0, maxEvents) : events;

  const getEventIcon = (type: AuditEvent['type']) => {
    switch (type) {
      case 'email_sent':
        return Send;
      case 'email_opened':
        return Eye;
      case 'link_clicked':
        return MousePointer;
      case 'data_submitted':
        return AlertTriangle;
      case 'reported':
        return Flag;
      case 'completed_training':
        return CheckCircle;
      case 'campaign_created':
        return Mail;
      case 'campaign_approved':
        return CheckCircle;
      case 'campaign_started':
        return Send;
      case 'campaign_completed':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const getEventColor = (type: AuditEvent['type']) => {
    switch (type) {
      case 'email_sent':
      case 'campaign_started':
        return 'text-blue-600 bg-blue-100';
      case 'email_opened':
        return 'text-yellow-600 bg-yellow-100';
      case 'link_clicked':
      case 'data_submitted':
        return 'text-red-600 bg-red-100';
      case 'reported':
      case 'completed_training':
      case 'campaign_approved':
      case 'campaign_completed':
        return 'text-green-600 bg-green-100';
      case 'campaign_created':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTitle = (type: AuditEvent['type']) => {
    switch (type) {
      case 'email_sent':
        return 'Email enviado';
      case 'email_opened':
        return 'Email abierto';
      case 'link_clicked':
        return 'Enlace clickeado';
      case 'data_submitted':
        return 'Datos enviados';
      case 'reported':
        return 'Phishing reportado';
      case 'completed_training':
        return 'Entrenamiento completado';
      case 'campaign_created':
        return 'Campaña creada';
      case 'campaign_approved':
        return 'Campaña aprobada';
      case 'campaign_started':
        return 'Campaña iniciada';
      case 'campaign_completed':
        return 'Campaña completada';
      default:
        return 'Evento';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Hace menos de 1 minuto';
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-CL', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Línea de Tiempo</CardTitle>
        <CardDescription>
          Historial de eventos y actividad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayEvents.map((event, index) => {
            const Icon = getEventIcon(event.type);
            const isLast = index === displayEvents.length - 1;

            return (
              <div key={event.id} className="flex gap-4">
                {/* Icon and line */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getEventColor(event.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isLast && (
                    <div className="w-px h-8 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{getEventTitle(event.type)}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(event.timestamp)}
                    </span>
                  </div>

                  {event.details && (
                    <p className="text-sm text-muted-foreground">{event.details}</p>
                  )}

                  {showUserInfo && event.user && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {event.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{event.user.name}</span>
                        <span>•</span>
                        <span>{event.user.email}</span>
                      </div>
                    </div>
                  )}

                  {event.metadata && (
                    <div className="flex gap-2 mt-2">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          {key}: {String(value)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {displayEvents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No hay eventos registrados</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente específico para eventos de campaña
export function CampaignTimeline({ campaignId }: { campaignId: string }) {
  // Mock data - en producción vendría de la API
  const events: AuditEvent[] = [
    {
      id: '1',
      type: 'campaign_completed',
      timestamp: '2024-01-20T16:30:00Z',
      details: 'Campaña finalizada automáticamente'
    },
    {
      id: '2',
      type: 'completed_training',
      timestamp: '2024-01-20T14:45:00Z',
      user: {
        name: 'María González',
        email: 'maria@empresa.com',
        initials: 'MG'
      },
      details: 'Completó el módulo educativo en 1:23 min'
    },
    {
      id: '3',
      type: 'reported',
      timestamp: '2024-01-20T10:15:00Z',
      user: {
        name: 'Carlos Ruiz',
        email: 'carlos@empresa.com',
        initials: 'CR'
      },
      details: 'Reportó el email como phishing'
    },
    {
      id: '4',
      type: 'link_clicked',
      timestamp: '2024-01-19T15:30:00Z',
      user: {
        name: 'Ana Pérez',
        email: 'ana@empresa.com',
        initials: 'AP'
      },
      details: 'Hizo clic en el enlace de phishing',
      metadata: {
        'IP': '192.168.1.100',
        'User Agent': 'Chrome/119.0'
      }
    },
    {
      id: '5',
      type: 'email_opened',
      timestamp: '2024-01-19T09:45:00Z',
      user: {
        name: 'Juan López',
        email: 'juan@empresa.com',
        initials: 'JL'
      },
      details: 'Abrió el email de phishing'
    },
    {
      id: '6',
      type: 'campaign_started',
      timestamp: '2024-01-15T10:00:00Z',
      details: 'Campaña iniciada - 45 emails enviados'
    },
    {
      id: '7',
      type: 'campaign_approved',
      timestamp: '2024-01-14T16:00:00Z',
      user: {
        name: 'Supervisor RRHH',
        email: 'supervisor@empresa.com',
        initials: 'SH'
      },
      details: 'Campaña aprobada para ejecución'
    },
    {
      id: '8',
      type: 'campaign_created',
      timestamp: '2024-01-14T14:00:00Z',
      user: {
        name: 'Admin Sistema',
        email: 'admin@empresa.com',
        initials: 'AS'
      },
      details: 'Campaña creada y enviada para aprobación'
    }
  ];

  return <AuditTimeline events={events} />;
}