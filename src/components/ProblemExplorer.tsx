"use client";
import { useState } from "react";

const problems = [
  {
    title: "Лужи не уходят",
    hint: "Вода стоит сутками после дождя",
    text: "Плотный грунт не принимает объём осадков, а понижение рельефа собирает сток в одну точку. Поверхностная вода размывает газон и переувлажняет грунт.",
    solution: "Сбор воды с поверхности, организация уклона и безопасная точка сброса — без земляных работ вслепую.",
  },
  {
    title: "Мокнет фундамент",
    hint: "Сырость в цоколе, трещины",
    text: "Вода скапливается у стен и создаёт постоянное давление на конструкцию. Со временем это разрушает отмостку и гидроизоляцию подошвы.",
    solution: "Пристенный или кольцевой дренаж с контролем глубины заложения относительно подошвы фундамента.",
  },
  {
    title: "Вода в подвале",
    hint: "Подтопление после ливней",
    text: "Грунтовая вода поднимается выше уровня пола подвала и находит слабые места в гидроизоляции. Насос не решает причину — только последствия.",
    solution: "Глубинное водопонижение, дренажный колодец и при необходимости станция принудительного сброса.",
  },
  {
    title: "Гибнет газон",
    hint: "Заболачивание, просадки",
    text: "В понижениях рельефа стоит вода: корни задыхаются, грунт теряет структуру, появляются просадки и мох. Озеленение гибнет каждый сезон.",
    solution: "Разделение поверхностного и глубинного контуров, восстановление уклонов и водоотвод с зон благоустройства.",
  },
];

export function ProblemExplorer() {
  const [active, setActive] = useState(0);
  const item = problems[active];

  return (
    <div className="problems">
      <div className="problem-nav" role="tablist" aria-label="Симптомы на участке">
        {problems.map((p, i) => (
          <button
            key={p.title}
            role="tab"
            aria-selected={active === i}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
          >
            <span className="p-num">0{i + 1}</span>
            <span className="p-title">{p.title}</span>
            <span className="p-hint">{p.hint}</span>
          </button>
        ))}
      </div>
      <div className="problem-body">
        <div>
          <h3>{item.title}</h3>
          <p className="p-text">{item.text}</p>
          <div className="p-solution">
            <span>Что делаем</span>
            <strong>{item.solution}</strong>
          </div>
        </div>
        <div className="problem-figure" aria-hidden="true">
          <div className="contour c1" />
          <div className="contour c2" />
          <div className="water-dot" />
          <div className="flow-out">ОТВОД ↘</div>
        </div>
      </div>
    </div>
  );
}
