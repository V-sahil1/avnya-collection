import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import CtaBand from "@/components/CtaBand";
import { ARTICLES } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const index = ARTICLES.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const a = ARTICLES[index];
  const next = ARTICLES[(index + 1) % ARTICLES.length];

  return (
    <>
      <article className="w-full bg-surface pb-space-xl md:pb-20">
        <header className="mx-auto max-w-3xl px-margin pt-36 text-center md:px-margin-desktop md:pt-44">
          <Link href="/journal" data-anim="fade" data-delay="0" className="inline-flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-widest text-olive hover:text-primary">
            <Icon name="arrow_back" className="text-sm" /> Journal
          </Link>
          <span data-anim="fade" data-delay="0.15" className="mt-space-lg block eyebrow">{a.category}</span>
          <h1 data-anim="lines" data-delay="0.25" className="mt-2 font-headline-lg text-[36px] font-normal leading-[1.1] text-primary md:text-headline-lg">{a.title}</h1>
          <p data-anim="fade" data-delay="0.7" className="mt-space-md font-spec-num text-xs uppercase tracking-wider text-olive">{a.date} · {a.readTime}</p>
        </header>
        <div className="container-editorial mt-space-xl">
          <div data-anim="reveal" data-delay="0.6" className="relative aspect-[16/9] overflow-hidden">
            <Image src={a.image} alt="" fill priority sizes="100vw" style={{ objectPosition: a.imagePosition }} className="object-cover" />
          </div>
        </div>
        <div className="mx-auto mt-space-xl max-w-2xl space-y-space-lg px-margin md:px-margin-desktop">
          <p data-anim="lines" className="font-serif text-headline-md-mobile italic text-primary md:text-headline-md">{a.excerpt}</p>
          {a.body.map((p, i) => (
            <p key={i} data-anim="fade" className="font-body-lg text-body-lg text-on-surface-variant">{p}</p>
          ))}
        </div>
        <div data-anim="fade" className="mx-auto mt-space-xl max-w-2xl border-t border-sand px-margin pt-space-lg md:px-margin-desktop">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-olive">Next Article</span>
          <Link href={`/journal/${next.slug}`} className="group mt-1 flex items-center justify-between gap-space-md">
            <span className="font-headline-sm text-headline-sm text-primary transition-colors group-hover:text-secondary">{next.title}</span>
            <Icon name="arrow_forward" className="text-primary" />
          </Link>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
