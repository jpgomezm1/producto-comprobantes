import irrelevantLogo from "@/assets/irrelevant-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo y descripción */}
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <img 
              src={irrelevantLogo} 
              alt="irrelevant Logo" 
              className="h-8 w-auto"
            />
            <div>
              <p className="text-primary-foreground/90 text-sm">
                © 2024 Ya Quedo by irrelevant. Todos los derechos reservados.
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
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};