import apiRequest from './api';

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
    const response = await apiRequest.get<Client[]>(url);
    return response.data;
  },

  // Obtener cliente por ID
  getById: async (id: string): Promise<Client> => {
    const response = await apiRequest.get<Client>(`/clients/${id}`);
    return response.data;
  },

  // Crear nuevo cliente
  create: async (clientData: CreateClientData): Promise<Client> => {
    const response = await apiRequest.post<Client>('/clients', clientData);
    return response.data;
  },

  // Actualizar cliente existente
  update: async (id: string, clientData: UpdateClientData): Promise<Client> => {
    const response = await apiRequest.put<Client>(`/clients/${id}`, clientData);
    return response.data;
  },

  // Eliminar cliente
  delete: async (id: string): Promise<void> => {
    await apiRequest.delete(`/clients/${id}`);
  },

  // Agregar propiedad a intereses del cliente
  addInterest: async (clientId: string, propertyId: string): Promise<Client> => {
    const response = await apiRequest.post<Client>(`/clients/${clientId}/interests`, { propertyId });
    return response.data;
  },

  // Quitar propiedad de intereses del cliente
  removeInterest: async (clientId: string, propertyId: string): Promise<Client> => {
    const response = await apiRequest.delete<Client>(`/clients/${clientId}/interests/${propertyId}`);
    return response.data;
  },

  // Obtener interacciones de un cliente
  getInteractions: async (clientId: string): Promise<ClientInteraction[]> => {
    const response = await apiRequest.get<ClientInteraction[]>(`/clients/${clientId}/interactions`);
    return response.data;
  },

  // Agregar nueva interacción
  addInteraction: async (
    clientId: string,
    interaction: Omit<ClientInteraction, 'id' | 'clientId' | 'createdBy'>
  ): Promise<ClientInteraction> => {
    const response = await apiRequest.post<ClientInteraction>(`/clients/${clientId}/interactions`, interaction);
    return response.data;
  },

  // Obtener estadísticas de clientes
  getStats: async (): Promise<{
    total: number;
    active: number;
    inactive: number;
    leads: number;
    newThisMonth: number;
  }> => {
    const response = await apiRequest.get('/clients/stats');
    return response.data;
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
    const response = await apiRequest.get(url, { responseType: 'blob' });
    return response.data;
  },
};