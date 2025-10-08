import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data para el homepage
const featuredProperties = [
  {
    id: 1,
    title: 'Casa Moderna en Barrio Norte',
    price: 450000,
    location: 'Barrio Norte, Salta',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
    type: 'Casa',
    isNew: true
  },
  {
    id: 2,
    title: 'Departamento Céntrico Premium',
    price: 280000,
    location: 'Centro, Salta',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
    type: 'Departamento',
    isFeatured: true
  },
  {
    id: 3,
    title: 'Casa Quinta con Piscina',
    price: 650000,
    location: 'San Lorenzo, Salta',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500',
    type: 'Casa Quinta',
    isNew: true
  }
];

const stats = {
  properties: 247,
  clients: 1200,
  sales: 156,
  years: 8
};

const services = [
  {
    icon: '🏠',
    title: 'Venta de Propiedades',
    description: 'Amplia selección de casas, departamentos y terrenos en las mejores zonas de Salta.'
  },
  {
    icon: '🔍',
    title: 'Búsqueda Personalizada',
    description: 'Te ayudamos a encontrar la propiedad perfecta según tus necesidades y presupuesto.'
  },
  {
    icon: '📋',
    title: 'Gestión Integral',
    description: 'Asesoramiento completo en documentación, créditos hipotecarios y trámites legales.'
  },
  {
    icon: '📊',
    title: 'Valuación Profesional',
    description: 'Tasación precisa de propiedades con análisis de mercado actualizado.'
  }
];

const testimonials = [
  {
    name: 'María González',
    text: 'Excelente atención, encontré mi casa ideal en tiempo récord. El equipo fue muy profesional.',
    rating: 5,
    location: 'Barrio Norte'
  },
  {
    name: 'Carlos Rodríguez',
    text: 'Muy satisfecho con la venta de mi propiedad. El proceso fue transparente y eficiente.',
    rating: 5,
    location: 'Centro'
  },
  {
    name: 'Ana Martín',
    text: 'Recomiendo totalmente. Me ayudaron con todos los trámites y obtuve el mejor precio.',
    rating: 5,
    location: 'San Lorenzo'
  }
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            <Link to="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                InmoSalta360
              </div>
              <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Inmobiliaria Premium
              </span>
            </Link>
            
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Inicio</Link>
              <Link to="/propiedades" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Propiedades</Link>
              <Link to="/mapa" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Mapa</Link>
              <a href="#servicios" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Servicios</a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contacto</a>
            </div>
            
            <div className="hidden md:flex space-x-2 lg:space-x-3">
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/registro" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium shadow-lg text-sm lg:text-base"
              >
                <span className="hidden lg:inline">Registrar Inmobiliaria</span>
                <span className="lg:hidden">Registrar</span>
              </Link>
            </div>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menú móvil */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <Link to="/" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  🏠 Inicio
                </Link>
                <Link to="/propiedades" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  🏘️ Propiedades
                </Link>
                <Link to="/mapa" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  🗺️ Mapa
                </Link>
                <a href="#servicios" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  🔧 Servicios
                </a>
                <a href="#contacto" className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  📞 Contacto
                </a>
                
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link to="/login" className="block w-full text-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    👤 Iniciar Sesión
                  </Link>
                  <Link to="/registro" className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    ✨ Registrar Inmobiliaria
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
              Encuentra tu
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                hogar ideal
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              En <strong>InmoSalta360</strong> te ofrecemos las mejores propiedades en Salta Capital. 
              Con más de 8 años de experiencia, somos tu socio de confianza en el mercado inmobiliario.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link 
              to="/propiedades" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              🏠 Ver Propiedades
            </Link>
            <Link 
              to="/mapa" 
              className="w-full sm:w-auto bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-lg"
            >
              🗺️ Explorar en Mapa
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 mx-4 sm:mx-0">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">{stats.properties}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Propiedades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-1 sm:mb-2">{stats.clients}+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Clientes Felices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">{stats.sales}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Ventas Exitosas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-1 sm:mb-2">{stats.years}</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🌟 Propiedades Destacadas</h2>
            <p className="text-xl text-gray-600">Descubre nuestras propiedades más populares</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  {property.isNew && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ✨ Nuevo
                    </span>
                  )}
                  {property.isFeatured && (
                    <span className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4">📍 {property.location}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl font-bold text-blue-600">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {property.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <span>🛏️ {property.bedrooms} hab</span>
                    <span>🚿 {property.bathrooms} baños</span>
                    <span>📐 {property.area}m²</span>
                  </div>
                  
                  <Link 
                    to={`/propiedades/${property.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/propiedades" 
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
            >
              Ver Todas las Propiedades →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🎯 Nuestros Servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos servicios integrales para satisfacer todas tus necesidades inmobiliarias
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">💬 Lo que dicen nuestros clientes</h2>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>
              <p className="text-xl italic mb-6">"{testimonials[currentTestimonial].text}"</p>
              <div>
                <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="opacity-75">{testimonials[currentTestimonial].location}</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">📞 Contáctanos</h2>
            <p className="text-xl text-gray-600">Estamos aquí para ayudarte a encontrar tu hogar ideal</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ubicación</h3>
              <p className="text-gray-600">
                Av. San Martín 1234<br />
                Salta Capital, Argentina
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600">
                +54 387 654-3210<br />
                WhatsApp disponible 24/7
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                info@inmosalta360.com<br />
                ventas@inmosalta360.com
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://wa.me/5493876543210?text=Hola, me interesa conocer más sobre sus propiedades"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              💬 Chatea con nosotros en WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">InmoSalta360</h3>
              <p className="text-gray-400 mb-4">
                Tu inmobiliaria de confianza en Salta Capital. Más de 8 años ayudando a las familias a encontrar su hogar ideal.
              </p>
              <div className="flex space-x-4">
                <span className="text-2xl">📱</span>
                <span className="text-2xl">📧</span>
                <span className="text-2xl">🌐</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <Link to="/propiedades" className="block text-gray-400 hover:text-white transition-colors">Propiedades</Link>
                <Link to="/mapa" className="block text-gray-400 hover:text-white transition-colors">Mapa</Link>
                <Link to="/login" className="block text-gray-400 hover:text-white transition-colors">Iniciar Sesión</Link>
                <Link to="/registro" className="block text-gray-400 hover:text-white transition-colors">Registro</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <div className="space-y-2 text-gray-400">
                <p>📍 Av. San Martín 1234, Salta</p>
                <p>📱 +54 387 654-3210</p>
                <p>📧 info@inmosalta360.com</p>
                <p>🕒 Lun-Vie: 9:00-18:00</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 InmoSalta360. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}