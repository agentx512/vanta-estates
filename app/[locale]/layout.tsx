import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteWipe } from "@/components/motion/RouteWipe";
import { isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = { icons: { icon: "/favicon.svg" } };

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}><body className={locale === "ar" ? "locale-ar" : "locale-en"}>
    <RouteWipe />
    <a className="skip-link" href="#main">{locale === "ar" ? "تخطي إلى المحتوى" : "Skip to content"}</a>
    <Header locale={locale} />
    {children}
    <Footer locale={locale} />
  </body></html>;
}
