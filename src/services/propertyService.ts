import apiRequest from './api';

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
    const response = await apiRequest.get<Property[]>(url);
    return response.data;
  },

  // Obtener una propiedad por ID
  getById: async (id: string): Promise<Property> => {
    const response = await apiRequest.get<Property>(`/properties/${id}`);
    return response.data;
  },

  // Crear una nueva propiedad
  create: async (propertyData: CreatePropertyData): Promise<Property> => {
    const response = await apiRequest.post<Property>('/properties', propertyData);
    return response.data;
  },

  // Actualizar propiedad existente
  update: async (id: string, propertyData: UpdatePropertyData): Promise<Property> => {
    const response = await apiRequest.put<Property>(`/properties/${id}`, propertyData);
    return response.data;
  },

  // Eliminar propiedad
  delete: async (id: string): Promise<void> => {
    await apiRequest.delete(`/properties/${id}`);
  },

  // Subir imágenes de propiedad
  uploadImages: async (propertyId: string, files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    const response = await apiRequest.post<string[]>(`/properties/${propertyId}/images`, formData);
    return response.data;
  },

  // Obtener propiedades destacadas
  getFeatured: async (): Promise<Property[]> => {
    const response = await apiRequest.get<Property[]>('/properties/featured');
    return response.data;
  },

  // Obtener estadísticas de propiedades
  getStats: async (): Promise<{
    available: number;
    sold: number;
    rented: number;
    byType: Record<Property['type'], number>;
  }> => {
    const response = await apiRequest.get<{
      available: number;
      sold: number;
      rented: number;
      byType: Record<Property['type'], number>;
    }>('/properties/stats');
    return response.data;
  },
};