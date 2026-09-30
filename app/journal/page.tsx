import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import { ARTICLES, IMG } from "@/lib/site";

export const metadata: Metadata = { title: "Journal", description: "Loom notes, procurement guides and collection stories from the Avanya atelier." };

export default function JournalPage() {
  const [lead, ...rest] = ARTICLES;
  return (
    <>
      <PageHero
        crumb="Journal"
        overline="Editorial & Journal"
        title={<>Notes from <span className="font-light italic text-secondary-fixed">the Loom.</span></>}
        intro="Technique, procurement and provenance — written by our weavers, dyers and textile engineers."
        image={IMG.macro}
      />
      <section className="w-full bg-surface py-space-xl md:py-20">
        <div className="container-editorial">
          <Link href={`/journal/${lead.slug}`} data-anim="scale" className="group grid grid-cols-1 gap-space-lg bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-md lg:grid-cols-12 lg:gap-0">
            <div data-anim="reveal" className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
              <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-space-lg md:p-space-xl lg:col-span-5">
              <span className="eyebrow">{lead.category} · Featured</span>
              <h2 className="mt-2 font-headline-lg text-headline-md font-normal text-primary transition-colors group-hover:text-secondary md:text-[40px] md:leading-[48px]">{lead.title}</h2>
              <p className="mt-space-md font-body-md text-body-md text-on-surface-variant">{lead.excerpt}</p>
              <div className="mt-space-lg flex items-center justify-between font-spec-num text-xs uppercase tracking-wider text-olive">
                <span>{lead.date} · {lead.readTime}</span>
                <span className="flex items-center gap-1 font-label-md text-label-md text-primary">Read <Icon name="arrow_forward" className="text-sm" /></span>
              </div>
            </div>
          </Link>

          <div data-anim-stagger="0.14" className="mt-space-xl grid grid-cols-1 gap-gutter md:grid-cols-3 md:gap-gutter-desktop">
            {rest.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden border border-sand bg-surface-container">
                  <Image src={a.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" style={{ objectPosition: a.imagePosition }} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="mt-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary">{a.category}</span>
                <h3 className="mt-1 font-headline-sm text-headline-sm text-primary transition-colors group-hover:text-secondary">{a.title}</h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{a.excerpt}</p>
                <span className="mt-space-sm font-spec-num text-xs uppercase tracking-wider text-olive">{a.date} · {a.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
