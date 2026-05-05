import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return <>{children}</>;
};

export const useAuth = () => {
  const { user, isLoading, login, logout, updateUser } = useAuthStore();
  return { user, isLoading, login, logout, updateUser };
};
