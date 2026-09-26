export type Development = {
  slug: string;
  name: string;
  nameAr: string;
  areaSlug: string;
  developer: string;
  developerAr: string;
  type: string;
  typeAr: string;
  from: number;
  downPayment: string;
  years: string;
  delivery: string;
  image: string;
  description: string;
  descriptionAr: string;
};

export const developments: Development[] = [
  { slug: "solis-district", name: "SOLIS DISTRICT", nameAr: "سوليس ديستريكت", areaSlug: "new-cairo", developer: "Atelier Developments", developerAr: "أتيليه للتطوير", type: "Residential · Mixed use", typeAr: "سكني · متعدد الاستخدامات", from: 7800000, downPayment: "10%", years: "8 years", delivery: "2028", image: "/images/hero.webp", description: "A walkable district where planted streets, considered homes, and daily essentials form a city within the city.", descriptionAr: "حي قابل للمشي تتجاور فيه الشوارع المزروعة والمنازل المدروسة والخدمات اليومية ليصبح مدينة داخل المدينة." },
  { slug: "arc-one", name: "ARC ONE", nameAr: "آرك ون", areaSlug: "new-capital", developer: "Arc Urban", developerAr: "آرك أوربان", type: "Residential", typeAr: "سكني", from: 4700000, downPayment: "10%", years: "7 years", delivery: "2029", image: "/images/arc.webp", description: "A compact residential address focused on functional plans and direct access to the capital's new core.", descriptionAr: "عنوان سكني متكامل يركز على التخطيطات العملية وسهولة الوصول إلى قلب العاصمة الجديد." },
  { slug: "west-44", name: "WEST 44", nameAr: "ويست ٤٤", areaSlug: "sheikh-zayed", developer: "Northline Communities", developerAr: "نورثلاين كوميونيتيز", type: "Residential", typeAr: "سكني", from: 13200000, downPayment: "15%", years: "7 years", delivery: "2027", image: "/images/west.webp", description: "Townhomes and villas arranged around shaded gardens in an established West Cairo setting.", descriptionAr: "تاون هاوس وفيلات حول حدائق مظللة في موقع راسخ بغرب القاهرة." },
  { slug: "marea", name: "MAREA", nameAr: "ماريا", areaSlug: "north-coast", developer: "Marea Coastal", developerAr: "ماريا الساحلية", type: "Coastal residences", typeAr: "وحدات ساحلية", from: 9600000, downPayment: "10%", years: "8 years", delivery: "2028", image: "/images/beach.webp", description: "Coastal residences planned for sea air, open terraces, and a direct relationship with the landscape.", descriptionAr: "وحدات ساحلية صممت للهواء البحري والتراسات المفتوحة وعلاقة مباشرة مع الطبيعة." },
];

export const developmentBySlug = (slug: string) => developments.find((development) => development.slug === slug);
