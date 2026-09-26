import { site } from "@/config/site";
import type { Property } from "@/data/properties";
import { areaBySlug } from "@/data/areas";
import type { Locale } from "./i18n";

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function propertyMessage(property: Property, locale: Locale, name?: string, phone?: string, date?: string) {
  const area = areaBySlug(property.areaSlug);
  const intro = locale === "ar"
    ? `مرحبًا، أنا مهتم بعقار ${property.titleAr} (${property.code}) في ${area?.nameAr || "مصر"}. أود معرفة المزيد وترتيب معاينة.`
    : `Hi, I'm interested in ${property.title} (${property.code}) in ${area?.name || "Egypt"}. I'd like to know more and arrange a viewing.`;
  const details = locale === "ar"
    ? [name && `الاسم: ${name}`, phone && `الهاتف: ${phone}`, date && `الموعد المفضل: ${date}`]
    : [name && `Name: ${name}`, phone && `Phone: ${phone}`, date && `Preferred date: ${date}`];
  return [intro, ...details.filter(Boolean)].join("\n");
}
