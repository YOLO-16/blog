import { createContext, useContext, useMemo, useState } from 'react';
import { apiRequest } from '../services/apiClient.js';

const AuthContext = createContext(null);

const getStoredAuth = () => {
  try {
    const data = localStorage.getItem('portfolio-auth');
    if (!data) return { token: null, user: null };
    return JSON.parse(data);
  } catch {
    return { token: null, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const { token: storedToken, user: storedUser } = getStoredAuth();
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(storedUser);
  const [authLoading, setAuthLoading] = useState(false);

  const persist = (nextUser, nextToken) => {
    setUser(nextUser);
    setToken(nextToken);
    if (nextToken) {
      localStorage.setItem('portfolio-auth', JSON.stringify({ user: nextUser, token: nextToken }));
    } else {
      localStorage.removeItem('portfolio-auth');
    }
  };

  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      const data = await apiRequest('/api/users/login', { method: 'POST', data: credentials });
      persist(data.user, data.token);
      return data.user;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (payload) => {
    setAuthLoading(true);
    try {
      const data = await apiRequest('/api/users/register', { method: 'POST', data: payload });
      persist(data.user, data.token);
      return data.user;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => persist(null, null);

  const value = useMemo(
    () => ({
      user,
      token,
      authLoading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
