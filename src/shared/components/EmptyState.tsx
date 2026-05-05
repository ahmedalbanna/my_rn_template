import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../core/theme/ThemeContext';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.title, typography.h3, { color: colors.text.primary }]}>
        {title}
      </Text>
      {message && (
        <Text style={[styles.message, typography.body2, { color: colors.text.secondary, marginTop: spacing.xs }]}>
          {message}
        </Text>
      )}
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
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
