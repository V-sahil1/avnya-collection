"use client";

import Image from "next/image";
import { useRef } from "react";
import { animateScope } from "@/lib/animations";
import { gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Persistent, layout-level motion: first-visit intro curtain, header entrance + hide-on-scroll,
 * a gold "thread" scroll-progress bar, and footer reveals.
 */
export default function SiteAnimations() {
  const barRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const html = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const header = document.querySelector<HTMLElement>("header");
      const footer = document.querySelector("footer");
      const intro = introRef.current;
      const playIntro = html.classList.contains("intro") && intro;

      gsap.to(barRef.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      // Intro curtain: shield mark draws in, wordmark letters rise, then the curtain lifts.
      if (playIntro) {
        const word = intro.querySelector("[data-intro-word]")!;
        const split = SplitText.create(word, { type: "chars", mask: "chars" });
        gsap
          .timeline({ onComplete: () => { html.classList.remove("intro"); split.revert(); } })
          .from(intro.querySelector("[data-intro-mark]"), { scale: 0.6, autoAlpha: 0, rotation: -8, duration: 0.9, ease: "expo.out" })
          .from(split.chars, { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.05 }, 0.25)
          .from(intro.querySelector("[data-intro-sub]"), { autoAlpha: 0, y: 12, duration: 0.6, ease: "power2.out" }, 0.7)
          .from(intro.querySelector("[data-intro-rule]"), { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, 0.6)
          .to(intro, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, 1.5);
      }

      if (header) {
        gsap.from(header, { yPercent: -100, duration: 1, ease: "power3.out", delay: playIntro ? 2.2 : 0.1, clearProps: "transform" });

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

      return footer ? animateScope(footer) : undefined;
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
        className="fixed inset-0 z-[70] hidden flex-col items-center justify-center bg-primary text-surface-bright"
      >
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
    </>
  );
}
