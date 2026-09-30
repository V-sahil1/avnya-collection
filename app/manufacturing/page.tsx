import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ManufacturingJourney from "@/components/sections/ManufacturingJourney";
import Bespoke from "@/components/sections/Bespoke";
import CtaBand from "@/components/CtaBand";
import Icon from "@/components/Icon";
import { IMG } from "@/lib/site";

export const metadata: Metadata = { title: "Manufacturing", description: "Loom infrastructure, the 7-step production cadence, bespoke OEM weaving and export compliance at Avanya." };

const INFRA = [
  { value: "60,000", unit: "sq.ft", label: "Humidity-controlled weaving halls" },
  { value: "140", unit: "Looms", label: "Electronic jacquard & rapier arrays" },
  { value: "36", unit: "Pit-Looms", label: "Kadhua handloom stations" },
  { value: "180K", unit: "m / mo", label: "Warp preparation capacity" },
];

const COMPLIANCE = [
  { cert: "OEKO-TEX® Standard 100", scope: "Dyes, auxiliaries & finished fabric", ref: "Class II · Annual audit" },
  { cert: "Silk Mark India", scope: "Pure mulberry & tussar authenticity", ref: "Label per saree" },
  { cert: "ISO 9001:2015", scope: "Quality management system", ref: "Surveillance audit 2026" },
  { cert: "Azo-Free Declaration", scope: "All pigments & dye lots", ref: "Per-lot lab report" },
  { cert: "4-Point Inspection", scope: "ASTM D5430 fabric grading", ref: "Report per consignment" },
  { cert: "Certificate of Origin", scope: "Export documentation (US, UK, GCC, EU, SG)", ref: "Issued with invoice" },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        crumb="Manufacturing"
        overline="Loom Infrastructure · Varanasi & Surat"
        title={<>Made in India. <span className="font-light italic text-secondary-fixed">Engineered for Scale.</span></>}
        intro="German-engineered electronic jacquards and traditional pit-looms under one roof, run to ISO-certified production cadences."
        image={IMG.mill}
        meta={["Mill Reg: IND-VNS-9042", "99.8% First-Pass Yield", "< 0.1% Skew Tolerance"]}
      />

      <section className="w-full bg-surface-container-lowest py-space-lg">
        <div data-anim-stagger="0.1" className="container-editorial grid grid-cols-2 gap-x-space-md gap-y-space-lg md:grid-cols-4">
          {INFRA.map((i) => (
            <div key={i.label} className="flex flex-col space-y-1">
              <div className="flex items-baseline gap-1">
                <span data-count className="font-headline-md text-headline-md font-semibold tabular-nums text-primary">{i.value}</span>
                <span className="font-label-sm text-label-sm font-bold text-secondary">{i.unit}</span>
              </div>
              <span className="font-body-sm text-body-sm text-outline">{i.label}</span>
            </div>
          ))}
        </div>
      </section>

      <ManufacturingJourney />
      <Bespoke />

      <section id="compliance" className="w-full scroll-mt-20 bg-surface py-space-xl md:py-20">
        <div className="container-editorial grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
          <div data-anim-stagger="0.12" className="space-y-space-md lg:col-span-4">
            <span className="eyebrow">Export Compliance &amp; Testing</span>
            <h2 className="font-headline-lg text-headline-md font-normal text-primary md:text-headline-lg">Certified at Every Lot.</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Every consignment ships with its test reports and origin documents, so your customs broker and quality team have nothing to chase.
            </p>
            <div className="inline-flex items-center gap-2 bg-sand/60 px-3 py-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
              <Icon name="verified" className="text-base text-forest" />
              Harmonized tariff documentation included
            </div>
          </div>
          <div className="lg:col-span-8">
            <div data-anim-stagger="0.08" className="divide-y divide-sand border-y border-sand">
              {COMPLIANCE.map((c) => (
                <div key={c.cert} className="grid grid-cols-1 gap-1 py-4 transition-colors hover:bg-ivory sm:grid-cols-12 sm:items-baseline sm:gap-space-md sm:px-2">
                  <span className="font-headline-sm text-lg text-primary sm:col-span-4">{c.cert}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant sm:col-span-5">{c.scope}</span>
                  <span className="font-spec-num text-xs uppercase tracking-wider text-olive sm:col-span-3 sm:text-right">{c.ref}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand overline="Video Loom Inspection" title="See Your Order on the Loom" body="Book a live video walkthrough of the weaving floor and inspect your dye lot in progress with our textile engineering team." />
    </>
  );
}
