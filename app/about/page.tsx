import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import BrandStatement from "@/components/sections/BrandStatement";
import Metrics from "@/components/sections/Metrics";
import ClientArchetypes from "@/components/sections/ClientArchetypes";
import CtaBand from "@/components/CtaBand";
import { IMG } from "@/lib/site";

export const metadata: Metadata = { title: "About", description: "The Avanya atelier story — heritage handloom provenance unified with industrial-precision production." };

const ATELIERS = [
  { city: "Varanasi", role: "Flagship Mill & Kadhua Pit-Looms", body: "Katan and Banarasi brocades, zari insertion, and our 60,000 sq.ft electronic jacquard hall." },
  { city: "Chanderi", role: "Sheer Weaving Cluster", body: "Featherweight silk-cotton and organza grounds woven by partner master weavers." },
  { city: "Kanchipuram", role: "Temple Border Studio", body: "Korvai-joined contrast borders and heavy mulberry for bridal commissions." },
];

const TIMELINE = [
  { year: "1987", text: "First eight pit-looms established in Varanasi by our founding weaver family." },
  { year: "2004", text: "Surat dyehouse opened with closed-loop water treatment." },
  { year: "2016", text: "Electronic jacquard hall commissioned; first export to the UK and GCC." },
  { year: "2025", text: "Now supplying 28+ countries with 120K+ metres of monthly loom output." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        overline="The Atelier Story"
        title={<>Textiles, <span className="font-light italic text-secondary-fixed">Crafted With Intent.</span></>}
        intro="Curators of rare tussar silks, kadhua brocades, and industrial-precision handloom weaves — built for haute couture houses and discerning global retailers."
        image={IMG.hero}
        imagePosition="85% top"
      />
      <BrandStatement />

      <section className="w-full bg-surface py-space-xl md:py-20">
        <div className="container-editorial grid grid-cols-1 items-center gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
          <div data-anim="reveal" className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
            <Image src={IMG.handloom} alt="Model in a pleated sage handloom saree in a stone courtyard" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="space-y-space-lg lg:col-span-7">
            <div>
              <span data-anim="fade" className="eyebrow">Provenance</span>
              <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal text-primary md:text-headline-lg">
                Three Ateliers, <span className="italic">One Standard.</span>
              </h2>
            </div>
            <div data-anim-stagger="0.12" className="divide-y divide-sand border-y border-sand">
              {ATELIERS.map((a) => (
                <div key={a.city} className="grid grid-cols-1 gap-1 py-space-md sm:grid-cols-3 sm:gap-space-md">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">{a.city}</h3>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">{a.role}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant sm:col-span-2">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-ink py-space-xl text-surface-bright md:py-20">
        <div className="container-editorial">
          <span data-anim="fade" className="block font-label-sm text-label-sm uppercase tracking-widest text-shimmer">Chronology</span>
          <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal md:text-headline-lg">Four Decades at the Loom</h2>
          <ol data-anim-stagger="0.15" className="mt-space-xl grid grid-cols-1 gap-space-lg sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative pt-space-md">
                <span data-anim="rule" className="absolute inset-x-0 top-0 h-px bg-gold/40" />
                <span className="font-serif text-headline-md italic text-tertiary-fixed-dim">{t.year}</span>
                <p className="mt-2 font-body-sm text-body-sm text-outline-variant">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Metrics />
      <ClientArchetypes />
      <CtaBand />
    </>
  );
}
