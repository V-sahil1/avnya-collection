import Link from "next/link";
import Icon from "@/components/Icon";
import { BESPOKE_STAGES } from "@/lib/site";

const PROMISES = [
  "48 to 72 Hour Strike-Off Samples via Express Courier",
  "Proprietary Cad Software Pattern Digitization",
  "Exclusive Copyright Safeguarding & Pattern Archival",
];

export default function Bespoke() {
  return (
    <section id="bespoke" className="w-full bg-forest py-space-xl text-surface-bright md:py-20">
      <div className="container-editorial">
        <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
          <div className="space-y-space-md lg:col-span-5">
            <div data-anim="fade" className="inline-flex items-center gap-2 bg-primary px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">
              <Icon name="architecture" className="text-xs" />
              OEM &amp; Private Label Services
            </div>
            <h2 data-anim="lines" className="font-headline-lg text-headline-md font-normal tracking-tight text-white md:text-headline-lg">
              YOUR DESIGN. <br />
              <span className="font-light italic text-primary-fixed">OUR LOOMS.</span>
            </h2>
            <p data-anim="fade" className="font-body-md text-body-md leading-relaxed text-outline-variant">
              Have an exclusive saree concept, archival heirloom sketch, or proprietary yarn blend? We allocate dedicated looms exclusively for your label with strict intellectual property and pattern NDA protection.
            </p>
            <ul data-anim-stagger="0.12" className="space-y-3 pt-2">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-surface-bright">
                  <Icon name="verified" className="text-lg text-primary-fixed" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div data-anim="fade" className="pt-4">
              <Link
                href="/request-catalogue#trade-form"
                className="inline-block bg-surface-bright px-space-lg py-4 text-center font-label-md text-label-md font-semibold uppercase tracking-widest text-on-primary-fixed transition-colors hover:bg-primary-fixed"
              >
                Start a Custom Project / Request MOQ
              </Link>
            </div>
          </div>

          <div data-anim="scale" className="bg-primary p-space-lg shadow-xl md:p-space-xl lg:col-span-7">
            <h3 className="mb-space-md font-headline-sm text-headline-sm text-white">The Bespoke Production Workflow</h3>
            <ol data-anim-stagger="0.1" className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
              {BESPOKE_STAGES.map((s) => (
                <li key={s.n} className="bg-white/5 p-4 backdrop-blur-sm">
                  <span className="font-spec-num text-xs font-bold text-primary-fixed">STAGE {s.n}</span>
                  <h4 className="mt-1 font-label-md text-label-md uppercase text-white">{s.title}</h4>
                  <p className="mt-1 font-body-sm text-xs text-outline-variant">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
