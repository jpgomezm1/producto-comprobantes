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
      disableCloseOnEsc={false}
      disableOverlayClose={false}
      styles={{
        options: {
          primaryColor: 'hsl(var(--primary))',
          textColor: 'hsl(var(--foreground))',
          arrowColor: 'hsl(var(--background))',
          backgroundColor: 'hsl(var(--background))',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 10000,
          width: 420,
        },
        tooltip: {
          borderRadius: 'calc(var(--radius) + 4px)',
          padding: '20px',
          fontSize: '16px',
          fontFamily: 'Inter, system-ui, sans-serif',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid hsl(var(--border))',
          backgroundColor: 'hsl(var(--background))',
        },
        tooltipTitle: {
          fontSize: '20px',
          fontWeight: '700',
          color: 'hsl(var(--foreground))',
          marginBottom: '8px',
        },
        tooltipContent: {
          fontSize: '15px',
          lineHeight: '1.6',
          color: 'hsl(var(--muted-foreground))',
          marginBottom: '16px',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderRadius: 'var(--radius)',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          border: 'none',
          transition: 'all 0.2s ease',
          boxShadow: 'var(--shadow-md)',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          backgroundColor: 'transparent',
          border: '2px solid hsl(var(--border))',
          borderRadius: 'var(--radius)',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          marginRight: '12px',
          transition: 'all 0.2s ease',
        },
        buttonSkip: {
          color: 'hsl(var(--muted-foreground))',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
          textDecoration: 'underline',
          padding: '8px 16px',
        },
        buttonClose: {
          width: '32px',
          height: '32px',
          right: '12px',
          top: '12px',
          fontSize: '18px',
          color: 'hsl(var(--muted-foreground))',
          backgroundColor: 'transparent',
          border: 'none',
        },
        spotlight: {
          borderRadius: 'var(--radius)',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 40px hsl(var(--primary) / 0.3)',
        },
        beacon: {
          color: 'hsl(var(--primary))',
          backgroundColor: 'hsl(var(--background))',
          border: '3px solid hsl(var(--primary))',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          boxShadow: 'var(--shadow-md)',
        }
      }}
      locale={{
        back: 'Anterior',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar tour',
      }}
      floaterProps={{
        styles: {
          floater: {
            borderRadius: '16px',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
          }
        }
      }}
    />
  );
};