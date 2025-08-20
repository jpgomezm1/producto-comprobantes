
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Configurar listener de cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      console.log('Attempting sign in for:', email);
      
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
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

      if (data?.user && data?.session) {
        console.log('Sign in successful for:', data.user.email);
        
        // Trigger welcome event
        setTimeout(() => {
          const userName = data.user.email || 'Usuario';
          window.dispatchEvent(new CustomEvent('loginSuccess', { 
            detail: { userName } 
          }));
        }, 500);
        
        setLoading(false);
        return { error: null };
      }

      setLoading(false);
      return { error: null };
      
    } catch (error: any) {
      console.error('Sign in exception:', error);
      setLoading(false);
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
      
      console.log('Starting sign up process for:', email);
      
      // Usar nuestra edge function para registro con confirmación automática
      const { data, error } = await supabase.functions.invoke('auto-confirm-user', {
        body: {
          email,
          password,
          fullName,
          userIdCard,
          businessName,
          plan
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Error al crear la cuenta');
      }

      if (!data.success) {
        console.error('Edge function returned error:', data.error);
        throw new Error(data.error || 'Error al crear la cuenta');
      }

      console.log('User created successfully, attempting auto-login');

      // Pequeña pausa para asegurar que el usuario esté completamente creado
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Intentar login automático
      const loginResult = await signIn(email, password);
      
      if (loginResult.error) {
        console.error('Auto-login failed:', loginResult.error);
        toast({
          title: "¡Cuenta creada!",
          description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión manualmente.",
        });
        return { error: null };
      }

      console.log('Auto-login successful');
      
      toast({
        title: "¡Registro exitoso!",
        description: "Tu cuenta ha sido creada correctamente. ¡Bienvenido!",
      });

      return { error: null };
      
    } catch (error: any) {
      console.error("SignUp Error:", error);
      
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
      console.log('Signing out user');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
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
