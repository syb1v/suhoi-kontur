export function HeroDiagram() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 560 470" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="rgba(84,140,152,0.16)" strokeWidth="1" />
          </pattern>
          <marker id="arrow-flow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#17c3dd" />
          </marker>
        </defs>

        <rect x="0" y="0" width="560" height="470" fill="url(#bp-grid)" />
        <rect x="24" y="24" width="512" height="422" stroke="rgba(84,140,152,0.35)" strokeWidth="1" />

        {/* contour lines */}
        <path className="iso-contour" d="M 20 120 C 120 90, 190 150, 300 120 S 480 80, 560 110" />
        <path className="iso-contour" d="M 20 152 C 130 122, 200 182, 310 152 S 490 112, 560 142" />
        <path className="iso-contour" d="M 20 366 C 140 340, 240 396, 360 366 S 500 330, 560 356" />
        <path className="iso-contour" d="M 20 398 C 150 372, 250 428, 370 398 S 510 362, 560 388" />

        {/* frame ticks */}
        <path className="iso-tick" d="M 220 24 L 220 32 M 360 24 L 360 32 M 24 200 L 32 200 M 24 300 L 32 300" />

        <g transform="rotate(-6 280 235)">
          {/* house footprint */}
          <rect className="iso-house" x="172" y="122" width="176" height="136" />
          <rect className="iso-house-inner" x="188" y="138" width="144" height="104" />
          <path className="iso-house-inner" d="M 260 122 L 260 258 M 172 190 L 348 190" opacity="0.4" />

          {/* drainage perimeter */}
          <rect className="iso-perimeter" x="140" y="90" width="240" height="200" rx="16" />
          {/* perforation marks */}
          <g fill="none" stroke="#17c3dd" strokeWidth="1.5" opacity="0.75">
            <path d="M 158 116 L 158 124 M 158 152 L 158 160 M 158 188 L 158 196 M 158 224 L 158 232 M 158 260 L 158 268" />
            <path d="M 362 116 L 362 124 M 362 152 L 362 160 M 362 188 L 362 196 M 362 224 L 362 232 M 362 260 L 362 268" />
          </g>

          {/* collector flow */}
          <path className="iso-flow" d="M 260 290 L 260 404 Q 260 414 272 414 L 440 414" />
          <circle className="iso-pulse" cx="452" cy="414" r="12" />
          <circle className="iso-well" cx="452" cy="414" r="14" />
          <path className="iso-well-cross" d="M 442 414 L 462 414 M 452 404 L 452 424" />

          {/* leader lines + labels */}
          <line x1="140" y1="308" x2="104" y2="330" stroke="rgba(144,170,176,0.5)" strokeWidth="1" />
          <text className="iso-label iso-label-cyan" x="60" y="348">ДРЕНАЖНЫЙ КОНТУР</text>
          <text className="iso-label" x="60" y="364">УКЛОН 0,005 / Ø110</text>

          <line x1="440" y1="388" x2="456" y2="398" stroke="rgba(144,170,176,0.5)" strokeWidth="1" />
          <text className="iso-label" x="398" y="384">КОЛОДЕЦ</text>

          <text className="iso-label" x="176" y="110">ОТМ. -1,80 М</text>
        </g>

        {/* discharge */}
        <path d="M 490 414 L 540 414" stroke="#17c3dd" strokeWidth="2" markerEnd="url(#arrow-flow)" />
        <text className="iso-label iso-label-cyan" x="500" y="438">ВЫПУСК</text>

        {/* annotations */}
        <text className="iso-label" x="36" y="46">ПЛАН УЧАСТКА / М 1:200</text>
        <text className="iso-label" x="36" y="438">РАБОЧИЙ СЛОЙ / УЗЕЛ 01</text>

        {/* compass */}
        <g transform="translate(508 52)">
          <line x1="0" y1="18" x2="0" y2="-8" stroke="#17c3dd" strokeWidth="1.5" />
          <path d="M 0 -12 L -4 -4 L 4 -4 Z" fill="#17c3dd" />
          <text className="iso-label" x="-4" y="34">N</text>
        </g>
      </svg>
    </div>
  );
}
