import React, { useState } from 'react';
import { Play, ExternalLink, MessageCircle, Zap, CheckCircle } from 'lucide-react';

export const OnboardingVideoStep = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(true);
    setIsVideoLoaded(true);
  };

  return (
    <div className="space-y-6 text-center max-w-lg mx-auto">
      {/* Header con ícono animado */}
      <div className="space-y-3">
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-blue/20 to-accent-success/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-secondary-blue to-secondary-blue/80 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-foreground leading-tight">
          Carga comprobantes en segundos
          <span className="block text-secondary-blue font-extrabold">
            con Telegram
          </span>
        </h2>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          La forma más fácil y rápida de registrar tus comprobantes es a través de nuestro bot inteligente.
        </p>
      </div>

      {/* Video Container Mejorado */}
      <div className="relative group">
        <div className="aspect-video w-full bg-gradient-to-br from-muted to-background rounded-xl overflow-hidden border border-border shadow-lg transition-all duration-300 group-hover:shadow-xl">
          {!isVideoLoaded ? (
            // Thumbnail personalizado con botón de play
            <div 
              className="relative w-full h-full bg-gradient-to-br from-secondary-blue/5 to-accent-success/5 flex items-center justify-center cursor-pointer transition-all duration-300 hover:from-secondary-blue/10 hover:to-accent-success/10"
              onClick={handleVideoClick}
            >
              {/* Patrón de fondo sutil */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--secondary-blue)) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
              </div>
              
              {/* Botón de play grande */}
              <div className="relative z-10 group/play">
                <div className="absolute inset-0 bg-secondary-blue/20 rounded-full blur-2xl scale-150 group-hover/play:scale-175 transition-transform duration-500"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-secondary-blue to-secondary-blue/90 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/play:scale-110 group-hover/play:shadow-3xl">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </div>
              
              {/* Badge decorativo */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 shadow-md">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">Tutorial</span>
              </div>
              
              {/* Duración del video */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-xs font-medium text-white">2:30</span>
              </div>
            </div>
          ) : (
            // Video real
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
              title="Tutorial Telegram Ya Quedo"
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; encrypted-media"
            />
          )}
        </div>
        
        {/* Indicador de carga sutil */}
        {isPlaying && !isVideoLoaded && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-secondary-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Features destacadas */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-gradient-to-r from-accent-success/10 to-accent-success/5 border border-accent-success/20 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-success/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-accent-success" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Súper rápido</p>
              <p className="text-xs text-muted-foreground">Envía foto → Recibe confirmación</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-secondary-blue/10 to-secondary-blue/5 border border-secondary-blue/20 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-secondary-blue" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Procesamiento automático</p>
              <p className="text-xs text-muted-foreground">IA extrae todos los datos por ti</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-br from-muted/50 to-background border border-border rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
          <MessageCircle className="w-4 h-4 text-secondary-blue" />
          ¿Listo para probarlo?
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-blue to-secondary-blue/90 hover:from-secondary-blue/90 hover:to-secondary-blue text-white text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
            <MessageCircle className="w-3 h-3" />
            Abrir Bot de Telegram
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          💡 <strong>Tip:</strong> Guarda el enlace del bot en tus contactos favoritos para acceso rápido
        </p>
      </div>
    </div>
  );
};