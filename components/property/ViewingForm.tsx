"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import type { Property } from "@/data/properties";
import { site } from "@/config/site";
import { getCopy, type Locale } from "@/lib/i18n";
import { propertyMessage, whatsappUrl } from "@/lib/whatsapp";

export function ViewingForm({ property, locale }: { property: Property; locale: Locale }) {
  const [error, setError] = useState("");
  const m = getCopy(locale);
  const direct = whatsappUrl(propertyMessage(property, locale));
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const date = String(data.get("date") || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 9 || phone.replace(/\D/g, "").length > 15) { setError(locale === "ar" ? "اكتب اسمك ورقم هاتف صالحًا." : "Enter your name and a valid phone number."); return; }
    setError("");
    window.open(whatsappUrl(propertyMessage(property, locale, name, phone, date)), "_blank", "noopener,noreferrer");
  }
  return <><aside className="inquiry-panel"><span className="eyebrow">VANTA / DIRECT INQUIRY</span><h2>{m.detail.interested}</h2><p>{m.detail.inquiryIntro}</p><form onSubmit={submit}><label>{m.detail.name}<input name="name" autoComplete="name" required placeholder={locale === "ar" ? "اسمك" : "Your name"}/></label><label>{m.detail.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="+20"/></label><label>{m.detail.date}<input name="date" type="date" min={new Date().toISOString().split("T")[0]}/></label>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="btn btn-blue">{m.detail.send}<ArrowUpRight size={18}/></button></form><div className="inquiry-direct"><a href={direct} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={17}/></a><a href={`tel:${site.phoneRaw}`}>{m.detail.call}<Phone size={16}/></a></div><small>{m.detail.viewingNote}</small></aside><div className="mobile-sticky-inquiry"><strong dir="ltr">EGP {(property.price / 1000000).toFixed(1)}M</strong><a href={direct} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href="#inquiry">{m.common.requestViewing}</a></div></>;
}
