import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Eye,
  Download,
  Trash2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Progress } from '../ui/progress';

interface Campaign {
  id: number;
  name: string;
  status: 'borrador' | 'activa' | 'pausada' | 'completada';
  targets: number;
  sent: number;
  opened: number;
  clicked: number;
  submitted: number;
  reported: number;
  created: string;
  lastActivity: string;
  template: string;
  sendingProfile: string;
}

export function CampaignList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaigns, setSelectedCampaigns] = useState<number[]>([]);

  // Mock data - En producción vendría de la API
  const campaigns: Campaign[] = [
    {
      id: 1,
      name: "Campaña de Phishing - Q1 2024",
      status: "activa",
      targets: 45,
      sent: 45,
      opened: 23,
      clicked: 8,
      submitted: 2,
      reported: 3,
      created: "2024-01-15T10:00:00Z",
      lastActivity: "2024-01-20T14:30:00Z",
      template: "Notificación Bancaria",
      sendingProfile: "SMTP Corporativo"
    },
    {
      id: 2,
      name: "Entrenamiento Ejecutivos",
      status: "completada",
      targets: 12,
      sent: 12,
      opened: 11,
      clicked: 4,
      submitted: 1,
      reported: 2,
      created: "2024-01-10T09:00:00Z",
      lastActivity: "2024-01-18T16:45:00Z",
      template: "Actualización de Política",
      sendingProfile: "SMTP Ejecutivos"
    },
    {
      id: 3,
      name: "Test Departamento IT",
      status: "borrador",
      targets: 8,
      sent: 0,
      opened: 0,
      clicked: 0,
      submitted: 0,
      reported: 0,
      created: "2024-01-20T11:30:00Z",
      lastActivity: "2024-01-20T11:30:00Z",
      template: "Alerta de Seguridad",
      sendingProfile: "SMTP IT"
    },
    {
      id: 4,
      name: "Simulacro Recursos Humanos",
      status: "pausada",
      targets: 25,
      sent: 25,
      opened: 18,
      clicked: 6,
      submitted: 1,
      reported: 4,
      created: "2024-01-12T14:00:00Z",
      lastActivity: "2024-01-19T10:15:00Z",
      template: "Beneficios Empleados",
      sendingProfile: "SMTP RRHH"
    }
  ];

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      'borrador': 'outline',
      'activa': 'default',
      'pausada': 'secondary',
      'completada': 'secondary'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  const calculateRate = (numerator: number, denominator: number) => {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Campañas</h1>
          <p className="text-muted-foreground">
            Gestiona y monitorea tus campañas de phishing educativo
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nueva Campaña
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar campañas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Campañas</CardTitle>
          <CardDescription>
            {filteredCampaigns.length} campaña(s) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Objetivos</TableHead>
                <TableHead>Enviados</TableHead>
                <TableHead>Tasa Apertura</TableHead>
                <TableHead>Tasa Clics</TableHead>
                <TableHead>Reportados</TableHead>
                <TableHead>Última Actividad</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">{campaign.template}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(campaign.status)}
                  </TableCell>
                  <TableCell>{campaign.targets}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{campaign.sent}</span>
                      {campaign.targets > 0 && (
                        <div className="w-20">
                          <Progress value={calculateRate(campaign.sent, campaign.targets)} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{calculateRate(campaign.opened, campaign.sent)}%</span>
                      <span className="text-muted-foreground text-sm">
                        ({campaign.opened})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{calculateRate(campaign.clicked, campaign.sent)}%</span>
                      <span className="text-muted-foreground text-sm">
                        ({campaign.clicked})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{campaign.reported}</span>
                      <span className="text-muted-foreground text-sm">
                        ({calculateRate(campaign.reported, campaign.sent)}%)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(campaign.lastActivity).toLocaleDateString('es-CL')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </DropdownMenuItem>
                        {campaign.status === 'activa' ? (
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" />
                            Pausar
                          </DropdownMenuItem>
                        ) : campaign.status === 'pausada' ? (
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Reanudar
                          </DropdownMenuItem>
                        ) : campaign.status === 'borrador' ? (
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Iniciar
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Resultados
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dev Annotations */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">🔧 Anotaciones para Desarrolladores</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>GET /api/campaigns</strong> → Lista de campañas con filtros</p>
          <p><strong>POST /api/campaigns</strong> → Crear nueva campaña (proxy a GoPhish)</p>
          <p><strong>PUT /api/campaigns/{'{id}'}/status</strong> → Cambiar estado (start/pause/stop)</p>
          <p><strong>GET /api/campaigns/{'{id}'}/events</strong> → Eventos en tiempo real desde GoPhish</p>
          <p><strong>DELETE /api/campaigns/{'{id}'}</strong> → Eliminar campaña</p>
        </div>
      </div>
    </div>
  );
}