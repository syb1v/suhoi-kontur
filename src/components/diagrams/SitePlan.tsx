import { Chip, DimV, Leader, NorthArrow, ScaleBar, planTicks } from "./drafting";

type Pt = [number, number];

type PlanVariant = {
  plot: string;
  house: [number, number, number, number];
  perimeter: [number, number, number, number];
  run: string;
  well: Pt;
  discharge: Pt;
  slopeArrows: [number, number, number, number][];
  slopeText: Pt;
  dim: [number, number, number, string];
  perimeterChip: { x: number; y: number; leader: [number, number, number, number] };
  wellChip: { x: number; y: number; leader: [number, number, number, number] };
  scale: Pt;
};

const VARIANTS: PlanVariant[] = [
  {
    plot: "60,80 500,80 500,380 60,380",
    house: [180, 150, 200, 140],
    perimeter: [150, 120, 260, 200],
    run: "M 170 320 L 170 346 Q 170 360 184 360 L 424 360",
    well: [440, 360],
    discharge: [532, 360],
    slopeArrows: [[140, 220, 100, 220], [420, 220, 460, 220]],
    slopeText: [98, 240],
    dim: [44, 80, 380, "30,0 М"],
    perimeterChip: { x: 296, y: 88, leader: [375, 106, 380, 118] },
    wellChip: { x: 200, y: 336, leader: [331, 345, 424, 357] },
    scale: [404, 392],
  },
  {
    plot: "60,70 440,70 440,220 500,220 500,390 60,390",
    house: [110, 230, 150, 110],
    perimeter: [80, 200, 210, 170],
    run: "M 290 300 L 454 300",
    well: [470, 300],
    discharge: [532, 300],
    slopeArrows: [[150, 186, 150, 156], [298, 285, 330, 285]],
    slopeText: [336, 290],
    dim: [44, 70, 390, "32,0 М"],
    perimeterChip: { x: 96, y: 178, leader: [198, 196, 190, 206] },
    wellChip: { x: 300, y: 262, leader: [431, 271, 458, 292] },
    scale: [404, 392],
  },
  {
    plot: "60,70 500,70 500,300 420,390 60,390",
    house: [110, 110, 150, 110],
    perimeter: [80, 80, 210, 170],
    run: "M 200 250 L 200 326 Q 200 340 214 340 L 404 340",
    well: [420, 340],
    discharge: [524, 340],
    slopeArrows: [[298, 165, 330, 165], [185, 258, 185, 288]],
    slopeText: [336, 170],
    dim: [44, 70, 390, "32,0 М"],
    perimeterChip: { x: 96, y: 262, leader: [198, 262, 206, 252] },
    wellChip: { x: 110, y: 300, leader: [241, 309, 402, 334] },
    scale: [404, 392],
  },
];

export function SitePlan({ variant = 0, tone = "light" }: { variant?: number; tone?: "light" | "dark" }) {
  const v = VARIANTS[variant % VARIANTS.length];
  const uid = `dg-${tone}-${variant % VARIANTS.length}`;
  const [hx, hy, hw, hh] = v.house;
  const [px, py, pw, ph] = v.perimeter;
  const [wx, wy] = v.well;
  const [dx, dy] = v.discharge;
  const ticks = planTicks(px, py, pw, ph);

  return (
    <svg className={`dg dg-${tone}`} viewBox="0 0 560 440" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="План участка с дренажным контуром">
      <defs>
        <pattern id={`${uid}-hatch`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line className="dg-hatch" x1="0" y1="0" x2="0" y2="9" />
        </pattern>
        <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path className="dg-accent-fill" d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      <text className="dg-label" x="34" y="46">ПЛАН УЧАСТКА / М 1:200</text>
      <NorthArrow x={508} y={62} />

      <rect className="dg-soft" x="20" y="20" width="520" height="400" />

      <polygon className="dg-plot" points={v.plot} />

      <DimV x={v.dim[0]} y1={v.dim[1]} y2={v.dim[2]} label={v.dim[3]} />

      {v.slopeArrows.map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} className="dg-accent-line" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={`url(#${uid}-arrow)`} />
      ))}
      <text className="dg-label" x={v.slopeText[0]} y={v.slopeText[1]}>УКЛОН</text>

      <rect className="dg-footprint" x={hx} y={hy} width={hw} height={hh} fill={`url(#${uid}-hatch)`} />
      <rect className="dg-soft" x={hx + 10} y={hy + 10} width={hw - 20} height={hh - 20} />
      <Chip x={hx + hw / 2} y={hy + hh / 2 - 9} text="ДОМ" anchor="middle" />

      <rect className="dg-perimeter" x={px} y={py} width={pw} height={ph} rx="14" />
      {ticks.map(([x1, y1, x2, y2], i) => (
        <line key={i} className="dg-perf" x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}

      <path className="dg-run" d={v.run} markerEnd={`url(#${uid}-arrow)`} />

      <circle className="dg-well-ring" cx={wx} cy={wy} r="16" />
      <circle className="dg-well-core" cx={wx} cy={wy} r="9" />
      <line className="dg-soft" x1={wx - 22} y1={wy} x2={wx + 22} y2={wy} />
      <line className="dg-soft" x1={wx} y1={wy - 22} x2={wx} y2={wy + 22} />

      <line className="dg-accent-line" x1={wx + 16} y1={wy} x2={dx} y2={dy} markerEnd={`url(#${uid}-arrow)`} />

      <Chip x={v.perimeterChip.x} y={v.perimeterChip.y} text="ДРЕНАЖНЫЙ КОНТУР · Ø110" />
      <Leader x1={v.perimeterChip.leader[0]} y1={v.perimeterChip.leader[1]} x2={v.perimeterChip.leader[2]} y2={v.perimeterChip.leader[3]} />

      <Chip x={v.wellChip.x} y={v.wellChip.y} text="КОЛОДЕЦ / ВЫПУСК" />
      <Leader x1={v.wellChip.leader[0]} y1={v.wellChip.leader[1]} x2={v.wellChip.leader[2]} y2={v.wellChip.leader[3]} />

      <ScaleBar x={v.scale[0]} y={v.scale[1]} />

      <text className="dg-label" x="34" y="412">РАБОЧИЙ ЛИСТ / УЗЕЛ 01 · {String((variant % VARIANTS.length) + 1).padStart(2, "0")}</text>
    </svg>
  );
}
