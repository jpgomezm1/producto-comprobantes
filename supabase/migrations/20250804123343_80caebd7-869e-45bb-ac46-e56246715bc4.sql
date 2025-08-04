-- Paso 1: Limpiar datos de prueba (opcional para desarrollo)
-- TRUNCATE TABLE public.comprobantes, public.profiles RESTART IDENTITY CASCADE;

-- Paso 2: Modificar la tabla profiles para agregar plan y estado de onboarding
ALTER TABLE public.profiles
ADD COLUMN selected_plan TEXT NOT NULL DEFAULT 'basico';

ALTER TABLE public.profiles  
ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT false;

-- Paso 3: Actualizar la función handle_new_user para incluir el plan
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Agregar logging para debug
  RAISE LOG 'Creating profile for user: %', NEW.id;
  RAISE LOG 'User metadata: %', NEW.raw_user_meta_data;
  
  INSERT INTO public.profiles (user_id, full_name, user_id_card, business_name, selected_plan)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_id_card', ''),
    COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'plan', 'basico') -- Nuevo campo con valor por defecto
  );
  
  RAISE LOG 'Profile created successfully for user: %', NEW.id;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;  -- No fallar el registro si hay error en profile
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;