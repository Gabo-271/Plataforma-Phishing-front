import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Eye, 
  Code, 
  Save, 
  AlertTriangle, 
  CheckCircle, 
  X,
  Upload,
  Download,
  RefreshCw
} from 'lucide-react';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

export function TemplateEditor() {
  const [template, setTemplate] = useState({
    name: 'Notificación Bancaria',
    subject: 'Acción Requerida: Verificación de Cuenta',
    fromEmail: 'seguridad@banco-ejemplo.com',
    fromName: 'Centro de Seguridad',
    htmlContent: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Verificación de Cuenta</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0F4C81; margin-top: 0;">Centro de Seguridad Bancaria</h2>
        </div>
        
        <p>Estimado/a {{.FirstName}},</p>
        
        <p>Hemos detectado actividad inusual en su cuenta terminada en {{.LastFour}}. Por su seguridad, necesitamos que verifique su identidad.</p>
        
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <strong>⚠️ Acción requerida en las próximas 24 horas</strong>
        </div>
        
        <p>Para mantener su cuenta segura, haga clic en el siguiente enlace:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{.URL}}" style="background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verificar Mi Cuenta
            </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
            Si no reconoce esta actividad, contacte inmediatamente a nuestro centro de atención al cliente.
        </p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        
        <p style="font-size: 12px; color: #999;">
            Este es un email automatizado. Por favor no responda a este mensaje.
        </p>
    </div>
</body>
</html>`,
    textContent: `Estimado/a {{.FirstName}},

Hemos detectado actividad inusual en su cuenta terminada en {{.LastFour}}. Por su seguridad, necesitamos que verifique su identidad.

ACCIÓN REQUERIDA EN LAS PRÓXIMAS 24 HORAS

Para mantener su cuenta segura, visite el siguiente enlace:
{{.URL}}

Si no reconoce esta actividad, contacte inmediatamente a nuestro centro de atención al cliente.

Este es un email automatizado. Por favor no responda a este mensaje.`
  });

  const [validationResults, setValidationResults] = useState([
    { type: 'warning', message: 'Detectado texto que simula urgencia ("24 horas")' },
    { type: 'success', message: 'No se detectaron logos reales de marcas' },
    { type: 'success', message: 'No se detectó información personal identificable' },
    { type: 'info', message: 'Plantilla usa variables de personalización apropiadas' }
  ]);

  const [activeTab, setActiveTab] = useState('wysiwyg');

  const validateTemplate = () => {
    // Simulación de validación - en producción sería una llamada a API
    setValidationResults([
      { type: 'success', message: 'Validación completa: Plantilla segura para uso educativo' },
      { type: 'success', message: 'No se detectaron logos reales de marcas' },
      { type: 'success', message: 'No se detectó información personal identificable' },
      { type: 'info', message: 'Nivel de dificultad: Medio - Apropiado para entrenamiento' }
    ]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Editor de Plantillas</h1>
          <p className="text-muted-foreground">
            Crea y edita plantillas de email para campañas de phishing educativo
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Importar
          </Button>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Guardar Plantilla
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Template Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Plantilla</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Nombre de Plantilla</Label>
                  <Input
                    id="templateName"
                    value={template.name}
                    onChange={(e) => setTemplate({ ...template, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto del Email</Label>
                  <Input
                    id="subject"
                    value={template.subject}
                    onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName">Nombre del Remitente</Label>
                  <Input
                    id="fromName"
                    value={template.fromName}
                    onChange={(e) => setTemplate({ ...template, fromName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Email del Remitente</Label>
                  <Input
                    id="fromEmail"
                    value={template.fromEmail}
                    onChange={(e) => setTemplate({ ...template, fromEmail: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Contenido del Email</CardTitle>
                <Button variant="outline" size="sm" onClick={validateTemplate} className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Validar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="wysiwyg">WYSIWYG</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="text">Texto Plano</TabsTrigger>
                </TabsList>
                
                <TabsContent value="wysiwyg" className="mt-4">
                  <div className="border rounded-lg p-4 min-h-[400px] bg-background">
                    <div className="prose max-w-none">
                      <div className="bg-muted p-4 rounded-md mb-4">
                        <h3 className="text-primary m-0">Centro de Seguridad Bancaria</h3>
                      </div>
                      <p>Estimado/a <span className="bg-yellow-100 px-1 rounded">{'{{.FirstName}}'}</span>,</p>
                      <p>Hemos detectado actividad inusual en su cuenta terminada en <span className="bg-yellow-100 px-1 rounded">{'{{.LastFour}}'}</span>. Por su seguridad, necesitamos que verifique su identidad.</p>
                      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md my-4">
                        <strong>⚠️ Acción requerida en las próximas 24 horas</strong>
                      </div>
                      <p>Para mantener su cuenta segura, haga clic en el siguiente enlace:</p>
                      <div className="text-center my-6">
                        <Button variant="destructive">Verificar Mi Cuenta</Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Si no reconoce esta actividad, contacte inmediatamente a nuestro centro de atención al cliente.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="html" className="mt-4">
                  <Textarea
                    value={template.htmlContent}
                    onChange={(e) => setTemplate({ ...template, htmlContent: e.target.value })}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Contenido HTML de la plantilla..."
                  />
                </TabsContent>
                
                <TabsContent value="text" className="mt-4">
                  <Textarea
                    value={template.textContent}
                    onChange={(e) => setTemplate({ ...template, textContent: e.target.value })}
                    className="min-h-[400px]"
                    placeholder="Versión de texto plano de la plantilla..."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Validation Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Validación</CardTitle>
              <CardDescription>
                Verificaciones de seguridad y cumplimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {validationResults.map((result, index) => (
                <Alert key={index} className={
                  result.type === 'success' ? 'border-green-200 bg-green-50' :
                  result.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                  result.type === 'error' ? 'border-red-200 bg-red-50' :
                  'border-blue-200 bg-blue-50'
                }>
                  {result.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {result.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                  {result.type === 'error' && <X className="h-4 w-4 text-red-600" />}
                  {result.type === 'info' && <AlertTriangle className="h-4 w-4 text-blue-600" />}
                  <AlertDescription className="text-sm">
                    {result.message}
                  </AlertDescription>
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Variables Disponibles</CardTitle>
              <CardDescription>
                Haz clic para insertar en el contenido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { var: '{{.FirstName}}', desc: 'Nombre del objetivo' },
                { var: '{{.LastName}}', desc: 'Apellido del objetivo' },
                { var: '{{.Email}}', desc: 'Email del objetivo' },
                { var: '{{.Position}}', desc: 'Cargo del objetivo' },
                { var: '{{.URL}}', desc: 'URL de la landing page' },
                { var: '{{.TrackingURL}}', desc: 'URL con tracking' },
                { var: '{{.LastFour}}', desc: 'Últimos 4 dígitos (simulado)' }
              ].map((variable, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md border cursor-pointer hover:bg-muted">
                  <div>
                    <code className="text-sm bg-muted px-1 rounded">{variable.var}</code>
                    <p className="text-xs text-muted-foreground mt-1">{variable.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Vista Previa</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Pantalla Completa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <strong>Para:</strong> juan.perez@empresa.com
                </div>
                <div className="text-sm">
                  <strong>De:</strong> {template.fromName} &lt;{template.fromEmail}&gt;
                </div>
                <div className="text-sm">
                  <strong>Asunto:</strong> {template.subject}
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  Vista previa con datos de ejemplo
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dev Annotations */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">🔧 Anotaciones para Desarrolladores</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>POST /api/templates/validate</strong> → Validar plantilla (logos, PII, etc.)</p>
          <p><strong>POST /api/templates</strong> → Guardar plantilla</p>
          <p><strong>GET /api/templates/{'{id}'}/preview</strong> → Vista previa con datos reales</p>
          <p><strong>POST /api/templates/import</strong> → Importar desde archivo HTML</p>
          <p><strong>Validadores:</strong> Detectar logos reales, información personal, enlaces maliciosos</p>
        </div>
      </div>
    </div>
  );
}