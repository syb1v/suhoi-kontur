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

function PuddleScene() {
  return (
    <svg className="pf-svg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <rect x="16" y="20" width="228" height="160" className="pf-plot" />
      <path className="pf-ink-soft" d="M16 96 C 60 84, 110 108, 164 96 S 224 84, 244 92" />
      <path className="pf-water-soft" d="M62 118 C 82 100, 138 98, 162 114 C 186 130, 158 152, 118 152 C 84 152, 44 138, 62 118 Z" />
      <ellipse cx="118" cy="126" rx="34" ry="12" className="pf-ink-soft" />
      <ellipse cx="118" cy="126" rx="16" ry="6" className="pf-ink-soft" />
      <line x1="196" y1="58" x2="196" y2="86" className="pf-ink" />
      <path d="M196 62 L192 70 M196 62 L200 70" className="pf-ink" />
      <line x1="184" y1="72" x2="208" y2="72" className="pf-ink" />
      <text className="pf-label" x="182" y="52">НЕТ СБРОСА</text>
      <text className="pf-label" x="42" y="168">ЗАСТОЙ ПОСЛЕ ДОЖДЯ</text>
    </svg>
  );
}

function FoundationScene() {
  return (
    <svg className="pf-svg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <path className="pf-ink-soft" d="M16 78 L 104 78 L 104 168 L 16 168" />
      <path className="pf-ink" d="M104 60 L 104 168 L 130 168 L 130 60 Z" />
      <rect x="94" y="60" width="52" height="18" className="pf-ink-soft" />
      <line x1="16" y1="60" x2="94" y2="60" className="pf-ink" />
      <line x1="150" y1="60" x2="244" y2="60" className="pf-ink" />
      <rect x="150" y="88" width="94" height="80" className="pf-water-soft" />
      <line x1="150" y1="88" x2="244" y2="88" className="pf-ink" strokeDasharray="6 4" />
      <path d="M186 112 L 166 112 M186 112 L 179 108 M186 112 L 179 116" className="pf-water-line" />
      <path d="M186 136 L 160 136 M186 136 L 173 132 M186 136 L 173 140" className="pf-water-line" />
      <path d="M186 158 L 164 158 M186 158 L 177 154 M186 158 L 177 162" className="pf-water-line" />
      <text className="pf-label" x="148" y="80">ДАВЛЕНИЕ ВОДЫ</text>
      <text className="pf-label" x="30" y="94">ЦОКОЛЬ</text>
    </svg>
  );
}

function BasementScene() {
  return (
    <svg className="pf-svg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <path className="pf-ink" d="M48 34 L 48 156 L 212 156 L 212 34" />
      <line x1="36" y1="34" x2="224" y2="34" className="pf-ink" />
      <line x1="48" y1="92" x2="212" y2="92" className="pf-ink" />
      <line x1="48" y1="118" x2="212" y2="118" className="pf-ink-soft" />
      <rect x="52" y="126" width="156" height="30" className="pf-water-soft" />
      <line x1="52" y1="126" x2="208" y2="126" className="pf-water-line" />
      <line x1="212" y1="86" x2="244" y2="86" className="pf-ink" strokeDasharray="6 4" />
      <text className="pf-label" x="216" y="80">УГВ</text>
      <text className="pf-label" x="60" y="146">ПОДВАЛ В ВОДЕ</text>
      <line x1="130" y1="92" x2="130" y2="118" className="pf-ink" />
      <path d="M130 118 L126 110 M130 118 L134 110" className="pf-ink" />
    </svg>
  );
}

function LawnScene() {
  const blades = [40, 56, 72, 88, 104, 120, 136, 152, 168, 184, 200, 216];
  return (
    <svg className="pf-svg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <line x1="24" y1="96" x2="236" y2="96" className="pf-ink" />
      <rect x="24" y="118" width="212" height="52" className="pf-water-soft" />
      <line x1="24" y1="118" x2="236" y2="118" className="pf-water-line" strokeDasharray="6 4" />
      <path d="M24 150 C 90 142, 170 158, 236 148" className="pf-ink-soft" />
      {blades.map((x, i) => (
        <path
          key={x}
          d={`M ${x} 96 C ${x - 2} 82, ${x + 3} 74, ${x + 1} 66`}
          className={i === 4 || i === 9 ? "pf-wilt" : "pf-ink"}
        />
      ))}
      <text className="pf-label" x="30" y="188">КОРНИ БЕЗ ВОЗДУХА</text>
      <text className="pf-label" x="170" y="88">ГАЗОН ГИБНЕТ</text>
    </svg>
  );
}

const scenes = [PuddleScene, FoundationScene, BasementScene, LawnScene];

export function ProblemExplorer() {
  const [active, setActive] = useState(0);
  const item = problems[active];
  const Scene = scenes[active];

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
        <figure className="problem-figure">
          <Scene />
        </figure>
      </div>
    </div>
  );
}
