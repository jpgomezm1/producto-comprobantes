import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

export const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Ya Quedo
          </h1>
        </div>

        {/* Navegación central - Desktop */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a 
            href="#inicio" 
            className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a 
            href="#caracteristicas" 
            className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm relative group"
          >
            Características
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a 
            href="#precios" 
            className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm relative group"
          >
            Precios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a 
            href="#preguntas" 
            className="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm relative group"
          >
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* Botones de acción - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            asChild
          >
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            asChild
          >
            <Link to="/register" className="flex items-center gap-2">
              Comenzar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="space-y-3">
              <a 
                href="#inicio" 
                className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#caracteristicas" 
                className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Características
              </a>
              <a 
                href="#precios" 
                className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Precios
              </a>
              <a 
                href="#preguntas" 
                className="block text-gray-600 hover:text-purple-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
            </nav>
            
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="w-full text-gray-600 hover:text-purple-600 hover:bg-purple-50 justify-start"
                asChild
              >
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button 
                size="sm"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
                asChild
              >
                <Link to="/register" className="flex items-center justify-center gap-2">
                  Comenzar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};