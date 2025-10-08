import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

interface Property {
  id: string;
  title: string;
  price: number;
  type: string;
  location: string;
  createdAt?: string;
  status?: string;
}

const Reports: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalValue: 0,
    averagePrice: 0,
    propertiesByType: {} as Record<string, number>,
    salesByMonth: {} as Record<string, number>
  });

  useEffect(() => {
    loadPropertiesAndGenerateStats();
  }, []);

  const loadPropertiesAndGenerateStats = () => {
    try {
      const savedProperties = localStorage.getItem('properties');
      let allProperties: Property[] = [];
      
      if (savedProperties) {
        allProperties = JSON.parse(savedProperties);
      }

      // Generar estadísticas
      const totalProperties = allProperties.length;
      const totalValue = allProperties.reduce((sum, prop) => sum + (prop.price || 0), 0);
      const averagePrice = totalProperties > 0 ? totalValue / totalProperties : 0;

      // Propiedades por tipo
      const propertiesByType: Record<string, number> = {};
      allProperties.forEach(prop => {
        propertiesByType[prop.type] = (propertiesByType[prop.type] || 0) + 1;
      });

      // Ventas simuladas por mes (últimos 6 meses)
      const months = ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const salesByMonth: Record<string, number> = {};
      months.forEach((month, index) => {
        salesByMonth[month] = Math.floor(Math.random() * 10) + 1; // Ventas simuladas
      });

      setProperties(allProperties);
      setStats({
        totalProperties,
        totalValue,
        averagePrice,
        propertiesByType,
        salesByMonth
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Casa': 'bg-blue-500',
      'Departamento': 'bg-green-500',
      'Casa Quinta': 'bg-purple-500',
      'Duplex': 'bg-yellow-500',
      'Terreno': 'bg-red-500',
      'Local Comercial': 'bg-indigo-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reportes y Análisis</h1>
            <p className="text-gray-600">Dashboard de estadísticas y métricas</p>
          </div>
          <button 
            onClick={loadPropertiesAndGenerateStats}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔄 Actualizar Datos
          </button>
        </div>

        {/* Resumen de métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Propiedades</p>
                <p className="text-3xl font-bold">{stats.totalProperties}</p>
              </div>
              <div className="text-4xl opacity-80">🏠</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Valor Total</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Precio Promedio</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.averagePrice)}</p>
              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Tipos Diferentes</p>
                <p className="text-3xl font-bold">{Object.keys(stats.propertiesByType).length}</p>
              </div>
              <div className="text-4xl opacity-80">🏗️</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Propiedades por Tipo */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Propiedades por Tipo</h2>
            <div className="space-y-4">
              {Object.entries(stats.propertiesByType).map(([type, count]) => {
                const percentage = stats.totalProperties > 0 ? (count / stats.totalProperties) * 100 : 0;
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${getTypeColor(type)}`}></div>
                      <span className="font-medium text-gray-700">{type}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getTypeColor(type)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8">{count}</span>
                      <span className="text-xs text-gray-500 w-12">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gráfico de Ventas por Mes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ventas por Mes (Simulado)</h2>
            <div className="space-y-4">
              {Object.entries(stats.salesByMonth).map(([month, sales]) => {
                const maxSales = Math.max(...Object.values(stats.salesByMonth));
                const percentage = maxSales > 0 ? (sales / maxSales) * 100 : 0;
                return (
                  <div key={month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-700 w-12">{month}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 w-32 bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8">{sales}</span>
                      <span className="text-xs text-gray-500">ventas</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabla de propiedades recientes */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Propiedades Registradas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propiedad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.slice(0, 10).map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${getTypeColor(property.type)}`}>
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(property.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Disponible
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {properties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">📊 No hay propiedades para mostrar</div>
                <p className="text-gray-400 mt-2">Agrega propiedades para ver estadísticas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;