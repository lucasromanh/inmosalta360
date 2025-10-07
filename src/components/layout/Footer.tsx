import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">InmoSalta360</h3>
            <p className="text-gray-300 mb-4">
              Tu plataforma inmobiliaria digital en Salta. Conectamos inmobiliarias
              con clientes de manera eficiente y moderna.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.703 0 1.042.527 1.042 1.188 0 .703-.449 1.781-.679 2.769-.194.827.414 1.5 1.219 1.5 1.464 0 2.588-1.543 2.588-3.769 0-1.969-1.414-3.347-3.447-3.347-2.346 0-3.725 1.759-3.725 3.578 0 .709.275 1.469.616 1.879.068.083.077.156.057.242-.061.267-.196.796-.223.906-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.595 1.884-4.977 5.432-4.977 2.848 0 5.067 2.03 5.067 4.74 0 2.831-1.785 5.104-4.262 5.104-.832 0-1.615-.432-1.886-.941l-.512 1.958c-.185.719-.685 1.61-1.017 2.156C8.845 23.439 10.401 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/propiedades" className="text-gray-300 hover:text-white transition-colors">
                  Propiedades
                </a>
              </li>
              <li>
                <a href="/mapa" className="text-gray-300 hover:text-white transition-colors">
                  Mapa
                </a>
              </li>
              <li>
                <a href="/nosotros" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Para Inmobiliarias */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Para Inmobiliarias</h4>
            <ul className="space-y-2">
              <li>
                <a href="/registro" className="text-gray-300 hover:text-white transition-colors">
                  Registrarse
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a href="/panel" className="text-gray-300 hover:text-white transition-colors">
                  Panel de Control
                </a>
              </li>
              <li>
                <a href="/precios" className="text-gray-300 hover:text-white transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="/ayuda" className="text-gray-300 hover:text-white transition-colors">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 InmoSalta360. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacidad" className="text-gray-300 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="/terminos" className="text-gray-300 hover:text-white text-sm transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;