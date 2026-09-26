"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/data/areas";
import { properties } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import { getCopy, type Locale } from "@/lib/i18n";
import { AreaMap } from "@/components/map/AreaMap";

export function AreaExplorer({ locale }: { locale: Locale }) {
  const [activeSlug, setActiveSlug] = useState(areas[0].slug);
  const area = areas.find((item) => item.slug === activeSlug) || areas[0];
  const count = properties.filter((property) => property.areaSlug === area.slug).length;
  const m = getCopy(locale);
  return <section className="area-section section-space" id="areas-preview"><div className="container"><div className="section-head"><div><span className="eyebrow">{m.home.areaEyebrow}</span><h2>{m.home.areaTitle}</h2></div><p>{m.home.areaIntro}</p></div><div className="area-explorer"><div className="area-list">{areas.map((item, index) => <button className={`area-list-item ${activeSlug === item.slug ? "active" : ""}`} key={item.slug} type="button" onMouseEnter={() => setActiveSlug(item.slug)} onFocus={() => setActiveSlug(item.slug)} onClick={() => setActiveSlug(item.slug)} aria-pressed={activeSlug === item.slug}><span>{String(index + 1).padStart(2, "0")}</span><strong>{locale === "ar" ? item.nameAr : item.name}</strong><ArrowUpRight size={20}/></button>)}<Link className="under-link area-all-link" href={`/${locale}/areas`}>{m.common.allAreas}<ArrowUpRight size={17}/></Link></div><div className="area-map-shell"><AreaMap active={activeSlug} onSelect={setActiveSlug} locale={locale}/><div className="area-map-photo"><Image key={area.image} src={area.image} alt={locale === "ar" ? area.nameAr : area.name} fill sizes="(max-width: 767px) 46vw, 18vw"/></div><div className="area-map-data"><span dir="ltr">{area.coordinates}</span><h3>{locale === "ar" ? area.nameAr : area.name}</h3><div><span>{count} {locale === "ar" ? "عقارات" : "properties"}</span><span>{m.common.from} {formatPrice(area.from, locale, true)}</span></div><Link href={`/${locale}/areas/${area.slug}`} aria-label={`${m.common.viewArea}: ${locale === "ar" ? area.nameAr : area.name}`}><ArrowUpRight size={21}/></Link></div></div></div></div></section>;
}
