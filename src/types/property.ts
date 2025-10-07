// Tipos específicos para propiedades inmobiliarias

export type PropertyType = 'house' | 'apartment' | 'commercial' | 'land' | 'office' | 'warehouse';
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'reserved' | 'inactive';
export type TransactionType = 'sale' | 'rent';

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  area: number; // en metros cuadrados
  coveredArea?: number;
  lotSize?: number;
  parking?: number;
  garage?: boolean;
  garden?: boolean;
  pool?: boolean;
  gym?: boolean;
  elevator?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  storage?: boolean;
  furnished?: boolean;
  airConditioning?: boolean;
  heating?: boolean;
  security?: boolean;
  yearBuilt?: number;
  floors?: number;
  floor?: number; // piso en el que está ubicado
}

export interface PropertyLocation {
  address: string;
  neighborhood?: string;
  city: string;
  province: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: {
    schools?: string[];
    hospitals?: string[];
    shopping?: string[];
    transport?: string[];
  };
}

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  isMain?: boolean;
  order: number;
}

export interface PropertyPrice {
  amount: number;
  currency: string;
  type: TransactionType;
  expenses?: number; // expensas para departamentos
  includesExpenses?: boolean;
  negotiable?: boolean;
  priceHistory?: {
    amount: number;
    date: string;
    reason?: string;
  }[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: PropertyPrice;
  location: PropertyLocation;
  features: PropertyFeatures;
  images: PropertyImage[];
  
  // Información de la inmobiliaria
  realEstateId: string;
  agentId?: string;
  
  // SEO y marketing
  slug?: string;
  tags?: string[];
  featured?: boolean;
  highlights?: string[];
  
  // Fechas
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  
  // Estadísticas
  views?: number;
  favorites?: number;
  inquiries?: number;
  
  // Información adicional
  notes?: string;
  documents?: {
    title: string;
    url: string;
    type: string;
  }[];
  
  // Tours virtuales
  virtualTour?: {
    url: string;
    type: '360' | 'video' | 'matterport';
  };
}

export interface CreatePropertyData {
  title: string;
  description: string;
  type: PropertyType;
  price: Omit<PropertyPrice, 'priceHistory'>;
  location: PropertyLocation;
  features: PropertyFeatures;
  tags?: string[];
  highlights?: string[];
  notes?: string;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  status?: PropertyStatus;
  featured?: boolean;
}

export interface PropertyFilters {
  type?: PropertyType | PropertyType[];
  status?: PropertyStatus | PropertyStatus[];
  transactionType?: TransactionType;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  neighborhood?: string;
  province?: string;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  features?: Partial<PropertyFeatures>;
  featured?: boolean;
  tags?: string[];
  
  // Filtros de ubicación
  coordinates?: {
    lat: number;
    lng: number;
    radius: number; // en kilómetros
  };
  
  // Filtros de ordenamiento
  sortBy?: 'price' | 'area' | 'created' | 'updated' | 'views';
  sortOrder?: 'asc' | 'desc';
  
  // Paginación
  page?: number;
  limit?: number;
}

export interface PropertyStats {
  total: number;
  byStatus: Record<PropertyStatus, number>;
  byType: Record<PropertyType, number>;
  byTransactionType: Record<TransactionType, number>;
  averagePrice: {
    sale: number;
    rent: number;
  };
  averageArea: number;
  totalViews: number;
  totalInquiries: number;
}

export interface PropertyInquiry {
  id: string;
  propertyId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface PropertyComparison {
  properties: Property[];
  criteria: (keyof PropertyFeatures)[];
}