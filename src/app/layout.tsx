import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://suhoi-kontur.ru"),
  title: { default: "Сухой Контур — дренаж и водоотведение в Краснодарском крае", template: "%s | Сухой Контур" },
  description: "Инженерные системы дренажа, водоотведения и водопонижения для домов и участков в Краснодарском крае и Адыгее. Официальный договор, фиксированная смета, гарантия 3 года.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ru_RU", siteName: "Сухой Контур", title: "Сухой Контур — инженерная защита участка", description: "Проектируем и монтируем дренаж, ливневку и водопонижение по Краснодару, Адыгее и западной части края." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Сухой Контур", url: "https://suhoi-kontur.ru", description: "Инженерные системы дренажа, водоотведения и водопонижения.", areaServed: ["Краснодар", "Краснодарский край", "Республика Адыгея"], priceRange: "₽₽₽", serviceType: ["Дренаж участка", "Дренаж фундамента", "Ливневая канализация", "Водопонижение"] };
  return (
    <html lang="ru" className={`${manrope.variable} ${mono.variable}`}>
      <body>
        <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
