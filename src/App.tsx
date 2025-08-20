import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "@/hooks/useOnboarding";
import { WelcomeProvider, useWelcome } from "@/contexts/WelcomeContext";
import { WelcomeDialog } from "@/components/auth/WelcomeDialog";
import { SupportButton } from "@/components/SupportButton";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { showWelcome, userName, closeWelcome, triggerWelcome } = useWelcome();
  
  // Escuchar evento de login exitoso
  useEffect(() => {
    const handleLoginSuccess = (event: CustomEvent) => {
      const { userName } = event.detail;
      triggerWelcome(userName);
    };

    window.addEventListener('loginSuccess', handleLoginSuccess as EventListener);
    return () => window.removeEventListener('loginSuccess', handleLoginSuccess as EventListener);
  }, [triggerWelcome]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Botón de soporte flotante en todas las páginas */}
      <SupportButton />
      
      {/* Welcome Dialog */}
      <WelcomeDialog 
        isOpen={showWelcome} 
        onClose={closeWelcome} 
        userName={userName} 
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WelcomeProvider>
          <OnboardingProvider>
            <AppContent />
          </OnboardingProvider>
        </WelcomeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;