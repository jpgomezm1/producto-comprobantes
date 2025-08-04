import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type OnboardingStep = 
  | 'welcome'
  | 'profile-setup'
  | 'video-tutorial'
  | 'dashboard-stats'
  | 'dashboard-table'
  | 'completion'
  | 'completed';

interface OnboardingContextType {
  currentStep: OnboardingStep;
  isActive: boolean;
  startOnboarding: () => void;
  nextStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;
  isStepActive: (step: OnboardingStep) => boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useAppOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useAppOnboarding must be used within OnboardingProvider');
  }
  return context;
};

export const useAppOnboardingProvider = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const stepSequence: OnboardingStep[] = [
    'welcome',
    'profile-setup',
    'video-tutorial',
    'dashboard-stats',
    'dashboard-table',
    'completion'
  ];

  const startOnboarding = useCallback(() => {
    setIsActive(true);
    setCurrentStep('welcome');
  }, []);

  const nextStep = useCallback(() => {
    const currentIndex = stepSequence.indexOf(currentStep);
    if (currentIndex < stepSequence.length - 1) {
      setCurrentStep(stepSequence[currentIndex + 1]);
    } else {
      completeOnboarding();
    }
  }, [currentStep]);

  const goToStep = useCallback((step: OnboardingStep) => {
    setCurrentStep(step);
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
          title: "¡Onboarding completado!",
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

    setIsActive(false);
    setCurrentStep('completed');
  }, [toast]);

  const isStepActive = useCallback((step: OnboardingStep) => {
    return isActive && currentStep === step;
  }, [isActive, currentStep]);

  return {
    currentStep,
    isActive,
    startOnboarding,
    nextStep,
    goToStep,
    completeOnboarding,
    isStepActive,
  };
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useAppOnboardingProvider();
  
  return React.createElement(
    OnboardingContext.Provider,
    { value },
    children
  );
};