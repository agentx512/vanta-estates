"use client";

import { useEffect, useRef } from "react";
import { properties } from "@/data/properties";
import { areas } from "@/data/areas";
import { developments } from "@/data/developments";
import type { Locale } from "@/lib/i18n";

export function MarketRail({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current; if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top <= window.innerHeight) return;
    const counters = Array.from(node.querySelectorAll<HTMLElement>("[data-count]"));
    let frame = 0;
    let started = false;
    let start = 0;
    const last = counters.map(() => -1);
    const tick = (time: number) => {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / 850);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach((counter, index) => {
        const value = Math.round(Number(counter.dataset.count) * eased);
        if (value !== last[index]) counter.textContent = String(value).padStart(2, "0");
        last[index] = value;
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 });
    counters.forEach((counter) => { counter.textContent = "00"; });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  const items = [
    [properties.length, locale === "ar" ? "عقارات تجريبية" : "Concept properties"],
    [developments.length, locale === "ar" ? "مشروعات" : "Developments"],
    [areas.length, locale === "ar" ? "مناطق مميزة" : "Prime areas"],
    [1, locale === "ar" ? "خطوة نحو المعاينة" : "Clear next step"],
  ] as const;
  return <div ref={ref} className="market-rail"><div className="container market-rail-inner">{items.map(([number, label], index) => <div key={label} className="market-stat"><small>0{index + 1} / DATA</small><strong data-count={number}>{String(number).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></div>;
}
