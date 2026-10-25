import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, ArrowLink, JsonLd } from "@/components/ui-kit";
import { PageHero } from "@/components/hubs/PageHero";
import { DirectoryCard } from "@/components/hubs/DirectoryCard";
import { FaqList } from "@/components/hubs/FaqList";
import { FinalCta } from "@/components/home/FinalCta";
import { serviceCategories, services, servicesIn } from "@/content/services";
import { servicesHub as hub } from "@/content/hubs";
import { faqSchema, itemListSchema, pageMetadata } from "@/lib/seo";
import type { Service, ServiceCategory } from "@/content/types";
import { IconTile, categoryIcons, serviceIcons } from "@/components/icons";
import { StatBand } from "@/components/proof/StatBand";
import { QuoteRow } from "@/components/proof/CompactQuote";
import { MiniAuditBox } from "@/components/proof/MiniAuditBox";
import { hubQuotes, hubStats, quotes, statList } from "@/content/proof";

export const metadata = pageMetadata({ title: hub.seo.title, description: hub.seo.description, path: "/services/", image: { url: "/images/og/hub-services.jpg", width: 1200, height: 630 } });

const flagFor = (s: Service) => (s.status === "hold-proof" ? "On hold: proof needed" : undefined);

function CategoryBlock({ cat }: { cat: ServiceCategory }) {
  const list = servicesIn(cat.id);
  if (cat.quiet)
    return (
      <section id={cat.id} className="grid gap-8 rounded-[2rem] bg-paper p-6 sm:p-10 lg:grid-cols-12" data-testid={`category-${cat.id}`}>
        <div className="lg:col-span-4">
          <IconTile icon={categoryIcons[cat.id]} />
          <h3 className="mt-5 font-display text-2xl font-normal tracking-[-0.018em]">{cat.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{cat.blurb}</p>
        </div>
        <ul className="divide-y divide-ink-900/[0.08] lg:col-span-8">
          {list.map((s) => (
            <li key={s.slug} className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <h4 className="font-display text-lg font-medium">{s.name}</h4>
                <p className="mt-1 text-[15px] text-ink-600">{s.description}</p>
              </div>
              <Link href={`/services/${s.slug}/`} className="inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-brand-700 hover:underline" data-testid={`service-card-${s.slug}-link`}>
                {s.linkLabel} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  return (
    <section id={cat.id} className="grid scroll-mt-24 gap-6 border-t border-ink-900/[0.08] pt-10 sm:gap-8 sm:pt-14 lg:grid-cols-12" data-testid={`category-${cat.id}`}>
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-4">
            <IconTile icon={categoryIcons[cat.id]} />
            <span className="font-display text-[13px] font-semibold tabular-nums text-ink-500">{list.length} {list.length === 1 ? "service" : "services"}</span>
          </div>
          <h3 className="display-3 mt-4 sm:mt-6">{cat.name}</h3>
          <p className="mt-2 max-w-sm text-[15.5px] leading-relaxed text-ink-600 sm:mt-3 sm:text-[16px]">{cat.blurb}</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:col-span-8">
        {list.map((s) => (
          <DirectoryCard key={s.slug} href={`/services/${s.slug}/`} name={s.name} description={s.description} benefit={s.benefit} linkLabel={s.linkLabel} flag={flagFor(s)} icon={serviceIcons[s.slug]} testId={`service-card-${s.slug}`} />
        ))}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }];
  return (
    <>
      <JsonLd data={itemListSchema("Healthcare marketing services", services.map((s) => ({ name: s.name, path: `/services/${s.slug}/` })))} />
      <JsonLd data={faqSchema(hub.faqs)} />
      <PageHero eyebrow="Our services" title={hub.h1} intro={hub.intro} crumbs={crumbs} jumpTitle={`${services.length} services in ${serviceCategories.length} groups`} jump={serviceCategories.map((c) => ({ id: c.id, label: c.name, count: servicesIn(c.id).length }))} testId="services-hero" image={{ src: "/images/hubs/services.jpg", alt: "Marketing team planning healthcare campaigns together around laptops" }}>
        <StatBand stats={statList(hubStats.services)} className="mt-8 max-w-xl sm:mt-10" testId="services-hero-stats" />
      </PageHero>

      <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="directory-heading" data-testid="services-directory">
        <Container>
          <div className="max-w-3xl">
            <h2 id="directory-heading" className="display-2">Find the Service You Need</h2>
            <p className="lead mt-5">Services are grouped by what they help you achieve. Each one links to a page explaining what&apos;s included, how we approach it and who it&apos;s best suited to.</p>
          </div>
          <div className="mt-10 space-y-12 sm:mt-16 sm:space-y-16">
            {serviceCategories.map((c) => <CategoryBlock key={c.id} cat={c} />)}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24 lg:pb-28" data-testid="services-proof">
        <Container><QuoteRow items={quotes(hubQuotes.services)} testId="services-quotes" /></Container>
      </section>

      <section className="px-3 sm:px-5" data-testid="services-together">
        <div className="panel-grid mx-auto max-w-[1440px] rounded-[1.75rem] sm:rounded-[2.75rem] bg-ink-900 text-white">
          <Container className="grid gap-10 py-14 sm:gap-14 sm:py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-5">
              <Eyebrow tone="light">Working together</Eyebrow>
              <h2 className="display-2 mt-6 text-white">How Our Services Work Together</h2>
              <p className="mt-5 text-[1.05rem] font-medium leading-relaxed text-white sm:mt-6 sm:text-lg">{hub.together.lead}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-300">{hub.together.body}</p>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-300">{hub.together.close}</p>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal-400">Illustrative starting points</p>
              <ul className="mt-5 space-y-4">
                {hub.together.paths.map((p, i) => (
                  <li key={p.goal} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 transition-colors sm:rounded-[1.5rem] sm:p-6 duration-300 hover:bg-white/[0.07]" data-testid={`pathway-${i}`}>
                    <p className="font-display text-lg font-medium text-white">{p.goal}</p>
                    <ol className="mt-4 flex flex-wrap items-center gap-2">
                      {p.steps.map((s, j) => (
                        <li key={s} className="flex items-center gap-2">
                          {j > 0 && <ArrowRight aria-hidden className="size-4 text-ink-400" />}
                          <span className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-ink-100 ring-1 ring-white/10">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32" data-testid="services-expertise">
        <Container className="grid items-center gap-10 sm:gap-14 lg:grid-cols-12">
          <div className="on-scroll relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:rounded-[2.25rem] bg-ink-100 lg:col-span-6">
            <Image src="/images/doctor-senior.jpg" alt="Physician in conversation with a patient at his desk" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6">
            <h2 className="display-2">Why Healthcare Needs a Different Kind of Marketing Partner</h2>
            {hub.expertise.map((p, i) => (
              <p key={i} className={i === 2 ? "mt-5 text-sm leading-relaxed text-ink-500" : "mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-[17px]"}>{p}</p>
            ))}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/about/team/" testId="expertise-team-link">Meet our medical review panel</ArrowLink>
              <ArrowLink href="/who-we-serve/" testId="expertise-audiences-link">See who we serve</ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24 lg:py-32" data-testid="services-approach">
        <Container>
          <h2 className="display-2 max-w-2xl">How We Work With You</h2>
          <ol className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-5">
            {hub.approach.map((s, i) => (
              <li key={s.title} className="relative rounded-[1.6rem] bg-white p-6 ring-1 sm:p-7 ring-ink-900/[0.06]" data-testid={`approach-step-${i}`}>
                <span className="font-display text-[2rem] font-normal leading-none tracking-[-0.018em] text-brand-600 sm:text-[2.6rem]">0{i + 1}</span>
                <h3 className="mt-4 font-display text-[1.15rem] font-medium leading-snug tracking-[-0.015em] sm:mt-6">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <MiniAuditBox testId="services-mini-audit" className="pb-0 pt-16 sm:pb-0 sm:pt-24" />

      <section className="py-16 sm:py-24 lg:py-32" data-testid="services-faq">
        <Container className="grid gap-8 sm:gap-12 lg:grid-cols-12">
          <h2 className="display-3 lg:col-span-4">Questions About Our Healthcare Marketing Services</h2>
          <div className="lg:col-span-8"><FaqList faqs={hub.faqs} /></div>
        </Container>
      </section>

      <FinalCta title="Not Sure Where to Start?" text="Tell us what you're trying to achieve, whether that's more new-patient enquiries, a stronger reputation, a new location or a B2B pipeline. We'll suggest a practical starting point." testId="services-final-cta" photo={2} />
    </>
  );
}
