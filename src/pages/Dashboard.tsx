import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useComprobantes } from "@/hooks/useComprobantes";
import { formatCurrency } from "@/utils/formatters";

const Dashboard = () => {
  const { comprobantes, loading, stats } = useComprobantes();
  const recentComprobantes = comprobantes.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Resumen de tus comprobantes bancarios
            </p>
          </div>
          <Button variant="blue" asChild>
            <Link to="/comprobantes/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Comprobante
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} loading={loading} />

        {/* Comprobantes Recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary-blue" />
              Comprobantes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : recentComprobantes.length > 0 ? (
              <div className="space-y-4">
                {recentComprobantes.map((comprobante) => (
                  <div key={comprobante.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{comprobante.beneficiario}</p>
                      <p className="text-sm text-muted-foreground">{comprobante.banco_emisor} • {comprobante.fecha}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{formatCurrency(comprobante.valor_transferencia)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${comprobante.es_valido ? 'bg-accent-success/10 text-accent-success' : 'bg-destructive/10 text-destructive'}`}>
                        {comprobante.es_valido ? 'Válido' : 'Inválido'}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/comprobantes">Ver Todos los Comprobantes</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No hay comprobantes</h3>
                <p className="text-muted-foreground mb-4">Crea tu primer comprobante para comenzar</p>
                <Button variant="blue" asChild>
                  <Link to="/comprobantes/nuevo">Crear Comprobante</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;