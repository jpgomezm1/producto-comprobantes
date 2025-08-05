import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Clock, Zap, Users, HelpCircle, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo funciona?",
    answer: "Subes el comprobante → Ya Quedó lo valida con el banco → Te dice si el pago es real o falso.",
    icon: Zap
  },
  {
    question: "¿Es seguro conectar mis cuentas?",
    answer: "Sí. La conexión es 100% segura y solo se usa para verificar la información del pago.",
    icon: Shield
  },
  {
    question: "¿De verdad detecta comprobantes falsos?",
    answer: "Sí, identifica comprobantes alterados o que no tienen plata real detrás.",
    icon: Shield
  },
  {
    question: "¿Cuánto tiempo me ahorro?",
    answer: "En promedio, más de 20 horas al mes.",
    icon: Clock
  },
  {
    question: "¿Funciona con mi banco?",
    answer: "Sí, funciona con Nequi, Bancolombia y Davivienda (y vamos sumando más).",
    icon: CheckCircle
  },
  {
    question: "¿Y si mi equipo no sabe de tecnología?",
    answer: "No pasa nada, es fácil de usar. Solo entras, subes comprobante y listo.",
    icon: Users
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer: "Claro, no hay contratos ni permanencias.",
    icon: HelpCircle
  }
];

export const FAQSection = () => {
  return (
    <section id="preguntas" className="py-24 px-4 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto max-w-5xl">
        {/* Header simplificado */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4" />
            <span>Preguntas frecuentes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            🤔 ¿Dudas sobre
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              cómo funciona?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Esto es lo que más preguntan los dueños de negocio antes de usar <strong>Ya Quedó</strong>.
          </p>
        </div>

        {/* FAQ Accordion simplificado */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-gray-100 rounded-xl bg-white/90 backdrop-blur-sm px-6 py-2 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-xl font-bold text-gray-900 hover:text-purple-600 hover:no-underline py-6 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 group-hover:bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                      <faq.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="flex-1 pr-4">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed text-lg pb-6 pl-16 font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA simplificado */}
        <div className="text-center mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-50" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Sigues con dudas?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Agenda una demo de <strong>15 minutos</strong> y te mostramos cómo funciona en tu negocio.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => {
                  const message = "Quiero agendar una demo de Ya Quedó";
                  const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                👉 Agendar demo gratuita
              </button>
              <button 
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                onClick={() => {
                  const message = "Tengo dudas sobre Ya Quedó, ¿me pueden ayudar?";
                  const whatsappUrl = `https://wa.me/573183849532?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                👉 Hablar con soporte
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>15 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>En español</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};