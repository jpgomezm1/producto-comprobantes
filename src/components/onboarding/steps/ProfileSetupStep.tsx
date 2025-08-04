import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useAppOnboarding } from '@/hooks/useAppOnboarding';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const ProfileSetupStep = () => {
  const { isStepActive } = useAppOnboarding();
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isStepActive('profile-setup')) {
      let searchInterval: NodeJS.Timeout;
      let resizeObserver: ResizeObserver;

      // Paso A: Espera activa del elemento
      const findAndPositionTarget = () => {
        const targetElement = document.querySelector('[data-tour-id="add-account-button"]') as HTMLElement;
        
        if (targetElement) {
          // Paso B: Posiciona y observa
          clearInterval(searchInterval);
          
          // Calcula la posición del elemento
          const rect = targetElement.getBoundingClientRect();
          setTargetRect(rect);
          setIsVisible(true);
          
          // Crea ResizeObserver para vigilar cambios
          resizeObserver = new ResizeObserver(() => {
            const newRect = targetElement.getBoundingClientRect();
            setTargetRect(newRect);
          });
          resizeObserver.observe(targetElement);
        }
      };

      // Buscar elemento cada 100ms
      searchInterval = setInterval(findAndPositionTarget, 100);
      
      // Intentar encontrar el elemento inmediatamente también
      findAndPositionTarget();

      // Paso C: Limpieza
      return () => {
        clearInterval(searchInterval);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    } else {
      setIsVisible(false);
      setTargetRect(null);
    }
  }, [isStepActive]);

  if (!isStepActive('profile-setup')) return null;

  return (
    <AnimatePresence>
      {isVisible && targetRect && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Highlight the add account button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-50"
            style={{
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
            }}
          >
            <div className="absolute inset-0 bg-secondary-blue/20 rounded-xl animate-pulse" />
            <div className="absolute inset-0 border-2 border-secondary-blue rounded-xl animate-pulse" />
          </motion.div>

          {/* Tooltip card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed z-50 max-w-sm"
            style={{
              top: targetRect.bottom + 16,
              left: targetRect.left + targetRect.width / 2,
              transform: 'translateX(-50%)',
            }}
          >
            <Card className="border-secondary-blue/30 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plus className="h-5 w-5 text-secondary-blue" />
                  Añade tu primera cuenta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Registra aquí las cuentas bancarias donde tus clientes te pagan. 
                  Esto nos ayudará a validar los comprobantes más rápido.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-secondary-blue font-medium">
                  <div className="w-2 h-2 bg-secondary-blue rounded-full animate-pulse" />
                  Haz clic en "Añadir Nueva Cuenta" para continuar
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};