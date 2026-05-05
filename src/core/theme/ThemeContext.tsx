import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';
import { useThemeStore, getActiveTheme } from '../store/themeStore';

type Theme = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  isDark: boolean;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, initTheme } = useThemeStore();
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const activeTheme = getActiveTheme(theme);
  const isDark = activeTheme === 'dark';

  const themeValue: Theme = {
    colors: colors, // Support for dark colors can be added here
    typography,
    spacing,
    borderRadius,
    isDark,
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
