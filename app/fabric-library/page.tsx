import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FabricTable from "@/components/FabricTable";
import FabricVisualizer from "@/components/sections/FabricVisualizer";
import CtaBand from "@/components/CtaBand";
import { IMG } from "@/lib/site";

export const metadata: Metadata = { title: "Fabric Library", description: "Searchable specification library of Avanya silks, organzas, georgettes, tussars and brocades." };

export default function FabricLibraryPage() {
  return (
    <>
      <PageHero
        crumb="Fabric Library"
        overline="Swatch Library · 340+ In-Stock Weaves"
        title={<>The Fabric <span className="font-light italic text-secondary-fixed">Library.</span></>}
        intro="Running fabric by the roll, specified the way procurement teams need it: yarn counts, GSM, width, lead times and live loom status for every weave."
        image={IMG.macro}
        meta={["MOQ: 100 Meters / Colourway", "Custom Pantone Match", "Lab Reports on Request"]}
      />
      <section className="w-full bg-surface py-space-xl md:py-20">
        <div className="container-editorial">
          <div className="mb-space-lg max-w-2xl">
            <span data-anim="fade" className="eyebrow">Specification Index</span>
            <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal text-primary md:text-headline-lg">Weaves by Family</h2>
          </div>
          <FabricTable />
          <div data-anim="fade" className="mt-space-lg flex flex-wrap gap-x-space-lg gap-y-2 font-label-sm text-label-sm uppercase tracking-wider text-olive">
            <span className="flex items-center gap-2"><span className="h-1.5 w-4 bg-forest" /> Mulberry / Tussar Silk</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-4 bg-gold" /> Metallic Zari</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-4 bg-sand" /> Viscose / Other</span>
          </div>
        </div>
      </section>
      <FabricVisualizer />
      <CtaBand overline="Swatch Box" title="Feel It Before You Order" body="30+ physical cuttings (8x8 inches) of Katan, Organza, Tussar, Georgette and real zari headers — complimentary for registered wholesale buyers." />
    </>
  );
}
