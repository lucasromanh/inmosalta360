/**
 * Formatea una fecha en formato legible en español
 * @param date - Fecha a formatear (Date, string o timestamp)
 * @param options - Opciones de formateo
 * @returns String con fecha formateada
 */
export const formatDate = (
  date: Date | string | number,
  options: {
    includeTime?: boolean;
    format?: 'short' | 'medium' | 'long' | 'full';
    relative?: boolean;
  } = {}
): string => {
  const {
    includeTime = false,
    format = 'medium',
    relative = false
  } = options;

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Fecha inválida';
  }

  if (relative) {
    return formatRelativeDate(dateObj);
  }

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'numeric' : format === 'medium' ? 'short' : 'long',
    day: 'numeric',
  };

  if (includeTime) {
    formatOptions.hour = '2-digit';
    formatOptions.minute = '2-digit';
  }

  try {
    return dateObj.toLocaleDateString('es-AR', formatOptions);
  } catch (error) {
    // Fallback
    return dateObj.toLocaleDateString();
  }
};

/**
 * Formatea fecha de forma relativa (hace 2 horas, ayer, etc.)
 * @param date - Fecha a formatear
 * @returns String con fecha relativa
 */
export const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Hace unos segundos';
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
  }
  
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) return 'Ayer';
    return `Hace ${days} días`;
  }
  
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `Hace ${weeks} semana${weeks !== 1 ? 's' : ''}`;
  }
  
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `Hace ${months} mes${months !== 1 ? 'es' : ''}`;
  }
  
  const years = Math.floor(diffInSeconds / 31536000);
  return `Hace ${years} año${years !== 1 ? 's' : ''}`;
};

/**
 * Formatea solo la hora
 * @param date - Fecha de la cual extraer la hora
 * @param format24 - Si usar formato 24 horas (default: true)
 * @returns String con hora formateada
 */
export const formatTime = (
  date: Date | string | number,
  format24: boolean = true
): string => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Hora inválida';
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: !format24,
  };

  return dateObj.toLocaleTimeString('es-AR', options);
};

/**
 * Obtiene el nombre del mes en español
 * @param monthIndex - Índice del mes (0-11)
 * @param format - Formato del mes
 * @returns Nombre del mes
 */
export const getMonthName = (
  monthIndex: number,
  format: 'short' | 'long' = 'long'
): string => {
  const months = {
    long: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    short: [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]
  };

  return months[format][monthIndex] || 'Mes inválido';
};

/**
 * Obtiene el nombre del día de la semana en español
 * @param dayIndex - Índice del día (0 = Domingo, 6 = Sábado)
 * @param format - Formato del día
 * @returns Nombre del día
 */
export const getDayName = (
  dayIndex: number,
  format: 'short' | 'long' = 'long'
): string => {
  const days = {
    long: [
      'Domingo', 'Lunes', 'Martes', 'Miércoles',
      'Jueves', 'Viernes', 'Sábado'
    ],
    short: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  };

  return days[format][dayIndex] || 'Día inválido';
};

/**
 * Verifica si una fecha es de hoy
 * @param date - Fecha a verificar
 * @returns Boolean indicando si es hoy
 */
export const isToday = (date: Date | string | number): boolean => {
  const today = new Date();
  const dateObj = new Date(date);
  
  return today.toDateString() === dateObj.toDateString();
};

/**
 * Verifica si una fecha es de ayer
 * @param date - Fecha a verificar
 * @returns Boolean indicando si es ayer
 */
export const isYesterday = (date: Date | string | number): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateObj = new Date(date);
  
  return yesterday.toDateString() === dateObj.toDateString();
};

/**
 * Calcula la diferencia en días entre dos fechas
 * @param startDate - Fecha inicial
 * @param endDate - Fecha final (default: hoy)
 * @returns Número de días de diferencia
 */
export const daysBetween = (
  startDate: Date | string,
  endDate: Date | string = new Date()
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Formatea un rango de fechas
 * @param startDate - Fecha de inicio
 * @param endDate - Fecha de fin
 * @returns String con rango de fechas formateado
 */
export const formatDateRange = (
  startDate: Date | string,
  endDate: Date | string
): string => {
  const start = formatDate(startDate, { format: 'short' });
  const end = formatDate(endDate, { format: 'short' });
  
  return `${start} - ${end}`;
};