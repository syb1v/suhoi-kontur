"use client";
import { useState } from "react";

const layers = [
  ["01", "Грунт", "Отводим лишнюю воду из насыщенного слоя, не нарушая устойчивость участка."],
  ["02", "Дренирующая обсыпка", "Отделяет мелкие частицы грунта и сохраняет пропускную способность системы."],
  ["03", "Перфорированная труба", "Собирает воду по всей трассе и направляет её к колодцу или точке самотёка."],
  ["04", "Геотекстиль", "Не даёт грунту смешиваться с обсыпкой и заиливать контур."],
  ["05", "Основание под фундамент", "Защищает подошву от давления воды и сохраняет несущую способность."],
];

const heights: Record<number, string> = { 0: "cl-soil", 1: "cl-drain", 2: "cl-pipe", 3: "cl-filter", 4: "cl-base" };

export function CutawayDiagram() {
  const [active, setActive] = useState(2);

  return (
    <div className="cutaway">
      <div className="cutaway-figure" aria-hidden="true">
        {layers.map(([num, title], i) => (
          <div
            key={num}
            className={`cutaway-layer ${heights[i]} ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span>{title}</span>
          </div>
        ))}
        <div className="pipe-water" />
        <div className="pipe-slope">УКЛОН →</div>
      </div>
      <div className="cutaway-legend">
        {layers.map(([num, title, text], i) => (
          <button
            key={num}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
          >
            <span>{num}</span>
            <strong>{title}</strong>
            <p>{active === i ? text : ""}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
