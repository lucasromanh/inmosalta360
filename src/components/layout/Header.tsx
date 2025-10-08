import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className = '', children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo y título */}
          <div className="flex items-center">
            <Link to="/" className="text-lg md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              InmoSalta360
            </Link>
          </div>

          {/* Navegación principal - Desktop */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/propiedades"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Propiedades
            </Link>
            <Link
              to="/mapa"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Mapa
            </Link>
            <a
              href="#servicios"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Servicios
            </a>
            <a
              href="#contacto"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Botones de acción - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="bg-blue-600 text-white hover:bg-blue-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Registrarse
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {children}
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link
                to="/"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Inicio
              </Link>
              <Link
                to="/propiedades"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏘️ Propiedades
              </Link>
              <Link
                to="/mapa"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🗺️ Mapa
              </Link>
              <a
                href="#servicios"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔧 Servicios
              </a>
              <a
                href="#contacto"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📞 Contacto
              </a>
              
              {/* Botones móviles */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👤 Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="block w-full text-center bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-lg text-base font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ✨ Registrarse
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;