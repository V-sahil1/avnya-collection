import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CONTACT, FOOTER_LEGAL, LEGAL } from "@/lib/site";

export default function LegalPage({ slug }: { slug: keyof typeof LEGAL }) {
  const doc = LEGAL[slug];
  return (
    <>
      <PageHero crumb={doc.title} overline={doc.overline} title={doc.title} meta={[doc.updated]} />
      <section className="w-full bg-surface py-space-xl md:py-20">
        <div className="container-editorial grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:gap-gutter-desktop">
          <aside className="lg:col-span-3">
            <nav data-anim="fade-left" className="flex flex-row flex-wrap gap-x-space-lg gap-y-2 lg:sticky lg:top-28 lg:flex-col" aria-label="Policies">
              {FOOTER_LEGAL.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`font-label-md text-label-md uppercase tracking-wider ${l.href === `/${slug}` ? "text-primary underline underline-offset-4" : "text-olive hover:text-primary"}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
          <div data-anim-stagger="0.1" className="max-w-2xl divide-y divide-sand border-y border-sand lg:col-span-9">
            {doc.sections.map((s, i) => (
              <div key={s.heading} className="grid grid-cols-1 gap-2 py-space-lg sm:grid-cols-12 sm:gap-space-md">
                <span className="font-spec-num text-xs font-bold text-secondary sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="sm:col-span-11">
                  <h2 className="font-headline-sm text-headline-sm text-primary">{s.heading}</h2>
                  <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{s.body}</p>
                </div>
              </div>
            ))}
            <p className="py-space-lg font-body-sm text-body-sm text-olive">
              Questions? Write to <a href={`mailto:${CONTACT.procurement}`} className="text-primary underline underline-offset-4">{CONTACT.procurement}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
