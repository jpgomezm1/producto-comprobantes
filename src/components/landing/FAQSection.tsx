import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Clock, Zap, Users, HelpCircle, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo funciona la validación automática de comprobantes?",
    answer: "Ya Quedo se conecta directamente con los sistemas bancarios para verificar cada comprobante en tiempo real. Comparamos la información del comprobante (monto, fecha, referencia) con los registros del banco para confirmar que la transacción realmente ocurrió. Todo esto sucede automáticamente, sin que tengas que entrar banco por banco.",
    icon: Zap
  },
  {
    question: "¿Qué tan seguro es conectar mis cuentas bancarias?",
    answer: "Utilizamos tecnología de conexión bancaria de nivel empresarial, la misma que usan los bancos más grandes del mundo. No almacenamos tus credenciales bancarias - solo accedemos a la información de transacciones a través de APIs seguras. Además, cumplimos con todas las regulaciones financieras colombianas.",
    icon: Shield
  },
  {
    question: "¿Realmente puedo detectar comprobantes falsos?",
    answer: "Sí. Nuestro sistema identifica inconsistencias que son imposibles de detectar a simple vista: números de referencia inexistentes, fechas que no coinciden, montos alterados, y patrones sospechosos. En promedio, detectamos 98.7% de los intentos de fraude que pasan desapercibidos en validación manual.",
    icon: Shield
  },
  {
    question: "¿Cuánto tiempo me ahorrará realmente?",
    answer: "Nuestros clientes ahorran en promedio 20-25 horas mensuales que antes gastaban validando comprobantes manualmente. Si tienes un negocio mediano que procesa 300 comprobantes al mes, pasarás de 15 horas de validación manual a menos de 1 hora revisando reportes automáticos.",
    icon: Clock
  },
  {
    question: "¿Funciona con todos los bancos colombianos?",
    answer: "Sí, estamos integrados con todos los bancos principales: Bancolombia, Banco de Bogotá, Davivienda, BBVA, Banco Popular, Colpatria, y más de 15 entidades financieras. Si tu banco no está en la lista, podemos agregar la integración en menos de 2 semanas.",
    icon: CheckCircle
  },
  {
    question: "¿Qué pasa si mi equipo no es muy técnico?",
    answer: "Ya Quedo fue diseñado para personas que no son expertas en tecnología. La configuración inicial toma menos de 10 minutos y nuestro equipo te acompaña paso a paso. Además, ofrecemos capacitación gratuita para tu equipo y soporte en español siempre que lo necesites.",
    icon: Users
  },
  {
    question: "¿Puedo cancelar cuando quiera?",
    answer: "Por supuesto. No hay contratos de permanencia ni penalizaciones. Puedes cancelar tu suscripción en cualquier momento desde tu dashboard. Tus datos permanecerán disponibles por 30 días adicionales en caso de que cambies de opinión.",
    icon: HelpCircle
  }
];

export const FAQSection = () => {
  return (
    <section id="preguntas" className="py-24 px-4 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto max-w-5xl">
        {/* Header mejorado */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4" />
            <span>Preguntas frecuentes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            ¿Tienes dudas sobre la
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              validación automática?
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estas son las preguntas que más nos hacen los dueños de negocio antes de automatizar su validación de comprobantes.
          </p>
        </div>

        {/* FAQ Accordion mejorado */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-gray-100 rounded-xl bg-white/80 backdrop-blur-sm px-6 py-2 hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-purple-600 hover:no-underline py-6 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 group-hover:bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                      <faq.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="flex-1 pr-4">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base pb-6 pl-14">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA al final */}
        <div className="text-center mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Aún tienes dudas?
          </h3>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Agenda una demostración gratuita de 15 minutos y te mostramos exactamente cómo Ya Quedo puede automatizar la validación de comprobantes en tu negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              Agendar demostración gratuita
            </button>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              Contactar soporte
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
    </section>
  );
};