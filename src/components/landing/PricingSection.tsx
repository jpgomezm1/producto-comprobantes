import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Plan Básico",
    price: "$15 USD",
    period: "/ mes",
    description: "Ideal para empezar a organizar tus finanzas.",
    features: [
      "Hasta 150 comprobantes/mes",
      "1 Usuario",
      "Dashboard y Filtros",
      "1 GB de almacenamiento"
    ],
    buttonText: "Comenzar con Plan Básico",
    popular: false
  },
  {
    name: "Plan Profesional",
    price: "$45 USD",
    period: "/ mes",
    description: "Perfecto para negocios que crecen y necesitan más control.",
    features: [
      "Hasta 600 comprobantes/mes",
      "Hasta 3 Usuarios",
      "Exportar Reportes (PDF/Excel)",
      "Análisis Histórico",
      "5 GB de almacenamiento",
      "Soporte por chat"
    ],
    buttonText: "Elegir Plan Profesional",
    popular: true
  },
  {
    name: "Plan Negocios",
    price: "$90 USD",
    period: "/ mes",
    description: "La solución completa para negocios con alto volumen.",
    features: [
      "Comprobantes Ilimitados",
      "Hasta 10 Usuarios",
      "Todo lo del plan Profesional",
      "20 GB de almacenamiento",
      "Soporte dedicado"
    ],
    buttonText: "Contactar para Plan Negocios",
    popular: false
  }
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Un plan para cada etapa de
            <span className="text-secondary-blue block">tu negocio.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comienza gratis y escala a medida que creces. Sin contratos ni compromisos.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-border bg-card hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-secondary-blue scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary-blue text-white px-4 py-1">
                  Más Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-secondary-blue">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-accent-success mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-secondary-blue hover:bg-secondary-blue/90' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                  size="lg"
                  onClick={() => {
                    const planParam = plan.name === "Plan Básico" ? "basico" : 
                                    plan.name === "Plan Profesional" ? "profesional" : "negocios";
                    window.location.href = `/register?plan=${planParam}`;
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};