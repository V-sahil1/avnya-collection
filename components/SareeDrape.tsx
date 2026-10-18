"use client";

import { gsap } from "@/lib/gsap";

/**
 * A silk saree that flows across the intro curtain: two ribbons of "fabric" whose edges are
 * live sine waves, redrawn every frame. GSAP tweens each ribbon's head/tail (how much of the
 * cloth is on screen) and wave amplitude; the ticker turns that state into SVG paths.
 */

// Bands across the ribbon's width, as fractions from its top edge (0) to bottom edge (1).
type Band = { f0: number; f1: number; fill: string; opacity?: number };

const FRONT_BANDS: Band[] = [
  { f0: 0, f1: 1, fill: "url(#saree-silk)" },
  { f0: 0.05, f1: 0.76, fill: "url(#saree-buti)", opacity: 0.55 },
  { f0: 0.3, f1: 0.42, fill: "#ffffff", opacity: 0.09 }, // silk sheen
  { f0: 0.56, f1: 0.68, fill: "#000000", opacity: 0.14 }, // fold shadow
  { f0: 0, f1: 0.035, fill: "url(#saree-zari)" }, // selvedge
  { f0: 0.78, f1: 0.95, fill: "url(#saree-zari)" }, // zari border
  { f0: 0.78, f1: 0.95, fill: "url(#saree-zari-motif)", opacity: 0.7 },
  { f0: 0.805, f1: 0.812, fill: "#5a430e", opacity: 0.7 },
  { f0: 0.918, f1: 0.925, fill: "#5a430e", opacity: 0.7 },
];

const BACK_BANDS: Band[] = [
  { f0: 0, f1: 1, fill: "url(#saree-sage)" },
  { f0: 0.4, f1: 0.55, fill: "#ffffff", opacity: 0.07 },
  { f0: 0, f1: 0.05, fill: "url(#saree-zari)", opacity: 0.8 },
  { f0: 0.88, f1: 0.95, fill: "url(#saree-zari)", opacity: 0.8 },
];

// viewBox is 1600×900 (sliced to cover); ribbons travel across this x range.
const X_START = -250;
const X_END = 1850;
const STEP = 16;

type Ribbon = {
  cy: number; // centre line at x = 800
  tilt: number; // rise per px (negative = climbs to the right)
  width: number;
  amp: number; // wave amplitude multiplier (tweened)
  phase: number;
  head: number; // leading edge x (tweened)
  tail: number; // trailing edge x (tweened)
  bands: Band[];
  paths: SVGPathElement[];
};

function edgeY(r: Ribbon, x: number, f: number, t: number) {
  // Fabric flutters more near its free ends.
  const flutter = 1 + 0.9 * Math.exp(-(r.head - x) / 220) + 0.9 * Math.exp(-(x - r.tail) / 220);
  const a = 52 * r.amp * flutter;
  const centre =
    r.cy +
    (x - 800) * r.tilt +
    a * Math.sin(x * 0.0042 - t * 1.7 + r.phase) +
    a * 0.35 * Math.sin(x * 0.011 - t * 2.3 + r.phase * 1.7);
  // Width breathes along the length, so the cloth looks like it twists.
  const w = r.width * (1 + 0.16 * Math.sin(x * 0.003 - t * 1.1 + 2 + r.phase));
  return centre - w / 2 + f * w;
}

function draw(r: Ribbon, t: number) {
  const tail = Math.max(r.tail, X_START);
  const head = Math.min(r.head, X_END);
  const xs: number[] = [];
  if (head > tail) {
    for (let x = tail; x < head; x += STEP) xs.push(x);
    xs.push(head);
  }
  r.bands.forEach((b, i) => {
    if (!xs.length) return r.paths[i].setAttribute("d", "");
    const top = xs.map((x) => `${x.toFixed(1)},${edgeY(r, x, b.f0, t).toFixed(1)}`);
    const bottom = xs.map((x) => `${x.toFixed(1)},${edgeY(r, x, b.f1, t).toFixed(1)}`).reverse();
    r.paths[i].setAttribute("d", `M${top.join("L")}L${bottom.join("L")}Z`);
  });
}

/**
 * Builds the drape timeline: the saree flows in from the left, settles into a slow wave,
 * then slides out to the right starting at `exitAt` seconds.
 */
export function playSareeDrape(svg: SVGSVGElement, exitAt: number) {
  const make = (sel: string, bands: Band[], o: Omit<Ribbon, "bands" | "paths" | "head" | "tail">): Ribbon => ({
    ...o,
    bands,
    head: X_START,
    tail: X_START,
    paths: Array.from(svg.querySelectorAll<SVGPathElement>(`${sel} path`)),
  });
  const back = make("[data-ribbon='back']", BACK_BANDS, { cy: 560, tilt: -0.1, width: 150, amp: 1.2, phase: 2.1 });
  const front = make("[data-ribbon='front']", FRONT_BANDS, { cy: 700, tilt: -0.15, width: 230, amp: 1.4, phase: 0 });

  const render = () => {
    const t = gsap.ticker.time;
    draw(back, t);
    draw(front, t);
  };
  gsap.ticker.add(render);
  const stop = () => gsap.ticker.remove(render);

  const timeline = gsap
    .timeline({ onComplete: stop })
    .to(back, { head: X_END + 400, duration: 1.7, ease: "power2.out" }, 0.1)
    .to(front, { head: X_END + 400, duration: 1.5, ease: "power2.out" }, 0)
    .to([front, back], { amp: 0.75, duration: 1.4, ease: "sine.inOut" }, 0.6)
    .to([front, back], { amp: 1.5, duration: 1, ease: "sine.in" }, exitAt)
    .to(back, { tail: X_END + 400, duration: 1.1, ease: "power2.in" }, exitAt)
    .to(front, { tail: X_END + 400, duration: 1.1, ease: "power2.in" }, exitAt + 0.1);

  return { timeline, stop };
}

export default function SareeDrape({ svgRef }: { svgRef: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="saree-silk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a3a26" />
          <stop offset="0.45" stopColor="#a65d45" />
          <stop offset="1" stopColor="#5e2215" />
        </linearGradient>
        <linearGradient id="saree-sage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c6456" />
          <stop offset="1" stopColor="#31483b" />
        </linearGradient>
        <linearGradient id="saree-zari" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#b5965a" />
          <stop offset="0.35" stopColor="#ffdea3" />
          <stop offset="0.6" stopColor="#e4c282" />
          <stop offset="1" stopColor="#b5965a" />
        </linearGradient>
        {/* Small gold butis scattered over the body */}
        <pattern id="saree-buti" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <path d="M14 8l4 6-4 6-4-6z" fill="#e4c282" />
          <circle cx="42" cy="38" r="2.2" fill="#e4c282" />
        </pattern>
        {/* Woven diamond motif running along the zari border */}
        <pattern id="saree-zari-motif" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M14 4l8 10-8 10-8-10z" fill="none" stroke="#5a430e" strokeWidth="1.4" />
        </pattern>
      </defs>
      <g data-ribbon="back" opacity="0.55">
        {BACK_BANDS.map((b, i) => (
          <path key={i} fill={b.fill} opacity={b.opacity} />
        ))}
      </g>
      <g data-ribbon="front" style={{ filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.35))" }}>
        {FRONT_BANDS.map((b, i) => (
          <path key={i} fill={b.fill} opacity={b.opacity} />
        ))}
      </g>
    </svg>
  );
}
