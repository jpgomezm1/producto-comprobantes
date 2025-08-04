import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile, UserBankAccount, UserBankAccountFormData } from '@/types/profile';

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [accounts, setAccounts] = useState<UserBankAccount[]>([]);
  const { toast } = useToast();

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del perfil",
        variant: "destructive",
      });
    }
  };

  const fetchBankAccounts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_bank_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccounts(data || []);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las cuentas bancarias",
        variant: "destructive",
      });
    }
  };

  const addBankAccount = async (accountData: UserBankAccountFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('user_bank_accounts')
        .insert({
          ...accountData,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Cuenta bancaria agregada correctamente",
      });

      // Refresh the accounts list
      await fetchBankAccounts();
      return true;
    } catch (error) {
      console.error('Error adding bank account:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar la cuenta bancaria",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteBankAccount = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('user_bank_accounts')
        .delete()
        .eq('id', accountId);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Cuenta bancaria eliminada correctamente",
      });

      // Refresh the accounts list
      await fetchBankAccounts();
      return true;
    } catch (error) {
      console.error('Error deleting bank account:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la cuenta bancaria",
        variant: "destructive",
      });
      return false;
    }
  };

  const getUserEmail = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user?.email || '';
    } catch (error) {
      console.error('Error getting user email:', error);
      return '';
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchBankAccounts()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    loading,
    profile,
    accounts,
    addBankAccount,
    deleteBankAccount,
    getUserEmail,
    refetch: () => Promise.all([fetchProfile(), fetchBankAccounts()]),
  };
};