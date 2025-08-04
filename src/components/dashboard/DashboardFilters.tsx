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
import { Search, Calendar as CalendarIcon, Filter, RotateCcw } from "lucide-react"; // 1. Importar el nuevo ícono

// Tipo para el estado de los filtros, exportable para ser usado en el componente padre
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

  // Efecto que notifica al componente padre sobre cualquier cambio en los filtros.
  useEffect(() => {
    onFilterChange({ searchTerm, status, dateRange });
  }, [searchTerm, status, dateRange, onFilterChange]);
  
  // Maneja el clic en los botones de presets de fecha (Hoy, Semana, Mes)
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
  
  // Maneja la selección de un rango de fechas en el calendario
  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      range.to = range.to ? endOfDay(range.to) : endOfDay(range.from);
    }
    setDateRange(range);
    setActivePreset(null);
  }

  // 2. Función para resetear todos los estados a sus valores iniciales
  const handleReset = () => {
    setSearchTerm("");
    setStatus("all");
    setDateRange(undefined);
    setActivePreset(null);
  };

  // 3. Memo para determinar si algún filtro está activo y mostrar el botón de reset
  const isFiltered = useMemo(() => {
    return searchTerm !== "" || status !== "all" || dateRange !== undefined;
  }, [searchTerm, status, dateRange]);


  return (
    <div className="flex flex-col md:flex-row items-center gap-2 w-full">
      {/* Input de Búsqueda */}
      <div className="relative flex-1 w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por beneficiario, banco..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filtros de Fecha (Presets y Rango Personalizado) */}
      <div className="flex items-center gap-2">
        <Button variant={activePreset === 'hoy' ? 'default' : 'outline'} size="sm" onClick={() => handlePresetClick('hoy')}>Hoy</Button>
        <Button variant={activePreset === 'semana' ? 'default' : 'outline'} size="sm" onClick={() => handlePresetClick('semana')}>Semana</Button>
        <Button variant={activePreset === 'mes' ? 'default' : 'outline'} size="sm" onClick={() => handlePresetClick('mes')}>Mes</Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              size="sm"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to && dateRange.to > dateRange.from ? (
                  <>
                    {format(dateRange.from, "LLL dd, y", { locale: es })} -{" "}
                    {format(dateRange.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Seleccionar rango</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Filtro de Estado */}
      <div className="w-full md:w-[180px]">
        <Select value={status} onValueChange={(value: FilterState["status"]) => setStatus(value)}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="valid">Válidos</SelectItem>
            <SelectItem value="invalid">Inválidos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 4. Botón de Reset que aparece condicionalmente */}
      {isFiltered && (
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-primary">
          <RotateCcw className="h-4 w-4 mr-2" />
          Limpiar
        </Button>
      )}
    </div>
  );
};