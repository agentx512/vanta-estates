"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { filterProperties, filtersToQuery, type Filters } from "@/lib/filters";
import { getCopy, type Locale } from "@/lib/i18n";
import { FilterFields } from "./FilterFields";
import { FilterSheet } from "./FilterSheet";
import { PropertyCard } from "@/components/property/PropertyCard";

export function PropertyExplorer({ locale, initialFilters }: { locale: Locale; initialFilters: Filters }) {
  const [filters, setFilters] = useState(initialFilters);
  const [draft, setDraft] = useState(initialFilters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const gridRef = useRef<HTMLDivElement>(null);
  const m = getCopy(locale);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gridRef.current?.animate(
      [{ opacity: 0.55, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 300, easing: "cubic-bezier(.2,.7,.15,1)" },
    );
    return () => animation?.cancel();
  }, [filters, sort, view]);
  const update = (next: Filters) => { setFilters(next); const query = filtersToQuery(next); window.history.replaceState(null, "", `/${locale}/properties${query ? `?${query}` : ""}`); };
  const results = filterProperties(filters).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "newest" ? b.id - a.id : a.id - b.id);
  const count = Object.values(filters).filter(Boolean).length;
  return <><div className="listing-toolbar"><div className="container listing-toolbar-inner"><div className="listing-filters-desktop"><FilterFields locale={locale} value={filters} onChange={update} extended/></div><button className="mobile-filter-button" type="button" onClick={() => { setDraft(filters); setSheetOpen(true); }}><SlidersHorizontal size={18}/>{m.search.filters} {count ? `(${count})` : ""}</button><div className="listing-toolbar-actions"><label className="sort-label"><span>{m.search.sort}</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">{m.search.featured}</option><option value="low">{m.search.lowHigh}</option><option value="high">{m.search.highLow}</option><option value="newest">{m.search.newest}</option></select></label><div className="view-toggle" role="group" aria-label={locale === "ar" ? "طريقة العرض" : "View mode"}><button type="button" aria-label={m.search.grid} aria-pressed={view === "grid"} onClick={() => setView("grid")}><LayoutGrid size={18}/></button><button type="button" aria-label={m.search.list} aria-pressed={view === "list"} onClick={() => setView("list")}><List size={18}/></button></div></div></div></div>
    <div className="container listing-results"><div className="listing-results-top"><span>{results.length} {m.pages.found}{filters.region ? <button className="region-chip" type="button" onClick={() => update({ ...filters, region: "" })}>{filters.region === "east" ? m.smart.east : filters.region === "west" ? m.smart.west : m.smart.coastal} ×</button> : null}{filters.purpose ? <button className="region-chip" type="button" onClick={() => update({ ...filters, purpose: "" })}>{filters.purpose === "live" ? m.smart.live : m.smart.invest} ×</button> : null}</span><span>VANTA / 001—{String(results.length).padStart(3,"0")}</span></div>{results.length ? <div ref={gridRef} className={`listing-grid ${view === "list" ? "list-view" : ""}`}>{results.map((property) => <PropertyCard key={property.slug} property={property} locale={locale} list={view === "list"}/>)}</div> : <div className="empty-results"><p>{m.common.noResults}</p><button type="button" className="btn btn-outline" onClick={() => update({ location: "", type: "", budget: "", bedrooms: "", delivery: "", developer: "", region: "", purpose: "" })}>{m.common.resetFilters}</button></div>}</div>
    <FilterSheet open={sheetOpen} onClose={() => setSheetOpen(false)} locale={locale} value={draft} onChange={setDraft} extended onApply={() => { update(draft); setSheetOpen(false); }}/>
  </>;
}
