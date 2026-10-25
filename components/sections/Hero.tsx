"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { CONTACT } from "@/lib/site";

// Sharpened 2× renders of the source photography (public/images/hero). Positions keep each subject in the lit right-hand panel.
const SLIDES = [
  { src: "/images/hero/silk-portrait.jpg", position: "object-[50%_12%]", alt: "Model in an ivory and bottle-green handwoven silk saree beside a sunlit stone window" },
  { src: "/images/hero/handloom-courtyard.jpg", position: "object-[50%_30%]", alt: "Model in a sage handloom saree standing in a stone courtyard" },
  { src: "/images/hero/zari-weave.jpg", position: "object-center", alt: "Macro detail of gold zari woven through raw silk" },
  { src: "/images/hero/jacquard-mill.jpg", position: "object-[70%_center]", alt: "Jacquard looms weaving emerald silk on the mill floor" },
];
const INTERVAL = 7000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  // Rotate the imagery only when the visitor hasn't asked for reduced motion.
  useEffect(() => {
    setAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, autoplay]);

  return (
    <section data-hero className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#1c1814] pt-20 text-surface-bright">
      {/* Ambient backdrop: the active slide, softly blurred, so the copy side reads as the same lit room rather than flat black */}
      <div aria-hidden="true" className="absolute inset-0 z-0 hidden overflow-hidden md:block">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            sizes="40vw"
            className={`scale-125 object-cover object-left blur-2xl saturate-[0.85] transition-opacity duration-[1600ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[#2a221b]/45" />
      </div>

      {/* Imagery: full-bleed on phones, a lit right-hand panel from md up so the subject never sits behind the copy */}
      <div className="absolute inset-y-0 right-0 z-0 w-full overflow-hidden md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_38%)] lg:w-[58%]">
        {/* Slightly oversized layer so the parallax drift never exposes an edge */}
        <div data-anim="parallax" data-speed="3" className="absolute inset-x-0 -top-[4%] h-[108%]">
          <div data-anim="hero-zoom" data-delay="0" className="absolute inset-0">
            {SLIDES.map((slide, i) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                quality={92}
                sizes="(min-width: 768px) 58vw, 100vw"
                aria-hidden={i !== active}
                className={`object-cover ${slide.position} transition-opacity duration-[1600ms] ease-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Phones: shade the whole frame for legible copy */}
        <div className="absolute inset-0 bg-[#1c1814]/60 md:hidden" />
      </div>

      {/* Gentle warm shade behind the copy only; the right side stays fully lit */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-r from-[#1c1814]/55 via-[#1c1814]/20 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-[#1c1814]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-[#1c1814]/50 to-transparent" />

      <div data-anim="hero-exit" className="relative z-10 w-full px-margin py-space-xl md:px-margin-desktop lg:px-20">
        <div className="max-w-xl lg:max-w-2xl">
          <div data-anim="fade" data-delay="0.2" className="mb-space-lg flex items-center gap-4">
            <span className="font-serif text-[15px] uppercase tracking-[0.18em] text-surface-bright/90">Indian Textiles</span>
            <span className="h-px w-10 bg-surface-bright/40" />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-surface-bright/70">Crafted for the World</span>
          </div>

          <h1
            data-anim="lines"
            data-delay="0.35"
            className="font-serif text-[46px] font-normal leading-[1.05] tracking-tight text-surface-bright sm:text-[60px] md:text-[clamp(56px,min(6.2vw,11vh),88px)] md:leading-[1.02]"
          >
            Where Tradition <br />
            <span className="italic text-[#d6b796]">Meets the Future</span> <br />
            of Textiles.
          </h1>

          <p data-anim="fade" data-delay="0.9" className="mt-space-md max-w-md lg:max-w-lg font-body-md text-[15px] font-light leading-relaxed text-surface-bright/75 md:text-base">
            Premium heirloom sarees, high-twist silks, and bespoke jacquards crafted with architectural precision and high-volume industrial capability for{" "}
            <span className="text-[#d6b796]">premier fashion houses</span>, haute couture ateliers, and international distributors.
          </p>

          <div data-anim-stagger="0.12" data-delay="1.1" className="mt-space-lg flex flex-col items-start gap-space-md sm:flex-row sm:flex-wrap sm:items-center sm:gap-space-lg lg:w-max lg:flex-nowrap lg:gap-8 xl:gap-10">
            <Link
              href="/collections"
              className="group inline-flex shrink-0 items-center gap-4 whitespace-nowrap rounded-full border border-surface-bright/50 px-7 py-4 font-label-md text-label-md uppercase tracking-[0.16em] text-surface-bright transition-colors duration-300 hover:border-surface-bright hover:bg-surface-bright hover:text-ink"
            >
              Explore Collections
              <Icon name="arrow_forward" className="text-[18px] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/request-catalogue"
              className="shrink-0 whitespace-nowrap border-b border-surface-bright/40 pb-1.5 font-label-md text-label-md uppercase tracking-[0.16em] text-surface-bright transition-colors hover:border-surface-bright"
            >
              Request Catalogue
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-3 whitespace-nowrap"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-primary-fixed transition-colors group-hover:bg-primary-container">
                <Icon name="chat" className="text-[18px]" />
              </span>
              <span className="border-b border-surface-bright/40 pb-1.5 font-label-md text-label-md uppercase tracking-[0.16em] text-surface-bright transition-colors group-hover:border-surface-bright">
                WhatsApp Quick Connect
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Vertical slide index */}
      <nav aria-label="Hero slides" data-anim="fade" data-delay="1.4" className="absolute right-margin top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 md:right-margin-desktop md:flex">
        <span className="font-spec-num text-[11px] tracking-widest text-surface-bright/70">01</span>
        <span className="h-6 w-px bg-surface-bright/30" />
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active}
            className="flex h-4 w-4 items-center justify-center"
          >
            <span className={`rounded-full bg-surface-bright transition-all duration-300 ${i === active ? "h-2 w-2" : "h-1 w-1 opacity-40 hover:opacity-80"}`} />
          </button>
        ))}
        <span className="h-6 w-px bg-surface-bright/30" />
        <span className="font-spec-num text-[11px] tracking-widest text-surface-bright/70">0{SLIDES.length}</span>
      </nav>

      {/* Autoplay progress */}
      <div className="absolute bottom-8 left-margin z-10 h-px w-24 overflow-hidden bg-surface-bright/20 md:left-margin-desktop lg:left-20">
        <span
          key={active}
          className="block h-full origin-left bg-surface-bright"
          style={autoplay ? { animation: `hero-progress ${INTERVAL}ms linear forwards` } : { transform: "scaleX(1)" }}
        />
      </div>
    </section>
  );
}
