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

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Developed by Irrelevant badge - centered */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <span className="text-purple-700">Developed by</span>
            <img 
              src="https://storage.googleapis.com/cluvi/Web-Risk/logo_final_morado_irrelevant.PNG" 
              alt="Irrelevant Logo" 
              className="h-5 w-auto"
            />
          </div>
        </div>



        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left">
            {/* Título principal mejorado pero conservando estilo */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
              👋 Deja de perder dinero por
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                comprobantes falsos
              </span>
            </h1>

            {/* Subtítulo con promesa específica */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              <strong>Ya Quedó</strong> valida tus pagos en <strong className="text-purple-600">30 segundos</strong>, 
              24/7 y automático. Te dice si el comprobante es real y si el dinero YA ESTÁ en tu cuenta. 
              <strong> Sin enredos, sin fraudes, sin perder tiempo.</strong>
            </p>

            {/* Pain points más específicos pero manteniendo el diseño */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-4 mb-12 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="line-through">Pierdes 3+ horas diarias validando pagos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="line-through">Te estafan con comprobantes falsos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="line-through">Vives con ansiedad de ser estafado</span>
              </div>
            </div>

            {/* CTA Buttons optimizados */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 w-full sm:w-auto"
                onClick={() => {
                  const message = "Quiero mis 7 días GRATIS de Ya Quedó para mi negocio";
                  const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                Probar 7 días GRATIS
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 h-auto border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 w-full sm:w-auto"
                onClick={() => setIsVideoDialogOpen(true)}
              >
                Ver cómo funciona
              </Button>
            </div>

            {/* Beneficios con colores de marca */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Validación en 30 segundos</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Automático 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-600">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Protección anti-fraudes</span>
              </div>
            </div>
          </div>

          {/* Right column - Mr. Irrelevant */}
          <div className="flex items-center justify-center lg:justify-end relative">
            <div className="relative">
              {/* Main character */}
              <img 
                src="https://storage.googleapis.com/cluvi/Ya_Quedo/espia_irrelevant.PNG" 
                alt="Mr. Irrelevant" 
                className="h-96 lg:h-[450px] xl:h-[500px] w-auto object-contain drop-shadow-2xl animate-float"
              />
              

              {/* Floating elements around the character */}
              <div className="absolute -top-8 -right-8 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-3 animate-bounce">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              
              <div className="absolute top-1/2 -left-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-3 animate-pulse">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              
              <div className="absolute -bottom-4 right-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-3 animate-bounce delay-300">
                <Zap className="h-6 w-6 text-indigo-600" />
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

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};