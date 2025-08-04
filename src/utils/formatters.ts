export const formatCurrency = (amount: number, currency: string = 'COP'): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatTime = (timeString: string): string => {
  if (!timeString) return '';
  return timeString.substring(0, 5); // HH:MM
};

export const parseNumber = (value: string): number => {
  // Remover todo excepto dígitos y punto decimal
  const cleanValue = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleanValue) || 0;
};

export const formatNumberInput = (value: string): string => {
  const num = parseNumber(value);
  if (isNaN(num)) return '';
  return num.toLocaleString('es-CO');
};

export const getBancoColor = (banco: string): string => {
  const colors: Record<string, string> = {
    'Nequi': 'bg-purple-100 text-purple-800',
    'Bancolombia': 'bg-yellow-100 text-yellow-800',
    'BBVA': 'bg-blue-100 text-blue-800',
    'Davivienda': 'bg-red-100 text-red-800',
    'Banco de Bogotá': 'bg-blue-100 text-blue-800',
    'Banco Popular': 'bg-orange-100 text-orange-800',
    'Colpatria': 'bg-red-100 text-red-800',
  };
  return colors[banco] || 'bg-gray-100 text-gray-800';
};

export const getEstadoColor = (esValido: boolean): string => {
  return esValido 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';
};

export const truncateText = (text: string, maxLength: number = 30): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};