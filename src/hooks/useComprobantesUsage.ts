import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useComprobantesUsage = (selectedPlan: string) => {
  const [currentUsage, setCurrentUsage] = useState(0);
  const [validCount, setValidCount] = useState(0);
  const [invalidCount, setInvalidCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const planLimits = {
    basico: 150,
    profesional: 600,
    negocios: -1 // Ilimitado
  };

  const fetchCurrentUsage = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Obtener comprobantes del mes actual
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      // Contar todos los comprobantes
      const { count: totalCount, error: totalError } = await supabase
        .from('comprobantes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('fecha', firstDay.toISOString().split('T')[0])
        .lte('fecha', lastDay.toISOString().split('T')[0]);

      // Contar solo los válidos
      const { count: validCountResult, error: validError } = await supabase
        .from('comprobantes')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('es_valido', true)
        .gte('fecha', firstDay.toISOString().split('T')[0])
        .lte('fecha', lastDay.toISOString().split('T')[0]);

      if (totalError || validError) throw totalError || validError;
      
      const total = totalCount || 0;
      const valid = validCountResult || 0;
      const invalid = total - valid;
      
      setCurrentUsage(total);
      setValidCount(valid);
      setInvalidCount(invalid);
    } catch (error) {
      console.error('Error fetching comprobantes usage:', error);
      setCurrentUsage(0);
      setValidCount(0);
      setInvalidCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUsage();
  }, [selectedPlan]);

  const limit = planLimits[selectedPlan as keyof typeof planLimits] || planLimits.basico;
  const isUnlimited = limit === -1;
  const usagePercentage = isUnlimited ? 0 : (currentUsage / limit) * 100;

  return {
    currentUsage,
    validCount,
    invalidCount,
    limit,
    isUnlimited,
    usagePercentage,
    loading,
    refetch: fetchCurrentUsage
  };
};