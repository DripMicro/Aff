import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// import { missingKeyHandler } from "@/utils/i18n-utils";

const ns = ["common", "affiliate"];
const supportedLngs = ["en", "he", "zz"];
const resources = ns.reduce((acc, n) => {
  supportedLngs.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: require(`../public/locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {});

export const missingKeyHandler = (
  lngs: readonly string[],
  ns: string,
  key: string,
  fallbackValue: string,
  updateMissing: boolean,
  options: any
) => {
  console.log(`muly:missingKeyHandler`, { ns, key, fallbackValue });
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    // debug: true,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "common",
    ns,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
    resources,
    saveMissing: true,
    updateMissing: true,
    saveMissingTo: "all",
    missingKeyHandler,
  })
  .then((r) => {
    console.log(`muly:i18n init done`, { r });
  });

export default i18n;
