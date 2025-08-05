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
          primaryColor: '#7c3aed', // Purple-600
          textColor: '#1f2937', // Gray-800
          arrowColor: '#ffffff',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 10000,
          width: 420,
        },
        tooltip: {
          borderRadius: '16px',
          padding: '20px',
          fontSize: '16px',
          fontFamily: 'Inter, system-ui, sans-serif',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb',
        },
        tooltipTitle: {
          fontSize: '20px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '8px',
        },
        tooltipContent: {
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#4b5563',
          marginBottom: '16px',
        },
        buttonNext: {
          backgroundColor: '#7c3aed',
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          border: 'none',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
        },
        buttonBack: {
          color: '#6b7280',
          backgroundColor: 'transparent',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          marginRight: '12px',
          transition: 'all 0.2s ease',
        },
        buttonSkip: {
          color: '#9ca3af',
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
          color: '#9ca3af',
          backgroundColor: 'transparent',
          border: 'none',
        },
        spotlight: {
          borderRadius: '12px',
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 58, 237, 0.3)',
        },
        beacon: {
          color: '#7c3aed',
          backgroundColor: '#ffffff',
          border: '3px solid #7c3aed',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
        },
        footer: {
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #f3f4f6',
        }
      }}
      locale={{
        back: '← Anterior',
        close: '✕',
        last: '✨ Finalizar',
        next: 'Siguiente →',
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