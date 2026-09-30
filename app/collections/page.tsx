import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
import Metrics from "@/components/sections/Metrics";
import CtaBand from "@/components/CtaBand";
import { IMG } from "@/lib/site";

export const metadata: Metadata = { title: "Collections", description: "Loom series and saree edits from Volume III of the Avanya archival curations." };

const VOLUMES = [
  { vol: "Volume III", season: "2025–26", title: "The Sage Season", note: "Pleated kora, antique zari, temple borders", count: "18 colourways", current: true },
  { vol: "Volume II", season: "2024–25", title: "Ivory & Bottle Green", note: "Jacquard brocades for export volume runs", count: "14 colourways" },
  { vol: "Volume I", season: "2023–24", title: "The Kadhua Archive", note: "Bridal heirlooms from the Varanasi pit-looms", count: "22 colourways" },
];

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        crumb="Collections"
        overline="Volume III / Archival Curations"
        title={<>Loom Series <span className="font-light italic text-secondary-fixed">&amp; Saree Edits</span></>}
        intro="Five loom series spanning master handloom silks, mill-scale jacquards, couture sheers, fluid georgettes and bridal Banarasi — each available in capsule or volume runs."
        image={IMG.handloom}
        imagePosition="center 30%"
        meta={["MOQ: 25 Units / Colourway", "Lead Time: 10–45 Days", "Spec Sheets on Request"]}
      />
      <CollectionsShowcase />
      <Metrics />

      <section className="w-full bg-surface py-space-xl md:py-20">
        <div className="container-editorial">
          <span data-anim="fade" className="eyebrow">The Archive</span>
          <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal text-primary md:text-headline-lg">Seasonal Volumes</h2>
          <div data-anim-stagger="0.12" className="mt-space-lg divide-y divide-sand border-y border-sand">
            {VOLUMES.map((v) => (
              <div key={v.vol} className="grid grid-cols-1 gap-2 py-space-lg md:grid-cols-12 md:items-baseline md:gap-gutter-desktop">
                <div className="md:col-span-2">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">{v.vol}</span>
                  <span className="block font-spec-num text-xs text-outline">{v.season}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary md:col-span-4">{v.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant md:col-span-3">{v.note}</p>
                <span className="font-spec-num text-spec-num text-on-surface-variant md:col-span-2 md:text-right">{v.count}</span>
                <div className="md:col-span-1 md:text-right">
                  {v.current ? (
                    <span className="inline-flex rounded-full bg-primary-fixed px-2.5 py-0.5 font-label-sm text-label-sm uppercase text-on-primary-fixed">Current</span>
                  ) : (
                    <Link href="/request-catalogue" className="font-label-sm text-label-sm uppercase tracking-wider text-primary underline underline-offset-4 hover:text-terracotta">
                      Archive
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
