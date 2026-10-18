"use client";

import { gsap, ScrollTrigger, SplitText } from "./gsap";

/*
 * Declarative GSAP animations driven by data attributes. Motion is slow and editorial —
 * long power4/expo eases, masked line reveals and curtain-like image wipes.
 *
 *   data-anim="lines"          headline lines rise out of a mask, one after another
 *   data-anim="scrub-words"    words brighten from 15% to full opacity as you scroll through (scrubbed)
 *   data-anim="fade"           fade + rise; also "fade-left" / "fade-right" slide in from the side
 *   data-anim="reveal"         image frame wipes open bottom→top while its image settles from 1.3x zoom
 *   data-anim="reveal-side"    same, wiping left→right
 *   data-anim="scale"          panel scales up softly from 94%
 *   data-anim="rule"           hairline draws from left to right
 *   data-anim="bars"           every [data-bar] child grows from 0 width (composition bars); data-stagger="0.05"
 *   data-anim="parallax"       oversized image layer drifts against the scroll (scrubbed); data-speed="8"
 *   data-anim="hero-zoom"      hero image eases out from a close crop on load
 *   data-anim="hero-exit"      hero copy lifts and dims as the hero scrolls away (scrubbed)
 *   data-anim-stagger          children fade up one after another
 *   data-count                 number inside the text counts up ("120K+", "99.8%", "< 0.1%", "60,000")
 *   data-delay="0.4"           extra delay in seconds (hero intro sequence; shifted when the intro curtain plays)
 *
 * Tweens clear their inline transforms when done so Tailwind hover transforms keep working afterwards.
 */

const CLEAR = "transform,opacity,visibility";

// Extra delay for the on-load hero sequence while the first-visit intro curtain is lifting.
const introOffset = () => (document.documentElement.classList.contains("intro") ? 3.2 : 0);

const delayOf = (el: Element) => {
  const d = (el as HTMLElement).dataset.delay;
  return d === undefined ? 0 : (parseFloat(d) || 0) + introOffset();
};

// Fire when the element's top reaches 92% of the viewport. Elements near the very end of the page
// could never get there, so their start is capped just below the max scroll. (Elements already on
// screen get a negative start and play immediately.)
const trigger = (el: Element) => ({
  trigger: el,
  once: true,
  start: () => {
    const natural = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.92;
    return Math.min(natural, ScrollTrigger.maxScroll(window) - 1);
  },
});

const all = (root: ParentNode, sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

/** Sets up every animation inside `root`. Returns a cleanup for things GSAP contexts don't own. */
export function animateScope(root: ParentNode): () => void {
  const splits: SplitText[] = [];

  // --- Typography -------------------------------------------------------------------------------

  all(root, '[data-anim="lines"]').forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true, // re-split after webfonts load / on resize
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.25,
          ease: "power4.out",
          stagger: 0.12,
          delay: delayOf(el),
          scrollTrigger: trigger(el),
        }),
    });
    splits.push(split);
  });

  all(root, '[data-anim="scrub-words"]').forEach((el) => {
    const split = SplitText.create(el, {
      type: "words",
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          },
        ),
    });
    splits.push(split);
  });

  // --- Blocks -----------------------------------------------------------------------------------

  const slides: Record<string, gsap.TweenVars> = {
    fade: { y: 44 },
    "fade-left": { x: -56 },
    "fade-right": { x: 56 },
  };
  Object.entries(slides).forEach(([kind, vars]) => {
    all(root, `[data-anim="${kind}"]`).forEach((el) =>
      gsap.from(el, {
        ...vars,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: delayOf(el),
        clearProps: CLEAR,
        scrollTrigger: trigger(el),
      }),
    );
  });

  all(root, '[data-anim="scale"]').forEach((el) =>
    gsap.from(el, {
      scale: 0.94,
      y: 30,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: delayOf(el),
      clearProps: CLEAR,
      scrollTrigger: trigger(el),
    }),
  );

  all(root, "[data-anim-stagger]").forEach((el) =>
    gsap.from(el.children, {
      y: 56,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      stagger: parseFloat(el.dataset.animStagger || "") || 0.1,
      delay: delayOf(el),
      clearProps: CLEAR,
      scrollTrigger: trigger(el),
    }),
  );

  all(root, '[data-anim="rule"]').forEach((el) =>
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.4,
      ease: "power3.inOut",
      delay: delayOf(el),
      clearProps: CLEAR,
      scrollTrigger: trigger(el),
    }),
  );

  all(root, '[data-anim="bars"]').forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    gsap.from(el.querySelectorAll("[data-bar]"), {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.4,
      ease: "power3.inOut",
      stagger: parseFloat(el.dataset.stagger || "") || 0.15,
      delay: delayOf(el),
      clearProps: "transform",
      scrollTrigger: trigger(el),
    });
  });

  // --- Imagery ----------------------------------------------------------------------------------

  const wipes: Record<string, string> = {
    reveal: "inset(100% 0% 0% 0%)",
    "reveal-side": "inset(0% 100% 0% 0%)",
  };
  Object.entries(wipes).forEach(([kind, from]) => {
    all(root, `[data-anim="${kind}"]`).forEach((el) => {
      const img = el.querySelector("img");
      gsap.set(el, { autoAlpha: 1 });
      const tl = gsap.timeline({ delay: delayOf(el), scrollTrigger: trigger(el) });
      tl.fromTo(
        el,
        { clipPath: from },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", clearProps: "clipPath" },
      );
      if (img) tl.from(img, { scale: 1.3, duration: 2, ease: "expo.out", clearProps: "transform" }, 0.15);
    });
  });

  all(root, '[data-anim="hero-zoom"]').forEach((el) =>
    gsap.from(el, { scale: 1.35, autoAlpha: 0, duration: 2.8, ease: "expo.out", delay: delayOf(el) }),
  );

  all(root, '[data-anim="parallax"]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed || "") || 8;
    gsap.fromTo(
      el,
      { yPercent: -speed },
      {
        yPercent: speed,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  all(root, '[data-anim="hero-exit"]').forEach((el) =>
    gsap.to(el, {
      y: -90,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: { trigger: el.closest("section") ?? el, start: "top top", end: "bottom top", scrub: true },
    }),
  );

  // --- Numbers ----------------------------------------------------------------------------------

  all(root, "[data-count]").forEach((el) => {
    // Keep the original text so a re-run (React strict mode, route change) starts from the real value.
    const original = (el.dataset.countOriginal ??= el.textContent ?? "");
    const match = original.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const grouped = num.includes(",");
    const format = (v: number) => {
      const s = v.toFixed(decimals);
      return grouped ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s;
    };
    const counter = { v: 0 };
    el.textContent = `${prefix}${format(0)}${suffix}`;
    gsap.to(counter, {
      v: target,
      duration: 2,
      ease: "power2.out",
      delay: delayOf(el),
      scrollTrigger: trigger(el),
      onUpdate: () => {
        el.textContent = `${prefix}${format(counter.v)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = original;
      },
    });
  });

  return () => {
    splits.forEach((s) => s.revert());
    all(root, "[data-count-original]").forEach((el) => {
      el.textContent = el.dataset.countOriginal ?? el.textContent;
    });
  };
}
