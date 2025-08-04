import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/hooks/useProfile';
import { UserBankAccountFormData } from '@/types/profile';
import { Plus, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useOnboarding } from '@/hooks/useOnboarding';

const ProfilePage = () => {
  const { loading, profile, accounts, addBankAccount, deleteBankAccount, getUserEmail } = useProfile();
  const { goToStep } = useOnboarding();
  const [userEmail, setUserEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<UserBankAccountFormData>({
    account_nickname: '',
    account_number: '',
    account_holder_name: '',
  });

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await getUserEmail();
      setUserEmail(email);
    };
    fetchEmail();
  }, [getUserEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addBankAccount(formData);
    if (success) {
      setIsDialogOpen(false);
      setFormData({
        account_nickname: '',
        account_number: '',
        account_holder_name: '',
      });
      // Le decimos al tour que vaya al paso 3 (el video)
      goToStep(3);
    }
  };

  const handleDelete = async (accountId: string) => {
    await deleteBankAccount(accountId);
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    return '****' + accountNumber.slice(-4);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la Cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
        
        <div className="space-y-6">
          {/* Información del Usuario */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nombre Completo</Label>
                  <Input value={profile?.full_name || ''} readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nombre del Establecimiento</Label>
                  <Input value={profile?.business_name || ''} readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">ID (Cédula)</Label>
                  <Input value={profile?.user_id_card || ''} readOnly className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email del Usuario</Label>
                  <Input value={userEmail} readOnly className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cuentas Bancarias */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mis Cuentas de Recaudo</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button data-tour-id="add-account-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Nueva Cuenta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Añadir Nueva Cuenta de Recaudo</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="account_nickname">Nombre o alias de la cuenta</Label>
                      <Input
                        id="account_nickname"
                        value={formData.account_nickname}
                        onChange={(e) => setFormData({ ...formData, account_nickname: e.target.value })}
                        placeholder="Ej: Cuenta principal Empresa"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="account_number">Número de la cuenta</Label>
                      <Input
                        id="account_number"
                        value={formData.account_number}
                        onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                        placeholder="Número de cuenta"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="account_holder_name">Nombre del titular (Destino)</Label>
                      <Input
                        id="account_holder_name"
                        value={formData.account_holder_name}
                        onChange={(e) => setFormData({ ...formData, account_holder_name: e.target.value })}
                        placeholder="Ej: irrelevant"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        Guardar Cuenta
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {accounts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Aún no has registrado ninguna cuenta.</p>
                  <p>¡Añade tu primera cuenta para empezar!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{account.account_nickname}</p>
                        <p className="text-sm text-muted-foreground">
                          Cuenta: {maskAccountNumber(account.account_number)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Titular: {account.account_holder_name}
                        </p>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará permanentemente la cuenta "{account.account_nickname}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(account.id)}>
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;