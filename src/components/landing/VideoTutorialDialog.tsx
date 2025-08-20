import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoTutorialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTutorialDialog = ({ isOpen, onClose }: VideoTutorialDialogProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Reset video when dialog closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setIsVideoLoaded(false);
    }
  }, [isOpen]);

  // Update time and duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setIsVideoLoaded(true);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [isOpen]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleWhatsAppClick = () => {
    const message = "¡Acabo de ver el tutorial de Ya Quedó y me encanta! Quiero automatizar las validaciones de mi negocio 🚀";
    const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl w-[95vw] h-auto p-0 overflow-hidden bg-white border border-gray-200 shadow-2xl"
      >
        {/* Background matching your UI */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40" />
        <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 blur-2xl opacity-10">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-6 -translate-x-6 blur-2xl opacity-10">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Cómo funciona Ya Quedó
              </h2>
              <p className="text-sm text-gray-600">
                Mira la validación automática en acción
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Video Container */}
          <div className="px-6">
            <div 
              className="relative bg-black rounded-xl overflow-hidden shadow-lg"
              onMouseMove={handleMouseMove}
            >
              {/* Loading state */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center aspect-video">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-3 mx-auto animate-pulse">
                      <Play className="h-6 w-6 text-white ml-0.5" />
                    </div>
                    <p className="text-white/70 text-sm">Cargando video...</p>
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                className="w-full h-auto aspect-video object-cover"
                src="https://storage.googleapis.com/cluvi/Redes-Irrelevant/Video_Tutorial_Ya_Quedo.mp4"
                preload="metadata"
                onLoadedData={() => setIsVideoLoaded(true)}
              />

              {/* Play overlay */}
              {!isPlaying && isVideoLoaded && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group"
                  onClick={togglePlayPause}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="h-7 w-7 text-white ml-0.5" />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-all duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Progress bar */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-white text-xs font-mono min-w-[35px]">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer video-progress"
                    />
                    <div 
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full pointer-events-none"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-xs font-mono min-w-[35px]">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlayPause}
                      className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                    >
                      {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                    </Button>
                  </div>

                  <div className="text-white/60 text-xs">
                    Tutorial Ya Quedó
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-6 pt-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-full px-3 py-1 text-xs font-medium mb-4">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-purple-700">¿Te gustó lo que viste?</span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¡Automatiza tu negocio hoy mismo!
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
                Únete a cientos de negocios que ya validaron más de 50,000 comprobantes sin errores
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 text-base font-semibold"
                >
                  ¡Lo quiero YA!
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Setup en 5 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Soporte 24/7</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Sin mensualidades</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style>{`
          .video-progress::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(135deg, #8b5cf6, #6366f1);
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
          }
          
          .video-progress::-webkit-slider-track {
            background: rgba(255, 255, 255, 0.3);
            height: 4px;
            border-radius: 2px;
          }
          
          .video-progress::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(135deg, #8b5cf6, #6366f1);
            cursor: pointer;
            border: 2px solid #ffffff;
            box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
          }
          
          .video-progress::-moz-range-track {
            background: rgba(255, 255, 255, 0.3);
            height: 4px;
            border-radius: 2px;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};