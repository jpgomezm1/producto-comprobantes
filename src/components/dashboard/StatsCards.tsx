import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, DollarSign, CheckCircle, Building, TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { StatsData } from "@/types";

interface StatsCardsProps {
  stats: StatsData | null;
  loading: boolean;
}

export const StatsCards = ({ stats, loading }: StatsCardsProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Calcular porcentaje de validez
  const validPercentage = stats?.totalComprobantes 
    ? Math.round((stats.comprobantesValidos / stats.totalComprobantes) * 100) 
    : 0;

  const cards = [
    {
      title: "Total Comprobantes",
      value: stats?.totalComprobantes?.toString() || "0",
      subtitle: "Registrados este mes",
      icon: Database,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: null,
      gradient: "from-blue-50 to-blue-100/50"
    },
    {
      title: "Monto Total",
      value: formatCurrency(stats?.montoTotal || 0),
      subtitle: "Valor acumulado",
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: stats?.montoTotal && stats.montoTotal > 0 ? "up" : null,
      gradient: "from-green-50 to-green-100/50"
    },
    {
      title: "Comprobantes Válidos",
      value: `${stats?.comprobantesValidos || 0}/${stats?.totalComprobantes || 0}`,
      subtitle: `${validPercentage}% de éxito`,
      icon: CheckCircle,
      iconBg: validPercentage >= 80 ? "bg-green-100" : validPercentage >= 60 ? "bg-yellow-100" : "bg-red-100",
      iconColor: validPercentage >= 80 ? "text-green-600" : validPercentage >= 60 ? "text-yellow-600" : "text-red-600",
      trend: validPercentage >= 80 ? "up" : validPercentage < 60 ? "down" : null,
      gradient: validPercentage >= 80 ? "from-green-50 to-green-100/50" : validPercentage >= 60 ? "from-yellow-50 to-yellow-100/50" : "from-red-50 to-red-100/50"
    },
    {
      title: "Banco Favorito",
      value: stats?.bancoMasUsado || "N/A",
      subtitle: "Más utilizado",
      icon: Building,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: null,
      gradient: "from-purple-50 to-purple-100/50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden relative"
        >
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60`}></div>
          
          {/* Content */}
          <div className="relative z-10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                {card.title}
              </CardTitle>
              <div className={`${card.iconBg} p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-3xl transition-all duration-200">
                    {card.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-medium text-gray-600">
                      {card.subtitle}
                    </p>
                    {card.trend && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        card.trend === "up" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {card.trend === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {card.trend === "up" ? "Bueno" : "Revisar"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Progress bar para comprobantes válidos */}
              {index === 2 && stats?.totalComprobantes && stats.totalComprobantes > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        validPercentage >= 80 ? "bg-green-500" : 
                        validPercentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${validPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Mini chart indicator para monto total */}
              {index === 1 && stats?.montoTotal && stats.montoTotal > 0 && (
                <div className="mt-3 flex items-end gap-1 h-6">
                  {[1, 2, 3, 4, 5].map((bar, i) => (
                    <div
                      key={i}
                      className="bg-green-300 rounded-sm flex-1 opacity-60"
                      style={{ 
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 100}ms`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </CardContent>
          </div>
          
          {/* Hover effect border */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-xl transition-colors duration-200"></div>
        </Card>
      ))}
    </div>
  );
};