import { 
  Zap, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Bot,
  RefreshCw,
  DollarSign,
  Users
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "2 Segundos vs. 3 Horas",
    description: "Ya no más entrar a Nequi o Bancolombia a revisar uno por uno. Ya Quedó valida todo automáticamente mientras tú haces otras cosas.",
    benefit: "Recuperas 4+ horas diarias",
    color: "purple",
    emoji: "⚡"
  },
  {
    icon: Shield,
    title: "Cero Comprobantes Falsos",
    description: "Se acabaron las estafas. Detectamos el 99.9% de fraudes al instante y te alertamos ANTES de que pierdas dinero.",
    benefit: "Proteges tu dinero automáticamente",
    color: "red",
    emoji: "🛡️"
  },
  {
    icon: RefreshCw,
    title: "Adiós Excel de Pagos",
    description: "Los pagos se organizan solos. Sabes al instante: qué cliente pagó, cuánto falta y qué facturas están pendientes.",
    benefit: "20+ horas extra semanales",
    color: "green",
    emoji: "📊"
  },
  {
    icon: TrendingUp,
    title: "Tu Dinero en Tiempo Real",
    description: "Dashboard que muestra pagos del día, cuánto llevas recibido y cuanto haz vendido. No esperes que tus colaboradores te cuenten como van las ventas.",
    benefit: "Controlas todo de un vistazo",
    color: "indigo",
    emoji: "📈"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="caracteristicas" className="py-24 px-4 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header simplificado pero impactante */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Bot className="h-4 w-4" />
            <span>Automatización que genera resultados</span>
          </div>
          
          <div className="py-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8" style={{ lineHeight: '1.3' }}>
              🎯 Mientras otros pierden tiempo,
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
                tú ya estás ganando dinero
              </span>
            </h2>
          </div>

        </div>

        {/* Features Grid limpio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`
                group border-0 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 relative overflow-hidden
                ${feature.color === 'purple' ? 'bg-gradient-to-br from-purple-50/80 via-white to-purple-50/60 hover:shadow-purple-200/50' :
                  feature.color === 'red' ? 'bg-gradient-to-br from-red-50/80 via-white to-red-50/60 hover:shadow-red-200/50' :
                  feature.color === 'green' ? 'bg-gradient-to-br from-green-50/80 via-white to-green-50/60 hover:shadow-green-200/50' :
                  'bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/60 hover:shadow-indigo-200/50'}
              `}
            >
              {/* Top border accent */}
              <div className={`
                absolute top-0 left-0 right-0 h-1 bg-gradient-to-r
                ${feature.color === 'purple' ? 'from-purple-400 to-purple-600' :
                  feature.color === 'red' ? 'from-red-400 to-red-600' :
                  feature.color === 'green' ? 'from-green-400 to-green-600' :
                  'from-indigo-400 to-indigo-600'}
              `} />
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start gap-6">
                  {/* Icon container */}
                  <div className={`
                    w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg
                    ${feature.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                      feature.color === 'red' ? 'bg-gradient-to-br from-red-100 to-red-200' :
                      feature.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                      'bg-gradient-to-br from-indigo-100 to-indigo-200'}
                  `}>
                    <div className="text-3xl">{feature.emoji}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Beneficio clave */}
                    <div className={`
                      inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                      ${feature.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        feature.color === 'red' ? 'bg-red-100 text-red-800' :
                        feature.color === 'green' ? 'bg-green-100 text-green-800' :
                        'bg-indigo-100 text-indigo-800'}
                    `}>
                      <CheckCircle className="h-4 w-4" />
                      <span>{feature.benefit}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA simplificado */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-white relative overflow-hidden">          
          <div className="max-w-3xl mx-auto relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para dejar de perder dinero validando pagos?
            </h3>
            <p className="text-xl text-purple-100 mb-8">
              Únete a los 100+ negocios que ya automatizan sus validaciones.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => {
                  const message = "Quiero mis 7 días GRATIS de Ya Quedó para mi negocio";
                  const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                🚀 Probar 7 días gratis
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                👀 Ver demo rápido
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Configuracion en 5 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Soporte incluido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};