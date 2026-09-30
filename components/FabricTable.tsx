"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import Icon from "@/components/Icon";
import { CompositionBar, LoomStatus } from "@/components/Spec";
import { FABRICS, type Fabric } from "@/lib/site";

const FAMILIES = ["All", "Silk", "Organza", "Georgette", "Tussar", "Brocade"] as const;
type SortKey = "code" | "gsm";

export default function FabricTable() {
  const [family, setFamily] = useState<(typeof FAMILIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("code");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FABRICS.filter((f) => (family === "All" || f.family === family) && (!q || `${f.code} ${f.name} ${f.count}`.toLowerCase().includes(q))).sort(
      (a, b) => (sort === "gsm" ? a.gsm - b.gsm : a.code.localeCompare(b.code)),
    );
  }, [family, query, sort]);

  const bodyRef = useRef<HTMLTableSectionElement>(null);
  const firstRun = useRef(true);
  // Rows cascade back in and their composition bars redraw when the family filter or sort changes.
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const rows = bodyRef.current!.children;
        gsap.from(rows, { x: -24, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.04, clearProps: "transform,opacity,visibility" });
        gsap.from(bodyRef.current!.querySelectorAll("[data-bar]"), { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power3.inOut", stagger: 0.03, clearProps: "transform" });
      });
      return () => mm.revert();
    },
    { dependencies: [family, sort], scope: bodyRef },
  );

  return (
    <div>
      <div data-anim="fade" className="flex flex-col gap-space-md lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-margin flex gap-2 overflow-x-auto px-margin pb-1 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter by fabric family">
          {FAMILIES.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={family === f}
              onClick={() => setFamily(f)}
              className={`shrink-0 px-space-md py-2 font-label-md text-label-md uppercase tracking-wider transition-colors ${
                family === f ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="relative flex-1 lg:w-72">
            <span className="sr-only">Search fabrics</span>
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-olive" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code, name or yarn count"
              className="w-full border border-ink/20 bg-surface-container-lowest py-2.5 pl-10 pr-3 font-body-sm text-body-sm focus:border-forest focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setSort((s) => (s === "code" ? "gsm" : "code"))}
            className="flex items-center gap-1 border border-ink px-3 font-label-md text-label-md uppercase tracking-wider text-ink transition-colors hover:bg-sand"
          >
            <Icon name="swap_vert" className="text-[16px]" />
            {sort === "code" ? "Code" : "GSM"}
          </button>
        </div>
      </div>

      {/* Desktop: ruled data table (no vertical grid lines, right-aligned numerals) */}
      <div data-anim="bars" data-stagger="0.05" className="mt-space-lg hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-sand/60 font-label-sm text-label-sm uppercase tracking-widest text-on-surface">
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Fabric</th>
              <th className="px-4 py-3 font-semibold">Composition</th>
              <th className="px-4 py-3 font-semibold">Yarn Count</th>
              <th className="px-4 py-3 text-right font-semibold">GSM</th>
              <th className="px-4 py-3 text-right font-semibold">Width</th>
              <th className="px-4 py-3 text-right font-semibold">Lead (Days)</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody ref={bodyRef} data-anim-stagger="0.05">
            {rows.map((f) => (
              <tr key={f.code} className="border-b border-sand transition-colors hover:bg-ivory">
                <td className="px-4 py-4 font-spec-num text-spec-num text-olive">{f.code}</td>
                <td className="px-4 py-4">
                  <span className="font-headline-sm text-lg text-primary">{f.name}</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-outline">{f.family}</span>
                </td>
                <td className="px-4 py-4"><CompositionBar {...f.composition} /></td>
                <td className="px-4 py-4 font-spec-num text-spec-num">{f.count}</td>
                <td className="px-4 py-4 text-right font-spec-num text-spec-num tabular-nums">{f.gsm}</td>
                <td className="px-4 py-4 text-right font-spec-num text-spec-num tabular-nums">{f.width}</td>
                <td className="px-4 py-4 text-right font-spec-num text-spec-num tabular-nums">{f.leadDays}</td>
                <td className="px-4 py-4"><LoomStatus status={f.status} /></td>
                <td className="px-4 py-4 text-right">
                  <SwatchLink f={f} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: collapsible spec accordions */}
      <div data-anim-stagger="0.06" className="mt-space-lg divide-y divide-sand border-y border-sand md:hidden">
        {rows.map((f) => (
          <details key={f.code} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-space-md">
              <div>
                <span className="font-spec-num text-xs text-olive">{f.code} · {f.gsm} GSM</span>
                <span className="block font-headline-sm text-lg text-primary">{f.name}</span>
              </div>
              <Icon name="expand_more" className="text-olive transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 space-y-3">
              <CompositionBar {...f.composition} />
              <dl className="grid grid-cols-2 gap-y-1 font-body-sm text-xs">
                <dt className="text-olive">Yarn Count</dt><dd className="text-right font-spec-num">{f.count}</dd>
                <dt className="text-olive">Width</dt><dd className="text-right font-spec-num">{f.width}</dd>
                <dt className="text-olive">Lead Time</dt><dd className="text-right font-spec-num">{f.leadDays} days</dd>
              </dl>
              <div className="flex items-center justify-between">
                <LoomStatus status={f.status} />
                <SwatchLink f={f} />
              </div>
            </div>
          </details>
        ))}
      </div>

      {rows.length === 0 && (
        <p className="py-space-xl text-center font-body-md text-body-md text-on-surface-variant">
          No fabrics match “{query}”. Try another yarn count or{" "}
          <button type="button" className="underline underline-offset-4 hover:text-terracotta" onClick={() => { setQuery(""); setFamily("All"); }}>
            clear filters
          </button>.
        </p>
      )}
    </div>
  );
}

function SwatchLink({ f }: { f: Fabric }) {
  return (
    <Link
      href={`/request-catalogue?fabric=${f.code}#trade-form`}
      className="whitespace-nowrap font-label-sm text-label-sm uppercase tracking-wider text-primary underline underline-offset-4 transition-colors hover:text-terracotta"
    >
      Request Swatch
    </Link>
  );
}
