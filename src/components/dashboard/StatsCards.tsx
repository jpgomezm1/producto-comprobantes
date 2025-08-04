import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, DollarSign, CheckCircle, Building } from "lucide-react";
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
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Comprobantes",
      value: stats?.totalComprobantes?.toString() || "0",
      subtitle: "Este mes",
      icon: Database,
      color: "text-secondary-blue",
    },
    {
      title: "Monto Total",
      value: formatCurrency(stats?.montoTotal || 0),
      subtitle: "Registrado",
      icon: DollarSign,
      color: "text-accent-success",
    },
    {
      title: "Comprobantes Válidos",
      value: `${stats?.comprobantesValidos || 0}/${stats?.totalComprobantes || 0}`,
      subtitle: `${stats?.totalComprobantes ? Math.round((stats.comprobantesValidos / stats.totalComprobantes) * 100) : 0}% válidos`,
      icon: CheckCircle,
      color: "text-accent-success",
    },
    {
      title: "Banco Más Usado",
      value: stats?.bancoMasUsado || "N/A",
      subtitle: "Favorito",
      icon: Building,
      color: "text-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};