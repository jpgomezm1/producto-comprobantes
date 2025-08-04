export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      comprobantes: {
        Row: {
          banco_emisor: string
          beneficiario: string | null
          created_at: string
          cuenta_destino: string | null
          cuenta_origen: string | null
          es_valido: boolean | null
          estado_transaccion: string | null
          fecha: string
          hora: string | null
          id: string
          imagen_filename: string | null
          imagen_gcs_path: string | null
          imagen_size_bytes: number | null
          imagen_url: string | null
          moneda: string | null
          numero_comprobante: string | null
          numero_referencia: string | null
          observaciones: string | null
          tipo_comprobante: string | null
          updated_at: string
          user_id: string | null
          valor_transferencia: number
        }
        Insert: {
          banco_emisor: string
          beneficiario?: string | null
          created_at?: string
          cuenta_destino?: string | null
          cuenta_origen?: string | null
          es_valido?: boolean | null
          estado_transaccion?: string | null
          fecha: string
          hora?: string | null
          id?: string
          imagen_filename?: string | null
          imagen_gcs_path?: string | null
          imagen_size_bytes?: number | null
          imagen_url?: string | null
          moneda?: string | null
          numero_comprobante?: string | null
          numero_referencia?: string | null
          observaciones?: string | null
          tipo_comprobante?: string | null
          updated_at?: string
          user_id?: string | null
          valor_transferencia: number
        }
        Update: {
          banco_emisor?: string
          beneficiario?: string | null
          created_at?: string
          cuenta_destino?: string | null
          cuenta_origen?: string | null
          es_valido?: boolean | null
          estado_transaccion?: string | null
          fecha?: string
          hora?: string | null
          id?: string
          imagen_filename?: string | null
          imagen_gcs_path?: string | null
          imagen_size_bytes?: number | null
          imagen_url?: string | null
          moneda?: string | null
          numero_comprobante?: string | null
          numero_referencia?: string | null
          observaciones?: string | null
          tipo_comprobante?: string | null
          updated_at?: string
          user_id?: string | null
          valor_transferencia?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_name: string
          created_at: string
          full_name: string
          id: string
          updated_at: string
          user_id: string
          user_id_card: string
        }
        Insert: {
          business_name?: string
          created_at?: string
          full_name: string
          id?: string
          updated_at?: string
          user_id: string
          user_id_card: string
        }
        Update: {
          business_name?: string
          created_at?: string
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string
          user_id_card?: string
        }
        Relationships: []
      }
      user_bank_accounts: {
        Row: {
          account_holder_name: string
          account_nickname: string
          account_number: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          account_holder_name: string
          account_nickname: string
          account_number: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          account_holder_name?: string
          account_nickname?: string
          account_number?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
