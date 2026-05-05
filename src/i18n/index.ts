import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const initI18n = async () => {
  let languageCode = Localization.getLocales()[0].languageCode || 'en';
  
  // Ensure we only use supported languages
  if (languageCode !== 'ar' && languageCode !== 'en') {
    languageCode = 'en';
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: languageCode,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  // Handle RTL for Arabic
  const isRTL = languageCode === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // Note: In a real app, you might need to reload the app here
  }
};

initI18n();

export default i18n;
