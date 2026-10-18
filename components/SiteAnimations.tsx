"use client";

import Image from "next/image";
import { useRef } from "react";
import { animateScope } from "@/lib/animations";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import SareeDrape, { playSareeDrape } from "@/components/SareeDrape";

/**
 * Persistent, layout-level motion: first-visit intro curtain, header entrance + hide-on-scroll,
 * a gold "thread" scroll-progress bar, and footer reveals.
 */
export default function SiteAnimations() {
  const barRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const drapeRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const html = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const header = document.querySelector<HTMLElement>("header");
      const footer = document.querySelector("footer");
      const intro = introRef.current;
      const playIntro = html.classList.contains("intro") && intro;

      gsap.to(barRef.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      // Intro curtain: a silk saree flows in across the screen, the shield mark and wordmark rise
      // over it, then the saree slides away and the curtain lifts onto the site.
      let stopDrape: (() => void) | undefined;
      if (playIntro) {
        const word = intro.querySelector("[data-intro-word]")!;
        const split = SplitText.create(word, { type: "chars", mask: "chars" });
        const brand = intro.querySelector("[data-intro-brand]");
        const drape = playSareeDrape(drapeRef.current!, 2.3);
        stopDrape = drape.stop;
        gsap
          .timeline({ onComplete: () => { html.classList.remove("intro"); split.revert(); } })
          .add(drape.timeline, 0)
          .from(intro.querySelector("[data-intro-mark]"), { scale: 0.6, autoAlpha: 0, rotation: -8, duration: 0.9, ease: "expo.out" }, 0.5)
          .from(split.chars, { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.05 }, 0.75)
          .from(intro.querySelector("[data-intro-sub]"), { autoAlpha: 0, y: 12, duration: 0.6, ease: "power2.out" }, 1.2)
          .from(intro.querySelector("[data-intro-rule]"), { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, 1.1)
          .to(brand, { autoAlpha: 0, scale: 0.96, duration: 0.6, ease: "power2.in" }, 2.4)
          .to(intro, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, 2.9);
      }

      if (header) {
        gsap.from(header, { yPercent: -100, duration: 1, ease: "power3.out", delay: playIntro ? 3.5 : 0.1, clearProps: "transform" });

        // Slide the header away while scrolling down, bring it back on scroll up.
        let hidden = false;
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate(self) {
            const menuOpen = header.querySelector('[aria-expanded="true"]');
            const hide = self.direction === 1 && self.scroll() > 320 && !menuOpen;
            if (hide === hidden) return;
            hidden = hide;
            gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.45, ease: "power2.out", overwrite: true });
          },
        });
      }

      const cleanupFooter = footer ? animateScope(footer) : undefined;
      return () => {
        stopDrape?.();
        cleanupFooter?.();
      };
    });

    // Reduced motion (or the animation above finished): never leave the curtain up.
    mm.add("(prefers-reduced-motion: reduce)", () => html.classList.remove("intro"));
    return () => mm.revert();
  });

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-tertiary-fixed-dim to-gold"
      />
      <div
        ref={introRef}
        id="intro-curtain"
        aria-hidden="true"
        className="fixed inset-0 z-[70] hidden flex-col items-center justify-center overflow-hidden bg-primary bg-[radial-gradient(ellipse_at_center,#31483b_0%,#1b3126_55%,#0f1d16_100%)] text-surface-bright"
      >
        <SareeDrape svgRef={drapeRef} />
        <div data-intro-brand className="relative flex -translate-y-[10vh] flex-col items-center">
          <div data-intro-mark>
            <Image src="/images/avanya-mark-light.png" alt="" width={385} height={465} priority className="h-20 w-auto md:h-24" />
          </div>
          <span data-intro-word className="mt-6 font-serif text-[44px] uppercase leading-none tracking-[0.18em] md:text-[56px]">
            Avanya
          </span>
          <span data-intro-rule className="mt-4 block h-px w-40 origin-center bg-gold/70" />
          <span data-intro-sub className="mt-4 font-label-sm text-label-sm uppercase tracking-[0.3em] text-tertiary-fixed-dim">
            Textile Atelier · Est. Varanasi
          </span>
        </div>
      </div>
    </>
  );
}
