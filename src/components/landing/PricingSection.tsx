import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Shield, Users, Zap, TrendingUp, Star, DollarSign, AlertTriangle, Gift } from "lucide-react";

const plans = [
  {
    name: "Plan Básico",
    price: "$80.000",
    period: "/ mes",
    description: "Perfecto para empezar a proteger tu negocio",
    timesSaved: "Ahorras 8+ horas al mes",
    features: [
      "Hasta 150 comprobantes/mes",
      "Validación automática 24/7", 
      "Detección básica de fraudes",
      "Dashboard en tiempo real",
      "Soporte WhatsApp"
    ],
    buttonText: "Probar 7 días GRATIS",
    popular: false,
    emoji: "🚀"
  },
  {
    name: "Plan Profesional",
    price: "$200.000",
    period: "/ mes", 
    description: "La opción favorita de nuestros clientes",
    timesSaved: "Ahorras 23+ horas al mes",
    features: [
      "Hasta 600 comprobantes/mes",
      "Conciliación automática avanzada",
      "Reportes Excel/PDF profesionales", 
      "Detección IA de fraudes",
      "Soporte prioritario"
    ],
    buttonText: "¡Lo quiero 7 días GRATIS!",
    popular: true,
    emoji: "⭐"
  },
  {
    name: "Plan Negocios", 
    price: "$400.000",
    period: "/ mes",
    description: "Para empresas que manejan alto volumen",
    timesSaved: "Ahorras 45+ horas al mes",
    features: [
      "Comprobantes ILIMITADOS",
      "Hasta 10 usuarios del equipo",
      "Integraciones personalizadas",
      "Gerente de cuenta dedicado",
      "Reportes ejecutivos"
    ],
    buttonText: "Hablar con especialista",
    popular: false,
    emoji: "👑"
  }
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-24 px-4 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header simplificado */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
            💰 Invierte $80K y recupera
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              más de $320K cada mes
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            El tiempo que ahorras validando pagos vale <strong>4 veces más</strong> que lo que pagas.
          </p>

          {/* Oferta limitada simple */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-yellow-800 font-semibold">
              🔥 <strong>Solo primeros 50 negocios:</strong> 7 días gratis + configuración sin costo
            </p>
          </div>
        </div>

        {/* Pricing Cards limpias */}
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
                    👑 Más Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                  {plan.emoji} {plan.name}
                </CardTitle>
                
                {/* Precio simple */}
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-purple-600">{plan.price}</span>
                    <span className="text-sm text-gray-500 font-medium">+ IVA</span>
                  </div>
                  <div className="text-gray-500">{plan.period}</div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {plan.description}
                </p>

                {/* Ahorro de tiempo */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="text-lg font-bold text-green-700">
                    ⏰ {plan.timesSaved}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="text-green-600 mr-3 flex-shrink-0 mt-0.5">✅</div>
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
                    const message = `Quiero probar Ya Quedó GRATIS por 7 días - ${plan.name}`;
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

        {/* Bonos especiales con tus productos */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <Gift className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-2xl font-bold mb-2">
              🎁 Bonus especiales cuando empiezas HOY
            </h3>
            <p className="text-purple-100">Productos exclusivos de Irrelevant que normalmente cuestan $500K+</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <div className="font-bold text-lg mb-2">AI Academy - Primer mes GRATIS</div>
                  <div className="text-purple-100 text-sm mb-3">Aprende a usar IA para hacer crecer tu negocio (Valor: $200,000)</div>
                  <div className="text-xs text-yellow-300 font-medium">waitlist.stayirrelevant.com</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🛠️</span>
                </div>
                <div>
                  <div className="font-bold text-lg mb-2">Toolkit Irrelevant - GRATIS de por vida</div>
                  <div className="text-purple-100 text-sm mb-3">Herramientas premium para empresarios (Valor: $300,000+)</div>
                  <div className="text-xs text-green-300 font-medium">tools.stayirrelevant.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/20">
            <p className="text-lg">Valor total de bonos: <span className="font-bold text-yellow-300">$500,000+</span></p>
            <p className="text-sm text-purple-200 mt-1">Tuyos GRATIS cuando empiezas hoy</p>
          </div>
        </div>

        {/* CTA final simple */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xl px-12 py-6 font-bold transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => {
              const message = "Quiero comenzar con Ya Quedó - 7 días gratis + bonos";
              const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            🚀 Empezar mis 7 días gratis
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            ✅ Sin compromiso • ✅ Cancelas cuando quieras • ✅ Configuracion gratuita
          </p>
        </div>
      </div>
    </section>
  );
};