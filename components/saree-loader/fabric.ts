/**
 * Fabric for the saree loader: the flat artwork (or your own product image) and the
 * canvas renderer that makes it wave like a pallu in the wind.
 *
 * The fabric is drawn as many thin vertical slices. Each slice is shifted, skewed to the local
 * slope of a travelling wave and squeezed where the cloth "twists", then shaded by that slope —
 * which is what gives the silk its folds and moving sheen.
 */

export type Fabric = { image: HTMLCanvasElement; width: number; height: number };

export type FabricFrame = {
  time: number; // seconds
  enter: number; // 0 → 1 while the pallu sweeps in from the bottom-right corner
  leave: number; // 0 → 1 while it flies out past the top-left corner
  still: boolean; // reduced motion: no waving, fade instead of travel
};

// --- Default artwork --------------------------------------------------------------------------
// Laid flat and horizontal: x = 0 is the end attached at the corner, the right-hand end is the
// pallu with its tassels. Bottle-green silk (the site palette), gold zari temple borders, gold butis.

const ART_W = 1600;
const ART_H = 420;

function defaultFabricSvg() {
  const tassels = Array.from({ length: 43 }, (_, i) => {
    const y = 20 + i * 9;
    return `<path d="M1560 ${y}q18 2 32 ${(i % 3) - 1}" stroke="#d9ad5b" stroke-width="2.2" fill="none"/><circle cx="1593" cy="${y + (i % 3) - 1}" r="2.6" fill="#f4d78f"/>`;
  }).join("");

  const flower = (x: number, y: number) =>
    `<g transform="translate(${x} ${y})" fill="#e6be6a"><circle cy="-4.5" r="3"/><circle cx="4.5" r="3"/><circle cy="4.5" r="3"/><circle cx="-4.5" r="3"/><circle r="2" fill="#fff3d6"/></g>`;

  const paisley =
    '<path d="M0-24C18-24 26-4 18 12 12 24-4 28-14 20-24 12-20-4-8-4-2-4 2-8 0-14-2-18-4-22 0-24Z" fill="#e6be6a" stroke="#f8e2a8" stroke-width="1"/><circle cx="-5" cy="8" r="4.5" fill="#1b3126"/><circle cx="-5" cy="8" r="1.6" fill="#f8e2a8"/>';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ART_W}" height="${ART_H}" viewBox="0 0 ${ART_W} ${ART_H}">
<defs>
  <linearGradient id="silk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22392c"/><stop offset=".5" stop-color="#5a7a66"/><stop offset="1" stop-color="#22392c"/></linearGradient>
  <linearGradient id="pallu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#132219"/><stop offset=".5" stop-color="#31483b"/><stop offset="1" stop-color="#132219"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7741f"/><stop offset=".45" stop-color="#f4d78f"/><stop offset=".6" stop-color="#e3b960"/><stop offset="1" stop-color="#a7741f"/></linearGradient>
  <linearGradient id="goldV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a7741f"/><stop offset=".45" stop-color="#f4d78f"/><stop offset="1" stop-color="#a7741f"/></linearGradient>
  <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="#000" stroke-opacity=".09"/></pattern>
  <pattern id="buti" width="84" height="70" patternUnits="userSpaceOnUse">${flower(21, 18)}${flower(63, 53)}<circle cx="63" cy="18" r="1.4" fill="#f6e3b4"/><circle cx="21" cy="53" r="1.4" fill="#f6e3b4"/></pattern>
  <pattern id="temple" width="32" height="44" patternUnits="userSpaceOnUse"><path d="M2 44L16 16 30 44" fill="none" stroke="#1b3126" stroke-width="2"/><path d="M16 3l5 6-5 6-5-6z" fill="#1b3126"/></pattern>
  <pattern id="teeth" width="24" height="14" patternUnits="userSpaceOnUse"><path d="M0 0L12 14 24 0Z" fill="#d9ad5b"/></pattern>
  <pattern id="mango" width="92" height="80" patternUnits="userSpaceOnUse"><g transform="translate(23 40)">${paisley}</g><g transform="translate(69 0)">${paisley}</g><g transform="translate(69 80)">${paisley}</g></pattern>
  <g id="border"><rect width="1560" height="72" fill="url(#gold)"/><rect y="8" width="1560" height="3" fill="#1b3126"/><rect y="14" width="1560" height="44" fill="url(#temple)"/><rect y="61" width="1560" height="3" fill="#1b3126"/><rect y="72" width="1560" height="14" fill="url(#teeth)"/></g>
