"use client";
import { useState } from "react";

const layers = [
  ["otmostka", "01", "Отмостка и планировка", "Поверхностный сток уходит от стены, а не в грунт у фундамента."],
  ["soil", "02", "Грунт обратной засыпки", "Засыпка восстанавливает участок и пропускает воду к дренажу."],
  ["fabric", "03", "Геотекстиль", "Разделяет грунт и щебень, чтобы система не заилилась."],
  ["gravel", "04", "Щебень фр. 20–40", "Фильтрующая обсыпка — канал для воды вокруг трубы."],
  ["pipe", "05", "Перфорированная труба", "Собирает воду по всей трассе и отводит её с уклоном."],
  ["well", "06", "Колодец и выпуск", "Точка контроля и сброса воды из системы."],
] as const;

type LayerKey = (typeof layers)[number][0];

export function CutawayDiagram() {
  const [active, setActive] = useState<LayerKey>("pipe");
  const cls = (key: LayerKey) => (active === key ? "x-layer x-active" : "x-layer x-dim");

  const grassLeft = Array.from({ length: 11 }, (_, i) => 36 + i * 15);
  const grassRight = Array.from({ length: 38 }, (_, i) => 286 + i * 16).filter((x) => x < 676 || x > 788);
  const perforations = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180;
    return [Number((430 + 26 * Math.cos(a)).toFixed(2)), Number((368 + 26 * Math.sin(a)).toFixed(2))];
  });

  return (
    <div className="cutaway">
      <div className="cutaway-figure">
        <svg viewBox="0 0 920 530" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="x-soil" width="26" height="26" patternUnits="userSpaceOnUse">
              <rect width="26" height="26" fill="#c7b592" />
              <circle cx="6" cy="7" r="1.5" fill="#b19d76" />
              <circle cx="18" cy="16" r="1.2" fill="#b19d76" />
              <circle cx="11" cy="21" r="1" fill="#d2c1a0" />
            </pattern>
            <pattern id="x-soil-back" width="24" height="24" patternUnits="userSpaceOnUse">
              <rect width="24" height="24" fill="#d0bf9e" />
              <circle cx="5" cy="6" r="1.6" fill="#b8a37c" />
              <circle cx="17" cy="13" r="1.3" fill="#c0ac85" />
              <circle cx="9" cy="19" r="1.1" fill="#b8a37c" />
            </pattern>
            <pattern id="x-gravel" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="#b0996c" />
              <circle cx="8" cy="9" r="4" fill="#dcc9a3" stroke="#8a744e" strokeWidth="1" />
              <circle cx="21" cy="8" r="3.2" fill="#cdb68c" stroke="#8a744e" strokeWidth="1" />
              <circle cx="14" cy="21" r="4.4" fill="#e2d0ab" stroke="#8a744e" strokeWidth="1" />
              <circle cx="27" cy="23" r="2.6" fill="#d4bf97" stroke="#8a744e" strokeWidth="1" />
              <circle cx="1" cy="24" r="2.4" fill="#dcc9a3" stroke="#8a744e" strokeWidth="1" />
            </pattern>
            <pattern id="x-fabric" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="#4f767d" strokeWidth="1.8" />
            </pattern>
            <pattern id="x-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(53,150,161,0.09)" strokeWidth="1" />
            </pattern>
            <marker id="x-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0d9db6" />
            </marker>
          </defs>

          <rect x="0" y="0" width="920" height="530" fill="#f4f9f8" />
          <rect x="0" y="0" width="920" height="530" fill="url(#x-grid)" />

          {/* ground body */}
          <path d="M30 160 L190 160 L272 174 L890 174 L890 530 L30 530 Z" fill="url(#x-soil)" />

          {/* surface line */}
          <path d="M30 160 L190 160 L272 174 L890 174" className="x-ink" strokeWidth="1.6" />
          {grassLeft.map((x) => (
            <path key={`gl-${x}`} d={`M ${x} 160 L ${x - 3} 150`} className="x-grass" />
          ))}
          {grassRight.map((x) => (
            <path key={`gr-${x}`} d={`M ${x} 174 L ${x - 3} 164`} className="x-grass" />
          ))}

          {/* house fragment */}
          <rect x="70" y="40" width="120" height="120" fill="#e7e1d4" stroke="rgba(12,26,32,0.5)" strokeWidth="1.4" />
          <path d="M70 70 L190 70 M70 100 L190 100 M70 130 L190 130" className="x-ink-faint" />
          <rect x="90" y="160" width="80" height="170" fill="#dbd4c5" stroke="rgba(12,26,32,0.4)" strokeWidth="1.2" />
          <path d="M90 200 L170 200 M90 240 L170 240 M90 280 L170 280" className="x-ink-faint" />
          <rect x="70" y="330" width="120" height="28" fill="#cfc8b8" stroke="rgba(12,26,32,0.4)" strokeWidth="1.2" />
          <rect x="166" y="160" width="5" height="170" fill="#0d9db6" opacity="0.85" />

          {/* отмостка */}
          <g className={cls("otmostka")}>
            <path d="M190 160 L272 174 L272 184 L190 170 Z" fill="#d9d5ca" stroke="rgba(12,26,32,0.35)" strokeWidth="1" />
          </g>

          {/* trench outline */}
          <path d="M280 174 L280 392 M640 174 L640 424" className="x-ink" strokeWidth="1.4" />

          {/* backfill soil */}
          <g className={cls("soil")}>
            <path d="M280 174 L640 174 L640 338 L280 306 Z" fill="url(#x-soil-back)" />
          </g>

          {/* gravel */}
          <g className={cls("gravel")}>
            <path d="M280 306 L640 338 L640 424 L280 392 Z" fill="url(#x-gravel)" />
          </g>

          {/* geotextile */}
          <g className={cls("fabric")}>
            <path d="M280 300 L640 332 L640 344 L280 312 Z" fill="url(#x-fabric)" opacity="0.92" />
            <path d="M280 384 L640 416 L640 428 L280 396 Z" fill="url(#x-fabric)" opacity="0.92" />
            <rect x="280" y="312" width="12" height="84" fill="url(#x-fabric)" opacity="0.92" />
            <rect x="628" y="344" width="12" height="84" fill="url(#x-fabric)" opacity="0.92" />
            <path d="M280 300 L640 332 M280 396 L640 428" className="x-dash-line" />
          </g>

          {/* pipe */}
          <g className={cls("pipe")}>
            <circle cx="430" cy="368" r="26" fill="#eef5f4" stroke="#4c6d73" strokeWidth="7" />
            {perforations.map(([px, py], i) => (
              <circle key={i} cx={px} cy={py} r="2.6" fill="#4c6d73" />
            ))}
            <path d="M 414 374 A 16 16 0 0 0 446 374" fill="#bdeaf0" opacity="0.9" />
            <line x1="416" y1="374" x2="444" y2="374" className="x-flow" strokeWidth="2.2" />
          </g>

          {/* flow paths */}
          <path d="M 396 122 C 396 220, 402 296, 418 342" className="x-flow" markerEnd="url(#x-arrow)" />
          <path d="M 456 372 C 540 372, 610 390, 682 400" className="x-flow" />
          <path d="M 330 92 L 330 124" className="x-flow" markerEnd="url(#x-arrow)" />
          <path d="M 362 92 L 362 124" className="x-flow" markerEnd="url(#x-arrow)" />

          {/* well */}
          <g className={cls("well")}>
            <rect x="690" y="174" width="80" height="296" fill="#eef5f4" stroke="rgba(12,26,32,0.45)" strokeWidth="1.5" />
            {[216, 258, 300, 342, 384, 426, 468].map((y) => (
              <line key={y} x1="690" y1={y} x2="770" y2={y} className="x-ink-faint" />
            ))}
            <rect x="694" y="360" width="72" height="106" fill="#a5e0ea" opacity="0.92" />
            <line x1="694" y1="360" x2="766" y2="360" className="x-water" strokeDasharray="7 5" />
            <circle cx="690" cy="400" r="11" fill="#eef5f4" stroke="#4c6d73" strokeWidth="3" />
            <rect x="680" y="160" width="100" height="14" fill="#d9d5ca" stroke="rgba(12,26,32,0.35)" strokeWidth="1" />
          </g>
          <path d="M 770 300 L 884 300" className="x-water" strokeWidth="2.4" markerEnd="url(#x-arrow)" />

          {/* dimensions */}
          <line x1="252" y1="174" x2="252" y2="392" className="x-ink-soft" />
          <path d="M 246 174 L 258 174 M 246 392 L 258 392" className="x-ink-soft" />
          <text className="x-lbl" x="238" y="290" transform="rotate(-90 238 290)">1,2–1,8 М</text>
          <line x1="280" y1="416" x2="640" y2="448" className="x-ink-soft" />
          <path d="M 280 410 L 280 422 M 640 442 L 640 454" className="x-ink-soft" />

          {/* labels */}
          <text className="x-lbl" x="36" y="40">РАЗРЕЗ КОНТУРА / УЗЕЛ 02</text>
          <text className="x-lbl" x="844" y="508">М 1:20</text>

          <rect className="x-chip" x="146" y="104" width="76" height="18" rx="3" />
          <text className="x-lbl" x="152" y="117">ОТМОСТКА</text>
          <line x1="184" y1="122" x2="216" y2="162" className="x-ink-soft" />

          <rect className="x-chip" x="392" y="56" width="184" height="20" rx="3" />
          <text className="x-lbl" x="399" y="70">ГРУНТ ОБРАТНОЙ ЗАСЫПКИ</text>
          <line x1="484" y1="76" x2="520" y2="248" className="x-ink-soft" />

          <rect className="x-chip" x="296" y="232" width="98" height="18" rx="3" />
          <text className="x-lbl" x="302" y="245">ГЕОТЕКСТИЛЬ</text>
          <line x1="394" y1="241" x2="406" y2="318" className="x-ink-soft" />

          <rect className="x-chip" x="466" y="330" width="92" height="18" rx="3" />
          <text className="x-lbl" x="472" y="343">ТРУБА Ø110</text>

          <rect className="x-chip" x="462" y="392" width="134" height="18" rx="3" />
          <text className="x-lbl" x="468" y="405">ЩЕБЕНЬ ФР. 20–40</text>

          <rect className="x-chip" x="384" y="438" width="122" height="20" rx="3" />
          <text className="x-lbl" x="390" y="452">УКЛОН 0,005</text>

          <rect className="x-chip" x="664" y="130" width="144" height="20" rx="3" />
          <text className="x-lbl" x="671" y="144">СМОТРОВЫЙ КОЛОДЕЦ</text>
          <line x1="736" y1="150" x2="736" y2="168" className="x-ink-soft" />

          <text className="x-lbl x-lbl-cyan" x="800" y="292">ВЫПУСК</text>
        </svg>
      </div>
      <div className="cutaway-legend">
        {layers.map(([key, num, title, text]) => (
          <button
            key={key}
            className={active === key ? "active" : ""}
            onClick={() => setActive(key)}
            onMouseEnter={() => setActive(key)}
          >
            <span>{num}</span>
            <strong>{title}</strong>
            <p>{active === key ? text : ""}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
