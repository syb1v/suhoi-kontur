import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { cases, services, siteSettings } from "@/db/schema";

export type SiteSettings = Record<string, string>;

export const defaultSettings: SiteSettings = {
  phone: "+7 (000) 000-00-00",
  email: "info@suhoi-kontur.ru",
  telegram: "",
  whatsapp: "",
  metrika_id: "",
  rate_per_meter: "3500",
  min_price: "200000",
  guarantee_years: "3",
};

export type PublicCase = {
  id: number;
  site: string;
  title: string;
  body: string;
  length: string;
  days: string;
  price: string;
  image: string | null;
};

export type PublicService = { id: number; title: string; note: string };

const defaultCases: PublicCase[] = [
  { id: 1, site: "Краснодар · КП «Новая Европа»", title: "Кольцевой дренаж коттеджа", body: "Вода стояла у отмостки после ливней, цоколь постоянно сырел. Смонтирован кольцевой контур с выводом в колодец.", length: "86 м", days: "6 дней", price: "260 000 ₽", image: null },
  { id: 2, site: "Новороссийск · Мысхако", title: "Дренаж участка на уклоне", body: "Сток собирался в нижней точке участка. Организован перехват воды и отвод через поглотительный колодец.", length: "74 м", days: "5 дней", price: "245 000 ₽", image: null },
  { id: 3, site: "Адыгея · Яблоновский", title: "Комплекс: дом и участок", body: "Глинистый грунт, высокий уровень воды. Разделены поверхностный и глубинный контуры, восстановлен газон.", length: "112 м", days: "7 дней", price: "320 000 ₽", image: null },
];

const defaultServices: PublicService[] = [
  { id: 1, title: "Дренаж фундамента", note: "Пристенный и кольцевой контур вокруг дома" },
  { id: 2, title: "Дренаж участка", note: "Глубинный и поверхностный отвод воды" },
  { id: 3, title: "Ливневая канализация", note: "Вода с кровли, отмостки и площадок" },
  { id: 4, title: "Водопонижение", note: "Сложные глинистые и переувлажнённые грунты" },
  { id: 5, title: "Колодцы и насосные станции", note: "Сбор, фильтрация и принудительный сброс" },
];

export async function getSettings(): Promise<SiteSettings> {
  try {
    await ensureDatabase();
    const rows = await db.select().from(siteSettings);
    const map: SiteSettings = { ...defaultSettings };
    rows.forEach((row) => { map[row.key] = row.value; });
    return map;
  } catch {
    return { ...defaultSettings };
  }
}

export async function getPublicData(): Promise<{ settings: SiteSettings; cases: PublicCase[]; services: PublicService[] }> {
  try {
    await ensureDatabase();
    const [settingRows, caseRows, serviceRows] = await Promise.all([
      db.select().from(siteSettings),
      db.select().from(cases).where(eq(cases.visible, true)).orderBy(asc(cases.sortOrder), asc(cases.id)),
      db.select().from(services).where(eq(services.visible, true)).orderBy(asc(services.sortOrder), asc(services.id)),
    ]);
    const settings: SiteSettings = { ...defaultSettings };
    settingRows.forEach((row) => { settings[row.key] = row.value; });
    return {
      settings,
      cases: caseRows.map((c) => ({ id: c.id, site: c.site, title: c.title, body: c.body, length: c.length, days: c.days, price: c.price, image: c.image })),
      services: serviceRows.map((s) => ({ id: s.id, title: s.title, note: s.note })),
    };
  } catch {
    return { settings: { ...defaultSettings }, cases: defaultCases, services: defaultServices };
  }
}
