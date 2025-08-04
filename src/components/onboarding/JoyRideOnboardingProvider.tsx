import React from 'react';
import { OnboardingContext, useOnboardingProvider } from '@/hooks/useJoyRideOnboarding';

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export const JoyRideOnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const onboardingValue = useOnboardingProvider();

  return (
    <OnboardingContext.Provider value={onboardingValue}>
      {children}
    </OnboardingContext.Provider>
  );
};