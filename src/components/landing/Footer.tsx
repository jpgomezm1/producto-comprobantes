import { FileText } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo y descripción */}
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="bg-primary-foreground/10 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Sistema de Comprobantes Bancarios</h3>
              <p className="text-primary-foreground/70 text-sm">
                Gestión profesional y segura
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a 
              href="#" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
            >
              Términos y Condiciones
            </a>
            <a 
              href="#" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
            >
              Política de Privacidad
            </a>
            <a 
              href="#" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
            >
              Soporte
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/70 text-sm">
            © 2024 Sistema de Comprobantes Bancarios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};