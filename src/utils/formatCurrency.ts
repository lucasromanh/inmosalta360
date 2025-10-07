/**
 * Formatea un número como moneda
 * @param amount - El monto a formatear
 * @param currency - El código de moneda (default: 'ARS')
 * @param locale - La configuración regional (default: 'es-AR')
 * @returns String formateado como moneda
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'ARS',
  locale: string = 'es-AR'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback en caso de error
    return `$${amount.toLocaleString()}`;
  }
};

/**
 * Formatea un número como moneda sin símbolo
 * @param amount - El monto a formatear
 * @param locale - La configuración regional (default: 'es-AR')
 * @returns String formateado sin símbolo de moneda
 */
export const formatNumber = (
  amount: number,
  locale: string = 'es-AR'
): string => {
  try {
    return new Intl.NumberFormat(locale).format(amount);
  } catch (error) {
    return amount.toLocaleString();
  }
};

/**
 * Formatea un precio con USD como alternativa
 * @param amount - El monto en pesos argentinos
 * @param usdRate - La tasa de cambio USD (opcional)
 * @returns String con precio en ARS y USD
 */
export const formatPriceWithUSD = (
  amount: number,
  usdRate?: number
): string => {
  const arsPrice = formatCurrency(amount, 'ARS');
  
  if (usdRate && usdRate > 0) {
    const usdAmount = amount / usdRate;
    const usdPrice = formatCurrency(usdAmount, 'USD', 'en-US');
    return `${arsPrice} (${usdPrice})`;
  }
  
  return arsPrice;
};

/**
 * Abrevía números grandes (K, M, B)
 * @param amount - El número a abreviar
 * @returns String abreviado
 */
export const abbreviateNumber = (amount: number): string => {
  if (amount >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};

/**
 * Convierte string a número removiendo formato de moneda
 * @param currencyString - String con formato de moneda
 * @returns Número parseado
 */
export const parseCurrency = (currencyString: string): number => {
  // Remover símbolos de moneda y espacios
  const cleanString = currencyString.replace(/[^\d,.-]/g, '');
  
  // Reemplazar coma por punto para decimales
  const normalizedString = cleanString.replace(',', '.');
  
  return parseFloat(normalizedString) || 0;
};

/**
 * Formatea un precio por metro cuadrado
 * @param totalPrice - Precio total de la propiedad
 * @param area - Área en metros cuadrados
 * @param currency - Código de moneda
 * @returns String formateado del precio por m²
 */
export const formatPricePerSquareMeter = (
  totalPrice: number,
  area: number,
  currency: string = 'ARS'
): string => {
  if (area <= 0) return 'N/A';
  
  const pricePerSqm = totalPrice / area;
  return `${formatCurrency(pricePerSqm, currency)}/m²`;
};

/**
 * Calcula el porcentaje de diferencia entre dos precios
 * @param originalPrice - Precio original
 * @param currentPrice - Precio actual
 * @returns Objeto con porcentaje y dirección del cambio
 */
export const calculatePriceChange = (
  originalPrice: number,
  currentPrice: number
): {
  percentage: number;
  direction: 'up' | 'down' | 'same';
  formatted: string;
} => {
  if (originalPrice === 0) {
    return { percentage: 0, direction: 'same', formatted: '0%' };
  }
  
  const percentage = ((currentPrice - originalPrice) / originalPrice) * 100;
  let direction: 'up' | 'down' | 'same' = 'same';
  
  if (percentage > 0) direction = 'up';
  if (percentage < 0) direction = 'down';
  
  return {
    percentage: Math.abs(percentage),
    direction,
    formatted: `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`,
  };
};