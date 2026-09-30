import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SareeGrid from "@/components/SareeGrid";
import CtaBand from "@/components/CtaBand";
import { IMG } from "@/lib/site";

export const metadata: Metadata = { title: "Sarees", description: "Heirloom and mill-scale sarees available for wholesale, boutique and couture procurement." };

export default function SareesPage() {
  return (
    <>
      <PageHero
        crumb="Sarees"
        overline="Heirloom Sarees · Wholesale Edit"
        title={<>Draped in <span className="font-light italic text-secondary-fixed">Provenance.</span></>}
        intro="Every saree in the edit is documented with warp and weft counts, weight and length, and is available in capsule runs for boutiques or volume runs for distributors."
        image={IMG.hero}
        imagePosition="85% top"
        meta={["Silk Mark Certified", "6.2 – 6.5 m with Blouse Piece", "Strike-offs in 72 Hours"]}
      />
      <section className="w-full bg-surface py-space-xl md:py-20">
        <div className="container-editorial">
          <SareeGrid />
        </div>
      </section>
      <CtaBand overline="Private Label" title="Need Your Own Colourway?" body="Any saree in the edit can be re-dyed to your Pantone references from 25 units per colourway, with strike-offs couriered within 72 hours." />
    </>
  );
}
