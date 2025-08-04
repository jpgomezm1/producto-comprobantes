import { Database, Search, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Gestión Centralizada",
    description: "Mantén todos tus comprobantes organizados en un solo lugar. Acceso rápido y seguro a toda tu información financiera.",
  },
  {
    icon: Search,
    title: "Filtros Avanzados",
    description: "Encuentra cualquier comprobante en segundos. Busca por fecha, banco, monto, beneficiario o cualquier criterio específico.",
  },
  {
    icon: BarChart3,
    title: "Reportes Detallados",
    description: "Obtén estadísticas y análisis completos de tus transacciones. Visualiza tendencias y patrones en tus movimientos financieros.",
  },
  {
    icon: Shield,
    title: "Seguridad Garantizada",
    description: "Tus datos están protegidos con encriptación de nivel bancario. Cumplimos con los más altos estándares de seguridad.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="caracteristicas" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Características Principales
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre todas las herramientas que tenemos para simplificar la gestión de tus comprobantes bancarios
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-200"
            >
              {/* Icono */}
              <div className="bg-secondary-blue/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-blue/20 transition-colors">
                <feature.icon className="h-8 w-8 text-secondary-blue" />
              </div>

              {/* Título */}
              <h4 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h4>

              {/* Descripción */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats adicionales */}
        <div className="mt-20 bg-background rounded-xl border border-border p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-secondary-blue mb-2">99.9%</div>
              <div className="text-muted-foreground">Disponibilidad del sistema</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-success mb-2">256-bit</div>
              <div className="text-muted-foreground">Encriptación SSL</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <div className="text-muted-foreground">Soporte disponible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};