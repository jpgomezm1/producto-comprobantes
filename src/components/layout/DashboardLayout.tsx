import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { AnimatedSidebar, SidebarBody, SidebarLink } from "@/components/ui/motion-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Home, FileText, Plus, BarChart3, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Proteger rutas - redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-secondary-blue mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  // No mostrar nada si no hay usuario (se está redirigiendo)
  if (!user) {
    return null;
  }

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Comprobantes",
      href: "/comprobantes",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: "Nuevo Comprobante",
      href: "/comprobantes/nuevo",
      icon: <Plus className="h-5 w-5" />,
    },
    {
      label: "Reportes",
      href: "/reportes",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <AnimatedSidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            <div className="flex items-center gap-2 py-4">
              <div className="h-8 w-8 bg-secondary-blue rounded-lg flex-shrink-0 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <motion.span
                animate={{
                  display: sidebarOpen ? "inline-block" : "none",
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="font-semibold text-sidebar-foreground text-lg whitespace-pre"
              >
                Sistema de Comprobantes
              </motion.span>
            </div>
            
            {/* Navigation Links */}
            <div className="mt-8 flex flex-col gap-2">
              {navigationItems.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  isActive={location.pathname === link.href}
                />
              ))}
            </div>
          </div>
          
          {/* User Section */}
          <div className="border-t border-sidebar-border pt-4">
            <SidebarLink
              link={{
                label: user.email || "Usuario",
                href: "/profile",
                icon: <User className="h-5 w-5" />,
              }}
            />
            <div 
              onClick={handleLogout}
              className="flex items-center justify-start gap-3 group/sidebar py-3 px-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground transition-colors duration-200 cursor-pointer"
            >
              <div className="h-6 w-6 flex-shrink-0">
                <LogOut className="h-5 w-5" />
              </div>
              <motion.span
                animate={{
                  display: sidebarOpen ? "inline-block" : "none",
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              >
                Cerrar Sesión
              </motion.span>
            </div>
          </div>
        </SidebarBody>
      </AnimatedSidebar>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};