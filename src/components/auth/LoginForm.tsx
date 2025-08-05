import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Eye, EyeOff, Loader2, ArrowRight, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
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

      <div className="relative z-10 w-full max-w-md">
        {/* Branding section con logo de Irrelevant */}
        <div className="text-center mb-8">
          {/* Logo de Irrelevant prominente */}
          <div className="flex justify-center mb-4">
            <img 
              src="https://storage.googleapis.com/cluvi/Web-Risk/logo_final_morado_irrelevant.PNG" 
              alt="Irrelevant Logo" 
              className="h-12 w-auto"
            />
          </div>
          
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Bienvenido de vuelta
              </CardTitle>
              <CardDescription className="text-gray-600">
                Accede a tu dashboard de validación automática
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-gray-900"
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 text-gray-900 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
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

              {/* Botón de envío */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Acceder al Dashboard</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Separador */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">O</span>
              </div>
            </div>

            {/* Links adicionales */}
            <div className="text-center space-y-4">
              <Link 
                to="#" 
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline font-medium flex items-center justify-center gap-1"
              >
                <Shield className="h-3 w-3" />
                ¿Olvidaste tu contraseña?
              </Link>
              
              <div className="text-sm text-gray-600">
                ¿Aún no tienes cuenta?{" "}
                <Link 
                  to="/register" 
                  className="text-purple-600 hover:text-purple-700 hover:underline font-semibold"
                >
                  Crear cuenta gratis
                </Link>
              </div>
            </div>
            
          </CardContent>
        </Card>

        {/* Footer simplificado */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">© 2025 Ya Quedo by Irrelevant. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
};