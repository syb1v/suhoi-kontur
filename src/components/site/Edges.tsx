export function SectionEdge({ pos = "top", tone = "dark" }: { pos?: "top" | "bottom"; tone?: "dark" | "light" }) {
  return <span className={`edge edge-${pos} edge-tone-${tone}`} aria-hidden="true" />;
}

export function SheetFrame() {
  return (
    <div className="sheet-frame" aria-hidden="true">
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
    </div>
  );
}
