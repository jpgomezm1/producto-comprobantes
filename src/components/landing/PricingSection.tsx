import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Shield, Users, Zap, TrendingUp, Star } from "lucide-react";

const plans = [
  {
    name: "Plan Básico",
    price: "$15 USD",
    period: "/ mes",
    description: "Para negocios pequeños que quieren eliminar la validación manual.",
    originalTime: "10 horas/mes validando",
    savedTime: "Ahorra 8 horas/mes",
    features: [
      "Hasta 150 comprobantes/mes",
      "1 Usuario",
      "Validación automática 24/7",
      "Dashboard y Filtros básicos",
      "1 GB de almacenamiento",
      "Detección básica de fraudes"
    ],
    buttonText: "Comenzar con Plan Básico",
    popular: false,
    savings: "$240/mes en tiempo ahorrado"
  },
  {
    name: "Plan Profesional",
    price: "$45 USD",
    period: "/ mes",
    description: "La solución completa para negocios en crecimiento.",
    originalTime: "25 horas/mes validando",
    savedTime: "Ahorra 23 horas/mes",
    features: [
      "Hasta 600 comprobantes/mes",
      "Hasta 3 Usuarios",
      "Todo lo del plan Básico",
      "Conciliación automática avanzada",
      "Exportar Reportes (PDF/Excel)",
      "Análisis Histórico",
      "5 GB de almacenamiento",
      "Soporte por chat"
    ],
    buttonText: "Elegir Plan Profesional",
    popular: true,
    savings: "$690/mes en tiempo ahorrado"
  },
  {
    name: "Plan Negocios",
    price: "$90 USD",
    period: "/ mes",
    description: "Para empresas con alto volumen que necesitan máxima automatización.",
    originalTime: "50+ horas/mes validando",
    savedTime: "Ahorra 45+ horas/mes",
    features: [
      "Comprobantes Ilimitados",
      "Hasta 10 Usuarios",
      "Todo lo del plan Profesional",
      "Detección avanzada de fraudes",
      "20 GB de almacenamiento",
      "Soporte dedicado",
      "Integraciones personalizadas"
    ],
    buttonText: "Contactar para Plan Negocios",
    popular: false,
    savings: "$1,350+/mes en tiempo ahorrado"
  }
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-24 px-4 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header mejorado - más espacio y mejor layout */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-2 text-sm font-medium mb-8">
            <TrendingUp className="h-4 w-4" />
            <span>ROI promedio: 400% en el primer mes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight max-w-5xl mx-auto">
            Un plan para cada etapa de{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              tu negocio.
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            Comienza desde $15/mes y recupera tu inversión desde el primer día. 
            Sin contratos ni compromisos.
          </p>

          {/* Social proof con mejor espaciado */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-purple-600">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Promedio: 20 horas ahorradas/mes</span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <Shield className="h-4 w-4" />
              <span className="font-medium">98.7% de fraudes detectados</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-600">
              <Star className="h-4 w-4" />
              <span className="font-medium">4.9/5 en satisfacción</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards mejoradas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-gray-100 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] ${
                plan.popular ? 'ring-2 ring-purple-500 scale-[1.05] shadow-xl shadow-purple-100/25' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 text-sm font-semibold shadow-lg">
                    ⭐ Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  {plan.name}
                </CardTitle>
                
                {/* Precio */}
                <div className="mb-4">
                  <span className="text-4xl font-bold text-purple-600">{plan.price}</span>
                  <span className="text-gray-500 text-lg">{plan.period}</span>
                </div>

                {/* Ahorro de tiempo destacado */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 line-through mb-1">{plan.originalTime}</div>
                  <div className="text-lg font-bold text-green-700 flex items-center justify-center gap-2">
                    <Zap className="h-5 w-5" />
                    {plan.savedTime}
                  </div>
                  <div className="text-xs text-green-600 font-medium mt-1">{plan.savings}</div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
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
                    const message = `Estoy interesado en el ${plan.name} de la app de Ya Quedo`;
                    const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  {plan.buttonText}
                </Button>

                {/* Garantía */}
                <div className="text-center mt-4">
                  <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>30 días de garantía o te devolvemos tu dinero</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};