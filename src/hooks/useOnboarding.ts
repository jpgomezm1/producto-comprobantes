// src/hooks/useOnboarding.ts
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Step, CallBackProps, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingContextType {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  startOnboarding: () => void;
  proceedToNextStep: () => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
  showVideoDialog: boolean;
  setShowVideoDialog: (show: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const tourSteps: Step[] = [
    {
      target: 'body',
      content: '¡Bienvenido a Ya Quedo! Vamos a configurar tu cuenta en menos de 2 minutos.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="profile-link"]',
      content: 'Para empezar, haz clic en "Mi Perfil" para añadir tu cuenta bancaria de recaudo.',
      spotlightClicks: true,
    },
    {
      target: '[data-tour-id="add-account-button"]',
      content: '¡Excelente! Ahora, añade tu primera cuenta. El tour continuará automáticamente cuando guardes la cuenta.',
      spotlightClicks: true,
      placement: 'right',
    },
    {
      target: '[data-tour-id="dashboard-stats"]',
      content: '¡Todo listo! Este es tu Dashboard. A medida que cargues comprobantes, aquí verás tus estadísticas en tiempo real.',
      placement: 'bottom',
    },
  ];
  
  const proceedToNextStep = useCallback(() => {
    setStepIndex(3);
    setRun(true);
  }, []);

  const handleJoyrideCallback = useCallback(async (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      setStepIndex(0);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('user_id', user.id);
          toast({
            title: "¡Onboarding Completado!",
            description: "Ya estás listo para usar Ya Quedo al máximo.",
          });
        }
      } catch (error) {
        console.error('Error completing onboarding:', error);
      }
      return;
    }

    if (type === EVENTS.STEP_AFTER) {
      if (index === 0 && action === ACTIONS.NEXT) {
        navigate('/dashboard');
        setStepIndex(1);
      } else if (index === 1 && action === ACTIONS.NEXT) {
        navigate('/profile');
        setStepIndex(2);
      } else if (index === 2 && action === ACTIONS.NEXT) {
         setShowVideoDialog(true);
         setRun(false);
      }
    }
  }, [navigate, toast]);

  const startOnboarding = useCallback(() => {
    if (!run) {
      setStepIndex(0);
      setRun(true);
    }
  }, [run]);

  const value = {
    run,
    steps: tourSteps,
    stepIndex,
    startOnboarding,
    handleJoyrideCallback,
    proceedToNextStep,
    showVideoDialog,
    setShowVideoDialog,
  };

  return React.createElement(OnboardingContext.Provider, { value }, children);
};