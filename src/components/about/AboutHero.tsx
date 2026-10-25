import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { Breadcrumbs, type Crumb } from "@/components/hubs/Breadcrumbs";
import type { Person } from "@/content/team";
import { aboutHero } from "@/content/about";
import { cn } from "@/lib/utils";

function FounderPortrait({ f, i }: { f: Person; i: number }) {
  return (
    <figure className={cn("relative self-start", i === 1 && "mt-14 sm:mt-20")} data-testid={`about-hero-founder-${f.slug}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#F4E4D8] sm:rounded-[1.75rem]">
        <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill priority sizes="(min-width: 1024px) 280px, 46vw" className="object-cover object-[50%_14%]" />
      </div>
      <figcaption className="absolute -bottom-4 left-2.5 right-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_18px_40px_-18px_rgba(11,25,44,0.45)] sm:left-4 sm:right-auto sm:px-4 sm:py-3">
        <span className="block text-[13px] font-semibold leading-tight text-ink-900 sm:text-[14.5px]">{f.name}</span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-500 sm:text-[12.5px]">{i === 0 ? "Co-Founder, MD (Medicine)" : "Co-Founder, Marketing"}</span>
      </figcaption>
    </figure>
  );
}

export function AboutHero({ crumbs, founders }: { crumbs: Crumb[]; founders: Person[] }) {
  return (
    <section className="overflow-hidden bg-white" data-testid="about-hero">
      <Container className="pb-16 pt-6 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid items-center gap-12 sm:mt-12 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-7 lg:pr-4">
            <Eyebrow>{aboutHero.eyebrow}</Eyebrow>
            <h1 className="display-1 mt-6" data-testid="about-heading">{aboutHero.title}</h1>
            <p className="lead mt-6 max-w-2xl sm:mt-7">{aboutHero.lead}</p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("dark", "lg")} testId="about-cta-strategy">Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
              <Link href="/about/team/" className={btn("outline", "lg")} data-testid="about-cta-team">Meet the Team</Link>
            </div>
          </div>
          <div className="reveal reveal-2 relative lg:col-span-5">
            <span aria-hidden className="absolute -right-24 -top-10 size-72 rounded-full bg-brand-50 sm:size-96" />
            <div className="relative grid grid-cols-2 gap-3 pb-6 sm:gap-5">
              {founders.slice(0, 2).map((f, i) => <FounderPortrait key={f.slug} f={f} i={i} />)}
            </div>
            <p className="relative mt-6 flex items-center gap-2 text-[13px] text-ink-500" data-testid="about-hero-friends">
              <span className="size-1.5 rounded-full bg-signal-500" /> Founded by a physician and a healthcare marketer
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
