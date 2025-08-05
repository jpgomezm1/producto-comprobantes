import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { AnimatedSidebar, SidebarBody, SidebarLink } from "@/components/ui/motion-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Home, 
  User, 
  LogOut, 
  Building, 
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useComprobantesUsage } from "@/hooks/useComprobantesUsage";
import { UsageMeter } from "@/components/onboarding/UsageMeter";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";

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
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUsage, limit, isUnlimited, loading: usageLoading } = useComprobantesUsage(profile?.selected_plan || 'basico');
  const [onboardingStatusChecked, setOnboardingStatusChecked] = useState(false);
  
  const { run, stepIndex, steps, handleJoyrideCallback, startOnboarding, isCompleted } = useOnboarding();

  // REEMPLAZA TU useEffect EXISTENTE CON TODO ESTE BLOQUE
  useEffect(() => {
    // Si la información de autenticación aún está cargando, es muy pronto para hacer algo.
    if (loading) {
      return;
    }

    // Si la carga terminó y NO hay usuario, lo redirigimos inmediatamente al login.
    // Esto protege todas las rutas del dashboard.
    if (!user) {
      navigate("/login");
      return;
    }

    // Creamos una función interna para mantener el código ordenado.
    // Esta función se ejecutará solo si hay un usuario logueado.
    const checkProfileAndPermissions = async () => {

      // --- INICIO DE LA LÓGICA DE SEGURIDAD ---

      // Consultamos la tabla 'profiles' en Supabase.
      // Buscamos el perfil que corresponda al ID del usuario actual.
      const { data: userProfile, error } = await supabase
        .from('profiles')
        .select('*') // Pedimos todos los datos del perfil (nombre, plan, y nuestro nuevo 'is_active')
        .eq('user_id', user.id) // Filtramos por el ID del usuario logueado
        .single(); // Esperamos solo un resultado

      // Condición de bloqueo:
      // Si ocurrió un error, si el perfil no se encontró, o si el perfil tiene 'is_active' en 'false'...
      if (error || !userProfile || !userProfile.is_active === false) {

        // 1. Mostramos un mensaje claro y directo al usuario.
        toast({
          title: "Acceso Denegado",
          description: "Tu cuenta no se encuentra activa. Por favor, contacta a soporte.",
          variant: "destructive",
        });

        // 2. Cerramos su sesión en Supabase para invalidar su token.
        await signOut();

        // 3. Lo redirigimos forzosamente a la página de login.
        navigate("/login");

        return; // Importante: detenemos la ejecución aquí para no cargar el dashboard.
      }

      // --- FIN DE LA LÓGICA DE SEGURIDAD ---

      // Si todas las verificaciones pasaron, significa que el usuario tiene permiso.
      // Ahora, podemos guardar sus datos de perfil en el estado del componente.
      setProfile(userProfile as UserProfile);
      setOnboardingStatusChecked(true);

      // Y continuamos con la lógica del tour de onboarding que ya tenías.
      if (!userProfile.onboarding_completed) {
        setTimeout(() => startOnboarding(), 500);
      }
    };

    // Llamamos a la función que acabamos de definir.
    checkProfileAndPermissions();

  // Esta lista de dependencias le dice a React que vuelva a ejecutar este efecto
  // si cambia alguno de estos valores. Es crucial incluir todos los que usamos.
  }, [user, loading, navigate, signOut, toast, startOnboarding]);
  
  useEffect(() => {
    if (isCompleted && profile?.onboarding_completed === false) {
      setProfile(prevProfile => prevProfile ? { ...prevProfile, onboarding_completed: true } : null);
    }
  }, [isCompleted, profile]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

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
      <OnboardingTour 
        run={run}
        steps={steps}
        stepIndex={stepIndex}
        handleJoyrideCallback={handleJoyrideCallback}
      />
      
      <div className="flex h-screen w-full bg-white">
        <AnimatedSidebar open={sidebarOpen} setOpen={setSidebarOpen}>
          <SidebarBody className="justify-between gap-10 h-full bg-gradient-to-b from-slate-900 to-purple-900">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* Logo */}
              <div className="flex items-center gap-3 py-6 px-2">
                <div className="h-10 w-10 bg-purple-600 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <motion.div
                  animate={{
                    display: sidebarOpen ? "block" : "none",
                    opacity: sidebarOpen ? 1 : 0,
                  }}
                  className="whitespace-pre"
                >
                  <h1 className="font-semibold text-white text-lg">Ya Quedo</h1>
                </motion.div>
              </div>
              
              {/* Navigation con mejor contraste */}
              <div className="mt-6 flex flex-col gap-1 px-2">
                {navigationItems.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link} 
                    isActive={location.pathname === link.href}
                    className={`
                      flex items-center justify-start gap-3 py-3 px-3 rounded-lg 
                      transition-colors duration-200 text-slate-300 hover:text-white hover:bg-white/10
                      ${location.pathname === link.href ? 'bg-white/20 text-white hover:bg-white/20 hover:text-white' : ''}
                    `}
                    data-tour-id={link.href === '/profile' ? 'profile-link' : undefined}
                  />
                ))}
              </div>
            </div>
            
            {/* User Section con mejor contraste */}
            <div className="border-t border-white/20 pt-6 px-2">
              {/* Info del usuario */}
              {profile && sidebarOpen && (
                <div className="mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-sm font-medium text-white truncate">{profile.full_name}</p>
                  <p className="text-xs text-slate-300 truncate">{profile.business_name}</p>
                </div>
              )}

              {/* Usage meter */}
              {profile && sidebarOpen && !usageLoading && (
                <div className="mb-4">
                  <UsageMeter
                    currentUsage={currentUsage}
                    limit={limit}
                    isUnlimited={isUnlimited}
                    planName={profile.selected_plan}
                  />
                </div>
              )}
              
              {/* Logout con mejor contraste */}
              <div 
                onClick={handleLogout}
                className="flex items-center justify-start gap-3 py-3 px-3 rounded-lg hover:bg-red-600/20 hover:text-red-300 text-slate-300 transition-colors duration-200 cursor-pointer mb-4"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                <motion.span
                  animate={{
                    display: sidebarOpen ? "inline-block" : "none",
                    opacity: sidebarOpen ? 1 : 0,
                  }}
                  className="text-sm font-medium whitespace-pre inline-block !p-0 !m-0"
                >
                  Cerrar Sesión
                </motion.span>
              </div>
              
              {/* Footer */}
              <motion.div
                animate={{
                  display: sidebarOpen ? "block" : "none",
                  opacity: sidebarOpen ? 1 : 0,
                }}
                className="pt-4 border-t border-white/20"
              >
                <div className="text-center">
                  <img 
                    src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" 
                    alt="Irrelevant Logo" 
                    className="h-5 w-auto mx-auto opacity-70"
                  />
                  <p className="text-xs text-slate-400 mt-2">© 2025</p>
                </div>
              </motion.div>
            </div>
          </SidebarBody>
        </AnimatedSidebar>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};