"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { filterProperties, filtersToQuery, type Filters } from "@/lib/filters";
import { getCopy, type Locale } from "@/lib/i18n";

export function SmartMatcher({ locale }: { locale: Locale }) {
  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [region, setRegion] = useState("");
  const m = getCopy(locale);
  const filters: Filters = { location: "", type: "", budget, bedrooms: "", delivery: "", developer: "", region, purpose };
  const matches = filterProperties(filters);
  const ready = Boolean(purpose && budget && region);
  const href = `/${locale}/properties?${filtersToQuery(filters)}`;
  const groups = [
    { index: "01", label: m.smart.purpose, value: purpose, set: setPurpose, options: [["live", m.smart.live], ["invest", m.smart.invest]] },
    { index: "02", label: m.smart.budget, value: budget, set: setBudget, options: [["under5", m.search.under5], ["5to10", m.search.fiveTen], ["10to20", m.search.tenTwenty], ["20plus", m.search.overTwenty]] },
    { index: "03", label: m.smart.where, value: region, set: setRegion, options: [["east", m.smart.east], ["west", m.smart.west], ["coastal", m.smart.coastal]] },
  ];
  return <section className="smart-section section-space"><div className="container smart-grid"><div><span className="eyebrow">{m.home.smartEyebrow}</span><h2>{m.home.smartTitle}</h2><p>{m.home.smartIntro}</p><span className="smart-axis">VANTA / MATCH ENGINE <span>↗</span></span></div><div className="smart-panel">{groups.map((group) => <fieldset key={group.index} className="smart-question"><legend><span>{group.index}</span>{group.label}</legend><div className="smart-options">{group.options.map(([value, label]) => <button key={value} type="button" aria-pressed={group.value === value} onClick={() => group.set(value)}>{label}</button>)}</div></fieldset>)}<div className="smart-result"><span>{ready ? `${matches.length} ${m.smart.matches}` : m.smart.select}</span>{ready ? <Link href={href} className="btn btn-blue">{m.smart.showMatches}<ArrowUpRight size={18}/></Link> : <span className="smart-result-decor">↗</span>}</div></div></div></section>;
}
