import { apiRequest } from './api';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented';
  location: {
    address: string;
    city: string;
    province: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking?: number;
    garden?: boolean;
    pool?: boolean;
  };
  images: string[];
  realEstateId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyData {
  title: string;
  description: string;
  price: number;
  type: Property['type'];
  location: Property['location'];
  features: Property['features'];
  images?: string[];
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  status?: Property['status'];
}

export interface PropertyFilters {
  type?: Property['type'];
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  bedrooms?: number;
  bathrooms?: number;
  status?: Property['status'];
  page?: number;
  limit?: number;
}

export const propertyService = {
  // Obtener todas las propiedades con filtros opcionales
  getAll: async (filters?: PropertyFilters): Promise<Property[]> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const url = `/properties${params.toString() ? `?${params.toString()}` : ''}`;
    return apiRequest.get<Property[]>(url);
  },

  // Obtener una propiedad por ID
  getById: async (id: string): Promise<Property> => {
    return apiRequest.get<Property>(`/properties/${id}`);
  },

  // Crear nueva propiedad
  create: async (propertyData: CreatePropertyData): Promise<Property> => {
    return apiRequest.post<Property>('/properties', propertyData);
  },

  // Actualizar propiedad existente
  update: async (id: string, propertyData: UpdatePropertyData): Promise<Property> => {
    return apiRequest.put<Property>(`/properties/${id}`, propertyData);
  },

  // Eliminar propiedad
  delete: async (id: string): Promise<void> => {
    return apiRequest.delete(`/properties/${id}`);
  },

  // Subir imágenes de propiedad
  uploadImages: async (propertyId: string, files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    return apiRequest.post<string[]>(`/properties/${propertyId}/images`, formData);
  },

  // Obtener propiedades destacadas
  getFeatured: async (): Promise<Property[]> => {
    return apiRequest.get<Property[]>('/properties/featured');
  },

  // Obtener estadísticas de propiedades
  getStats: async (): Promise<{
    total: number;
    available: number;
    sold: number;
    rented: number;
    byType: Record<Property['type'], number>;
  }> => {
    return apiRequest.get('/properties/stats');
  },
};