import { useLanguage } from '../contexts/LanguageContext';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

const translations = { es, en };

export const useTranslation = () => {
  const { lang } = useLanguage();
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? key;
  };
  return { t, lang };
};