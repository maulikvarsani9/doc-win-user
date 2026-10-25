import Link from "next/link";
import { ArrowRight, BadgeCheck, Globe2, ShieldCheck, Stethoscope } from "lucide-react";
import { ArrowLink, Container, Eyebrow } from "@/components/ui-kit";
import { IconTile } from "@/components/icons";
import { serviceBySlug } from "@/content/services";
import type { ServicePage } from "@/content/types";
import { LegalNote } from "../shared";
import { QuoteRow } from "@/components/proof/CompactQuote";
import type { Testimonial } from "@/content/home";
import { CategoryPhoto } from "./ServiceHero";

const whyIcons = [Stethoscope, BadgeCheck, Globe2];

export function ServiceContext({ page, photo }: { page: ServicePage; photo: { src: string; alt: string } }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="service-context">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Healthcare context</Eyebrow>
          <h2 className="display-2 mt-5">{page.contextTitle}</h2>
          <div className="mt-8 hidden sm:block"><CategoryPhoto src={photo.src} alt={photo.alt} /></div>
        </div>
        <div className="space-y-3 sm:space-y-4 lg:col-span-7 lg:pt-2">
          {page.context.map((c, i) => (
            <article key={c.title} className="flex gap-4 rounded-[1.25rem] border border-ink-900/[0.08] p-5 sm:gap-5 sm:rounded-[1.5rem] sm:p-8" data-testid={`service-context-${i}`}>
              <IconTile icon={ShieldCheck} size="sm" />
              <div>
                <h3 className="text-[1.1rem] font-medium leading-snug sm:text-[1.2rem]">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-ink-600 sm:text-[15.5px]">{c.body}</p>
              </div>
            </article>
          ))}
          <div className="pt-2"><LegalNote /></div>
        </div>
      </Container>
    </section>
  );
}

export function ServiceWhy({ page, quotes }: { page: ServicePage; quotes: Testimonial[] }) {
  return (
    <section className="bg-brand-50 py-16 sm:py-24 lg:py-28" data-testid="service-why">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="display-2 lg:col-span-8">Why Healthcare Organizations Choose DocWin for {page.short}</h2>
          <div className="lg:col-span-4 lg:justify-self-end"><ArrowLink href="/about/team/" testId="service-why-team-link">Meet our doctor panel</ArrowLink></div>
        </div>
        <ul className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {page.why.map((w, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <li key={w.title} className="rounded-[1.25rem] bg-white p-6 sm:rounded-[1.75rem] sm:p-8" data-testid={`service-why-${i}`}>
                <IconTile icon={Icon} />
                <h3 className="mt-5 text-[1.15rem] font-medium leading-snug">{w.title}</h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-ink-600">{w.body}</p>
              </li>
            );
          })}
        </ul>
        <QuoteRow items={quotes} className="mt-10 sm:mt-14" testId="service-quotes" />
      </Container>
    </section>
  );
}

export function ServiceRelated({ page }: { page: ServicePage }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="service-related">
      <Container>
        <h2 className="display-3 max-w-2xl">Services That Work Well With {page.short}</h2>
        <ul className="mt-8 grid gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {page.pairings.map(([slug, reason]) => {
            const s = serviceBySlug(slug)!;
            return (
              <li key={slug}>
                <Link href={`/services/${slug}/`} className="group flex h-full flex-col rounded-[1.25rem] bg-paper p-6 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,25,44,0.35)] sm:rounded-[1.5rem] sm:p-7" data-testid={`related-service-${slug}`}>
                  <span className="text-[1.1rem] font-medium leading-snug text-ink-900">{s.name}</span>
                  <span className="mt-2.5 block flex-1 text-[14.5px] leading-[1.6] text-ink-600">{reason}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700">{s.linkLabel} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
