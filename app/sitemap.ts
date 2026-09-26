import type { MetadataRoute } from "next";
import { areas } from "@/data/areas";
import { developments } from "@/data/developments";
import { properties } from "@/data/properties";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/properties", "/developments", "/areas", "/about", "/contact", ...properties.map((p) => `/properties/${p.slug}`), ...developments.map((d) => `/developments/${d.slug}`), ...areas.map((a) => `/areas/${a.slug}`)];
  return ["en", "ar"].flatMap((locale) => paths.map((path) => ({ url: `${site.url}/${locale}${path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.7 })));
}
