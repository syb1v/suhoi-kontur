"use client";
import { useState } from "react";
import { Chip, Leader } from "@/components/diagrams/drafting";

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

function ScenePuddle() {
  return (
    <svg className="dg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <defs>
        <marker id="pf-arrow-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path className="dg-accent-fill" d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <rect className="dg-plot" x="20" y="26" width="220" height="130" />
      <ellipse className="dg-water-soft" cx="118" cy="98" rx="46" ry="27" />
      <ellipse className="dg-water-line" cx="118" cy="98" rx="30" ry="17" />
      <ellipse className="dg-water-line" cx="118" cy="98" rx="14" ry="7" />
      <line className="dg-accent-line" x1="168" y1="98" x2="216" y2="98" markerEnd="url(#pf-arrow-1)" />
      <line className="dg-ink" x1="182" y1="88" x2="198" y2="108" />
      <line className="dg-ink" x1="182" y1="108" x2="198" y2="88" />
      <Chip x={168} y={48} text="НЕТ СБРОСА" />
      <Chip x={34} y={170} text="ЗАСТОЙ ПОСЛЕ ДОЖДЯ" />
    </svg>
  );
}

function SceneFoundation() {
  return (
    <svg className="dg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <defs>
        <marker id="pf-arrow-2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path className="dg-accent-fill" d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
        <pattern id="pf-hatch-2" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line className="dg-hatch" x1="0" y1="0" x2="0" y2="8" />
        </pattern>
      </defs>
      <line className="dg-ink" x1="20" y1="90" x2="240" y2="90" />
      <rect className="dg-soft" x="58" y="62" width="38" height="68" fill="url(#pf-hatch-2)" />
      <rect className="dg-ink" x="96" y="34" width="22" height="96" />
      <rect className="dg-ink" x="76" y="130" width="62" height="14" />
      <rect className="dg-water-soft" x="118" y="110" width="102" height="34" />
      <line className="dg-water-line" x1="118" y1="110" x2="220" y2="110" strokeDasharray="6 4" />
      <line className="dg-accent-line" x1="206" y1="118" x2="150" y2="118" markerEnd="url(#pf-arrow-2)" />
      <line className="dg-accent-line" x1="206" y1="128" x2="150" y2="128" markerEnd="url(#pf-arrow-2)" />
      <line className="dg-accent-line" x1="206" y1="138" x2="150" y2="138" markerEnd="url(#pf-arrow-2)" />
      <Chip x={34} y={44} text="ЦОКОЛЬ" />
      <Leader x1={93} y1={53} x2={84} y2={72} />
      <Chip x={122} y={168} text="ДАВЛЕНИЕ ВОДЫ" />
    </svg>
  );
}

function SceneBasement() {
  return (
    <svg className="dg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <defs>
        <marker id="pf-arrow-3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path className="dg-accent-fill" d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <path className="dg-ink" d="M 50 28 L 50 164 L 210 164 L 210 28" />
      <line className="dg-ink" x1="42" y1="28" x2="218" y2="28" />
      <line className="dg-ink" x1="50" y1="100" x2="210" y2="100" />
      <line className="dg-soft" x1="50" y1="108" x2="210" y2="108" />
      <rect className="dg-water-soft" x="56" y="114" width="148" height="44" />
      <line className="dg-water-line" x1="56" y1="114" x2="204" y2="114" strokeDasharray="6 4" />
      <line className="dg-dashed" x1="210" y1="92" x2="244" y2="92" />
      <line className="dg-accent-line" x1="130" y1="152" x2="130" y2="122" markerEnd="url(#pf-arrow-3)" />
      <text className="dg-label" x="150" y="94">УГВ</text>
      <text className="dg-label" x="150" y="82">ОТМ. 0,00</text>
      <Chip x={64} y={132} text="ПОДВАЛ В ВОДЕ" />
    </svg>
  );
}

const bladeX = Array.from({ length: 12 }, (_, i) => 36 + i * 17);

function SceneLawn() {
  return (
    <svg className="dg" viewBox="0 0 260 200" fill="none" aria-hidden="true">
      <line className="dg-ink" x1="20" y1="88" x2="240" y2="88" />
      {bladeX.map((x, i) => (
        <path key={x} className={i === 3 || i === 8 ? "dg-wilt" : "dg-ink"} d={`M ${x} 88 C ${x - 3} 74, ${x + 3} 64, ${x} 54`} />
      ))}
      <rect className="dg-water-soft" x="28" y="104" width="204" height="44" />
      <line className="dg-water-line" x1="28" y1="104" x2="232" y2="104" strokeDasharray="6 4" />
      <line className="dg-soft" x1="28" y1="148" x2="232" y2="148" />
      <line className="dg-water-line" x1="28" y1="126" x2="232" y2="126" strokeDasharray="4 6" />
      <Chip x={36} y={160} text="КОРНИ БЕЗ ВОЗДУХА" />
      <Chip x={244} y={40} text="ГАЗОН ГИБНЕТ" anchor="end" />
    </svg>
  );
}

const scenes = [ScenePuddle, SceneFoundation, SceneBasement, SceneLawn];

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
