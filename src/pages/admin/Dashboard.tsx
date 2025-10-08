import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

// Mock data for the dashboard
const mockData = {
  stats: {
    totalProperties: 150,
    newInquiries: 24,
    activeContracts: 18,
    monthlyRevenue: 250000,
    conversionRate: 15.8
  },
  recentActivities: [
    { id: 1, type: 'inquiry', message: 'Nueva consulta para Casa en Barrio Norte', time: '5 min' },
    { id: 2, type: 'contract', message: 'Contrato firmado - Depto en Centro', time: '1 hr' },
    { id: 3, type: 'visit', message: 'Visita programada para mañana 10:00 AM', time: '2 hrs' },
  ],
  notifications: [
    {
      id: 1,
      type: 'email',
      title: 'Nueva consulta por email',
      message: 'Juan Pérez consultó sobre el departamento en Centro - $180,000',
      time: '5 min',
      priority: 'high',
      action: 'Responder',
      route: '/admin/crm'
    },
    {
      id: 2,
      type: 'calendar',
      title: 'Visita programada',
      message: 'Visita a Casa en Tres Cerritos programada para hoy 15:00',
      time: '1 hr',
      priority: 'medium',
      action: 'Ver detalles',
      route: '/admin/calendario'
    },
    {
      id: 3,
      type: 'followup',
      title: 'Seguimiento pendiente',
      message: 'María González - Follow up para propiedad en San Lorenzo',
      time: '3 hrs',
      priority: 'low',
      action: 'Contactar',
      route: '/admin/crm'
    }
  ],
  topProperties: [
    {
      id: 1,
      title: 'Casa en Barrio Norte - 3 dormitorios',
      views: 234,
      inquiries: 15,
      price: 285000
    },
    {
      id: 2,
      title: 'Departamento Centro - 2 ambientes',
      views: 189,
      inquiries: 12,
      price: 165000
    },
    {
      id: 3,
      title: 'Casa en Tres Cerritos - 4 dormitorios',
      views: 156,
      inquiries: 9,
      price: 320000
    }
  ]
};

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'properties'>('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const quickActions = [
    {
      title: 'Nueva Propiedad',
      description: 'Agregar propiedad al catálogo',
      icon: '🏠',
      color: 'from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200',
      action: () => navigate('/admin/propiedades/nueva')
    },
    {
      title: 'Ver Propiedades',
      description: 'Catálogo completo',
      icon: '�',
      color: 'from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200',
      action: () => navigate('/admin/propiedades')
    },
    {
      title: 'Mapa Interactivo',
      description: 'Propiedades en mapa',
      icon: '🗺️',
      color: 'from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200',
      action: () => navigate('/mapa')
    },
    {
      title: 'Analytics',
      description: 'Ver estadísticas detalladas',
      icon: '📊',
      color: 'from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200',
      action: () => setActiveTab('analytics')
    },
    {
      title: 'CRM',
      description: 'Gestionar clientes y leads',
      icon: '👥',
      color: 'from-teal-50 to-teal-100 border-teal-200 hover:from-teal-100 hover:to-teal-200',
      action: () => navigate('/admin/crm')
    },
    {
      title: 'Soporte',
      description: 'Contactar equipo técnico',
      icon: '💬',
      color: 'from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-200',
      action: () => window.open('https://wa.me/5493876543210?text=Hola, necesito soporte técnico', '_blank')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Header with Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-6 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  InmoSalta360
                </h1>
                <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Panel Admin
                </span>
              </div>
              {/* Notification bell for mobile */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="lg:hidden relative p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                🔔
                {mockData.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {mockData.notifications.length}
                  </span>
                )}
              </button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 lg:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'overview' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'analytics' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📈 Analytics
              </button>
              <button
                onClick={() => setActiveTab('properties')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'properties' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🏠 Propiedades
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <span className="text-2xl">🔔</span>
                  {mockData.notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {mockData.notifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown - Responsive */}
                {showNotifications && (
                  <>
                    {/* Desktop Dropdown */}
                    <div className="hidden lg:block absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {mockData.notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                {notification.type === 'email' && <span className="text-blue-500">📧</span>}
                                {notification.type === 'calendar' && <span className="text-green-500">📅</span>}
                                {notification.type === 'followup' && <span className="text-orange-500">📞</span>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-xs text-gray-400">{notification.time}</span>
                                  <button 
                                    onClick={() => navigate(notification.route)}
                                    className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                                  >
                                    {notification.action}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-100 text-center">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Ver todas las notificaciones
                        </button>
                      </div>
                    </div>

                    {/* Mobile Full Screen Modal */}
                    <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowNotifications(false)}>
                      <div className="absolute top-0 right-0 left-0 bg-white rounded-b-2xl shadow-xl max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">🔔 Notificaciones</h3>
                          <button 
                            onClick={() => setShowNotifications(false)}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                          {mockData.notifications.map((notification) => (
                            <div key={notification.id} className="p-4 border-b border-gray-50">
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 text-xl">
                                  {notification.type === 'email' && <span className="text-blue-500">📧</span>}
                                  {notification.type === 'calendar' && <span className="text-green-500">📅</span>}
                                  {notification.type === 'followup' && <span className="text-orange-500">📞</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-base font-medium text-gray-900">{notification.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notification.message}</p>
                                  <div className="flex items-center justify-between mt-3">
                                    <span className="text-xs text-gray-400">{notification.time}</span>
                                    <button 
                                      onClick={() => {
                                        navigate(notification.route);
                                        setShowNotifications(false);
                                      }}
                                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                    >
                                      {notification.action}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="p-4 text-center">
                            <button 
                              onClick={() => setShowNotifications(false)}
                              className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Ver todas las notificaciones
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Bienvenido</div>
                  <div className="text-sm text-gray-500">{user?.name}</div>
                </div>
                
                {/* User Menu Dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-600 text-sm">⚙️</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50">
                    <div className="p-3 border-b border-gray-100">
                      <div className="font-medium text-gray-900">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => alert('Configuración del perfil - Próximamente')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <span>⚙️</span>
                        <span>Configuración</span>
                      </button>
                      <button 
                        onClick={() => alert('Configuración de la cuenta - Próximamente')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <span>👤</span>
                        <span>Mi Perfil</span>
                      </button>
                      <hr className="my-2 mx-2" />
                      <Link
                        to="/login"
                        onClick={() => {
                          // En un caso real, aquí llamarías a la función logout del contexto
                          localStorage.removeItem('auth_token');
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <span>🚪</span>
                        <span>Cerrar Sesión</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">¡Hola, {user?.name}! 👋</h1>
                  <p className="text-xl opacity-90">Aquí tienes un resumen de tu actividad hoy</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-75">Último acceso</div>
                  <div className="text-lg font-medium">Hoy, 09:30 AM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Actions Enhanced */}
              <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Centro de Control</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Acceso Rápido</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {quickActions.map((action, index) => (
                    <button 
                      key={index}
                      onClick={action.action}
                      className={`group relative overflow-hidden bg-gradient-to-r ${action.color} p-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="text-4xl">{action.icon}</div>
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Grid Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Propiedades Activas</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{mockData.stats.totalProperties}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🏠</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600 font-medium">+12%</span>
                    <span className="text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Consultas Nuevas</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{mockData.stats.newInquiries}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600 font-medium">+18%</span>
                    <span className="text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Contratos Activos</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{mockData.stats.activeContracts}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600 font-medium">+5%</span>
                    <span className="text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Ingresos Mensuales</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">${(mockData.stats.monthlyRevenue / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600 font-medium">+23%</span>
                    <span className="text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Tasa Conversión</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{mockData.stats.conversionRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600 font-medium">+3.2%</span>
                    <span className="text-gray-500 ml-1">vs mes anterior</span>
                  </div>
                </div>
              </div>

              {/* Recent Activities Enhanced */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">En vivo</span>
                  </div>
                  <div className="space-y-4">
                    {mockData.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'inquiry' ? 'bg-blue-100' : 
                          activity.type === 'contract' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          <span className="text-xl">
                            {activity.type === 'inquiry' ? '💬' : 
                             activity.type === 'contract' ? '📝' : '📅'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">Hace {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/admin/actividades" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Ver todas las actividades →
                    </Link>
                  </div>
                </div>

                {/* Enhanced Performance Section */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-xl">
                  <h2 className="text-xl font-bold mb-6">Rendimiento del Mes</h2>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-2">{mockData.stats.totalProperties}</div>
                      <div className="text-gray-300">Total Propiedades</div>
                      <div className="text-sm text-gray-400 mt-1">↗ +12% vs mes anterior</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{mockData.stats.conversionRate}%</div>
                      <div className="text-gray-300">Tasa de Conversión</div>
                      <div className="text-sm text-gray-400 mt-1">↗ +2.3% vs mes anterior</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-400 mb-2">18</div>
                      <div className="text-gray-300">Días Promedio de Venta</div>
                      <div className="text-sm text-gray-400 mt-1">↘ -3 días vs mes anterior</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab Content */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Analytics Avanzado</h2>
                
                {/* KPIs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <h3 className="text-sm font-medium opacity-90">ROI Promedio</h3>
                    <p className="text-3xl font-bold mt-2">24.5%</p>
                    <p className="text-xs opacity-75 mt-1">↗ +3.2% vs trimestre anterior</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <h3 className="text-sm font-medium opacity-90">Tiempo en Mercado</h3>
                    <p className="text-3xl font-bold mt-2">45 días</p>
                    <p className="text-xs opacity-75 mt-1">↘ -8 días vs promedio</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                    <h3 className="text-sm font-medium opacity-90">Satisfacción Cliente</h3>
                    <p className="text-3xl font-bold mt-2">4.8/5</p>
                    <p className="text-xs opacity-75 mt-1">↗ +0.3 vs mes anterior</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                    <h3 className="text-sm font-medium opacity-90">Market Share</h3>
                    <p className="text-3xl font-bold mt-2">12.3%</p>
                    <p className="text-xs opacity-75 mt-1">↗ +1.8% en Salta</p>
                  </div>
                </div>

                {/* Análisis por Zona */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Análisis por Zona</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold mb-4">Top 5 Zonas más Demandadas</h4>
                      <div className="space-y-3">
                        {['Centro', 'Barrio Norte', 'San Lorenzo', 'Tres Cerritos', 'Limache'].map((zona, index) => (
                          <div key={zona} className="flex items-center justify-between">
                            <span className="text-gray-700">{index + 1}. {zona}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${90 - index * 15}%`}}></div>
                              </div>
                              <span className="text-sm text-gray-600">{90 - index * 15}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold mb-4">Precios Promedio por m²</h4>
                      <div className="space-y-3">
                        {[
                          {zona: 'Centro', precio: 2850},
                          {zona: 'Barrio Norte', precio: 2650},
                          {zona: 'San Lorenzo', precio: 2100},
                          {zona: 'Tres Cerritos', precio: 3200},
                          {zona: 'Limache', precio: 1950}
                        ].map((item) => (
                          <div key={item.zona} className="flex items-center justify-between">
                            <span className="text-gray-700">{item.zona}</span>
                            <span className="font-semibold text-green-600">${item.precio}/m²</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predicciones y Tendencias */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-6">🔮 Predicciones de Mercado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📈</div>
                      <h4 className="font-semibold">Próximos 3 meses</h4>
                      <p className="text-green-400 font-bold">+15% demanda</p>
                      <p className="text-sm opacity-75 mt-1">Época alta de búsqueda</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🏘️</div>
                      <h4 className="font-semibold">Zona en crecimiento</h4>
                      <p className="text-blue-400 font-bold">Tres Cerritos</p>
                      <p className="text-sm opacity-75 mt-1">+28% de consultas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">💡</div>
                      <h4 className="font-semibold">Oportunidad</h4>
                      <p className="text-yellow-400 font-bold">Deptos 2 amb</p>
                      <p className="text-sm opacity-75 mt-1">Baja oferta, alta demanda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Properties Tab Content */}
          {activeTab === 'properties' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">🏠 Gestión de Propiedades</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Link to="/admin/propiedades" className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl border border-blue-200 transition-colors">
                    <div className="text-blue-600 text-4xl mb-3">🏠</div>
                    <h3 className="font-bold text-gray-900">Ver Todas las Propiedades</h3>
                    <p className="text-sm text-gray-600 mt-2">Catálogo completo disponible</p>
                  </Link>
                  
                  <Link to="/propiedades/1" className="bg-orange-50 hover:bg-orange-100 p-6 rounded-xl border border-orange-200 transition-colors">
                    <div className="text-orange-600 text-4xl mb-3">🔍</div>
                    <h3 className="font-bold text-gray-900">Ver Detalle Ejemplo</h3>
                    <p className="text-sm text-gray-600 mt-2">Vista detallada de propiedad</p>
                  </Link>
                  
                  <Link to="/mapa" className="bg-teal-50 hover:bg-teal-100 p-6 rounded-xl border border-teal-200 transition-colors">
                    <div className="text-teal-600 text-4xl mb-3">🗺️</div>
                    <h3 className="font-bold text-gray-900">Mapa Interactivo</h3>
                    <p className="text-sm text-gray-600 mt-2">Propiedades en el mapa</p>
                  </Link>
                  
                  <button 
                    onClick={() => alert('Redirigiendo al formulario de nueva propiedad...')}
                    className="bg-green-50 hover:bg-green-100 p-6 rounded-xl border border-green-200 transition-colors"
                  >
                    <div className="text-green-600 text-4xl mb-3">➕</div>
                    <h3 className="font-bold text-gray-900">Agregar Nueva</h3>
                    <p className="text-sm text-gray-600 mt-2">Publicar propiedad rápidamente</p>
                  </button>
                  
                  <button 
                    onClick={() => alert('Abriendo editor masivo...')}
                    className="bg-purple-50 hover:bg-purple-100 p-6 rounded-xl border border-purple-200 transition-colors"
                  >
                    <div className="text-purple-600 text-4xl mb-3">📝</div>
                    <h3 className="font-bold text-gray-900">Edición Masiva</h3>
                    <p className="text-sm text-gray-600 mt-2">Actualizar múltiples propiedades</p>
                  </button>
                </div>

                {/* Enlaces rápidos adicionales */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
                  <h3 className="text-xl font-bold mb-4">🚀 Enlaces Rápidos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/propiedades/1" className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
                      <div className="text-2xl mb-2">🏠</div>
                      <h4 className="font-semibold">Ver Ejemplo</h4>
                      <p className="text-sm opacity-90">Detalle de propiedad #1</p>
                    </Link>
                    <Link to="/mapa" className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
                      <div className="text-2xl mb-2">🗺️</div>
                      <h4 className="font-semibold">Mapa Interactivo</h4>
                      <p className="text-sm opacity-90">Vista geográfica</p>
                    </Link>
                    <Link to="/admin/propiedades" className="bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors">
                      <div className="text-2xl mb-2">📋</div>
                      <h4 className="font-semibold">Catálogo Completo</h4>
                      <p className="text-sm opacity-90">Todas las propiedades</p>
                    </Link>
                  </div>
                </div>

                {/* Lista de propiedades más populares */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">Propiedades más visitadas esta semana</h3>
                <div className="space-y-4">
                  {mockData.topProperties.map((property, index) => (
                    <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{property.title}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-blue-600">👁️ {property.views} vistas</span>
                            <span className="text-sm text-green-600">💬 {property.inquiries} consultas</span>
                            <span className="text-sm text-purple-600">💰 ${property.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <Link 
                        to={`/propiedades/${property.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;