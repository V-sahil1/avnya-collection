import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileQuoteBar from "@/components/MobileQuoteBar";
import SiteAnimations from "@/components/SiteAnimations";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Avanya Textile Atelier — Where Tradition Meets the Future of Textiles",
    template: "%s | Avanya Textile Atelier",
  },
  description:
    "Premium heirloom sarees, high-twist silks and bespoke jacquards from Varanasi & Surat — crafted for fashion houses, couture ateliers and international distributors.",
};

export const viewport: Viewport = {
  themeColor: "#1b3126",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide animated elements until GSAP has set their start states (prevents a flash of
            un-animated content), and play the intro curtain once per session. Failsafes always
            reveal the page even if JS breaks. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;d.classList.add('gsap-pending');setTimeout(function(){d.classList.remove('gsap-pending')},3000);try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('avanya-intro')){sessionStorage.setItem('avanya-intro','1');d.classList.add('intro');setTimeout(function(){d.classList.remove('intro')},5000)}}catch(e){}})();",
          }}
        />
        {/* Material Symbols icon font (used by the Stitch design) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface font-body-md text-body-md text-on-surface antialiased">
        <Header />
        <main className="w-full bg-surface pt-20">{children}</main>
        <Footer />
        <MobileQuoteBar />
        <SiteAnimations />
      </body>
    </html>
  );
}
