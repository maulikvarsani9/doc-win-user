import Link from "next/link";
import { Container, Eyebrow, ArrowLink, JsonLd, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { PageHero } from "@/components/hubs/PageHero";
import { DirectoryCard } from "@/components/hubs/DirectoryCard";
import { FinalCta } from "@/components/home/FinalCta";
import { audienceGroups, audiences, audiencesIn } from "@/content/audiences";
import { audienceHub as hub } from "@/content/hubs";
import { itemListSchema, pageMetadata } from "@/lib/seo";
import { IconTile, audienceIcons, groupIcons } from "@/components/icons";
import { StatBand } from "@/components/proof/StatBand";
import { QuoteRow } from "@/components/proof/CompactQuote";
import { MiniAuditBox } from "@/components/proof/MiniAuditBox";
import { hubQuotes, hubStats, quotes, statList } from "@/content/proof";

export const metadata = pageMetadata({ title: hub.seo.title, description: hub.seo.description, path: "/who-we-serve/", image: { url: "/images/og/hub-industries.jpg", width: 1200, height: 630 } });

const serviceLinks = [
  { href: "/services/#search-visibility", label: "Search & visibility services" },
  { href: "/services/#paid-advertising", label: "Paid advertising" },
  { href: "/services/#websites-reputation", label: "Websites & reputation" },
  { href: "/services/b2b-healthcare-marketing/", label: "B2B healthcare marketing" },
  { href: "/services/", label: "View all services" },
];

export default function WhoWeServePage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/" }];
  return (
    <>
      <JsonLd data={itemListSchema("Healthcare organizations we serve", audiences.map((a) => ({ name: a.name, path: `/who-we-serve/${a.slug}/` })))} />
      <PageHero eyebrow="Who we serve" title={hub.h1} intro={hub.intro} crumbs={crumbs} jumpTitle={`${audiences.length} industries in ${audienceGroups.length} groups`} jump={audienceGroups.map((g) => ({ id: g.id, label: g.name, count: audiencesIn(g.id).length }))} testId="audiences-hero" image={{ src: "/images/hubs/industries.jpg", alt: "Doctors, nurses and healthcare staff standing together in a hospital corridor" }}>
        <StatBand stats={statList(hubStats.audiences)} className="mt-8 max-w-xl sm:mt-10" testId="audiences-hero-stats" />
      </PageHero>

      <section className="py-16 sm:py-24 lg:py-28" aria-labelledby="industry-heading" data-testid="audiences-directory">
        <Container>
          <h2 id="industry-heading" className="display-2">Find Your Industry</h2>
          <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-20">
            {audienceGroups.map((g) => (
              <section key={g.id} id={g.id} data-testid={`group-${g.id}`}>
                <div className="flex flex-col gap-3 border-b border-ink-900/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-7">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <IconTile icon={groupIcons[g.id]} />
                    <div>
                    <h3 className="display-3">{g.name}</h3>
                    <p className="mt-2 text-[15.5px] text-ink-600 sm:text-[16px]">{g.blurb}</p>
                    </div>
                  </div>
                  <span className="font-display text-[13px] font-semibold tabular-nums text-ink-500">{audiencesIn(g.id).length} industries</span>
                </div>
                <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                  {audiencesIn(g.id).map((a) => (
                    <DirectoryCard key={a.slug} href={`/who-we-serve/${a.slug}/`} name={a.name} description={a.description} linkLabel={a.linkLabel} flag={a.status === "hold-proof" ? "On hold: proof needed" : undefined} icon={audienceIcons[a.slug]} testId={`audience-card-${a.slug}`} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24 lg:py-32" data-testid="audiences-contrasts">
        <Container>
          <h2 className="display-2 max-w-3xl">Different Organizations, Different Growth Challenges</h2>
          <ul className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {hub.contrasts.map((c, i) => (
              <li key={c.who} className="rounded-[1.6rem] bg-white p-6 ring-1 sm:p-7 ring-ink-900/[0.06]" data-testid={`contrast-${i}`}>
                <span className="font-display text-[13px] font-semibold tabular-nums text-signal-600">0{i + 1}</span>
                <p className="mt-4 font-display text-[1.2rem] font-medium tracking-[-0.015em]">{c.who}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{c.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl font-display text-[1.2rem] font-medium leading-[1.45] tracking-[-0.012em] text-ink-900 sm:mt-12 sm:text-[1.4rem]">{hub.contrastClose}</p>
          <QuoteRow items={quotes(hubQuotes.audiences)} className="mt-12 sm:mt-16" testId="audiences-quotes" />
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-32" data-testid="audiences-services">
        <Container className="grid gap-6 sm:gap-12 lg:grid-cols-12">
          <h2 className="display-2 lg:col-span-5">Services Matched to Your Goals</h2>
          <div className="lg:col-span-7">
            <p className="text-[16px] leading-relaxed text-ink-600 sm:text-[17px]">{hub.servicesCopy}</p>
            <ul className="mt-6 flex flex-wrap gap-2 sm:mt-8">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex rounded-full border border-ink-900/15 px-4 py-2 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-white" data-testid={`audiences-service-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <MiniAuditBox testId="audiences-mini-audit" className="pb-16 pt-0 sm:pb-24 sm:pt-0" />

      <section className="px-3 sm:px-5" data-testid="audiences-perspective">
        <div className="panel-grid mx-auto max-w-[1440px] rounded-[1.75rem] sm:rounded-[2.75rem] bg-ink-900">
          <Container className="grid gap-8 py-14 sm:gap-12 sm:py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-6">
              <Eyebrow tone="light">Healthcare perspective</Eyebrow>
              <h2 className="display-2 mt-6 text-white">A Healthcare Perspective on Marketing</h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-[16px] leading-relaxed text-ink-200 sm:text-[17px]">{hub.perspective}</p>
              <figure className="mt-8 border-l-2 border-signal-500 pl-5">
                <blockquote className="font-display text-lg font-medium leading-snug text-white">“I partnered with my childhood friend, Dr. Wali, to create what the industry was missing: healthcare marketing by healthcare insiders.”</blockquote>
                <figcaption className="mt-3 text-sm text-ink-300">Arbaz Fatmi, Co-Founder & Chief Marketing Officer</figcaption>
              </figure>
              <div className="mt-8"><ArrowLink href="/about/team/" tone="light" testId="perspective-team-link">Meet the team</ArrowLink></div>
            </div>
          </Container>
        </div>
      </section>

      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-32" data-testid="audiences-not-listed">
        <Container>
          <div className="grid gap-10 rounded-[1.75rem] sm:rounded-[2.75rem] bg-brand-50 p-6 sm:p-12 lg:grid-cols-12 lg:items-center lg:p-16">
            <div className="lg:col-span-7">
              <h2 className="display-3">Don&apos;t See Your Organization Listed?</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-ink-700 sm:mt-5 sm:text-[17px]">{hub.notListed}</p>
            </div>
            <div className="cta-row lg:col-span-5 lg:justify-end">
              <Link href="/contact/" className={btn("primary", "lg")} data-testid="not-listed-contact">Contact Us</Link>
              <CtaLink kind="contact" className={btn("outline", "lg")} testId="not-listed-strategy">Book a Strategy Call</CtaLink>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta title="Start With a Clear Picture of Your Marketing" text="Our free marketing audit shows how your organization appears to the people choosing care in your field: what's working, what isn't, and what to fix first." testId="audiences-final-cta" photo={1} />
    </>
  );
}
