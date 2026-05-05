# React Native Production Template (Expo)

A scalable, professional, and feature-first React Native boilerplate built with Expo, TypeScript, and Clean Architecture principles.

## 🚀 Key Features

- **Framework**: [Expo](https://expo.dev/) with [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing).
- **Architecture**: Feature-First & Clean Architecture layers (`core`, `features`, `shared`).
- **State Management**:
  - **Server State**: [TanStack Query (React Query)](https://tanstack.com/query/latest).
  - **Client State**: [Zustand](https://github.com/pmndrs/zustand) for global stores (Auth, Theme).
- **Networking**: [Axios](https://axios-http.com/) with JWT interceptors & auto-refresh token logic.
- **Styling**: Standard `StyleSheet` with a dynamic `useTheme` hook (supporting Light/Dark modes).
- **Storage**: Synchronous-ready abstraction with `MMKV` (production) and `AsyncStorage` (Expo Go compatibility).
- **Localization**: `i18next` with RTL support for Arabic and English.
- **Validation**: `Zod` with `react-hook-form`.
- **Hooks**: Custom hooks for `useNetworkStatus`, `useAppState`, `useDebounce`.

---

## 📁 Directory Structure

```text
my_rn_template/
├── app/                     # Navigation (Expo Router)
│   ├── (auth)/              # Authentication screens
│   ├── (tabs)/              # Main app tabs
│   └── _layout.tsx          # Root layout with providers
├── src/
│   ├── core/                # Infrastructure & Global Utilities
│   │   ├── api/             # Axios client & Types
│   │   ├── hooks/           # App-wide custom hooks
│   │   ├── providers/       # Context & Store initializers
│   │   ├── store/           # Zustand stores (Auth, Theme)
│   │   ├── theme/           # Design system (Colors, Typography)
│   │   └── storage/         # Storage abstraction
│   ├── features/            # Feature-based business logic
│   │   ├── auth/            # Auth feature (Login, Register)
│   │   └── home/            # Home feature
│   ├── shared/              # Reusable UI components
│   └── i18n/                # Localization (Translations)
└── assets/                  # Fonts, Images, Animations
```

---

## 🛠️ Core Modules

### 🔐 Authentication
Managed via `useAuthStore` (Zustand). It handles user session, tokens, and persistence. Protected routes are automatically handled by the `AuthGuard` in `app/_layout.tsx`.

### 🎨 Theme System
Use the `useTheme()` hook in any component to access colors, spacing, and typography.
```tsx
const { colors, spacing } = useTheme();
```

### 🌐 API Client
Configured in `src/core/api/apiClient.ts`. It includes:
- Automatic Bearer Token injection.
- Automatic 401 handling (Refresh Token flow).
- Standardized response types (`ApiResponse<T>`).

### 🌍 Localization
Supported out-of-the-box. Add new keys in `src/i18n/locales/`. Use the `useTranslation` hook:
```tsx
const { t } = useTranslation();
return <Text>{t('auth.welcome')}</Text>;
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file (see `.env.example`):
```text
EXPO_PUBLIC_API_URL=https://api.yourdomain.com
```

### 3. Run the Project
```bash
# Start Metro with cache clearing
npx expo start -c
```

---

## 📦 Production & Deployment

- **EAS Build**: The template is ready for [EAS Build](https://docs.expo.dev/build/introduction/).
- **Native Modules**: If you add native modules (like MMKV in production), use `npx expo run:android` or `npx expo run:ios` to create a Development Build.

---

## ⚖️ Best Practices
1. **Business Logic**: Keep it in `features/[name]/application` (hooks).
2. **UI Components**: Keep them logic-less in `features/[name]/presentation`.
3. **Shared Components**: Add generic UI elements to `src/shared/components`.
4. **Types**: Always define DTOs and Entities in `features/[name]/types`.
