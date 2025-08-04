import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          "bg-gray-800", // Fondo gris oscuro para mejor contraste
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header del sidebar - Solo visible en móvil */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 lg:hidden">
          <span className="font-semibold text-white text-lg">Sistema de Comprobantes</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-gray-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo/Título - Visible en desktop */}
        <div className="hidden lg:flex items-center p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">Sistema de</h1>
              <p className="text-gray-300 text-sm">Comprobantes</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-3 flex-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-12 text-left px-4",
                  "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "transition-all duration-200",
                  isActive && "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                )}
                asChild
                onClick={onClose}
              >
                <Link to={item.href} className="flex items-center">
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className="text-xs text-gray-400 text-center space-y-1">
            <p className="font-medium">© 2024 Sistema de</p>
            <p>Comprobantes Bancarios</p>
            <div className="pt-2">
              <div className="w-full h-px bg-gray-700 mb-2"></div>
              <p className="text-gray-500">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};