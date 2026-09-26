import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { areas, areaBySlug } from "@/data/areas";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { AreaMap } from "@/components/map/AreaMap";
import { PropertyCard } from "@/components/property/PropertyCard";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return ["en", "ar"].flatMap((locale) => areas.map((area) => ({ locale, slug: area.slug }))); }
export async function generateMetadata({ params }: Props) { const { locale, slug } = await params; const area = areaBySlug(slug); if (!isLocale(locale) || !area) return {}; return pageMetadata(locale, `/areas/${slug}`, locale === "ar" ? area.nameAr : area.name, locale === "ar" ? area.descriptionAr : area.description, area.image); }

export default async function AreaPage({ params }: Props) {
  const { locale, slug } = await params; if (!isLocale(locale)) notFound(); const area = areaBySlug(slug); if (!area) notFound(); const m = getCopy(locale); const listings = properties.filter((property) => property.areaSlug === slug);
  return <main id="main" className="inner-page"><div className="container detail-breadcrumb"><Link href={`/${locale}/areas`}>{m.nav.areas}</Link><span>/</span><span>{locale === "ar" ? area.nameAr : area.name}</span></div><section className="area-detail-hero"><Image src={area.image} alt={locale === "ar" ? area.nameAr : area.name} fill priority sizes="100vw"/><div className="area-detail-shade"/><div className="container"><span className="eyebrow">VANTA / AREA 0{areas.indexOf(area) + 1}</span><h1>{locale === "ar" ? area.nameAr : area.name}</h1><p>{locale === "ar" ? area.regionAr : area.region} / {area.coordinates}</p></div></section><section className="container area-detail-overview"><div><span className="eyebrow">PLACE PROFILE / 001</span><h2>{locale === "ar" ? area.descriptionAr : area.description}</h2></div><div className="area-detail-stats"><div><strong>{listings.length.toString().padStart(2,"0")}</strong><span>{m.nav.properties}</span></div><div><strong dir="ltr">{formatPrice(area.from, locale, true)}</strong><span>{m.common.startingFrom}</span></div></div></section><section className="container area-detail-map"><div><span className="eyebrow">VANTA / AREA INTELLIGENCE</span><h2>{locale === "ar" ? "اعرف موقعك." : "Know your place."}</h2><p>{locale === "ar" ? "خريطة توضيحية للمقارنة بين مناطق التجربة." : "An illustrative map to compare the demo's selected locations."}</p></div><AreaMap active={area.slug} locale={locale} compact/></section><section className="related-section section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">VANTA / LOCAL LISTINGS</span><h2>{locale === "ar" ? "عقارات في المنطقة." : "Properties in the area."}</h2></div><Link className="under-link" href={`/${locale}/properties?location=${area.slug}`}>{m.common.viewAll}<ArrowUpRight size={17}/></Link></div><div className="related-grid">{listings.map((property) => <PropertyCard key={property.slug} property={property} locale={locale}/>)}</div></div></section></main>;
}
