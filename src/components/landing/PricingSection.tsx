import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Shield, Users, Zap, TrendingUp, Star } from "lucide-react";

const plans = [
  {
    name: "Plan Básico",
    price: "$80.000 COP",
    period: "/ mes",
    description: "Para negocios pequeños que reciben pocos pagos.",
    originalTime: "",
    savedTime: "Ahorra +8 horas al mes",
    features: [
      "Hasta 150 comprobantes al mes",
      "Validación automática 24/7",
      "Alerta de fraudes básicos",
      "Dashboard simple"
    ],
    buttonText: "Comenzar con Plan Básico",
    popular: false,
    emoji: "💲"
  },
  {
    name: "Plan Profesional",
    price: "$200.000 COP",
    period: "/ mes",
    description: "Para negocios en crecimiento que reciben muchos pagos.",
    originalTime: "",
    savedTime: "Ahorra +23 horas al mes",
    features: [
      "Hasta 600 comprobantes al mes",
      "Validación y conciliación avanzada",
      "Reportes claros (Excel/PDF)",
      "Detección de fraudes mejorada"
    ],
    buttonText: "Elegir Plan Profesional",
    popular: true,
    emoji: "💲"
  },
  {
    name: "Plan Negocios",
    price: "$400.000 COP",
    period: "/ mes",
    description: "Para empresas con alto volumen que necesitan todo automatizado.",
    originalTime: "",
    savedTime: "Ahorra +45 horas al mes",
    features: [
      "Comprobantes ilimitados",
      "Equipo de hasta 10 usuarios",
      "Reportes y soporte dedicado",
      "Integraciones personalizadas"
    ],
    buttonText: "Contactar por Plan Negocios",
    popular: false,
    emoji: "💲"
  }
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-24 px-4 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header simplificado */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight max-w-5xl mx-auto">
            💰 Un plan para cada negocio,{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              sin enredos.
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Desde <strong>$80.000 COP al mes</strong>. Recuperas la inversión desde el primer día.
          </p>
        </div>

        {/* Pricing Cards simplificadas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-gray-100 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                plan.popular ? 'ring-2 ring-purple-500 scale-[1.05] shadow-xl shadow-purple-100/25' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                    👑 Recomendado
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  {plan.name}
                </CardTitle>
                
                {/* Precio en COP */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{plan.emoji} {plan.price}</div>
                  <div className="text-gray-500">{plan.period}</div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  👉 {plan.description}
                </p>

                {/* Ahorro de tiempo simplificado */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="text-lg font-bold text-green-700 flex items-center justify-center gap-2">
                    ⚡ {plan.savedTime}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="text-green-600 mr-3 flex-shrink-0 mt-0.5 text-lg">✔️</div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full text-lg py-6 font-semibold transition-all duration-300 hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg' 
                      : 'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300'
                  }`}
                  size="lg"
                  onClick={() => {
                    const message = `Estoy interesado en el ${plan.name} de Ya Quedó`;
                    const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Nota final simplificada */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Todos los planes incluyen:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium text-gray-800">Validación automática de pagos</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <span className="font-medium text-gray-800">Detección de fraudes</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium text-gray-800">Soporte incluido</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};