import React, { createContext, useContext, useState, useCallback } from 'react';
import { Step, CallBackProps, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingContextType {
  run: boolean;
  stepIndex: number;
  steps: Step[];
  startOnboarding: () => void;
  goToStep: (index: number) => void;
  handleJoyrideCallback: (data: CallBackProps) => void;
  isCompleted: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const tourSteps: Step[] = [
    {
      target: 'body',
      content: `
        <div style="text-align: center;">
          <div style="
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, hsl(271, 68%, 53%), hsl(271, 68%, 45%));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px auto;
            box-shadow: 0 12px 32px hsl(271, 68%, 53%, 0.3);
          ">
            <span style="font-size: 32px;">🎉</span>
          </div>
          <h1 style="
            font-size: 24px; 
            font-weight: 700; 
            margin: 0 0 12px 0;
            color: hsl(220, 26%, 14%);
            line-height: 1.3;
          ">
            ¡Bienvenido a Ya Quedo!
          </h1>
          <p style="
            margin: 0; 
            color: hsl(220, 9%, 46%); 
            font-size: 16px; 
            line-height: 1.5;
            max-width: 320px;
            margin: 0 auto;
          ">
            Te guiaremos paso a paso para configurar tu cuenta en menos de 2 minutos.
          </p>
        </div>
      `,
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '[data-tour-id="profile-link"]',
      content: `
        <div>
          <div style="
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          ">
            <div style="
              width: 48px;
              height: 48px;
              background: linear-gradient(135deg, hsl(271, 68%, 53%, 0.1), hsl(271, 68%, 53%, 0.05));
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <span style="font-size: 20px;">👤</span>
            </div>
            <div>
              <h2 style="
                font-size: 18px; 
                font-weight: 600; 
                margin: 0 0 4px 0;
                color: hsl(220, 26%, 14%);
              ">
                Paso 1: Configura tu perfil
              </h2>
              <p style="
                margin: 0; 
                color: hsl(220, 9%, 46%); 
                font-size: 14px;
              ">
                Haz clic en "Mi Perfil" para comenzar
              </p>
            </div>
          </div>
          <p style="
            margin: 0; 
            color: hsl(220, 9%, 46%); 
            font-size: 15px; 
            line-height: 1.5;
          ">
            Necesitamos que añadas tu cuenta bancaria de recaudo para poder procesar tus comprobantes correctamente.
          </p>
        </div>
      `,
      spotlightClicks: true,
      placement: 'bottom',
    },
    {
      target: '[data-tour-id="add-account-button"]',
      content: `
        <div>
          <div style="
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          ">
            <div style="
              width: 48px;
              height: 48px;
              background: linear-gradient(135deg, hsl(160, 84%, 39%, 0.1), hsl(160, 84%, 39%, 0.05));
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <span style="font-size: 20px;">💳</span>
            </div>
            <div>
              <h2 style="
                font-size: 18px; 
                font-weight: 600; 
                margin: 0 0 4px 0;
                color: hsl(220, 26%, 14%);
              ">
                Paso 2: Añade tu cuenta bancaria
              </h2>
              <p style="
                margin: 0; 
                color: hsl(220, 9%, 46%); 
                font-size: 14px;
              ">
                Haz clic en "Añadir Cuenta"
              </p>
            </div>
          </div>
          <p style="
            margin: 0 0 16px 0; 
            color: hsl(220, 9%, 46%); 
            font-size: 15px; 
            line-height: 1.5;
          ">
            Completa el formulario con los datos de tu cuenta bancaria. El tour continuará automáticamente cuando guardes la información.
          </p>
          <div style="
            padding: 12px 16px;
            background: linear-gradient(135deg, hsl(38, 92%, 50%, 0.1), hsl(38, 92%, 50%, 0.05));
            border: 1px solid hsl(38, 92%, 50%, 0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
          ">
            <span style="font-size: 16px;">⚡</span>
            <span style="
              font-size: 13px;
              color: hsl(38, 92%, 35%);
              font-weight: 500;
            ">
              Acción requerida para continuar
            </span>
          </div>
        </div>
      `,
      placement: 'left',
      spotlightClicks: true,
      hideFooter: true, 
    },
    {
      target: 'body',
      placement: 'center',
      content: `
        <div style="text-align: center;">
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 20px;
          ">
            <div style="
              width: 56px;
              height: 56px;
              background: linear-gradient(135deg, hsl(271, 68%, 53%), hsl(271, 68%, 45%));
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 8px 25px hsl(271, 68%, 53%, 0.3);
            ">
              <span style="font-size: 24px; color: white;">📱</span>
            </div>
            <div style="text-align: left;">
              <h2 style="
                font-size: 20px;
                font-weight: 700;
                margin: 0 0 4px 0;
                color: hsl(220, 26%, 14%);
              ">
                Carga comprobantes
              </h2>
              <p style="
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: hsl(271, 68%, 53%);
              ">
                en segundos con Telegram
              </p>
            </div>
          </div>
          
          <p style="
            color: hsl(220, 9%, 46%);
            font-size: 15px;
            line-height: 1.5;
            margin: 0 0 24px 0;
            max-width: 380px;
            margin-left: auto;
            margin-right: auto;
          ">
            La forma más fácil y rápida de registrar tus comprobantes es a través de nuestro bot inteligente de Telegram.
          </p>

          <!-- Video Container -->
          <div style="
            position: relative;
            aspect-ratio: 16/9;
            width: 100%;
            max-width: 400px;
            margin: 0 auto 24px auto;
            background: linear-gradient(145deg, #f8fafc, #f1f5f9);
            border-radius: 16px;
            overflow: hidden;
            border: 2px solid hsl(220, 13%, 91%);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
          " onclick="this.innerHTML='<iframe src=\\"https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0\\" style=\\"width:100%;height:100%;border:none\\" allowfullscreen></iframe>'; this.style.cursor='default';" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            
            <!-- Botón de play -->
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 70px;
              height: 70px;
              background: linear-gradient(135deg, hsl(271, 68%, 53%), hsl(271, 68%, 45%));
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 12px 32px hsl(271, 68%, 53%, 0.4);
              transition: all 0.3s ease;
            ">
              <div style="
                width: 0;
                height: 0;
                border-left: 20px solid white;
                border-top: 12px solid transparent;
                border-bottom: 12px solid transparent;
                margin-left: 4px;
              "></div>
            </div>
            
            <!-- Badge de duración -->
            <div style="
              position: absolute;
              bottom: 12px;
              right: 12px;
              background: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 4px 8px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 500;
            ">
              2:30
            </div>
            
            <!-- Badge de tutorial -->
            <div style="
              position: absolute;
              top: 12px;
              left: 12px;
              background: rgba(255, 255, 255, 0.95);
              color: hsl(220, 26%, 14%);
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 6px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            ">
              <div style="width: 6px; height: 6px; background: #ef4444; border-radius: 50%;"></div>
              Tutorial
            </div>
          </div>

          <!-- Beneficios -->
          <div style="
            display: grid;
            gap: 12px;
            margin-bottom: 24px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          ">
            <div style="
              background: linear-gradient(90deg, hsl(160, 84%, 39%, 0.08), hsl(160, 84%, 39%, 0.04));
              border: 1px solid hsl(160, 84%, 39%, 0.15);
              border-radius: 12px;
              padding: 16px;
              display: flex;
              align-items: center;
              gap: 16px;
            ">
              <div style="
                width: 40px;
                height: 40px;
                background: hsl(160, 84%, 39%, 0.15);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <span style="font-size: 18px;">⚡</span>
              </div>
              <div style="text-align: left;">
                <p style="font-size: 14px; font-weight: 600; margin: 0 0 2px 0; color: hsl(220, 26%, 14%);">Súper rápido</p>
                <p style="font-size: 12px; margin: 0; color: hsl(220, 9%, 46%);">Envía foto → Recibe confirmación automática</p>
              </div>
            </div>
            
            <div style="
              background: linear-gradient(90deg, hsl(271, 68%, 53%, 0.08), hsl(271, 68%, 53%, 0.04));
              border: 1px solid hsl(271, 68%, 53%, 0.15);
              border-radius: 12px;
              padding: 16px;
              display: flex;
              align-items: center;
              gap: 16px;
            ">
              <div style="
                width: 40px;
                height: 40px;
                background: hsl(271, 68%, 53%, 0.15);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
              ">
                <span style="font-size: 18px;">🤖</span>
              </div>
              <div style="text-align: left;">
                <p style="font-size: 14px; font-weight: 600; margin: 0 0 2px 0; color: hsl(220, 26%, 14%);">IA inteligente</p>
                <p style="font-size: 12px; margin: 0; color: hsl(220, 9%, 46%);">Extrae automáticamente todos los datos</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div style="
            background: linear-gradient(135deg, hsl(220, 14%, 96%), hsl(220, 13%, 91%));
            border: 1px solid hsl(220, 13%, 91%);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
          ">
            <p style="
              font-size: 15px;
              font-weight: 600;
              margin: 0 0 12px 0;
              color: hsl(220, 26%, 14%);
            ">
              💡 Tip profesional
            </p>
            <p style="
              font-size: 13px;
              color: hsl(220, 9%, 46%);
              margin: 0;
              line-height: 1.4;
            ">
              Guarda el enlace del bot en tus contactos favoritos para acceso instantáneo
            </p>
          </div>
        </div>
      `,
      disableBeacon: true,
      styles: {
        tooltip: {
          width: '480px',
          maxWidth: '95vw',
        }
      }
    },
    {
      target: '[data-tour-id="dashboard-stats"]',
      content: `
        <div>
          <div style="
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 16px;
          ">
            <div style="
              width: 48px;
              height: 48px;
              background: linear-gradient(135deg, hsl(160, 84%, 39%, 0.1), hsl(160, 84%, 39%, 0.05));
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <span style="font-size: 20px;">📊</span>
            </div>
            <div>
              <h2 style="
                font-size: 18px; 
                font-weight: 600; 
                margin: 0 0 4px 0;
                color: hsl(220, 26%, 14%);
              ">
                ¡Configuración completada!
              </h2>
              <p style="
                margin: 0; 
                color: hsl(220, 9%, 46%); 
                font-size: 14px;
              ">
                Tu dashboard está listo
              </p>
            </div>
          </div>
          <p style="
            margin: 0 0 20px 0; 
            color: hsl(220, 9%, 46%); 
            font-size: 15px; 
            line-height: 1.5;
          ">
            Este es tu dashboard principal. Aquí verás todas tus estadísticas en tiempo real a medida que cargues comprobantes.
          </p>
          <div style="
            padding: 20px;
            background: linear-gradient(135deg, hsl(160, 84%, 39%, 0.1), hsl(160, 84%, 39%, 0.05));
            border: 2px solid hsl(160, 84%, 39%, 0.2);
            border-radius: 12px;
            text-align: center;
          ">
            <div style="
              width: 48px;
              height: 48px;
              background: hsl(160, 84%, 39%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 12px auto;
            ">
              <span style="font-size: 20px; color: white;">🎯</span>
            </div>
            <p style="
              font-size: 15px;
              color: hsl(160, 84%, 25%);
              font-weight: 600;
              margin: 0 0 6px 0;
            ">
              ¡Ya puedes empezar a usar Ya Quedo!
            </p>
            <p style="
              font-size: 13px;
              color: hsl(160, 84%, 30%);
              margin: 0;
            ">
              Comienza cargando tu primer comprobante
            </p>
          </div>
        </div>
      `,
      placement: 'top',
    },
  ];
  
  const goToStep = useCallback((index: number) => {
    setStepIndex(index);
    setRun(true);
  }, []);

  const handleJoyrideCallback = useCallback(async (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setRun(false);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('user_id', user.id);
          
          setIsCompleted(true);
          
          toast({
            title: "🎉 ¡Onboarding Completado!",
            description: "Ya estás listo para usar Ya Quedo al máximo. ¡Comienza a cargar tus comprobantes!",
          });
        }
      } catch (error) {
        console.error('Error completing onboarding:', error);
        toast({
          title: "Error",
          description: "Hubo un problema al completar el onboarding. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
      return;
    }

    if (type === EVENTS.STEP_AFTER) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (index === 0 && action === ACTIONS.NEXT) {
        navigate('/dashboard');
        setStepIndex(nextStepIndex);
      } else if (index === 1 && action === ACTIONS.NEXT) {
        navigate('/profile');
        setStepIndex(nextStepIndex);
      } else if (index === 2) {
        return;
      } else if (index === 3 && action === ACTIONS.NEXT) {
        navigate('/dashboard');
        setStepIndex(nextStepIndex);
      } else {
        setStepIndex(nextStepIndex);
      }
    }
  }, [navigate, toast]);

  const startOnboarding = useCallback(() => {
    if (!run) {
      setStepIndex(0);
      setIsCompleted(false);
      setRun(true);
    }
  }, [run]);

  const value = {
    run,
    steps: tourSteps,
    stepIndex,
    startOnboarding,
    handleJoyrideCallback,
    goToStep,
    isCompleted,
  };

  return React.createElement(OnboardingContext.Provider, { value }, children);
};