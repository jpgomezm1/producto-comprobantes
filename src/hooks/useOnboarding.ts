import React, { createContext, useContext, useState, useCallback } from 'react';
import { Step, CallBackProps, STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingContextType {
  startOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

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
      content: 'Para empezar, vamos a tu perfil para que añadas una cuenta bancaria de recaudo.',
      spotlightClicks: true,
    },
    {
      target: '[data-tour-id="add-account-button"]',
      content: '¡Excelente! Ahora, haz clic aquí para registrar tu primera cuenta bancaria. Esto nos ayudará a validar tus comprobantes.',
      spotlightClicks: true,
      placement: 'bottom',
    },
    {
      target: 'body',
      content: '¡Fantástico! El último paso es ver un video rápido que te enseña a cargar comprobantes usando Telegram. Es la forma más fácil.',
      placement: 'center',
    },
    {
      target: '[data-tour-id="dashboard-stats"]',
      content: '¡Todo listo! Este es tu Dashboard. A medida que cargues comprobantes, aquí verás tus estadísticas en tiempo real.',
      placement: 'bottom',
    },
  ];

  const handleJoyrideCallback = useCallback(async (data: CallBackProps) => {
    const { status, type, step, index } = data;

    if (type === 'step:after') {
      if (step.target === '[data-tour-id="profile-link"]') {
        navigate('/profile');
        setStepIndex(index + 1);
      } else if (step.target === '[data-tour-id="add-account-button"]') {
        // Pausamos aquí hasta que el usuario añada la cuenta y el video se muestre
        setRun(false);
      } else {
        setStepIndex(index + 1);
      }
    }
    
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
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
    }
  }, [navigate, toast]);

  const startOnboarding = useCallback(() => {
    navigate('/dashboard');
    setTimeout(() => {
      setStepIndex(0);
      setRun(true);
    }, 500);
  }, [navigate]);

  return { run, stepIndex, tourSteps, handleJoyrideCallback, startOnboarding };
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const value = {
        // Esta es una versión simplificada del provider, 
        // el hook `useOnboardingProvider` se usará directamente en el layout.
        startOnboarding: () => {} 
    };
    return React.createElement(OnboardingContext.Provider, { value }, children);
};