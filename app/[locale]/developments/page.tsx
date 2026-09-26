import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { developments } from "@/data/developments";
import { areaBySlug } from "@/data/areas";
import { formatPrice } from "@/lib/format";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) return {}; const m = getCopy(locale); return pageMetadata(locale, "/developments", m.pages.developments, m.pages.developmentsIntro); }

export default async function DevelopmentsPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const m = getCopy(locale);
  return <main id="main" className="inner-page"><section className="page-intro container"><span className="eyebrow">VANTA / 002 / MASTERPLANS</span><div className="page-intro-row"><h1>{m.pages.developments}</h1><p>{m.pages.developmentsIntro}</p></div><div className="page-intro-meta"><span>EGYPT / PROJECT INDEX</span><span>04 / DEVELOPMENTS</span></div></section><section className="container development-list">{developments.map((development, index) => { const area = areaBySlug(development.areaSlug); return <article className="development-list-row" key={development.slug}><Link href={`/${locale}/developments/${development.slug}`} className="development-list-image"><Image src={development.image} alt={locale === "ar" ? development.nameAr : development.name} fill sizes="(max-width: 767px) 100vw, 40vw"/><span>0{index + 1} / 04</span></Link><div className="development-list-content"><span className="eyebrow">PROJECT 0{index + 1} / {locale === "ar" ? area?.nameAr : area?.name}</span><h2><Link href={`/${locale}/developments/${development.slug}`}>{locale === "ar" ? development.nameAr : development.name}</Link></h2><p>{locale === "ar" ? development.descriptionAr : development.description}</p><dl><div><dt>{locale === "ar" ? "المطور" : "Developer"}</dt><dd>{locale === "ar" ? development.developerAr : development.developer}</dd></div><div><dt>{m.common.startingFrom}</dt><dd dir="ltr">{formatPrice(development.from, locale, true)}</dd></div><div><dt>{m.common.delivery}</dt><dd>{development.delivery}</dd></div><div><dt>{locale === "ar" ? "خطة السداد" : "Payment plan"}</dt><dd>{development.downPayment} / {development.years}</dd></div></dl><Link className="under-link" href={`/${locale}/developments/${development.slug}`}>{m.common.viewDevelopment}<ArrowUpRight size={18}/></Link></div></article>; })}</section></main>;
}
