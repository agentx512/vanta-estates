"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { getCopy, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const m = getCopy(locale);
  const isHome = pathname === `/${locale}`;
  const nav = [
    { href: `/${locale}/properties`, label: m.nav.properties },
    { href: `/${locale}/developments`, label: m.nav.developments },
    { href: `/${locale}/areas`, label: m.nav.areas },
    { href: `/${locale}/about`, label: m.nav.about },
  ];
  const other = locale === "ar" ? "en" : "ar";
  const otherPath = pathname.replace(/^\/(en|ar)/, `/${other}`);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus(), 30);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const nodes = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") || []);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(timer); document.body.style.overflow = old; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return <>
    <header className={`site-header ${isHome && !scrolled ? "on-hero" : "solid"}`}>
      <div className="header-inner container">
        <Link href={`/${locale}`} className="brand" aria-label={locale === "ar" ? "فانتا العقارية — الرئيسية" : "Vanta Estates — home"}><span className="brand-mark" aria-hidden="true">V</span><span className="brand-text"><strong>VANTA</strong><small>ESTATES</small></span></Link>
        <nav className="desktop-nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>{nav.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}>{item.label}</Link>)}</nav>
        <div className="header-actions"><Link className="language-link" href={otherPath} hrefLang={other} lang={other} onClick={(event) => { if (window.location.search) { event.preventDefault(); router.push(`${otherPath}${window.location.search}`); } }}>{other.toUpperCase()}</Link><Link href={`/${locale}/properties`} className="header-find">{locale === "ar" ? "اعثر على عقار" : "Find a property"}<ArrowUpRight size={17}/></Link></div>
        <button ref={toggleRef} className="mobile-menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? m.common.close : locale === "ar" ? "افتح القائمة" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={25}/> : <Menu size={25}/>}</button>
      </div>
    </header>
    {open && <div ref={menuRef} id="mobile-navigation" className="mobile-navigation" role="dialog" aria-modal="true" aria-label={locale === "ar" ? "قائمة التنقل" : "Navigation menu"}>
      <div className="mobile-navigation-top"><span>VANTA / MENU</span><button type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label={m.common.close}><X size={26}/></button></div>
      <nav aria-label={locale === "ar" ? "التنقل" : "Navigation"}>{nav.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ArrowUpRight size={24}/></Link>)}<Link href={`/${locale}/contact`} onClick={() => setOpen(false)}><span>05</span>{m.nav.contact}<ArrowUpRight size={24}/></Link></nav>
      <div className="mobile-navigation-bottom"><Link href={otherPath} onClick={(event) => { setOpen(false); if (window.location.search) { event.preventDefault(); router.push(`${otherPath}${window.location.search}`); } }}>{other.toUpperCase()} / {other === "ar" ? "العربية" : "English"}</Link><span dir="ltr">30.0444° N / 31.2357° E</span></div>
    </div>}
  </>;
}
