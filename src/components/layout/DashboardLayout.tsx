import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { AnimatedSidebar, SidebarBody, SidebarLink } from "@/components/ui/motion-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Home, FileText, User, LogOut, Building } from "lucide-react";
import { motion } from "framer-motion";

interface UserProfile {
  full_name: string;
  business_name: string;
  user_id_card: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Cargar perfil del usuario
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, business_name, user_id_card')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

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
    }
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <AnimatedSidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10 h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            <div className="flex items-center gap-3 py-6 px-2">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <motion.div
                animate={{
                  display: sidebarOpen ? "block" : "none",
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="whitespace-pre"
              >
                <h1 className="font-bold text-white text-lg leading-tight">Sistema de</h1>
                <p className="text-gray-300 text-sm">Comprobantes</p>
              </motion.div>
            </div>
            
            {/* Navigation Links */}
            <div className="mt-4 flex flex-col gap-2 px-2">
              {navigationItems.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  isActive={location.pathname === link.href}
                  className={`
                    flex items-center justify-start gap-3 py-3 px-3 rounded-lg 
                    transition-all duration-200 text-gray-300 hover:bg-gray-700 hover:text-white
                    ${location.pathname === link.href ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : ''}
                  `}
                />
              ))}
            </div>
          </div>
          
          {/* User Section */}
          <div className="border-t border-gray-600 pt-4 px-2">
            {/* Información del usuario */}
            {profile && sidebarOpen && (
              <div className="mb-4 p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <User className="h-4 w-4 text-gray-300 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{profile.full_name}</p>
                    <p className="text-xs text-gray-400">ID: {profile.user_id_card}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building className="h-4 w-4 text-gray-300 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-300 truncate">{profile.business_name}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div 
              onClick={handleLogout}
              className="flex items-center justify-start gap-3 py-3 px-3 rounded-lg hover:bg-red-600 hover:text-white text-gray-300 transition-all duration-200 cursor-pointer group"
            >
              <div className="h-5 w-5 flex-shrink-0">
                <LogOut className="h-5 w-5" />
              </div>
              <motion.span
                animate={{
                  display: sidebarOpen ? "inline-block" : "none",
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-150 whitespace-pre inline-block !p-0 !m-0"
              >
                Cerrar Sesión
              </motion.span>
            </div>
            
            {/* Footer info */}
            <motion.div
              animate={{
                display: sidebarOpen ? "block" : "none",
                opacity: sidebarOpen ? 1 : 0,
              }}
              className="mt-4 pt-3 border-t border-gray-600"
            >
              <div className="text-xs text-gray-400 text-center space-y-1">
                <p className="font-medium">© 2025</p>
                <p className="text-gray-500">v1.0.0</p>
              </div>
            </motion.div>
          </div>
        </SidebarBody>
      </AnimatedSidebar>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};