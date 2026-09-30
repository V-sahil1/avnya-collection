// Two counter-scrolling bands of weave names — the one moving typographic element on the page.
const WEAVES = ["Kadhua", "Katan Silk", "Zari", "Kora", "Tussar", "Banarasi", "Organza", "Jacquard", "Georgette", "Chanderi"];
const SPECS = ["20/22 Denier Mulberry", "120 Picks / Inch", "0.08mm Zari Inlay", "Silk Mark Certified", "OEKO-TEX®", "99.8% First-Pass Yield", "28+ Countries"];

function Band({ items, className, italic }: { items: string[]; className: string; italic?: boolean }) {
  // The list is rendered twice so a -50% translate loops seamlessly.
  const row = [...items, ...items];
  return (
    <div className={`flex w-max ${className}`}>
      {row.map((t, i) => (
        <span key={i} className="flex shrink-0 items-center" aria-hidden={i >= items.length || undefined}>
          <span className={italic ? "font-serif italic" : ""}>{t}</span>
          <span className="mx-6 text-[0.35em] text-gold md:mx-10" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Our weaves" className="marquee w-full overflow-hidden border-y border-sand/70 bg-ivory py-6 md:py-8">
      <Band items={WEAVES} italic className="animate-marquee text-[40px] leading-none text-primary md:text-[64px]" />
      <Band
        items={SPECS}
        className="animate-marquee-reverse mt-4 font-label-md text-label-md uppercase tracking-[0.2em] text-olive md:mt-5"
      />
    </section>
  );
}
