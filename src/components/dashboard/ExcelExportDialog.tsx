import { useState } from "react";
import { format, startOfWeek, startOfMonth, endOfDay, subMonths, startOfDay } from "date-fns";
import { es } from 'date-fns/locale';
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar as CalendarIcon, 
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  Filter,
  Clock,
  RotateCcw
} from "lucide-react";

import { Comprobante } from "@/types";
import { cn } from "@/lib/utils";
import { exportToExcel } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";

interface ExcelExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  comprobantes: Comprobante[];
}

type DatePreset = 'hoy' | 'semana' | 'mes' | 'mes-anterior' | 'personalizado' | null;

export const ExcelExportDialog = ({ isOpen, onClose, comprobantes }: ExcelExportDialogProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activePreset, setActivePreset] = useState<DatePreset>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handlePresetClick = (preset: DatePreset) => {
    let newRange: DateRange | undefined;
    const today = new Date();
    
    if (preset === activePreset) {
      setActivePreset(null);
      newRange = undefined;
    } else {
      setActivePreset(preset);
      switch(preset) {
        case 'hoy':
          newRange = { from: startOfDay(today), to: endOfDay(today) };
          break;
        case 'semana':
          newRange = { from: startOfWeek(today, { locale: es }), to: endOfDay(today) };
          break;
        case 'mes':
          newRange = { from: startOfMonth(today), to: endOfDay(today) };
          break;
        case 'mes-anterior':
          const lastMonth = subMonths(today, 1);
          newRange = { 
            from: startOfMonth(lastMonth), 
            to: endOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0))
          };
          break;
        default:
          newRange = undefined;
      }
    }
    setDateRange(newRange);
  };

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setActivePreset(range ? 'personalizado' : null);
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const result = await exportToExcel(comprobantes, { 
        dateRange 
      });
      
      if (result.success) {
        toast({
          title: "¡Exportación exitosa!",
          description: `Se exportaron ${result.recordsExported} comprobantes al archivo ${result.filename}`,
          variant: "default",
        });
        
        resetAndClose();
      }
      
    } catch (error) {
      console.error("Error al exportar:", error);
      toast({
        title: "Error al exportar",
        description: "Ocurrió un error al generar el archivo Excel. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const resetAndClose = () => {
    setDateRange(undefined);
    setActivePreset(null);
    setIsExporting(false);
    onClose();
  };

  const clearSelection = () => {
    setDateRange(undefined);
    setActivePreset(null);
  };

  // Estadísticas de los comprobantes filtrados
  const stats = {
    total: comprobantes.length,
    validos: comprobantes.filter(c => c.es_valido).length,
    invalidos: comprobantes.filter(c => !c.es_valido).length,
    montoTotal: comprobantes
      .filter(c => c.es_valido)
      .reduce((sum, c) => sum + Number(c.valor_transferencia), 0)
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Exportar Reporte Excel</span>
              <p className="text-sm text-gray-500 font-normal mt-1">
                Selecciona el período que deseas exportar
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Resumen de datos actuales */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-600" />
              Datos disponibles para exportar
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center bg-white/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                <div className="text-gray-600 font-medium">Total</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{stats.validos}</div>
                <div className="text-gray-600 font-medium">Válidos</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-500">{stats.invalidos}</div>
                <div className="text-gray-600 font-medium">Inválidos</div>
              </div>
              <div className="text-center bg-white/50 rounded-lg p-3">
                <div className="text-lg font-bold text-indigo-600">
                  {new Intl.NumberFormat('es-CO', { 
                    style: 'currency', 
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(stats.montoTotal)}
                </div>
                <div className="text-gray-600 font-medium text-xs">Valor total</div>
              </div>
            </div>
          </div>

          {/* Selector de período */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <label className="text-sm font-semibold text-gray-900">
                Selecciona el período a exportar
              </label>
            </div>
            
            {/* Botones de selección rápida */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant={activePreset === 'hoy' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handlePresetClick('hoy')}
                className={cn(
                  "h-11 px-4 text-sm transition-all duration-200",
                  activePreset === 'hoy' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                    : 'border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Hoy
              </Button>
              
              <Button 
                variant={activePreset === 'semana' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handlePresetClick('semana')}
                className={cn(
                  "h-11 px-4 text-sm transition-all duration-200",
                  activePreset === 'semana' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                    : 'border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Esta semana
              </Button>
              
              <Button 
                variant={activePreset === 'mes' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handlePresetClick('mes')}
                className={cn(
                  "h-11 px-4 text-sm transition-all duration-200",
                  activePreset === 'mes' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                    : 'border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Este mes
              </Button>
              
              <Button 
                variant={activePreset === 'mes-anterior' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => handlePresetClick('mes-anterior')}
                className={cn(
                  "h-11 px-4 text-sm transition-all duration-200",
                  activePreset === 'mes-anterior' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                    : 'border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Mes anterior
              </Button>
            </div>

            {/* Selector de fechas personalizado */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-3">¿Necesitas un período específico?</p>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 px-4 justify-start text-left font-normal border-gray-200 hover:bg-purple-50 hover:border-purple-200",
                      !dateRange && "text-gray-500",
                      dateRange && activePreset === 'personalizado' && "border-purple-200 bg-purple-50 text-purple-700"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-4 w-4" />
                    {dateRange?.from && activePreset === 'personalizado' ? (
                      dateRange.to && dateRange.to > dateRange.from ? (
                        <>
                          {format(dateRange.from, "dd MMM yyyy", { locale: es })} -{" "}
                          {format(dateRange.to, "dd MMM yyyy", { locale: es })}
                        </>
                      ) : (
                        format(dateRange.from, "dd MMM yyyy", { locale: es })
                      )
                    ) : (
                      "Seleccionar fechas personalizadas"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 shadow-xl border-gray-200 bg-white" 
                  align="start"
                  side="bottom"
                  sideOffset={8}
                >
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleDateSelect}
                    numberOfMonths={window.innerWidth < 768 ? 1 : 2}
                    locale={es}
                    className="border-0 bg-white"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 bg-white",
                      month: "space-y-4 bg-white",
                      caption: "flex justify-center pt-1 relative items-center bg-white",
                      caption_label: "text-sm font-medium text-gray-900",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-900",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-purple-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-gray-700 hover:bg-purple-100 hover:text-purple-900 rounded-md",
                      day_selected: "bg-purple-600 text-white hover:bg-purple-600 hover:text-white focus:bg-purple-600 focus:text-white",
                      day_today: "bg-gray-100 text-gray-900 font-semibold",
                      day_outside: "text-gray-400 opacity-50",
                      day_disabled: "text-gray-400 opacity-50",
                      day_range_middle: "aria-selected:bg-purple-100 aria-selected:text-purple-900",
                      day_hidden: "invisible",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Mostrar selección activa */}
            {(dateRange || activePreset) && (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    {activePreset === 'hoy' && 'Exportando datos de hoy'}
                    {activePreset === 'semana' && 'Exportando datos de esta semana'}
                    {activePreset === 'mes' && 'Exportando datos de este mes'}
                    {activePreset === 'mes-anterior' && 'Exportando datos del mes anterior'}
                    {activePreset === 'personalizado' && dateRange?.from && (
                      `Período: ${format(dateRange.from, "dd/MM/yyyy", { locale: es })} - ${
                        dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: es }) : format(dateRange.from, "dd/MM/yyyy", { locale: es })
                      }`
                    )}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="h-8 px-2 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Limpiar
                </Button>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={resetAndClose}
              className="flex-1 h-12 border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
              disabled={isExporting}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || stats.total === 0}
              className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-md font-medium"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Excel
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};