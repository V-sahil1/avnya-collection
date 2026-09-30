"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { CONTACT, NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 w-full bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="flex h-20 w-full items-center justify-between gap-space-md px-margin md:px-margin-desktop">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Avanya Textile Atelier — home">
            <Image src="/images/avanya-mark.png" alt="" width={385} height={465} priority className="h-9 w-auto" />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary">Avanya</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Textile Atelier</span>
            </div>
          </Link>
  
          <nav className="hidden items-center gap-space-md xl:flex 2xl:gap-space-lg" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`link-underline whitespace-nowrap py-1 font-label-md text-label-md uppercase transition-colors hover:text-primary ${
                  isActive(item.href) ? "font-bold text-primary" : "text-on-surface-variant"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
  
          <div className="flex items-center gap-space-sm md:gap-space-md">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-space-xs whitespace-nowrap bg-surface-container px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider text-on-surface transition-colors hover:bg-surface-container-high lg:flex xl:hidden 2xl:flex"
            >
              <Icon name="chat" className="text-[16px] text-primary" />
              <span>WhatsApp Enquiry</span>
            </a>
            <Link
              href="/request-catalogue"
              className="hidden items-center whitespace-nowrap bg-primary px-space-lg py-space-sm font-label-md text-label-md uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-container sm:flex"
            >
              Request Catalogue
            </Link>
            <Link
              href="/request-catalogue#trade-form"
              aria-label="Trade account"
              className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary transition-colors hover:bg-primary-container md:flex"
            >
              <Icon name="person" className="text-[18px] text-on-primary" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center text-primary transition-colors hover:bg-surface-container xl:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="text-[26px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer — rendered outside <header>: its backdrop-filter would otherwise
          become the containing block for this fixed element and collapse it to zero height. */}
      <div
        id="mobile-nav"
        className={`fixed inset-x-0 bottom-0 top-20 z-[45] overflow-y-auto bg-surface transition-[opacity,visibility] duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col px-margin py-space-lg md:px-margin-desktop" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-baseline justify-between border-b border-sand/60 py-4 transition-colors ${
                isActive(item.href) ? "text-secondary" : "text-primary hover:text-secondary"
              }`}
            >
              <span className="font-serif text-headline-md-mobile">{item.label}</span>
              <span className="font-spec-num text-spec-num text-outline">0{i + 1}</span>
            </Link>
          ))}
          <div className="mt-space-xl flex flex-col gap-space-sm">
            <Link
              href="/request-catalogue"
              className="bg-primary px-space-lg py-4 text-center font-label-md text-label-md uppercase tracking-widest text-on-primary"
            >
              Request Catalogue
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-surface-container px-space-lg py-4 font-label-md text-label-md uppercase tracking-wider text-on-surface"
            >
              <Icon name="chat" className="text-[18px] text-primary" />
              WhatsApp Enquiry
            </a>
          </div>
          <p className="mt-space-xl font-label-sm text-label-sm uppercase tracking-widest text-olive">
            Loom Atelier: Varanasi • Chanderi • Kanchipuram
          </p>
        </nav>
      </div>
    </>
  );
}
