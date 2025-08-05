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
    description: "Olvídate de entrar banco por banco. Ya Quedo valida automáticamente cada comprobante contra la información real del banco.",
    benefit: "Ahorra 5+ horas semanales",
    color: "purple"
  },
  {
    icon: Shield,
    title: "Detección de Fraudes",
    description: "Identifica comprobantes falsos al instante. Nuestro sistema detecta inconsistencias que el ojo humano podría pasar por alto.",
    benefit: "Protege tu dinero 24/7",
    color: "red"
  },
  {
    icon: RefreshCw,
    title: "Conciliación Automática",
    description: "Ya no más hojas de Excel interminables. La conciliación entre comprobantes y movimientos bancarios se hace sola.",
    benefit: "100% de precisión",
    color: "green"
  },
  {
    icon: TrendingUp,
    title: "Reportes en Tiempo Real",
    description: "Ve el estado de tus validaciones al instante. Dashboards que te muestran qué está pasando con tu dinero ahora mismo.",
    benefit: "Decisiones más rápidas",
    color: "indigo"
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
            La tecnología que necesitas para
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              nunca más validar a mano.
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mientras tu competencia pierde tiempo en tareas manuales, tú ya tienes todo validado y conciliado automáticamente.
          </p>
        </div>

        {/* Features Grid mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group border-gray-100 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-500 hover:scale-[1.02] hover:border-purple-200">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  {/* Icon container */}
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300
                    ${feature.color === 'purple' ? 'bg-purple-50 group-hover:bg-purple-100' :
                      feature.color === 'red' ? 'bg-red-50 group-hover:bg-red-100' :
                      feature.color === 'green' ? 'bg-green-50 group-hover:bg-green-100' :
                      'bg-indigo-50 group-hover:bg-indigo-100'}
                  `}>
                    <feature.icon className={`
                      h-8 w-8 
                      ${feature.color === 'purple' ? 'text-purple-600' :
                        feature.color === 'red' ? 'text-red-500' :
                        feature.color === 'green' ? 'text-green-600' :
                        'text-indigo-600'}
                    `} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                      <span className={`
                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${feature.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                          feature.color === 'red' ? 'bg-red-100 text-red-700' :
                          feature.color === 'green' ? 'bg-green-100 text-green-700' :
                          'bg-indigo-100 text-indigo-700'}
                      `}>
                        {feature.benefit}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-lg mb-4">
                      {feature.description}
                    </p>
                    
                    {/* Fake progress or status indicator */}
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`
                        h-4 w-4 
                        ${feature.color === 'purple' ? 'text-purple-600' :
                          feature.color === 'red' ? 'text-red-500' :
                          feature.color === 'green' ? 'text-green-600' :
                          'text-indigo-600'}
                      `} />
                      <span className="text-gray-500 font-medium">
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
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para automatizar tu validación?
            </h3>
            <p className="text-xl text-purple-100 mb-8">
              Únete a los negocios que ya recuperaron su tiempo y eliminaron el riesgo de fraudes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                Comenzar gratis ahora
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                Agendar demostración
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