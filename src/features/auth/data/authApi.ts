import apiClient from '../../../core/api/apiClient';
import { LoginDto, AuthResponse, RegisterDto } from '../types/auth.types';

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    // In a real app: const response = await apiClient.post<AuthResponse>('/auth/login', data);
    // return response.data;
    
    // Mock response for template
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token',
          user: {
            id: '1',
            email: data.email,
            name: 'John Doe',
            role: 'admin',
          },
        });
      }, 1000);
    });
  },
  
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
