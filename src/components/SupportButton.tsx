import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, X, HelpCircle, Headphones } from 'lucide-react';

export const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide en scroll (opcional)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWhatsApp = () => {
    const phoneNumber = '+573183351733';
    const message = encodeURIComponent('¡Hola! Necesito ayuda con Ya Quedo. 👋');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleEmail = () => {
    const email = 'soporte@yaquedo.com'; // Cambia por tu email real
    const subject = encodeURIComponent('Soporte Ya Quedo - Solicitud de Ayuda');
    const body = encodeURIComponent(`¡Hola equipo de Ya Quedo! 👋

Necesito ayuda con:

[ Describe tu consulta aquí ]

Información adicional:
- Navegador: ${navigator.userAgent.split(' ')[0]}
- Fecha: ${new Date().toLocaleString('es-CO')}

¡Gracias por su apoyo!`);
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = url;
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay con blur cuando está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Contenedor principal */}
      <div 
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        
        {/* Opciones de contacto */}
        <div 
          className={`flex flex-col gap-3 transition-all duration-500 transform ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
          }`}
        >
          {/* Opción WhatsApp */}
          <div className="relative group">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <MessageCircle size={20} className="animate-pulse" />
              <span className="font-semibold pr-1">WhatsApp</span>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 group-hover:animate-pulse"></div>
            </button>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
              Chat en tiempo real
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>

          {/* Opción Email */}
          <div className="relative group">
            <button
              onClick={handleEmail}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Mail size={20} />
              <span className="font-semibold pr-1">Email</span>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
            </button>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
              Soporte por correo
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </div>
        </div>

        {/* Botón principal */}
        <div className="relative group">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 ${
              isOpen ? 'rotate-180 scale-110' : 'rotate-0'
            }`}
          >
            <div className="relative z-10">
              {isOpen ? <X size={24} /> : <Headphones size={24} />}
            </div>
            
            {/* Anillo de pulso cuando está cerrado */}
            {!isOpen && (
              <>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full animate-ping opacity-20"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full animate-pulse opacity-10"></div>
              </>
            )}
            
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 group-hover:animate-pulse"></div>
          </button>
          
          {/* Tooltip principal */}
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} />
              {isOpen ? 'Cerrar soporte' : '¿Necesitas ayuda?'}
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      </div>
    </>
  );
};