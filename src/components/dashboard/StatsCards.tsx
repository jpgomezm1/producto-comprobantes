import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  DollarSign, 
  CheckCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { StatsData } from "@/types"; // Asegúrate de que este tipo esté correctamente definido

interface StatsCardsProps {
  stats: StatsData | null;
  loading: boolean;
}

// Estilos base para las tarjetas para fácil mantenimiento
const cardStyles = {
  total: "from-blue-500 to-blue-600",
  valor: "from-emerald-500 to-emerald-600",
  validez: "from-violet-500 to-violet-600",
};

export const StatsCards = ({ stats, loading }: StatsCardsProps) => {

  // El estado de carga ahora coincide con el nuevo diseño simplificado
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse bg-slate-200 border-0 h-32">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-slate-300 rounded w-2/4"></div>
              <div className="h-8 w-8 bg-slate-300 rounded-md"></div>
            </CardHeader>
            <CardContent>
              <div className="h-10 bg-slate-300 rounded w-3/5 mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  // Cálculo de la tasa de validez
  const validPercentage = stats?.totalComprobantes && stats.totalComprobantes > 0
    ? Math.round((stats.comprobantesValidos / stats.totalComprobantes) * 100) 
    : 0;

  // Array de datos para mapear y crear las tarjetas
  const cardsData = [
    {
      title: "Total Comprobantes",
      value: stats?.totalComprobantes?.toString() || "0",
      icon: FileText,
      style: cardStyles.total,
    },
    {
      title: "Valor Total (Válido)",
      value: formatCurrency(stats?.montoTotal || 0),
      icon: DollarSign,
      style: cardStyles.valor,
    },
    {
      title: "Tasa de Validez",
      value: `${validPercentage}%`,
      icon: CheckCircle,
      style: cardStyles.validez,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card, index) => (
        <Card 
          key={index} 
          className={`border-0 text-white bg-gradient-to-br ${card.style} shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-primary-foreground/90 uppercase tracking-wider">
              {card.title}
            </CardTitle>
            <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <card.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white">
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};