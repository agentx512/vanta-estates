const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const vercelProductionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const site = {
  name: "VANTA ESTATES",
  nameAr: "فانتا العقارية",
  url: configuredUrl || (vercelProductionDomain ? `https://${vercelProductionDomain}` : "http://realestatedemo.local"),
  email: "hello@vanta-estates.demo",
  phoneDisplay: "+20 100 000 0000",
  phoneRaw: "+201000000000",
  whatsappNumber: "201000000000",
  address: { en: "New Cairo, Egypt", ar: "القاهرة الجديدة، مصر" },
} as const;
