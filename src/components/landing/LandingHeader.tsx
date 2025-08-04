import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import irrelevantLogo from "@/assets/irrelevant-logo.png";

export const LandingHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <img 
            src={irrelevantLogo} 
            alt="irrelevant Logo" 
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold text-secondary-blue">
            Ya Quedo
          </h1>
        </div>

        {/* Navegación central */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#inicio" className="text-muted-foreground hover:text-foreground transition-colors">
            Inicio
          </a>
          <a href="#caracteristicas" className="text-muted-foreground hover:text-foreground transition-colors">
            Características
          </a>
          <a href="#precios" className="text-muted-foreground hover:text-foreground transition-colors">
            Precios
          </a>
          <a href="#preguntas" className="text-muted-foreground hover:text-foreground transition-colors">
            Preguntas Frecuentes
          </a>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="bg-secondary-blue hover:bg-secondary-blue/90"
            asChild
          >
            <Link to="/register">Crear Cuenta Gratis</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};