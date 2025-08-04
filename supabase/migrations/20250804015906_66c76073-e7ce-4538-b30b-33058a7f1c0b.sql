-- Crear tabla de comprobantes bancarios
CREATE TABLE comprobantes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  banco_emisor VARCHAR(50) NOT NULL,
  tipo_comprobante VARCHAR(30),
  numero_comprobante VARCHAR(100),
  numero_referencia VARCHAR(100),
  fecha DATE NOT NULL,
  hora TIME,
  valor_transferencia DECIMAL(15,2) NOT NULL,
  moneda VARCHAR(10) DEFAULT 'COP',
  beneficiario VARCHAR(200),
  cuenta_origen VARCHAR(100),
  cuenta_destino VARCHAR(100),
  estado_transaccion VARCHAR(50),
  observaciones TEXT,
  es_valido BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear índices para optimizar consultas
CREATE INDEX idx_comprobantes_user_id ON comprobantes(user_id);
CREATE INDEX idx_comprobantes_fecha ON comprobantes(fecha);
CREATE INDEX idx_comprobantes_banco ON comprobantes(banco_emisor);
CREATE INDEX idx_comprobantes_valor ON comprobantes(valor_transferencia);

-- Habilitar Row Level Security
ALTER TABLE comprobantes ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo puedan ver sus propios comprobantes
CREATE POLICY "Users can view own comprobantes" ON comprobantes
  FOR SELECT USING (auth.uid() = user_id);

-- Política para insertar comprobantes
CREATE POLICY "Users can insert own comprobantes" ON comprobantes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para actualizar comprobantes
CREATE POLICY "Users can update own comprobantes" ON comprobantes
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para eliminar comprobantes
CREATE POLICY "Users can delete own comprobantes" ON comprobantes
  FOR DELETE USING (auth.uid() = user_id);

-- Función para actualizar el timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar automáticamente updated_at
CREATE TRIGGER update_comprobantes_updated_at
    BEFORE UPDATE ON comprobantes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();