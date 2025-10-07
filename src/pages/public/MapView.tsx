import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix para los iconos de Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
});

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
  const [showFilters, setShowFilters] = useState(false);
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
        {/* Overlay de filtros para móvil */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute top-4 left-4 right-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">🔍 Filtros</h2>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                
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
                      <option value="low">Hasta $300.000</option>
                      <option value="medium">$300.000 - $500.000</option>
                      <option value="high">Más de $500.000</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Mostrando {filteredProperties.length} propiedades</p>
                    
                    <div className="space-y-3">
                      {filteredProperties.slice(0, 3).map((property) => (
                        <div key={property.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                             onClick={() => {setSelectedProperty(property.id); setShowFilters(false);}}>
                          <img src={property.image} alt={property.title} className="w-12 h-12 object-cover rounded-lg"/>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                            <p className="text-sm text-blue-600 font-semibold">${property.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{property.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar con filtros y lista - Solo desktop */}
          <div className="lg:col-span-1 space-y-6 hidden lg:block">
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
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Mapa real con Leaflet */}
              <div className="h-[600px]">
                <MapContainer
                  center={[-24.7859, -65.4117]} // Centro de Salta Capital
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-xl"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Marcadores de propiedades */}
                  {filteredProperties.map((property) => (
                    <Marker
                      key={property.id}
                      position={[property.lat, property.lng]}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <h3 className="font-bold text-sm text-gray-900 mb-1">{property.title}</h3>
                          <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                          <div className="flex justify-between items-center text-xs mb-2">
                            <span>{property.bedrooms} hab</span>
                            <span>{property.bathrooms} baños</span>
                            <span>{property.area} m²</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">
                              ${property.price.toLocaleString()}
                            </span>
                            <Link 
                              to={`/propiedad/${property.id}`}
                              className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                            >
                              Ver más
                            </Link>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* Botón flotante para filtros solo en móvil */}
                <div className="absolute top-4 left-4 lg:hidden">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                    title="Mostrar/Ocultar Filtros"
                  >
                    {showFilters ? '✕' : '🔍'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de controles del mapa */}
        <div className="mt-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Leyenda y información */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Leyenda */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Leyenda:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Disponible</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Seleccionada</span>
                </div>
              </div>
              
              {/* Contador de propiedades */}
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                🏘️ {filteredProperties.length} propiedades mostradas
              </div>
            </div>
            
            {/* Controles de navegación */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  // Lógica para centrar el mapa
                  console.log('Centrar mapa en Salta');
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                title="Centrar en Salta Capital"
              >
                🎯 Centrar
              </button>
              
              <button 
                onClick={() => setSelectedProperty(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                title="Limpiar selección"
              >
                🧹 Limpiar
              </button>
              
              {selectedProperty && (
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
                  ✓ Propiedad seleccionada
                </div>
              )}
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