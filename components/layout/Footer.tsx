import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { getCopy, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer({ locale }: { locale: Locale }) {
  const m = getCopy(locale);
  return <footer className="site-footer"><div className="container">
    <div className="footer-main"><div className="footer-intro"><Link href={`/${locale}`} className="footer-brand">VANTA <span>ESTATES</span></Link><p>{m.footer.line}</p><div className="footer-grid-art" aria-hidden="true"><span className="footer-grid-dot"/></div></div>
      <nav aria-label={m.footer.navigate}><span className="footer-heading">{m.footer.navigate}</span><Link href={`/${locale}/properties`}>{m.nav.properties}</Link><Link href={`/${locale}/developments`}>{m.nav.developments}</Link><Link href={`/${locale}/areas`}>{m.nav.areas}</Link><Link href={`/${locale}/about`}>{m.nav.about}</Link><Link href={`/${locale}/contact`}>{m.nav.contact}</Link></nav>
      <div className="footer-contact"><span className="footer-heading">{m.footer.connect}</span><a href={`mailto:${site.email}`}>{site.email}</a><a href={whatsappUrl(locale === "ar" ? "مرحبًا، أود معرفة المزيد عن عقارات فانتا." : "Hi, I'd like to learn more about Vanta Estates properties.")} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={15}/></a><span className="footer-heading footer-location-heading">{m.footer.location}</span><span>{site.address[locale]}</span></div>
      <div className="footer-coordinates"><span className="footer-heading">{m.footer.coordinates}</span><strong dir="ltr">30.0444° N<br/>31.2357° E</strong><small>EG / 001</small></div>
    </div>
    <div className="footer-bottom"><p>{m.footer.disclaimer}</p><div><span>© {new Date().getFullYear()} VANTA ESTATES</span><span>{m.footer.rights}</span></div></div>
  </div></footer>;
}
