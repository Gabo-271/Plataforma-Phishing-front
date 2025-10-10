import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  Mail, 
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';

export function CreateCampaign() {
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    targetGroup: '',
    template: '',
    sendingProfile: '',
    launchTime: 'immediate'
  });

  const steps = [
    { id: 'basic', label: 'Información Básica', icon: Clock },
    { id: 'targets', label: 'Objetivos', icon: Users },
    { id: 'template', label: 'Plantilla', icon: Mail },
    { id: 'sending', label: 'Perfil de Envío', icon: Send },
    { id: 'review', label: 'Revisión y Aprobación', icon: CheckCircle }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Campaña</Label>
              <Input
                id="name"
                placeholder="Ej: Entrenamiento Phishing Q1 2024"
                value={campaignData.name}
                onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe el objetivo y contexto de esta campaña..."
                value={campaignData.description}
                onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                rows={4}
              />
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Asegúrate de que esta campaña esté aprobada por el equipo de RRHH y cumpla con las políticas de la empresa.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="targetGroup">Grupo de Objetivos</Label>
              <Select value={campaignData.targetGroup} onValueChange={(value: string) => 
                setCampaignData({ ...campaignData, targetGroup: value })
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un grupo de usuarios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-employees">Todos los Empleados (245 usuarios)</SelectItem>
                  <SelectItem value="executives">Ejecutivos (12 usuarios)</SelectItem>
                  <SelectItem value="it-department">Departamento IT (8 usuarios)</SelectItem>
                  <SelectItem value="hr-department">Recursos Humanos (6 usuarios)</SelectItem>
                  <SelectItem value="sales-team">Equipo de Ventas (45 usuarios)</SelectItem>
                  <SelectItem value="custom">Grupo Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {campaignData.targetGroup && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Resumen del Grupo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total usuarios:</span>
                      <span className="ml-2 font-medium">45</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Departamentos:</span>
                      <span className="ml-2 font-medium">3</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Último entrenamiento:</span>
                      <span className="ml-2 font-medium">3 meses atrás</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Nivel de riesgo:</span>
                      <Badge variant="secondary" className="ml-2">Medio</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="template">Plantilla de Email</Label>
              <Select value={campaignData.template} onValueChange={(value: string) => 
                setCampaignData({ ...campaignData, template: value })
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una plantilla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-notification">Notificación Bancaria</SelectItem>
                  <SelectItem value="security-alert">Alerta de Seguridad IT</SelectItem>
                  <SelectItem value="hr-benefits">Actualización de Beneficios RRHH</SelectItem>
                  <SelectItem value="policy-update">Actualización de Política</SelectItem>
                  <SelectItem value="custom">Plantilla Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {campaignData.template && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Vista Previa</CardTitle>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="w-4 h-4" />
                      Vista Completa
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="space-y-2 text-sm">
                      <div><strong>De:</strong> seguridad@empresa.com</div>
                      <div><strong>Asunto:</strong> Acción Requerida: Verificación de Cuenta</div>
                      <Separator className="my-3" />
                      <div className="space-y-2">
                        <p>Estimado/a {'{{FirstName}}'},</p>
                        <p>Hemos detectado actividad inusual en su cuenta. Por favor, haga clic en el enlace para verificar su identidad.</p>
                        <Button variant="destructive" size="sm">Verificar Cuenta</Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <Badge variant="outline">✓ Sin logos reales</Badge>
                    <Badge variant="outline">✓ Sin PII detectado</Badge>
                    <Badge variant="outline">⚠️ Nivel de dificultad: Medio</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="sendingProfile">Perfil de Envío</Label>
              <Select value={campaignData.sendingProfile} onValueChange={(value: string) => 
                setCampaignData({ ...campaignData, sendingProfile: value })
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un perfil SMTP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate-smtp">SMTP Corporativo</SelectItem>
                  <SelectItem value="external-test">Servidor de Pruebas Externo</SelectItem>
                  <SelectItem value="gmail-test">Gmail Test Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="launchTime">Programación de Envío</Label>
              <Select value={campaignData.launchTime} onValueChange={(value: string) => 
                setCampaignData({ ...campaignData, launchTime: value })
              }>
                <SelectTrigger>
                  <SelectValue placeholder="¿Cuándo enviar?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Enviar Inmediatamente</SelectItem>
                  <SelectItem value="scheduled">Programar Envío</SelectItem>
                  <SelectItem value="manual">Activación Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {campaignData.sendingProfile && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Configuración SMTP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Servidor:</span>
                      <span className="ml-2 font-medium">smtp.empresa.com</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Puerto:</span>
                      <span className="ml-2 font-medium">587</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Autenticación:</span>
                      <span className="ml-2 font-medium">STARTTLS</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Estado:</span>
                      <Badge variant="default" className="ml-2">Verificado</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de la Campaña</CardTitle>
                <CardDescription>
                  Revisa la configuración antes de enviar para aprobación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground text-sm">Nombre:</span>
                    <p className="font-medium">{campaignData.name || 'Sin nombre'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Grupo Objetivo:</span>
                    <p className="font-medium">{campaignData.targetGroup || 'No seleccionado'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Plantilla:</span>
                    <p className="font-medium">{campaignData.template || 'No seleccionada'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Perfil de Envío:</span>
                    <p className="font-medium">{campaignData.sendingProfile || 'No seleccionado'}</p>
                  </div>
                </div>
                
                <Separator />
                
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Esta campaña será enviada para aprobación al equipo de revisores. 
                    Recibirás una notificación cuando sea aprobada o rechazada.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver a Campañas
        </Button>
        <div>
          <h1>Nueva Campaña</h1>
          <p className="text-muted-foreground">
            Crea una nueva campaña de phishing educativo paso a paso
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Paso {currentStep + 1} de {steps.length}</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% completado
            </span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} />
          
          <div className="flex justify-between mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`text-xs text-center max-w-20 ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].label}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </Button>
        
        <Button 
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="gap-2"
        >
          {currentStep === steps.length - 1 ? 'Enviar para Aprobación' : 'Siguiente'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Dev Annotations */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">🔧 Anotaciones para Desarrolladores</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>GET /api/templates</strong> → Lista de plantillas disponibles</p>
          <p><strong>GET /api/groups</strong> → Grupos de usuarios/objetivos</p>
          <p><strong>GET /api/sending-profiles</strong> → Perfiles SMTP configurados</p>
          <p><strong>POST /api/campaigns</strong> → Crear campaña (requiere aprobación)</p>
          <p><strong>POST /api/campaigns/approval</strong> → Enviar para flujo de aprobación</p>
        </div>
      </div>
    </div>
  );
}