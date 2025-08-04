-- Crear tabla para cuentas bancarias de usuarios
CREATE TABLE public.user_bank_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_nickname TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Habilitar Row Level Security
ALTER TABLE public.user_bank_accounts ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view their own bank accounts" 
ON public.user_bank_accounts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bank accounts" 
ON public.user_bank_accounts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bank accounts" 
ON public.user_bank_accounts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bank accounts" 
ON public.user_bank_accounts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Índice para mejorar performance en consultas por user_id
CREATE INDEX idx_user_bank_accounts_user_id ON public.user_bank_accounts(user_id);