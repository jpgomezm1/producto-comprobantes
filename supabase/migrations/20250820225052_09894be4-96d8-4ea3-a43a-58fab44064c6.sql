-- Configurar autenticación sin confirmación de email

-- Esta migración deshabilitará la confirmación de email para que los usuarios
-- puedan registrarse y acceder inmediatamente sin necesidad de confirmar su email

-- Nota: Los cambios principales se hacen desde el panel de Supabase
-- Esta migración actualiza la configuración existente si es necesaria

-- Actualizar la configuración para no requerir confirmación de email
UPDATE auth.config 
SET email_confirm_signup = false
WHERE email_confirm_signup = true;

-- Asegurar que los usuarios nuevos estén confirmados automáticamente
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmation_token = NULL,
    confirmation_sent_at = NULL
WHERE email_confirmed_at IS NULL 
AND created_at > NOW() - INTERVAL '1 hour';