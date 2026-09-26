import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { getCopy, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { whatsappUrl } from "@/lib/whatsapp";
import { ContactInquiry } from "@/components/contact/ContactInquiry";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; if (!isLocale(locale)) return {}; const m = getCopy(locale); return pageMetadata(locale, "/contact", m.nav.contact, m.pages.contactIntro); }

export default async function ContactPage({ params }: Props) {
  const { locale } = await params; if (!isLocale(locale)) notFound(); const m = getCopy(locale);
  return <main id="main" className="inner-page"><section className="page-intro container"><span className="eyebrow">VANTA / 005 / INQUIRY</span><div className="page-intro-row"><h1>{m.pages.contact}</h1><p>{m.pages.contactIntro}</p></div><div className="page-intro-meta"><span>DIRECT / WHATSAPP HANDOFF</span><span>EG / 001</span></div></section><section className="container contact-layout"><div className="contact-form-shell"><span className="eyebrow">01 / {m.common.requestViewing}</span><h2>{locale === "ar" ? "أخبرنا بما تبحث عنه." : "Tell us what you're looking for."}</h2><ContactInquiry locale={locale}/></div><aside className="contact-info-panel"><span className="eyebrow">VANTA / CONTACT POINTS</span><h2>{m.common.talkAdvisor}</h2><p>{locale === "ar" ? "ابدأ بمحادثة مباشرة أو أرسل لنا رسالة." : "Start a direct conversation or send us a note."}</p><div><span>WHATSAPP</span><a href={whatsappUrl(locale === "ar" ? "مرحبًا، أود الاستفسار عن عقارات فانتا." : "Hi, I'd like to inquire about Vanta Estates properties.")} target="_blank" rel="noopener noreferrer">{m.common.whatsapp}<ArrowUpRight size={18}/></a></div><div><span>EMAIL</span><a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={18}/></a></div><div><span>LOCATION</span><strong>{site.address[locale]}</strong></div><small>30.0444° N / 31.2357° E</small></aside></section></main>;
}
