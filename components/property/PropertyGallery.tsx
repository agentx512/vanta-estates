"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Images } from "lucide-react";
import type { Property } from "@/data/properties";
import { getCopy, type Locale } from "@/lib/i18n";

export function PropertyGallery({ property, locale }: { property: Property; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const m = getCopy(locale);
  const title = locale === "ar" ? property.titleAr : property.title;
  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; if (open && !dialog.open) dialog.showModal(); if (!open && dialog.open) dialog.close(); }, [open]);
  return <><div className="property-gallery"><div className="property-gallery-main"><Image src={property.images[0]} alt={`${title} — ${m.detail.imageNote}`} fill priority sizes="(max-width: 767px) 100vw, 69vw"/></div><div className="property-gallery-side">{property.images.slice(1, 3).map((image, index) => <div className="property-gallery-small" key={image}><Image src={image} alt={`${title} — ${m.detail.imageNote} ${index + 2}`} fill sizes="(max-width: 767px) 50vw, 24vw"/></div>)}</div><button type="button" className="gallery-open" onClick={() => setOpen(true)}><Images size={17}/>{m.detail.gallery}</button><span className="gallery-index">01 / 08</span></div>
    <dialog ref={dialogRef} className="gallery-dialog" onClose={() => setOpen(false)} onCancel={() => setOpen(false)} aria-label={m.detail.galleryTitle}><div className="gallery-dialog-top"><span>{title} / {m.detail.galleryTitle}</span><button type="button" onClick={() => setOpen(false)} aria-label={m.common.close}><X size={26}/></button></div><div className="gallery-dialog-scroll"><p>{m.detail.imageNote}</p><div className="gallery-dialog-grid">{property.images.slice(0, 8).map((image, index) => <figure key={`${image}-${index}`}><div><Image src={image} alt={`${title} — ${m.detail.imageNote} ${index + 1}`} fill sizes="(max-width: 767px) 100vw, 50vw"/></div><figcaption>{String(index + 1).padStart(2,"0")} / 08</figcaption></figure>)}</div></div></dialog>
  </>;
}
