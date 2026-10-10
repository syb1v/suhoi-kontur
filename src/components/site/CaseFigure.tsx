import { SitePlan } from "@/components/diagrams/SitePlan";

export function CaseFigure({ variant }: { variant: number }) {
  return <SitePlan variant={variant} tone="light" />;
}
