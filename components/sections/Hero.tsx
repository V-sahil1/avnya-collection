import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CONTACT, IMG } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center justify-start overflow-hidden bg-primary text-on-primary">
      {/* Immersive background imagery with luxury editorial lighting */}
      <div className="absolute inset-0 z-0">
        {/* Oversized layer so the parallax drift never exposes an edge */}
        <div data-anim="parallax" data-speed="7" className="absolute inset-x-0 -top-[10%] h-[120%]">
          <Image
            src={IMG.hero}
            alt="Model in an ivory and bottle-green handwoven silk saree beside a sunlit stone window"
            fill
            priority
            sizes="100vw"
            data-anim="hero-zoom"
            data-delay="0"
            className="scale-105 object-cover object-[88%_top] opacity-55 md:object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div data-anim="hero-exit" className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-between px-margin py-space-xl md:px-margin-desktop">
        <div className="max-w-3xl space-y-space-md">
          <div data-anim="fade" data-delay="0.2" className="inline-flex items-center gap-space-sm bg-surface/10 px-3 py-1.5 text-surface-bright backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary-fixed" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-shimmer">
              Indian Textiles · Crafted for the World
            </span>
          </div>

          <h1 data-anim="lines" data-delay="0.35" className="font-headline-lg text-[44px] font-normal leading-[1.08] tracking-tight text-surface-bright sm:text-headline-lg md:text-display-hero md:leading-[1.08]">
            Where Tradition <br className="hidden sm:block" />
            <span className="font-light italic text-secondary-fixed">Meets the Future</span> <br className="hidden sm:block" />
            of Textiles.
          </h1>

          <p data-anim="fade" data-delay="0.9" className="max-w-2xl font-body-lg text-body-lg font-light leading-relaxed text-outline-variant">
            Premium heirloom sarees, high-twist silks, and bespoke jacquards crafted with architectural precision and high-volume industrial capability for premier fashion houses, haute couture ateliers, and international distributors.
          </p>

          <div data-anim-stagger="0.12" data-delay="1.1" className="flex flex-col gap-space-sm pt-space-md sm:flex-row sm:flex-wrap sm:items-center sm:gap-space-md">
            <Link
              href="/collections"
              className="bg-surface-bright px-space-lg py-4 text-center font-label-md text-label-md font-semibold uppercase tracking-widest text-primary shadow-lg transition-all duration-300 hover:bg-primary-fixed"
            >
              Explore Collections
            </Link>
            <Link
              href="/request-catalogue"
              className="px-space-lg py-4 text-center font-label-md text-label-md uppercase tracking-widest text-surface-bright ring-1 ring-inset ring-white/20 transition-colors duration-300 hover:bg-surface/10 sm:ring-0"
            >
              Request Catalogue
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-forest/60 px-space-md py-4 font-label-md text-label-md uppercase tracking-wider text-primary-fixed backdrop-blur-sm transition-colors hover:bg-forest"
            >
              <Icon name="chat" className="text-[18px]" />
              <span>WhatsApp Quick Connect</span>
            </a>
          </div>
        </div>

        {/* Hero bottom archival metadata */}
        <div data-anim="fade" data-delay="1.5" className="mt-space-xl flex flex-wrap items-center justify-between gap-space-md pt-space-lg text-outline-variant">
          <div className="flex flex-col gap-2 font-spec-num text-xs uppercase tracking-wider sm:flex-row sm:flex-wrap sm:items-center sm:gap-space-lg">
            <span>Mill Reg: IND-VNS-9042</span>
            <span className="hidden opacity-40 sm:inline">•</span>
            <span>Warp Capacity: 180,000 m/mo</span>
            <span className="hidden opacity-40 sm:inline">•</span>
            <span>OEKO-TEX® &amp; Silk Mark Certified</span>
          </div>
          <a href="#textile-house" className="hidden items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-surface-bright/70 transition-colors hover:text-surface-bright md:flex">
            <span>Scroll Down to Discover</span>
            <Icon name="arrow_downward" className="animate-bounce text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}
