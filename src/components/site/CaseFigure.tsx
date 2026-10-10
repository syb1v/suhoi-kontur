const layouts = [
  { house: [130, 60, 120, 80], rotate: -5, drain: "M 96 46 L 302 46 Q 314 46 314 58 L 314 158 Q 314 170 302 170 L 110 170 Q 98 170 98 158 L 98 96", well: [330, 198], contour: "M 12 210 C 90 190, 150 228, 240 208 S 340 180, 396 198" },
  { house: [60, 70, 110, 76], rotate: 4, drain: "M 36 44 L 262 44 Q 276 44 276 58 L 276 150 Q 276 164 262 164 L 60 164", well: [296, 196], contour: "M 10 40 C 80 60, 140 20, 220 44 S 340 70, 396 48" },
  { house: [150, 90, 104, 72], rotate: -8, drain: "M 118 62 L 288 62 Q 300 62 300 74 L 300 156", well: [66, 190], contour: "M 10 200 C 100 176, 180 214, 260 194 S 350 168, 396 184" },
];

export function CaseFigure({ variant }: { variant: number }) {
  const l = layouts[variant % layouts.length];
  const [hx, hy, hw, hh] = l.house;
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id={`case-grid-${variant % layouts.length}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(53,150,161,0.13)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="400" height="260" fill={`url(#case-grid-${variant % layouts.length})`} />
      <path className="case-contour" d={l.contour} />
      <path className="case-contour" d="M 8 128 L 28 128 M 372 84 L 392 84" />
      <rect className="case-plot" x="22" y="26" width="356" height="208" />
      <line x1="22" y1="26" x2="38" y2="26" stroke="rgba(12,26,32,0.45)" strokeWidth="2" />
      <line x1="22" y1="26" x2="22" y2="42" stroke="rgba(12,26,32,0.45)" strokeWidth="2" />

      <g transform={`rotate(${l.rotate} ${hx + hw / 2} ${hy + hh / 2})`}>
        <rect className="case-house" x={hx} y={hy} width={hw} height={hh} />
        <rect className="case-plot-inner" x={hx + 12} y={hy + 12} width={hw - 24} height={hh - 24} strokeDasharray="4 4" />
      </g>

      <path className="case-blue-line" d={l.drain} />

      <circle cx={l.well[0]} cy={l.well[1]} r="9" fill="#f4f9f8" stroke="#07879e" strokeWidth="1.6" />
      <path d={`M ${l.well[0] - 5} ${l.well[1]} L ${l.well[0] + 5} ${l.well[1]} M ${l.well[0]} ${l.well[1] - 5} L ${l.well[0]} ${l.well[1] + 5}`} stroke="#07879e" strokeWidth="1.2" />

      <line x1={l.well[0] + 12} y1={l.well[1]} x2={l.well[0] + 42} y2={l.well[1]} stroke="#07879e" strokeWidth="1.6" />
      <path d={`M ${l.well[0] + 42} ${l.well[1] - 4} L ${l.well[0] + 50} ${l.well[1]} L ${l.well[0] + 42} ${l.well[1] + 4} Z`} fill="#07879e" />

      <text x="30" y="244" fontFamily="var(--font-mono), monospace" fontSize="9.5" letterSpacing="0.14em" fill="#7b8f94">СХЕМА / М 1:250</text>
    </svg>
  );
}
