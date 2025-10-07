import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';

// Datos de ejemplo
const mockProperties = [
  {
    id: 1,
    title: 'Casa en Barrio Norte',
    price: 450000,
    location: 'Salta Capital',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
    type: 'Casa'
  },
  {
    id: 2,
    title: 'Departamento Céntrico',
    price: 280000,
    location: 'Centro, Salta',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    type: 'Departamento'
  },
  {
    id: 3,
    title: 'Casa Quinta en San Lorenzo',
    price: 650000,
    location: 'San Lorenzo',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
    type: 'Casa Quinta'
  }
];

const AdminPropertyList: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Propiedades</h1>
            <p className="text-gray-600">Gestiona todas las propiedades disponibles</p>
          </div>
          <div className="flex space-x-3">
            <Link 
              to="/admin/propiedades/nueva" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ➕ Nueva Propiedad
            </Link>
            <Link 
              to="/mapa" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              🗺️ Ver en Mapa
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {property.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{property.location}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{property.bedrooms} hab.</span>
                  <span>{property.bathrooms} baños</span>
                  <span>{property.area} m²</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${property.price.toLocaleString()}
                  </span>
                  <div className="flex space-x-2">
                    <Link 
                      to={`/propiedad/${property.id}`}
                      className="bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 text-sm"
                    >
                      👁️ Ver
                    </Link>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm">
                      ✏️ Editar
                    </button>
                    <button className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">¿Necesitas más funciones?</p>
          <Link 
            to="/admin/reportes" 
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
          >
            📊 Ver Reportes
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyList;