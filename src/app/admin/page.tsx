import { desc } from "drizzle-orm";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = {
  new: "Новая",
  contacted: "Связались",
  measured: "Замер",
  contract: "Договор",
  done: "Завершена",
  archived: "Архив",
};

export default async function Admin() {
  await ensureDatabase();
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(50);
  const now = new Date();
  const monthCount = rows.filter((r) => r.createdAt && now.getTime() - r.createdAt.getTime() < 30 * 864e5).length;
  const avgCheck = rows.length
    ? Math.round(rows.reduce((sum, r) => sum + Math.round((r.estimateMin + r.estimateMax) / 2), 0) / rows.length)
    : 0;

  return (
    <main className="site" style={{ background: "var(--paper-2)", minHeight: "100vh" }}>
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="/">
            <span className="brand-mark"><span>СК</span></span>
            СУХОЙ КОНТУР
          </a>
          <div className="top-actions">
            <span className="phone" style={{ color: "var(--muted-dark)", fontWeight: 500 }}>Рабочая область</span>
            <a className="cta cta-primary" href="/">
              На сайт
              <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </div>
      </header>

      <div className="wrap section">
        <span className="kicker">Панель управления</span>
        <h1 className="h2" style={{ margin: "16px 0 10px" }}>Контур управления</h1>
        <p className="lead" style={{ maxWidth: 560 }}>
          Заявки с сайта хранятся локально до подключения production-базы.
          Данные калькулятора приходят вместе с контактами.
        </p>

        <div className="stats" style={{ marginTop: 40, borderRadius: 4 }}>
          <div className="wrap stats-grid" style={{ width: "100%", padding: "30px 34px" }}>
            <p className="stats-note">Сводка по сохранённым заявкам.<br />Обновляется при каждой отправке квиза.</p>
            <div className="stat"><b>{rows.length}</b><small>заявок всего</small></div>
            <div className="stat"><b>{monthCount}</b><small>за последние 30 дней</small></div>
            <div className="stat"><b>{avgCheck ? new Intl.NumberFormat("ru-RU").format(avgCheck) + " ₽" : "—"}</b><small>средний ориентир</small></div>
            <div className="stat"><b>5</b><small>SEO-страниц услуг</small></div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.25fr .75fr", gap: 24, marginTop: 24 }}>
          <section style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 4, padding: "26px 28px" }}>
            <h2 className="h3" style={{ marginBottom: 6 }}>Последние заявки</h2>
            <p style={{ color: "var(--muted)", fontSize: 13.5, marginBottom: 16 }}>Источник параметров — квиз-калькулятор.</p>
            {rows.length === 0 && (
              <p style={{ color: "var(--muted)", padding: "18px 0" }}>
                Заявок пока нет. Первая появится после отправки квиза на главной странице.
              </p>
            )}
            <div>
              {rows.map((r) => (
                <div key={r.id} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
                  <div>
                    <b className="mono" style={{ fontSize: 14 }}>{r.phone}</b>
                    <p style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 4 }}>
                      {r.location ?? "Локация не указана"} · {r.objectType} · {r.length} м · {r.drainage === "pump" ? "насос" : r.drainage === "well" ? "колодец" : "самотёк"}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flex: "0 0 auto" }}>
                    <span className="mono" style={{ fontSize: 12, color: "var(--cyan-deep)" }}>
                      {new Intl.NumberFormat("ru-RU").format(r.estimateMin)}–{new Intl.NumberFormat("ru-RU").format(r.estimateMax)} ₽
                    </span>
                    <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>{statusLabels[r.status] ?? r.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: "#032830", color: "#fff", borderRadius: 4, padding: "26px 28px", alignSelf: "start" }}>
            <span className="kicker">Конструктор страницы</span>
            <h2 className="h3" style={{ margin: "14px 0 10px", color: "#fff" }}>Управление контентом</h2>
            <p style={{ color: "#9dc3c9", fontSize: 13.5, lineHeight: 1.6 }}>
              Следующий этап: редактирование секций, кейсов, SEO-полей и медиа без кода.
              Типизированные блоки не позволят нарушить структуру сайта.
            </p>
            <div style={{ marginTop: 20, display: "grid", gap: 8 }}>
              {["Hero · включён", "Услуги · включены", "Кейсы · демо-данные", "FAQ · включён", "SEO · статический"].map((x) => (
                <div key={x} style={{ borderBottom: "1px solid #16303a", padding: "10px 0", fontSize: 13, color: "#cfe0e2" }}>{x}</div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
