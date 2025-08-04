import { Button } from "@/components/ui/button";
import { Home, FileText, Plus, BarChart3, X } from "lucide-react";
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
  {
    name: "Comprobantes",
    href: "/comprobantes",
    icon: FileText,
  },
  {
    name: "Nuevo Comprobante",
    href: "/comprobantes/nuevo",
    icon: Plus,
  },
  {
    name: "Reportes",
    href: "/reportes",
    icon: BarChart3,
    disabled: true,
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
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border lg:hidden">
          <span className="font-semibold">Menú</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navegación */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                asChild={!item.disabled}
                disabled={item.disabled}
                onClick={() => !item.disabled && onClose()}
              >
                {item.disabled ? (
                  <div>
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                    <span className="ml-auto text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                      Próximamente
                    </span>
                  </div>
                ) : (
                  <Link to={item.href}>
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/70 text-center">
            <p>© 2024 Sistema de</p>
            <p>Comprobantes Bancarios</p>
          </div>
        </div>
      </aside>
    </>
  );
};