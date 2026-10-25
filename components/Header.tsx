"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { CONTACT, NAV } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Transparent over the dark hero imagery; pages without one get the solid glass bar from the start.
  const [overHero, setOverHero] = useState(true);

  // Close the drawer on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOverHero(!!document.querySelector("[data-hero]"));
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  // Stays see-through over the hero; only firms up where white text would otherwise lose contrast.
  const tone = open || !overHero ? "bg-ink/80 backdrop-blur-xl" : scrolled ? "bg-ink/30 backdrop-blur-lg" : "bg-transparent";

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-500 ${tone}`}
      >
        <div className="relative flex h-20 w-full items-center justify-between gap-space-md px-margin md:px-margin-desktop">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Avanya Textile Atelier — home">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-surface-bright">
              <Image src="/images/avanya-mark.png" alt="" width={385} height={465} priority className="h-6 w-auto" />
            </span>
            <span className="font-serif text-[24px] font-semibold leading-none text-white sm:text-[26px]">Avanya</span>
          </Link>

          <nav
            aria-label="Primary"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md xl:flex"
          >
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap rounded-full px-5 py-2 font-sans text-[15px] font-medium transition-colors ${
                    active ? "text-ink" : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-space-sm">
            <Link
              href="/request-catalogue"
              className="flex items-center whitespace-nowrap rounded-full bg-white px-5 py-2.5 font-sans text-[14px] font-semibold text-ink shadow-[0_2px_12px_rgba(0,0,0,0.15)] transition-colors hover:bg-sand sm:px-6 sm:py-3 sm:text-[15px]"
            >
              <span className="sm:hidden">Catalogue</span>
              <span className="hidden sm:inline">Request Catalogue</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20 xl:hidden"
            >
              {/* Three-line burger that folds into an X */}
              <span className={`absolute h-[1.5px] w-[18px] rounded-full bg-white transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[6px]"}`} />
              <span className={`absolute h-[1.5px] w-[18px] rounded-full bg-white transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute h-[1.5px] rounded-full bg-white transition-all duration-300 ${open ? "w-[18px] -rotate-45" : "w-[12px] translate-x-[3px] translate-y-[6px]"}`} />
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
              className="rounded-full bg-primary px-space-lg py-4 text-center font-label-md text-label-md uppercase tracking-widest text-on-primary"
            >
              Request Catalogue
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-surface-container px-space-lg py-4 font-label-md text-label-md uppercase tracking-wider text-on-surface"
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
