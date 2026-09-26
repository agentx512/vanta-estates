import { notFound } from "next/navigation";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { filtersFromParams } from "@/lib/filters";
import { PropertyExplorer } from "@/components/filters/PropertyExplorer";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) return {}; const m = getCopy(locale); return pageMetadata(locale, "/properties", m.pages.properties, m.pages.propertiesIntro); }

export default async function PropertiesPage({ params, searchParams }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const m = getCopy(locale);
  const filters = filtersFromParams(await searchParams);
  return <main id="main" className="inner-page"><section className="page-intro container"><span className="eyebrow">VANTA / 001 / DISCOVER</span><div className="page-intro-row"><h1>{m.pages.properties}</h1><p>{m.pages.propertiesIntro}</p></div><div className="page-intro-meta"><span>EGYPT / SELECTED ADDRESSES</span><span>10 / {m.pages.found}</span></div></section><PropertyExplorer locale={locale} initialFilters={filters}/></main>;
}
