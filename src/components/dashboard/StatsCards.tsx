import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  DollarSign, 
  CheckCircle,
  TrendingUp,
  Activity,
  Shield
} from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { StatsData } from "@/types";

interface StatsCardsProps {
  stats: StatsData | null;
  loading: boolean;
}

export const StatsCards = ({ stats, loading }: StatsCardsProps) => {

  // Loading state mejorado
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  // Cálculo de estadísticas
  const validPercentage = stats?.totalComprobantes && stats.totalComprobantes > 0
    ? Math.round((stats.comprobantesValidos / stats.totalComprobantes) * 100) 
    : 0;

  const invalidCount = (stats?.totalComprobantes || 0) - (stats?.comprobantesValidos || 0);

  // Array de datos mejorado
  const cardsData = [
    {
      title: "Total Comprobantes",
      subtitle: "Procesados hoy",
      value: stats?.totalComprobantes?.toString() || "0",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
      iconBg: "from-purple-500 to-purple-600",
      cardBg: "from-purple-50 to-purple-100/50",
      textColor: "text-purple-600",
    },
    {
      title: "Comprobantes Válidos",
      subtitle: `${validPercentage}% de precisión`,
      value: stats?.comprobantesValidos?.toString() || "0",
      change: `${invalidCount} inválidos`,
      changeType: "neutral" as const,
      icon: CheckCircle,
      iconBg: "from-green-500 to-emerald-600",
      cardBg: "from-green-50 to-emerald-100/50",
      textColor: "text-green-600",
    },
    {
      title: "Valor Total Válido",
      subtitle: "Monto verificado",
      value: formatCurrency(stats?.montoTotal || 0),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: DollarSign,
      iconBg: "from-indigo-500 to-indigo-600",
      cardBg: "from-indigo-50 to-indigo-100/50",
      textColor: "text-indigo-600",
    },
    {
      title: "Estado del Sistema",
      subtitle: "Validación automática",
      value: "Activo",
      change: "En tiempo real",
      changeType: "positive" as const,
      icon: Activity,
      iconBg: "from-emerald-500 to-green-600",
      cardBg: "from-emerald-50 to-green-100/50",
      textColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardsData.map((card, index) => (
        <Card 
          key={index} 
          className={`border-0 bg-gradient-to-br ${card.cardBg} shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-[1.02] backdrop-blur-sm`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-semibold text-gray-700 leading-none">
                {card.title}
              </CardTitle>
              <p className="text-xs text-gray-500">
                {card.subtitle}
              </p>
            </div>
            <div className={`p-3 bg-gradient-to-br ${card.iconBg} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className={`text-3xl font-bold ${card.textColor} mb-2 leading-none`}>
              {card.value}
            </div>
            
            <div className="flex items-center gap-2">
              {card.changeType === "positive" && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">{card.change}</span>
                </div>
              )}
              {card.changeType === "neutral" && (
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-600">{card.change}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};