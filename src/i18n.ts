import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    //debug: true,
    lng: "hi",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export const _get_i18Lang = () => {
  return i18n.language === "hi" ? "hindi" : "english";
};

export default i18n;
