import { 
  Zap, 
  Shield, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Bot,
  RefreshCw
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Validación Automática",
    description: "Ya no tienes que entrar a Nequi, Bancolombia o Davivienda a revisar uno por uno. Ya Quedó valida todo solito y te dice qué pagos sí entraron.",
    benefit: "Siempre activo",
    color: "purple",
    emoji: "🔌"
  },
  {
    icon: Shield,
    title: "Detección de Fraudes",
    description: "Olvídate de los comprobantes \"truchos\". La app detecta cuando algo no cuadra y te avisa al momento.",
    benefit: "Protege tu negocio",
    color: "red",
    emoji: "🛡️"
  },
  {
    icon: RefreshCw,
    title: "Conciliación Automática",
    description: "Se acabaron los excels eternos. Los pagos y comprobantes se organizan solos, sin que pierdas tiempo.",
    benefit: "Todo sincronizado",
    color: "green",
    emoji: "📊"
  },
  {
    icon: TrendingUp,
    title: "Reportes en Tiempo Real",
    description: "En un solo lugar ves qué pagos entraron, cuáles no y cuánto llevas recibido. Así tomas decisiones rápido.",
    benefit: "Todo claro de un vistazo",
    color: "indigo",
    emoji: "⚡"
  }
];

export const FeaturesSection = () => {
  return (
    <section id="caracteristicas" className="py-24 px-4 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header mejorado */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Bot className="h-4 w-4" />
            <span>Automatización inteligente</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            👉 La ayuda que tu negocio necesitaba para
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              nunca más validar a mano.
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mientras otros pierden tiempo revisando comprobantes, tú ya sabes al instante si la plata sí entró.
          </p>
        </div>

        {/* Features Grid mejorado */}
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
              {/* Subtle background pattern */}
              <div className={`
                absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,${
                  feature.color === 'purple' ? '#8b5cf6' :
                  feature.color === 'red' ? '#ef4444' :
                  feature.color === 'green' ? '#10b981' : '#6366f1'
                }_40%,transparent_70%)]
              `} />
              
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
                  {/* Icon container mejorado */}
                  <div className={`
                    w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 shadow-lg relative
                    ${feature.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300' :
                      feature.color === 'red' ? 'bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300' :
                      feature.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-200 group-hover:from-green-200 group-hover:to-green-300' :
                      'bg-gradient-to-br from-indigo-100 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-300'}
                  `}>
                    {/* Glow effect */}
                    <div className={`
                      absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl
                      ${feature.color === 'purple' ? 'bg-purple-400' :
                        feature.color === 'red' ? 'bg-red-400' :
                        feature.color === 'green' ? 'bg-green-400' : 'bg-indigo-400'}
                    `} />
                    
                    <div className="text-3xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {feature.emoji}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <span className={`
                        inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold shadow-sm
                        ${feature.color === 'purple' ? 'bg-purple-200/70 text-purple-800 border border-purple-300/50' :
                          feature.color === 'red' ? 'bg-red-200/70 text-red-800 border border-red-300/50' :
                          feature.color === 'green' ? 'bg-green-200/70 text-green-800 border border-green-300/50' :
                          'bg-indigo-200/70 text-indigo-800 border border-indigo-300/50'}
                      `}>
                        ✔️ {feature.benefit}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-lg mb-6 group-hover:text-gray-800 transition-colors">
                      {feature.description}
                    </p>
                    
                    {/* Status indicator mejorado */}
                    <div className={`
                      flex items-center gap-3 text-sm bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border
                      ${feature.color === 'purple' ? 'border-purple-200/50' :
                        feature.color === 'red' ? 'border-red-200/50' :
                        feature.color === 'green' ? 'border-green-200/50' :
                        'border-indigo-200/50'}
                    `}>
                      <div className={`
                        w-2 h-2 rounded-full animate-pulse
                        ${feature.color === 'purple' ? 'bg-purple-500' :
                          feature.color === 'red' ? 'bg-red-500' :
                          feature.color === 'green' ? 'bg-green-500' : 'bg-indigo-500'}
                      `} />
                      <span className="text-gray-600 font-medium">
                        {index === 0 ? 'Validando 24/7' :
                         index === 1 ? 'Monitoreando continuamente' :
                         index === 2 ? 'Sincronizando en tiempo real' :
                         'Generando reportes automáticamente'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-50" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para olvidarte de validar pagos?
            </h3>
            <p className="text-xl text-purple-100 mb-8">
              Súmate a los negocios que ya no pierden tiempo ni caen en fraudes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => {
                  const message = "Estoy interesado en Ya Quedó para mi negocio";
                  const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                🚀 Probar gratis ahora
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                👀 Agendar demo
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Configuración en minutos</span>
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