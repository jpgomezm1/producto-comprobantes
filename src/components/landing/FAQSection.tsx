import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Mis datos están seguros?",
    answer: "Absolutamente. Utilizamos encriptación SSL y seguimos las mejores prácticas de seguridad para proteger tu información como si fuera nuestra."
  },
  {
    question: "¿Qué pasa si supero el límite de comprobantes de mi plan?",
    answer: "Te notificaremos para que puedas actualizar tu plan fácilmente. No te cobraremos extra sin tu permiso. Creemos en la transparencia."
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer: "Sí, puedes cancelar tu plan cuando quieras, sin contratos ni penalizaciones. Tu cuenta permanecerá activa hasta el final de tu ciclo de facturación."
  }
];

export const FAQSection = () => {
  return (
    <section id="preguntas" className="py-24 px-4 bg-gradient-hero">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Tienes preguntas?
            <span className="text-secondary-blue block">Tenemos respuestas.</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-secondary-blue">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};