</defs>
<rect width="1560" height="${ART_H}" fill="url(#silk)"/>
<rect y="86" width="1170" height="248" fill="url(#buti)" opacity=".85"/>
<rect x="1170" width="390" height="${ART_H}" fill="url(#pallu)"/>
<rect x="1170" width="30" height="${ART_H}" fill="url(#goldV)"/>
<rect x="1206" width="8" height="${ART_H}" fill="url(#goldV)"/>
<rect x="1236" y="90" width="270" height="240" fill="url(#mango)"/>
<rect x="1522" width="8" height="${ART_H}" fill="url(#goldV)"/>
<rect x="1536" width="24" height="${ART_H}" fill="url(#goldV)"/>
<rect width="1560" height="${ART_H}" fill="url(#weave)"/>
<use href="#border"/>
<use href="#border" transform="translate(0 ${ART_H}) scale(1 -1)"/>
${tassels}
</svg>`;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Bake the source into a canvas once, so every frame just copies pixels.
function rasterize(img: HTMLImageElement): Fabric {
  const w = img.naturalWidth || ART_W;
  const h = img.naturalHeight || ART_H;
  const scale = Math.min(1.5, 2400 / w);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { image: canvas, width: canvas.width, height: canvas.height };
}

/** Loads your fabric image (falls back to the built-in saree artwork if it is missing or fails). */
export async function loadFabric(src?: string): Promise<Fabric> {
  if (src) {
    try {
      return rasterize(await loadImage(src));
    } catch {
      /* fall through to the default artwork */
    }
  }
  return rasterize(await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(defaultFabricSvg())}`));
}

// --- Renderer ---------------------------------------------------------------------------------

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function drawFabric(canvas: HTMLCanvasElement, fabric: Fabric, f: FabricFrame) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  const ctx = canvas.getContext("2d");
  if (!ctx || !w || !h) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (f.enter <= 0 || f.leave >= 1) return;

  // Local frame: origin just outside the bottom-right corner, +x pointing at the top-left corner.
  const diag = Math.hypot(w, h);
  const L = diag * 0.92; // on-screen length of the cloth
  const W = clamp(Math.min(w, h) * 0.44, 150, 460); // on-screen width of the cloth
  const travel = f.still ? 0 : -(1 - f.enter) * (L + 120) + f.leave * (diag + 160);
  ctx.globalAlpha = f.still ? f.enter * (1 - f.leave) : 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.translate(w, h);
  ctx.rotate(Math.atan2(-h, -w));
  ctx.translate(travel - 60, 0);
  const base = ctx.getTransform();

  // Wind: waves travel from the corner to the free end, growing toward it; the cloth also
  // narrows rhythmically as if twisting edge-on.
  const t = f.time;
  const amp0 = W * (f.still ? 0.18 : 0.42);
  const k = (Math.PI * 2) / (L * 0.5);
  const omega = 2.1;
  const centre = (u: number) => {
    const a = amp0 * (0.08 + 0.92 * (u / L) ** 1.4);
    return a * Math.sin(k * u - omega * t) + a * 0.3 * Math.sin(2.3 * k * u - 1.7 * omega * t + 1.3);
  };
  const twist = (u: number) => 1 - 0.24 * (u / L) * (0.5 + 0.5 * Math.sin(0.6 * k * u - 0.8 * omega * t + 0.5));
  const sheenAt = f.still ? 0.55 : ((t * 0.18) % 1.6) - 0.3; // a soft highlight gliding along the silk

  const step = 8; // slice width in px: smaller = smoother folds
  const srcPerPx = fabric.width / L;
  let c0 = centre(0);
  let s0 = twist(0);

  for (let u0 = 0; u0 < L; u0 += step) {
    const u1 = Math.min(L, u0 + step);
    const c1 = centre(u1);
    const s1 = twist(u1);
    const slope = (c1 - c0) / (u1 - u0);
    const squeeze = (s0 + s1) / 2;

    ctx.setTransform(base);
    ctx.transform(1, slope, 0, squeeze, 0, c0 - slope * u0);

    // Slightly overlap neighbouring slices so no seams show.
    const sx = u0 * srcPerPx;
    const sw = Math.min((u1 - u0 + 0.8) * srcPerPx, fabric.width - sx);
    ctx.drawImage(fabric.image, sx, 0, sw, fabric.height, u0, -W / 2, sw / srcPerPx, W);

    // Folds: faces tilted away from the light darken, faces toward it catch the sheen.
    const n = (u0 + u1) / 2 / L;
    const shadow = clamp(Math.max(0, slope) * 0.5 + (1 - squeeze) * 1.3, 0, 0.5);
    const light = clamp(Math.max(0, -slope) * 0.32 + 0.22 * Math.exp(-((n - sheenAt) ** 2) / 0.003), 0, 0.3);
    ctx.globalCompositeOperation = "source-atop";
    if (shadow > 0.01) {
      ctx.fillStyle = `rgba(4,14,9,${shadow})`;
      ctx.fillRect(u0, -W / 2, u1 - u0, W);
    }
    if (light > 0.01) {
      ctx.fillStyle = `rgba(255,236,200,${light})`;
      ctx.fillRect(u0, -W / 2, u1 - u0, W);
    }
    ctx.globalCompositeOperation = "source-over";

    c0 = c1;
    s0 = s1;
  }
}
