import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  BookOpen,
  Award,
  Flag
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface LandingPageProps {
  campaignId?: string;
  userId?: string;
}

export function LandingPage({ campaignId = 'demo', userId = 'demo' }: LandingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Simulación del timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const microLessons = [
    {
      title: "¿Qué acabas de experimentar?",
      content: "Has hecho clic en un enlace de un email de phishing simulado. Este era un ejercicio de entrenamiento para enseñarte sobre los riesgos de seguridad.",
      icon: AlertTriangle,
      color: "text-yellow-600"
    },
    {
      title: "Señales de Alerta",
      content: "Los emails de phishing suelen tener: urgencia falsa, errores ortográficos, remitentes sospechosos, y solicitudes de información personal.",
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Cómo Protegerte",
      content: "Verifica siempre el remitente, no hagas clic en enlaces sospechosos, y cuando tengas dudas, contacta directamente a la organización.",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  const quizQuestions = [
    {
      question: "¿Cuál fue la principal señal de alerta en el email que recibiste?",
      options: [
        "La dirección del remitente no era oficial",
        "Solicitaba acción urgente en 24 horas", 
        "El enlace llevaba a un dominio diferente",
        "Todas las anteriores"
      ],
      correct: 3
    },
    {
      question: "Si recibes un email sospechoso, ¿qué debes hacer PRIMERO?",
      options: [
        "Hacer clic para verificar si es real",
        "Reenviar el email a tus compañeros",
        "No hacer clic en ningún enlace y verificar por otro medio",
        "Eliminar el email inmediatamente"
      ],
      correct: 2
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex.toString()
    }));
  };

  const completeTraining = () => {
    setIsCompleted(true);
    // En producción, aquí se enviaría la información a la API
    console.log('Training completed:', {
      campaignId,
      userId,
      timeSpent,
      quizAnswers,
      completedAt: new Date().toISOString()
    });
  };

  const reportPhishing = () => {
    // En producción, marcaría el reporte en GoPhish
    alert('¡Gracias por reportar! Has sido marcado como usuario que identificó correctamente el phishing.');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-700">¡Entrenamiento Completado!</CardTitle>
            <CardDescription className="text-lg">
              Has completado exitosamente el módulo de entrenamiento de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-700">{formatTime(timeSpent)}</div>
                <div className="text-sm text-blue-600">Tiempo Total</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-bold text-green-700">
                  {Object.keys(quizAnswers).length}/{quizQuestions.length}
                </div>
                <div className="text-sm text-green-600">Quiz Completado</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-bold text-purple-700">100%</div>
                <div className="text-sm text-purple-600">Progreso</div>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Tu progreso ha sido registrado. Recibirás un certificado de finalización por email.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 justify-center">
              <Button onClick={reportPhishing} variant="outline" className="gap-2">
                <Flag className="w-4 h-4" />
                Marcar como Reportado
              </Button>
              <Button onClick={() => window.close()}>
                Finalizar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="w-6 h-6 text-primary" />
                Entrenamiento de Seguridad - Phishing
              </CardTitle>
              <CardDescription>
                Módulo educativo sobre identificación y prevención de ataques de phishing
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="font-medium">Tiempo: {formatTime(timeSpent)}</div>
              <div className="text-sm text-muted-foreground">Objetivo: 60-90 segundos</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso del Entrenamiento</span>
              <span>{Math.round(((currentStep + 1) / (microLessons.length + quizQuestions.length)) * 100)}%</span>
            </div>
            <Progress value={((currentStep + 1) / (microLessons.length + quizQuestions.length)) * 100} />
          </div>

          {/* Micro Lessons */}
          {currentStep < microLessons.length && (
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {React.createElement(microLessons[currentStep].icon, { className: `w-6 h-6 ${microLessons[currentStep].color}` })}
                  {microLessons[currentStep].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{microLessons[currentStep].content}</p>
              </CardContent>
            </Card>
          )}

          {/* Quiz */}
          {currentStep >= microLessons.length && currentStep < microLessons.length + quizQuestions.length && (
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-accent" />
                  Pregunta {currentStep - microLessons.length + 1} de {quizQuestions.length}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">{quizQuestions[currentStep - microLessons.length].question}</p>
                <div className="space-y-2">
                  {quizQuestions[currentStep - microLessons.length].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(currentStep - microLessons.length, index)}
                      className={`w-full p-4 text-left border rounded-lg transition-colors ${
                        quizAnswers[currentStep - microLessons.length] === index.toString()
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          quizAnswers[currentStep - microLessons.length] === index.toString()
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`} />
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: microLessons.length + quizQuestions.length }, (_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>

            {currentStep < microLessons.length + quizQuestions.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  currentStep >= microLessons.length && 
                  !quizAnswers[currentStep - microLessons.length]
                }
              >
                Siguiente
              </Button>
            ) : (
              <Button
                onClick={completeTraining}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Completar Entrenamiento
              </Button>
            )}
          </div>

          {/* Report Button */}
          <div className="border-t pt-6">
            <Alert>
              <Flag className="h-4 w-4" />
              <AlertDescription className="flex justify-between items-center">
                <span>¿Identificaste que este era un email de phishing?</span>
                <Button variant="outline" size="sm" onClick={reportPhishing} className="gap-2">
                  <Flag className="w-4 h-4" />
                  Marcar como Reportado
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Dev Annotations */}
      <div className="fixed bottom-4 right-4 p-3 bg-black/80 text-white text-xs rounded-lg max-w-80">
        <div className="font-medium mb-1">🔧 Dev Info</div>
        <div>Campaign: {campaignId}</div>
        <div>User: {userId}</div>
        <div>Time: {formatTime(timeSpent)}</div>
        <div className="mt-1 text-gray-300">
          POST /api/landing/complete → Registrar finalización
        </div>
      </div>
    </div>
  );
}