import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { 
  Key, 
  Mail, 
  Globe, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  TestTube,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';

export function Settings() {
  const [gophishApiKey, setGophishApiKey] = useState('gp_1234567890abcdef...');
  const [gophishUrl, setGophishUrl] = useState('https://gophish.empresa.com');
  const [testDomain, setTestDomain] = useState('phishing-test.empresa.com');
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);

  // Mock SMTP profiles
  const [smtpProfiles, setSmtpProfiles] = useState([
    {
      id: 1,
      name: 'SMTP Corporativo',
      host: 'smtp.empresa.com',
      port: 587,
      username: 'noreply@empresa.com',
      status: 'activo',
      lastTest: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      name: 'Servidor de Pruebas',
      host: 'smtp.mailgun.com',
      port: 587,
      username: 'test@sandbox.mailgun.org',
      status: 'activo',
      lastTest: '2024-01-19T15:45:00Z'
    },
    {
      id: 3,
      name: 'Backup Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      username: 'backup@empresa.com',
      status: 'inactivo',
      lastTest: '2024-01-15T09:20:00Z'
    }
  ]);

  const testGophishConnection = async () => {
    setConnectionStatus('testing');
    
    // Simulación de test de conexión
    setTimeout(() => {
      if (gophishApiKey && gophishUrl) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    }, 2000);
  };

  const testSmtpProfile = (profileId: number) => {
    // Simulación de test SMTP
    setSmtpProfiles(profiles => 
      profiles.map(profile => 
        profile.id === profileId 
          ? { ...profile, status: 'probando' as const }
          : profile
      )
    );

    setTimeout(() => {
      setSmtpProfiles(profiles => 
        profiles.map(profile => 
          profile.id === profileId 
            ? { ...profile, status: 'activo' as const, lastTest: new Date().toISOString() }
            : profile
        )
      );
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Configuración</h1>
        <p className="text-muted-foreground">
          Configura las integraciones y parámetros del sistema
        </p>
      </div>

      <Tabs defaultValue="gophish" className="space-y-6">
        <TabsList>
          <TabsTrigger value="gophish">GoPhish API</TabsTrigger>
          <TabsTrigger value="smtp">Perfiles SMTP</TabsTrigger>
          <TabsTrigger value="domain">Dominio de Pruebas</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        {/* GoPhish API Configuration */}
        <TabsContent value="gophish">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Configuración de GoPhish API
              </CardTitle>
              <CardDescription>
                Configura la conexión con tu instancia de GoPhish para sincronizar campañas y eventos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gophishUrl">URL de GoPhish</Label>
                  <Input
                    id="gophishUrl"
                    value={gophishUrl}
                    onChange={(e) => setGophishUrl(e.target.value)}
                    placeholder="https://gophish.empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gophishApiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gophishApiKey"
                      type={isApiKeyVisible ? 'text' : 'password'}
                      value={gophishApiKey}
                      onChange={(e) => setGophishApiKey(e.target.value)}
                      placeholder="gp_..."
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsApiKeyVisible(!isApiKeyVisible)}
                    >
                      {isApiKeyVisible ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button 
                  onClick={testGophishConnection}
                  disabled={connectionStatus === 'testing'}
                  className="gap-2"
                >
                  <TestTube className="w-4 h-4" />
                  {connectionStatus === 'testing' ? 'Probando...' : 'Probar Conexión'}
                </Button>

                {connectionStatus === 'success' && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Conectado
                  </Badge>
                )}
                
                {connectionStatus === 'error' && (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="w-3 h-3" />
                    Error de Conexión
                  </Badge>
                )}
              </div>

              {connectionStatus === 'success' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Conexión exitosa con GoPhish. Las campañas y eventos se sincronizarán automáticamente.
                  </AlertDescription>
                </Alert>
              )}

              {connectionStatus === 'error' && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    No se pudo conectar con GoPhish. Verifica la URL y API Key.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMTP Profiles */}
        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Perfiles de Envío SMTP
                  </CardTitle>
                  <CardDescription>
                    Configura los servidores SMTP para envío de emails de las campañas
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Nuevo Perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nuevo Perfil SMTP</DialogTitle>
                      <DialogDescription>
                        Configura un nuevo servidor SMTP para envío de emails
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtpName">Nombre del Perfil</Label>
                        <Input id="smtpName" placeholder="SMTP Corporativo" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpHost">Servidor SMTP</Label>
                          <Input id="smtpHost" placeholder="smtp.empresa.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort">Puerto</Label>
                          <Input id="smtpPort" placeholder="587" type="number" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpUser">Usuario</Label>
                          <Input id="smtpUser" placeholder="noreply@empresa.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPass">Contraseña</Label>
                          <Input id="smtpPass" type="password" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="smtpTLS" />
                        <Label htmlFor="smtpTLS">Usar TLS/STARTTLS</Label>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Guardar y Probar</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Servidor</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Test</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {smtpProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">{profile.name}</TableCell>
                      <TableCell>{profile.host}:{profile.port}</TableCell>
                      <TableCell>{profile.username}</TableCell>
                      <TableCell>
                        <Badge variant={
                          profile.status === 'activo' ? 'default' :
                          profile.status === 'probando' ? 'secondary' :
                          'outline'
                        }>
                          {profile.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(profile.lastTest).toLocaleDateString('es-CL')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => testSmtpProfile(profile.id)}
                            disabled={profile.status === 'probando'}
                          >
                            <TestTube className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Domain Configuration */}
        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Dominio de Pruebas
              </CardTitle>
              <CardDescription>
                Configura el dominio para las landing pages de las campañas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="testDomain">Dominio de Landing Pages</Label>
                <Input
                  id="testDomain"
                  value={testDomain}
                  onChange={(e) => setTestDomain(e.target.value)}
                  placeholder="phishing-test.empresa.com"
                />
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Configuración DNS requerida:</strong>
                  <div className="mt-2 space-y-1 text-sm">
                    <div><code>A {testDomain} → 192.168.1.100</code></div>
                    <div><code>TXT {testDomain} → "v=spf1 include:empresa.com ~all"</code></div>
                    <div><code>DKIM selector._domainkey.{testDomain} → "v=DKIM1; k=rsa; p=..."</code></div>
                  </div>
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Estado SPF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Configurado</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Estado DKIM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Pendiente</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button className="gap-2">
                <TestTube className="w-4 h-4" />
                Verificar Configuración DNS
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo recibir notificaciones del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { id: 'campaign-complete', label: 'Campaña completada', description: 'Cuando una campaña termine' },
                  { id: 'high-click-rate', label: 'Tasa de clics alta', description: 'Cuando la tasa supere el 10%' },
                  { id: 'user-reported', label: 'Usuario reportó phishing', description: 'Cuando alguien reporte un email' },
                  { id: 'approval-needed', label: 'Aprobación pendiente', description: 'Cuando haya campañas por aprobar' },
                  { id: 'system-errors', label: 'Errores del sistema', description: 'Problemas técnicos o de conexión' }
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{notification.label}</h4>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                    </div>
                    <Switch />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationEmail">Email para Notificaciones</Label>
                <Input
                  id="notificationEmail"
                  placeholder="admin@empresa.com"
                  defaultValue="admin@empresa.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dev Annotations */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">🔧 Anotaciones para Desarrolladores</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>POST /api/gophish/test</strong> → Probar conexión con GoPhish API</p>
          <p><strong>POST /api/smtp/test</strong> → Probar configuración SMTP</p>
          <p><strong>GET /api/dns/verify/{'{domain}'}</strong> → Verificar registros SPF/DKIM</p>
          <p><strong>PUT /api/settings</strong> → Guardar configuración del sistema</p>
          <p><strong>POST /api/notifications/test</strong> → Enviar notificación de prueba</p>
        </div>
      </div>
    </div>
  );
}