import React from 'react';

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className = '', children }) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary-600">
              InmoSalta360
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Inicio
            </a>
            <a
              href="/propiedades"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Propiedades
            </a>
            <a
              href="/mapa"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Mapa
            </a>
            <a
              href="/nosotros"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Nosotros
            </a>
            <a
              href="/contacto"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Iniciar Sesión
            </a>
            <a
              href="/panel"
              className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Panel Inmobiliaria
            </a>
          </div>

          {children}
        </div>
      </div>
    </header>
  );
};

export default Header;