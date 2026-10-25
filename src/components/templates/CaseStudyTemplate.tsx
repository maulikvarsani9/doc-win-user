import Link from "next/link";
import { ArrowRight, CalendarRange, MapPin, Stethoscope } from "lucide-react";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { CtaLink } from "@/components/leads/CtaLink";
import { FinalCta } from "@/components/home/FinalCta";
import { serviceBySlug } from "@/content/services";
import type { CaseStudy } from "@/content/types";

function Facts({ cs }: { cs: CaseStudy }) {
  const facts = [
    { icon: Stethoscope, label: "Industry", value: cs.industry },
    { icon: MapPin, label: "Location", value: cs.location },
    { icon: CalendarRange, label: "Timeframe", value: cs.timeframe },
  ];
  return (
    <aside className="rounded-[1.5rem] bg-paper p-6 sm:p-8 lg:sticky lg:top-28" data-testid="case-study-facts">
      <dl className="space-y-5">
        {facts.map((f) => (
          <div key={f.label} className="flex gap-3">
            <f.icon aria-hidden className="mt-0.5 size-4 text-brand-600" />
            <div><dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">{f.label}</dt><dd className="mt-1 text-[15px] text-ink-900">{f.value}</dd></div>
          </div>
        ))}
      </dl>
      <p className="mt-7 border-t border-ink-900/10 pt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">Services used</p>
      <ul className="mt-3 space-y-2">
        {cs.services.map((slug) => (
          <li key={slug}><Link href={`/services/${slug}/`} className="text-[15px] font-medium text-brand-700 hover:underline">{serviceBySlug(slug)?.name}</Link></li>
        ))}
      </ul>
      <CtaLink kind="contact" className={btn("dark", "md", "mt-8 w-full")} testId="case-study-aside-cta">Discuss a Similar Project</CtaLink>
    </aside>
  );
}

function Hero({ cs }: { cs: CaseStudy }) {
  return (
    <section className="sm:px-5" data-testid="case-study-hero">
      <div className="panel-grid mx-auto max-w-[1440px] bg-ink-900 text-white sm:rounded-b-[2.75rem]">
        <Container className="pb-14 pt-8 sm:pb-20 sm:pt-12 lg:pb-24">
          <div className="[&_a]:text-ink-300 [&_span]:text-ink-200"><Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies/" }, { name: cs.client, path: `/case-studies/${cs.slug}/` }]} /></div>
          <Eyebrow tone="light" className="mt-10">{cs.client} · {cs.industry}</Eyebrow>
          <h1 className="display-1 mt-5 max-w-4xl text-white lg:text-[3.6rem]" data-testid="case-study-heading">{cs.headline}</h1>
          <p className="lead mt-6 max-w-2xl text-ink-200">{cs.summary}</p>
          <dl className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 sm:mt-14 sm:grid-cols-3" data-testid="case-study-metrics">
            {cs.metrics.map((m) => (
              <div key={m.label} className="flex flex-col bg-ink-900 p-6 sm:p-8">
                <dt className="order-2 mt-2 text-[14px] text-ink-300">{m.label}</dt>
                <dd className="order-1 font-display text-[2.4rem] leading-none tracking-[-0.01em] text-signal-400 sm:text-[3rem]">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

function Story({ cs }: { cs: CaseStudy }) {
  return (
    <section className="py-16 sm:py-24 lg:py-28" data-testid="case-study-story">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-14 lg:col-span-8">
          <div>
            <h2 className="display-3">The Challenge</h2>
            {cs.challenge.map((p) => <p key={p.slice(0, 24)} className="mt-5 text-[16px] leading-[1.75] text-ink-700 sm:text-[17px]">{p}</p>)}
          </div>
          <div>
            <h2 className="display-3">What We Did</h2>
            <ol className="mt-6 space-y-3">
              {cs.approach.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-[1.25rem] border border-ink-900/[0.08] p-5 sm:p-6">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-[13px] font-semibold text-brand-700">{i + 1}</span>
                  <div><h3 className="text-[1.1rem] font-medium">{s.title}</h3><p className="mt-1.5 text-[15.5px] leading-[1.65] text-ink-600">{s.body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="display-3">The Results</h2>
            <ul className="mt-5 space-y-3">{cs.results.map((r) => <li key={r} className="flex gap-3 text-[16px] leading-[1.7] text-ink-700"><ArrowRight aria-hidden className="mt-1.5 size-4 shrink-0 text-signal-600" />{r}</li>)}</ul>
          </div>
          {cs.quote && (
            <figure className="rounded-[1.75rem] bg-brand-50 p-7 sm:p-10" data-testid="case-study-quote">
              <blockquote className="font-display text-[1.25rem] leading-[1.5] text-ink-900 sm:text-[1.5rem]">“{cs.quote.text}”</blockquote>
              <figcaption className="mt-6 text-[14.5px] text-ink-600"><span className="font-semibold text-ink-900">{cs.quote.name}</span>, {cs.quote.role}</figcaption>
            </figure>
          )}
        </div>
        <div className="lg:col-span-4"><Facts cs={cs} /></div>
      </Container>
    </section>
  );
}

export function CaseStudyTemplate({ cs }: { cs: CaseStudy }) {
  return (
    <>
      <Hero cs={cs} />
      <Story cs={cs} />
      <FinalCta title="Want Results Like These for Your Organization?" text="Tell us where you want to grow. We'll show you what a realistic plan looks like, with patient-facing work reviewed by practicing doctors." testId="case-study-final-cta" />
    </>
  );
}
