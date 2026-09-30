import Link from "next/link";
import Icon from "@/components/Icon";
import { CONTACT } from "@/lib/site";

export default function CtaBand({
  overline = "Trade Procurement",
  title = "Initiate Your Trade Partnership",
  body = "Receive our 2025-2026 Wholesale Lookbook, current yarn price index, and tiered MOQ matrices within 2 business hours.",
}: {
  overline?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="w-full bg-forest py-space-xl text-surface-bright md:py-20">
      <div className="container-editorial flex flex-col items-start justify-between gap-space-lg lg:flex-row lg:items-end">
        <div className="max-w-2xl space-y-space-sm">
          <span data-anim="fade" className="block font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">{overline}</span>
          <h2 data-anim="lines" className="font-headline-lg text-headline-md font-normal text-white md:text-headline-lg">{title}</h2>
          <p data-anim="fade" className="font-body-md text-body-md text-outline-variant">{body}</p>
        </div>
        <div data-anim-stagger="0.12" className="flex w-full flex-col gap-space-sm sm:w-auto sm:flex-row">
          <Link
            href="/request-catalogue"
            className="bg-surface-bright px-space-lg py-4 text-center font-label-md text-label-md font-semibold uppercase tracking-widest text-on-primary-fixed transition-colors hover:bg-primary-fixed"
          >
            Request Catalogue
          </Link>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary px-space-lg py-4 font-label-md text-label-md uppercase tracking-wider text-primary-fixed transition-colors hover:bg-primary/70"
          >
            <Icon name="chat" className="text-[18px]" />
            WhatsApp Quick Connect
          </a>
        </div>
      </div>
    </section>
  );
}
