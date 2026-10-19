import type en from "./en.json";

// Add a language: drop a <code>.json next to en.json and register it here.
const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  ar: () => import("./ar.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "en";
export const rtlLocales: readonly Locale[] = ["ar"];

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

export const getDictionary = (locale: Locale): Promise<Dictionary> => dictionaries[locale]();

export const dirFor = (locale: Locale) => (rtlLocales.includes(locale) ? "rtl" : "ltr");
