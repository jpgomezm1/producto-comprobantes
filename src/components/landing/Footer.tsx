import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Ya Quedo Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Ya Quedó</h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              La solución que automatiza la validación de comprobantes y elimina el fraude en tu negocio. 
              Recupera tu tiempo y protege tu dinero.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-purple-400" />
                <span className="text-sm">tech@stayirrelevant.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-purple-400" />
                <span className="text-sm">+57 (318) 384-9532</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span className="text-sm">Medellín, Colombia</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Producto</h4>
            <ul className="space-y-3">
              <li>
                <a href="#caracteristicas" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Características
                </a>
              </li>
              <li>
                <a href="#precios" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Precios
                </a>
              </li>
              <li>
                <a href="/demo" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Ver Demo
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Soporte</h4>
            <ul className="space-y-3">
              <li>
                <a href="/ayuda" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Contactar Soporte
                </a>
              </li>
              <li>
                <a href="/guias" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">
                  Guías de Uso
                </a>
              </li>
              <li>
                <a href="/estado" className="text-gray-300 hover:text-purple-400 transition-colors text-sm flex items-center gap-2">
                  Estado del Servicio
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Developed by Irrelevant */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Developed by</span>
                <img 
                  src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" 
                  alt="Irrelevant Logo" 
                  className="h-6 w-auto"
                />
              </div>
              <a 
                href="https://stayirrelevant.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
              >
                stayirrelevant.com
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Copyright and legal */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-gray-400">
              <span>© 2025 Ya Quedó. Todos los derechos reservados.</span>
              
              <div className="flex items-center gap-6">
                <a 
                  href="/terminos" 
                  className="hover:text-purple-400 transition-colors"
                >
                  Términos de Uso
                </a>
                <a 
                  href="/privacidad" 
                  className="hover:text-purple-400 transition-colors"
                >
                  Privacidad
                </a>
                <a 
                  href="/cookies" 
                  className="hover:text-purple-400 transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Certificado SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Cumplimiento PCI DSS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Regulado por SFC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};