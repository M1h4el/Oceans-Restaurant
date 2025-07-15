// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

    /* const isAuthenticated = true; */

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ 
          from: location,
          message: 'Por favor inicia sesión para acceder a esta página',
          search: location.search
        }} 
      />
    );
  }

  return <Outlet />;
}