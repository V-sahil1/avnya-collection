import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] w-full items-center bg-surface pt-20">
      <div className="container-editorial py-space-xl text-center">
        <span data-anim="fade" data-delay="0" className="eyebrow">Error 404 · Thread Not Found</span>
        <h1 data-anim="lines" data-delay="0.15" className="mt-2 font-headline-lg text-headline-lg-mobile text-primary md:text-display-hero">
          This weave has <span className="italic">slipped the loom.</span>
        </h1>
        <p data-anim="fade" data-delay="0.6" className="mx-auto mt-space-md max-w-md font-body-md text-body-md text-on-surface-variant">
          The page you were looking for may have moved to our archive.
        </p>
        <div data-anim-stagger="0.12" data-delay="0.8" className="mt-space-lg flex flex-col justify-center gap-space-sm sm:flex-row">
          <Link href="/" className="bg-primary px-space-lg py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary hover:bg-primary-container">
            Return Home
          </Link>
          <Link href="/collections" className="border border-ink px-space-lg py-4 font-label-md text-label-md uppercase tracking-widest text-ink hover:bg-sand">
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
