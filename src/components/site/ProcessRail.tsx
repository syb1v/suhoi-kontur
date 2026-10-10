import type { ComponentType } from "react";

type RailIcon = ComponentType<{ size?: number; weight?: "light" | "regular" | "bold" }>;

export function ProcessRail({ steps, icons, five = false }: { steps: [string, string][]; icons: RailIcon[]; five?: boolean }) {
  return (
    <div className={five ? "process-rail process-rail-5" : "process-rail"}>
      {steps.map(([title, text], i) => {
        const Icon = icons[i % icons.length];
        return (
          <div className="process-step" key={title}>
            <span className="rail-node"><Icon size={16} weight="light" /></span>
            <span className="rail-num">{String(i + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </div>
        );
      })}
    </div>
  );
}
