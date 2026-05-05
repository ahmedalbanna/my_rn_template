import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/src/core/providers/AuthProvider';
import { AppButton } from '@/src/shared/components/AppButton';
import { useTheme } from '@/src/core/theme/ThemeContext';

export default function TabOneScreen() {
  const { logout, user } = useAuth();
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.default }]}>
      <Text style={[styles.title, typography.h2, { color: colors.text.primary }]}>
        Welcome, {user?.name || 'Guest'}
      </Text>
      <View style={[styles.separator, { backgroundColor: colors.divider }]} />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      
      <AppButton 
        title="Logout" 
        onPress={logout} 
        variant="outline" 
        style={[styles.logoutBtn, { marginTop: spacing.lg }]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {},
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logoutBtn: {
    width: '60%',
  },
});
