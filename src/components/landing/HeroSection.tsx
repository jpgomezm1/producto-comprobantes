import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, AlertTriangle, CheckCircle, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VideoTutorialDialog } from "./VideoTutorialDialog";

export const HeroSection = () => {
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  return (
    <section id="inicio" className="relative overflow-hidden bg-white py-24 px-4">
      {/* Background decorative elements with purple theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/40" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
        <div className="w-96 h-96 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-15">
        <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full" />
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.02]" />

      <div className="container mx-auto max-w-7xl text-center relative z-10">
        {/* Developed by Irrelevant badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium mb-6 backdrop-blur-sm">
          <span className="text-purple-700">Developed by</span>
          <img 
            src="https://storage.googleapis.com/cluvi/Web-Risk/logo_final_morado_irrelevant.PNG" 
            alt="Irrelevant Logo" 
            className="h-5 w-auto"
          />
        </div>

        {/* Título principal con colores purple */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
          👋 Olvídate de estar revisando
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            comprobantes uno por uno.
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Con <strong>Ya Quedó</strong>, validas al instante los pagos que te hacen por Nequi, Bancolombia o cualquier banco. 
          Te avisa si el comprobante es real y si la plata ya entró. Sin enredos, sin fraudes y sin perder tiempo.
        </p>

        {/* Pain points con colores actualizados */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4 text-red-500" />
            <span className="line-through">Se te van horas mirando pagos</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="line-through">Te pueden meter un comprobante falso</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Shield className="h-4 w-4 text-red-500" />
            <span className="line-through">Revisar todo a mano siempre trae errores</span>
          </div>
        </div>

        {/* CTA Buttons con tema purple */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button 
            size="lg"
            className="group bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            onClick={() => {
              const message = "Estoy interesado en Ya Quedó para mi negocio";
              const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            Automatizar mis validaciones
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 h-auto border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
            onClick={() => setIsVideoDialogOpen(true)}
          >
            Ver cómo funciona
          </Button>
        </div>

        {/* Beneficios con colores actualizados */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-16 text-sm">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Valida tus pagos 24/7</span>
          </div>
          <div className="flex items-center gap-2 text-purple-600">
            <Zap className="h-5 w-5" />
            <span className="font-medium">Respuesta en segundos</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-600">
            <Shield className="h-5 w-5" />
            <span className="font-medium">Tranquilidad contra fraudes</span>
          </div>
        </div>

        {/* Dashboard mockup con tema purple */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glow effect purple */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-2xl rounded-2xl" />
          
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-100 p-2 md:p-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 p-4 md:p-6">
              {/* Header con colores purple */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 text-lg">Centro de Validación</span>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Validando automáticamente
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">1,247 validados hoy</div>
                    <div className="text-xs text-gray-500">0 fraudes detectados</div>
                  </div>
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Stats con colores actualizados */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                {[
                  { icon: Clock, label: "Tiempo ahorrado", value: "23h", subtext: "esta semana", color: "green" },
                  { icon: Shield, label: "Comprobantes válidos", value: "99.2%", subtext: "precisión", color: "purple" },
                  { icon: AlertTriangle, label: "Fraudes bloqueados", value: "12", subtext: "este mes", color: "red" },
                  { icon: TrendingUp, label: "Conciliación", value: "100%", subtext: "automática", color: "indigo" },
                ].map((stat, index) => (
                  <div key={index} className="group bg-white/70 backdrop-blur-sm border border-gray-100 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/90">
                    <div className={`w-12 h-12 ${
                      stat.color === 'green' ? 'bg-green-50' :
                      stat.color === 'purple' ? 'bg-purple-50' :
                      stat.color === 'red' ? 'bg-red-50' : 'bg-indigo-50'
                    } rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`h-6 w-6 ${
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'purple' ? 'text-purple-600' :
                        stat.color === 'red' ? 'text-red-500' : 'text-indigo-600'
                      }`} />
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className={`text-xs ${
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      stat.color === 'red' ? 'text-red-500' : 'text-indigo-600'
                    }`}>{stat.subtext}</div>
                  </div>
                ))}
              </div>

              {/* Tabla con diseño limpio */}
              <div className="border border-gray-100 rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm">
                <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100">
                  <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-gray-700">
                    <span>Comprobante</span>
                    <span>Banco</span>
                    <span>Monto</span>
                    <span>Validación</span>
                    <span>Estado</span>
                  </div>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { id: "#12847", bank: "Bancolombia", amount: "$500.000", validation: "Automática", status: "valid", time: "Hace 2 min" },
                    { id: "#12846", bank: "Banco de Bogotá", amount: "$750.000", validation: "Automática", status: "valid", time: "Hace 5 min" },
                    { id: "#12845", bank: "Davivienda", amount: "$320.000", validation: "Revisión", status: "fraud", time: "Hace 8 min" },
                  ].map((row, index) => (
                    <div key={index} className="px-6 py-4 grid grid-cols-5 gap-4 text-sm hover:bg-purple-50/30 transition-colors">
                      <span className="text-purple-600 font-mono font-medium">{row.id}</span>
                      <span className="text-gray-900 font-medium">{row.bank}</span>
                      <span className="text-gray-900 font-bold">{row.amount}</span>
                      <span className="text-gray-500">{row.validation}</span>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          row.status === 'valid' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {row.status === 'valid' ? '✓ Válido' : '⚠ Fraude'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicador de actividad */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Validando comprobantes en tiempo real - Último procesado hace 12 segundos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorial Dialog */}
      <VideoTutorialDialog 
        isOpen={isVideoDialogOpen} 
        onClose={() => setIsVideoDialogOpen(false)} 
      />
    </section>
  );
};