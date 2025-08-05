import { useState, useMemo } from "react";
import { useComprobantes } from "@/hooks/useComprobantes";
import { isWithinInterval, parseISO } from 'date-fns';

// Componentes UI y Layout
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { DashboardFilters, FilterState } from "@/components/dashboard/DashboardFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Iconos
import { 
  FileText, 
  Search, 
  CheckCircle,
  XCircle,
  Calendar,
  Building2,
  CreditCard,
  Image as ImageIcon,
  ZoomIn,
  TrendingUp,
  Activity,
  Shield
} from "lucide-react";

// Utils y Tipos
import { formatCurrency } from "@/utils/formatters";
import { Comprobante } from "@/types";

const Dashboard = () => {
  const { comprobantes, loading } = useComprobantes();
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    status: "all",
    dateRange: undefined
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  // Comprobantes filtrados
  const filteredComprobantes = useMemo(() => {
    let filtered = comprobantes;

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

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(comprobante =>
        comprobante.beneficiario?.toLowerCase().includes(term) ||
        comprobante.banco_emisor?.toLowerCase().includes(term) ||
        comprobante.numero_comprobante?.toLowerCase().includes(term) ||
        comprobante.numero_referencia?.toLowerCase().includes(term)
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter(comprobante =>
        filters.status === "valid" ? comprobante.es_valido : !comprobante.es_valido
      );
    }

    return filtered;
  }, [comprobantes, filters]);

  // Stats filtradas
  const filteredStats = useMemo(() => {
    if (!filteredComprobantes) {
      return { totalComprobantes: 0, comprobantesValidos: 0, montoTotal: 0, bancoMasUsado: "N/A" };
    }
    const comprobantesValidosFiltrados = filteredComprobantes.filter(c => c.es_valido);
    
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5);
  };

  const getStatusBadge = (esValido: boolean) => {
    return esValido ? (
      <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 px-3 py-1">
        <CheckCircle className="w-3 h-3 mr-1.5" />
        Válido
      </Badge>
    ) : (
      <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50 px-3 py-1">
        <XCircle className="w-3 h-3 mr-1.5" />
        Inválido
      </Badge>
    );
  };

  const getBankIcon = (banco: string) => {
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
          <div className="w-full h-full bg-gray-100 animate-pulse rounded flex items-center justify-center">
            <ImageIcon className="w-4 h-4 text-gray-400" />
          </div>
        )}
        {imageError && (
          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
            <XCircle className="w-4 h-4 text-red-500" />
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
      <div className="space-y-8 p-6">
        {/* Header mejorado */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Centro de control de validación automática
              </p>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Sistema activo - Validando automáticamente</span>
            </div>
          </div>
        </div>

        {/* Stats Cards con diseño mejorado */}
        <div data-tour-id="dashboard-stats">
          <StatsCards stats={filteredStats} loading={loading} />
        </div>

        {/* Tabla de Comprobantes mejorada */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-6 bg-gradient-to-r from-white to-purple-50/30 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <span className="text-gray-900 font-bold text-xl">Comprobantes Bancarios</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
                      {filteredComprobantes.length} comprobantes
                    </Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      {filteredComprobantes.filter(c => c.es_valido).length} válidos
                    </Badge>
                  </div>
                </div>
              </CardTitle>
              
              <DashboardFilters onFilterChange={setFilters} />
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex space-x-4 py-4 px-6 bg-gray-50 rounded-lg">
                      <div className="h-12 w-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded-lg w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredComprobantes.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0">
                      <TableHead className="w-12 font-semibold text-white text-center py-4">#</TableHead>
                      <TableHead className="w-20 font-semibold text-white text-center py-4">
                        <div className="flex items-center justify-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          <span>Imagen</span>
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[180px] font-semibold text-white py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Beneficiario</span>
                        </div>
                      </TableHead>
                      <TableHead className="min-w-[140px] font-semibold text-white py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>Banco Emisor</span>
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-white py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Fecha & Hora</span>
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-semibold text-white py-4">Valor</TableHead>
                      <TableHead className="font-semibold text-white text-center py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Estado</span>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredComprobantes.map((comprobante, index) => (
                      <TableRow 
                        key={comprobante.id} 
                        className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/30 transition-all duration-200 border-b border-gray-50 group"
                      >
                        <TableCell className="font-mono text-sm text-gray-500 py-5 text-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                            <span className="text-purple-600 font-semibold text-xs">{index + 1}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-5">
                          <div className="flex justify-center">
                            <div className="w-16 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200 hover:border-purple-300 transition-colors cursor-pointer group">
                              <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 truncate text-base">
                                {comprobante.beneficiario || 'Sin beneficiario'}
                              </p>
                              {comprobante.numero_referencia && (
                                <p className="text-xs text-gray-500 font-mono mt-1 bg-gray-50 px-2 py-0.5 rounded inline-block">
                                  Ref: {comprobante.numero_referencia}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              {getBankIcon(comprobante.banco_emisor)}
                            </div>
                            <span className="font-medium text-gray-900">{comprobante.banco_emisor}</span>
                          </div>
                        </TableCell>
                        
                        <TableCell className="py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">{formatDate(comprobante.fecha)}</span>
                            </div>
                            <div className="text-xs font-mono text-gray-500 ml-6">
                              {formatTime(comprobante.hora)}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="text-right py-5">
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
                        
                        <TableCell className="py-5">
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
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="font-bold text-2xl text-gray-900 mb-4">
                  No se encontraron comprobantes
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                  Intenta ajustar los filtros de búsqueda o el rango de fechas para encontrar lo que buscas.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-purple-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>El sistema sigue validando automáticamente</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Footer mejorado */}
        {filteredComprobantes.length > 0 && !loading && (
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 shadow-lg">
            <CardContent className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {filteredComprobantes.length}
                  </div>
                  <div className="text-gray-600 font-medium">Total comprobantes</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {filteredComprobantes.filter(c => c.es_valido).length}
                  </div>
                  <div className="text-gray-600 font-medium">Válidos</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500 mb-1">
                    {filteredComprobantes.filter(c => !c.es_valido).length}
                  </div>
                  <div className="text-gray-600 font-medium">Inválidos</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {formatCurrency(
                      filteredComprobantes
                        .filter(c => c.es_valido)
                        .reduce((sum, c) => sum + Number(c.valor_transferencia), 0)
                    )}
                  </div>
                  <div className="text-gray-600 font-medium">Valor total válido</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Dialog mejorado */}
        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
                Vista completa del comprobante
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Visualización ampliada del comprobante bancario
              </DialogDescription>
            </DialogHeader>
            {selectedImage && (
              <div className="flex justify-center bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-xl p-6">
                <img
                  src={selectedImage}
                  alt="Comprobante ampliado"
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-xl border border-gray-200"
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