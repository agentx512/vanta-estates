"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { emptyFilters, filtersToQuery, type Filters } from "@/lib/filters";
import { getCopy, type Locale } from "@/lib/i18n";
import { FilterFields } from "@/components/filters/FilterFields";
import { FilterSheet } from "@/components/filters/FilterSheet";

export function HeroSearch({ locale }: { locale: Locale }) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const router = useRouter();
  const m = getCopy(locale);
  const explore = () => { setSheetOpen(false); const query = filtersToQuery(filters); router.push(`/${locale}/properties${query ? `?${query}` : ""}`); };
  return <div className="hero-search"><div className="hero-search-top"><span>{m.hero.searchLabel}</span><span dir="ltr">01 / 04</span></div><div className="hero-search-inner"><FilterFields locale={locale} value={filters} onChange={setFilters}/><button className="btn btn-blue hero-search-submit" type="button" onClick={explore}>{m.hero.searchAction}<ArrowUpRight size={20}/></button><button className="btn btn-blue hero-search-mobile" type="button" onClick={() => setSheetOpen(true)}><SlidersHorizontal size={18}/>{m.hero.searchAction}<ArrowUpRight size={18}/></button></div><FilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} locale={locale} value={filters} onChange={setFilters} onApply={explore}/></div>;
}
