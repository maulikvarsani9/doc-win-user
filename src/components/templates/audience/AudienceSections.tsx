import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Scale } from "lucide-react";
import { ArrowLink, Container, Eyebrow, SectionHeader } from "@/components/ui-kit";
import { IconTile, serviceIcons } from "@/components/icons";
import { FaceStack } from "@/components/team/FaceStack";
import { Stars } from "@/components/home/Testimonials";
import { serviceBySlug } from "@/content/services";
import type { Testimonial } from "@/content/home";
import type { AudiencePage } from "@/content/types";
import { cn } from "@/lib/utils";
import { LegalNote, stepCols } from "../shared";

export function AudiencePriorities({ page }: { page: AudiencePage }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="audience-priorities">
      <Container>
        <SectionHeader eyebrow="Priorities & opportunities" title={page.prioritiesTitle} />
        <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5">
          {page.priorities.map((p, i) => (
            <li key={p.title} className="rounded-[1.25rem] border border-ink-900/[0.08] p-6 transition-colors duration-300 hover:border-brand-600/30 sm:rounded-[1.75rem] sm:p-9" data-testid={`audience-priority-${i}`}>
              <span className="font-display text-[1.5rem] leading-none text-brand-600 tabular-nums sm:text-[2rem]">0{i + 1}</span>
              <h3 className="mt-5 text-[1.15rem] font-medium leading-snug sm:text-[1.3rem]">{p.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.65] text-ink-600">{p.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function AudienceServices({ page }: { page: AudiencePage }) {
  return (
    <section className="sm:px-5" data-testid="audience-services">
      <div className="panel-grid mx-auto max-w-[1440px] bg-ink-900 text-white sm:rounded-[2.75rem]">
        <Container className="py-16 sm:py-20 lg:py-28">
          <SectionHeader tone="light" eyebrow="How DocWin can help" title={page.helpTitle} />
          <ul className="mt-10 grid gap-3 sm:mt-14 lg:grid-cols-2 lg:gap-4">
            {page.services.map(([slug, reason]) => {
              const s = serviceBySlug(slug)!;
              return (
                <li key={slug}>
                  <Link href={`/services/${slug}/`} className="group flex h-full gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:bg-white/[0.08] sm:rounded-[1.5rem] sm:p-7" data-testid={`audience-service-${slug}`}>
                    <IconTile icon={serviceIcons[slug]} tone="light" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3 text-[1.08rem] font-medium leading-snug text-white">{s.name}<ArrowUpRight aria-hidden className="size-4 shrink-0 text-ink-400 transition-colors group-hover:text-signal-400" /></span>
                      <span className="mt-2 block text-[14.5px] leading-[1.6] text-ink-300">{reason}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </div>
    </section>
  );
}

export function AudienceConsiderations({ page }: { page: AudiencePage }) {
  if (!page.considerations) return null;
  return (
    <section className="bg-brand-50 py-16 sm:py-24 lg:py-28" data-testid="audience-considerations">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Rules & sensitivities</Eyebrow>
          <h2 className="display-2 mt-5">{page.considerationsTitle}</h2>
        </div>
        <div className="space-y-3 sm:space-y-4 lg:col-span-7">
          {page.considerations.map((c, i) => (
            <article key={c.title} className="flex gap-4 rounded-[1.25rem] bg-white p-5 sm:gap-5 sm:rounded-[1.5rem] sm:p-8" data-testid={`audience-consideration-${i}`}>
              <IconTile icon={Scale} size="sm" />
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

export function AudienceApproach({ page, short }: { page: AudiencePage; short: string }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="audience-approach">
      <Container>
        <SectionHeader eyebrow="A tailored approach" title={`How We Build a Plan for ${short}`} />
        <ol className={cn("relative mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5", stepCols[page.approach.length])}>
          {page.approach.map((s, i) => (
            <li key={s.title} className="rounded-[1.25rem] bg-paper p-6 sm:rounded-[1.5rem] sm:p-7" data-testid={`audience-step-${i}`}>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-700">Step {i + 1}</span>
              <h3 className="mt-3 text-[1.1rem] font-medium leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.65] text-ink-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function AudienceProof({ t }: { t?: Testimonial }) {
  return (
    <section className="bg-white pb-16 sm:pb-24 lg:pb-28" data-testid="audience-proof">
      <Container className={cn("grid gap-4 sm:gap-5", t && "lg:grid-cols-12")}>
        {t && (
          <figure className="flex flex-col rounded-[1.5rem] border border-ink-900/[0.08] p-6 sm:rounded-[2rem] sm:p-10 lg:col-span-7" data-testid="audience-testimonial">
            <Stars />
            <blockquote className="mt-5 flex-1 font-display text-[1.15rem] leading-[1.55] text-ink-900 sm:text-[1.35rem]">“{t.quote}”</blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-ink-900/[0.08] pt-5">
              <Image src={t.photo} alt={t.name} width={48} height={48} className="size-12 rounded-full object-cover" />
              <span><span className="block font-medium text-ink-900">{t.name}</span><span className="block text-[13.5px] text-ink-500">{t.specialty}, DocWin client</span></span>
            </figcaption>
          </figure>
        )}
        <div className={cn("flex flex-col justify-between rounded-[1.5rem] bg-ink-900 p-6 text-white sm:rounded-[2rem] sm:p-10", t ? "lg:col-span-5" : "sm:flex-row sm:items-center sm:gap-10")} data-testid="audience-review-panel">
          <div>
            <FaceStack slugs={["wali-rahmani", "nehan-fatima", "yasir-niyazi", "pooja-singh", "chesta-gupta"]} ring="ring-ink-900" size="size-10" />
            <p className="mt-6 text-[1.25rem] leading-snug tracking-[-0.005em] sm:text-[1.45rem]">10+ practicing doctors on our review panel.</p>
            <p className="mt-3 max-w-md text-[15px] leading-[1.65] text-ink-300">Every DocWin client is paired with a practicing doctor who reviews patient-facing content for medical accuracy and responsible communication.</p>
          </div>
          <div className="mt-8 shrink-0 sm:mt-6"><ArrowLink href="/about/team/" tone="light" testId="audience-panel-link">Meet the panel</ArrowLink></div>
        </div>
      </Container>
    </section>
  );
}
