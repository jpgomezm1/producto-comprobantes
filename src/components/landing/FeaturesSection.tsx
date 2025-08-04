import { 
  Database, 
  Search, 
  BarChart3, 
  Shield
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Database,
    title: "Gestión Centralizada",
    description: "Guarda todos tus comprobantes en un solo lugar. ¡Adiós a las cajas de zapatos y las carpetas desordenadas!"
  },
  {
    icon: Search,
    title: "Búsqueda Inteligente",
    description: "Encuentra cualquier comprobante al instante. Busca por fecha, banco, cliente o valor y encuéntralo en segundos."
  },
  {
    icon: BarChart3,
    title: "Reportes Claros",
    description: "Entiende tus números con estadísticas automáticas. Visualiza tus ingresos totales y qué bancos usas más."
  },
  {
    icon: Shield,
    title: "Seguridad Total",
    description: "Tu información financiera está protegida. Usamos encriptación de nivel bancario para tu tranquilidad."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="caracteristicas" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Todo lo que necesitas para que
            <span className="text-secondary-blue block">tus cuentas cuadren.</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-secondary-blue" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};