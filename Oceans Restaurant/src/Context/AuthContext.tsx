import { createContext, useContext, useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
  }>({ 
    isAuthenticated: false, 
    isLoading: true,
    user: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const { data } = await fetchData<{ 
          isValid: boolean; 
          user?: User 
        }>('/auth/verify', { method: 'POST' });

        if (data.isValid && data.user) {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: data.user
          });
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        handleLogout();
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null
      });
      navigate('/login', { replace: true });
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && e.oldValue && !e.newValue) {
        handleLogout();
      }
    };

    const handleSessionExpired = () => {
      handleLogout();
    };

    checkAuth();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('session-expired', handleSessionExpired);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('session-expired', handleSessionExpired);
    };
  }, [navigate]);

  const login = (token: string, userData: User) => {
    localStorage.setItem('authToken', token);
    setAuthState({
      isAuthenticated: true,
      isLoading: false,
      user: userData
    });
    navigate('/'); // Redirige a home después de login
  };

  const logout = async () => {
    try {
      await fetchData('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null
      });
      navigate('/login', { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}