import Image from "next/image";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { Breadcrumbs, type Crumb } from "@/components/hubs/Breadcrumbs";
import { CtaLink } from "@/components/leads/CtaLink";
import type { Audience, AudienceGroup, AudiencePage } from "@/content/types";
import { HeroChip, ReviewedBy } from "../shared";
import { StatBand } from "@/components/proof/StatBand";
import { LogoStrip } from "@/components/proof/LogoStrip";
import { CompactQuote } from "@/components/proof/CompactQuote";
import type { Testimonial } from "@/content/home";

export function AudienceHero({ audience, page, group, icon, image, crumbs, stats, logos }: { audience: Audience; page: AudiencePage; group: AudienceGroup; icon: LucideIcon; image: string; crumbs: Crumb[]; stats: { id: string; value: string; label: string }[]; logos: string[] }) {
  return (
    <section className="bg-white" data-testid="audience-hero">
      <Container className="pb-14 pt-6 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid gap-10 sm:mt-12 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="reveal lg:col-span-6">
            <HeroChip href={`/who-we-serve/#${group.id}`} icon={icon} label={group.name} testId="audience-hero-group" />
            <h1 className="display-1 mt-6 sm:mt-7 lg:text-[3.3rem] xl:text-[3.75rem]" data-testid="audience-hero-heading">{page.h1}</h1>
            <p className="lead mt-5 sm:mt-7">{page.intro}</p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("dark", "lg")} testId="audience-hero-cta-strategy">Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
              <CtaLink kind="audit" className={btn("outline", "lg")} testId="audience-hero-cta-audit">Get a Free Marketing Audit</CtaLink>
            </div>
            <StatBand stats={stats} className="mt-8 max-w-xl sm:mt-10" testId="audience-hero-stats" />
            <LogoStrip first={logos} className="mt-6 max-w-xl" testId="audience-logo-strip" />
            <ReviewedBy className="mt-6 sm:mt-7" />
          </div>
          <div className="reveal reveal-2 lg:col-span-6">
            <div className="relative sm:pb-10 lg:pb-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink-100 sm:rounded-[2.25rem]">
                <Image src={image} alt={`Healthcare marketing for ${audience.name.toLowerCase()}`} fill priority sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
              </div>
              <div className="relative mx-3 -mt-12 rounded-2xl bg-white p-5 shadow-[0_24px_50px_-20px_rgba(11,25,44,0.45)] ring-1 ring-ink-900/[0.06] sm:absolute sm:bottom-0 sm:left-[-1.5rem] sm:mx-0 sm:mt-0 sm:w-[310px] lg:bottom-[-2rem]" data-testid="audience-hero-priorities">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">Common priorities</p>
                <ol className="mt-3 space-y-2.5">
                  {page.priorities.slice(0, 3).map((p, i) => (
                    <li key={p.title} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-800">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-[11px] font-semibold text-brand-700">{i + 1}</span>{p.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function AudienceUnderstanding({ audience, page, quote }: { audience: Audience; page: AudiencePage; quote?: Testimonial }) {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-28" data-testid="audience-understanding">
      <Container className="grid gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
        <div className="lg:col-span-5">
          <Eyebrow>Understanding {audience.shortName.toLowerCase()} marketing</Eyebrow>
          <h2 className="display-2 mt-5">{page.understandingTitle}</h2>
        </div>
        {quote && <CompactQuote t={quote} testId="audience-understanding-quote" className="order-last self-start lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-2" />}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:pt-2">
          <p className="font-display text-[1.2rem] leading-[1.5] tracking-[-0.005em] text-ink-900 sm:text-[1.45rem]">{page.understandingLead}</p>
          {page.understanding.map((p, i) => <p key={i} className="mt-5 text-[16px] leading-[1.7] text-ink-600 sm:text-[17px]">{p}</p>)}
        </div>
      </Container>
    </section>
  );
}
