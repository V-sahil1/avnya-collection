import Link from "next/link";
import { CollectionCard, FeatureCollectionCard } from "@/components/CollectionCard";
import { FEATURED_COLLECTIONS, SECONDARY_COLLECTIONS } from "@/lib/site";

export default function CollectionsShowcase({ showHeader = true }: { showHeader?: boolean }) {
  const [a, b] = FEATURED_COLLECTIONS;
  return (
    <section id="collections" className="w-full bg-surface py-space-xl">
      <div className="container-editorial">
        {showHeader && (
          <div className="flex flex-col justify-between gap-space-md pb-space-lg md:flex-row md:items-end">
            <div data-anim="fade">
              <span className="eyebrow">Volume III / Archival Curations</span>
              <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal text-on-background md:text-headline-lg">Loom Series &amp; Saree Edits</h2>
            </div>
            <div data-anim="fade-right" className="flex flex-wrap items-center gap-space-md">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">MOQ: 25 Units / Colourway</span>
              <Link
                href="/request-catalogue"
                className="bg-surface-container px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container-high"
              >
                Request Spec Sheets
              </Link>
            </div>
          </div>
        )}

        <div data-anim-stagger="0.14" className="grid grid-cols-1 gap-gutter md:grid-cols-12 md:gap-gutter-desktop">
          <FeatureCollectionCard c={a} className="md:col-span-7" />
          <FeatureCollectionCard c={b} className="md:col-span-5" />
          {SECONDARY_COLLECTIONS.map((c) => (
            <CollectionCard key={c.slug} c={c} className="md:col-span-4" />
          ))}
        </div>
      </div>
    </section>
  );
}
