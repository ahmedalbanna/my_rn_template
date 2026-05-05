import { create } from 'zustand';
import { AppStorage, storageKeys } from '../storage/storage';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, refreshToken: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  initAuth: async () => {
    try {
      const storedUser = await AppStorage.getItem(storageKeys.USER_DATA);
      const storedToken = await AppStorage.getItem(storageKeys.ACCESS_TOKEN);
      
      if (storedUser && storedToken) {
        set({ 
          user: JSON.parse(storedUser), 
          token: storedToken,
          isLoading: false 
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to init auth', error);
      set({ isLoading: false });
    }
  },

  login: async (token, refreshToken, user) => {
    await AppStorage.setItem(storageKeys.ACCESS_TOKEN, token);
    await AppStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);
    await AppStorage.setItem(storageKeys.USER_DATA, JSON.stringify(user));
    set({ user, token, isLoading: false });
  },

  logout: async () => {
    await AppStorage.removeItem(storageKeys.ACCESS_TOKEN);
    await AppStorage.removeItem(storageKeys.REFRESH_TOKEN);
    await AppStorage.removeItem(storageKeys.USER_DATA);
    set({ user: null, token: null, isLoading: false });
  },

  updateUser: async (user) => {
    await AppStorage.setItem(storageKeys.USER_DATA, JSON.stringify(user));
    set({ user });
  },
}));
