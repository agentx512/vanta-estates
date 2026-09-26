import type { Locale } from "./i18n";

export function formatPrice(price: number, locale: Locale, compact = false) {
  if (compact) return `${locale === "ar" ? "ج.م" : "EGP"} ${(price / 1000000).toFixed(1)}M`;
  return `${locale === "ar" ? "ج.م" : "EGP"} ${new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(price)}`;
}

export function localizedNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(value);
}
