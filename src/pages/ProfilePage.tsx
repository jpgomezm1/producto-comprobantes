import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '@/hooks/useProfile';
import { useComprobantesUsage } from '@/hooks/useComprobantesUsage';
import { UserBankAccountFormData } from '@/types/profile';
import { 
  Plus, 
  Trash2, 
  User, 
  Building, 
  CreditCard, 
  Mail, 
  Shield,
  Eye,
  EyeOff,
  Zap,
  BarChart3,
  ArrowUp,
  MessageCircle,
  Crown
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useOnboarding } from '@/hooks/useOnboarding';

const ProfilePage = () => {
  const { loading, profile, accounts, addBankAccount, deleteBankAccount, getUserEmail } = useProfile();
  const { currentUsage, limit, isUnlimited, loading: usageLoading } = useComprobantesUsage(profile?.selected_plan || 'basico');
  const { goToStep } = useOnboarding();
  const [userEmail, setUserEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [maskedAccounts, setMaskedAccounts] = useState<{[key: string]: boolean}>({});
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
      goToStep(3);
    }
  };

  const handleDelete = async (accountId: string) => {
    await deleteBankAccount(accountId);
  };

  const maskAccountNumber = (accountNumber: string, accountId: string) => {
    if (maskedAccounts[accountId]) {
      return accountNumber;
    }
    if (accountNumber.length <= 4) return accountNumber;
    return '****' + accountNumber.slice(-4);
  };

  const toggleAccountVisibility = (accountId: string) => {
    setMaskedAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const handleWhatsAppRedirect = (messageType: 'upgrade' | 'credits') => {
    const whatsappNumber = '573024097476'; // Número de WhatsApp
    const currentPlan = profile?.selected_plan || 'basico';
    
    let message = '';
    
    if (messageType === 'upgrade') {
      message = `Hola! Me gustaría hacer upgrade de mi plan actual (${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}) a un plan superior. Mi correo es: ${userEmail}`;
    } else {
      message = `Hola! Me gustaría comprar créditos adicionales para mi cuenta. Plan actual: ${currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}. Créditos usados: ${currentUsage}/${isUnlimited ? 'Ilimitado' : limit}. Mi correo es: ${userEmail}`;
    }
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsUpgradeDialogOpen(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j}>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 pt-4 md:pt-6 space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Gestiona tu información personal y cuentas bancarias</p>
          </div>
        </div>
        
        {/* Sección de créditos disponibles */}
        {!usageLoading && (
          <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-indigo-50 backdrop-blur-sm">
            <CardContent className="pt-4 sm:pt-6">
              {/* Layout responsivo: vertical en móviles, horizontal en desktop */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Créditos Disponibles
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">Uso mensual de comprobantes</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:text-right items-start sm:items-end gap-3">
                  {/* Stats */}
                  <div className="flex items-center sm:items-end justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-0">
                    <div className="sm:text-right">
                      {isUnlimited ? (
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold text-purple-600">{currentUsage}</div>
                          <div className="text-sm text-gray-500">Comprobantes usados</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold text-purple-600">{limit - currentUsage}</div>
                          <div className="text-sm text-gray-500">Créditos restantes</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {currentUsage} / {limit} usados
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Badge para ilimitado - solo en móviles lo mostramos aquí */}
                    {isUnlimited && (
                      <Badge className="sm:hidden bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 px-3 py-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Ilimitado
                      </Badge>
                    )}
                  </div>
                  
                  {/* Badge para ilimitado - en desktop */}
                  {isUnlimited && (
                    <Badge className="hidden sm:flex bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 px-3 py-1">
                      <Zap className="h-3 w-3 mr-1" />
                      Ilimitado
                    </Badge>
                  )}
                  
                  {/* Botón de Upgrade */}
                  <Button 
                    onClick={() => setIsUpgradeDialogOpen(true)}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg text-sm px-4 py-2"
                    size="sm"
                  >
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Mejorar Plan
                  </Button>
                </div>
              </div>
              
              {!isUnlimited && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progreso mensual</span>
                    <span className="text-sm text-gray-500">
                      {Math.round((currentUsage / limit) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((currentUsage / limit) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Información del Usuario */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex-shrink-0">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <span className="text-gray-900">Información Personal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-purple-600" />
                    Nombre Completo
                  </Label>
                  <Input 
                    value={profile?.full_name || ''} 
                    readOnly 
                    className="bg-gray-50 border-gray-200 text-gray-900 font-medium" 
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-purple-600" />
                    Nombre del Establecimiento
                  </Label>
                  <Input 
                    value={profile?.business_name || ''} 
                    readOnly 
                    className="bg-gray-50 border-gray-200 text-gray-900 font-medium" 
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-purple-600" />
                    Número de Identificación
                  </Label>
                  <Input 
                    value={profile?.user_id_card || ''} 
                    readOnly 
                    className="bg-gray-50 border-gray-200 text-gray-900 font-medium" 
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-purple-600" />
                    Correo Electrónico
                  </Label>
                  <Input 
                    value={userEmail} 
                    readOnly 
                    className="bg-gray-50 border-gray-200 text-gray-900 font-medium" 
                  />
                </div>
              </div>

              {/* Plan Badge */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Plan Actual</span>
                  <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200 px-3 py-1 capitalize">
                    <Zap className="h-3 w-3 mr-1" />
                    {profile?.selected_plan || 'Básico'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cuentas Bancarias */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 sm:pb-4 gap-3 sm:gap-4">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex-shrink-0">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <span className="text-gray-900">Cuentas de Recaudo</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0.5">
                      {accounts.length} configuradas
                    </Badge>
                  </div>
                </div>
              </CardTitle>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg text-sm"
                    data-tour-id="add-account-button"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Cuenta
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                        <Plus className="h-4 w-4 text-purple-600" />
                      </div>
                      Añadir Nueva Cuenta
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="account_nickname" className="text-sm font-semibold text-gray-700">
                        Nombre o alias de la cuenta
                      </Label>
                      <Input
                        id="account_nickname"
                        value={formData.account_nickname}
                        onChange={(e) => setFormData({ ...formData, account_nickname: e.target.value })}
                        placeholder="Ej: Cuenta principal Empresa"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="account_number" className="text-sm font-semibold text-gray-700">
                        Número de la cuenta
                      </Label>
                      <Input
                        id="account_number"
                        value={formData.account_number}
                        onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                        placeholder="Número de cuenta"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="account_holder_name" className="text-sm font-semibold text-gray-700">
                        Nombre del titular
                      </Label>
                      <Input
                        id="account_holder_name"
                        value={formData.account_holder_name}
                        onChange={(e) => setFormData({ ...formData, account_holder_name: e.target.value })}
                        placeholder="Nombre del titular de la cuenta"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      >
                        Guardar Cuenta
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            
            <CardContent>
              {accounts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">No hay cuentas registradas</h3>
                  <p className="text-gray-500 mb-6">Añade tu primera cuenta para empezar a recibir validaciones automáticas</p>
                  <Button 
                    onClick={() => setIsDialogOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Primera Cuenta
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.id} className="group p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 hover:border-purple-200 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{account.account_nickname}</h4>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CreditCard className="h-4 w-4 text-purple-600" />
                            <span>Cuenta: {maskAccountNumber(account.account_number, account.id)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-purple-100"
                              onClick={() => toggleAccountVisibility(account.id)}
                            >
                              {maskedAccounts[account.id] ? 
                                <EyeOff className="h-3 w-3 text-gray-500" /> : 
                                <Eye className="h-3 w-3 text-gray-500" />
                              }
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4 text-green-600" />
                            <span>Titular: {account.account_holder_name}</span>
                          </div>
                        </div>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar cuenta?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente la cuenta "{account.account_nickname}" y dejará de recibir validaciones automáticas.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(account.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dialog de Upgrade */}
        <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
          <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex-shrink-0">
                  <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <span className="truncate">Mejorar tu Plan</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
              <div className="text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  ¿Cómo te gustaría mejorar tu experiencia con Ya Quedo?
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Upgrade de Plan */}
                <div 
                  onClick={() => handleWhatsAppRedirect('upgrade')}
                  className="group p-3 sm:p-4 border-2 border-dashed border-green-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 cursor-pointer transition-all duration-200 active:scale-95"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                      <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors text-sm sm:text-base">
                        Upgrade de Plan
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                        Cambia a un plan superior con más beneficios
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs text-green-600 font-medium">Contactar por WhatsApp</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Comprar Créditos Adicionales */}
                {!isUnlimited && (
                  <div 
                    onClick={() => handleWhatsAppRedirect('credits')}
                    className="group p-3 sm:p-4 border-2 border-dashed border-purple-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer transition-all duration-200 active:scale-95"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors text-sm sm:text-base">
                          Comprar Créditos Extra
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                          Agrega créditos adicionales a tu plan actual
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
                          <span className="text-xs text-purple-600 font-medium">Contactar por WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-3 sm:pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setIsUpgradeDialogOpen(false)}
                  className="w-full text-sm sm:text-base py-2 sm:py-3"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;