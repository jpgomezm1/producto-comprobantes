import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
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

export const WelcomeStep = () => {
  const { nextStep } = useAppOnboarding();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/profile');
    nextStep();
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md text-center border-secondary-blue/20">
        <DialogHeader className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary-blue to-secondary-blue/80 rounded-xl flex items-center justify-center"
          >
            <FileText className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DialogTitle className="text-2xl font-bold text-foreground">
              ¡Bienvenido a Ya Quedo!
            </DialogTitle>
            <DialogDescription className="text-base mt-3 text-muted-foreground">
              Vamos a configurar tu cuenta en menos de 2 minutos para que tomes el control de tus finanzas.
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
            onClick={handleStart}
            className="w-full bg-secondary-blue hover:bg-secondary-blue/90 text-white font-medium py-3"
            size="lg"
          >
            Comenzar
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};