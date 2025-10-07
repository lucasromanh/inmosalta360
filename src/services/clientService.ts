import { apiRequest } from './api';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferences?: {
    propertyType?: string[];
    minPrice?: number;
    maxPrice?: number;
    location?: string[];
  };
  interestedProperties: string[];
  status: 'active' | 'inactive' | 'lead';
  notes?: string;
  lastContact?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  preferences?: Client['preferences'];
  notes?: string;
}

export interface UpdateClientData extends Partial<CreateClientData> {
  status?: Client['status'];
  lastContact?: string;
}

export interface ClientFilters {
  status?: Client['status'];
  search?: string; // búsqueda por nombre o email
  page?: number;
  limit?: number;
}

export interface ClientInteraction {
  id: string;
  clientId: string;
  propertyId?: string;
  type: 'call' | 'email' | 'meeting' | 'visit' | 'other';
  description: string;
  date: string;
  createdBy: string;
}

export const clientService = {
  // Obtener todos los clientes con filtros opcionales
  getAll: async (filters?: ClientFilters): Promise<Client[]> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const url = `/clients${params.toString() ? `?${params.toString()}` : ''}`;
    return apiRequest.get<Client[]>(url);
  },

  // Obtener cliente por ID
  getById: async (id: string): Promise<Client> => {
    return apiRequest.get<Client>(`/clients/${id}`);
  },

  // Crear nuevo cliente
  create: async (clientData: CreateClientData): Promise<Client> => {
    return apiRequest.post<Client>('/clients', clientData);
  },

  // Actualizar cliente existente
  update: async (id: string, clientData: UpdateClientData): Promise<Client> => {
    return apiRequest.put<Client>(`/clients/${id}`, clientData);
  },

  // Eliminar cliente
  delete: async (id: string): Promise<void> => {
    return apiRequest.delete(`/clients/${id}`);
  },

  // Agregar propiedad a intereses del cliente
  addInterest: async (clientId: string, propertyId: string): Promise<Client> => {
    return apiRequest.post<Client>(`/clients/${clientId}/interests`, { propertyId });
  },

  // Quitar propiedad de intereses del cliente
  removeInterest: async (clientId: string, propertyId: string): Promise<Client> => {
    return apiRequest.delete<Client>(`/clients/${clientId}/interests/${propertyId}`);
  },

  // Obtener interacciones de un cliente
  getInteractions: async (clientId: string): Promise<ClientInteraction[]> => {
    return apiRequest.get<ClientInteraction[]>(`/clients/${clientId}/interactions`);
  },

  // Agregar nueva interacción
  addInteraction: async (
    clientId: string,
    interaction: Omit<ClientInteraction, 'id' | 'clientId' | 'createdBy'>
  ): Promise<ClientInteraction> => {
    return apiRequest.post<ClientInteraction>(`/clients/${clientId}/interactions`, interaction);
  },

  // Obtener estadísticas de clientes
  getStats: async (): Promise<{
    total: number;
    active: number;
    inactive: number;
    leads: number;
    newThisMonth: number;
  }> => {
    return apiRequest.get('/clients/stats');
  },

  // Buscar clientes por criterios
  search: async (query: string): Promise<Client[]> => {
    return apiRequest.get<Client[]>(`/clients/search?q=${encodeURIComponent(query)}`);
  },

  // Exportar lista de clientes
  export: async (filters?: ClientFilters): Promise<Blob> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    const url = `/clients/export${params.toString() ? `?${params.toString()}` : ''}`;
    return apiRequest.get(url);
  },
};