import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAppOnboarding } from '@/hooks/useAppOnboarding';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const DashboardStatsStep = () => {
  const { isStepActive, nextStep } = useAppOnboarding();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isStepActive('dashboard-stats') && location.pathname === '/dashboard') {
      // Delay to allow dashboard to render
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isStepActive, location.pathname]);

  const handleNext = () => {
    nextStep();
  };

  if (!isStepActive('dashboard-stats')) return null;

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

          {/* Highlight the stats cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50"
            style={{
              // Position relative to stats cards
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '1200px',
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
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed z-50 max-w-sm"
            style={{
              top: '45%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Card className="border-secondary-blue/30 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-secondary-blue" />
                  Tus finanzas, en tiempo real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Aquí verás un resumen automático de tus comprobantes: total, monto válido y más.
                </p>
                <Button 
                  onClick={handleNext}
                  className="w-full bg-secondary-blue hover:bg-secondary-blue/90 text-white"
                  size="sm"
                >
                  Siguiente
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