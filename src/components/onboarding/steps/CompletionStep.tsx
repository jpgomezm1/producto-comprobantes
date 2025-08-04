import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';
import { useAppOnboarding } from '@/hooks/useAppOnboarding';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const CompletionStep = () => {
  const { completeOnboarding, isStepActive } = useAppOnboarding();

  const handleFinish = () => {
    completeOnboarding();
  };

  if (!isStepActive('completion')) return null;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md text-center border-accent-success/20">
        <DialogHeader className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-accent-success to-accent-success/80 rounded-xl flex items-center justify-center"
          >
            <PartyPopper className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DialogTitle className="text-2xl font-bold text-foreground">
              ¡Todo listo para empezar!
            </DialogTitle>
            <DialogDescription className="text-base mt-3 text-muted-foreground">
              Has completado la configuración inicial. Ya puedes empezar a cargar tus comprobantes y tomar el control de tu negocio.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Button 
            onClick={handleFinish}
            className="w-full bg-accent-success hover:bg-accent-success/90 text-white font-medium py-3"
            size="lg"
          >
            Finalizar Tour
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};