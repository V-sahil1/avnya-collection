"use client";

import { useRef } from "react";
import { animateScope } from "@/lib/animations";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Persistent, layout-level motion: header entrance + hide-on-scroll,
 * a gold "thread" scroll-progress bar, and footer reveals.
 * (The first-visit loader lives in IntroLoader.)
 */
export default function SiteAnimations() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const html = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const header = document.querySelector<HTMLElement>("header");
      const footer = document.querySelector("footer");

      gsap.to(barRef.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      if (header) {
        // While the loader is up GSAP is paused, so this plays as the loader fades out.
        const delay = html.classList.contains("intro") ? 0.55 : 0.1;
        gsap.from(header, { yPercent: -100, duration: 1, ease: "power3.out", delay, clearProps: "transform" });

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

    return () => mm.revert();
  });

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-tertiary-fixed-dim to-gold"
    />
  );
}
