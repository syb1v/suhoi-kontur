"use client";
import { useState } from "react";
import { calculateEstimate, type Drainage } from "@/lib/calculator";

const rub = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";
const steps = ["Объект", "Размер", "Сброс", "Контакты"];

export function Calculator() {
  const [step, setStep] = useState(0);
  const [length, setLength] = useState(60);
  const [drainage, setDrainage] = useState<Drainage>("well");
  const [objectType, setObjectType] = useState("Комплекс: дом + участок + ливневка");
  const [problem, setProblem] = useState("Вода стоит после дождя");
  const [soil, setSoil] = useState("Не знаю");
  const [location, setLocation] = useState("Краснодар");
  const [phone, setPhone] = useState("");
  const [messenger, setMessenger] = useState("Telegram");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const estimate = calculateEstimate(length, drainage);

  const next = () => { setError(""); if (step < 3) setStep(step + 1); };
  const back = () => { setError(""); setStep(Math.max(0, step - 1)); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone, messenger, objectType, length, drainage, problem, soil, location }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Проверьте данные и попробуйте ещё раз");
        return;
      }
      setSent(true);
    } catch {
      setError("Нет связи с сервером. Попробуйте ещё раз или позвоните.");
    }
  };

  return (
    <div className="calculator">
      <div className="quiz-progress">
        {steps.map((label, i) => (
          <span key={label} className={i <= step && !sent ? "current" : i < step || sent ? "current" : ""}>
            <b>0{i + 1}</b>
            {label}
          </span>
        ))}
      </div>

      {sent ? (
        <div className="quiz-success">
          <span className="kicker">Заявка сохранена</span>
          <h3>Инженер свяжется с вами.</h3>
          <p>
            Предварительный диапазон: <strong>{rub(estimate.min)} — {rub(estimate.max)}</strong>
            <br />
            Формула: ({length} м × 3 500 ₽) + оборудование точки сброса.
          </p>
          <div className="quiz-actions" style={{ justifyContent: "flex-start" }}>
            <button className="cta cta-ghost" onClick={() => { setSent(false); setStep(0); }}>
              Рассчитать ещё один объект
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit}>
          {step === 0 && (
            <div className="quiz-step">
              <label className="form-label">
                Что нужно защитить?
                <select value={objectType} onChange={(e) => setObjectType(e.target.value)}>
                  <option>Комплекс: дом + участок + ливневка</option>
                  <option>Фундамент дома / коттеджа</option>
                  <option>Участок целиком</option>
                </select>
              </label>
              <label className="form-label">
                Что происходит на участке?
                <select value={problem} onChange={(e) => setProblem(e.target.value)}>
                  <option>Вода стоит после дождя</option>
                  <option>Сыреет фундамент</option>
                  <option>Подтапливает подвал</option>
                  <option>Гибнет газон</option>
                </select>
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="quiz-step">
              <label className="form-label">
                <span className="range-row">
                  <span>Ориентировочная длина трассы</span>
                  <span className="range-value">{length} м</span>
                </span>
                <input className="range" type="range" min="50" max="150" value={length} onChange={(e) => setLength(+e.target.value)} />
              </label>
              <label className="form-label">
                Тип грунта
                <select value={soil} onChange={(e) => setSoil(e.target.value)}>
                  <option>Не знаю</option>
                  <option>Глина</option>
                  <option>Суглинок</option>
                  <option>Песок</option>
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="quiz-step">
              <fieldset className="form-label">
                <legend>Куда отводить воду?</legend>
                <div className="radio-list">
                  {([
                    ["free", "Канава или центральная сеть"],
                    ["well", "Поглотительный колодец · +35 000 ₽"],
                    ["pump", "Колодец с насосом · +65 000 ₽"],
                  ] as [Drainage, string][]).map(([value, label]) => (
                    <label className="radio" key={value}>
                      <input type="radio" name="drainage" checked={drainage === value} onChange={() => setDrainage(value)} />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="form-label">
                Где находится участок?
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option>Краснодар</option>
                  <option>Адыгея</option>
                  <option>Новороссийск</option>
                  <option>Другое место в зоне работ</option>
                </select>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="quiz-step">
              <label className="form-label">
                Телефон
                <input className="input" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" autoComplete="tel" />
              </label>
              <label className="form-label">
                Куда отправить расчёт?
                <select value={messenger} onChange={(e) => setMessenger(e.target.value)}>
                  <option>Telegram</option>
                  <option>WhatsApp</option>
                  <option>Позвонить</option>
                </select>
              </label>
              <label className="honeypot">Сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
          )}

          <div className="estimate">
            <span className="estimate-label">Предварительный ориентир</span>
            <div className="estimate-value">{rub(estimate.min)} — <em>{rub(estimate.max)}</em></div>
            <small>Финальная смета — после осмотра: рельеф, грунт и точка сброса могут изменить состав системы.</small>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="quiz-actions">
            {step > 0 && (
              <button type="button" className="cta cta-ghost" onClick={back}>Назад</button>
            )}
            {step < 3 ? (
              <button type="button" className="cta cta-primary" onClick={next}>Продолжить →</button>
            ) : (
              <button type="submit" className="cta cta-primary">Получить схему и расчёт</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
