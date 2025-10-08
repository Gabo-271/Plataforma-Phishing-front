import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Mail, 
  MousePointer, 
  AlertTriangle,
  Clock,
  Target,
  Plus,
  BarChart3
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export function Dashboard() {
  // Mock data - En producción vendría de la API
  const kpiData = {
    totalCampaigns: 12,
    activeCampaigns: 3,
    totalTargets: 245,
    emailsSent: 1840,
    opened: 892,
    clicked: 156,
    submitted: 23,
    reported: 67,
    avgTimeToReport: "4.2h"
  };

  const campaigns = [
    {
      id: 1,
      name: "Campaña de Phishing - Q1 2024",
      status: "activa",
      targets: 45,
      sent: 45,
      opened: 23,
      clicked: 8,
      reported: 3,
      created: "2024-01-15"
    },
    {
      id: 2,
      name: "Entrenamiento Ejecutivos",
      status: "completada",
      targets: 12,
      sent: 12,
      opened: 11,
      clicked: 4,
      reported: 2,
      created: "2024-01-10"
    },
    {
      id: 3,
      name: "Test Departamento IT",
      status: "borrador",
      targets: 8,
      sent: 0,
      opened: 0,
      clicked: 0,
      reported: 0,
      created: "2024-01-20"
    }
  ];

  const calculateRate = (numerator: number, denominator: number) => {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-xl sm:text-2xl">Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Resumen de actividad y métricas de campañas de phishing educativo
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Nueva Campaña
        </Button>
      </div>

      {/* Alert */}
      {kpiData.activeCampaigns === 0 && (
        <Alert>
          <Target className="h-4 w-4" />
          <AlertDescription>
            No hay campañas creadas aún. ¡Creemos una!
          </AlertDescription>
        </Alert>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Emails Enviados */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Emails Enviados</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.emailsSent.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% desde el mes pasado
            </div>
          </CardContent>
        </Card>

        {/* Tasa de Apertura */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tasa de Apertura</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateRate(kpiData.opened, kpiData.emailsSent)}%</div>
            <Progress value={calculateRate(kpiData.opened, kpiData.emailsSent)} className="mt-2" />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {kpiData.opened} de {kpiData.emailsSent} emails
            </div>
          </CardContent>
        </Card>

        {/* Tasa de Clics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tasa de Clics</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateRate(kpiData.clicked, kpiData.emailsSent)}%</div>
            <Progress value={calculateRate(kpiData.clicked, kpiData.emailsSent)} className="mt-2" />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {kpiData.clicked} de {kpiData.emailsSent} emails
            </div>
          </CardContent>
        </Card>

        {/* Tasa de Reporte */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Tasa de Reporte</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateRate(kpiData.reported, kpiData.emailsSent)}%</div>
            <Progress value={calculateRate(kpiData.reported, kpiData.emailsSent)} className="mt-2" />
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="w-3 h-3 mr-1" />
              Promedio: {kpiData.avgTimeToReport}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Campañas Recientes</CardTitle>
          <CardDescription>
            Estado y rendimiento de las últimas campañas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h4 className="font-medium text-sm sm:text-base">{campaign.name}</h4>
                    <Badge variant={
                      campaign.status === 'activa' ? 'default' :
                      campaign.status === 'completada' ? 'secondary' :
                      'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {campaign.targets} objetivos • Creada el {new Date(campaign.created).toLocaleDateString('es-CL')}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:gap-6 text-sm">
                  <div className="flex gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="font-medium">{campaign.opened}</div>
                      <div className="text-muted-foreground text-xs">Aperturas</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{campaign.clicked}</div>
                      <div className="text-muted-foreground text-xs">Clics</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{campaign.reported}</div>
                      <div className="text-muted-foreground text-xs">Reportes</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-2 sm:ml-0">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dev Annotations */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">🔧 Anotaciones para Desarrolladores</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>GET /api/campaigns/stats</strong> → Obtener estadísticas del dashboard</p>
          <p><strong>GET /api/campaigns?limit=5&sort=created_at</strong> → Campañas recientes</p>
          <p><strong>GET /api/campaigns/{'{id}'}/events</strong> → Importar eventos desde GoPhish</p>
        </div>
      </div>
    </div>
  );
}