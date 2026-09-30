"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import Icon from "@/components/Icon";
import { LoomStatus } from "@/components/Spec";
import { SAREES, type Saree } from "@/lib/site";

const FILTERS = ["All", "Handloom", "Jacquard", "Sheer", "Fluid", "Bridal"] as const;

export default function SareeGrid() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = filter === "All" ? SAREES : SAREES.filter((s) => s.category === filter);
  const gridRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  // Re-deal the cards whenever the filter changes (the initial reveal is handled by data-anim-stagger).
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(gridRef.current!.children, { y: 40, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.07, clearProps: "transform,opacity,visibility" });
      });
      return () => mm.revert();
    },
    { dependencies: [filter], scope: gridRef },
  );

  return (
    <>
      <div data-anim="fade" className="flex flex-col justify-between gap-space-md border-b border-sand/60 pb-space-md md:flex-row md:items-center">
        <div className="-mx-margin flex gap-2 overflow-x-auto px-margin pb-1 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter by weave">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`shrink-0 px-space-md py-2 font-label-md text-label-md uppercase tracking-wider transition-colors ${
                filter === f ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="font-spec-num text-spec-num text-olive">
          {items.length} {items.length === 1 ? "style" : "styles"} · Wholesale only
        </span>
      </div>

      <div ref={gridRef} data-anim-stagger="0.1" className="mt-space-lg grid grid-cols-1 gap-x-gutter gap-y-space-xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-gutter-desktop">
        {items.map((s) => (
          <SareeCard key={s.sku} s={s} />
        ))}
      </div>
    </>
  );
}

/** Fabric Showcase Card (DESIGN.md): 3:4 frame, sand hairline, two-column spec block below. */
function SareeCard({ s }: { s: Saree }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-sand bg-surface-container">
        <Image
          src={s.image}
          alt={`${s.name} — ${s.weave} saree`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: s.imagePosition }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <LoomStatus status={s.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-space-md">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-olive">{s.sku}</span>
        <h3 className="mt-1 font-headline-sm text-headline-sm text-primary transition-colors group-hover:text-secondary">{s.name}</h3>
        <p className="font-serif text-lg italic text-on-surface-variant">{s.weave}</p>
        <dl className="mt-space-sm grid grid-cols-2 gap-x-space-md gap-y-1 border-t border-sand/60 pt-space-sm font-body-sm text-xs">
          <dt className="text-olive">Warp</dt>
          <dd className="text-right font-spec-num text-on-surface">{s.warp}</dd>
          <dt className="text-olive">Weft</dt>
          <dd className="text-right font-spec-num text-on-surface">{s.weft}</dd>
          <dt className="text-olive">Weight</dt>
          <dd className="text-right font-spec-num text-on-surface">{s.gsm} GSM</dd>
          <dt className="text-olive">Length</dt>
          <dd className="text-right font-spec-num text-on-surface">{s.length}</dd>
          <dt className="text-olive">MOQ</dt>
          <dd className="text-right font-spec-num text-on-surface">{s.moq}</dd>
        </dl>
        <Link
          href={`/request-catalogue?sku=${s.sku}#trade-form`}
          className="mt-space-md inline-flex items-center gap-1 self-start font-label-md text-label-md uppercase tracking-wider text-primary underline underline-offset-4 transition-colors hover:text-terracotta"
        >
          Enquire Wholesale <Icon name="arrow_forward" className="text-sm" />
        </Link>
      </div>
    </article>
  );
}
