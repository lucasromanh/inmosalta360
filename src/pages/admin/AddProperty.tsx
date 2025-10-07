import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AddProperty: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
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

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos el guardado
    console.log('Propiedad guardada:', { ...formData, images: images.filter(img => img.trim() !== '') });
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InmoSalta360
              </h1>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Nueva Propiedad
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Volver al Dashboard
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Bienvenido</div>
                  <div className="text-sm text-gray-500">{user?.name}</div>
                </div>
                <div className="relative">
                  <button
                    onClick={logout}
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Cerrar Sesión"
                  >
                    <span className="text-xl">🚪</span>
                  </button>
                </div>
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <strong>¡Propiedad guardada exitosamente!</strong>
                <p className="text-sm">La propiedad ha sido agregada al catálogo.</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🏠</div>
              <div>
                <h2 className="text-3xl font-bold">Agregar Nueva Propiedad</h2>
                <p className="text-blue-100 mt-2">Complete la información de la propiedad</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
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
              
              <div className="space-y-4">
                {images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="URL de la imagen (ej: https://ejemplo.com/imagen.jpg)"
                      />
                    </div>
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addImageField}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  + Agregar otra imagen
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="border-t pt-8 flex justify-between">
              <Link
                to="/admin"
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Cancelar
              </Link>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
              >
                💾 Guardar Propiedad
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProperty;