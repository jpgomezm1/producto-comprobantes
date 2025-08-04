import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppOnboarding } from '@/hooks/useAppOnboarding';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const VideoTutorialStep = () => {
  const { nextStep, isStepActive } = useAppOnboarding();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard');
    nextStep();
  };

  if (!isStepActive('video-tutorial')) return null;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-2xl border-secondary-blue/20">
        <DialogHeader className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary-blue to-secondary-blue/80 rounded-xl flex items-center justify-center"
          >
            <Play className="h-8 w-8 text-white ml-1" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <DialogTitle className="text-2xl font-bold text-foreground">
              Carga comprobantes en segundos con Telegram
            </DialogTitle>
            <DialogDescription className="text-base mt-3 text-muted-foreground">
              La forma más fácil de usar Ya Quedo es reenviando los comprobantes a nuestro bot. ¡Mira qué fácil es!
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          {/* Video embed */}
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Tutorial Telegram Ya Quedo"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Button 
            onClick={handleContinue}
            className="w-full bg-secondary-blue hover:bg-secondary-blue/90 text-white font-medium py-3"
            size="lg"
          >
            Entendido, ¡muéstrame mi dashboard!
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};