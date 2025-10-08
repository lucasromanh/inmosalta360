import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import ConfirmModal from '../../components/ui/ConfirmModal';

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
  rooms?: number;
}

// Mock properties with 4 images each
const initialMockProperties: Property[] = [
  {
    id: "1",
    title: "Casa Familiar en Salta Capital",
    price: 350000,
    location: "Centro, Salta",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    type: "Casa",
    description: "Hermosa casa familiar en zona céntrica con todas las comodidades.",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "2", 
    title: "Departamento Céntrico",
    price: 280000,
    location: "Centro, Salta",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: "Departamento",
    description: "Moderno departamento en el corazón de la ciudad.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"
    ]
  },
  {
    id: "3",
    title: "Casa Quinta en San Lorenzo", 
    price: 650000,
    location: "San Lorenzo",
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    type: "Casa Quinta",
    description: "Amplia casa quinta con piscina y jardín.",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400&h=300&fit=crop"
    ]
  }
];

const AdminPropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, []);

  // Recargar propiedades cuando la ventana vuelva al foco (usuario regresa de edición)
  useEffect(() => {
    const handleFocus = () => {
      console.log('🔧 Ventana enfocada - recargando propiedades');
      loadProperties();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('🔧 Página visible - recargando propiedades');
        setTimeout(() => loadProperties(), 500);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadProperties = () => {
    try {
      const savedProperties = localStorage.getItem('properties');
      let allProperties = [...initialMockProperties];
      
      if (savedProperties) {
        const parsedProperties = JSON.parse(savedProperties);
        const mockIds = initialMockProperties.map(p => p.id);
        const newProperties = parsedProperties.filter((p: any) => !mockIds.includes(p.id));
        allProperties = [...initialMockProperties, ...newProperties];
        localStorage.setItem('properties', JSON.stringify(allProperties));
      } else {
        localStorage.setItem('properties', JSON.stringify(allProperties));
      }
      
      setProperties(allProperties);
    } catch (error) {
      console.error('Error al cargar propiedades:', error);
      setProperties(initialMockProperties);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      const updatedProperties = properties.filter(p => p.id !== propertyId);
      setProperties(updatedProperties);
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
    }
  };

  const handleEditClick = (property: Property) => {
    console.log('🔧 Iniciando proceso de edición para:', property.title);
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleEditConfirm = async () => {
    if (!selectedProperty) return;

    try {
      console.log('🔧 Preparando datos para edición:', selectedProperty);
      
      // Limpiar localStorage previo
      localStorage.removeItem('editingProperty');
      localStorage.removeItem('editMode');
      
      // Guardar nueva información
      localStorage.setItem('editingProperty', JSON.stringify(selectedProperty));
      localStorage.setItem('editMode', 'true');
      
      console.log('🔧 ✅ Datos guardados en localStorage');
      
      // Cerrar modal y mostrar confirmación
      setShowEditModal(false);
      setShowConfirmModal(true);
      
    } catch (error) {
      console.error('🔧 ❌ Error al preparar edición:', error);
      alert('Error al preparar la edición: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleConfirmNavigate = () => {
    if (!selectedProperty) return;
    
    console.log('🔧 Navegando al formulario de edición...');
    navigate(`/admin/propiedades/nueva?edit=${selectedProperty.id}&timestamp=${Date.now()}`);
    
    // Limpiar estados
    setShowConfirmModal(false);
    setSelectedProperty(null);
    
    // Programar una recarga de propiedades cuando el usuario regrese
    setTimeout(() => {
      console.log('🔧 Recargando propiedades después de edición...');
      loadProperties();
    }, 3000); // Recargar después de 3 segundos
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setShowConfirmModal(false);
    setSelectedProperty(null);
    console.log('🔧 Edición cancelada por el usuario');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando propiedades...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagen principal */}
              <div className="relative h-48">
                <img 
                  src={property.images?.[0] || '/placeholder.jpg'} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Sin+Imagen';
                  }}
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
                  Disponible
                </div>
                {/* Indicador de propiedad recientemente editada */}
                {property.description && property.description.includes('MODIFICACION') && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    ✨ Editada
                  </div>
                )}
              </div>

              {/* Información de la propiedad */}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{property.title}</h3>
                <p className="text-gray-600 mb-2">{property.location}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <span>🛏️ {property.bedrooms} hab</span>
                  <span>🚿 {property.bathrooms} baños</span>
                  <span>📐 {property.area} m²</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  ${property.price.toLocaleString()}
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <Link 
                    to={`/propiedad/${property.id}`}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center hover:bg-blue-700 text-sm"
                  >
                    👁️ Ver
                  </Link>
                  <button 
                    onClick={() => handleEditClick(property)}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-3 py-2 rounded-lg transition-all transform hover:scale-105 text-sm font-medium shadow-lg"
                    title="Editar propiedad"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteProperty(property.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                    title="Eliminar propiedad"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay propiedades</h3>
            <p className="text-gray-600 mb-4">Comienza agregando tu primera propiedad</p>
            <Link 
              to="/admin/propiedades/nueva"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ➕ Agregar Propiedad
            </Link>
          </div>
        )}

        {/* Modal de confirmación de edición */}
        <ConfirmModal
          isOpen={showEditModal}
          onClose={handleCancelEdit}
          onConfirm={handleEditConfirm}
          title="Editar Propiedad"
          message="¿Deseas editar esta propiedad? Se abrirá el formulario con los datos pre-cargados."
          confirmText="✏️ Continuar"
          cancelText="❌ Cancelar"
          type="warning"
          propertyData={selectedProperty ? {
            title: selectedProperty.title,
            id: selectedProperty.id,
            price: selectedProperty.price,
            location: selectedProperty.location
          } : undefined}
        />

        {/* Modal de confirmación de navegación */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={handleCancelEdit}
          onConfirm={handleConfirmNavigate}
          title="¡Datos Preparados!"
          message="Los datos de la propiedad han sido guardados correctamente. ¿Continuar al formulario de edición?"
          confirmText="🚀 Ir al Formulario"
          cancelText="❌ Cancelar"
          type="success"
          propertyData={selectedProperty ? {
            title: selectedProperty.title,
            id: selectedProperty.id,
            price: selectedProperty.price,
            location: selectedProperty.location
          } : undefined}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPropertyList;