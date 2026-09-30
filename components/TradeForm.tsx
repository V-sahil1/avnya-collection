"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Icon from "@/components/Icon";
import { CONTACT } from "@/lib/site";

const CATEGORIES = [
  ["wholesaler", "Saree Wholesaler / Distributor"],
  ["retail_boutique", "Boutique Chain / High-End Store"],
  ["fashion_label", "Fashion Designer / Couture House"],
  ["exporter", "International Importer / Trade Agent"],
  ["other", "Other Commercial Client"],
] as const;

const PRODUCTS = [
  ["pure_handloom_sarees", "Pure Handloom Silk Sarees"],
  ["jacquard_edits", "High-Speed Jacquard Sarees"],
  ["organza_chiffon", "Organza & Chiffon Weaves"],
  ["heritage_banarasi", "Heirloom Banarasi Bridal Sarees"],
  ["custom_weaving", "Custom Loom Run / OEM Design"],
  ["running_fabric", "Running Fabric Meters by Roll"],
] as const;

const VOLUMES = [
  ["sample_run", "Sample Run"],
  ["25_100", "25 - 100 Pcs"],
  ["100_500", "100 - 500 Pcs"],
  ["bulk_500", "500+ Pcs"],
] as const;

export default function TradeForm() {
  const params = useSearchParams();
  const sku = params.get("sku");
  const fabric = params.get("fabric");
  const presetNotes = sku ? `Enquiry for saree ${sku}. ` : fabric ? `Swatch & pricing request for fabric ${fabric}. ` : "";
  const presetProduct = params.get("product") ?? (fabric ? "running_fabric" : undefined);

  const [submitted, setSubmitted] = useState<{ name: string; email: string; swatch: boolean } | null>(null);

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-space-md py-space-lg" role="status" aria-live="polite">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
          <Icon name="check" className="text-2xl" />
        </span>
        <span className="eyebrow">Dossier Request Registered</span>
        <h3 className="font-headline-md text-headline-md-mobile text-primary md:text-headline-md">
          Thank you, {submitted.name.split(" ")[0]}.
        </h3>
        <p className="max-w-lg font-body-md text-body-md text-on-surface-variant">
          An Avanya Trade Concierge will dispatch the 2025–2026 Wholesale Lookbook to <strong className="text-on-surface">{submitted.email}</strong> and reach out within 2 business hours.
          {submitted.swatch && " Your Curated Swatch Box will ship within 48 hours."}
        </p>
        <div className="flex flex-col gap-space-sm pt-space-sm sm:flex-row">
          <Link href="/collections" className="bg-primary px-space-lg py-3.5 text-center font-label-md text-label-md uppercase tracking-widest text-on-primary hover:bg-primary-container">
            Browse Collections
          </Link>
          <button
            type="button"
            onClick={() => setSubmitted(null)}
            className="border border-ink px-space-lg py-3.5 font-label-md text-label-md uppercase tracking-widest text-ink transition-colors hover:bg-sand"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="space-y-space-md"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setSubmitted({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          swatch: data.get("swatch_box") === "on",
        });
      }}
    >
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        <Field label="Full Name *" name="name" placeholder="e.g. Radhika Kapoor" autoComplete="name" />
        <Field label="Company / Brand Name *" name="company" placeholder="e.g. Kapoor Atelier & Co." autoComplete="organization" />
      </div>
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        <Field label="Official Business Email *" name="email" type="email" placeholder="radhika@domain.com" autoComplete="email" />
        <Field label="Phone / WhatsApp *" name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" pattern={String.raw`[\d+ \(\)\-]{7,}`} />
      </div>
      <div className="grid grid-cols-1 gap-space-md md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="category" className="field-label">Business Category *</label>
          <select id="category" name="category" className="field" defaultValue="wholesaler">
            {CATEGORIES.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="product" className="field-label">Target Products *</label>
          <select id="product" name="product" className="field" defaultValue={presetProduct ?? "pure_handloom_sarees"}>
            {PRODUCTS.map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="space-y-1">
        <legend className="field-label mb-1">Estimated Order Volume / Timeline</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {VOLUMES.map(([v, l], i) => (
            <label key={v} className="flex cursor-pointer items-center gap-2 bg-surface-container-low p-2 text-xs transition-colors hover:bg-surface-container has-[:checked]:bg-primary-fixed/60">
              <input type="radio" name="order_vol" value={v} defaultChecked={i === 0} className="accent-primary" />
              <span>{l}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-1">
        <label htmlFor="notes" className="field-label">Custom Notes or Fabric Specifications</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={presetNotes}
          placeholder="Tell us about your seasonal edit, target price tier, or specific yarn requirements..."
          className="field"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input id="sample-box-request" name="swatch_box" type="checkbox" className="accent-primary" />
        <label htmlFor="sample-box-request" className="font-body-sm text-xs text-on-surface-variant">
          Also dispatch the physical Curated Swatch Sample Box (shipped within 48h).
        </label>
      </div>

      <div className="flex flex-col items-center gap-space-sm pt-2 sm:flex-row">
        <button
          type="submit"
          className="w-full flex-1 bg-primary px-space-lg py-4 text-center font-label-md text-label-md font-semibold uppercase tracking-widest text-on-primary shadow-md transition-colors hover:bg-primary-container sm:w-auto"
        >
          Request Comprehensive B2B Catalogue
        </button>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-4 font-label-md text-label-md font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#1EBE5D] sm:w-auto"
        >
          <Icon name="chat" className="text-[18px]" />
          <span>Instant WhatsApp</span>
        </a>
      </div>
      <p className="pt-2 text-center font-spec-num text-[11px] text-outline">
        🔒 100% Confidentiality Assured. We honor NDA agreements for all proprietary artwork &amp; fashion label collections.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  pattern,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  pattern?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="field-label">{label}</label>
      <input id={name} name={name} type={type} required placeholder={placeholder} autoComplete={autoComplete} pattern={pattern} className="field" />
    </div>
  );
}
