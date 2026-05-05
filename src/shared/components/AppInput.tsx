import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../core/theme/ThemeContext';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colors, typography, spacing, borderRadius } = useTheme();

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            typography.body2,
            { color: colors.text.primary, marginBottom: spacing.xs },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: colors.divider,
            borderRadius: borderRadius.md,
            backgroundColor: colors.background.paper,
            paddingHorizontal: spacing.sm,
          },
          isFocused && { borderColor: colors.primary.main },
          error ? { borderColor: colors.error.main } : null,
        ]}
      >
        {leftIcon && <View style={[styles.iconLeft, { marginRight: spacing.sm }]}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, typography.body1, { color: colors.text.primary }, inputStyle]}
          placeholderTextColor={colors.text.disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <View style={[styles.iconRight, { marginLeft: spacing.sm }]}>{rightIcon}</View>}
      </View>
      {error && (
        <Text style={[styles.errorText, typography.caption, { color: colors.error.main, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 48,
  },
  errorText: {},
  iconLeft: {},
  iconRight: {},
});
