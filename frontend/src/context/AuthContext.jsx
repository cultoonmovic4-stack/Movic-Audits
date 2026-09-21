import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext({
  user: null,
  status: 'loading', // 'loading' | 'authenticated' | 'unauthenticated'
  error: null,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
  clearError: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setStatus('loading');
      const response = await authService.getMe();
      if (response && response.data) {
        setUser(response.data);
        setStatus('authenticated');
        setError(null);
        return response.data;
      } else {
        setUser(null);
        setStatus('unauthenticated');
        return null;
      }
    } catch (err) {
      setUser(null);
      setStatus('unauthenticated');
      // 401 is an expected state for guest visitors, not a system failure
      if (err.status !== 401) {
        setError(err.message || 'Authentication check failed.');
      }
      return null;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    try {
      setStatus('loading');
      setError(null);
      const loginResponse = await authService.login(credentials);
      
      // Fetch full user record after successful authentication
      const meResponse = await authService.getMe();
      const authenticatedUser = meResponse?.data || loginResponse?.data?.user;
      
      setUser(authenticatedUser);
      setStatus('authenticated');
      return authenticatedUser;
    } catch (err) {
      setUser(null);
      setStatus('unauthenticated');
      const errorMessage = err.message || 'Invalid credentials or login failure.';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setStatus('loading');
      await authService.logout();
    } catch (err) {
      console.warn('Logout request completed with notice:', err.message);
    } finally {
      setUser(null);
      setStatus('unauthenticated');
      setError(null);
    }
  };

  const value = {
    user,
    status,
    error,
    login,
    logout,
    checkAuth,
    clearError,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
