export type PropertyType = "Apartment" | "Villa" | "Townhouse" | "Commercial" | "Chalet";
export type Property = {
  id: number;
  slug: string;
  code: string;
  title: string;
  titleAr: string;
  areaSlug: string;
  type: PropertyType;
  typeAr: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  builtUpArea: number;
  landArea?: number;
  delivery: string;
  status: "Ready to move" | "New launch" | "Under construction";
  developmentSlug?: string;
  developer: string;
  images: string[];
  amenities: string[];
  paymentPlan: { value: string; label: string; labelAr: string }[];
  coordinates: string;
  description: string;
  descriptionAr: string;
};

const gallery = ["/images/ridge.webp", "/images/courtyard.webp", "/images/arc.webp", "/images/modern.webp", "/images/dune.webp", "/images/west.webp", "/images/park.webp", "/images/eastline.webp"];
const plan = [
  { value: "10%", label: "Down payment", labelAr: "مقدم" },
  { value: "10%", label: "After 3 months", labelAr: "بعد ٣ أشهر" },
  { value: "80%", label: "Over 8 years", labelAr: "على ٨ سنوات" },
];
const amenities = ["Clubhouse", "Pool", "Security", "Parking", "Landscape", "Gym", "Kids area", "Walking track"];

export const properties: Property[] = [
  { id: 1, slug: "the-ridge-house", code: "VT-014", title: "The Ridge House", titleAr: "منزل ذا ريدج", areaSlug: "new-cairo", type: "Villa", typeAr: "فيلا", price: 18400000, bedrooms: 4, bathrooms: 5, builtUpArea: 310, landArea: 420, delivery: "2028", status: "New launch", developmentSlug: "solis-district", developer: "Atelier Developments", images: ["/images/ridge.webp", ...gallery.filter((image) => image !== "/images/ridge.webp")], amenities, paymentPlan: plan, coordinates: "30.0131° N / 31.4913° E", description: "A four-bedroom villa concept with generous indoor-outdoor living, a private garden, and a measured architectural profile. Planned within Solis District in New Cairo, it places everyday amenities close to home.", descriptionAr: "تصور لفيلا من أربع غرف نوم بمساحات معيشة متصلة بالحديقة الخاصة وتصميم معماري متوازن. تقع ضمن سوليس ديستريكت بالقاهرة الجديدة بالقرب من الخدمات اليومية." },
  { id: 2, slug: "arc-residence", code: "VT-021", title: "Arc Residence", titleAr: "آرك ريزيدنس", areaSlug: "new-capital", type: "Apartment", typeAr: "شقة", price: 6900000, bedrooms: 2, bathrooms: 2, builtUpArea: 145, delivery: "2029", status: "Under construction", developmentSlug: "arc-one", developer: "Arc Urban", images: ["/images/arc.webp", ...gallery.filter((image) => image !== "/images/arc.webp")], amenities: amenities.slice(0, 6), paymentPlan: plan, coordinates: "30.0061° N / 31.7042° E", description: "An efficient two-bedroom apartment concept with a flexible open living zone and a balcony facing the district landscape.", descriptionAr: "تصور لشقة عملية من غرفتي نوم مع منطقة معيشة مرنة مفتوحة وشرفة تطل على مساحات الحي." },
  { id: 3, slug: "courtyard-07", code: "VT-033", title: "Courtyard 07", titleAr: "كورت يارد ٠٧", areaSlug: "sheikh-zayed", type: "Townhouse", typeAr: "تاون هاوس", price: 13200000, bedrooms: 3, bathrooms: 4, builtUpArea: 245, landArea: 290, delivery: "2027", status: "Under construction", developmentSlug: "west-44", developer: "Northline Communities", images: ["/images/courtyard.webp", ...gallery.filter((image) => image !== "/images/courtyard.webp")], amenities, paymentPlan: plan, coordinates: "30.0300° N / 30.9970° E", description: "A three-bedroom townhouse concept arranged around a sheltered courtyard, giving family life room to move between inside and out.", descriptionAr: "تصور لتاون هاوس من ثلاث غرف نوم حول فناء محمي يتيح للعائلة التنقل بسهولة بين الداخل والخارج." },
  { id: 4, slug: "coastline-loft", code: "VT-046", title: "Coastline Loft", titleAr: "كوستلاين لوفت", areaSlug: "north-coast", type: "Chalet", typeAr: "شاليه", price: 9600000, bedrooms: 2, bathrooms: 2, builtUpArea: 128, delivery: "2028", status: "New launch", developmentSlug: "marea", developer: "Marea Coastal", images: ["/images/beach.webp", "/images/coastline.webp", ...gallery.slice(0, 6)], amenities: amenities.slice(0, 5), paymentPlan: plan, coordinates: "31.2001° N / 29.9187° E", description: "A coastal residence concept with open terraces and a plan oriented toward light, sea air, and easy seasonal living.", descriptionAr: "تصور لوحدة ساحلية بتراسات مفتوحة وتخطيط يستفيد من الضوء والهواء البحري وسهولة الإقامة الموسمية." },
  { id: 5, slug: "park-avenue-suite", code: "VT-052", title: "Park Avenue Suite", titleAr: "بارك أفينيو سويت", areaSlug: "new-cairo", type: "Apartment", typeAr: "شقة", price: 7800000, bedrooms: 3, bathrooms: 2, builtUpArea: 168, delivery: "2028", status: "Under construction", developmentSlug: "solis-district", developer: "Atelier Developments", images: ["/images/park.webp", ...gallery.filter((image) => image !== "/images/park.webp")], amenities: amenities.slice(0, 7), paymentPlan: plan, coordinates: "30.0131° N / 31.4913° E", description: "A bright three-bedroom apartment concept with a practical family plan and views toward a planted neighborhood edge.", descriptionAr: "تصور لشقة مضيئة من ثلاث غرف نوم بتخطيط عائلي عملي وإطلالة على طرف الحي المزروع." },
  { id: 6, slug: "eastline-offices", code: "VT-061", title: "Eastline Offices", titleAr: "إيستلاين أوفيسز", areaSlug: "new-cairo", type: "Commercial", typeAr: "تجاري", price: 12500000, bedrooms: 0, bathrooms: 2, builtUpArea: 210, delivery: "2027", status: "Under construction", developer: "Atelier Developments", images: ["/images/eastline.webp", "/images/office.webp", ...gallery.slice(0, 6)], amenities: ["Security", "Parking", "Landscape", "Walking track"], paymentPlan: plan, coordinates: "30.0131° N / 31.4913° E", description: "A flexible commercial floorplate concept in a connected New Cairo location, designed for light-filled workspaces and clear access.", descriptionAr: "تصور لمساحة تجارية مرنة في موقع متصل بالقاهرة الجديدة، صممت لمكاتب مضيئة وسهلة الوصول." },
  { id: 7, slug: "dune-villa", code: "VT-074", title: "Dune Villa", titleAr: "ديون فيلا", areaSlug: "north-coast", type: "Villa", typeAr: "فيلا", price: 22000000, bedrooms: 5, bathrooms: 5, builtUpArea: 360, landArea: 510, delivery: "2028", status: "New launch", developmentSlug: "marea", developer: "Marea Coastal", images: ["/images/dune.webp", "/images/beach.webp", ...gallery.slice(0, 6)], amenities, paymentPlan: plan, coordinates: "31.2001° N / 29.9187° E", description: "A generous five-bedroom coastal villa concept with shaded outdoor spaces and room for a large family gathering.", descriptionAr: "تصور لفيلا ساحلية واسعة من خمس غرف نوم بمساحات خارجية مظللة ومكان مناسب لتجمعات العائلة الكبيرة." },
  { id: 8, slug: "capital-one-residence", code: "VT-088", title: "Capital One Residence", titleAr: "كابيتال ون ريزيدنس", areaSlug: "new-capital", type: "Apartment", typeAr: "شقة", price: 5800000, bedrooms: 2, bathrooms: 2, builtUpArea: 132, delivery: "2029", status: "Under construction", developmentSlug: "arc-one", developer: "Arc Urban", images: ["/images/capital.webp", ...gallery.slice(0, 7)], amenities: amenities.slice(0, 6), paymentPlan: plan, coordinates: "30.0061° N / 31.7042° E", description: "A compact two-bedroom apartment concept with an open social zone and efficient storage in the New Capital.", descriptionAr: "تصور لشقة مدمجة من غرفتي نوم بمنطقة استقبال مفتوحة ومساحات تخزين عملية في العاصمة الإدارية." },
  { id: 9, slug: "horizon-house", code: "VT-091", title: "Horizon House", titleAr: "هورايزن هاوس", areaSlug: "ain-sokhna", type: "Chalet", typeAr: "شاليه", price: 11200000, bedrooms: 3, bathrooms: 3, builtUpArea: 174, delivery: "2028", status: "New launch", developer: "Marea Coastal", images: ["/images/coastline.webp", "/images/beach.webp", ...gallery.slice(0, 6)], amenities: amenities.slice(0, 6), paymentPlan: plan, coordinates: "29.6000° N / 32.3333° E", description: "A sunny Red Sea escape concept with three bedrooms, a broad terrace, and a direct connection to outdoor living.", descriptionAr: "تصور لمنزل مشمس على البحر الأحمر من ثلاث غرف نوم وتراس واسع واتصال مباشر بالمساحات الخارجية." },
  { id: 10, slug: "axis-studio", code: "VT-106", title: "Axis Studio", titleAr: "أكسيس ستوديو", areaSlug: "new-capital", type: "Apartment", typeAr: "شقة", price: 4700000, bedrooms: 1, bathrooms: 1, builtUpArea: 86, delivery: "2029", status: "New launch", developmentSlug: "arc-one", developer: "Arc Urban", images: ["/images/office.webp", ...gallery.slice(0, 7)], amenities: amenities.slice(0, 5), paymentPlan: plan, coordinates: "30.0061° N / 31.7042° E", description: "An efficient one-bedroom studio concept for a first address or a focused investment in a growing district.", descriptionAr: "تصور لوحدة من غرفة نوم واحدة تصلح كعنوان أول أو استثمار مدروس في منطقة نامية." },
];

export const propertyBySlug = (slug: string) => properties.find((property) => property.slug === slug);
