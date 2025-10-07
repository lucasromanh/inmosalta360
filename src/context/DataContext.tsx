import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: 'available' | 'sold' | 'rented';
  images: string[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  createdAt: string;
  updatedAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedProperties: string[];
  createdAt: string;
}

interface DataState {
  properties: Property[];
  clients: Client[];
  loading: boolean;
  error: string | null;
}

interface DataContextType extends DataState {
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  fetchProperties: () => Promise<void>;
  fetchClients: () => Promise<void>;
}

const initialState: DataState = {
  properties: [],
  clients: [],
  loading: false,
  error: null,
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [state, setState] = useState<DataState>(initialState);

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      properties: [...prev.properties, newProperty],
    }));
  };

  const updateProperty = (id: string, propertyData: Partial<Property>) => {
    setState(prev => ({
      ...prev,
      properties: prev.properties.map(property =>
        property.id === id
          ? { ...property, ...propertyData, updatedAt: new Date().toISOString() }
          : property
      ),
    }));
  };

  const deleteProperty = (id: string) => {
    setState(prev => ({
      ...prev,
      properties: prev.properties.filter(property => property.id !== id),
    }));
  };

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      clients: [...prev.clients, newClient],
    }));
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setState(prev => ({
      ...prev,
      clients: prev.clients.map(client =>
        client.id === id ? { ...client, ...clientData } : client
      ),
    }));
  };

  const deleteClient = (id: string) => {
    setState(prev => ({
      ...prev,
      clients: prev.clients.filter(client => client.id !== id),
    }));
  };

  const fetchProperties = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Aquí irá la llamada a la API
      // const properties = await propertyService.getAll();
      // setState(prev => ({ ...prev, properties, loading: false }));
      
      // Simulación por ahora
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
      }, 1000);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error fetching properties',
      }));
    }
  };

  const fetchClients = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Aquí irá la llamada a la API
      // const clients = await clientService.getAll();
      // setState(prev => ({ ...prev, clients, loading: false }));
      
      // Simulación por ahora
      setTimeout(() => {
        setState(prev => ({ ...prev, loading: false }));
      }, 1000);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error fetching clients',
      }));
    }
  };

  const value: DataContextType = {
    ...state,
    addProperty,
    updateProperty,
    deleteProperty,
    addClient,
    updateClient,
    deleteClient,
    fetchProperties,
    fetchClients,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};