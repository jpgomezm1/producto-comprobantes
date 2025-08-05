import React from 'react';

export const OnboardingVideoStep = () => {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-foreground">
        Carga comprobantes en segundos con Telegram
      </h2>
      <p className="text-muted-foreground">
        La forma más fácil de registrar tus comprobantes es a través de nuestro bot de Telegram.
      </p>
      <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Tutorial Telegram Ya Quedo"
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </div>
  );
};