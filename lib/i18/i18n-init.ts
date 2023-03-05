import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "lib/api/axios";

(async () => {
  const { data: languageCodes } = await axios.get("/api/locale/languages/list");
  await axios.post("/api/locale/terms/list", { languages: languageCodes });
})();

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  // resources: require("/translations/all.json"), // to use a single resource for all languages; not recommended
  resources: {
    en: {
      translation: require("/translations/en.json"), // Load translations at startup
    },
    fa: {
      translation: require("/translations/fa.json"),
    },
  },
  backend: {
    referenceLng: "en",
    loadPath: "/api/locale/terms/list",
  },
});

export default i18n;
