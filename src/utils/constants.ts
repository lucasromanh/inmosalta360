// Constantes de configuración para InmoSalta360

// URLs de la API
export const API_ENDPOINTS = {
  AUTH: '/auth',
  PROPERTIES: '/properties',
  CLIENTS: '/clients',
  USERS: '/users',
  UPLOADS: '/uploads',
  STATS: '/stats',
  NOTIFICATIONS: '/notifications',
} as const;

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'InmoSalta360',
  VERSION: '1.0.0',
  DESCRIPTION: 'Plataforma inmobiliaria digital para Salta',
  AUTHOR: 'InmoSalta360 Team',
} as const;

// Límites y validaciones
export const LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_IMAGES_PER_PROPERTY: 20,
  MAX_PROPERTY_TITLE_LENGTH: 100,
  MAX_PROPERTY_DESCRIPTION_LENGTH: 2000,
  MIN_PRICE: 1000,
  MAX_PRICE: 999999999,
  MIN_AREA: 1,
  MAX_AREA: 10000,
} as const;

// Tipos de propiedad
export const PROPERTY_TYPES = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  COMMERCIAL: 'commercial',
  LAND: 'land',
  OFFICE: 'office',
  WAREHOUSE: 'warehouse',
} as const;

// Labels para tipos de propiedad
export const PROPERTY_TYPE_LABELS = {
  [PROPERTY_TYPES.HOUSE]: 'Casa',
  [PROPERTY_TYPES.APARTMENT]: 'Departamento',
  [PROPERTY_TYPES.COMMERCIAL]: 'Local Comercial',
  [PROPERTY_TYPES.LAND]: 'Terreno',
  [PROPERTY_TYPES.OFFICE]: 'Oficina',
  [PROPERTY_TYPES.WAREHOUSE]: 'Galpón',
} as const;

// Estados de propiedad
export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  RENTED: 'rented',
  RESERVED: 'reserved',
  INACTIVE: 'inactive',
} as const;

// Labels para estados de propiedad
export const PROPERTY_STATUS_LABELS = {
  [PROPERTY_STATUS.AVAILABLE]: 'Disponible',
  [PROPERTY_STATUS.SOLD]: 'Vendida',
  [PROPERTY_STATUS.RENTED]: 'Alquilada',
  [PROPERTY_STATUS.RESERVED]: 'Reservada',
  [PROPERTY_STATUS.INACTIVE]: 'Inactiva',
} as const;

// Colores para estados de propiedad
export const PROPERTY_STATUS_COLORS = {
  [PROPERTY_STATUS.AVAILABLE]: 'green',
  [PROPERTY_STATUS.SOLD]: 'blue',
  [PROPERTY_STATUS.RENTED]: 'purple',
  [PROPERTY_STATUS.RESERVED]: 'orange',
  [PROPERTY_STATUS.INACTIVE]: 'gray',
} as const;

// Tipos de transacción
export const TRANSACTION_TYPES = {
  SALE: 'sale',
  RENT: 'rent',
} as const;

// Labels para tipos de transacción
export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.SALE]: 'Venta',
  [TRANSACTION_TYPES.RENT]: 'Alquiler',
} as const;

// Monedas
export const CURRENCIES = {
  ARS: 'ARS',
  USD: 'USD',
  EUR: 'EUR',
} as const;

// Labels para monedas
export const CURRENCY_LABELS = {
  [CURRENCIES.ARS]: 'Peso Argentino',
  [CURRENCIES.USD]: 'Dólar Estadounidense',
  [CURRENCIES.EUR]: 'Euro',
} as const;

// Símbolos de monedas
export const CURRENCY_SYMBOLS = {
  [CURRENCIES.ARS]: '$',
  [CURRENCIES.USD]: 'US$',
  [CURRENCIES.EUR]: '€',
} as const;

// Provincias de Argentina
export const PROVINCES = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
  'Ciudad Autónoma de Buenos Aires',
] as const;

// Ciudades de Salta
export const SALTA_CITIES = [
  'Salta Capital',
  'San Ramón de la Nueva Orán',
  'Tartagal',
  'Cafayate',
  'Metán',
  'Güemes',
  'Rosario de Lerma',
  'Embarcación',
  'Cerrillos',
  'El Carmen',
] as const;

// Barrios de Salta Capital
export const SALTA_NEIGHBORHOODS = [
  'Centro',
  'Tres Cerritos',
  'Villa Las Rosas',
  'Grand Bourg',
  'Castañares',
  'Villa Soledad',
  'Norte Grande',
  'San José',
  'Limache',
  'Villa Mitre',
  'Nicolás Avellaneda',
  'República del Líbano',
  'Ciudad del Milagro',
  'Villa San Antonio',
  'Intersindical',
] as const;

// Roles de usuario
export const USER_ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  USER: 'user',
} as const;

// Labels para roles
export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrador',
  [USER_ROLES.AGENT]: 'Agente',
  [USER_ROLES.USER]: 'Usuario',
} as const;

// Estados de cliente
export const CLIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  LEAD: 'lead',
} as const;

// Labels para estados de cliente
export const CLIENT_STATUS_LABELS = {
  [CLIENT_STATUS.ACTIVE]: 'Activo',
  [CLIENT_STATUS.INACTIVE]: 'Inactivo',
  [CLIENT_STATUS.LEAD]: 'Prospecto',
} as const;

// Tipos de notificación
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
} as const;

// Breakpoints para responsive design
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Rutas de la aplicación
export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  PROPERTIES: '/propiedades',
  PROPERTY_DETAIL: '/propiedades/:id',
  MAP: '/mapa',
  ABOUT: '/nosotros',
  CONTACT: '/contacto',
  
  // Rutas de autenticación
  LOGIN: '/login',
  REGISTER: '/registro',
  FORGOT_PASSWORD: '/recuperar-password',
  
  // Rutas privadas (panel admin)
  DASHBOARD: '/panel',
  ADMIN_PROPERTIES: '/panel/propiedades',
  ADD_PROPERTY: '/panel/propiedades/nueva',
  EDIT_PROPERTY: '/panel/propiedades/:id/editar',
  CLIENTS: '/panel/clientes',
  REPORTS: '/panel/reportes',
  PROFILE: '/panel/perfil',
  SETTINGS: '/panel/configuracion',
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es requerido',
  INVALID_EMAIL: 'Ingresa un email válido',
  PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 8 caracteres',
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
  INVALID_PHONE: 'Ingresa un número de teléfono válido',
  FILE_TOO_LARGE: 'El archivo es demasiado grande',
  INVALID_FILE_TYPE: 'Tipo de archivo no permitido',
  NETWORK_ERROR: 'Error de conexión. Intenta nuevamente.',
  SERVER_ERROR: 'Error del servidor. Intenta más tarde.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  PROPERTY_CREATED: 'Propiedad creada exitosamente',
  PROPERTY_UPDATED: 'Propiedad actualizada exitosamente',
  PROPERTY_DELETED: 'Propiedad eliminada exitosamente',
  CLIENT_CREATED: 'Cliente creado exitosamente',
  CLIENT_UPDATED: 'Cliente actualizado exitosamente',
  CLIENT_DELETED: 'Cliente eliminado exitosamente',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente',
  EMAIL_SENT: 'Email enviado exitosamente',
} as const;