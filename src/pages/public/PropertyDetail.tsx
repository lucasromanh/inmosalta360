import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

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
  const { id } = useParams();
  const location = useLocation();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const loadProperty = () => {
      console.log('🔍 Cargando propiedad con ID:', id);
      setLoading(true);
      
      try {
        const savedProperties = localStorage.getItem('properties');
        console.log('🔍 Properties en localStorage:', savedProperties ? 'Encontradas' : 'No encontradas');
        
        if (savedProperties) {
          const allProperties = JSON.parse(savedProperties);
          console.log('🔍 Total propiedades:', allProperties.length);
          
          const foundProperty = allProperties.find((p: Property) => p.id === id);
          console.log('🔍 Propiedad encontrada:', foundProperty ? foundProperty.title : 'No encontrada');
          
          if (foundProperty) {
            setProperty(foundProperty);
            console.log('🔍 ✅ Propiedad cargada:', foundProperty.title, foundProperty.description);
            
            // Detectar si la descripción cambió
            if (foundProperty.description !== lastUpdate) {
              setLastUpdate(foundProperty.description || '');
              console.log('🔍 📝 Cambio detectado en descripción');
            }
          }
        }
      } catch (error) {
        console.error('🔍 ❌ Error al cargar propiedad:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }
  }, [id, lastUpdate]);

  // Recargar cada vez que la página se monta o re-monta (por ej. al navegar)
  useEffect(() => {
    const interval = setInterval(() => {
      if (id && !loading) {
        console.log('🔍 🔄 Verificación periódica de cambios...');
        const savedProperties = localStorage.getItem('properties');
        if (savedProperties) {
          const allProperties = JSON.parse(savedProperties);
          const foundProperty = allProperties.find((p: Property) => p.id === id);
          if (foundProperty && property && foundProperty.description !== property.description) {
            console.log('🔍 ✨ Cambio detectado! Actualizando...');
            setProperty(foundProperty);
          }
        }
      }
    }, 2000); // Verificar cada 2 segundos

    return () => clearInterval(interval);
  }, [id, property, loading]);

  // Escuchar cuando la ventana vuelve al foco (usuario regresa de otra pestaña)
  useEffect(() => {
    const handleFocus = () => {
      console.log('🔍 Ventana enfocada - recargando propiedad');
      const loadPropertyOnFocus = () => {
        try {
          const savedProperties = localStorage.getItem('properties');
          if (savedProperties) {
            const allProperties = JSON.parse(savedProperties);
            const foundProperty = allProperties.find((p: Property) => p.id === id);
            if (foundProperty) {
              setProperty(foundProperty);
              console.log('🔍 ✅ Propiedad actualizada on focus:', foundProperty.title);
            }
          }
        } catch (error) {
          console.error('🔍 Error al recargar propiedad on focus:', error);
        }
      };

      if (id) {
        loadPropertyOnFocus();
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
          <div className="text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Propiedad no encontrada</h2>
          <p className="text-gray-600 mb-6">La propiedad que buscas no existe.</p>
          <Link to="/propiedades" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
             Volver a propiedades
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/propiedades" className="text-blue-600 hover:text-blue-800 inline-block mb-6">
           Volver a propiedades
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Galería de imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="md:col-span-2">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información principal */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <p className="text-gray-600 mb-4">📍 {property.location}</p>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  💰 ${property.price?.toLocaleString()}
                </p>
                
                {/* Características principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms || 0}</div>
                    <div className="text-sm text-gray-600">🛏️ Habitaciones</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms || 0}</div>
                    <div className="text-sm text-gray-600">🚿 Baños</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.area || 0}</div>
                    <div className="text-sm text-gray-600">📐 m²</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.garage || 0}</div>
                    <div className="text-sm text-gray-600">🚗 Cochera</div>
                  </div>
                </div>
                
                {/* Descripción */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Descripción</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
                
                {/* Características adicionales */}
                {property.features && property.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ Características</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Información de contacto del agente */}
              <div className="lg:col-span-1">
                <div className="bg-blue-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🏢 Contactar Agente</h3>
                  <div className="mb-6">
                    <div className="font-semibold text-gray-900 text-lg">InmoSalta360</div>
                    <div className="text-sm text-gray-600 mt-2">👤 Lucas Inmobiliaria</div>
                    <div className="text-sm text-gray-600">📞 +54 387 123-4567</div>
                    <div className="text-sm text-gray-600">📧 contacto@inmosalta360.com</div>
                  </div>
                  
                  {/* Botones de contacto */}
                  <div className="space-y-3">
                    <a 
                      href="tel:+543871234567"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 text-center transition-colors flex items-center justify-center"
                    >
                      📞 Llamar ahora
                    </a>
                    
                    <a 
                      href={`https://wa.me/543871234567?text=Hola, estoy interesado en la propiedad "${property.title}" (ID: ${property.id}). Me gustaría obtener más información.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 text-center transition-colors flex items-center justify-center"
                    >
                      💬 WhatsApp
                    </a>
                    
                    <a 
                      href={`mailto:contacto@inmosalta360.com?subject=Consulta sobre ${property.title}&body=Hola,%0A%0AEstoy interesado en la propiedad "${property.title}" (ID: ${property.id}).%0A%0AMe gustaría solicitar una visita y obtener más información.%0A%0AGracias.`}
                      className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 text-center transition-colors flex items-center justify-center"
                    >
                      📧 Solicitar visita
                    </a>
                    
                    <button 
                      onClick={() => window.open(`https://wa.me/543871234567?text=Hola, necesito información sobre financiamiento para "${property.title}"`, '_blank')}
                      className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 text-center transition-colors flex items-center justify-center"
                    >
                      🏦 Consultar financiación
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
