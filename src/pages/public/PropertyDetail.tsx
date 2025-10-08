import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  description?: string;
  images?: string[];
  features?: string[];
  garage?: number;
}

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = () => {
      try {
        const savedProperties = localStorage.getItem('properties');
        
        if (savedProperties) {
          const allProperties = JSON.parse(savedProperties);
          const foundProperty = allProperties.find((p: Property) => p.id === id);
          
          if (foundProperty) {
            setProperty(foundProperty);
          }
        }
      } catch (error) {
        console.error('Error al cargar propiedad:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }

    // Agregar listener para recargar cuando vuelva el foco (sin cambiar el diseño)
    const handleFocus = () => {
      if (id) {
        loadProperty();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Propiedad no encontrada</h2>
          <p className="text-gray-600 mb-4">La propiedad que buscas no existe o ha sido eliminada.</p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Galería de imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            <div className="md:col-span-2 lg:col-span-2">
              <img 
                src={property.images?.[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800';
                }}
              />
            </div>
            {property.images?.slice(1).map((image: string, index: number) => (
              <img 
                key={index}
                src={image} 
                alt={`${property.title} ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800';
                }}
              />
            ))}
          </div>

          <div className="p-6">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <p className="text-gray-600 mb-4">📍 {property.location}</p>
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  💰 ${property.price?.toLocaleString()}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms || 0}</div>
                    <div className="text-sm text-gray-600">Habitaciones</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms || 0}</div>
                    <div className="text-sm text-gray-600">Baños</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.area || 0}</div>
                    <div className="text-sm text-gray-600">m² Superficie</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.garage || 0}</div>
                    <div className="text-sm text-gray-600">Cocheras</div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {property.features && property.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Características</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar de contacto */}
              <div className="mt-8 lg:mt-0">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contactar Inmobiliaria</h3>
                  
                  <div className="space-y-3">
                    <a 
                      href="tel:+543874555555"
                      className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      📞 Llamar Ahora
                    </a>
                    
                    <a 
                      href={`https://wa.me/543874555555?text=Hola! Me interesa la propiedad: ${property.title} - $${property.price?.toLocaleString()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                    
                    <a 
                      href={`mailto:contacto@inmosalta360.com?subject=Consulta sobre ${property.title}&body=Hola! Me interesa obtener más información sobre la propiedad: ${property.title} - $${property.price?.toLocaleString()}`}
                      className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      ✉️ Email
                    </a>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-blue-200">
                    <div className="text-center text-sm text-gray-600">
                      <p className="font-medium">InmoSalta360</p>
                      <p>Tu inmobiliaria de confianza</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de volver */}
        <div className="mt-6 text-center">
          <a 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Volver a Propiedades
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;