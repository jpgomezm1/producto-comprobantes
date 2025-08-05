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
      scrollToFirstStep
      scrollOffset={100}
      spotlightClicks
      spotlightPadding={8}
      // Volvemos a habilitar overlay pero lo controlamos con CSS
      styles={{
        options: {
          primaryColor: 'hsl(271, 68%, 53%)',
          textColor: 'hsl(220, 26%, 14%)',
          arrowColor: '#ffffff',
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(31, 41, 55, 0.4)', // Restauramos el overlay
          zIndex: 10000,
          width: 'auto',
        },
        overlay: {
          backgroundColor: 'rgba(31, 41, 55, 0.4)', // Overlay con opacidad
          mixBlendMode: 'normal',
        },
        tooltip: {
          borderRadius: '20px',
          padding: '0',
          fontSize: '15px',
          fontFamily: 'Inter, system-ui, sans-serif',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          border: 'none',
          backgroundColor: '#ffffff',
          background: '#ffffff',
          minWidth: '400px',
          maxWidth: '500px',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: '0px',
          margin: '0',
          padding: '0',
          height: '0',
          overflow: 'hidden',
        },
        tooltipContent: {
          padding: '32px',
          fontSize: '15px',
          lineHeight: '1.6',
          color: 'hsl(220, 9%, 46%)',
          margin: '0',
        },
        tooltipFooter: {
          padding: '0 32px 32px 32px',
          margin: '0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        buttonNext: {
          backgroundColor: 'hsl(271, 68%, 53%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '600',
          border: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 12px hsl(271, 68%, 53%, 0.3)',
          cursor: 'pointer',
          outline: 'none',
        },
        buttonBack: {
          color: 'hsl(220, 9%, 46%)',
          backgroundColor: 'transparent',
          border: '2px solid hsl(220, 13%, 91%)',
          borderRadius: '12px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '600',
          marginRight: '12px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          outline: 'none',
        },
        buttonSkip: {
          color: 'hsl(220, 9%, 46%)',
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
          textDecoration: 'underline',
          padding: '8px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease',
        },
        buttonClose: {
          width: '24px',
          height: '24px',
          right: '12px',
          top: '12px',
          fontSize: '14px',
          color: 'hsl(220, 9%, 46%)',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '10001',
          lineHeight: '1',
        },
        spotlight: {
          borderRadius: '12px',
          background: 'transparent', // Completamente transparente
          border: '4px solid hsl(271, 68%, 53%)', // Borde morado directo
          boxShadow: '0 0 0 4px rgba(139, 43, 226, 0.3), 0 0 20px hsl(271, 68%, 53%, 0.5)',
          animation: 'spotlightPulse 2s ease-in-out infinite',
        },
        beacon: {
          color: 'hsl(271, 68%, 53%)',
          backgroundColor: '#ffffff',
          border: '4px solid hsl(271, 68%, 53%)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          boxShadow: '0 8px 25px hsl(271, 68%, 53%, 0.3)',
        }
      }}
      locale={{
        back: 'Anterior',
        close: '×',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar tour',
      }}
      floaterProps={{
        disableAnimation: false,
        styles: {
          floater: {
            borderRadius: '20px',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
          }
        }
      }}
    />
  );
};