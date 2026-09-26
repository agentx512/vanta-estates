import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { developments, developmentBySlug } from "@/data/developments";
import { properties } from "@/data/properties";
import { areaBySlug } from "@/data/areas";
import { formatPrice } from "@/lib/format";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PropertyCard } from "@/components/property/PropertyCard";
import { AreaMap } from "@/components/map/AreaMap";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() { return ["en", "ar"].flatMap((locale) => developments.map((development) => ({ locale, slug: development.slug }))); }
export async function generateMetadata({ params }: Props) { const { locale, slug } = await params; const development = developmentBySlug(slug); if (!isLocale(locale) || !development) return {}; return pageMetadata(locale, `/developments/${slug}`, locale === "ar" ? development.nameAr : development.name, locale === "ar" ? development.descriptionAr : development.description, development.image); }

export default async function DevelopmentPage({ params }: Props) {
  const { locale, slug } = await params; if (!isLocale(locale)) notFound(); const development = developmentBySlug(slug); if (!development) notFound();
  const m = getCopy(locale); const area = areaBySlug(development.areaSlug); const homes = properties.filter((property) => property.developmentSlug === slug);
  return <main id="main" className="inner-page"><div className="container detail-breadcrumb"><Link href={`/${locale}/developments`}>{m.nav.developments}</Link><span>/</span><span>{locale === "ar" ? development.nameAr : development.name}</span></div><section className="development-detail-hero"><Image src={development.image} alt={locale === "ar" ? development.nameAr : development.name} fill priority sizes="100vw"/><div className="development-detail-shade"/><div className="container"><span className="eyebrow">VANTA / DEVELOPMENT 0{developments.indexOf(development) + 1}</span><h1>{locale === "ar" ? development.nameAr : development.name}</h1><p>{locale === "ar" ? area?.nameAr : area?.name} / {locale === "ar" ? development.typeAr : development.type}</p></div></section><section className="container development-detail-summary"><div><span className="eyebrow">PROJECT PROFILE</span><h2>{locale === "ar" ? development.descriptionAr : development.description}</h2></div><dl><div><dt>{locale === "ar" ? "المطور" : "Developer"}</dt><dd>{locale === "ar" ? development.developerAr : development.developer}</dd></div><div><dt>{m.common.startingFrom}</dt><dd dir="ltr">{formatPrice(development.from, locale, true)}</dd></div><div><dt>{locale === "ar" ? "خطة السداد" : "Payment plan"}</dt><dd>{development.downPayment} / {development.years}</dd></div><div><dt>{m.common.delivery}</dt><dd>{development.delivery}</dd></div></dl></section><section className="container development-detail-location"><div><span className="eyebrow">VANTA / LOCATION</span><h2>{locale === "ar" ? "مصمم حول المكان." : "Defined by its place."}</h2><p>{locale === "ar" ? area?.descriptionAr : area?.description}</p><Link className="under-link" href={`/${locale}/areas/${area?.slug}`}>{m.common.viewArea}<ArrowUpRight size={18}/></Link></div><AreaMap active={development.areaSlug} locale={locale} compact/></section><section className="related-section section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">VANTA / AVAILABLE HOMES</span><h2>{locale === "ar" ? "اكتشف الوحدات." : "Explore the collection."}</h2></div></div><div className="related-grid">{homes.map((property) => <PropertyCard key={property.slug} property={property} locale={locale}/>)}</div></div></section><section className="development-detail-cta container"><div><span className="eyebrow">NEXT STEP / 001</span><h2>{m.home.ctaTitle2}</h2></div><a className="btn btn-blue" href={whatsappUrl(locale === "ar" ? `مرحبًا، أود معرفة المزيد عن مشروع ${development.nameAr}.` : `Hi, I'd like to learn more about ${development.name}.`)} target="_blank" rel="noopener noreferrer">{m.common.talkAdvisor}<ArrowUpRight size={18}/></a></section></main>;
}
