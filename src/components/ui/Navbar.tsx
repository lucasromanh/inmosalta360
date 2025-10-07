import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface NavbarProps {
  title?: string;
  logo?: React.ReactNode;
  menuItems?: NavItem[];
  actions?: React.ReactNode;
  className?: string;
}

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  children?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({
  title = 'InmoSalta360',
  logo,
  menuItems = [],
  actions,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={cn('bg-white shadow-lg border-b', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            {logo && <div className="flex-shrink-0 mr-3">{logo}</div>}
            <div className="text-xl font-bold text-gray-900">{title}</div>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <NavbarItem key={index} item={item} />
            ))}
          </div>

          {/* Acciones y menú móvil */}
          <div className="flex items-center space-x-4">
            {actions && <div className="hidden md:flex">{actions}</div>}
            
            {/* Botón menú móvil */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Abrir menú"
            >
              <svg
                className={cn(
                  'w-6 h-6 transition-transform',
                  isMobileMenuOpen && 'rotate-90'
                )}
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
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, index) => (
                <MobileNavItem
                  key={index}
                  item={item}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              ))}
              {actions && (
                <div className="pt-4 border-t border-gray-200">{actions}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavbarItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const baseStyles =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors';
  const activeStyles = 'text-primary-600 bg-primary-50';
  const inactiveStyles = 'text-gray-700 hover:text-primary-600 hover:bg-gray-50';

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(baseStyles, item.active ? activeStyles : inactiveStyles)}
    >
      {item.label}
    </button>
  );
};

const MobileNavItem: React.FC<{ item: NavItem; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  const baseStyles =
    'block px-3 py-2 rounded-md text-base font-medium transition-colors w-full text-left';
  const activeStyles = 'text-primary-600 bg-primary-50';
  const inactiveStyles = 'text-gray-700 hover:text-primary-600 hover:bg-gray-50';

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }
    onClose();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(baseStyles, item.active ? activeStyles : inactiveStyles)}
    >
      {item.label}
    </button>
  );
};

export default Navbar;