import { useContext, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type OnboardingStep = 
  | 'welcome-profile'
  | 'create-bank-account' 
  | 'video-tutorial'
  | 'explore-dashboard'
  | 'complete';

interface OnboardingContextType {
  isActive: boolean;
  currentStep: OnboardingStep;
  startTour: () => void;
  nextStep: () => void;
  endTour: () => void;
  goToStep: (step: OnboardingStep) => void;
}

import { OnboardingContext } from '@/components/onboarding/OnboardingProvider';

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const useOnboardingProvider = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome-profile');
  const { toast } = useToast();

  const stepOrder: OnboardingStep[] = [
    'welcome-profile',
    'create-bank-account',
    'video-tutorial', 
    'explore-dashboard',
    'complete'
  ];

  const startTour = () => {
    setIsActive(true);
    setCurrentStep('welcome-profile');
  };

  const nextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      endTour();
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const endTour = async () => {
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

    setIsActive(false);
    setCurrentStep('complete');
  };

  return {
    isActive,
    currentStep,
    startTour,
    nextStep,
    endTour,
    goToStep,
  };
};