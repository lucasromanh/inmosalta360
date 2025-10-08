import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAuth } from '../../hooks/useAuth';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Configuración de iconos de Leaflet - Fix para Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerRetina,
  shadowUrl: markerShadow,
});

// Mock data para propiedades con ubicaciones en Salta
const mockPropertiesWithLocations = [
  {
    id: "1",
    title: "Casa Familiar en Salta Capital",
    price: 350000,
    location: "Centro, Salta",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "Casa",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    lat: -24.7859,
    lng: -65.4117
  },
  {
    id: "2", 
    title: "Departamento Moderno",
    price: 280000,
    location: "Tres Cerritos, Salta",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: "Departamento",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    lat: -24.7745,
    lng: -65.4125
  },
  {
    id: "3",
    title: "Casa Quinta con Jardín",
    price: 450000,
    location: "San Lorenzo, Salta",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    type: "Casa Quinta",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
    lat: -24.7580,
    lng: -65.4850
  },
  {
    id: "4",
    title: "Duplex en Barrio Privado",
    price: 380000,
    location: "Grand Bourg, Salta",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: "Duplex", 
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=300&fit=crop",
    lat: -24.7920,
    lng: -65.4200
  }
];

const MapView = () => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all'
  });

  // Filtrar propiedades según filtros seleccionados
  const filteredProperties = mockPropertiesWithLocations.filter(property => {
    const typeMatch = filters.type === 'all' || property.type === filters.type;
    
    let priceMatch = true;
    if (filters.priceRange === 'low') {
      priceMatch = property.price <= 300000;
    } else if (filters.priceRange === 'medium') {
      priceMatch = property.price > 300000 && property.price <= 500000;
    } else if (filters.priceRange === 'high') {
      priceMatch = property.price > 500000;
    }
    
    return typeMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">🗺️ Mapa de Propiedades</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Explora propiedades en Salta Capital</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link 
                to="/propiedades" 
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center text-sm sm:text-base"
              >
                📋 Ver Propiedades
              </Link>
              {user ? (
                <Link 
                  to="/admin" 
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
                >
                  🏠 Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm sm:text-base"
                >
                  👤 Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Barra de filtros móvil - siempre visible */}
        <div className="lg:hidden bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">🔍 Filtros de Búsqueda</h3>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              {showFilters ? 'Cerrar' : 'Expandir'}
            </button>
          </div>
          
          {/* Filtros básicos siempre visibles */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todas las propiedades</option>
                <option value="Casa">🏠 Casa</option>
                <option value="Departamento">🏢 Departamento</option>
                <option value="Casa Quinta">🏡 Casa Quinta</option>
                <option value="Duplex">🏘️ Duplex</option>
              </select>
            </div>
            <div>
              <select 
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los precios</option>
                <option value="low">💰 Hasta $300.000</option>
                <option value="medium">💎 $300.000 - $500.000</option>
                <option value="high">💍 Más de $500.000</option>
              </select>
            </div>
          </div>
          
          {/* Contador de resultados */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              📊 {filteredProperties.length} propiedades encontradas
            </span>
            <button 
              onClick={() => {
                setFilters({ type: 'all', priceRange: 'all' });
                setSelectedProperty(null);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              🧹 Limpiar filtros
            </button>
          </div>
        </div>

        {/* Overlay de filtros expandidos para móvil */}
        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowFilters(false)}>
            <div className="absolute top-4 left-4 right-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">🔍 Filtros Avanzados</h2>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
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

        {/* Botones de acciones móviles - Integrados en el layout */}
        <div className="lg:hidden flex justify-between items-center gap-4 mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors border-2 border-blue-700"
            title="Filtros Avanzados"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>{showFilters ? '✕' : '🔍'}</span>
              <span className="text-sm font-medium">
                {showFilters ? 'Cerrar Filtros' : 'Filtros Avanzados'}
              </span>
            </div>
          </button>
          
          <button 
            onClick={() => {
              const listElement = document.querySelector('.property-list-mobile');
              if (listElement) {
                listElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex-1 bg-green-600 text-white p-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors border-2 border-green-700"
            title="Ver Lista de Propiedades"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>📋</span>
              <span className="text-sm font-medium">Ver Lista</span>
            </div>
          </button>
        </div>

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
                      <Popup maxWidth={320} minWidth={280} className="property-popup">
                        <div className="p-4 min-w-[280px]">
                          <div className="mb-3 flex items-center justify-between">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                              {property.type}
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              ${property.price.toLocaleString()}
                            </span>
                          </div>
                          
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-36 object-cover rounded-lg mb-3 shadow-md"
                          />
                          
                          <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">
                            {property.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 flex items-center">
                            <span className="mr-1">📍</span>
                            {property.location}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="text-xs text-gray-500 mb-1">Habitaciones</div>
                              <div className="font-semibold text-sm text-gray-800">🛏️ {property.bedrooms}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="text-xs text-gray-500 mb-1">Baños</div>
                              <div className="font-semibold text-sm text-gray-800">🚿 {property.bathrooms}</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="text-xs text-gray-500 mb-1">Área</div>
                              <div className="font-semibold text-sm text-gray-800">📐 {property.area}m²</div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <button
                              onClick={() => {
                                navigate(`/propiedad/${property.id}`);
                              }}
                              className="popup-button"
                              style={{
                                width: '100%',
                                padding: '12px 16px',
                                backgroundColor: '#ffffff',
                                color: '#2563eb',
                                border: '2px solid #2563eb',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center' as const,
                                display: 'block',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#2563eb';
                                e.currentTarget.style.color = '#ffffff';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.color = '#2563eb';
                              }}
                            >
                              👁️ VER MÁS DETALLES
                            </button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de controles del mapa */}
        <div className="mt-4 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4">
            {/* Leyenda y información */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Leyenda */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-xs sm:text-sm font-medium text-gray-700">Leyenda:</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Disponible</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-gray-600">Seleccionada</span>
                </div>
              </div>
              
              {/* Contador de propiedades */}
              <div className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                🏘️ {filteredProperties.length} propiedades mostradas
              </div>
            </div>
            
            {/* Controles de navegación */}
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => {
                  // Lógica para centrar el mapa
                  console.log('Centrar mapa en Salta');
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
                title="Centrar en Salta Capital"
              >
                🎯 <span className="hidden sm:inline">Centrar</span>
              </button>
              
              <button 
                onClick={() => setSelectedProperty(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
                title="Limpiar selección"
              >
                🧹 <span className="hidden sm:inline">Limpiar</span>
              </button>
              
              {selectedProperty && (
                <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">
                  ✓ <span className="hidden sm:inline">Propiedad seleccionada</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lista de propiedades para móvil */}
        <div className="property-list-mobile lg:hidden mt-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Lista de Propiedades ({filteredProperties.length})</h2>
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => navigate(`/propiedad/${property.id}`)}
                className="flex bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 hover:border-blue-300"
              >
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{property.title}</h3>
                      <p className="text-gray-600 text-xs mt-1 flex items-center">
                        📍 {property.location}
                      </p>
                      <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                        <span>🛏️ {property.bedrooms}</span>
                        <span>🚿 {property.bathrooms}</span>
                        <span>📐 {property.area}m²</span>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {property.type}
                      </span>
                      <p className="text-blue-600 font-bold text-sm mt-1">
                        ${property.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-600">No se encontraron propiedades con los filtros seleccionados</p>
              <button 
                onClick={() => setFilters({ type: 'all', priceRange: 'all' })}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">🏘️ Información de la Zona</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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