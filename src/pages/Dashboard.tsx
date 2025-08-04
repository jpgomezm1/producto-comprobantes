import { useState, useMemo } from "react";
import { useComprobantes } from "@/hooks/useComprobantes";
import { isWithinInterval, parseISO } from 'date-fns';

// Componentes UI y Layout (Sin cambios en los imports)
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DashboardFilters, FilterState } from "@/components/dashboard/DashboardFilters"; // Nuevo componente de filtros
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Iconos (Sin cambios en los imports)
import { 
  FileText, 
  Search, 
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  CreditCard,
  Image as ImageIcon,
  ZoomIn
} from "lucide-react";

// Utils y Tipos
import { formatCurrency } from "@/utils/formatters";
import { Comprobante } from "@/types";

const Dashboard = () => {
  // El hook ahora solo devuelve los datos crudos y el estado de carga.
  // El estado `stats` global ya no se usa, se calculará dinámicamente.
  const { comprobantes, loading } = useComprobantes();
  
  // 1. Estado centralizado para todos los filtros, manejado por `DashboardFilters`.
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    status: "all",
    dateRange: undefined
  });

  // Estado para el diálogo de visualización de imagen (sin cambios)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // 2. Memoización para los comprobantes filtrados, usando el nuevo objeto `filters`.
  const filteredComprobantes = useMemo(() => {
    let filtered = comprobantes;

    // Filtro por rango de fechas
    if (filters.dateRange?.from) {
      filtered = filtered.filter(comprobante => {
        try {
          const comprobanteDate = parseISO(comprobante.fecha);
          const endInterval = filters.dateRange!.to || filters.dateRange!.from!;
          return isWithinInterval(comprobanteDate, {
            start: filters.dateRange!.from!,
            end: endInterval
          });
        } catch (error) {
          console.error("Formato de fecha inválido:", comprobante);
          return false;
        }
      });
    }

    // Filtro por término de búsqueda
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(comprobante =>
        comprobante.beneficiario?.toLowerCase().includes(term) ||
        comprobante.banco_emisor?.toLowerCase().includes(term) ||
        comprobante.numero_comprobante?.toLowerCase().includes(term) ||
        comprobante.numero_referencia?.toLowerCase().includes(term)
      );
    }

    // Filtro por estado de validez
    if (filters.status !== "all") {
      filtered = filtered.filter(comprobante =>
        filters.status === "valid" ? comprobante.es_valido : !comprobante.es_valido
      );
    }

    return filtered;
  }, [comprobantes, filters]);

  // 3. (CRUCIAL) Memoización para recalcular las estadísticas para las `StatsCards` basadas en los datos ya filtrados.
  const filteredStats = useMemo(() => {
    if (!filteredComprobantes) {
      return { totalComprobantes: 0, comprobantesValidos: 0, montoTotal: 0, bancoMasUsado: "N/A" };
    }
    const comprobantesValidosFiltrados = filteredComprobantes.filter(c => c.es_valido);
    
    // Calcular banco más usado
    const bancoCounts: Record<string, number> = {};
    filteredComprobantes.forEach(c => {
      bancoCounts[c.banco_emisor] = (bancoCounts[c.banco_emisor] || 0) + 1;
    });
    const bancoMasUsado = Object.keys(bancoCounts).reduce((a, b) => 
      bancoCounts[a] > bancoCounts[b] ? a : b, "N/A"
    );
    
    return {
      totalComprobantes: filteredComprobantes.length,
      comprobantesValidos: comprobantesValidosFiltrados.length,
      montoTotal: comprobantesValidosFiltrados.reduce((sum, c) => sum + Number(c.valor_transferencia), 0),
      bancoMasUsado
    };
  }, [filteredComprobantes]);

  // --- FUNCIONES AUXILIARES (Restauradas y mantenidas como en el original) ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5); // Formato HH:MM
  };

  const getStatusBadge = (esValido: boolean) => {
    return esValido ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
        <CheckCircle className="w-3 h-3 mr-1" />
        Válido
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
        <XCircle className="w-3 h-3 mr-1" />
        Inválido
      </Badge>
    );
  };

  const getBankIcon = (banco: string) => {
    // Aquí podrías tener una lógica más compleja si quisieras diferentes iconos por banco
    return <Building2 className="w-4 h-4 text-purple-600" />;
  };

  const handleImageView = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageDialogOpen(true);
  };

  const ImagePreview = ({ imageUrl, alt, className = "" }: { imageUrl: string; alt: string; className?: string }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <div className={`relative ${className}`}>
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-muted animate-pulse rounded flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
        {imageError && (
          <div className="w-full h-full bg-muted rounded flex items-center justify-center">
            <XCircle className="w-4 h-4 text-destructive" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={alt}
          className={`w-full h-full object-cover rounded transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Gestiona y visualiza todos tus comprobantes bancarios
          </p>
        </div>

        {/* Stats Cards (ahora usan los stats filtrados) */}
        <div data-tour-id="dashboard-stats">
          <StatsCards stats={filteredStats} loading={loading} />
        </div>

        {/* Comprobantes Table */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <span className="text-gray-900 font-bold">Comprobantes Bancarios</span>
                  <Badge variant="outline" className="ml-3 bg-purple-50 text-purple-700 border-purple-200">
                    {filteredComprobantes.length}
                  </Badge>
                </div>
              </CardTitle>
              
              {/* 4. Controles de filtro reemplazados por el nuevo componente unificado */}
              <DashboardFilters onFilterChange={setFilters} />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4 py-3 px-6">
                      <div className="h-12 w-16 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredComprobantes.length > 0 ? (
              <div className="overflow-x-auto">
                {/* 5. ESTRUCTURA Y ESTILO DE LA TABLA RESTAURADOS AL 100% */}
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 border-0">
                      <TableHead className="w-12 font-bold text-white text-center">#</TableHead>
                      <TableHead className="w-20 font-bold text-white text-center">
                        <div className="flex items-center justify-center gap-1">
                          <ImageIcon className="w-4 h-4" />
                          <span>Imagen</span>
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[150px] font-bold text-white">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Beneficiario</span>
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[120px] font-bold text-white">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>Banco Emisor</span>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-white">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Fecha</span>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-white text-center">Hora</TableHead>
                      <TableHead className="text-right font-bold text-white">Valor</TableHead>
                      <TableHead className="font-bold text-white text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Estado</span>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComprobantes.map((comprobante, index) => (
                      <TableRow 
                        key={comprobante.id} 
                        className="hover:bg-purple-50/50 transition-colors border-b border-gray-100"
                      >
                        <TableCell className="font-mono text-sm text-muted-foreground py-4 text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex justify-center">
                            <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                              <ImageIcon className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate">
                                {comprobante.beneficiario || 'Sin beneficiario'}
                              </p>
                              {comprobante.numero_referencia && (
                                <p className="text-xs text-gray-500 font-mono mt-1">
                                  Ref: {comprobante.numero_referencia}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            {getBankIcon(comprobante.banco_emisor)}
                            <span className="font-medium text-gray-900">{comprobante.banco_emisor}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{formatDate(comprobante.fecha)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-mono text-gray-700 py-4 text-center">
                          {formatTime(comprobante.hora)}
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="text-right">
                            <span className="font-bold text-lg text-gray-900">
                              {formatCurrency(comprobante.valor_transferencia)}
                            </span>
                            {comprobante.moneda && comprobante.moneda !== 'COP' && (
                              <span className="text-xs text-gray-500 block mt-1">
                                {comprobante.moneda}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex justify-center">
                            {getStatusBadge(comprobante.es_valido)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  No se encontraron comprobantes
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                  Intenta ajustar los filtros de búsqueda o el rango de fechas para encontrar lo que buscas.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 6. Summary Footer RESTAURADO Y AHORA USA DATOS FILTRADOS */}
        {filteredComprobantes.length > 0 && !loading && (
          <Card className="bg-purple-50/50 border-purple-100 shadow-md">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex items-center gap-8">
                  <span className="text-gray-600">
                    Total de comprobantes: <strong className="text-gray-900 font-semibold">{filteredComprobantes.length}</strong>
                  </span>
                  <span className="text-gray-600">
                    Válidos: <strong className="text-green-600 font-semibold">{filteredComprobantes.filter(c => c.es_valido).length}</strong>
                  </span>
                  <span className="text-gray-600">
                    Inválidos: <strong className="text-red-600 font-semibold">{filteredComprobantes.filter(c => !c.es_valido).length}</strong>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-600">Valor total (Válidos): </span>
                  <strong className="text-gray-900 text-xl font-bold">
                    {formatCurrency(
                      filteredComprobantes
                        .filter(c => c.es_valido)
                        .reduce((sum, c) => sum + Number(c.valor_transferencia), 0)
                    )}
                  </strong>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Dialog (sin cambios) */}
        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
                Vista completa del comprobante
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Visualización ampliada del comprobante bancario
              </DialogDescription>
            </DialogHeader>
            {selectedImage && (
              <div className="flex justify-center bg-gray-50 rounded-lg p-4">
                <img
                  src={selectedImage}
                  alt="Comprobante ampliado"
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;