import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Eye, 
  EyeOff, 
  Loader2, 
  Check, 
  X, 
  Info,
  ArrowRight,
  ArrowLeft,
  User,
  Building,
  CreditCard,
  Shield,
  Mail
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const STEPS = [
  {
    id: 1,
    title: "Información Personal",
    description: "Cuéntanos sobre ti y tu negocio"
  },
  {
    id: 2,
    title: "Selecciona tu Plan",
    description: "Elige el plan que mejor se adapte a tus necesidades"
  },
  {
    id: 3,
    title: "Configura tu Cuenta",
    description: "Crea tu acceso seguro al sistema"
  }
];

export const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
  const { signUp, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlPlan = searchParams.get('plan') || 'basico';
  const [selectedPlan, setSelectedPlan] = useState(urlPlan);

  useEffect(() => {
    if (user) {
      signOut();
    }
  }, [user, signOut]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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

  // Validaciones
  const isStep1Valid = formData.fullName.trim() && formData.businessName.trim() && formData.userIdCard.trim();
  const isStep2Valid = selectedPlan && ['basico', 'profesional', 'negocios'].includes(selectedPlan);
  const isEmailValid = formData.email.includes("@") && formData.email.includes(".");
  const isPasswordValid = formData.password.length >= 6;
  const isPasswordMatching = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;
  const isStep3Valid = isEmailValid && isPasswordValid && isPasswordMatching;

  const canGoNext = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      default: return false;
    }
  };

  const nextStep = () => {
    if (canGoNext() && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50 flex items-center justify-center px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
            <div className="w-96 h-96 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-15">
            <div className="w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="https://storage.googleapis.com/cluvi/nuevo_irre-removebg-preview.png" 
                alt="Irrelevant Logo" 
                className="h-10 w-auto"
              />
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Ya Quedo
              </h1>
            </div>
            <p className="text-gray-600 text-sm">Sistema de Validación Automática</p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                {STEPS.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${currentStep >= step.id 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                        : 'bg-gray-200 text-gray-600'}
                    `}>
                      {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    {step.id < STEPS.length && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        currentStep > step.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <CardTitle className="text-2xl font-bold text-gray-900">
                {STEPS[currentStep - 1].title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {STEPS[currentStep - 1].description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Información Personal */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4 text-purple-600" />
                        Nombre Completo
                      </Label>
                      <div className="relative">
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Tu nombre completo"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                          required
                        />
                        {formData.fullName && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Building className="h-4 w-4 text-purple-600" />
                        Nombre del Establecimiento
                      </Label>
                      <div className="relative">
                        <Input
                          id="businessName"
                          name="businessName"
                          type="text"
                          placeholder="Nombre de tu negocio"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                          required
                        />
                        {formData.businessName && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="userIdCard" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                          Número de Identificación
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Se usará para asociar tus comprobantes de forma única</p>
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
                          className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                          required
                        />
                        {formData.userIdCard && (
                          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Selección de Plan */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <RadioGroup 
                      value={selectedPlan} 
                      onValueChange={setSelectedPlan}
                      className="space-y-3"
                    >
                      <div className={`border rounded-xl p-4 transition-all cursor-pointer ${
                        selectedPlan === 'basico' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="basico" id="basico" />
                          <div className="flex-1">
                            <Label htmlFor="basico" className="cursor-pointer">
                              <div className="font-semibold text-gray-900">Plan Básico</div>
                              <div className="text-sm text-gray-600">$15 USD/mes • Hasta 150 comprobantes</div>
                            </Label>
                          </div>
                          {selectedPlan === 'basico' && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              Seleccionado
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className={`border rounded-xl p-4 transition-all cursor-pointer ${
                        selectedPlan === 'profesional' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="profesional" id="profesional" />
                          <div className="flex-1">
                            <Label htmlFor="profesional" className="cursor-pointer">
                              <div className="font-semibold text-gray-900 flex items-center gap-2">
                                Plan Profesional
                                <Badge className="bg-indigo-100 text-indigo-700 text-xs">Recomendado</Badge>
                              </div>
                              <div className="text-sm text-gray-600">$45 USD/mes • Hasta 600 comprobantes</div>
                            </Label>
                          </div>
                          {selectedPlan === 'profesional' && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              Seleccionado
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className={`border rounded-xl p-4 transition-all cursor-pointer ${
                        selectedPlan === 'negocios' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="negocios" id="negocios" />
                          <div className="flex-1">
                            <Label htmlFor="negocios" className="cursor-pointer">
                              <div className="font-semibold text-gray-900">Plan Negocios</div>
                              <div className="text-sm text-gray-600">$90 USD/mes • Comprobantes ilimitados</div>
                            </Label>
                          </div>
                          {selectedPlan === 'negocios' && (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              Seleccionado
                            </Badge>
                          )}
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Step 3: Configuración de Cuenta */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-purple-600" />
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                          required
                        />
                        {formData.email && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {isEmailValid ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-600" />
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 6 caracteres"
                          value={formData.password}
                          onChange={handleChange}
                          className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 pr-20"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          {formData.password && (
                            isPasswordValid ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                        Confirmar Contraseña
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Repite tu contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 pr-20"
                          required
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          {formData.confirmPassword && (
                            isPasswordMatching ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-6">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!canGoNext()}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2"
                    >
                      Siguiente
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading || !canGoNext()}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Creando cuenta...
                        </>
                      ) : (
                        <>
                          Crear Cuenta
                          <Check className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>

              {/* Link de login */}
              <div className="text-center pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <Link 
                    to="/login" 
                    className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
                  >
                    Inicia sesión aquí
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};