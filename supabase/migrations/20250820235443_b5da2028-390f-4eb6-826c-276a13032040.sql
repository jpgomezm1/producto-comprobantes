-- Create the missing profile for the existing user
-- First, let's check if we need to add any missing users to profiles
INSERT INTO public.profiles (user_id, full_name, user_id_card, business_name, selected_plan, onboarding_completed, is_active)
SELECT 
  au.id as user_id,
  COALESCE(au.raw_user_meta_data->>'full_name', 'Usuario') as full_name,
  COALESCE(au.raw_user_meta_data->>'user_id_card', '') as user_id_card,
  COALESCE(au.raw_user_meta_data->>'business_name', 'Mi Empresa') as business_name,
  COALESCE(au.raw_user_meta_data->>'plan', 'basico') as selected_plan,
  false as onboarding_completed,
  true as is_active
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.user_id
WHERE p.user_id IS NULL
AND au.email_confirmed_at IS NOT NULL;