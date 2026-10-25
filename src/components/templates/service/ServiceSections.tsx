import { Check, Info } from "lucide-react";
import { Container, Eyebrow, SectionHeader } from "@/components/ui-kit";
import type { ServicePage } from "@/content/types";
import { cn } from "@/lib/utils";
import { stepCols } from "../shared";

export function ServiceProblems({ page }: { page: ServicePage }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28" data-testid="service-problems">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>The challenge</Eyebrow>
            <h2 className="display-2 mt-5">{page.problemsTitle}</h2>
            <p className="lead mt-5">{page.problemsIntro}</p>
          </div>
        </div>
        <ol className="divide-y divide-ink-900/[0.08] border-y border-ink-900/[0.08] lg:col-span-7">
          {page.problems.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[auto_1fr] gap-4 py-7 sm:gap-8 sm:py-9" data-testid={`service-problem-${i}`}>
              <span className="font-display text-[1.5rem] leading-none tracking-[-0.01em] text-signal-600 tabular-nums sm:text-[2.1rem]">0{i + 1}</span>
              <div>
                <h3 className="text-[1.15rem] font-medium leading-snug sm:text-[1.35rem]">{p.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.65] text-ink-600 sm:text-[16px]">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function ServiceIncluded({ page }: { page: ServicePage }) {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-28" data-testid="service-included">
      <Container>
        <SectionHeader eyebrow="What's included" title={`What Our ${page.short} Service Includes`} />
        <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {page.included.map((g, i) => (
            <div key={g.title} className="rounded-[1.25rem] bg-white p-6 ring-1 ring-ink-900/[0.06] sm:rounded-[1.75rem] sm:p-8" data-testid={`service-included-${i}`}>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-700">0{i + 1}</span>
              <h3 className="mt-3 text-[1.2rem] font-medium leading-snug">{g.title}</h3>
              <ul className="mt-5 space-y-3">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-snug text-ink-700"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-600" strokeWidth={2.5} />{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {page.notIncluded && (
          <p className="mt-5 flex gap-3 rounded-2xl border border-dashed border-ink-900/15 bg-white/60 p-5 text-[14.5px] leading-relaxed text-ink-600" data-testid="service-not-included">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-ink-400" />
            <span><span className="font-semibold text-ink-800">Good to know:</span> {page.notIncluded}</span>
          </p>
        )}
      </Container>
    </section>
  );
}

export function ServiceApproach({ page }: { page: ServicePage }) {
  return (
    <section className="sm:px-5" data-testid="service-approach">
      <div className="panel-grid mx-auto max-w-[1440px] bg-ink-900 text-white sm:rounded-[2.75rem]">
        <Container className="py-16 sm:py-20 lg:py-28">
          <SectionHeader tone="light" eyebrow="Our approach" title={`How We Approach ${page.short}`} />
          <ol className={cn("mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4", stepCols[page.approach.length])}>
            {page.approach.map((s, i) => (
              <li key={s.title} className="relative rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 sm:rounded-[1.5rem]" data-testid={`service-step-${i}`}>
                <span className="grid size-9 place-items-center rounded-full bg-signal-500 text-[14px] font-semibold text-ink-900">{i + 1}</span>
                <h3 className="mt-5 text-[1.1rem] font-medium leading-snug text-white">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-ink-300">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
