import { useState, useEffect, useMemo } from "react";
import { format, startOfWeek, startOfMonth, endOfDay } from "date-fns";
import { es } from 'date-fns/locale';
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Filter, 
  RotateCcw, 
  CheckCircle, 
  XCircle,
  Clock,
  SlidersHorizontal
} from "lucide-react";

// Tipo para el estado de los filtros
export type FilterState = {
  searchTerm: string;
  status: "all" | "valid" | "invalid";
  dateRange: DateRange | undefined;
};

interface DashboardFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export const DashboardFilters = ({ onFilterChange }: DashboardFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<FilterState["status"]>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Efecto que notifica cambios al componente padre
  useEffect(() => {
    onFilterChange({ searchTerm, status, dateRange });
  }, [searchTerm, status, dateRange, onFilterChange]);
  
  // Maneja presets de fecha
  const handlePresetClick = (preset: string) => {
    let newRange: DateRange | undefined;
    const today = new Date();
    
    if (preset === activePreset) {
      setActivePreset(null);
      newRange = undefined;
    } else {
      setActivePreset(preset);
      switch(preset) {
        case 'hoy':
          newRange = { from: today, to: endOfDay(today) };
          break;
        case 'semana':
          newRange = { from: startOfWeek(today, { locale: es }), to: endOfDay(today) };
          break;
        case 'mes':
          newRange = { from: startOfMonth(today), to: endOfDay(today) };
          break;
        default:
          newRange = undefined;
      }
    }
    setDateRange(newRange);
  };
  
  // Maneja selección de rango personalizado
  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      range.to = range.to ? endOfDay(range.to) : endOfDay(range.from);
    }
    setDateRange(range);
    setActivePreset(null);
  }

  // Reset todos los filtros
  const handleReset = () => {
    setSearchTerm("");
    setStatus("all");
    setDateRange(undefined);
    setActivePreset(null);
  };

  // Determina si hay filtros activos
  const isFiltered = useMemo(() => {
    return searchTerm !== "" || status !== "all" || dateRange !== undefined;
  }, [searchTerm, status, dateRange]);

  // Cuenta filtros activos para el badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm !== "") count++;
    if (status !== "all") count++;
    if (dateRange !== undefined) count++;
    return count;
  }, [searchTerm, status, dateRange]);

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-3 sm:p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:gap-4">
        
        {/* Header con indicador de filtros activos para móvil */}
        <div className="flex items-center justify-between sm:hidden">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
              <SlidersHorizontal className="h-3 w-3 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Filtros</span>
          </div>
          {activeFiltersCount > 0 && (
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs px-2 py-0.5">
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        {/* Input de Búsqueda optimizado para móvil */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar beneficiario, banco..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 h-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200 bg-white/80 backdrop-blur-sm text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>

        {/* Filtros de Fecha optimizados para móvil */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 sm:hidden">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-600 font-medium">Período:</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Button 
              variant={activePreset === 'hoy' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handlePresetClick('hoy')}
              className={cn(
                "h-8 px-3 text-xs sm:text-sm sm:h-9 sm:px-4",
                activePreset === 'hoy' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                  : 'border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
              )}
            >
              Hoy
            </Button>
            
            <Button 
              variant={activePreset === 'semana' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handlePresetClick('semana')}
              className={cn(
                "h-8 px-3 text-xs sm:text-sm sm:h-9 sm:px-4",
                activePreset === 'semana' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                  : 'border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
              )}
            >
              Semana
            </Button>
            
            <Button 
              variant={activePreset === 'mes' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => handlePresetClick('mes')}
              className={cn(
                "h-8 px-3 text-xs sm:text-sm sm:h-9 sm:px-4",
                activePreset === 'mes' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-md' 
                  : 'border-gray-200 text-gray-600 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600'
              )}
            >
              Mes
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 px-3 text-xs justify-start text-left font-normal border-gray-200 hover:bg-purple-50 hover:border-purple-200 sm:w-[180px] sm:text-sm sm:h-9",
                    !dateRange && "text-gray-500",
                    dateRange && "border-purple-200 bg-purple-50 text-purple-700"
                  )}
                >
                  <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  {dateRange?.from ? (
                    dateRange.to && dateRange.to > dateRange.from ? (
                      <span className="hidden sm:inline">
                        {format(dateRange.from, "dd MMM", { locale: es })} -{" "}
                        {format(dateRange.to, "dd MMM", { locale: es })}
                      </span>
                    ) : (
                      <span className="hidden sm:inline">{format(dateRange.from, "dd MMM yyyy", { locale: es })}</span>
                    )
                  ) : null}
                  <span className="sm:hidden">Personalizado</span>
                  <span className="hidden sm:inline">{!dateRange?.from && "Rango personalizado"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 shadow-xl border-gray-200" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={window.innerWidth < 640 ? 1 : 2}
                  locale={es}
                  className="border-0"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Filtro de Estado y Reset en una fila */}
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <Select value={status} onValueChange={(value: FilterState["status"]) => setStatus(value)}>
              <SelectTrigger className="h-10 border-gray-200 focus:border-purple-300 focus:ring-purple-200 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  {status === "valid" && <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                  {status === "invalid" && <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />}
                  {status === "all" && <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />}
                  <SelectValue placeholder="Estado" className="text-sm" />
                </div>
              </SelectTrigger>
              <SelectContent className="border-gray-200 shadow-xl">
                <SelectItem value="all" className="hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span>Todos</span>
                  </div>
                </SelectItem>
                <SelectItem value="valid" className="hover:bg-green-50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Válidos</span>
                  </div>
                </SelectItem>
                <SelectItem value="invalid" className="hover:bg-red-50">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Inválidos</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Botón de Reset */}
          {isFiltered && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleReset} 
              className="h-10 px-3 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-gray-200 hover:border-red-200 flex-shrink-0"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
              <span className="hidden sm:inline text-xs">Limpiar</span>
            </Button>
          )}
        </div>

      </div>

      {/* Resumen de filtros activos - Solo en desktop */}
      {isFiltered && (
        <div className="hidden sm:block mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Activos:</span>
            
            {searchTerm && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                "{searchTerm.length > 15 ? searchTerm.substring(0, 15) + '...' : searchTerm}"
              </Badge>
            )}
            
            {status !== "all" && (
              <Badge variant="outline" className={cn(
                "text-xs",
                status === "valid" && "bg-green-50 text-green-700 border-green-200",
                status === "invalid" && "bg-red-50 text-red-700 border-red-200"
              )}>
                {status === "valid" ? "Válidos" : "Inválidos"}
              </Badge>
            )}
            
            {dateRange && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                {activePreset ? 
                  activePreset === 'hoy' ? 'Hoy' : activePreset === 'semana' ? 'Semana' : 'Mes' :
                  `${format(dateRange.from!, "dd/MM", { locale: es })} - ${format(dateRange.to || dateRange.from!, "dd/MM", { locale: es })}`
                }
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};