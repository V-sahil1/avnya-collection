import Icon from "@/components/Icon";
import { CLIENTS } from "@/lib/site";

export default function ClientArchetypes() {
  return (
    <section className="w-full bg-surface py-space-xl md:py-20">
      <div className="container-editorial">
        <div className="mx-auto mb-space-xl max-w-2xl text-center">
          <span data-anim="fade" className="eyebrow">Client Ecosystem</span>
          <h2 data-anim="lines" className="mt-1 font-headline-lg text-headline-md font-normal text-primary md:text-headline-lg">
            Built for Global Scale &amp; Discerning Boutiques
          </h2>
          <p data-anim="fade" className="mt-2 font-body-md text-body-md text-on-surface-variant">
            Tailored procurement programs designed to integrate effortlessly into your inventory turnover models.
          </p>
        </div>
        <div data-anim-stagger="0.12" className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4 lg:gap-gutter-desktop">
          {CLIENTS.map((c) => (
            <div key={c.title} className="flex flex-col justify-between bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-primary/10 text-primary">
                  <Icon name={c.icon} className="text-xl" />
                </div>
                <h3 className="font-headline-sm text-lg font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{c.body}</p>
              </div>
              <div className="mt-space-md pt-space-sm font-label-sm text-xs font-bold uppercase text-secondary">{c.moq}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
