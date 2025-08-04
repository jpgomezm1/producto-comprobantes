import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

export const OnboardingGuide = () => {
  const { isActive, currentStep, nextStep, endTour, goToStep } = useOnboarding();
  const location = useLocation();
  const navigate = useNavigate();
  const highlightRef = useRef<HTMLDivElement>(null);

  // Manejar transiciones entre pasos según la ruta
  useEffect(() => {
    if (!isActive) return;

    if (currentStep === 'welcome-profile' && location.pathname === '/profile') {
      goToStep('create-bank-account');
    } else if (currentStep === 'video-tutorial' && location.pathname === '/dashboard') {
      goToStep('explore-dashboard');
    }
  }, [location.pathname, currentStep, isActive, goToStep]);

  // Destacar elementos según el paso actual
  useEffect(() => {
    if (!isActive) return;

    const removeExistingHighlights = () => {
      document.querySelectorAll('.onboarding-highlight').forEach(el => {
        el.classList.remove('onboarding-highlight');
      });
    };

    const highlightElement = (selector: string) => {
      removeExistingHighlights();
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add('onboarding-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    setTimeout(() => {
      switch (currentStep) {
        case 'welcome-profile':
          if (location.pathname === '/dashboard' || location.pathname === '/profile') {
            highlightElement('a[href="/profile"]');
          }
          break;
        case 'create-bank-account':
          if (location.pathname === '/profile') {
            highlightElement('button:contains("Añadir Nueva Cuenta"), [data-testid="add-bank-account"]');
          }
          break;
        case 'explore-dashboard':
          if (location.pathname === '/dashboard') {
            highlightElement('[data-testid="stats-cards"], .stats-cards');
          }
          break;
      }
    }, 500);

    return removeExistingHighlights;
  }, [currentStep, location.pathname, isActive]);

  if (!isActive) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome-profile':
        return (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <h3 className="text-xl font-bold mb-2">¡Bienvenido a Ya Quedo!</h3>
                <p className="text-muted-foreground mb-4">
                  Para empezar, vamos a configurar tu perfil y crear tu primera cuenta de recaudo.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/profile')}
                className="w-full"
              >
                Ir a Mi Perfil <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        );

      case 'create-bank-account':
        return (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">¡Excelente!</h3>
                <p className="text-muted-foreground mb-4">
                  Ahora, añade tu primera cuenta de recaudo. Aquí es donde registras las cuentas a las que te envían dinero.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Busca el botón "Añadir Nueva Cuenta" y regístrala.
              </p>
            </CardContent>
          </Card>
        );

      case 'video-tutorial':
        return (
          <Dialog open={true} onOpenChange={() => {}}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Aprende a cargar comprobantes en 1 minuto
                </DialogTitle>
                <DialogDescription className="text-center">
                  La forma más fácil de registrar tus comprobantes es a través de nuestro bot de Telegram. 
                  Mira este video para ver cómo funciona.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="relative aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Video Tutorial - Telegram Bot</p>
                    <p className="text-sm text-gray-400">(Placeholder para video de YouTube)</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button onClick={() => navigate('/dashboard')} size="lg">
                    Entendido, llévame al Dashboard
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );

      case 'explore-dashboard':
        return (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">¡Todo listo!</h3>
                <p className="text-muted-foreground mb-4">
                  Aquí verás todos tus comprobantes. Usa los filtros para encontrar lo que necesites y revisa tus estadísticas.
                </p>
              </div>
              <Button onClick={endTour} className="w-full">
                Finalizar Tour
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay de highlight */}
      <style>{`
        .onboarding-highlight {
          position: relative;
          z-index: 9999;
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3) !important;
          border-radius: 8px;
          animation: pulse-highlight 2s infinite;
        }
        
        @keyframes pulse-highlight {
          0%, 100% { box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.5), 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 0 8px rgba(147, 51, 234, 0.3), 0 0 30px rgba(147, 51, 234, 0.5); }
        }
      `}</style>

      {/* Contenido del tour */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          {renderStepContent()}
        </div>
      </div>
    </>
  );
};