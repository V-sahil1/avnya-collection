"use client";

import { animate, motion, MotionConfig, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { drawFabric, loadFabric, type Fabric } from "./fabric";
import styles from "./SareeLoader.module.css";

export type SareeLoaderProps = {
  /** Brand name shown in the centre. */
  brand: string;
  /** Small line under the brand name. */
  tagline?: string;
  /**
   * Your own fabric photo or transparent PNG, laid flat and horizontal: the left edge enters
   * first from the corner, the right edge (pallu / tassels) is the free end. About 4:1 works best.
   * Leave empty to use the built-in maroon-and-gold saree artwork.
   */
  fabricImage?: string;
  /** Shortest time the loader stays up, in ms. */
  minDuration?: number;
  /** Give up waiting for the page to finish loading after this many ms. */
  maxDuration?: number;
  /** Called when the exit transition begins — start your page's entrance animations here. */
  onExitStart?: () => void;
  /** Called when the loader has fully faded out — unmount it here. */
  onFinish?: () => void;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.55, 0, 0.75, 0.2] as const;

export default function SareeLoader({
  brand,
  tagline,
  fabricImage,
  minDuration = 2800,
  maxDuration = 5000,
  onExitStart,
  onFinish,
}: SareeLoaderProps) {
  const reduce = useReducedMotion() ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Fabric | null>(null);
  const clock = useRef({ start: 0, loaded: false, leaving: false });
  const enter = useMotionValue(0);
  const leave = useMotionValue(0);
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (v) => `${Math.round(v * 100)}%`);
  const [leaving, setLeaving] = useState(false);

  // Load the fabric, then sweep it in from the bottom-right corner.
  useEffect(() => {
    let cancelled = false;
    loadFabric(fabricImage)
      .then((fabric) => {
        if (cancelled) return;
        fabricRef.current = fabric;
        animate(enter, 1, reduce ? { duration: 0.8, ease: "easeOut" } : { duration: 1.8, ease: EASE_OUT });
      })
      .catch(() => {
        /* No fabric: the brand and progress still run, and the loader still exits. */
      });
    return () => {
      cancelled = true;
    };
  }, [fabricImage, reduce, enter]);

  // Real loading progress: window load + web fonts.
  useEffect(() => {
    const state = clock.current;
    state.start = performance.now();
    const page =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    Promise.all([page, document.fonts?.ready]).then(() => {
      state.loaded = true;
    });
  }, []);

  useAnimationFrame((time, delta) => {
    const state = clock.current;
    if (!state.start) return;

    // Progress follows elapsed time but holds at 90% until the page has actually loaded.
    const elapsed = performance.now() - state.start;
    const ready = state.loaded || elapsed > maxDuration;
    const goal = Math.min(elapsed / (reduce ? Math.min(minDuration, 1500) : minDuration), ready ? 1 : 0.9);
    const p = progress.get();
    const next = p + (goal - p) * Math.min(1, delta / 120);
    progress.set(goal - next < 0.002 ? goal : next);

    if (!state.leaving && ready && progress.get() >= 1) {
      state.leaving = true;
      setLeaving(true);
      onExitStart?.();
      animate(leave, 1, { duration: reduce ? 0.6 : 1.3, ease: EASE_IN });
    }

    const canvas = canvasRef.current;
    const fabric = fabricRef.current;
    if (canvas && fabric) {
      drawFabric(canvas, fabric, { time: reduce ? 0 : time / 1000, enter: enter.get(), leave: leave.get(), still: reduce });
    }
  });

  return (
    // reducedMotion="user" drops transform animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <motion.div
        className={styles.root}
        role="status"
        aria-live="polite"
        aria-label={`Loading ${brand}`}
        initial={false}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.45, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (leaving) onFinish?.();
        }}
      >
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />

        <motion.div
          className={styles.brandBlock}
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          animate={leaving ? { opacity: 0, y: -18, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={leaving ? { duration: 0.6, ease: "easeIn" } : { duration: 1.2, delay: 0.6, ease: EASE_OUT }}
        >
          <span className={styles.ornament} aria-hidden="true" />
          <p className={styles.brand}>{brand}</p>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <div className={styles.progress} aria-hidden="true">
            <span className={styles.track}>
              <motion.span className={styles.bar} style={{ scaleX: progress }} />
            </span>
            <motion.span className={styles.percent}>{percent}</motion.span>
          </div>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
