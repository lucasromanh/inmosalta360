import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import type { User, LoginCredentials } from "../services/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  error: null
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Limpiar localStorage al inicio para testing - REMOVER EN PRODUCCIÓN
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    
    const localUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (localUser && token) {
      try {
        const parsedUser = JSON.parse(localUser);
        // Validar que el usuario tenga propiedades requeridas
        if (parsedUser && parsedUser.email && parsedUser.name) {
          setUser(parsedUser);
        } else {
          // Usuario inválido, limpiar
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        }
      } catch (error) {
        console.error('Error parseando usuario del localStorage:', error);
        // Limpiar localStorage si hay error
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    authService.logout().catch(console.error);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};