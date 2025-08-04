-- Primero eliminar el trigger existente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Recrear el trigger correctamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verificar que la función handle_new_user existe y tiene el código correcto
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Agregar logging para debug
  RAISE LOG 'Creating profile for user: %', NEW.id;
  RAISE LOG 'User metadata: %', NEW.raw_user_meta_data;
  
  INSERT INTO public.profiles (user_id, full_name, user_id_card, business_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_id_card', ''),
    COALESCE(NEW.raw_user_meta_data->>'business_name', '')
  );
  
  RAISE LOG 'Profile created successfully for user: %', NEW.id;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;  -- No fallar el registro si hay error en profile
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;