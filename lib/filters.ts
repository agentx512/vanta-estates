import { properties, type Property } from "@/data/properties";

export type Filters = { location: string; type: string; budget: string; bedrooms: string; delivery: string; developer: string; region: string; purpose: string };
export const emptyFilters: Filters = { location: "", type: "", budget: "", bedrooms: "", delivery: "", developer: "", region: "", purpose: "" };

export function filterProperties(filters: Filters, source: Property[] = properties) {
  return source.filter((property) => {
    if (filters.location && property.areaSlug !== filters.location) return false;
    if (filters.region === "east" && !["new-cairo", "new-capital"].includes(property.areaSlug)) return false;
    if (filters.region === "west" && property.areaSlug !== "sheikh-zayed") return false;
    if (filters.region === "coastal" && !["north-coast", "ain-sokhna"].includes(property.areaSlug)) return false;
    if (filters.purpose === "live" && property.type === "Commercial") return false;
    if (filters.type && property.type !== filters.type) return false;
    if (filters.delivery && property.delivery !== filters.delivery) return false;
    if (filters.developer && property.developer !== filters.developer) return false;
    if (filters.bedrooms && (filters.bedrooms === "4+" ? property.bedrooms < 4 : property.bedrooms !== Number(filters.bedrooms))) return false;
    if (filters.budget === "under5" && property.price >= 5000000) return false;
    if (filters.budget === "5to10" && (property.price < 5000000 || property.price >= 10000000)) return false;
    if (filters.budget === "10to20" && (property.price < 10000000 || property.price >= 20000000)) return false;
    if (filters.budget === "20plus" && property.price < 20000000) return false;
    return true;
  });
}

export function filtersFromParams(params: Record<string, string | string[] | undefined>): Filters {
  return Object.fromEntries(Object.keys(emptyFilters).map((key) => [key, typeof params[key] === "string" ? params[key] : ""])) as Filters;
}

export function filtersToQuery(filters: Filters) {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => { if (value) query.set(key, value); });
  return query.toString();
}
