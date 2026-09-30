import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CatalogueRequest from "@/components/sections/CatalogueRequest";
import ClientArchetypes from "@/components/sections/ClientArchetypes";

export const metadata: Metadata = {
  title: "Request Catalogue",
  description: "Request the 2025-2026 Avanya Wholesale Lookbook, yarn price index, MOQ matrices and a curated swatch box.",
};

export default function RequestCataloguePage() {
  return (
    <>
      <PageHero
        crumb="Request Catalogue"
        overline="Trade & B2B Procurement"
        title={<>The 2025–26 <span className="font-light italic text-secondary-fixed">Wholesale Lookbook.</span></>}
        intro="Lookbook, yarn price index and tiered MOQ matrices dispatched within 2 business hours. Swatch boxes ship worldwide in 48 hours."
        meta={["Response in 2 Business Hours", "NDA on Proprietary Artwork", "Complimentary Swatch Box"]}
      />
      <CatalogueRequest />
      <ClientArchetypes />
    </>
  );
}
