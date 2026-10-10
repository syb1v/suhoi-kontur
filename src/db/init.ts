import { sqlite } from "./client";

let initialized = false;

const seedCases: [number, string, string, string, string, string, string, number][] = [
  [1, "Краснодар · КП «Новая Европа»", "Кольцевой дренаж коттеджа", "Вода стояла у отмостки после ливней, цоколь постоянно сырел. Смонтирован кольцевой контур с выводом в колодец.", "86 м", "6 дней", "260 000 ₽", 1],
  [2, "Новороссийск · Мысхако", "Дренаж участка на уклоне", "Сток собирался в нижней точке участка. Организован перехват воды и отвод через поглотительный колодец.", "74 м", "5 дней", "245 000 ₽", 2],
  [3, "Адыгея · Яблоновский", "Комплекс: дом и участок", "Глинистый грунт, высокий уровень воды. Разделены поверхностный и глубинный контуры, восстановлен газон.", "112 м", "7 дней", "320 000 ₽", 3],
];

const seedServices: [number, string, string, string, number][] = [
  [1, "Дренаж фундамента", "Пристенный и кольцевой контур вокруг дома", "/drenazh-fundamenta", 1],
  [2, "Дренаж участка", "Глубинный и поверхностный отвод воды", "/drenazh-uchastka", 2],
  [3, "Ливневая канализация", "Вода с кровли, отмостки и площадок", "/livnevaya-kanalizaciya", 3],
  [4, "Водопонижение", "Сложные глинистые и переувлажнённые грунты", "/vodoponizhenie", 4],
  [5, "Колодцы и насосные станции", "Сбор, фильтрация и принудительный сброс", "/septiki-i-kolodcy", 5],
];

const seedSettings: [string, string][] = [
  ["phone", "+7 (000) 000-00-00"],
  ["email", "info@suhoi-kontur.ru"],
  ["telegram", ""],
  ["whatsapp", ""],
  ["metrika_id", ""],
  ["rate_per_meter", "3500"],
  ["min_price", "200000"],
  ["guarantee_years", "3"],
];

async function seed() {
  for (const [id, site, title, body, length, days, price, sortOrder] of seedCases) {
    await sqlite.execute({
      sql: "INSERT OR IGNORE INTO cases (id, site, title, body, length, days, price, visible, sort_order) VALUES (?,?,?,?,?,?,?,1,?)",
      args: [id, site, title, body, length, days, price, sortOrder],
    });
  }
  for (const [id, title, note, href, sortOrder] of seedServices) {
    await sqlite.execute({
      sql: "INSERT OR IGNORE INTO services (id, title, note, href, visible, sort_order) VALUES (?,?,?,?,1,?)",
      args: [id, title, note, href, sortOrder],
    });
  }
  await sqlite.execute("UPDATE services SET href='/drenazh-fundamenta' WHERE id=1 AND href IS NULL");
  await sqlite.execute("UPDATE services SET href='/drenazh-uchastka' WHERE id=2 AND href IS NULL");
  await sqlite.execute("UPDATE services SET href='/livnevaya-kanalizaciya' WHERE id=3 AND href IS NULL");
  await sqlite.execute("UPDATE services SET href='/vodoponizhenie' WHERE id=4 AND href IS NULL");
  await sqlite.execute("UPDATE services SET href='/septiki-i-kolodcy' WHERE id=5 AND href IS NULL");
  for (const [key, value] of seedSettings) {
    await sqlite.execute({ sql: "INSERT OR IGNORE INTO site_settings (key, value) VALUES (?,?)", args: [key, value] });
  }
}

export async function ensureDatabase() {
  if (initialized) return;
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, phone TEXT NOT NULL, messenger TEXT NOT NULL, object_type TEXT NOT NULL, length INTEGER NOT NULL, drainage TEXT NOT NULL, problem TEXT, soil TEXT, location TEXT, estimate_min INTEGER NOT NULL, estimate_max INTEGER NOT NULL, status TEXT NOT NULL DEFAULT 'new', manager_note TEXT, created_at INTEGER NOT NULL)`);
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS analytics_events (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, path TEXT, metadata TEXT, created_at INTEGER NOT NULL)`);
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)`);
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS cases (id INTEGER PRIMARY KEY AUTOINCREMENT, site TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, length TEXT NOT NULL, days TEXT NOT NULL, price TEXT NOT NULL, image TEXT, visible INTEGER NOT NULL DEFAULT 1, sort_order INTEGER NOT NULL DEFAULT 0)`);
  await sqlite.execute(`CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, note TEXT NOT NULL, href TEXT, visible INTEGER NOT NULL DEFAULT 1, sort_order INTEGER NOT NULL DEFAULT 0)`);
  try {
    await sqlite.execute("ALTER TABLE leads ADD COLUMN manager_note TEXT");
  } catch {
    void 0;
  }
  try {
    await sqlite.execute("ALTER TABLE services ADD COLUMN href TEXT");
  } catch {
    void 0;
  }
  try {
    await seed();
  } catch {
    void 0;
  }
  initialized = true;
}
