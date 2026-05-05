import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

/**
 * Note: We are using AsyncStorage for better compatibility with Expo Go.
 * In a production environment with a development build, you can switch 
 * back to react-native-mmkv for better performance.
 */
export const AppStorage = {
  setItem: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },
  getItem: async (key: string) => {
    return await AsyncStorage.getItem(key);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  clearAll: async () => {
    await AsyncStorage.clear();
  },
};
