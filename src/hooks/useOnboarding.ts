// src/hooks/useOnboarding.ts
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Step, CallBackProps, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// 1. Definir la forma del contexto
interface OnboardingContextType {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  startOnboarding: () => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
}

// 2. Crear el contexto
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// 3. Crear el hook para consumir el contexto
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// 4. Crear el componente Provider que contendrá toda la lógica y el estado
export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
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
      content: '¡Excelente! Ahora, haz clic aquí para registrar tu primera cuenta. Esto nos ayudará a validar tus comprobantes.',
      spotlightClicks: true,
      placement: 'bottom',
    },
    {
      target: 'body',
      content: '¡Fantástico! Has configurado tu primera cuenta. Ahora puedes volver al dashboard para ver tus estadísticas.',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="dashboard-stats"]',
      content: '¡Todo listo! Este es tu Dashboard. A medida que cargues comprobantes, aquí verás tus estadísticas en tiempo real.',
      placement: 'bottom',
    },
  ];

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

    if (([EVENTS.STEP_AFTER] as string[]).includes(type)) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      
      // Manejo de navegación explícita solo cuando es necesario
      if (index === 3 && action === ACTIONS.NEXT) {
        navigate('/dashboard');
      }

      setStepIndex(nextStepIndex);
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
  };

  return React.createElement(OnboardingContext.Provider, { value }, children);
};