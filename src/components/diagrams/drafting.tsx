export const DASH = {
  drain: "8 6",
  hidden: "4 4",
  flow: "9 7",
};

export function chipWidth(text: string) {
  return Math.round(text.length * 7.2) + 16;
}

export function Chip({ x, y, text, anchor = "start" }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end" }) {
  const w = chipWidth(text);
  const rx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <g>
      <rect className="dg-chip" x={rx} y={y} width={w} height={18} rx="3" />
      <text className="dg-label" x={rx + 8} y={y + 12.5}>{text}</text>
    </g>
  );
}

export function Leader({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g className="dg-leader">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <circle cx={x2} cy={y2} r="2.2" />
    </g>
  );
}

export function DimV({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  const mid = (y1 + y2) / 2;
  return (
    <g>
      <line className="dg-soft" x1={x} y1={y1} x2={x} y2={y2} />
      <line className="dg-soft" x1={x - 5} y1={y1} x2={x + 5} y2={y1} />
      <line className="dg-soft" x1={x - 5} y1={y2} x2={x + 5} y2={y2} />
      <text className="dg-label" x={x - 8} y={mid} textAnchor="middle" transform={`rotate(-90 ${x - 8} ${mid})`}>{label}</text>
    </g>
  );
}

export function DimH({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  const mid = (x1 + x2) / 2;
  return (
    <g>
      <line className="dg-soft" x1={x1} y1={y} x2={x2} y2={y} />
      <line className="dg-soft" x1={x1} y1={y - 5} x2={x1} y2={y + 5} />
      <line className="dg-soft" x1={x2} y1={y - 5} x2={x2} y2={y + 5} />
      <text className="dg-label" x={mid} y={y - 6} textAnchor="middle">{label}</text>
    </g>
  );
}

export function NorthArrow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line className="dg-soft" x1={x} y1={y + 16} x2={x} y2={y - 16} />
      <path className="dg-accent-fill" d={`M ${x} ${y - 22} L ${x - 5} ${y - 12} L ${x + 5} ${y - 12} Z`} />
      <text className="dg-label" x={x - 3} y={y + 30}>N</text>
    </g>
  );
}

export function ScaleBar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect className="dg-accent-fill" x={x} y={y} width="40" height="6" />
      <rect className="dg-chip" x={x + 40} y={y} width="40" height="6" />
      <line className="dg-soft" x1={x} y1={y} x2={x + 80} y2={y} />
      <line className="dg-soft" x1={x} y1={y} x2={x} y2={y + 10} />
      <line className="dg-soft" x1={x + 40} y1={y} x2={x + 40} y2={y + 10} />
      <line className="dg-soft" x1={x + 80} y1={y} x2={x + 80} y2={y + 10} />
      <text className="dg-label" x={x - 2} y={y + 22}>0</text>
      <text className="dg-label" x={x + 32} y={y + 22}>10</text>
      <text className="dg-label" x={x + 72} y={y + 22}>20 М</text>
    </g>
  );
}

type Perf = [number, number, number, number];

function sideTicks(from: number, to: number, fixed: number, direction: -1 | 1, horizontal: boolean): Perf[] {
  const ticks: Perf[] = [];
  for (let p = from + 24; p <= to - 24; p += 40) {
    ticks.push(horizontal ? [p, fixed, p, fixed + 8 * direction] : [fixed, p, fixed + 8 * direction, p]);
  }
  return ticks;
}

export function planTicks(x: number, y: number, w: number, h: number): Perf[] {
  return [
    ...sideTicks(x, x + w, y, -1, true),
    ...sideTicks(x, x + w, y + h, 1, true),
    ...sideTicks(y, y + h, x, -1, false),
    ...sideTicks(y, y + h, x + w, 1, false),
  ];
}
