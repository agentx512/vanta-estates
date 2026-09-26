import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Locale } from "./i18n";

export function pageMetadata(locale: Locale, path: string, title: string, description: string, image = "/images/hero.webp"): Metadata {
  const localizedPath = `/${locale}${path}`;
  return {
    metadataBase: new URL(site.url),
    title: `${title} | VANTA ESTATES`,
    description,
    alternates: {
      canonical: localizedPath,
      languages: { en: `/en${path}`, ar: `/ar${path}` },
    },
    openGraph: { title: `${title} | VANTA ESTATES`, description, url: localizedPath, siteName: site.name, locale: locale === "ar" ? "ar_EG" : "en_US", type: "website", images: [{ url: image, width: 1600, height: 900 }] },
    twitter: { card: "summary_large_image", title: `${title} | VANTA ESTATES`, description, images: [image] },
  };
}
