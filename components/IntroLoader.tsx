"use client";

import { useLayoutEffect, useState } from "react";
import SareeLoader from "@/components/saree-loader/SareeLoader";
import { gsap } from "@/lib/gsap";

/**
 * Site wiring for the saree loader. Shows it on every full page load (the inline script in
 * layout.tsx adds `html.intro`), and holds every GSAP page animation until the loader starts to leave,
 * so the hero plays in as the loader fades out however long loading takes.
 */
export default function IntroLoader() {
  const [active, setActive] = useState(true);

  useLayoutEffect(() => {
    if (!document.documentElement.classList.contains("intro")) {
      setActive(false);
      return;
    }
    gsap.globalTimeline.pause();
    return () => {
      gsap.globalTimeline.resume();
    };
  }, []);

  if (!active) return null;

  return (
    <div id="intro-loader">
      <SareeLoader
        brand="Avanya"
        tagline="Textile Atelier · Est. Varanasi"
        // fabricImage="/images/your-saree-pallu.png"
        onExitStart={() => gsap.globalTimeline.resume()}
        onFinish={() => {
          document.documentElement.classList.remove("intro");
          setActive(false);
        }}
      />
    </div>
  );
}
