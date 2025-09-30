import { Loader2, AlertCircle, CheckCircle, InboxIcon } from 'lucide-react';
import { Alert, AlertDescription } from './alert';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({ message = 'Cargando...', size = 'md' }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary mb-4`} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorState({ 
  title = 'Error', 
  message = 'Algo salió mal. Por favor, inténtalo de nuevo.',
  onRetry,
  retryText = 'Reintentar'
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          {retryText}
        </Button>
      )}
    </div>
  );
}

interface SuccessStateProps {
  title?: string;
  message?: string;
  onAction?: () => void;
  actionText?: string;
}

export function SuccessState({ 
  title = 'Éxito', 
  message = 'La operación se completó correctamente.',
  onAction,
  actionText = 'Continuar'
}: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-green-700">{title}</h3>
        <p className="text-muted-foreground text-sm max-w-md">{message}</p>
      </div>
      {onAction && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  message?: string;
  onAction?: () => void;
  actionText?: string;
}

export function EmptyState({ 
  icon: Icon = InboxIcon,
  title = 'No hay datos', 
  message = 'No se encontraron elementos para mostrar.',
  onAction,
  actionText = 'Crear nuevo'
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm max-w-md">{message}</p>
      </div>
      {onAction && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

// Estado específico para campañas vacías
export function EmptyCampaignsState({ onCreateCampaign }: { onCreateCampaign?: () => void }) {
  return (
    <Card>
      <CardContent className="p-8">
        <EmptyState
          title="No hay campañas creadas"
          message="Comienza creando tu primera campaña de phishing educativo para entrenar a tu equipo."
          onAction={onCreateCampaign}
          actionText="Crear Primera Campaña"
        />
      </CardContent>
    </Card>
  );
}

// Estado de conexión API
interface ApiConnectionStateProps {
  isConnected: boolean;
  onTest?: () => void;
  service?: string;
}

export function ApiConnectionState({ isConnected, onTest, service = 'GoPhish' }: ApiConnectionStateProps) {
  return (
    <Alert variant={isConnected ? 'default' : 'destructive'}>
      {isConnected ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertDescription className="flex justify-between items-center">
        <span>
          {isConnected 
            ? `Conectado a ${service} correctamente` 
            : `No se pudo conectar a ${service}`
          }
        </span>
        {onTest && (
          <Button variant="outline" size="sm" onClick={onTest}>
            Probar Conexión
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}