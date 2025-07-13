import { Navigate, Outlet } from 'react-router-dom';

// ⚠️ Este ejemplo usa una verificación ficticia, podrías usar un contexto o un hook real
const isAuthenticated = (): boolean => {
  return true /* localStorage.getItem('token') !== null */;
};

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}