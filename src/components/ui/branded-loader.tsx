import { useState, useEffect } from "react";

interface BrandedLoaderProps {
  text?: string;
  className?: string;
}

export const BrandedLoader = ({ text = "Cargando...", className = "" }: BrandedLoaderProps) => {
  const [espiaLoaded, setEspiaLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    "Validando comprobantes...",
    "Verificando pagos...",
    "Detectando fraudes...",
    "Ya casi estamos listos...",
  ];

  useEffect(() => {
    // Simular progreso de carga
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 300);

    // Cambiar mensajes
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center relative overflow-hidden ${className}`}>
      {/* Elementos decorativos de fondo más sutiles */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-xl animate-pulse delay-700"></div>

      <div className="text-center space-y-12 p-8 relative z-10 max-w-md mx-auto">
        
        {/* Mr. Irrelevant - Protagonista */}
        <div className="flex justify-center">
          <div className="relative">
            {!espiaLoaded && (
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full animate-pulse"></div>
            )}
            <img
              src="https://storage.googleapis.com/cluvi/Ya_Quedo/espia_irrelevant.PNG"
              alt="Irrelevant Spy"
              className={`w-24 h-24 object-contain transition-all duration-500 ${
                espiaLoaded ? 'opacity-100 animate-gentle-float' : 'opacity-0'
              }`}
              onLoad={() => setEspiaLoaded(true)}
              onError={() => setEspiaLoaded(true)}
            />
            
            {/* Efecto sutil de brillo */}
            {espiaLoaded && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
            )}
          </div>
        </div>

        {/* Texto de carga */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 transition-all duration-500 min-h-[28px] flex items-center justify-center">
            {text === "Cargando..." ? loadingMessages[messageIndex] : text}
          </h2>
          
          {/* Barra de progreso principal */}
          <div className="space-y-3">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            {/* Porcentaje */}
            <div className="text-sm text-gray-500 font-medium">
              {Math.round(Math.min(progress, 100))}%
            </div>
          </div>
        </div>

        {/* Footer con branding */}
        <div className="pt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Developed by</span>
            <div className="flex items-center">
              {!logoLoaded && (
                <div className="w-20 h-6 bg-gray-100 rounded animate-pulse"></div>
              )}
              <img
                src="https://storage.googleapis.com/cluvi/Web-Risk/logo_final_morado_irrelevant.PNG"
                alt="Irrelevant Logo"
                className={`h-6 w-auto transition-all duration-300 ${
                  logoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setLogoLoaded(true)}
                onError={() => setLogoLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS personalizado simplificado */}
      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-gentle-float {
          animation: gentle-float 2.5s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};