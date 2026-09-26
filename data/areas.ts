export type Area = {
  slug: string;
  name: string;
  nameAr: string;
  region: string;
  regionAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  from: number;
  marker: { x: number; y: number };
  coordinates: string;
};

export const areas: Area[] = [
  { slug: "new-cairo", name: "New Cairo", nameAr: "القاهرة الجديدة", region: "East Cairo", regionAr: "شرق القاهرة", description: "A connected east-side address shaped by universities, established neighborhoods, and a new generation of mixed-use districts.", descriptionAr: "عنوان متصل بشرق القاهرة يجمع الجامعات والأحياء الراسخة والوجهات متعددة الاستخدامات الحديثة.", image: "/images/hero.webp", from: 6200000, marker: { x: 69, y: 39 }, coordinates: "30.0131° N / 31.4913° E" },
  { slug: "new-capital", name: "New Capital", nameAr: "العاصمة الإدارية", region: "East Cairo", regionAr: "شرق القاهرة", description: "A planned urban center with broad boulevards, new business districts, and contemporary residential communities.", descriptionAr: "مركز عمراني مخطط يضم محاور واسعة ومناطق أعمال جديدة ومجتمعات سكنية معاصرة.", image: "/images/arc.webp", from: 4700000, marker: { x: 82, y: 58 }, coordinates: "30.0061° N / 31.7042° E" },
  { slug: "sheikh-zayed", name: "Sheikh Zayed", nameAr: "الشيخ زايد", region: "West Cairo", regionAr: "غرب القاهرة", description: "Leafy western communities with everyday convenience, family-scale streets, and easy access to major routes.", descriptionAr: "مجتمعات غربية خضراء تجمع بين سهولة الحياة اليومية وشوارع مناسبة للعائلات واتصال جيد بالمحاور الرئيسية.", image: "/images/courtyard.webp", from: 13200000, marker: { x: 28, y: 42 }, coordinates: "30.0300° N / 30.9970° E" },
  { slug: "north-coast", name: "North Coast", nameAr: "الساحل الشمالي", region: "Coastal", regionAr: "ساحلي", description: "Seasonal homes designed around the Mediterranean: sea views, open air, and a slower rhythm.", descriptionAr: "منازل موسمية على المتوسط تجمع إطلالات البحر والمساحات المفتوحة وإيقاع حياة أكثر هدوءًا.", image: "/images/beach.webp", from: 9600000, marker: { x: 30, y: 12 }, coordinates: "31.2001° N / 29.9187° E" },
  { slug: "ain-sokhna", name: "Ain Sokhna", nameAr: "العين السخنة", region: "Coastal", regionAr: "ساحلي", description: "A Red Sea escape within reach of Cairo, with year-round sunshine and weekend-ready homes.", descriptionAr: "وجهة على البحر الأحمر قريبة من القاهرة، بشمس طوال العام ومنازل مناسبة لعطلات نهاية الأسبوع.", image: "/images/coastline.webp", from: 11200000, marker: { x: 74, y: 80 }, coordinates: "29.6000° N / 32.3333° E" },
];

export const areaBySlug = (slug: string) => areas.find((area) => area.slug === slug);
