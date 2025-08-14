export interface Comprobante {
  id: string;
  user_id: string;
  banco_emisor: string;
  tipo_comprobante?: string;
  numero_comprobante?: string;
  numero_referencia?: string;
  fecha: string;
  hora?: string;
  valor_transferencia: number;
  moneda: string;
  beneficiario: string;
  cuenta_origen?: string;
  cuenta_destino?: string;
  estado_transaccion?: string;
  observaciones?: string;
  es_valido: boolean;
  imagen_url?: string | null;
  imagen_filename?: string | null;
  imagen_gcs_path?: string | null;
  imagen_size_bytes?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ComprobanteFormData {
  banco_emisor: string;
  tipo_comprobante?: string;
  numero_comprobante?: string;
  numero_referencia?: string;
  fecha: string;
  hora?: string;
  valor_transferencia: number;
  moneda: string;
  beneficiario: string;
  cuenta_origen?: string;
  cuenta_destino?: string;
  estado_transaccion?: string;
  observaciones?: string;
  es_valido: boolean;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface ComprobanteFilters {
  fecha?: string;
  fechaInicio?: string;
  fechaFin?: string;
  banco?: string;
  estado?: string;
  beneficiario?: string;
}

export interface StatsData {
  totalComprobantes: number;
  montoTotal: number;
  comprobantesValidos: number;
  bancoMasUsado: string;
}

export const BANCOS = [
  'Todos',
  'Nequi',
  'Bancolombia', 
  'BBVA',
  'Davivienda',
  'Banco de Bogotá',
  'Banco Popular',
  'Colpatria',
  'Otro'
] as const;

export const TIPOS_COMPROBANTE = [
  'Transferencia',
  'Pago',
  'Consignación',
  'Retiro',
  'Otro'
] as const;

export const ESTADOS_TRANSACCION = [
  'Exitosa',
  'Pendiente',
  'Fallida',
  'Cancelada'
] as const;