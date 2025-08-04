import React, { createContext } from 'react';
import { useOnboardingProvider, OnboardingStep } from '@/hooks/useOnboarding';

interface OnboardingContextType {
  isActive: boolean;
  currentStep: OnboardingStep;
  startTour: () => void;
  nextStep: () => void;
  endTour: () => void;
  goToStep: (step: OnboardingStep) => void;
}

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const onboardingValue = useOnboardingProvider();

  return (
    <OnboardingContext.Provider value={onboardingValue}>
      {children}
    </OnboardingContext.Provider>
  );
};