import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) return {}; const m = getCopy(locale); return pageMetadata(locale, "/about", m.nav.about, m.pages.aboutIntro); }

export default async function AboutPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const m = getCopy(locale);
  return <main id="main" className="inner-page"><section className="page-intro container"><span className="eyebrow">VANTA / 004 / THE APPROACH</span><div className="page-intro-row"><h1>{m.pages.about}</h1><p>{m.pages.aboutIntro}</p></div><div className="page-intro-meta"><span>DISCOVER / COMPARE / VISIT / DECIDE</span><span>EG / 001</span></div></section><section className="about-visual"><Image src="/images/hero.webp" alt={locale === "ar" ? "تصور معماري لمبنى سكني معاصر" : "Contemporary residential architecture concept"} fill priority sizes="100vw"/><div className="about-visual-overlay"><span>VANTA / ESTATES</span><strong>30.0444° N<br/>31.2357° E</strong></div></section><section className="about-statement container"><span className="eyebrow">WHY VANTA / 001</span><h2>{m.about.statement}</h2><p>{m.about.note}</p></section><section className="about-process section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">VANTA / THE JOURNEY</span><h2>{locale === "ar" ? "أربع خطوات أوضح." : "Four clearer steps."}</h2></div></div><div className="about-steps">{m.about.steps.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={19}/></article>)}</div></div></section><section className="about-last container"><div><span className="eyebrow">NEXT / 001</span><h2>{m.home.ctaTitle2}</h2></div><Link className="btn btn-blue" href={`/${locale}/properties`}>{m.common.explore}<ArrowUpRight size={18}/></Link></section></main>;
}
