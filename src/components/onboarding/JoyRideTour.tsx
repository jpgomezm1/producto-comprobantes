import React from 'react';
import Joyride from 'react-joyride';
import { useOnboarding } from '@/hooks/useJoyRideOnboarding';

export const JoyRideTour = () => {
  const { run, steps, handleJoyrideCallback } = useOnboarding();

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      hideCloseButton
      disableOverlayClose
      spotlightClicks
      styles={{
        options: {
          primaryColor: 'hsl(var(--primary))',
          backgroundColor: 'hsl(var(--background))',
          textColor: 'hsl(var(--foreground))',
          arrowColor: 'hsl(var(--background))',
          overlayColor: 'rgba(0, 0, 0, 0.4)',
          width: '320px',
          zIndex: 10000,
        },
        tooltip: {
          backgroundColor: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          fontSize: '14px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          color: 'hsl(var(--foreground))',
          fontSize: '16px',
          fontWeight: '600',
        },
        tooltipContent: {
          color: 'hsl(var(--muted-foreground))',
          padding: '8px 0',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderRadius: '6px',
          border: 'none',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        buttonBack: {
          backgroundColor: 'transparent',
          color: 'hsl(var(--muted-foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '6px',
          padding: '8px 16px',
          fontSize: '14px',
          marginRight: '8px',
        },
        buttonSkip: {
          backgroundColor: 'transparent',
          color: 'hsl(var(--muted-foreground))',
          border: 'none',
          fontSize: '14px',
        },
        spotlight: {
          borderRadius: '8px',
        },
      }}
      locale={{
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Saltar',
      }}
    />
  );
};