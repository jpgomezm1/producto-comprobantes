import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary p-2 rounded-lg">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-primary">
            Sistema de Comprobantes Bancarios
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
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline-blue" 
            size="sm"
            asChild
          >
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
          <Button 
            variant="blue" 
            size="sm"
            asChild
          >
            <Link to="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};