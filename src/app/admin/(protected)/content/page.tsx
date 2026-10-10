import { asc } from "drizzle-orm";
import { db } from "@/db/client";
import { ensureDatabase } from "@/db/init";
import { cases, services } from "@/db/schema";
import { deleteCase, deleteService, upsertCase, upsertService } from "../actions";

export const dynamic = "force-dynamic";

type CaseRow = typeof cases.$inferSelect;
type ServiceRow = typeof services.$inferSelect;

function CaseForm({ row }: { row?: CaseRow }) {
  return (
    <form className="admin-form" action={upsertCase}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <div className="admin-grid-2">
        <label className="field">Локация
          <input name="site" defaultValue={row?.site ?? ""} placeholder="Краснодар · КП «…»" required />
        </label>
        <label className="field">Заголовок
          <input name="title" defaultValue={row?.title ?? ""} placeholder="Кольцевой дренаж коттеджа" required />
        </label>
      </div>
      <label className="field">Описание
        <textarea name="body" defaultValue={row?.body ?? ""} placeholder="Проблема → решение → результат" />
      </label>
      <div className="admin-grid-3">
        <label className="field">Погонаж
          <input name="length" defaultValue={row?.length ?? ""} placeholder="86 м" />
        </label>
        <label className="field">Срок
          <input name="days" defaultValue={row?.days ?? ""} placeholder="6 дней" />
        </label>
        <label className="field">Смета
          <input name="price" defaultValue={row?.price ?? ""} placeholder="260 000 ₽" />
        </label>
      </div>
      <div className="admin-grid-3">
        <label className="field">Порядок
          <input name="sortOrder" type="number" defaultValue={row?.sortOrder ?? 0} />
        </label>
        <label className="field">Фото (jpg/png/webp, до 5 МБ)
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp" />
        </label>
        <div style={{ display: "grid", gap: 8, alignContent: "center" }}>
          <label className="check"><input type="checkbox" name="visible" defaultChecked={row?.visible ?? true} /> Показывать на сайте</label>
          {row?.image ? (
            <label className="check"><input type="checkbox" name="removeImage" /> Удалить текущее фото</label>
          ) : null}
        </div>
      </div>
      {row?.image ? <img className="case-thumb" src={row.image} alt="" /> : null}
      <div className="admin-actions">
        <button className="cta cta-dark" type="submit">{row ? "Сохранить кейс" : "Добавить кейс"}</button>
        {row ? (
          <button className="danger-btn" type="submit" formAction={deleteCase}>Удалить</button>
        ) : null}
      </div>
    </form>
  );
}

function ServiceForm({ row }: { row?: ServiceRow }) {
  return (
    <form className="admin-form admin-form-row" action={upsertService}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <label className="field">Название
        <input name="title" defaultValue={row?.title ?? ""} placeholder="Дренаж участка" required />
      </label>
      <label className="field">Пояснение
        <input name="note" defaultValue={row?.note ?? ""} placeholder="Глубинный и поверхностный отвод воды" />
      </label>
      <label className="field field-narrow">Порядок
        <input name="sortOrder" type="number" defaultValue={row?.sortOrder ?? 0} />
      </label>
      <div className="admin-actions">
        <label className="check"><input type="checkbox" name="visible" defaultChecked={row?.visible ?? true} /> На сайте</label>
        <button className="cta cta-dark" type="submit">Сохранить</button>
        {row ? <button className="danger-btn" type="submit" formAction={deleteService}>Удалить</button> : null}
      </div>
    </form>
  );
}

export default async function AdminContent() {
  await ensureDatabase();
  const caseRows = await db.select().from(cases).orderBy(asc(cases.sortOrder), asc(cases.id));
  const serviceRows = await db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id));

  return (
    <>
      <span className="kicker">Контент сайта</span>
      <h1 className="h2" style={{ margin: "16px 0 10px" }}>Кейсы и услуги</h1>
      <p className="lead" style={{ maxWidth: 620 }}>
        Всё, что вы сохраните здесь, сразу появляется на сайте. Фото загружаются локально
        в <span className="mono">/public/uploads</span>; при переезде на production подключим объектное хранилище.
      </p>

      <h2 className="h3" style={{ margin: "38px 0 14px" }}>Кейсы ({caseRows.length})</h2>
      <div style={{ display: "grid", gap: 18 }}>
        {caseRows.map((row) => <CaseForm key={row.id} row={row} />)}
        <details className="admin-form">
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>Добавить новый кейс</summary>
          <div style={{ marginTop: 16 }}>
            <CaseForm />
          </div>
        </details>
      </div>

      <h2 className="h3" style={{ margin: "38px 0 14px" }}>Услуги ({serviceRows.length})</h2>
      <div style={{ display: "grid", gap: 18 }}>
        {serviceRows.map((row) => <ServiceForm key={row.id} row={row} />)}
        <details className="admin-form">
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>Добавить услугу</summary>
          <div style={{ marginTop: 16 }}>
            <ServiceForm />
          </div>
        </details>
      </div>
    </>
  );
}
