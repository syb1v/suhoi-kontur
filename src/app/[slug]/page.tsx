import type { Metadata } from "next";
const pages:Record<string,{title:string;description:string}>= {
  "drenazh-uchastka":{title:"Дренаж участка в Краснодарском крае",description:"Глубинный и поверхностный дренаж участка: проектирование, монтаж и отвод воды."},
  "drenazh-fundamenta":{title:"Дренаж фундамента дома",description:"Пристенный и кольцевой дренаж для защиты фундамента, подвала и цоколя."},
  "livnevaya-kanalizaciya":{title:"Ливневая канализация",description:"Отвод дождевых и талых вод с кровли, отмостки и площадок участка."},
  "vodoponizhenie":{title:"Понижение грунтовых вод",description:"Инженерные системы водопонижения на сложных глинистых грунтах."},
  "septiki-i-kolodcy":{title:"Септики и дренажные колодцы",description:"Монтаж сборных резервуаров, колодцев и насосных станций."},
};
export function generateStaticParams(){return Object.keys(pages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {const {slug}=await params;const p=pages[slug]??{title:"Дренаж в Краснодарском крае",description:"Инженерные системы водоотведения."};return {title:p.title,description:p.description};}
export default async function SeoPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=pages[slug]??{title:"Инженерная защита участка",description:"Дренаж и водоотведение."};return <main><header className="border-b"><div className="container py-5"><a href="/" className="font-bold">СУХОЙ <span className="text-cyan-600">КОНТУР</span></a></div></header><section className="grid-lines py-28"><div className="container"><span className="eyebrow">Инженерная услуга</span><h1 className="mt-5 max-w-3xl text-5xl font-bold">{p.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{p.description} Работаем по Краснодару, Адыгее и в зоне от Туапсе до Крымского моста. Официальный договор и гарантия 3 года.</p><a href="/#estimate" className="button button-primary mt-8">Получить схему водоотведения и расчет сметы</a></div></section></main>}
