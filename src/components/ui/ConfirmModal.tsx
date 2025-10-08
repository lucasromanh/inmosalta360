import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'success' | 'danger';
  propertyData?: {
    title: string;
    id: string;
    price: number;
    location: string;
  };
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = 'info',
  propertyData
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    info: {
      bg: 'from-blue-500 to-blue-600',
      icon: '📝',
      ring: 'ring-blue-500/20'
    },
    warning: {
      bg: 'from-orange-500 to-red-500',
      icon: '✏️',
      ring: 'ring-orange-500/20'
    },
    success: {
      bg: 'from-green-500 to-green-600',
      icon: '✅',
      ring: 'ring-green-500/20'
    },
    danger: {
      bg: 'from-red-500 to-red-600',
      icon: '🗑️',
      ring: 'ring-red-500/20'
    }
  };

  const style = typeStyles[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 ring-1 ${style.ring}`}>
        {/* Header con gradiente */}
        <div className={`bg-gradient-to-r ${style.bg} p-6 rounded-t-2xl text-white`}>
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{style.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4 leading-relaxed">{message}</p>
          
          {/* Property Info Card */}
          {propertyData && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🏠</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{propertyData.title}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">🆔</span>
                      <span>ID: {propertyData.id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">💰</span>
                      <span>${propertyData.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">📍</span>
                      <span>{propertyData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 bg-gradient-to-r ${style.bg} text-white font-medium py-3 px-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;