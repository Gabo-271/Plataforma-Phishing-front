import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Progress } from './progress';
import { Badge } from './badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  progress?: {
    value: number;
    max?: number;
    label?: string;
  };
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  className?: string;
}

export function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  progress,
  badge,
  className
}: KpiCardProps) {
  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return TrendingUp;
      case 'down':
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {badge && (
            <Badge variant={badge.variant}>{badge.text}</Badge>
          )}
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {progress && (
          <div className="mt-2 space-y-1">
            <Progress value={progress.value} className="h-2" />
            {progress.label && (
              <p className="text-xs text-muted-foreground">{progress.label}</p>
            )}
          </div>
        )}
        
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${getTrendColor(trend.direction)}`}>
            {React.createElement(getTrendIcon(trend.direction), { className: 'w-3 h-3 mr-1' })}
            <span>{trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}</span>
          </div>
        )}
        
        {description && !trend && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

// Variantes específicas para el dominio de phishing
export function EmailsSentKpiCard({ value, total }: { value: number; total: number }) {
  return (
    <KpiCard
      title="Emails Enviados"
      value={value.toLocaleString()}
      progress={{
        value: total > 0 ? (value / total) * 100 : 0,
        label: `${value} de ${total} objetivos`
      }}
      trend={{
        value: 12,
        label: 'desde el mes pasado',
        direction: 'up'
      }}
    />
  );
}

export function OpenRateKpiCard({ opened, sent }: { opened: number; sent: number }) {
  const rate = sent > 0 ? Math.round((opened / sent) * 100) : 0;
  
  return (
    <KpiCard
      title="Tasa de Apertura"
      value={`${rate}%`}
      progress={{
        value: rate,
        label: `${opened} de ${sent} emails`
      }}
      badge={{
        text: rate > 70 ? 'Alto' : rate > 40 ? 'Medio' : 'Bajo',
        variant: rate > 70 ? 'destructive' : rate > 40 ? 'secondary' : 'default'
      }}
    />
  );
}

export function ClickRateKpiCard({ clicked, sent }: { clicked: number; sent: number }) {
  const rate = sent > 0 ? Math.round((clicked / sent) * 100) : 0;
  
  return (
    <KpiCard
      title="Tasa de Clics"
      value={`${rate}%`}
      progress={{
        value: rate,
        label: `${clicked} de ${sent} emails`
      }}
      badge={{
        text: rate > 10 ? 'Crítico' : rate > 5 ? 'Alto' : 'Aceptable',
        variant: rate > 10 ? 'destructive' : rate > 5 ? 'secondary' : 'default'
      }}
    />
  );
}

export function ReportRateKpiCard({ reported, sent, avgTime }: { reported: number; sent: number; avgTime?: string }) {
  const rate = sent > 0 ? Math.round((reported / sent) * 100) : 0;
  
  return (
    <KpiCard
      title="Tasa de Reporte"
      value={`${rate}%`}
      description={avgTime ? `Tiempo promedio: ${avgTime}` : undefined}
      progress={{
        value: rate,
        label: `${reported} usuarios reportaron`
      }}
      badge={{
        text: rate > 15 ? 'Excelente' : rate > 5 ? 'Bueno' : 'Mejorable',
        variant: rate > 15 ? 'default' : rate > 5 ? 'secondary' : 'outline'
      }}
    />
  );
}