import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
// import { useWelcome } from '@/contexts/WelcomeContext';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // const { triggerWelcome } = useWelcome();

  useEffect(() => {
    // Configurar listener de cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        const errorMessage = 
          error.message === 'Invalid login credentials' 
            ? 'Credenciales inválidas. Verifica tu email y contraseña.'
            : 'Error al iniciar sesión. Inténtalo de nuevo.';
        
        toast({
          title: "Error al iniciar sesión",
          description: errorMessage,
          variant: "destructive",
        });
        
        return { error: error.message };
      }

      // Login exitoso - mostrar welcome dialog
      if (data?.user && data?.session) {
        // Pequeño delay para asegurar que el estado se actualice primero
        setTimeout(() => {
          // Obtener nombre del email o usar email completo
          const userName = data.user.email || 'Usuario';
          // Disparar evento personalizado para el welcome dialog
          window.dispatchEvent(new CustomEvent('loginSuccess', { 
            detail: { userName } 
          }));
        }, 500);
        
        setLoading(false);
        return { error: null };
      }

      // Caso inesperado - no hay error pero tampoco usuario
      setLoading(false);
      return { error: null }; // Cambiamos esto para no mostrar error si el login técnicamente funcionó
      
    } catch (error: any) {
      setLoading(false);
      // Solo mostrar error si realmente hubo una excepción
      toast({
        title: "Error al iniciar sesión",
        description: 'Error de conexión. Inténtalo de nuevo.',
        variant: "destructive",
      });
      
      return { error: error.message };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userIdCard: string, businessName: string, plan: string = 'basico') => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_id_card: userIdCard,
            business_name: businessName,
            plan: plan
          }
        }
      });

      if (error) {
        throw error;
      }

      // Si el usuario se registró exitosamente y no necesita confirmación por email
      if (data?.user && data?.session) {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada correctamente. ¡Bienvenido!",
        });
        
        // Trigger welcome event
        setTimeout(() => {
          const userName = data.user.email || 'Usuario';
          window.dispatchEvent(new CustomEvent('loginSuccess', { 
            detail: { userName } 
          }));
        }, 500);
      } else if (data?.user && !data?.session) {
        // Caso donde se requiere confirmación por email (no debería pasar con la configuración actual)
        toast({
          title: "¡Registro casi listo!",
          description: "Revisa tu email para confirmar tu cuenta.",
        });
      }

      return { error: null };
    } catch (error: any) {
      console.error("SignUp Error:", error); // Añadimos un log para ver el error completo en consola.
      
      let errorMessage = 'Error al registrarse. Inténtalo de nuevo.';
      if (error.message.includes('duplicate key value violates unique constraint "profiles_user_id_card_key"')) {
        errorMessage = 'La cédula o ID ya está registrada con otra cuenta.';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email ya está registrado. Intenta iniciar sesión.';
      }
      
      toast({
        title: "Error al registrarse",
        description: errorMessage,
        variant: "destructive",
      });
      
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al cerrar sesión.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
};