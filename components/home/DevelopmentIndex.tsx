"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { developments } from "@/data/developments";
import { areaBySlug } from "@/data/areas";
import { getCopy, type Locale } from "@/lib/i18n";

export function DevelopmentIndex({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const m = getCopy(locale);
  return <section className="development-index section-space"><div className="container"><div className="section-head"><div><span className="eyebrow">{m.home.developmentsEyebrow}</span><h2>{m.home.developmentsTitle}</h2></div><Link className="under-link" href={`/${locale}/developments`}>{m.common.allDevelopments}<ArrowUpRight size={18}/></Link></div><div className="development-index-grid"><div className="development-rows">{developments.map((development, index) => { const area = areaBySlug(development.areaSlug); return <Link key={development.slug} href={`/${locale}/developments/${development.slug}`} className={`development-row ${index === active ? "active" : ""}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}><span className="development-number">{String(index + 1).padStart(2, "0")}</span><strong>{locale === "ar" ? development.nameAr : development.name}</strong><span className="development-row-area">{locale === "ar" ? area?.nameAr : area?.name}</span><span className="development-row-delivery">{development.delivery}</span><ArrowUpRight size={21}/></Link>; })}</div><div className="development-preview"><Image key={developments[active].image} src={developments[active].image} alt={locale === "ar" ? developments[active].nameAr : developments[active].name} fill sizes="(max-width: 767px) 100vw, 39vw"/><div className="development-preview-caption"><span>PROJECT 0{active + 1} / 0{developments.length}</span><span>{developments[active].type}</span></div></div></div></div></section>;
}
