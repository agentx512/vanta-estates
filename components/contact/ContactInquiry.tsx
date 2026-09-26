"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { areas } from "@/data/areas";
import { getCopy, type Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";

export function ContactInquiry({ locale }: { locale: Locale }) {
  const [error, setError] = useState("");
  const m = getCopy(locale);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 9 || phone.replace(/\D/g, "").length > 15) { setError(locale === "ar" ? "اكتب اسمك ورقم هاتف صالحًا." : "Enter your name and a valid phone number."); return; }
    setError("");
    const interest = String(data.get("interest") || "");
    const area = String(data.get("area") || "");
    const details = String(data.get("details") || "").trim();
    const message = locale === "ar" ? `مرحبًا، أود التحدث إلى مستشار من فانتا.\nالاسم: ${name}\nالهاتف: ${phone}\nنوع العقار: ${interest}\nالمنطقة: ${area}${details ? `\nتفاصيل: ${details}` : ""}` : `Hi, I'd like to speak with a Vanta advisor.\nName: ${name}\nPhone: ${phone}\nProperty type: ${interest}\nArea: ${area}${details ? `\nDetails: ${details}` : ""}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }
  return <form className="contact-form" onSubmit={submit}><div className="contact-form-row"><label>{m.detail.name}<input name="name" required autoComplete="name" placeholder={locale === "ar" ? "اسمك" : "Your name"}/></label><label>{m.detail.phone}<input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+20"/></label></div><div className="contact-form-row"><label>{m.search.type}<select name="interest" defaultValue=""><option value="">{m.search.anyType}</option>{["Apartment", "Villa", "Townhouse", "Chalet", "Commercial"].map((type) => <option key={type} value={type}>{type}</option>)}</select></label><label>{m.search.location}<select name="area" defaultValue=""><option value="">{m.search.anyLocation}</option>{areas.map((area) => <option key={area.slug} value={locale === "ar" ? area.nameAr : area.name}>{locale === "ar" ? area.nameAr : area.name}</option>)}</select></label></div><label>{locale === "ar" ? "تفاصيل إضافية" : "Anything else we should know?"}<textarea name="details" rows={4} placeholder={locale === "ar" ? "أخبرنا بما تبحث عنه" : "Tell us what you are looking for"}/></label>{error && <p className="form-error" role="alert">{error}</p>}<div className="contact-form-bottom"><button className="btn btn-blue" type="submit">{m.detail.send}<ArrowUpRight size={18}/></button><span>{m.detail.viewingNote}</span></div></form>;
}
