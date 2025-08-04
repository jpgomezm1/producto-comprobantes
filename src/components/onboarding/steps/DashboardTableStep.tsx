import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { useAppOnboarding } from '@/hooks/useAppOnboarding';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const DashboardTableStep = () => {
  const { isStepActive, nextStep } = useAppOnboarding();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isStepActive('dashboard-table')) {
      // Delay to allow previous step to finish
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isStepActive]);

  const handleNext = () => {
    nextStep();
  };

  if (!isStepActive('dashboard-table')) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Highlight the table area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50"
            style={{
              top: '55%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '1200px',
              height: '35%',
            }}
          >
            <div className="absolute -inset-4 bg-secondary-blue/20 rounded-xl animate-pulse" />
            <div className="absolute -inset-2 border-2 border-secondary-blue rounded-xl animate-pulse" />
          </motion.div>

          {/* Tooltip card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
            className="fixed z-50 max-w-sm"
            style={{
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Card className="border-secondary-blue/30 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-secondary-blue" />
                  Todos tus comprobantes, en orden
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A medida que los cargues, aparecerán aquí. Usa los filtros para encontrar lo que necesites.
                </p>
                <Button 
                  onClick={handleNext}
                  className="w-full bg-secondary-blue hover:bg-secondary-blue/90 text-white"
                  size="sm"
                >
                  Finalizar tour
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};