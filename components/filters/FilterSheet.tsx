"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { emptyFilters, type Filters } from "@/lib/filters";
import { getCopy, type Locale } from "@/lib/i18n";
import { FilterFields } from "./FilterFields";

export function FilterSheet({ open, onClose, locale, value, onChange, onApply, extended = false }: { open: boolean; onClose: () => void; locale: Locale; value: Filters; onChange: (next: Filters) => void; onApply: () => void; extended?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const m = getCopy(locale);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (open) { const old = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = old; }; }
  }, [open]);
  return <dialog ref={dialogRef} className="filter-sheet" onClose={onClose} onCancel={onClose} aria-label={m.search.filters}><div className="filter-sheet-inner"><div className="filter-sheet-heading"><div><span className="eyebrow">VANTA / SEARCH</span><h2>{m.search.filters}</h2></div><button type="button" onClick={onClose} aria-label={m.common.close}><X size={24}/></button></div><div className="filter-sheet-scroll"><FilterFields locale={locale} value={value} onChange={onChange} extended={extended}/></div><div className="filter-sheet-actions"><button type="button" className="text-button" onClick={() => onChange(emptyFilters)}>{m.common.clearAll}</button><button type="button" className="btn btn-blue" onClick={onApply}>{m.common.applyFilters} ↗</button></div></div></dialog>;
}
