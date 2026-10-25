import Image from "next/image";
import Link from "next/link";

type Props = {
  overline: string;
  title: React.ReactNode;
  intro?: string;
  image?: string;
  imagePosition?: string;
  crumb: string;
  meta?: string[];
};

/** Editorial page header for inner pages — same lighting treatment as the homepage hero, at a shorter height. */
export default function PageHero({ overline, title, intro, image, imagePosition = "center", crumb, meta }: Props) {
  return (
    <section data-hero className="relative w-full overflow-hidden bg-primary text-surface-bright">
      {image && (
        <div className="absolute inset-0">
          <div data-anim="parallax" data-speed="7" className="absolute inset-x-0 -top-[10%] h-[120%]">
            <Image src={image} alt="" fill priority sizes="100vw" data-anim="hero-zoom" data-delay="0" style={{ objectPosition: imagePosition }} className="object-cover opacity-45" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        </div>
      )}
      <div data-anim="hero-exit" className="container-editorial relative z-10 pb-16 pt-36 md:pb-24 md:pt-44">
        <nav aria-label="Breadcrumb" data-anim="fade" data-delay="0.1" className="mb-space-lg font-label-sm text-label-sm uppercase tracking-widest text-outline-variant">
          <Link href="/" className="hover:text-surface-bright">Home</Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-tertiary-fixed-dim">{crumb}</span>
        </nav>
        <div className="max-w-3xl space-y-space-md">
          <span data-anim="fade" data-delay="0.2" className="block font-label-sm text-label-sm uppercase tracking-widest text-shimmer">{overline}</span>
          <h1 data-anim="lines" data-delay="0.3" className="font-headline-lg text-[40px] font-normal leading-[1.08] tracking-tight md:text-[64px]">{title}</h1>
          {intro && <p data-anim="fade" data-delay="0.75" className="max-w-2xl font-body-lg text-body-lg font-light leading-relaxed text-outline-variant">{intro}</p>}
        </div>
        {meta && (
          <div data-anim="fade" data-delay="1" className="mt-space-xl flex flex-col gap-2 font-spec-num text-xs uppercase tracking-wider text-outline-variant sm:flex-row sm:flex-wrap sm:gap-space-lg">
            {meta.map((m, i) => (
              <span key={m} className="flex items-center gap-space-lg">
                {i > 0 && <span className="hidden opacity-40 sm:inline">•</span>}
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
