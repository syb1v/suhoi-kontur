import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/site/Reveal";
import { HeroDiagram } from "@/components/site/HeroDiagram";
import { MobileCta, SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getSettings } from "@/lib/content";

const pages: Record<string, { title: string; description: string; intro: string; type: "service" | "region" }> = {
  "drenazh-uchastka": { title: "Дренаж участка в Краснодарском крае", description: "Глубинный и поверхностный дренаж участка: проектирование, монтаж и отвод воды по договору с гарантией 3 года.", intro: "Подбираем систему по рельефу, грунту, источнику воды и точке сброса. Онлайн-расчёт показывает ориентир, окончательная схема формируется после осмотра участка.", type: "service" },
  "drenazh-fundamenta": { title: "Дренаж фундамента дома", description: "Пристенный и кольцевой дренаж для защиты фундамента, подвала и цоколя от воды.", intro: "Отводим воду от стен и подошвы фундамента, учитывая глубину заложения, отмостку и существующее благоустройство участка.", type: "service" },
  "livnevaya-kanalizaciya": { title: "Ливневая канализация", description: "Отвод дождевых и талых вод с кровли, отмостки и площадок участка под ключ.", intro: "Собираем воду с кровли и твёрдых покрытий, разделяем поверхностный сток и глубинный контур, выбираем безопасную точку сброса.", type: "service" },
  "vodoponizhenie": { title: "Понижение грунтовых вод", description: "Инженерные системы водопонижения на сложных глинистых грунтах.", intro: "Исследуем, почему грунт удерживает воду, и проектируем систему, которая снижает риск подтопления дома и заболачивания участка.", type: "service" },
  "septiki-i-kolodcy": { title: "Септики и дренажные колодцы", description: "Монтаж сборных резервуаров, дренажных колодцев и насосных станций.", intro: "Организуем сбор, фильтрацию и принудительный сброс воды, если естественной точки отвода на участке нет.", type: "service" },
  "krasnodar": { title: "Дренаж участка в Краснодаре", description: "Проектирование и монтаж дренажа участков в Краснодаре и пригородных коттеджных посёлках.", intro: "В Краснодаре схема водоотведения зависит от локального рельефа, глинистых грунтов, плотности застройки и доступной точки сброса.", type: "region" },
  "adygeya": { title: "Дренаж участка в Адыгее", description: "Дренаж, водоотведение и защита фундаментов в Адыгее: Яблоновский, Энем, Тахтамукай, Майкоп.", intro: "Работаем в Яблоновском, Энеме, Тахтамукае, Майкопе и прилегающих районах. Выезжаем на участки домов, КП и ИЖС.", type: "region" },
  "novorossiysk": { title: "Дренаж участка в Новороссийске", description: "Инженерный дренаж и отвод воды в Новороссийске и пригородах.", intro: "Для прибрежных участков учитываем перепады рельефа, ливневые потоки и сложные условия сброса воды.", type: "region" },
  "anapa": { title: "Дренаж участка в Анапе", description: "Дренаж фундамента и водоотведение участков в Анапе.", intro: "Проектируем защиту домов, отмосток и зон благоустройства от сезонного переувлажнения и поверхностного стока.", type: "region" },
  "gelendzhik": { title: "Дренаж участка в Геленджике", description: "Дренаж и водопонижение участков в Геленджике.", intro: "На участках с уклоном вода быстро собирается в нижней точке. Определяем направление потока и проектируем безопасный отвод.", type: "region" },
  "temryuk": { title: "Дренаж участка в Темрюке", description: "Дренаж, ливневая канализация и колодцы в Темрюке.", intro: "Подбираем решение для участков с высоким переувлажнением, плотными грунтами и ограниченным естественным сбросом.", type: "region" },
  "krymsk": { title: "Дренаж участка в Крымске", description: "Инженерная защита участков и фундаментов в Крымске.", intro: "Собираем поверхностный и глубинный сток, защищаем фундамент и возвращаем участку предсказуемое состояние после дождя.", type: "region" },
};

