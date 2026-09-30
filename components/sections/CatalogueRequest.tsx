import { Suspense } from "react";
import Icon from "@/components/Icon";
import TradeForm from "@/components/TradeForm";
import { CONTACT } from "@/lib/site";

export default function CatalogueRequest() {
  return (
    <section id="catalogue-request" className="w-full bg-surface-container-low py-space-xl md:py-20">
      <div className="container-editorial">
        <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
          <div className="space-y-space-md lg:col-span-5">
            <span data-anim="fade" className="eyebrow">Trade Procurement</span>
            <h2 data-anim="lines" className="font-headline-lg text-headline-md font-normal leading-tight text-primary md:text-headline-lg">Initiate Your Trade Partnership</h2>
            <p data-anim="fade" className="font-body-md text-body-md font-light text-on-surface-variant">
              Receive our comprehensive 2025-2026 Wholesale Lookbook, current yarn price index, and tiered MOQ matrices within 2 business hours.
            </p>

            <div id="swatch-box" data-anim="fade" className="mt-space-lg scroll-mt-28 space-y-3 bg-surface-container-lowest p-space-md shadow-sm">
              <div className="flex items-center gap-3">
                <Icon name="inventory_2" className="text-2xl text-secondary" />
                <div>
                  <h4 className="font-headline-sm text-base font-semibold text-primary">Request Curated Swatch Box</h4>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Shipped Worldwide in 48 Hours</span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Includes 30+ physical fabric cuttings (8x8 inches): Pure Katan, Organza, Tussar, Viscose Georgettes, and real gold/silver Zari headers.
              </p>
              <p className="font-spec-num text-xs text-on-surface">Complimentary for registered wholesale buyers &amp; fashion labels.</p>
            </div>

            <div data-anim-stagger="0.1" className="space-y-2 pt-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-primary">
                <Icon name="phone_in_talk" className="text-base text-primary" />
                <span>Direct Mill Desk: <strong>{CONTACT.phone}</strong></span>
              </a>
              <a href={`mailto:${CONTACT.procurement}`} className="flex items-center gap-2 break-all hover:text-primary">
                <Icon name="mail" className="text-base text-primary" />
                <span>Commercial Head: <strong>{CONTACT.procurement}</strong></span>
              </a>
              <div className="flex items-center gap-2">
                <Icon name="schedule" className="text-base text-primary" />
                <span>Desk Hours: {CONTACT.hours}</span>
              </div>
            </div>
          </div>

          <div id="trade-form" data-anim="scale" className="scroll-mt-28 bg-surface-container-lowest p-space-lg shadow-lg md:p-space-xl lg:col-span-7">
            <Suspense fallback={<div className="min-h-[520px]" />}>
              <TradeForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
