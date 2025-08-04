import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, BarChart3, Search, Database } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section id="inicio" className="bg-gradient-hero py-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Título principal */}
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Tus comprobantes en orden.
          <br />
          <span className="text-secondary-blue">Tu negocio, más claro que nunca.</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
          Con Ya Quedo, dejas de perder tiempo buscando recibos y empiezas a tomar el control de tus finanzas. 
          Centraliza, valida y analiza tus transacciones en minutos.
        </p>

        {/* CTA Button */}
        <Button 
          size="lg"
          className="mb-16 group bg-secondary-blue hover:bg-secondary-blue/90 text-lg px-8 py-4 h-auto"
          asChild
        >
          <Link to="/register">
            Crear mi cuenta gratis
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {/* Mockup del dashboard */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6 max-w-4xl mx-auto">
          <div className="bg-background rounded-lg border border-border p-4">
            {/* Header simulado */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg"></div>
                <span className="font-semibold text-primary">Dashboard</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-20 h-8 bg-muted rounded"></div>
                <div className="w-8 h-8 bg-secondary-blue rounded"></div>
              </div>
            </div>

            {/* Stats cards simuladas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Database, label: "Total", value: "156" },
                { icon: BarChart3, label: "Monto", value: "$2.5M" },
                { icon: Shield, label: "Válidos", value: "98%" },
                { icon: Search, label: "Bancolombia", value: "Top" },
              ].map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-4 text-center">
                  <stat.icon className="h-6 w-6 text-secondary-blue mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                  <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Tabla simulada */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-3 border-b border-border">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                  <span>Fecha</span>
                  <span>Banco</span>
                  <span>Monto</span>
                  <span>Estado</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {[1, 2, 3].map((row) => (
                  <div key={row} className="px-4 py-3 grid grid-cols-4 gap-4 text-sm">
                    <span className="text-muted-foreground">15/01/2024</span>
                    <span className="text-foreground">Bancolombia</span>
                    <span className="text-foreground font-medium">$500.000</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent-success/10 text-accent-success">
                      Válido
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};