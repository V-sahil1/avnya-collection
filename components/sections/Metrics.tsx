import { METRICS } from "@/lib/site";

export default function Metrics() {
  return (
    <section className="w-full bg-surface-container-lowest py-space-lg">
      <div className="container-editorial">
        <div data-anim-stagger="0.1" className="grid grid-cols-2 gap-x-space-md gap-y-space-lg md:grid-cols-5">
          {METRICS.map((m, i) => (
            <div key={m.label} className={`flex flex-col space-y-1 ${i === METRICS.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">{m.label}</span>
              <div className="flex flex-wrap items-baseline gap-1">
                <span data-count className="font-headline-md text-headline-md font-semibold tabular-nums text-primary">{m.value}</span>
                <span className="font-label-sm text-label-sm font-bold text-secondary">{m.unit}</span>
              </div>
              <span className="font-body-sm text-body-sm text-outline">{m.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
