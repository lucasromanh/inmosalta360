import React from 'react';

const Clients: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Lista de Clientes</h2>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Agregar Cliente
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Nombre</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Teléfono</th>
                    <th className="text-left py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí irán los clientes */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;