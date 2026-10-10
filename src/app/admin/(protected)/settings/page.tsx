import { getSettings } from "@/lib/content";
import { updateSettings } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const settings = await getSettings();
  return (
    <>
      <span className="kicker">Настройки</span>
      <h1 className="h2" style={{ margin: "16px 0 10px" }}>Контакты и интеграции</h1>
      <p className="lead" style={{ maxWidth: 620 }}>
        Эти значения подставляются в шапку, подвал, schema.org и кнопки связи.
        После сохранения изменения публикуются на сайте.
      </p>

      <form className="admin-form" action={updateSettings} style={{ marginTop: 28, maxWidth: 760 }}>
        <div className="admin-grid-2">
          <label className="field">Рабочий телефон
            <input name="phone" defaultValue={settings.phone} placeholder="+7 (___) ___-__-__" />
          </label>
          <label className="field">E-mail на домене
            <input name="email" defaultValue={settings.email} placeholder="info@suhoi-kontur.ru" />
          </label>
        </div>
        <div className="admin-grid-2">
          <label className="field">Telegram (ссылка или ник)
            <input name="telegram" defaultValue={settings.telegram} placeholder="https://t.me/..." />
          </label>
          <label className="field">WhatsApp (ссылка)
            <input name="whatsapp" defaultValue={settings.whatsapp} placeholder="https://wa.me/..." />
          </label>
        </div>
        <div className="admin-grid-3">
          <label className="field">Ставка, ₽/м
            <input name="rate_per_meter" defaultValue={settings.rate_per_meter} />
          </label>
          <label className="field">Минимальный объект, ₽
            <input name="min_price" defaultValue={settings.min_price} />
          </label>
          <label className="field">Гарантия, лет
            <input name="guarantee_years" defaultValue={settings.guarantee_years} />
          </label>
        </div>
        <label className="field">ID Яндекс Метрики
          <input name="metrika_id" defaultValue={settings.metrika_id} placeholder="например, 12345678" />
        </label>
        <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
          Пока счётчик не задан, работает только собственная аналитика.
          Цели (квиз, клики по телефону и CTA) отправляются в Метрику автоматически, как только указан ID.
        </p>
        <div className="admin-actions">
          <button className="cta cta-dark" type="submit">Сохранить настройки</button>
        </div>
      </form>
    </>
  );
}
