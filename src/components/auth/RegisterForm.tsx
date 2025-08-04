import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Eye, EyeOff, Loader2, Check, X, Info } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    userIdCard: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlPlan = searchParams.get('plan') || 'basico';
  const [selectedPlan, setSelectedPlan] = useState(urlPlan);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    setIsLoading(true);

    console.log('Enviando datos de registro:', {
      email: formData.email,
      fullName: formData.fullName,
      userIdCard: formData.userIdCard,
      businessName: formData.businessName
    });

    const { error } = await signUp(
      formData.email, 
      formData.password, 
      formData.fullName, 
      formData.userIdCard, 
      formData.businessName,
      selectedPlan
    );
    
    if (!error) {
      navigate("/login");
    }
    
    setIsLoading(false);
  };

  // Validaciones en tiempo real
  const isEmailValid = formData.email.includes("@") && formData.email.includes(".");
  const isPasswordValid = formData.password.length >= 6;
  const isPasswordMatching = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  const isUserIdCardValid = formData.userIdCard.trim().length > 0;
  const isBusinessNameValid = formData.businessName.trim().length > 0;
  const isPlanSelected = selectedPlan && ['basico', 'profesional', 'negocios'].includes(selectedPlan);
  const isFormValid = formData.fullName && isBusinessNameValid && isUserIdCardValid && isPlanSelected && isEmailValid && isPasswordValid && isPasswordMatching;

  return (
    <TooltipProvider>
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-primary p-3 rounded-xl">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold text-primary">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Únete y comienza a gestionar tus comprobantes bancarios
            </CardDescription>
            <div className="mt-3 flex justify-center">
              <Badge variant="secondary" className="bg-secondary-blue text-white">
                Plan seleccionado: {selectedPlan === 'basico' ? 'Básico' : selectedPlan === 'profesional' ? 'Profesional' : 'Negocios'}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre Completo</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            {/* Nombre del establecimiento */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del Establecimiento</Label>
              <div className="relative">
                <Input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Nombre de tu negocio o establecimiento"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {formData.businessName && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isBusinessNameValid ? (
                      <Check className="h-4 w-4 text-accent-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ID (Cédula) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="userIdCard">ID (Cédula)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Este ID se usará para asociar tus comprobantes de forma única.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  id="userIdCard"
                  name="userIdCard"
                  type="text"
                  placeholder="12345678"
                  value={formData.userIdCard}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {formData.userIdCard && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isUserIdCardValid ? (
                      <Check className="h-4 w-4 text-accent-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Selección de Plan */}
            <div className="space-y-3">
              <Label>Plan de Suscripción *</Label>
              <RadioGroup 
                value={selectedPlan} 
                onValueChange={setSelectedPlan}
                className="grid grid-cols-1 gap-3"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="basico" id="basico" />
                  <Label htmlFor="basico" className="flex-1 cursor-pointer">
                    <div className="font-medium">Plan Básico</div>
                    <div className="text-sm text-muted-foreground">$15 USD/mes • Hasta 150 comprobantes</div>
                  </Label>
                  {selectedPlan === 'basico' && (
                    <Check className="h-4 w-4 text-accent-success" />
                  )}
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="profesional" id="profesional" />
                  <Label htmlFor="profesional" className="flex-1 cursor-pointer">
                    <div className="font-medium">Plan Profesional</div>
                    <div className="text-sm text-muted-foreground">$45 USD/mes • Hasta 600 comprobantes</div>
                  </Label>
                  {selectedPlan === 'profesional' && (
                    <Check className="h-4 w-4 text-accent-success" />
                  )}
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="negocios" id="negocios" />
                  <Label htmlFor="negocios" className="flex-1 cursor-pointer">
                    <div className="font-medium">Plan Negocios</div>
                    <div className="text-sm text-muted-foreground">$90 USD/mes • Comprobantes ilimitados</div>
                  </Label>
                  {selectedPlan === 'negocios' && (
                    <Check className="h-4 w-4 text-accent-success" />
                  )}
                </div>
              </RadioGroup>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                {formData.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isEmailValid ? (
                      <Check className="h-4 w-4 text-accent-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-3">
                  {formData.password && (
                    <div>
                      {isPasswordValid ? (
                        <Check className="h-4 w-4 text-accent-success" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto p-0 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <div className="absolute right-0 top-0 h-full flex items-center space-x-1 pr-3">
                  {formData.confirmPassword && (
                    <div>
                      {isPasswordMatching ? (
                        <Check className="h-4 w-4 text-accent-success" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto p-0 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <Button 
              type="submit" 
              variant="blue" 
              className="w-full"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>

            {/* Link de login */}
            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link 
                  to="/login" 
                  className="text-secondary-blue hover:underline font-medium"
                >
                  Inicia sesión aquí
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
};