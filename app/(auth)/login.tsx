import { LoginUI } from '../../src/features/auth/presentation/LoginUI';
import { Stack } from 'expo-router';

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginUI />
    </>
  );
}