const steps = [
  ["Предварительный разговор", "Описываете ситуацию — мы задаём уточняющие вопросы"],
  ["Выезд инженера", "Замер рельефа, оценка грунта, выбор точки сброса"],
  ["Схема и спецификация", "Трассы, уклоны, колодцы, крепёж — в одном документе"],
  ["Договор с фиксированной сметой", "Состав работ и цена закреплены официально"],
  ["Монтаж и проверка", "Пролив системы, проверка уклонов, сдача с гарантией 3 года"],
];

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = pages[slug] ?? pages["drenazh-uchastka"];
  return { title: p.title, description: p.description, alternates: { canonical: `/${slug}` }, openGraph: { title: p.title, description: p.description, type: "website" } };
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const settings = await getSettings();
  const p = pages[slug] ?? pages["drenazh-uchastka"];
  const schema = {
    "@context": "https://schema.org",
    "@type": p.type === "service" ? "Service" : "LocalBusiness",
    name: p.title,
    description: p.description,
    areaServed: p.type === "region" ? p.title.replace("Дренаж участка в ", "") : "Краснодарский край и Республика Адыгея",
    provider: { "@type": "Organization", name: "Сухой Контур", url: "https://suhoi-kontur.ru" },
  };

  return (
    <main className="site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader phone={settings.phone} />
      <section className="hero">
        <div className="wrap hero-inner seo-hero">
          <div>
            <span className="kicker">{p.type === "region" ? "Локальная инженерная услуга" : "Инженерная услуга"}</span>
            <h1 className="h-display" style={{ fontSize: "clamp(34px, 4vw, 58px)" }}>{p.title}</h1>
            <p className="lead lead-dark">{p.intro}</p>
            <div className="hero-actions">
              <a className="cta cta-primary" href="/#estimate">
                Выезд инженера-замерщика бесплатно
                <ArrowRight size={15} weight="bold" />
              </a>
              <a className="cta cta-ghost" href="/#estimate">Рассчитать смету</a>
            </div>
          </div>
          <HeroDiagram />
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          <p className="stats-note">Официальная работа.<br />Смета фиксируется в договоре.</p>
          <div className="stat"><b>10+ <em>лет</em></b><small>в гидротехнике</small></div>
          <div className="stat"><b>500+ <em>объектов</em></b><small>в ЮФО</small></div>
          <div className="stat"><b>3 <em>года</em></b><small>гарантия по договору</small></div>
          <div className="stat"><b>0 <em>₽</em></b><small>выезд инженера</small></div>
        </div>
      </section>

      <section className="wrap section">
        <Reveal>
          <div className="section-head">
            <span className="kicker">Как принимается решение</span>
            <h2 className="h2">Не считаем дренаж вслепую.</h2>
            <p className="lead">Определяем источник воды, смотрим рельеф и грунт, проверяем глубину фундамента — только после этого выбираем состав системы.</p>
          </div>
        </Reveal>
        <div className="timeline timeline-5">
          {steps.map(([title, text], i) => (
            <div className="tl-step" key={title}>
              <span className="tl-num">0{i + 1}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="wrap">
          <div>
            <span className="kicker">Первый шаг — бесплатный</span>
            <h2 className="h2">Получите расчёт под ваш участок.</h2>
            <p className="lead lead-dark">Предварительная схема и расчёт — удалённо и бесплатно. Выезд инженера — 0 ₽ в пределах края и Адыгеи.</p>
          </div>
          <a className="cta cta-primary" href="/#estimate">
            Получить схему и расчёт
            <ArrowRight size={15} weight="bold" />
          </a>
        </div>
      </section>

      <SiteFooter phone={settings.phone} email={settings.email} />
      <MobileCta phone={settings.phone} />
    </main>
  );
}
