// Content ported from the Stitch export (avanya_atelier_modern_indian_textile_saree_manufacturing/code.html).
// Inner-page data extends the same voice and specs so every nav link resolves to a real page.

export const IMG = {
  hero: "/images/hero-silk-saree.jpg",
  handloom: "/images/handloom-sage-saree.jpg",
  mill: "/images/jacquard-mill.jpg",
  macro: "/images/zari-macro.jpg",
  organza: "/images/organza.jpg",
  georgette: "/images/georgette.jpg",
  zari: "/images/zari-banarasi.jpg",
} as const;

export const CONTACT = {
  phone: "+91 (0) 542 228 9012",
  phoneHref: "tel:+915422289012",
  procurement: "procurement@avanyatextiles.com",
  concierge: "concierge@avanyatextiles.com",
  hours: "Mon – Sat, 09:00 – 19:30 IST",
  whatsapp:
    "https://wa.me/915422289012?text=" +
    encodeURIComponent("Hello Avanya Atelier, I would like to enquire about wholesale sarees and fabrics."),
};

export const NAV = [
  { label: "Collections", href: "/collections" },
  { label: "Sarees", href: "/sarees" },
  { label: "Fabric Library", href: "/fabric-library" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

export const FOOTER_ARCHITECTURE = [
  { label: "Archival Collections", href: "/collections" },
  { label: "Heirloom Sarees", href: "/sarees" },
  { label: "Fabric Swatch Library", href: "/fabric-library" },
  { label: "Loom Infrastructure", href: "/manufacturing" },
  { label: "The Atelier Story", href: "/about" },
  { label: "Editorial & Journal", href: "/journal" },
];

export const FOOTER_TRADE = [
  { label: "Request Catalogue", href: "/request-catalogue" },
  { label: "Request Sample Swatches", href: "/request-catalogue#swatch-box" },
  { label: "Custom Looms & Dye Lots", href: "/manufacturing#bespoke" },
  { label: "MOQ & Trade Enquiries", href: "/request-catalogue#trade-form" },
  { label: "Export Compliance & Testing", href: "/manufacturing#compliance" },
];

export const FOOTER_LEGAL = [
  { label: "Privacy Statement", href: "/privacy-policy" },
  { label: "Terms of Trade", href: "/terms-of-trade" },
  { label: "Sustainability Charter", href: "/sustainability-charter" },
];

export const METRICS = [
  { label: "Saree Collections", value: "18+", unit: "Annual Edits", note: "Bespoke Couture & Prêt Runs" },
  { label: "Fabric Variations", value: "340+", unit: "In-Stock Weaves", note: "Silks, Organzas, Georgettes" },
  { label: "Monthly Loom Output", value: "120K+", unit: "Meters", note: "High-speed jacquard capacity" },
  { label: "Global Market Reach", value: "28+", unit: "Countries", note: "Direct DDP & CIF export logistics" },
  { label: "Weaving Precision", value: "99.8%", unit: "First-Pass Yield", note: "Laser defect scanning systems" },
];

export type Collection = {
  slug: string;
  tag: string;
  tagStyle: "ink" | "primary" | "light" | "blush";
  title: string;
  gsm: string;
  body: string;
  metaLeft: string;
  metaRight: string;
  image: string;
  imagePosition?: string;
  leadTime?: string;
};

export const FEATURED_COLLECTIONS: Collection[] = [
  {
    slug: "pure-katan-handloom",
    tag: "Master Handloom",
    tagStyle: "ink",
    title: "Pure Katan & Mulberry Handloom Silks",
    gsm: "110-140 GSM",
    body: "Authentic warp-density Varanasi weaves with hand-guided reed shuttles. Featuring matte antique zari work, certified mulberry yarn, and bespoke temple-motif borders.",
    metaLeft: "Warp: 20/22 Denier Mulberry",
    metaRight: "Inquire Batch",
    image: IMG.handloom,
    imagePosition: "center 30%",
    leadTime: "Lead Time: 18-24 Days",
  },
  {
    slug: "industrial-jacquard",
    tag: "High-Speed Jacquard",
    tagStyle: "primary",
    title: "Industrial Jacquard Brocades",
    gsm: "95 GSM",
    body: "Mill-scale repeat precision engineered for international export volumes. Micro-tension control prevents weft distortion across continuous 500-meter batch runs.",
    metaLeft: "Colorways: 14 Pantone Dyelots",
    metaRight: "Download Specs",
    image: IMG.hero,
    imagePosition: "center",
  },
];

export const SECONDARY_COLLECTIONS: Collection[] = [
  {
    slug: "organza-chiffon",
    tag: "Couture Sheer",
    tagStyle: "light",
    title: "Featherweight Organza & Chiffon",
    gsm: "42 GSM",
    body: "42 GSM crystalline finish with laser-registered dye dispersion and scalloped metallic borders.",
    metaLeft: "MOQ: 50 Sarees",
    metaRight: "Ready Dye Queue",
    image: IMG.organza,
  },
  {
    slug: "georgette-crepe",
    tag: "Fluid Weave",
    tagStyle: "light",
    title: "High-Twist Georgette & Crepe",
    gsm: "68 GSM",
    body: "S & Z hard-twist yarn construction offering wrinkle resistance and weighty kinetic fall for modern drapery.",
    metaLeft: "MOQ: 100 Meters",
    metaRight: "Custom Pantone Match",
    image: IMG.georgette,
  },
  {
    slug: "heritage-zari-banarasi",
    tag: "Bridal Archival",
    tagStyle: "blush",
    title: "Heritage Zari & Kadhua Banarasi",
    gsm: "150 GSM",
    body: "Pure silver and gold electroplated zari threads meticulously interwoven into heirloom bridal edits.",
    metaLeft: "Lead: 30-45 Days",
    metaRight: "Archival Certified",
    image: IMG.zari,
  },
];

export const JOURNEY = [
  { n: "01", title: "Yarn Selection", body: "Grading Mulberry, Tussar, and zari threads for staple length and strength." },
  { n: "02", title: "Loom Warp Set", body: "High-speed computerized punch cards setup with tension monitors." },
  { n: "03", title: "Eco-Dyeing", body: "Closed-loop water treatment, heavy-metal free pigments with color fastness testing." },
  { n: "04", title: "Zari Insertion", body: "Kadhua or electronic rapier inlay of fine precious-metal brocade wefts." },
  { n: "05", title: "Steam Calendering", body: "Thermal rolling and natural softening to seal the silk hand-feel." },
  { n: "06", title: "Light Table QA", body: "Human & sensor 100% meter-by-meter illumination for pull flaws." },
  { n: "07", title: "Export Packing", body: "Moisture-barrier vacuum packaging ready for worldwide air courier freight." },
];

export const BESPOKE_STAGES = [
  { n: "01", title: "Design Spec Brief", body: "Submit high-res motif artwork, target Pantone codes, and weight specs." },
  { n: "02", title: "Strike-off Sample", body: "We weave a 1-meter physical sample swatch delivered within 72 hours." },
  { n: "03", title: "Buyer Calibration", body: "Review drape, feel, and dye accuracy with our textile engineering team." },
  { n: "04", title: "Loom Production", body: "Scheduled allocation of looms for seamless, uniform bulk run execution." },
  { n: "05", title: "Quality Sign-off", body: "Full 4-point inspection audit report and certificates of origin generated." },
  { n: "06", title: "Global Freight", body: "Air or ocean container dispatch with customs clearance support." },
];

export const CLIENTS = [
  {
    icon: "warehouse",
    title: "Saree Wholesalers & Mega Distributors",
    body: "High-volume capacity with dependable monthly supply schedules, consolidated logistics, and aggressive tiered wholesale pricing.",
    moq: "MOQ: 250+ Sarees / Tier 1 Terms",
  },
  {
    icon: "storefront",
    title: "Boutique Chains & Retail Salons",
    body: "Curated capsule edits delivered on hanger-ready packaging with custom branding tags and small-batch exclusivity clauses.",
    moq: "MOQ: 25 Sarees / Capsule",
  },
  {
    icon: "styler",
    title: "Global Fashion & Couture Houses",
    body: "Ultra-luxurious custom run fabrics, runway lengths, proprietary dye formulas, and dedicated artisan master weavers.",
    moq: "MOQ: Flexible Runway Custom",
  },
  {
    icon: "flight_takeoff",
    title: "Overseas Importers & Diaspora Chains",
    body: "Full international compliance (US, UK, GCC, EU, Singapore), harmonized tariff documentation, and seamless door-to-door freight.",
    moq: "Full CIF / DDP Air & Sea",
  },
];

export type Saree = {
  sku: string;
  name: string;
  weave: string;
  category: "Handloom" | "Jacquard" | "Sheer" | "Bridal" | "Fluid";
  image: string;
  imagePosition?: string;
  warp: string;
  weft: string;
  gsm: string;
  length: string;
  moq: string;
  status: "Active Loom" | "Dye Queue" | "Archival";
};

export const SAREES: Saree[] = [
  { sku: "AV-KT-1102", name: "Sage Pleat Katan", weave: "Kora Silk", category: "Handloom", image: IMG.handloom, imagePosition: "center 25%", warp: "20/22 Den Mulberry", weft: "Katan Twist", gsm: "118", length: "6.3 m", moq: "25 pcs", status: "Active Loom" },
  { sku: "AV-JQ-2210", name: "Ivory Bottle-Green Brocade", weave: "Jacquard Zari", category: "Jacquard", image: IMG.hero, imagePosition: "22% center", warp: "2/120s Ne Silk", weft: "Tested Zari", gsm: "95", length: "6.2 m", moq: "50 pcs", status: "Active Loom" },
  { sku: "AV-OR-3041", name: "Blush Foil Organza", weave: "Organza", category: "Sheer", image: IMG.organza, warp: "20 Den Organzine", weft: "Tram Silk", gsm: "42", length: "5.5 m", moq: "50 pcs", status: "Dye Queue" },
  { sku: "AV-BN-4007", name: "Vermilion Kadhua Banarasi", weave: "Kadhua", category: "Bridal", image: IMG.zari, warp: "Mulberry 3-ply", weft: "Gold Zari 0.08mm", gsm: "150", length: "6.5 m", moq: "10 pcs", status: "Archival" },
  { sku: "AV-GC-5120", name: "Forest Hard-Twist Georgette", weave: "Georgette", category: "Fluid", image: IMG.georgette, warp: "S/Z 2800 TPM", weft: "Viscose Crepe", gsm: "68", length: "5.5 m", moq: "100 m", status: "Dye Queue" },
  { sku: "AV-TS-1180", name: "Raw Tussar Gold Weft", weave: "Tussar Zari", category: "Handloom", image: IMG.macro, warp: "Tussar Ghicha", weft: "Antique Zari", gsm: "105", length: "6.3 m", moq: "25 pcs", status: "Archival" },
  { sku: "AV-JQ-2244", name: "Portrait Border Jacquard", weave: "Jacquard", category: "Jacquard", image: IMG.hero, imagePosition: "82% center", warp: "2/120s Ne Silk", weft: "Metallic Lurex", gsm: "98", length: "6.2 m", moq: "50 pcs", status: "Active Loom" },
  { sku: "AV-KT-1150", name: "Courtyard Striped Kora", weave: "Kora Silk", category: "Handloom", image: IMG.handloom, imagePosition: "center 70%", warp: "20/22 Den Mulberry", weft: "Kora Silk", gsm: "112", length: "6.3 m", moq: "25 pcs", status: "Active Loom" },
];

export type Fabric = {
  code: string;
  name: string;
  family: "Silk" | "Organza" | "Georgette" | "Tussar" | "Brocade";
  composition: { silk: number; zari: number; other: number };
  count: string;
  gsm: number;
  width: string;
  leadDays: string;
  status: "Active Loom" | "Dye Queue" | "Archival";
};

export const FABRICS: Fabric[] = [
  { code: "FL-101", name: "Pure Katan Silk", family: "Silk", composition: { silk: 100, zari: 0, other: 0 }, count: "20/22 Den", gsm: 110, width: '48"', leadDays: "18–24", status: "Active Loom" },
  { code: "FL-114", name: "Katan Zari Brocade", family: "Brocade", composition: { silk: 70, zari: 30, other: 0 }, count: "20/22 Den", gsm: 140, width: '46"', leadDays: "24–30", status: "Active Loom" },
  { code: "FL-122", name: "Mulberry Satin Weave", family: "Silk", composition: { silk: 100, zari: 0, other: 0 }, count: "2/120s Ne", gsm: 92, width: '44"', leadDays: "14–18", status: "Active Loom" },
  { code: "FL-208", name: "Crystal Silk Organza", family: "Organza", composition: { silk: 100, zari: 0, other: 0 }, count: "20 Den", gsm: 42, width: '44"', leadDays: "10–14", status: "Dye Queue" },
  { code: "FL-215", name: "Foil Scallop Organza", family: "Organza", composition: { silk: 85, zari: 15, other: 0 }, count: "20 Den", gsm: 48, width: '44"', leadDays: "14–18", status: "Dye Queue" },
  { code: "FL-301", name: "Hard-Twist Georgette", family: "Georgette", composition: { silk: 60, zari: 0, other: 40 }, count: "2800 TPM", gsm: 68, width: '44"', leadDays: "12–16", status: "Active Loom" },
  { code: "FL-318", name: "Viscose Moss Crepe", family: "Georgette", composition: { silk: 0, zari: 0, other: 100 }, count: "120 Den", gsm: 85, width: '58"', leadDays: "8–12", status: "Active Loom" },
  { code: "FL-402", name: "Raw Tussar Ghicha", family: "Tussar", composition: { silk: 100, zari: 0, other: 0 }, count: "Ghicha 40s", gsm: 105, width: '46"', leadDays: "20–28", status: "Archival" },
  { code: "FL-410", name: "Tussar Antique Zari", family: "Tussar", composition: { silk: 75, zari: 25, other: 0 }, count: "Ghicha 40s", gsm: 118, width: '46"', leadDays: "28–35", status: "Archival" },
  { code: "FL-507", name: "Kadhua Gold Brocade", family: "Brocade", composition: { silk: 55, zari: 45, other: 0 }, count: "3-ply Mulberry", gsm: 150, width: '46"', leadDays: "30–45", status: "Archival" },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imagePosition?: string;
  body: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "the-grammar-of-kadhua",
    category: "Loom Notes",
    title: "The Grammar of Kadhua: Why Independent Shuttles Still Matter",
    excerpt: "Inside the pit-loom technique that leaves no floating threads on the reverse face — and why couture houses still ask for it by name.",
    date: "14 Sep 2026",
    readTime: "7 min read",
    image: IMG.zari,
    body: [
      "Kadhua is not a pattern, it is a discipline. Every motif is woven with its own small shuttle, passed by hand between warp threads, so that the reverse face of the saree is as considered as the front. There are no long floats to snag, and nothing to cut away.",
      "On a single bridal border our master weavers may manage forty independent shuttles at once. The result is slower — a heritage Banarasi can occupy one loom for over a month — but the structure is permanent in a way no cut-work jacquard can imitate.",
      "We keep kadhua pit-looms running alongside our electronic jacquard arrays not out of nostalgia, but because the two answer different briefs. When a label wants an heirloom that will be re-draped for fifty years, the grammar of kadhua is still the right language.",
    ],
  },
  {
    slug: "reading-a-yarn-count",
    category: "Procurement Guide",
    title: "Reading a Yarn Count: A Buyer's Primer on Denier, Ne and GSM",
    excerpt: "What 20/22 denier mulberry actually means for drape, and how to read our spec sheets before you commit to a dye lot.",
    date: "02 Sep 2026",
    readTime: "5 min read",
    image: IMG.macro,
    body: [
      "Denier describes the mass of a filament: 20/22 denier mulberry is a fine, even yarn that produces the soft, dense hand of a classic Katan. Ne (English cotton count) runs the other way — a higher number is a finer yarn — which is why our jacquard grounds are specified at 2/120s Ne.",
      "GSM, grams per square metre, is the number most buyers reach for first. It is a good shorthand for weight, but it tells you little about fall. A 68 GSM hard-twist georgette will drape heavier than a 92 GSM satin because of its twist coefficient.",
      "Every Avanya spec sheet lists warp count, weft count, picks per inch, GSM and drape coefficient together. Read them as a set, and request a strike-off whenever a new colourway matters.",
    ],
  },
  {
    slug: "closed-loop-dyehouse",
    category: "Sustainability",
    title: "Inside Our Closed-Loop Dyehouse",
    excerpt: "Azo-free pigments, recovered process water and colour-fastness testing on every lot: the numbers behind our dyeing floor.",
    date: "21 Aug 2026",
    readTime: "6 min read",
    image: IMG.mill,
    body: [
      "Our dyehouse recovers and treats process water on site, returning it to the dye baths rather than discharging it. Pigments are azo-free and heavy-metal free, and every lot is tested for wash, rub and light fastness before it reaches the loom.",
      "Consistency is the commercial argument for all of this. A controlled dye floor is what lets us promise matching dye lots across repeat orders placed months apart.",
    ],
  },
  {
    slug: "sage-season-edit",
    category: "Collection Notes",
    title: "The Sage Season: Notes on Volume III",
    excerpt: "Muted greens, pleated kora and antique zari borders — how our archival curation for the coming season came together.",
    date: "08 Aug 2026",
    readTime: "4 min read",
    image: IMG.handloom,
    imagePosition: "center 25%",
    body: [
      "Volume III began with a single swatch of pleated kora in an iron-mordanted sage. From there the edit grew into eighteen colourways anchored by antique zari borders and temple motifs drawn from our Varanasi archive.",
      "Each saree in the edit is available in capsule runs from 25 units per colourway, with strike-offs dispatched within 72 hours of a confirmed brief.",
    ],
  },
];

export const LEGAL: Record<string, { title: string; overline: string; updated: string; sections: { heading: string; body: string }[] }> = {
  "privacy-policy": {
    title: "Privacy Statement",
    overline: "Governance",
    updated: "Updated 01 Sep 2026",
    sections: [
      { heading: "What we collect", body: "When you request a catalogue, swatch box or trade quotation we collect your name, company, business email, phone or WhatsApp number, and the order details you share with us." },
      { heading: "How we use it", body: "We use this information only to prepare quotations, dispatch catalogues and samples, and manage your trade account. We do not sell or rent your data." },
      { heading: "Proprietary artwork", body: "Design briefs and artwork submitted for custom loom runs are held under NDA, stored on restricted systems, and never shared with other clients." },
      { heading: "Your choices", body: `You may request access to, correction of, or deletion of your data at any time by writing to ${CONTACT.procurement}.` },
    ],
  },
  "terms-of-trade": {
    title: "Terms of Trade",
    overline: "Commercial",
    updated: "Updated 01 Sep 2026",
    sections: [
      { heading: "Minimum order quantities", body: "MOQs are stated per colourway on each specification sheet. Capsule edits start from 25 sarees; running fabric starts from 100 metres." },
      { heading: "Quotations & pricing", body: "Quotations are valid for 30 days and are subject to the prevailing yarn and zari price index at the time of order confirmation." },
      { heading: "Samples & strike-offs", body: "Strike-off samples are woven within 72 hours of an approved brief. Bulk production begins only after written buyer calibration sign-off." },
      { heading: "Shipping", body: "We ship EXW, CIF or DDP by air or ocean freight. Title and risk pass according to the agreed Incoterm." },
      { heading: "Quality claims", body: "Every consignment ships with a 4-point inspection report. Claims must be raised within 14 days of receipt with lot references." },
    ],
  },
  "sustainability-charter": {
    title: "Sustainability Charter",
    overline: "Responsibility",
    updated: "Updated 01 Sep 2026",
    sections: [
      { heading: "Materials", body: "We source Silk Mark certified mulberry and tussar, and use OEKO-TEX® tested dyes and auxiliaries throughout our range." },
      { heading: "Water", body: "Our dyehouse operates a closed-loop water system with on-site treatment, and all pigments are azo-free and heavy-metal free." },
      { heading: "People", body: "Our weavers are salaried, trained on both pit-looms and electronic jacquards, and work in humidity-controlled, well-lit halls." },
      { heading: "Waste", body: "Selvedge offcuts and yarn ends are collected and redirected to artisan collectives for accessories and quilting." },
    ],
  },
};
