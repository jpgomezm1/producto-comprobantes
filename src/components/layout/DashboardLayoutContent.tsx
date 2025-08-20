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
  BadgeCheck,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useComprobantesUsage } from "@/hooks/useComprobantesUsage";
import { UsageMeter } from "@/components/onboarding/UsageMeter";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { BrandedLoader } from "@/components/ui/branded-loader";

interface UserProfile {
  full_name: string;
  business_name: string;
  user_id_card: string;
  selected_plan: string;
  onboarding_completed: boolean;
  is_active?: boolean;
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

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    const checkProfileAndPermissions = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const { data: userProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          if (error.code !== 'PGRST116' && !error.message.includes('timeout')) {
            toast({
              title: "Error de acceso",
              description: "No se pudo cargar tu perfil. Intenta nuevamente.",
              variant: "destructive",
            });
            await signOut();
            navigate("/login");
          }
          return;
        }

        if (!userProfile) {
          toast({
            title: "Perfil no encontrado",
            description: "Tu perfil no existe. Contacta a soporte.",
            variant: "destructive",
          });
          await signOut();
          navigate("/login");
          return;
        }

        // Check if user is active (if the field exists in the profile)
        const typedProfile = userProfile as any;
        if (typedProfile.is_active !== undefined && typedProfile.is_active === false) {
          toast({
            title: "Acceso Denegado",
            description: "Tu cuenta no se encuentra activa. Por favor, contacta a soporte.",
            variant: "destructive",
          });
          await signOut();
          navigate("/login");
          return;
        }

        setProfile(userProfile as UserProfile);
        setOnboardingStatusChecked(true);

        if (!userProfile.onboarding_completed) {
          setTimeout(() => startOnboarding(), 500);
        }

      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          title: "Error inesperado",
          description: "Ocurrió un error inesperado. Intenta nuevamente.",
          variant: "destructive",
        });
        await signOut();
        navigate("/login");
      }
    };

    checkProfileAndPermissions();
  }, [user, loading, navigate, signOut, toast, startOnboarding]);
  
  useEffect(() => {
    if (isCompleted && profile?.onboarding_completed === false) {
      setProfile(prevProfile => prevProfile ? { ...prevProfile, onboarding_completed: true } : null);
    }
  }, [isCompleted, profile]);

  if (loading || !profile) {
    return <BrandedLoader text="Cargando..." />;
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
      
      <div className="w-full min-h-screen bg-white">
        {/* Mobile Layout - Stack vertically */}
        <div className="md:hidden">
          <AnimatedSidebar open={sidebarOpen} setOpen={setSidebarOpen}>
            <SidebarBody className="justify-between gap-10 h-full bg-gradient-to-b from-slate-900 to-purple-900">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Logo mejorado */}
                <div className="flex items-center gap-3 py-6 px-2 border-b border-white/10">
                  <motion.div
                    animate={{
                      width: sidebarOpen ? "auto" : "60px",
                    }}
                    className="flex items-center justify-center flex-shrink-0"
                  >
                    {sidebarOpen ? (
                      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="relative">
                          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-purple-200 transition-colors">
                            Ya Quedó
                          </span>
                          <span className="text-xs text-purple-300 font-medium uppercase tracking-wider">
                            Dashboard
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      </div>
                    )}
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
          
          {/* Mobile Main Content */}
          <main className="w-full bg-gray-50 pt-16">
            <div className="w-full min-h-[calc(100vh-4rem)] pb-4">
              {children}
            </div>
          </main>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex md:h-screen">
          <AnimatedSidebar open={sidebarOpen} setOpen={setSidebarOpen}>
            <SidebarBody className="justify-between gap-10 h-full bg-gradient-to-b from-slate-900 to-purple-900">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Logo mejorado */}
                <div className="flex items-center gap-3 py-6 px-2 border-b border-white/10">
                  <motion.div
                    animate={{
                      width: sidebarOpen ? "auto" : "60px",
                    }}
                    className="flex items-center justify-center flex-shrink-0"
                  >
                    {sidebarOpen ? (
                      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="relative">
                          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-purple-200 transition-colors">
                            Ya Quedó
                          </span>
                          <span className="text-xs text-purple-300 font-medium uppercase tracking-wider">
                            Dashboard
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      </div>
                    )}
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
          
          {/* Desktop Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-auto bg-gray-50">
              <div className="w-full min-h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};