import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { AnimatedSidebar, SidebarBody, SidebarLink } from "@/components/ui/motion-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Home, FileText, User, LogOut, Building } from "lucide-react";
import { motion } from "framer-motion";
import { useComprobantesUsage } from "@/hooks/useComprobantesUsage";
import { UsageMeter } from "@/components/onboarding/UsageMeter";
import { JoyRideTour } from "@/components/onboarding/JoyRideTour";
import { VideoTutorialDialog } from "@/components/onboarding/VideoTutorialDialog";
import { useAppOnboarding } from "@/hooks/useAppOnboarding";
import { AppOnboarding } from "@/components/onboarding/AppOnboarding";

interface UserProfile {
  full_name: string;
  business_name: string;
  user_id_card: string;
  selected_plan: string;
  onboarding_completed: boolean;
}

interface DashboardLayoutContentProps {
  children: React.ReactNode;
}

export const DashboardLayoutContent = ({ children }: DashboardLayoutContentProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsage, limit, isUnlimited, usagePercentage, loading: usageLoading } = useComprobantesUsage(profile?.selected_plan || 'basico');
  const { startOnboarding } = useAppOnboarding();

  // Cargar perfil del usuario
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, business_name, user_id_card, selected_plan, onboarding_completed')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          setProfile(data);
          
          // Iniciar onboarding si no está completado
          if (!data.onboarding_completed) {
            startOnboarding();
          }
        }
      }
    };

    fetchProfile();
  }, [user, startOnboarding]);

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
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
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
      label: "Mi Perfil",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    }
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <>
      <div className="flex h-screen w-full bg-background">
        <AnimatedSidebar open={sidebarOpen} setOpen={setSidebarOpen}>
          <SidebarBody className="justify-between gap-10 h-full">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* Logo */}
              <div className="flex items-center gap-3 py-6 px-2">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <motion.div
                  animate={{
                    display: sidebarOpen ? "block" : "none",
                    opacity: sidebarOpen ? 1 : 0,
                  }}
                  className="whitespace-pre"
                >
                  <h1 className="font-bold text-white text-xl leading-tight">Ya Quedo</h1>
                  <p className="text-purple-200 text-sm font-medium">Sistema de Comprobantes</p>
                </motion.div>
              </div>
              
              {/* Navigation Links */}
              <div className="mt-6 flex flex-col gap-2 px-2">
                {navigationItems.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link} 
                    isActive={location.pathname === link.href}
                    className={`
                      flex items-center justify-start gap-3 py-3 px-3 rounded-xl 
                      transition-all duration-200 text-purple-200 hover:bg-purple-700/50 hover:text-white
                      ${location.pathname === link.href ? 'bg-purple-600 text-white hover:bg-purple-600 shadow-lg border border-purple-400/30' : ''}
                    `}
                    data-tour-id={link.href === '/profile' ? 'profile-link' : undefined}
                  />
                ))}
              </div>
            </div>
            
            {/* User Section */}
            <div className="border-t border-purple-700/50 pt-6 px-2">
              {/* Información del usuario */}
              {profile && sidebarOpen && (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-700/30 to-purple-600/30 rounded-xl border border-purple-600/20">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{profile.full_name}</p>
                      <p className="text-xs text-purple-200">ID: {profile.user_id_card}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-purple-100 truncate font-medium">{profile.business_name}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Indicador de uso de comprobantes */}
              {profile && sidebarOpen && !usageLoading && (
                <div className="mb-6">
                  <UsageMeter
                    currentUsage={currentUsage}
                    limit={limit}
                    isUnlimited={isUnlimited}
                    planName={profile.selected_plan}
                  />
                </div>
              )}
              
              <div 
                onClick={handleLogout}
                className="flex items-center justify-start gap-3 py-3 px-3 rounded-xl hover:bg-red-600 hover:text-white text-purple-200 transition-all duration-200 cursor-pointer group mb-4"
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
              
              {/* Footer info with Logo */}
              <motion.div
                animate={{
                  display: sidebarOpen ? "block" : "none",
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="pt-4 border-t border-purple-700/50"
              >
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <img 
                      src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" 
                      alt="Irrelevant Logo" 
                      className="h-6 w-auto opacity-80"
                    />
                  </div>
                  <div className="text-xs text-purple-400 space-y-1">
                    <p className="font-medium">© 2025</p>
                    <p className="text-purple-500">v1.0.0</p>
                  </div>
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
      
      {/* App Onboarding */}
      <AppOnboarding />
    </>
  );
};