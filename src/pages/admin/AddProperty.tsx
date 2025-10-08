import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

const AddProperty: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'Casa',
    yearBuilt: '',
    garage: '',
    features: [] as string[]
  });

  const [images, setImages] = useState<string[]>(['']);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([false]);

  // Efecto para detectar modo edición y cargar datos
  useEffect(() => {
    console.log('🔧 AddProperty useEffect iniciado');
    console.log('🔧 URL completa:', window.location.href);
    console.log('🔧 Search params:', window.location.search);
    
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get('edit');
    const editModeLS = localStorage.getItem('editMode');
    
    console.log('🔧 Parámetro edit:', editParam);
    console.log('🔧 editMode localStorage:', editModeLS);
    
    // Verificar parámetro de test
    const testParam = urlParams.get('test');
    const timestampParam = urlParams.get('timestamp');
    
    if (testParam === 'true') {
      console.log('🧪 TEST MODE DETECTADO - Navegación funciona correctamente!');
    }
    
    if (timestampParam) {
      const timestamp = new Date(parseInt(timestampParam));
      console.log('🔧 Navegación con timestamp:', timestamp.toISOString());
      console.log('🔧 Tiempo transcurrido desde click:', Date.now() - parseInt(timestampParam), 'ms');
    }
    
    // LÓGICA CORREGIDA: Solo modo edición si hay parámetro edit con ID válido Y datos en localStorage
    const hasEditParam = editParam && editParam !== 'false' && editParam !== 'true';
    const hasEditData = localStorage.getItem('editingProperty');
    const hasEditMode = editModeLS === 'true';
    
    const isEditMode = hasEditParam && hasEditData && hasEditMode;
    console.log('🔧 ¿Es modo edición?:', isEditMode);
    console.log('🔧 - Tiene parámetro edit con ID:', hasEditParam);
    console.log('🔧 - Tiene datos en localStorage:', !!hasEditData);
    console.log('🔧 - Tiene editMode=true:', hasEditMode);
    
    if (isEditMode) {
      const editingPropertyData = localStorage.getItem('editingProperty');
      console.log('🔧 Datos de propiedad en localStorage:', editingPropertyData);
      
      if (editingPropertyData) {
        try {
          const property = JSON.parse(editingPropertyData);
          console.log('🔧 ✅ Propiedad parseada correctamente:', property);
          
          setIsEditing(true);
          setEditingPropertyId(property.id);
          
          console.log('🔧 ✅ Modo edición activado para propiedad ID:', property.id);
          
          // Pre-llenar el formulario con los datos existentes
          setFormData({
            title: property.title || '',
            description: property.description || '',
            price: property.price?.toString() || '',
            location: property.location || '',
            bedrooms: property.bedrooms?.toString() || property.rooms?.toString() || '',
            bathrooms: property.bathrooms?.toString() || '',
            area: property.area?.toString() || '',
            type: property.type || 'Casa',
            yearBuilt: property.yearBuilt?.toString() || '',
            garage: property.garage?.toString() || '',
            features: property.features || []
          });
          
          // Pre-llenar imágenes
          if (property.images && property.images.length > 0) {
            console.log('🔧 ✅ Cargando imágenes:', property.images.length);
            setImages([...property.images]);
            setUploadingImages(new Array(property.images.length).fill(false));
          }
          
          console.log('🔧 ✅ Formulario pre-llenado completamente');
          
          // NO limpiar localStorage aquí - esperar hasta guardar
          // localStorage.removeItem('editingProperty');
        } catch (error) {
          console.error('🔧 ❌ Error al cargar datos para edición:', error);
        }
      } else {
        console.log('🔧 ❌ No se encontraron datos de propiedad en localStorage');
        setIsEditing(false);
      }
    } else {
      console.log('🔧 ✅ Modo creación (nuevo)');
      setIsEditing(false);
      setEditingPropertyId(null);
      // Limpiar localStorage si no es modo edición
      localStorage.removeItem('editingProperty');
      localStorage.removeItem('editMode');
      console.log('🔧 ✅ localStorage limpiado para nuevo formulario');
    }
  }, []);

  const propertyTypes = ['Casa', 'Departamento', 'Casa Quinta', 'Duplex', 'Terreno', 'Local Comercial'];
  const availableFeatures = [
    'Piscina', 'Jardín', 'Parrilla', 'Cochera', 'Portón automático', 
    'Aire acondicionado', 'Calefacción', 'Alarma', 'Cámaras de seguridad',
    'Balcón', 'Terraza', 'Vestidor', 'Lavadero', 'Cocina integrada'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter(f => f !== feature)
        : [...formData.features, feature]
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleFileUpload = async (index: number, file: File) => {
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona solo archivos de imagen (JPG, PNG, etc.)');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB.');
      return;
    }

    try {
      setUploadingImages(prev => {
        const newUploading = [...prev];
        newUploading[index] = true;
        return newUploading;
      });

      // Convertir archivo a base64 para almacenamiento local
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        handleImageChange(index, base64String);
        
        setUploadingImages(prev => {
          const newUploading = [...prev];
          newUploading[index] = false;
          return newUploading;
        });
      };
      
      reader.onerror = () => {
        alert('Error al procesar la imagen. Inténtalo de nuevo.');
        setUploadingImages(prev => {
          const newUploading = [...prev];
          newUploading[index] = false;
          return newUploading;
        });
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al procesar la imagen. Inténtalo de nuevo.');
      setUploadingImages(prev => {
        const newUploading = [...prev];
        newUploading[index] = false;
        return newUploading;
      });
    }
  };

  const addImageField = () => {
    setImages([...images, '']);
    setUploadingImages([...uploadingImages, false]);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setUploadingImages(uploadingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      
      if (isEditing && editingPropertyId) {
        // Modo edición: actualizar propiedad existente
        const propertyToUpdate = {
          id: editingPropertyId, // Mantener el ID original
          ...formData,
          price: parseFloat(formData.price) || 0,
          bedrooms: parseInt(formData.bedrooms) || 0,
          bathrooms: parseInt(formData.bathrooms) || 0,
          area: parseFloat(formData.area) || 0,
          yearBuilt: parseInt(formData.yearBuilt) || new Date().getFullYear(),
          garage: parseInt(formData.garage) || 0,
          images: images.filter(img => img.trim() !== ''),
          updatedAt: new Date().toISOString(),
          status: 'available'
        };

        // Encontrar y actualizar la propiedad existente
        const propertyIndex = existingProperties.findIndex((p: any) => p.id === editingPropertyId);
        if (propertyIndex !== -1) {
          // Mantener la fecha de creación original si existe
          if (existingProperties[propertyIndex].createdAt) {
            (propertyToUpdate as any).createdAt = existingProperties[propertyIndex].createdAt;
          }
          existingProperties[propertyIndex] = propertyToUpdate;
        }

        localStorage.setItem('properties', JSON.stringify(existingProperties));
        console.log('Propiedad actualizada exitosamente:', propertyToUpdate);
      } else {
        // Modo creación: crear nueva propiedad
        const newProperty = {
          id: Date.now().toString(),
          ...formData,
          price: parseFloat(formData.price) || 0,
          bedrooms: parseInt(formData.bedrooms) || 0,
          bathrooms: parseInt(formData.bathrooms) || 0,
          area: parseFloat(formData.area) || 0,
          yearBuilt: parseInt(formData.yearBuilt) || new Date().getFullYear(),
          garage: parseInt(formData.garage) || 0,
          images: images.filter(img => img.trim() !== ''),
          createdAt: new Date().toISOString(),
          status: 'available'
        };

        existingProperties.push(newProperty);
        localStorage.setItem('properties', JSON.stringify(existingProperties));
        console.log('Propiedad guardada exitosamente:', newProperty);
      }
      setShowSuccessMessage(true);
      
      // Resetear formulario después de guardar
      setTimeout(() => {
        setShowSuccessMessage(false);
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          bedrooms: '',
          bathrooms: '',
          area: '',
          type: 'Casa',
          yearBuilt: '',
          garage: '',
          features: []
        });
        setImages(['']);
        setUploadingImages([false]);
      }, 3000);

    } catch (error) {
      console.error('Error al guardar propiedad:', error);
      alert('Error al guardar la propiedad. Inténtalo de nuevo.');
    }
  };

  return (
    <AdminLayout 
      title={isEditing ? "Editar Propiedad" : "Nueva Propiedad"} 
      subtitle={isEditing ? "Modificar datos de la propiedad" : "Agregar Propiedad al Catálogo"}
    >
      <div className="max-w-6xl mx-auto py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <strong>{isEditing ? '¡Propiedad actualizada exitosamente!' : '¡Propiedad guardada exitosamente!'}</strong>
                <p className="text-sm">La propiedad ha sido agregada al catálogo.</p>
              </div>
            </div>
          </div>
        )}

        {/* Banner prominente de modo edición */}
        {isEditing && (
          <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl border-l-8 border-yellow-400 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="text-4xl animate-pulse">✏️</div>
              <div>
                <h3 className="text-xl font-bold">🔧 MODO EDICIÓN ACTIVADO</h3>
                <p className="text-orange-100">Estás editando una propiedad existente. Los cambios se guardarán sobre la propiedad actual.</p>
                {editingPropertyId && (
                  <p className="text-sm text-orange-200 mt-1">ID de propiedad: {editingPropertyId}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header del formulario */}
          <div className={`${isEditing ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'} p-8 text-white`}>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{isEditing ? '✏️' : '🏠'}</div>
              <div>
                <h2 className="text-3xl font-bold">{isEditing ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'}</h2>
                <p className="text-blue-100 mt-2">Complete la información de la propiedad</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Indicador de modo edición */}
            {isEditing && (
              <div className="mb-8 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✏️</span>
                  <div>
                    <strong>Modo Edición Activo</strong>
                    <p className="text-sm">Estás editando una propiedad existente. Los cambios actualizarán la propiedad original.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Información Básica */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📝</span>
                Información Básica
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título de la Propiedad *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ej: Casa moderna en Barrio Norte con piscina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Propiedad *
                  </label>
                  <select
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio (USD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="450000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Barrio Norte, Salta Capital"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe la propiedad, sus características principales y ubicación..."
                  />
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🏗️</span>
                Características
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dormitorios
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Baños
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Superficie (m²)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Año de Construcción
                  </label>
                  <input
                    type="number"
                    name="yearBuilt"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2018"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cocheras
                  </label>
                  <input
                    type="number"
                    name="garage"
                    value={formData.garage}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>

            {/* Amenidades */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">⭐</span>
                Amenidades y Características Especiales
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableFeatures.map(feature => (
                  <label key={feature} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Imágenes */}
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📸</span>
                Imágenes
              </h3>
              
              <div className="space-y-6">
                {images.map((image, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-3">Imagen {index + 1}</h4>
                      
                      {/* Opciones de subida */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Subir archivo */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            📁 Subir desde tu dispositivo
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(index, file);
                                }
                              }}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg cursor-pointer bg-white"
                            />
                            {uploadingImages[index] && (
                              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">JPG, PNG, máximo 5MB</p>
                        </div>

                        {/* O ingresar URL */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            🌐 O pegar URL de imagen
                          </label>
                          <input
                            type="url"
                            value={image.startsWith('data:') ? '' : image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="https://ejemplo.com/imagen.jpg"
                          />
                          <p className="text-xs text-gray-500">Pega la URL de una imagen</p>
                        </div>
                      </div>

                      {/* Botón eliminar */}
                      {images.length > 1 && (
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg border border-red-200 text-sm transition-colors"
                            title="Eliminar esta imagen"
                          >
                            🗑️ Eliminar imagen
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Vista previa de imagen */}
                    {image && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-3">Vista previa:</p>
                        <div className="flex justify-center">
                          <img 
                            src={image} 
                            alt={`Preview ${index + 1}`}
                            className="w-48 h-36 object-cover rounded-lg border border-gray-300 shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const errorDiv = document.createElement('div');
                              errorDiv.className = 'w-48 h-36 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm';
                              errorDiv.textContent = '❌ Error al cargar imagen';
                              (e.target as HTMLImageElement).parentNode?.replaceChild(errorDiv, e.target as HTMLImageElement);
                            }}
                            onLoad={(e) => {
                              (e.target as HTMLImageElement).style.display = 'block';
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addImageField}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-4 rounded-lg transition-colors border-2 border-dashed border-blue-300 flex items-center justify-center"
                >
                  <span className="text-xl mr-2">📸</span>
                  + Agregar otra imagen
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="border-t pt-8 flex justify-between">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
              >
                {isEditing ? '✏️ Actualizar Propiedad' : '💾 Guardar Propiedad'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProperty;