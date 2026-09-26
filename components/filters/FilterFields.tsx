"use client";

import { areas } from "@/data/areas";
import { properties } from "@/data/properties";
import type { Filters } from "@/lib/filters";
import { getCopy, type Locale } from "@/lib/i18n";

export function FilterFields({ locale, value, onChange, extended = false, className = "" }: { locale: Locale; value: Filters; onChange: (next: Filters) => void; extended?: boolean; className?: string }) {
  const m = getCopy(locale);
  const fields = [
    { key: "location", label: m.search.location, all: m.search.anyLocation, options: areas.map((area) => [area.slug, locale === "ar" ? area.nameAr : area.name]) },
    { key: "type", label: m.search.type, all: m.search.anyType, options: [["Apartment", locale === "ar" ? "شقة" : "Apartment"], ["Villa", locale === "ar" ? "فيلا" : "Villa"], ["Townhouse", locale === "ar" ? "تاون هاوس" : "Townhouse"], ["Chalet", locale === "ar" ? "شاليه" : "Chalet"], ["Commercial", locale === "ar" ? "تجاري" : "Commercial"]] },
    { key: "budget", label: m.search.budget, all: m.search.anyBudget, options: [["under5", m.search.under5], ["5to10", m.search.fiveTen], ["10to20", m.search.tenTwenty], ["20plus", m.search.overTwenty]] },
    { key: "bedrooms", label: m.search.bedrooms, all: m.search.anyBedrooms, options: [["1", "1"], ["2", "2"], ["3", "3"], ["4+", "4+"]] },
    { key: "delivery", label: m.search.delivery, all: m.search.anyDelivery, options: [...new Set(properties.map((property) => property.delivery))].sort().map((year) => [year, year]) },
    { key: "developer", label: m.search.developer, all: m.search.anyDeveloper, options: [...new Set(properties.map((property) => property.developer))].sort().map((developer) => [developer, developer]) },
  ] as { key: keyof Filters; label: string; all: string; options: string[][] }[];
  return <div className={`filter-fields ${className}`}>{fields.slice(0, extended ? 6 : 4).map((field) => <label className="filter-field" key={field.key}><span>{field.label}</span><select value={value[field.key]} onChange={(event) => onChange({ ...value, [field.key]: event.target.value })} aria-label={field.label}><option value="">{field.all}</option>{field.options.map(([optionValue, label]) => <option key={optionValue} value={optionValue}>{label}</option>)}</select></label>)}</div>;
}
