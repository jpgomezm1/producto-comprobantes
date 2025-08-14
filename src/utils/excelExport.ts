import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from 'date-fns';

import { Comprobante } from '@/types';

export interface ExcelExportOptions {
  dateRange?: DateRange;
  filename?: string;
}

export const exportToExcel = (
  comprobantes: Comprobante[], 
  options: ExcelExportOptions = {}
) => {
  try {
    // Filtrar por rango de fechas si se proporciona
    let filteredComprobantes = comprobantes;
    
    if (options.dateRange?.from) {
      filteredComprobantes = comprobantes.filter(comprobante => {
        try {
          const comprobanteDate = parseISO(comprobante.fecha);
          const endInterval = options.dateRange!.to || options.dateRange!.from!;
          return isWithinInterval(comprobanteDate, {
            start: options.dateRange!.from!,
            end: endInterval
          });
        } catch (error) {
          console.error("Formato de fecha inválido:", comprobante);
          return false;
        }
      });
    }

    // Preparar datos para Excel
    const excelData = filteredComprobantes.map((comprobante, index) => ({
      '#': index + 1,
      'Beneficiario': comprobante.beneficiario || 'N/A',
      'Banco Emisor': comprobante.banco_emisor || 'N/A',
      'Fecha': comprobante.fecha ? format(parseISO(comprobante.fecha), 'dd/MM/yyyy', { locale: es }) : 'N/A',
      'Hora': comprobante.hora || 'N/A',
      'Valor Transferencia': Number(comprobante.valor_transferencia).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP'
      }),
      'Valor Numérico': Number(comprobante.valor_transferencia),
      'Número Comprobante': comprobante.numero_comprobante || 'N/A',
      'Número Referencia': comprobante.numero_referencia || 'N/A',
      'Estado': comprobante.es_valido ? 'Válido' : 'Inválido',
      'Moneda': comprobante.moneda || 'COP',
      'Usuario ID': comprobante.user_id || 'N/A',
      'Fecha Creación': comprobante.created_at ? format(parseISO(comprobante.created_at), 'dd/MM/yyyy HH:mm', { locale: es }) : 'N/A'
    }));

    // Crear workbook
    const wb = XLSX.utils.book_new();
    
    // Crear worksheet principal con los datos
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Configurar anchos de columnas
    const colWidths = [
      { wch: 5 },   // #
      { wch: 25 },  // Beneficiario
      { wch: 20 },  // Banco Emisor
      { wch: 12 },  // Fecha
      { wch: 10 },  // Hora
      { wch: 18 },  // Valor Transferencia
      { wch: 15 },  // Valor Numérico
      { wch: 20 },  // Número Comprobante
      { wch: 20 },  // Número Referencia
      { wch: 10 },  // Estado
      { wch: 8 },   // Moneda
      { wch: 15 },  // Usuario ID
      { wch: 18 }   // Fecha Creación
    ];
    ws['!cols'] = colWidths;

    // Agregar la hoja de datos
    XLSX.utils.book_append_sheet(wb, ws, 'Comprobantes');

    // Crear hoja de resumen
    const validComprobantes = filteredComprobantes.filter(c => c.es_valido);
    const invalidComprobantes = filteredComprobantes.filter(c => !c.es_valido);
    const totalValue = validComprobantes.reduce((sum, c) => sum + Number(c.valor_transferencia), 0);

    const summaryData = [
      { 'Métrica': 'Total de Comprobantes', 'Valor': filteredComprobantes.length },
      { 'Métrica': 'Comprobantes Válidos', 'Valor': validComprobantes.length },
      { 'Métrica': 'Comprobantes Inválidos', 'Valor': invalidComprobantes.length },
      { 'Métrica': 'Valor Total Válido', 'Valor': totalValue.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) },
      { 'Métrica': 'Fecha de Exportación', 'Valor': format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es }) },
      { 'Métrica': 'Rango de Fechas', 'Valor': options.dateRange?.from 
        ? `${format(options.dateRange.from, 'dd/MM/yyyy', { locale: es })} - ${format(options.dateRange.to || options.dateRange.from, 'dd/MM/yyyy', { locale: es })}`
        : 'Todos los registros'
      }
    ];

    const summaryWs = XLSX.utils.json_to_sheet(summaryData);
    summaryWs['!cols'] = [{ wch: 25 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumen');

    // Generar nombre del archivo
    const defaultFilename = `comprobantes_${format(new Date(), 'yyyy-MM-dd_HHmm', { locale: es })}.xlsx`;
    const filename = options.filename || defaultFilename;

    // Descargar archivo
    XLSX.writeFile(wb, filename);

    return {
      success: true,
      filename,
      recordsExported: filteredComprobantes.length,
      totalValue: totalValue
    };

  } catch (error) {
    console.error('Error al exportar Excel:', error);
    throw new Error('Error al generar el archivo Excel');
  }
};

// Función para exportar solo comprobantes válidos
export const exportValidComprobantesToExcel = (
  comprobantes: Comprobante[], 
  options: ExcelExportOptions = {}
) => {
  const validComprobantes = comprobantes.filter(c => c.es_valido);
  return exportToExcel(validComprobantes, {
    ...options,
    filename: options.filename || `comprobantes_validos_${format(new Date(), 'yyyy-MM-dd_HHmm', { locale: es })}.xlsx`
  });
};