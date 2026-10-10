import type { MetadataRoute } from "next";
const slugs=["drenazh-uchastka","drenazh-fundamenta","livnevaya-kanalizaciya","vodoponizhenie","septiki-i-kolodcy"];
export default function sitemap(): MetadataRoute.Sitemap { return ["",...slugs].map(slug=>({url:`https://suhoi-kontur.ru/${slug}`,lastModified:new Date(),changeFrequency:slug===""?"weekly":"monthly",priority:slug===""?1:.8})); }
