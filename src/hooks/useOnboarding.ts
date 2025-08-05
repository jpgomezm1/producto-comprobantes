// src/hooks/useOnboarding.ts
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Step, CallBackProps, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { OnboardingVideoStep } from '@/components/onboarding/OnboardingVideoStep';

interface OnboardingContextType {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  startOnboarding: () => void;
  goToStep: (index: number) => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
  isCompleted: boolean;
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
  const [isCompleted, setIsCompleted] = useState(false);
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
      content: '¡Excelente! Ahora, añade tu primera cuenta. El tour se pausará y continuará automáticamente cuando guardes la cuenta.',
      placement: 'right',
      spotlightClicks: true,
      // Ocultamos los botones de Joyride para forzar la acción del usuario
      hideFooter: true, 
    },
    {
      target: 'body',
      placement: 'center',
      content: React.createElement(OnboardingVideoStep),
    },
    {
      target: '[data-tour-id="dashboard-stats"]',
      content: '¡Todo listo! Este es tu Dashboard. A medida que cargues comprobantes, aquí verás tus estadísticas.',
      placement: 'bottom',
    },
  ];
  
  const goToStep = useCallback((index: number) => {
    setStepIndex(index);
    setRun(true);
  }, []);

  const handleJoyrideCallback = useCallback(async (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('user_id', user.id);
          
          setIsCompleted(true); // Notifica a la app que el tour terminó
          
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
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (index === 0 && action === ACTIONS.NEXT) { // Después de bienvenida
        navigate('/dashboard');
        setStepIndex(nextStepIndex);
      } else if (index === 1 && action === ACTIONS.NEXT) { // Después de clic en perfil
        navigate('/profile');
        setStepIndex(nextStepIndex);
      } else if (index === 2) { // El paso de "Añadir cuenta" no tiene botones, no hará nada.
        return;
      } else if (index === 3 && action === ACTIONS.NEXT) { // Después del video
        navigate('/dashboard');
        setStepIndex(nextStepIndex);
      } else {
        setStepIndex(nextStepIndex);
      }
    }
  }, [navigate, toast]);

  const startOnboarding = useCallback(() => {
    if (!run) {
      setStepIndex(0);
      setIsCompleted(false);
      setRun(true);
    }
  }, [run]);

  const value = {
    run,
    steps: tourSteps,
    stepIndex,
    startOnboarding,
    handleJoyrideCallback,
    goToStep,
    isCompleted,
  };

  return React.createElement(OnboardingContext.Provider, { value }, children);
};