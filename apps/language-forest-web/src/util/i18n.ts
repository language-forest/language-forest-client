import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, ko } from "@repo/shared/constant";
import { languageKey } from "@repo/shared/storage";

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
} as const;

const lng = (() => {
  const defaultLng = "en";
  const storedLanguage = localStorage.getItem(languageKey.language);
  if (storedLanguage) {
    return storedLanguage;
  }

  const browserLanguage = navigator.language;
  if (browserLanguage) {
    const shortLanguage = browserLanguage.slice(0, 2);

    return shortLanguage in resources ? shortLanguage : defaultLng;
  }

  return defaultLng;
})();

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
