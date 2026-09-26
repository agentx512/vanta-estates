import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, MapPin, MoveUpRight } from "lucide-react";
import { isLocale, getCopy } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { properties } from "@/data/properties";
import { developments } from "@/data/developments";
import { areaBySlug } from "@/data/areas";
import { formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import { HeroSearch } from "@/components/home/HeroSearch";
import { MarketRail } from "@/components/home/MarketRail";
import { AreaExplorer } from "@/components/home/AreaExplorer";
import { DevelopmentIndex } from "@/components/home/DevelopmentIndex";
import { SmartMatcher } from "@/components/home/SmartMatcher";
import { PropertyCard } from "@/components/property/PropertyCard";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) return {};
  return pageMetadata(locale, "", locale === "ar" ? "اعثر على عنوانك القادم" : "Find your next address", locale === "ar" ? "اكتشف عقارات ومشروعات ومناطق مختارة في مصر عبر تجربة عقارية أوضح." : "Discover curated properties, developments, and places across Egypt with greater clarity.");
}

export default async function Home({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const m = getCopy(locale);
  const featured = [properties[0], properties[1], properties[2], properties[3]];
  const development = developments[0];
  const area = areaBySlug(development.areaSlug);
  return <main id="main">
    <section className="hero" aria-labelledby="hero-title"><div className="hero-photo"><Image src="/images/hero.webp" alt={locale === "ar" ? "تصور معماري لمبنى سكني معاصر في القاهرة الجديدة" : "Contemporary residential architecture concept in New Cairo"} fill priority sizes="(max-width: 767px) 100vw, 72vw"/><div className="hero-photo-shade"/><div className="hero-image-data"><span>{m.hero.imageLabel}</span><strong dir="ltr">30.0131° N<br/>31.4913° E</strong><span>VANTA / LOC-001</span></div></div><div className="hero-technical-grid" aria-hidden="true"/><div className="container hero-content"><div className="hero-text"><span className="eyebrow hero-eyebrow"><span className="pulse-dot"/>{m.hero.eyebrow}</span><h1 id="hero-title"><span>{m.hero.title1}</span><span>{m.hero.title2}</span></h1><p>{m.hero.description}</p><div className="hero-links"><Link href={`/${locale}/properties`} className="hero-text-link">{m.common.explore}<ArrowUpRight size={17}/></Link><Link href={`/${locale}/areas`} className="hero-text-link secondary">{m.hero.discover}<MoveUpRight size={17}/></Link></div></div><div className="hero-bottom-label"><span>001 / DISCOVERY</span><a href="#featured"><ArrowDown size={17}/>{m.hero.scroll}</a></div></div><HeroSearch locale={locale}/></section>
    <MarketRail locale={locale}/>
    <section id="featured" className="featured-section section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">{m.home.featuredEyebrow}</span><h2>{m.home.featuredTitle}</h2></div><div className="section-head-side"><p>{m.home.featuredIntro}</p><Link className="under-link" href={`/${locale}/properties`}>{m.common.allProperties}<ArrowUpRight size={17}/></Link></div></div><div className="featured-grid">{featured.map((property, index) => <PropertyCard key={property.slug} property={property} locale={locale} featured={index === 0}/>)}</div></div></section>
    <AreaExplorer locale={locale}/>
    <DevelopmentIndex locale={locale}/>
    <section className="development-story"><Image src={development.image} alt={locale === "ar" ? development.nameAr : development.name} fill sizes="100vw"/><div className="development-story-shade"/><div className="container development-story-inner"><div className="development-story-copy"><span className="eyebrow">{m.home.storyEyebrow} / 001</span><h2>{m.home.storyTitle}</h2><p>{locale === "ar" ? development.descriptionAr : development.description}</p><Link className="btn btn-light" href={`/${locale}/developments/${development.slug}`}>{m.common.viewDevelopment}<ArrowUpRight size={19}/></Link></div><div className="development-story-data"><span>SOLIS DISTRICT / NEW CAIRO</span><div><small>{m.common.startingFrom}</small><strong dir="ltr">{formatPrice(development.from, locale, true)}</strong></div><div><small>{locale === "ar" ? "خطة السداد" : "Payment plan"}</small><strong>{development.downPayment} / {development.years}</strong></div><div><small>{m.common.delivery}</small><strong>{development.delivery}</strong></div><div><small>{locale === "ar" ? "الموقع" : "Location"}</small><strong><MapPin size={15}/>{locale === "ar" ? area?.nameAr : area?.name}</strong></div></div></div></section>
    <SmartMatcher locale={locale}/>
    <section className="why-section section-space"><div className="container why-grid"><div><span className="eyebrow">{m.home.whyEyebrow}</span><h2>{m.home.whyTitle}</h2><div className="why-coordinate">30.0444° N<br/>31.2357° E</div></div><div className="why-points">{m.why.map((item, index) => <div className="why-point" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight size={18}/></div>)}</div></div></section>
    <section className="final-cta"><div className="container final-cta-inner"><span className="eyebrow">VANTA / NEXT STEP</span><h2>{m.home.ctaTitle1}<br/>{m.home.ctaTitle2}</h2><p>{m.home.ctaText}</p><div className="final-cta-actions"><Link className="btn btn-blue" href={`/${locale}/contact`}>{m.common.requestViewing}<ArrowUpRight size={19}/></Link><a className="btn btn-outline-light" href={whatsappUrl(locale === "ar" ? "مرحبًا، أود ترتيب معاينة لعقار من فانتا." : "Hi, I'd like to arrange a property viewing with Vanta Estates.")} target="_blank" rel="noopener noreferrer">{m.common.whatsapp}<ArrowUpRight size={19}/></a></div><span className="final-cta-mark" aria-hidden="true">V/</span></div></section>
  </main>;
}
