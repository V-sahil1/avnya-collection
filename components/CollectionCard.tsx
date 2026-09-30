import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Collection } from "@/lib/site";

const TAG_STYLES: Record<Collection["tagStyle"], string> = {
  ink: "bg-ink/85 text-surface-bright backdrop-blur-md",
  primary: "bg-primary text-on-primary",
  light: "bg-surface-bright/90 text-on-surface backdrop-blur-sm",
  blush: "bg-secondary-fixed text-on-secondary-fixed",
};

/** Large editorial card (4:3) used for the two featured loom series. */
export function FeatureCollectionCard({ c, className = "" }: { c: Collection; className?: string }) {
  return (
    <article className={`group flex flex-col overflow-hidden bg-surface-container-lowest shadow-sm transition-all duration-500 hover:shadow-md ${className}`}>
      <div data-anim="reveal" className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          style={{ objectPosition: c.imagePosition }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <span className={`px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest ${TAG_STYLES[c.tagStyle]}`}>{c.tag}</span>
        </div>
        {c.leadTime && (
          <div className="absolute bottom-4 right-4 bg-surface-container-lowest/90 px-3 py-1.5 font-spec-num text-xs backdrop-blur-sm">
            {c.leadTime}
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col justify-between p-space-lg">
        <div>
          <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline sm:gap-space-md">
            <h3 className="font-headline-sm text-headline-sm text-primary transition-colors group-hover:text-secondary">{c.title}</h3>
            <span className="shrink-0 font-spec-num text-spec-num font-semibold text-on-surface-variant">{c.gsm}</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{c.body}</p>
        </div>
        <div className="mt-space-md flex flex-wrap items-center justify-between gap-2 pt-space-sm font-label-sm text-xs uppercase tracking-wider text-outline">
          <span>{c.metaLeft}</span>
          <Link href="/request-catalogue" className="group/link flex items-center gap-1 font-bold text-primary underline-offset-4 hover:underline">
            {c.metaRight} <Icon name="arrow_forward" className="text-sm transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Compact square card used for the secondary weave grid. */
export function CollectionCard({ c, className = "" }: { c: Collection; className?: string }) {
  return (
    <article className={`group flex flex-col overflow-hidden bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md ${className}`}>
      <div data-anim="reveal" className="relative aspect-square w-full overflow-hidden bg-surface-container-low">
        <Image
          src={c.image}
          alt={c.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-3 top-3 px-2.5 py-1 font-label-sm text-label-sm uppercase ${TAG_STYLES[c.tagStyle]}`}>{c.tag}</span>
      </div>
      <div className="p-space-md">
        <h4 className="font-headline-sm text-lg font-semibold text-primary">{c.title}</h4>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{c.body}</p>
        <div className="mt-4 flex items-center justify-between gap-2 font-label-sm text-xs uppercase text-outline">
          <span>{c.metaLeft}</span>
          <span className="font-semibold text-primary">{c.metaRight}</span>
        </div>
      </div>
    </article>
  );
}
