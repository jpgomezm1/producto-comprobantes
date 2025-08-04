import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/hooks/useJoyRideOnboarding';
import { useNavigate } from 'react-router-dom';

export const VideoTutorialDialog = () => {
  const { showVideoDialog, setShowVideoDialog, resumeTourAfterVideo } = useOnboarding();
  const navigate = useNavigate();

  const handleContinue = () => {
    setShowVideoDialog(false);
    navigate('/dashboard');
    // Resume the tour after navigation
    setTimeout(() => {
      resumeTourAfterVideo();
    }, 500);
  };

  return (
    <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            🚀 Carga Comprobantes en Segundos con Telegram
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-center text-muted-foreground text-lg">
            La forma más rápida de usar Ya Quedo es reenviando los comprobantes directamente a nuestro bot de Telegram. 
            Mira este video de 1 minuto para ver lo fácil que es.
          </p>
          
          <div className="aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Tutorial Ya Quedo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleContinue}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Entendido, ¡muéstrame mi dashboard!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};