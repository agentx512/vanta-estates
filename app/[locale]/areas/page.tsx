import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { areas } from "@/data/areas";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) return {}; const m = getCopy(locale); return pageMetadata(locale, "/areas", m.pages.areas, m.pages.areasIntro); }

export default async function AreasPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const m = getCopy(locale);
  return <main id="main" className="inner-page"><section className="page-intro container"><span className="eyebrow">VANTA / 003 / ATLAS</span><div className="page-intro-row"><h1>{m.pages.areas}</h1><p>{m.pages.areasIntro}</p></div><div className="page-intro-meta"><span>EGYPT / PLACE INDEX</span><span>05 / PRIME AREAS</span></div></section><section className="container areas-grid">{areas.map((area, index) => { const count = properties.filter((property) => property.areaSlug === area.slug).length; return <article className="area-card" key={area.slug}><Link href={`/${locale}/areas/${area.slug}`}><div className="area-card-image"><Image src={area.image} alt={locale === "ar" ? area.nameAr : area.name} fill sizes="(max-width: 767px) 100vw, 50vw"/><span>0{index + 1} / 05</span></div><div className="area-card-heading"><div><span>{locale === "ar" ? area.regionAr : area.region}</span><h2>{locale === "ar" ? area.nameAr : area.name}</h2></div><ArrowUpRight size={23}/></div><p>{locale === "ar" ? area.descriptionAr : area.description}</p><div className="area-card-facts"><span>{count} {locale === "ar" ? "عقارات" : "properties"}</span><span>{m.common.from} {formatPrice(area.from, locale, true)}</span></div></Link></article>; })}</section></main>;
}
