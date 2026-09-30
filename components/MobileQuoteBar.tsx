import Link from "next/link";
import Icon from "@/components/Icon";
import { CONTACT } from "@/lib/site";

// DESIGN.md: "sticky bottom utility bar for wholesale quotes and swatch requests" on mobile.
export default function MobileQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] border-t border-ink/10 bg-surface/95 backdrop-blur-md sm:hidden">
      <Link
        href="/request-catalogue"
        className="flex items-center justify-center gap-2 bg-primary py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary"
      >
        <Icon name="description" className="text-[18px]" />
        Request Catalogue
      </Link>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp enquiry"
        className="flex items-center justify-center gap-2 bg-[#25D366] px-5 font-label-md text-label-md uppercase tracking-wider text-white"
      >
        <Icon name="chat" className="text-[18px]" />
        WhatsApp
      </a>
    </div>
  );
}
