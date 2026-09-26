"use client";

import { useEffect, useRef, useState } from "react";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
import { developments } from "@/data/developments";
import type { Locale } from "@/lib/i18n";

export function MarketRail({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setProgress(1); return; }
      const start = performance.now(); let frame = 0;
      const tick = (time: number) => { const next = Math.min(1, (time - start) / 850); setProgress(next); if (next < 1) frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, { threshold: .5 });
    observer.observe(node); return () => observer.disconnect();
  }, []);
  const items = [
    [properties.length, locale === "ar" ? "عقارات تجريبية" : "Concept properties"],
    [developments.length, locale === "ar" ? "مشروعات" : "Developments"],
    [areas.length, locale === "ar" ? "مناطق مميزة" : "Prime areas"],
    [1, locale === "ar" ? "خطوة نحو المعاينة" : "Clear next step"],
  ] as const;
  return <div ref={ref} className="market-rail"><div className="container market-rail-inner">{items.map(([number, label], index) => <div key={label} className="market-stat"><small>0{index + 1} / DATA</small><strong>{String(Math.round(number * progress)).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></div>;
}
