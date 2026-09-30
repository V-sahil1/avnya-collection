import Link from "next/link";
import { CONTACT, FOOTER_ARCHITECTURE, FOOTER_LEGAL, FOOTER_TRADE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="w-full bg-ink pb-24 pt-space-xl text-surface-bright sm:pb-space-lg">
      <div className="w-full px-margin md:px-margin-desktop">
        <div data-anim-stagger="0.12" className="grid grid-cols-1 gap-gutter-desktop pb-space-xl md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5 lg:pr-space-xl">
            <div className="space-y-space-md">
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1">
                <span className="font-headline-md text-headline-md uppercase tracking-wider text-surface-bright">Avanya</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline-variant">Master Mill &amp; Handloom</span>
              </div>
              <p className="max-w-md font-serif text-headline-lg-mobile italic text-surface-container-highest md:text-headline-md">
                Textiles, Crafted With Intent.
              </p>
              <p className="max-w-sm font-body-sm text-body-sm text-outline-variant">
                Curators of rare tussar silks, kadhua brocades, and industrial-precision handloom weaves. Built for haute couture houses and discerning global retailers.
              </p>
            </div>
            <div className="pt-space-lg">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-primary-container">
                Loom Atelier: Varanasi • Chanderi • Kanchipuram
              </span>
            </div>
          </div>

          <FooterColumn className="lg:col-span-2" title="Architecture" links={FOOTER_ARCHITECTURE} />
          <FooterColumn className="lg:col-span-3" title="Trade & B2B Procurement" links={FOOTER_TRADE} />

          <div className="space-y-space-md lg:col-span-2">
            <h4 className="font-label-md text-label-md uppercase tracking-widest text-surface-container-highest">Atelier Desk</h4>
            <div className="space-y-space-sm font-body-sm text-body-sm text-outline-variant">
              <p>Couture &amp; Wholesale Inquiries</p>
              <a href={`mailto:${CONTACT.concierge}`} className="block break-all font-spec-num text-spec-num text-surface-bright hover:text-tertiary-fixed-dim">
                {CONTACT.concierge}
              </a>
              <a href={CONTACT.phoneHref} className="block font-spec-num text-spec-num text-surface-bright hover:text-tertiary-fixed-dim">
                {CONTACT.phone}
              </a>
              <div className="pt-space-sm">
                <span className="inline-flex items-center gap-2 whitespace-nowrap bg-forest px-2 py-1 font-label-sm text-label-sm uppercase text-on-primary-container">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-fixed" />
                  All Looms Operating
                </span>
              </div>
            </div>
          </div>
        </div>

        <div data-anim="rule" className="h-px w-full bg-white/10" />
        <div data-anim="fade" className="flex flex-col items-center justify-between gap-space-md pt-space-lg text-center font-body-sm text-body-sm text-outline-variant sm:flex-row sm:text-left">
          <p>© 2025 AVANYA TEXTILE ATELIER. All rights reserved. Registered Handloom &amp; Industrial Mill.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-space-lg gap-y-2 font-label-sm text-label-sm uppercase tracking-wider">
            {FOOTER_LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="link-underline transition-colors hover:text-surface-bright">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links, className }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <div className={`space-y-space-md ${className}`}>
      <h4 className="font-label-md text-label-md uppercase tracking-widest text-surface-container-highest">{title}</h4>
      <ul className="space-y-space-sm font-body-sm text-body-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-outline-variant transition-colors hover:text-surface-bright">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
