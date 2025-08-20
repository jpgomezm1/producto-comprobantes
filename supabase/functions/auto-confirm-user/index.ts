
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Cliente con permisos de admin
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

interface AutoConfirmRequest {
  email: string;
  password: string;
  fullName: string;
  userIdCard: string;
  businessName: string;
  plan?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, fullName, userIdCard, businessName, plan = 'basico' }: AutoConfirmRequest = await req.json();

    console.log('Auto-confirm user request:', { email, fullName, businessName, plan });

    // 1. Crear usuario con confirmación automática usando admin client
    const { data: signUpData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Confirmar automáticamente
      user_metadata: {
        full_name: fullName,
        user_id_card: userIdCard,
        business_name: businessName,
        plan: plan
      }
    });

    if (signUpError) {
      console.error('Error creating user:', signUpError);
      throw signUpError;
    }

    if (!signUpData.user) {
      throw new Error('No user data returned from createUser');
    }

    console.log('User created successfully:', signUpData.user.id);

    // 2. Crear perfil en la tabla profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        user_id: signUpData.user.id,
        full_name: fullName,
        user_id_card: userIdCard,
        business_name: businessName,
        selected_plan: plan,
        is_active: true,
        onboarding_completed: false
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
      // No fallar por esto, el usuario ya está creado
      console.log('Profile creation failed but user exists, continuing...');
    } else {
      console.log('Profile created successfully');
    }

    // 3. Retornar datos para login inmediato
    return new Response(JSON.stringify({
      success: true,
      user: signUpData.user,
      message: 'Usuario creado y confirmado automáticamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in auto-confirm function:', error);
    
    let errorMessage = 'Error al crear la cuenta';
    let statusCode = 500;

    // Manejo específico de errores
    if (error.message.includes('duplicate key value violates unique constraint')) {
      if (error.message.includes('profiles_user_id_card_key')) {
        errorMessage = 'La cédula ya está registrada con otra cuenta';
      } else if (error.message.includes('users_email_key')) {
        errorMessage = 'Este email ya está registrado';
      } else {
        errorMessage = 'Ya existe una cuenta con estos datos';
      }
      statusCode = 400;
    } else if (error.message.includes('User already registered') || error.message.includes('A user with this email address has already been registered')) {
      errorMessage = 'Este email ya está registrado. Intenta iniciar sesión en su lugar.';
      statusCode = 400;
    } else if (error.code === 'email_exists') {
      errorMessage = 'Este email ya está registrado. Intenta iniciar sesión en su lugar.';
      statusCode = 400;
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: error.message 
      }),
      {
        status: statusCode,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
