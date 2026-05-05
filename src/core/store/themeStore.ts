import { create } from 'zustand';
import { Appearance } from 'react-native';
import { AppStorage, storageKeys } from '../storage/storage';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
  initTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',

  initTheme: async () => {
    const storedTheme = await AppStorage.getItem(storageKeys.THEME) as 'light' | 'dark' | 'system' | null;
    if (storedTheme) {
      set({ theme: storedTheme });
    }
  },

  setTheme: async (theme) => {
    await AppStorage.setItem(storageKeys.THEME, theme);
    set({ theme });
  },
}));

export const getActiveTheme = (theme: 'light' | 'dark' | 'system') => {
  if (theme === 'system') {
    return Appearance.getColorScheme() || 'light';
  }
  return theme;
};
