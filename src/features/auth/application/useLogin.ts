import { useMutation } from '@tanstack/react-query';
import { authApi } from '../data/authApi';
import { useAuth } from '../../../core/providers/AuthProvider';
import { LoginDto } from '../types/auth.types';
import { useRouter } from 'expo-router';

export const useLogin = () => {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: async (response) => {
      await login(response.accessToken, response.refreshToken, response.user);
      // Navigate to main tabs after successful login
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      console.error('Login failed', error);
      // You can handle global error toast here
    },
  });
};
