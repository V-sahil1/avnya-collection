import Image from "next/image";
import { IMG, JOURNEY } from "@/lib/site";

export default function ManufacturingJourney() {
  return (
    <section id="journey" className="w-full bg-surface-container-low py-space-xl md:py-20">
      <div className="container-editorial">
        <div className="mb-space-xl max-w-3xl">
          <span data-anim="fade" className="eyebrow">Industrial Rigour · Artisanal Soul</span>
          <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal text-primary md:text-headline-lg">
            From Yarn to Finished Saree: The 7-Step Cadence
          </h2>
          <p data-anim="fade" className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Discover how raw cocoon filaments and metallic threads transform through high-speed Jacquard machinery into museum-grade textiles.
          </p>
        </div>

        <div className="mb-space-xl grid grid-cols-1 items-center gap-gutter lg:grid-cols-12 lg:gap-gutter-desktop">
          <div data-anim="reveal" className="overflow-hidden shadow-md lg:col-span-7">
            <Image
              src={IMG.mill}
              alt="Automated jacquard looms weaving green silk sarees in a sunlit Varanasi mill, with artisans inspecting fabric"
              width={1200}
              height={896}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full object-cover transition-transform duration-700 hover:scale-102"
            />
          </div>
          <div className="space-y-space-md lg:col-span-5">
            <div data-anim="fade-right" className="bg-surface-container-lowest p-space-lg shadow-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Made in India. Engineered for Scale.</span>
              <h3 className="mt-2 font-headline-sm text-headline-sm text-primary">Zero-Defect Textile Engineering</h3>
              <p className="mt-3 font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
                Our 60,000 sq.ft facility in Varanasi houses both German-engineered electronic Jacquard arrays and traditional pit-looms. We maintain strict humidity-controlled environments to eliminate yarn brittleness and ensure consistent warp tension throughout extreme seasonal shifts.
              </p>
              <div className="mt-space-md grid grid-cols-2 gap-4 pt-space-sm">
                <div>
                  <span className="font-headline-sm text-headline-sm font-semibold tabular-nums text-primary" data-count>100%</span>
                  <span className="block font-body-sm text-body-sm text-outline">Azo-Free Certified</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm font-semibold tabular-nums text-primary" data-count>&lt; 0.1%</span>
                  <span className="block font-body-sm text-body-sm text-outline">Skew Tolerance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ol data-anim-stagger="0.08" className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-7">
          {JOURNEY.map((s) => (
            <li key={s.n} className="bg-surface-container-lowest p-4 shadow-sm transition-shadow hover:shadow">
              <span className="font-spec-num text-xs font-bold text-secondary">{s.n}</span>
              <h4 className="mt-2 font-label-md text-label-md uppercase tracking-wider text-primary">{s.title}</h4>
              <p className="mt-1 font-body-sm text-xs text-on-surface-variant">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
