// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enHome from './en/home.json';
import thHome from './th/home.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: enHome,
  },
  th: {
    translation: thHome,
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', 
    fallbackLng: 'en',
    defaultNS,
    ns: ['translation'],
    resources,
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
