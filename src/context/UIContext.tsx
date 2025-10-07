import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  autoClose?: boolean;
}

interface UIContextType extends UIState {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const initialState: UIState = {
  sidebarOpen: false,
  theme: 'light',
  loading: false,
  notifications: [],
};

export const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [state, setState] = useState<UIState>(initialState);

  const toggleSidebar = () => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  const setSidebarOpen = (open: boolean) => {
    setState(prev => ({ ...prev, sidebarOpen: open }));
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setState(prev => ({ ...prev, theme }));
    localStorage.setItem('theme', theme);
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, newNotification],
    }));

    // Auto-remove notification after 5 seconds if autoClose is true
    if (notification.autoClose !== false) {
      setTimeout(() => {
        removeNotification(id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id),
    }));
  };

  const clearNotifications = () => {
    setState(prev => ({ ...prev, notifications: [] }));
  };

  const value: UIContextType = {
    ...state,
    toggleSidebar,
    setSidebarOpen,
    setTheme,
    setLoading,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};