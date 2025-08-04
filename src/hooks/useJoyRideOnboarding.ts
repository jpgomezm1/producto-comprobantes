import { createContext, useContext, useState, useCallback } from 'react';
import { Step, CallBackProps, STATUS, EVENTS } from 'react-joyride';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingContextType {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  startTour: () => void;
  stopTour: () => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
  showVideoDialog: boolean;
  setShowVideoDialog: (show: boolean) => void;
  resumeTourAfterVideo: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const useOnboardingProvider = () => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const { toast } = useToast();

  const steps: Step[] = [
    {
      target: 'body',
      content: `
        <div>
          <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">¡Bienvenido a Ya Quedo!</h3>
          <p style="color: hsl(var(--muted-foreground));">
            Vamos a configurar tu cuenta en unos pocos y sencillos pasos para que tomes el control de tus finanzas.
          </p>
        </div>
      `,
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="profile-link"]',
      content: `
        <div>
          <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">Configura tu Perfil</h4>
          <p style="color: hsl(var(--muted-foreground));">
            El primer paso es configurar tu perfil. Aquí añadirás la información de tu negocio y tus cuentas bancarias.
          </p>
        </div>
      `,
      placement: 'right',
      spotlightClicks: true,
    },
    {
      target: '[data-tour-id="add-account-button"]',
      content: `
        <div>
          <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">Añade tu Primera Cuenta</h4>
          <p style="color: hsl(var(--muted-foreground));">
            ¡Genial! Ahora, haz clic aquí para añadir tu primera cuenta de recaudo. Registra las cuentas donde tus clientes te pagan.
          </p>
        </div>
      `,
      placement: 'bottom',
      spotlightClicks: true,
    },
    {
      target: '[data-tour-id="dashboard-stats"]',
      content: `
        <div>
          <h4 style="font-weight: 600; margin-bottom: 0.5rem; color: hsl(var(--foreground));">¡Felicidades!</h4>
          <p style="color: hsl(var(--muted-foreground));">
            Has completado la configuración. Este es tu Dashboard. A medida que cargues comprobantes, verás tus finanzas cobrar vida aquí. ¡Explora sin miedo!
          </p>
        </div>
      `,
      placement: 'bottom',
    },
  ];

  const startTour = useCallback(() => {
    setRun(true);
    setStepIndex(0);
  }, []);

  const stopTour = useCallback(() => {
    setRun(false);
    setStepIndex(0);
  }, []);

  const completeOnboarding = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ onboarding_completed: true })
          .eq('user_id', user.id);

        if (error) throw error;

        toast({
          title: "¡Onboarding Completado!",
          description: "Ya estás listo para usar Ya Quedo al máximo",
        });
      }
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: "No se pudo completar el onboarding",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, type, index } = data;

    if (type === 'step:after' || type === 'error:target_not_found') {
      setStepIndex(index + (type === 'step:after' ? 1 : 0));
    } else if (status === 'finished' || status === 'skipped') {
      setRun(false);
      completeOnboarding();
    }

    // Show video dialog when reaching the profile page with account button
    if (type === 'step:after' && index === 2) {
      // This means user completed the "add account" step
      setShowVideoDialog(true);
      setRun(false); // Pause the tour for the video
    }
  }, [completeOnboarding]);

  const resumeTourAfterVideo = useCallback(() => {
    setShowVideoDialog(false);
    setStepIndex(3); // Go to dashboard stats step
    setRun(true);
  }, []);

  return {
    run,
    stepIndex,
    steps,
    startTour,
    stopTour,
    handleJoyrideCallback,
    showVideoDialog,
    setShowVideoDialog,
    resumeTourAfterVideo,
  };
};