import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Maximize2, CalendarDays } from "lucide-react";
import type { Property } from "@/data/properties";
import { areaBySlug } from "@/data/areas";
import { formatPrice } from "@/lib/format";
import { getCopy, type Locale } from "@/lib/i18n";
import { propertyMessage, whatsappUrl } from "@/lib/whatsapp";

export function PropertyCard({ property, locale, featured = false, list = false }: { property: Property; locale: Locale; featured?: boolean; list?: boolean }) {
  const m = getCopy(locale);
  const area = areaBySlug(property.areaSlug);
  return <article className={`property-card ${featured ? "is-featured" : ""} ${list ? "is-list" : ""}`}>
    <Link className="property-card-main" href={`/${locale}/properties/${property.slug}`} aria-label={`${m.common.viewProperty}: ${locale === "ar" ? property.titleAr : property.title}`}>
      <div className="property-card-image"><Image src={property.images[0]} alt={`${locale === "ar" ? property.titleAr : property.title} — ${m.detail.imageNote}`} fill sizes={featured ? "(max-width: 767px) 100vw, 60vw" : "(max-width: 767px) 100vw, 36vw"}/><span className="property-card-status">{property.status === "New launch" ? locale === "ar" ? "إطلاق جديد" : "NEW LAUNCH" : property.status === "Ready to move" ? locale === "ar" ? "جاهز للسكن" : "READY TO MOVE" : locale === "ar" ? "تحت الإنشاء" : "UNDER CONSTRUCTION"}</span><span className="property-card-image-code">{property.code}</span></div>
      <div className="property-card-body"><div className="property-card-topline"><span>{locale === "ar" ? area?.nameAr : area?.name} / {locale === "ar" ? property.typeAr : property.type}</span><ArrowUpRight size={20}/></div><div className="property-card-title-row"><h3>{locale === "ar" ? property.titleAr : property.title}</h3><div className="property-card-price"><small>{m.common.startingFrom}</small><strong dir="ltr">{formatPrice(property.price, locale, true)}</strong></div></div><div className="property-card-facts"><span><BedDouble size={16}/>{property.bedrooms || "—"} {m.common.beds}</span><span><Maximize2 size={16}/>{property.builtUpArea} m²</span><span><CalendarDays size={16}/>{property.delivery}</span><b>{property.code}</b></div><span className="property-card-view">{m.common.viewProperty} <ArrowUpRight size={16}/></span></div>
    </Link>
    <a className="property-card-whatsapp" href={whatsappUrl(propertyMessage(property, locale))} target="_blank" rel="noopener noreferrer" aria-label={`${m.common.whatsapp}: ${locale === "ar" ? property.titleAr : property.title}`}>WhatsApp ↗</a>
  </article>;
}
