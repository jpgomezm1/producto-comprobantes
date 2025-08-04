import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Comprobante, ComprobanteFormData, ComprobanteFilters, StatsData } from '@/types';

export const useComprobantes = () => {
  const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const { toast } = useToast();

  const fetchComprobantes = async (filters?: ComprobanteFilters) => {
    try {
      setLoading(true);
      let query = supabase
        .from('comprobantes')
        .select('*')
        .order('fecha', { ascending: false });

      // Aplicar filtros
      if (filters?.fecha) {
        query = query.eq('fecha', filters.fecha);
      }
      
      if (filters?.fechaInicio && filters?.fechaFin) {
        query = query.gte('fecha', filters.fechaInicio).lte('fecha', filters.fechaFin);
      }
      
      if (filters?.banco && filters.banco !== 'Todos') {
        query = query.eq('banco_emisor', filters.banco);
      }
      
      if (filters?.estado) {
        const esValido = filters.estado === 'Válidos';
        query = query.eq('es_valido', esValido);
      }
      
      if (filters?.beneficiario) {
        query = query.ilike('beneficiario', `%${filters.beneficiario}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setComprobantes(data || []);
      return data || [];
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al cargar los comprobantes.",
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createComprobante = async (data: ComprobanteFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('comprobantes')
        .insert([data]);

      if (error) {
        throw error;
      }

      toast({
        title: "¡Éxito!",
        description: "Comprobante creado correctamente.",
      });

      // Recargar comprobantes
      await fetchComprobantes();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al crear el comprobante.",
        variant: "destructive",
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateComprobante = async (id: string, data: Partial<ComprobanteFormData>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('comprobantes')
        .update(data)
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "¡Éxito!",
        description: "Comprobante actualizado correctamente.",
      });

      // Recargar comprobantes
      await fetchComprobantes();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al actualizar el comprobante.",
        variant: "destructive",
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteComprobante = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('comprobantes')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "¡Éxito!",
        description: "Comprobante eliminado correctamente.",
      });

      // Recargar comprobantes
      await fetchComprobantes();
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al eliminar el comprobante.",
        variant: "destructive",
      });
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('comprobantes')
        .select('banco_emisor, valor_transferencia, es_valido');

      if (error) {
        throw error;
      }

      const comprobantesData = data || [];
      
      // Calcular estadísticas
      const totalComprobantes = comprobantesData.length;
      const montoTotal = comprobantesData.reduce((sum, item) => sum + item.valor_transferencia, 0);
      const comprobantesValidos = comprobantesData.filter(item => item.es_valido).length;
      
      // Banco más usado
      const bancoCount: Record<string, number> = {};
      comprobantesData.forEach(item => {
        bancoCount[item.banco_emisor] = (bancoCount[item.banco_emisor] || 0) + 1;
      });
      
      const bancoMasUsado = Object.entries(bancoCount)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

      const statsData: StatsData = {
        totalComprobantes,
        montoTotal,
        comprobantesValidos,
        bancoMasUsado,
      };

      setStats(statsData);
      return statsData;
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al cargar las estadísticas.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Cargar comprobantes al inicializar
  useEffect(() => {
    fetchComprobantes();
    fetchStats();
  }, []);

  return {
    comprobantes,
    loading,
    stats,
    fetchComprobantes,
    createComprobante,
    updateComprobante,
    deleteComprobante,
    fetchStats,
  };
};