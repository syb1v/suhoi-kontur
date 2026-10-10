import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Tracker } from "@/components/site/Tracker";
import { getSettings } from "@/lib/content";
import "./globals.css";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["cyrillic", "latin"], weight: ["400", "500", "700"], variable: "--font-mono", display: "swap" });

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://suhoi-kontur.ru"),
  title: { default: "Сухой Контур — дренаж и водоотведение в Краснодарском крае", template: "%s | Сухой Контур" },
  description: "Инженерные системы дренажа, водоотведения и водопонижения для домов и участков в Краснодарском крае и Адыгее. Официальный договор, фиксированная смета, гарантия 3 года.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ru_RU", siteName: "Сухой Контур", title: "Сухой Контур — инженерная защита участка", description: "Проектируем и монтируем дренаж, ливневку и водопонижение по Краснодару, Адыгее и западной части края." },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const metrikaId = settings.metrika_id?.trim();
  const jsonLd = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Сухой Контур", url: "https://suhoi-kontur.ru", telephone: settings.phone, email: settings.email, description: "Инженерные системы дренажа, водоотведения и водопонижения.", areaServed: ["Краснодар", "Краснодарский край", "Республика Адыгея"], priceRange: "₽₽₽", serviceType: ["Дренаж участка", "Дренаж фундамента", "Ливневая канализация", "Водопонижение"] };
  return (
    <html lang="ru" className={`${manrope.variable} ${mono.variable}`}>
      <body>
        <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {metrikaId ? (
          <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${JSON.stringify(Number(metrikaId) || metrikaId)},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});window.__ymId=${JSON.stringify(Number(metrikaId) || metrikaId)};`,
            }}
          />
        ) : null}
        <Tracker />
        {children}
        {metrikaId ? (
          <noscript>
            <div><img src={`https://mc.yandex.ru/watch/${metrikaId}`} style={{ position: "absolute", left: "-9999px" }} alt="" /></div>
          </noscript>
        ) : null}
      </body>
    </html>
  );
}
