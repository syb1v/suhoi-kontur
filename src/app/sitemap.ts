import type { MetadataRoute } from "next";
const slugs=["drenazh-uchastka","drenazh-fundamenta","livnevaya-kanalizaciya","vodoponizhenie","septiki-i-kolodcy","krasnodar","novorossiysk","anapa","gelendzhik","adygeya","temryuk","krymsk"];
export default function sitemap(): MetadataRoute.Sitemap { return ["",...slugs].map(slug=>({url:`https://suhoi-kontur.ru/${slug}`,lastModified:new Date()})); }
