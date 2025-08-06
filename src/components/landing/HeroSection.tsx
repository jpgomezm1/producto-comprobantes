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
      </div>

      {/* Video Tutorial Dialog */}
      <VideoTutorialDialog 
        isOpen={isVideoDialogOpen} 
        onClose={() => setIsVideoDialogOpen(false)} 
      />
    </section>
  );
};