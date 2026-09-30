// Bespoke domain components from DESIGN.md: Loom Status Badge and Weave Composition Bar.

const STATUS_DOT = {
  "Active Loom": "bg-forest",
  "Dye Queue": "bg-terracotta",
  Archival: "bg-gold",
} as const;

export function LoomStatus({ status }: { status: keyof typeof STATUS_DOT }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-ink/10 bg-surface-container-lowest px-2 py-0.5 font-label-sm text-label-sm uppercase text-on-surface">
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </span>
  );
}

export function CompositionBar({ silk, zari, other }: { silk: number; zari: number; other: number }) {
  const parts = [
    { v: silk, c: "bg-forest", l: "Silk" },
    { v: zari, c: "bg-gold", l: "Zari" },
    { v: other, c: "bg-sand", l: "Viscose / Other" },
  ].filter((p) => p.v > 0);
  const label = parts.map((p) => `${p.v}% ${p.l}`).join(" / ");
  return (
    <div className="min-w-[120px]">
      <div className="flex h-1.5 w-full gap-px overflow-hidden" role="img" aria-label={label}>
        {parts.map((p) => (
          <div key={p.l} data-bar className={p.c} style={{ width: `${p.v}%` }} />
        ))}
      </div>
      <span className="mt-1 block font-body-sm text-[11px] text-olive">{label}</span>
    </div>
  );
}
