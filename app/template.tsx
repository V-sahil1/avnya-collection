"use client";

import { useRef } from "react";
import { animateScope } from "@/lib/animations";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Next.js re-mounts a template on every navigation, so each page gets a fresh
 * transition and its own set of scroll animations (cleaned up on leave).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current, { autoAlpha: 0, y: 28, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity,visibility" });
        return animateScope(ref.current!);
      });
      // Initial states are set — reveal the page (see the inline script in layout.tsx).
      document.documentElement.classList.remove("gsap-pending");
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
