import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  // resources: require("/translations/all.json"), // to use a single resource for all languages; not recommended
  resources: {
    en: {
      translation: require("/public/locale/translations/en-translations.json"), // Load translations at startup
    },
    fa: {
      translation: require("/public/locale/translations/fa-translations.json"),
    },
  },
});

export default i18n;
