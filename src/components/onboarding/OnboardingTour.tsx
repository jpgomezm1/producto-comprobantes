import React from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

interface OnboardingTourProps {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  handleJoyrideCallback: (data: CallBackProps) => void;
}

export const OnboardingTour = ({ run, steps, stepIndex, handleJoyrideCallback }: OnboardingTourProps) => {
  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: 'hsl(var(--secondary-blue))',
          textColor: 'hsl(var(--foreground))',
          arrowColor: 'hsl(var(--card))',
          backgroundColor: 'hsl(var(--card))',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: 'var(--radius)',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--secondary-blue))',
        },
        buttonBack: {
          color: 'hsl(var(--foreground))',
        }
      }}
      locale={{
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar Tour',
      }}
    />
  );
};