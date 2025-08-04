-- Añadir campo para nombre del establecimiento en la tabla profiles
ALTER TABLE public.profiles 
ADD COLUMN business_name TEXT NOT NULL DEFAULT '';

-- Actualizar la función para manejar el nuevo campo
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, user_id_card, business_name)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'user_id_card',
    NEW.raw_user_meta_data->>'business_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;