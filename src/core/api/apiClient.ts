import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { AppStorage, storageKeys } from '../storage/storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AppStorage.getItem(storageKeys.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AppStorage.getItem(storageKeys.REFRESH_TOKEN);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, newRefreshToken } = response.data;

        // Save new tokens
        await AppStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
        if (newRefreshToken) {
          await AppStorage.setItem(storageKeys.REFRESH_TOKEN, newRefreshToken);
        }

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, logout user
        await AppStorage.removeItem(storageKeys.ACCESS_TOKEN);
        await AppStorage.removeItem(storageKeys.REFRESH_TOKEN);
        // You might want to trigger a navigation to Login here or use an event emitter
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
