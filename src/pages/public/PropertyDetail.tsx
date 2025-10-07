import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Datos de ejemplo para la propiedad
  const property = {
    id: id,
    title: 'Casa en Barrio Norte',
    price: 450000,
    location: 'Salta Capital, Argentina',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    yearBuilt: 2018,
    garage: 2,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800'
    ],
    description: 'Hermosa casa ubicada en una de las mejores zonas de Salta Capital. Cuenta con amplios ambientes, cocina integrada, patio con parrilla y excelente iluminación natural. Ideal para familias que buscan comodidad y tranquilidad.',
    features: [
      'Cocina integrada',
      'Patio con parrilla',
      'Calefacción central',
      'Aire acondicionado',
      'Portón automático',
      'Jardín',
      'Seguridad 24hs'
    ],
    agent: {
      name: 'Lucas Inmobiliaria',
      phone: '+54 387 123456',
      email: 'contacto@lucasinmobiliaria.com'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/propiedades" className="text-blue-600 hover:text-blue-800 inline-block">
            ← Volver a propiedades
          </Link>
          <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            🏠 Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Galería de imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="md:col-span-2">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {property.images.slice(1).map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${property.title} ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información principal */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  ${property.price.toLocaleString()}
                </p>

                {/* Características principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Habitaciones</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Baños</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{property.garage}</div>
                    <div className="text-sm text-gray-600">Cochera</div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Características adicionales */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="lg:col-span-1">
                <div className="bg-blue-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contactar Agente</h3>
                  <div className="mb-4">
                    <div className="font-semibold text-gray-900">{property.agent.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{property.agent.phone}</div>
                    <div className="text-sm text-gray-600">{property.agent.email}</div>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 mb-3">
                    Llamar ahora
                  </button>
                  
                  <button className="w-full bg-white text-blue-600 border border-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 mb-3">
                    WhatsApp
                  </button>
                  
                  <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900">
                    Solicitar visita
                  </button>
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