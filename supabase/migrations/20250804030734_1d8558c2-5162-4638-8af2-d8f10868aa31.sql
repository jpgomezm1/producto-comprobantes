-- Crear perfil para el usuario existente (basado en los metadatos que vi)
INSERT INTO public.profiles (user_id, full_name, user_id_card, business_name)
VALUES (
  '78c0679e-55ff-44c2-b25a-c5357d42ff4e', 
  'Juan Gomez',
  'TEMP_ID_001', -- ID temporal ya que no se registró originalmente
  'Mi Establecimiento' -- Nombre temporal
)
ON CONFLICT (user_id) DO NOTHING;