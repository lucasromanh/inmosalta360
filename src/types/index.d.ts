// Tipos globales para la aplicación InmoSalta360

// Tipos de usuario
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  phone?: string;
  address?: string;
  isVerified: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos de autenticación
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

// Tipos de ubicación
export interface Location {
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Tipos de respuesta de API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Tipos de notificación
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

// Tipos de filtros comunes
export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Tipos de archivos
export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

// Tipos de tema y UI
export interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: ThemeConfig;
  loading: boolean;
  notifications: Notification[];
}

// Enum para roles
export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
  USER = 'user',
}

// Enum para status
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ARCHIVED = 'archived',
}

// Tipos de eventos
export interface AppEvent {
  type: string;
  payload?: any;
  timestamp: Date;
}

// Tipos para formularios
export interface FormFieldError {
  field: string;
  message: string;
}

export interface FormState<T = any> {
  values: T;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Tipos para tablas
export interface TableColumn<T = any> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface TableState<T = any> {
  data: T[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  sorter?: {
    field: keyof T;
    order: 'asc' | 'desc';
  };
  filters?: Record<keyof T, any>;
}

// Tipos de configuración
export interface AppConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    maps: boolean;
    notifications: boolean;
    analytics: boolean;
  };
  limits: {
    maxFileSize: number;
    maxImagesPerProperty: number;
  };
}