import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'lead';
  lastContact: string;
  interestedProperties: number;
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState<{
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive' | 'lead';
  }>({
    name: '',
    email: '',
    phone: '',
    status: 'lead'
  });

  // Mock data para clientes
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+54 387 123-4567',
      status: 'active',
      lastContact: '2025-01-05',
      interestedProperties: 3
    },
    {
      id: '2',
      name: 'Juan Carlos Pérez',
      email: 'jc.perez@email.com',
      phone: '+54 387 234-5678',
      status: 'lead',
      lastContact: '2025-01-03',
      interestedProperties: 1
    },
    {
      id: '3',
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+54 387 345-6789',
      status: 'active',
      lastContact: '2025-01-07',
      interestedProperties: 2
    },
    {
      id: '4',
      name: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      phone: '+54 387 456-7890',
      status: 'inactive',
      lastContact: '2024-12-15',
      interestedProperties: 0
    }
  ];

  useEffect(() => {
    // Cargar clientes del localStorage o usar datos mock
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      setClients(mockClients);
      localStorage.setItem('clients', JSON.stringify(mockClients));
    }
  }, []);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      lastContact: new Date().toISOString().split('T')[0],
      interestedProperties: 0
    };
    
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    
    setNewClient({ name: '', email: '', phone: '', status: 'lead' });
    setShowAddModal(false);
  };

  const handleDeleteClient = (clientId: string) => {
    const updatedClients = clients.filter(client => client.id !== clientId);
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'lead': return 'Prospecto';
      case 'inactive': return 'Inactivo';
      default: return status;
    }
  };

  return (
    <AdminLayout title="Gestión de Clientes" subtitle="CRM - Sistema de Clientes">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg sm:shadow-xl border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-base sm:text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Clientes</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{clients.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg sm:shadow-xl border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-base sm:text-xl">✅</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Clientes Activos</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{clients.filter(c => c.status === 'active').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg sm:shadow-xl border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-base sm:text-xl">🎯</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Prospectos</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{clients.filter(c => c.status === 'lead').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg sm:shadow-xl border border-gray-100">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-base sm:text-xl">📊</span>
                  </div>
                </div>
                <div className="ml-3 sm:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Interacciones</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{clients.reduce((sum, c) => sum + c.interestedProperties, 0)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Lista de Clientes</h2>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>+</span>
                <span className="hidden sm:inline">Agregar Cliente</span>
                <span className="sm:hidden">Agregar</span>
              </button>
            </div>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Nombre</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Email</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Teléfono</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Estado</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Último Contacto</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Propiedades</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{client.name}</td>
                    <td className="py-4 px-6 text-gray-600">{client.email}</td>
                    <td className="py-4 px-6 text-gray-600">{client.phone}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                        {getStatusText(client.status)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{client.lastContact}</td>
                    <td className="py-4 px-6">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                        {client.interestedProperties}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {clients.map((client) => (
              <div key={client.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{client.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                        {getStatusText(client.status)}
                      </span>
                      <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                        {client.interestedProperties} propiedades
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-6">📧</span>
                    <span className="ml-2">{client.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-6">📞</span>
                    <span className="ml-2">{client.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-6">📅</span>
                    <span className="ml-2">Último contacto: {client.lastContact}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteClient(client.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Agregar Cliente */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Agregar Nuevo Cliente</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={newClient.status}
                  onChange={(e) => setNewClient({...newClient, status: e.target.value as 'active' | 'inactive' | 'lead'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lead">Prospecto</option>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Agregar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Clients;