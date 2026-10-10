import { desc, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { analyticsEvents, leads } from "@/db/schema";
import { updateLead } from "./actions";

export const dynamic = "force-dynamic";

const statuses: [string, string][] = [
  ["new", "Новая"],
  ["contacted", "Связались"],
  ["measured", "Замер"],
  ["contract", "Договор"],
  ["done", "Завершена"],
  ["archived", "Архив"],
];

const eventLabels: Record<string, string> = {
  page_view: "Просмотры страниц",
  quiz_step: "Шаги квиза",
  quiz_submit: "Отправки квиза",
  phone_click: "Клики по телефону",
  cta_click: "Клики по CTA",
  email_click: "Клики по почте",
};

const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

export default async function AdminDashboard() {
  await ensureDatabase();
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(50);
  const events = await db
    .select({ name: analyticsEvents.name, count: sql<number>`count(*)` })
    .from(analyticsEvents)
    .groupBy(analyticsEvents.name);
  const eventTotal = events.reduce((sum, e) => sum + Number(e.count), 0);

  return (
    <>
      <span className="kicker">Панель управления</span>
      <h1 className="h2" style={{ margin: "16px 0 10px" }}>Контур управления</h1>
      <p className="lead" style={{ maxWidth: 560 }}>
        Заявки с калькулятора, статусы обработки и first-party аналитика.
        Данные хранятся локально до подключения production-базы.
      </p>

      <div className="stats" style={{ marginTop: 40, borderRadius: 4 }}>
        <div className="stats-grid" style={{ width: "100%", padding: "30px 34px" }}>
          <p className="stats-note">Сводка обновляется при каждой отправке квиза и действии на сайте.</p>
          <div className="stat"><b>{rows.length}</b><small>заявок всего</small></div>
          <div className="stat"><b>{rows.filter((r) => r.status === "new").length}</b><small>новых без ответа</small></div>
          <div className="stat"><b>{eventTotal}</b><small>событий аналитики</small></div>
          <div className="stat"><b>5</b><small>SEO-страниц услуг</small></div>
        </div>
      </div>

      <h2 className="h3" style={{ margin: "40px 0 6px" }}>Аналитика</h2>
      <p style={{ color: "var(--muted)", fontSize: 13.5 }}>Собственный трекер: данные не уходят третьим лицам. Яндекс Метрика подключается отдельно.</p>
      <div className="analytics-grid">
        {Object.entries(eventLabels).map(([key, label]) => {
          const found = events.find((e) => e.name === key);
          return (
            <div className="analytics-card" key={key}>
              <b>{fmt(Number(found?.count ?? 0))}</b>
              <small>{label}</small>
            </div>
          );
        })}
      </div>

      <h2 className="h3" style={{ margin: "40px 0 6px" }}>Заявки</h2>
      <p style={{ color: "var(--muted)", fontSize: 13.5 }}>
        Меняйте статус и оставляйте заметки — изменения сохраняются сразу.
      </p>
      {rows.length === 0 && (
        <p style={{ color: "var(--muted)", padding: "18px 0" }}>
          Заявок пока нет. Первая появится после отправки квиза на главной странице.
        </p>
      )}
      <div>
        {rows.map((r) => (
          <form className="lead-card" action={updateLead} key={r.id}>
            <input type="hidden" name="id" value={r.id} />
            <div>
              <span className="lead-phone">{r.phone}</span>
              <p className="lead-meta">
                {r.location ?? "Локация не указана"} · {r.objectType} · {r.length} м ·{" "}
                {r.drainage === "pump" ? "насос" : r.drainage === "well" ? "колодец" : "самотёк"}
              </p>
              <p className="lead-meta">
                {fmt(r.estimateMin)}–{fmt(r.estimateMax)} ₽ · {r.createdAt ? r.createdAt.toLocaleDateString("ru-RU") : "—"}
                {r.problem ? ` · ${r.problem}` : ""}
              </p>
            </div>
            <select className="status-select" name="status" defaultValue={r.status} aria-label="Статус заявки">
              {statuses.map(([value, label]) => (
                <option value={value} key={value}>{label}</option>
              ))}
            </select>
            <input className="note-input" name="note" defaultValue={r.managerNote ?? ""} placeholder="Заметка менеджера" />
            <button className="cta cta-dark" type="submit">Сохранить</button>
          </form>
        ))}
      </div>
    </>
  );
}
