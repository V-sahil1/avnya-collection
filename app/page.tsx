import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import Metrics from "@/components/sections/Metrics";
import CollectionsShowcase from "@/components/sections/CollectionsShowcase";
import FabricVisualizer from "@/components/sections/FabricVisualizer";
import ManufacturingJourney from "@/components/sections/ManufacturingJourney";
import Bespoke from "@/components/sections/Bespoke";
import ClientArchetypes from "@/components/sections/ClientArchetypes";
import CatalogueRequest from "@/components/sections/CatalogueRequest";
import Marquee from "@/components/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <Metrics />
      <Marquee />
      <CollectionsShowcase />
      <FabricVisualizer />
      <ManufacturingJourney />
      <Bespoke />
      <ClientArchetypes />
      <CatalogueRequest />
    </>
  );
}
