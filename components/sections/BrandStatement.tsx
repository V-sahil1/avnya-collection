export default function BrandStatement() {
  return (
    <section id="textile-house" className="w-full bg-surface-container-low py-space-xl md:py-28">
      <div className="mx-auto max-w-6xl px-margin md:px-margin-desktop">
        <div className="grid grid-cols-1 items-baseline gap-space-lg lg:grid-cols-12 lg:gap-gutter-desktop">
          <div data-anim="fade-left" className="flex flex-col space-y-2 lg:col-span-3">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary">The Textile House</span>
            <span className="font-spec-num text-xs text-on-surface-variant">Est. Varanasi &amp; Surat</span>
          </div>
          <div className="space-y-space-lg lg:col-span-9">
            <h2 data-anim="scrub-words" className="font-headline-lg text-headline-md font-normal leading-tight tracking-tight text-on-background md:text-headline-lg">
              “We don’t merely manufacture cloth. <br className="hidden md:inline" />
              <span className="font-normal italic text-primary">We engineer fabrics that become historical statements.</span>”
            </h2>
            <div data-anim-stagger="0.15" className="grid grid-cols-1 gap-space-lg pt-space-sm font-body-md text-body-md leading-relaxed text-on-surface-variant md:grid-cols-2">
              <p>
                At Avanya, our master weavers orchestrate thousands of warp threads through both traditional kadhua pit-looms and computer-calibrated electronic jacquards. Each millimeter of brocade, zardozi insertion, and twist coefficient is audited under rigorous industrial parameters.
              </p>
              <p>
                By unifying heritage handloom provenance with ISO-certified production cadences, we supply world-class fashion houses, luxury couture designers, and premier global wholesale buyers with consistent dye lots, flawless selvedges, and uncompromised yarn counts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
