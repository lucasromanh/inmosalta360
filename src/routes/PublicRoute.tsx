import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();
  
  // Si el usuario ya está logueado, redirigir al dashboard
  return user ? <Navigate to="/admin" replace /> : <>{children}</>;
};

export default PublicRoute;