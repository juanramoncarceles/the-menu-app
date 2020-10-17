export const locales = ["en", "es"] as const;

export const languageNames: {[key in typeof locales[number]]: string} = {
  en: "English",
  es: "Español",
} as const;
