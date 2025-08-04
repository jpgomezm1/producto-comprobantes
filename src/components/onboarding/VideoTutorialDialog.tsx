import React from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export const VideoTutorialDialog = () => {
  const { showVideoDialog, setShowVideoDialog, proceedToNextStep } = useOnboarding();
  const navigate = useNavigate();

  const handleContinue = () => {
    setShowVideoDialog(false);
    navigate('/dashboard');
    // Resume the tour after navigation
    setTimeout(() => {
      proceedToNextStep();
    }, 500);
  };

  return (
    <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Carga comprobantes en segundos con Telegram
          </DialogTitle>
          <DialogDescription className="text-center">
            La forma más fácil de registrar tus comprobantes es a través de nuestro bot de Telegram. 
            Mira este video para ver cómo funciona.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
             <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Tutorial Telegram Ya Quedo"
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
          
          <div className="text-center">
            <Button onClick={handleContinue} size="lg">
              Entendido, llévame al Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};