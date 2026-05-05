import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginDto } from '../types/auth.types';
import { useLogin } from '../application/useLogin';
import { AppButton } from '../../../shared/components/AppButton';
import { AppInput } from '../../../shared/components/AppInput';
import { useTheme } from '../../../core/theme/ThemeContext';
import { Mail, Lock } from 'lucide-react-native';

export const LoginUI: React.FC = () => {
  const { mutate: login, isPending } = useLogin();
  const { colors, typography, spacing } = useTheme();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginDto) => {
    login(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <ScrollView contentContainerStyle={[styles.scrollContent, { padding: spacing.lg }]}>
        <View style={[styles.header, { marginBottom: spacing.xxl }]}>
          <Text style={[styles.title, typography.h1, { color: colors.text.primary }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, typography.body1, { color: colors.text.secondary, marginTop: spacing.xs }]}>
            Sign in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Email Address"
                placeholder="enter your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={20} color={colors.text.secondary} />}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Password"
                placeholder="enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                secureTextEntry
                leftIcon={<Lock size={20} color={colors.text.secondary} />}
              />
            )}
          />

          <AppButton
            title="Sign In"
            onPress={handleSubmit(onSubmit)}
            isLoading={isPending}
            style={[styles.submitButton, { marginTop: spacing.lg }]}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {},
  subtitle: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  submitButton: {},
});
