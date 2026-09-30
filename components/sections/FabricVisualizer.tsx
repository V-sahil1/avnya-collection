"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { CONTACT, IMG } from "@/lib/site";

const SPECS = [
  { label: "Weave Architecture", value: "Handcrafted Kadhua Interlacing", note: "Independent shuttles leave no floating threads on the reverse face." },
  { label: "Material Blend", value: "70% Silk / 30% Metallic Zari", blend: [70, 30] as const },
  { label: "Weight & Lustre", value: "85 GSM · Subtle Mineral Sheen", note: "Calendered with botanical wax emulsions for whisper-soft skin feel." },
  { label: "Drape Coefficient", value: "Architectural Flow (0.42)", note: "Maintains sharp pleat retention while preserving fluid biological motion." },
];

export default function FabricVisualizer() {
  // The magnifier zooms toward the pointer so buyers can "inspect" any region of the weave.
  const [origin, setOrigin] = useState("50% 50%");

  return (
    <section id="feel-the-fabric" className="relative w-full overflow-hidden bg-ink py-space-xl text-surface-bright md:py-20">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
          <div className="flex flex-col lg:col-span-7">
            <div data-anim="fade" className="flex flex-col gap-1 pb-space-sm font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-fixed opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-fixed" />
                </span>
                Optical Thread Surface Analyzer · 40x Macro
              </span>
              <span>Batch Ref: KDH-88402</span>
            </div>

            <div
              data-anim="reveal-side"
              className="group relative aspect-[16/11] w-full cursor-crosshair overflow-hidden bg-surface-variant shadow-2xl"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
              }}
              onMouseLeave={() => setOrigin("50% 50%")}
            >
              <Image
                src={IMG.macro}
                alt="Extreme macro of raw handwoven silk threads interwoven with antique gold zari brocade"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                style={{ transformOrigin: origin }}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-125"
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 sm:p-6">
                <div className="flex justify-end">
                  <span className="bg-black/70 px-3 py-1 font-spec-num text-xs tracking-wider text-tertiary-fixed-dim backdrop-blur-md">
                    Hover to Magnify 125%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-black/60 p-3 font-mono text-[10px] backdrop-blur-md sm:text-xs">
                  <div>
                    <span className="block text-white/60">Warp Pitch</span>
                    <span className="font-semibold text-white">120 Picks/Inch</span>
                  </div>
                  <div>
                    <span className="block text-white/60">Weft Yarn</span>
                    <span className="font-semibold text-white">Pure Tussar Mulberry</span>
                  </div>
                  <div>
                    <span className="block text-white/60">Zari Gauge</span>
                    <span className="font-semibold text-white">0.08mm Wire Inlay</span>
                  </div>
                </div>
              </div>
            </div>
            <p data-anim="fade" className="mt-3 font-body-sm text-body-sm text-outline-variant">
              Real optical capture: Certified 24k electroplated antique gold zari intertwined with untreated Mulberry weft filament.
            </p>
          </div>

          <div className="space-y-space-md lg:col-span-5 lg:pl-space-lg">
            <div>
              <span data-anim="fade" className="block font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim">Tactile Calibration</span>
              <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal leading-tight text-surface-bright md:text-headline-lg">
                Feel the Tactility. <br />
                <span className="font-light italic text-on-primary-container">Audit the Craft.</span>
              </h2>
              <p data-anim="fade" className="mt-2 font-body-md text-body-md font-light text-outline-variant">
                We eliminate procurement guesswork. Every weave is documented with laboratory GSM, tensile resistance, and tactile drape indices.
              </p>
            </div>

            <div data-anim-stagger="0.12" className="space-y-3 pt-space-sm">
              {SPECS.map((s) => (
                <div key={s.label} className="bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10">
                  <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed">{s.label}</span>
                    <span className="font-spec-num text-spec-num font-semibold text-white">{s.value}</span>
                  </div>
                  {s.note && <p className="mt-1 text-xs text-outline-variant">{s.note}</p>}
                  {s.blend && (
                    <div data-anim="bars" className="mt-2 flex h-1.5 w-full overflow-hidden rounded-full bg-white/10" role="img" aria-label={s.value}>
                      <div data-bar className="h-full bg-primary-fixed" style={{ width: `${s.blend[0]}%` }} />
                      <div data-bar className="h-full bg-tertiary-fixed-dim" style={{ width: `${s.blend[1]}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div data-anim="fade" className="flex flex-col gap-space-md pt-space-sm sm:flex-row">
              <Link
                href="/request-catalogue#swatch-box"
                className="bg-primary-fixed px-6 py-3.5 text-center font-label-md text-label-md font-semibold uppercase tracking-widest text-on-primary-fixed transition-colors hover:bg-primary-fixed-dim"
              >
                Request Fabric Swatch Book
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-label-md text-label-md uppercase tracking-widest text-surface-bright transition-colors hover:bg-white/5"
              >
                <Icon name="videocam" className="text-base text-on-primary-container" />
                <span>Video Loom Inspection</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
