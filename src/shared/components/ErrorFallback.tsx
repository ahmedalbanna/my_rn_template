import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppButton } from './AppButton';
import { useTheme } from '../../core/theme/ThemeContext';

interface ErrorFallbackProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={[styles.title, typography.h2, { color: colors.error.main }]}>
        Oops! Something went wrong.
      </Text>
      <Text style={[styles.message, typography.body1, { color: colors.text.secondary, marginTop: spacing.sm }]}>
        {error?.message || 'An unexpected error occurred.'}
      </Text>
      <AppButton
        title="Try Again"
        onPress={resetErrorBoundary}
        style={{ marginTop: spacing.lg }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
