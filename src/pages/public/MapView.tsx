import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data para propiedades con ubicaciones en Salta
const mockPropertiesWithLocations = [
  {
    id: 1,
    title: 'Casa en Barrio Norte',
    price: 450000,
    location: 'Barrio Norte, Salta',
    lat: -24.7821,
    lng: -65.4232,
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
    lat: -24.7859,
    lng: -65.4117,
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
    location: 'San Lorenzo, Salta',
    lat: -24.7534,
    lng: -65.4889,
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
    type: 'Casa Quinta'
  },
  {
    id: 4,
    title: 'Casa en Tres Cerritos',
    price: 520000,
    location: 'Tres Cerritos, Salta',
    lat: -24.7956,
    lng: -65.3945,
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400',
    type: 'Casa'
  },
  {
    id: 5,
    title: 'Duplex en Limache',
    price: 380000,
    location: 'Limache, Salta',
    lat: -24.8123,
    lng: -65.4456,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
    type: 'Duplex'
  }
];

const MapView: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all'
  });

  // Filtrar propiedades según filtros seleccionados
  const filteredProperties = mockPropertiesWithLocations.filter(property => {
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    
    if (filters.priceRange !== 'all') {
      const price = property.price;
      switch (filters.priceRange) {
        case 'low': return price < 300000;
        case 'medium': return price >= 300000 && price < 500000;
        case 'high': return price >= 500000;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🗺️ Mapa de Propiedades</h1>
              <p className="text-gray-600 mt-1">Explora propiedades en Salta Capital</p>
            </div>
            <Link 
              to="/admin" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros y lista */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filtros */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Filtros</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Propiedad</label>
                  <select 
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Todas</option>
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="Casa Quinta">Casa Quinta</option>
                    <option value="Duplex">Duplex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Precio</label>
                  <select 
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Todos los precios</option>
                    <option value="low">Hasta $300,000</option>
                    <option value="medium">$300,000 - $500,000</option>
                    <option value="high">Más de $500,000</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Mostrando {filteredProperties.length} propiedades
              </div>
            </div>

            {/* Lista de propiedades */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Lista de Propiedades</h3>
              <div className="space-y-3">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => setSelectedProperty(selectedProperty === property.id ? null : property.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedProperty === property.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{property.title}</h4>
                        <p className="text-blue-600 font-bold text-sm">${property.price.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs">{property.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Simulación de mapa con propiedades */}
              <div className="relative h-[600px] bg-gradient-to-br from-green-100 via-blue-50 to-green-50">
                {/* Fondo del mapa simulado */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 800 600" className="w-full h-full">
                    {/* Calles simuladas */}
                    <path d="M0 100 L800 100" stroke="#ccc" strokeWidth="2"/>
                    <path d="M0 200 L800 200" stroke="#ccc" strokeWidth="2"/>
                    <path d="M0 300 L800 300" stroke="#ccc" strokeWidth="2"/>
                    <path d="M0 400 L800 400" stroke="#ccc" strokeWidth="2"/>
                    <path d="M0 500 L800 500" stroke="#ccc" strokeWidth="2"/>
                    <path d="M100 0 L100 600" stroke="#ccc" strokeWidth="2"/>
                    <path d="M200 0 L200 600" stroke="#ccc" strokeWidth="2"/>
                    <path d="M300 0 L300 600" stroke="#ccc" strokeWidth="2"/>
                    <path d="M400 0 L400 600" stroke="#ccc" strokeWidth="2"/>
                    <path d="M500 0 L500 600" stroke="#ccc" strokeWidth="2"/>
                    <path d="M600 0 L600 600" stroke="#ccc" strokeWidth="2"/>
                    <path d="M700 0 L700 600" stroke="#ccc" strokeWidth="2"/>
                  </svg>
                </div>

                {/* Marcadores de propiedades */}
                {filteredProperties.map((property, index) => {
                  // Posición simulada en el mapa (calculada basándose en el índice)
                  const x = 100 + (index * 120) + (index % 2 * 80);
                  const y = 150 + Math.floor(index / 3) * 150 + (index % 2 * 50);
                  
                  return (
                    <div
                      key={property.id}
                      style={{ left: `${x}px`, top: `${y}px` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                        selectedProperty === property.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                      }`}
                      onClick={() => setSelectedProperty(selectedProperty === property.id ? null : property.id)}
                    >
                      {/* Marcador */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                        selectedProperty === property.id 
                          ? 'bg-red-500 ring-4 ring-red-200' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}>
                        🏠
                      </div>
                      
                      {/* Tooltip */}
                      {selectedProperty === property.id && (
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl border border-gray-200 w-64 z-30">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h4 className="font-bold text-gray-900 mb-2">{property.title}</h4>
                          <p className="text-blue-600 font-bold text-lg mb-2">${property.price.toLocaleString()}</p>
                          <div className="text-sm text-gray-600 mb-3">
                            <p>📍 {property.location}</p>
                            <p>🛏️ {property.bedrooms} hab • 🚿 {property.bathrooms} baños • 📐 {property.area}m²</p>
                          </div>
                          <Link 
                            to={`/propiedades/${property.id}`}
                            className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Ver Detalles
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Leyenda del mapa */}
                <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">🗺️ Leyenda</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span>Propiedades disponibles</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span>Propiedad seleccionada</span>
                    </div>
                  </div>
                </div>

                {/* Información de la zona */}
                <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">📍 Salta Capital</h3>
                  <p className="text-sm text-gray-600">Zona: Centro y alrededores</p>
                  <p className="text-sm text-gray-600">Propiedades: {filteredProperties.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-8 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🏘️ Información de la Zona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="font-semibold text-gray-900">Servicios</h3>
              <p className="text-sm text-gray-600">Comercios, bancos, hospitales cerca</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚌</div>
              <h3 className="font-semibold text-gray-900">Transporte</h3>
              <p className="text-sm text-gray-600">Excelente conectividad urbana</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌳</div>
              <h3 className="font-semibold text-gray-900">Ambiente</h3>
              <p className="text-sm text-gray-600">Zonas verdes y espacios recreativos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;