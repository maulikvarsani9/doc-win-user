import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { cn } from "@/lib/utils";

const copy = {
  practice: { eyebrow: "Free marketing audit", title: "See How Patients Find, Judge and Contact You", text: "We review 50 touchpoints across search, your website and reviews, then send a prioritized report. Free, with no obligation." },
  b2b: { eyebrow: "Strategy call", title: "Plan Your Next Growth Move With a Healthcare-Native Team", text: "Talk through your buyers, channels and review requirements with our strategists. Prefer to start with data? Request a free audit of your current presence." },
};

function ReportThumb() {
  return (
    <div className="panel-grid relative h-36 w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-brand-600 sm:h-44 md:w-64" aria-hidden>
      <span className="absolute -right-10 -top-12 size-40 rounded-full bg-brand-500/70" />
      <div className="absolute -bottom-16 left-1/2 aspect-[1100/1782] w-28 -translate-x-1/2 -rotate-[5deg] overflow-hidden rounded-lg shadow-[0_24px_40px_-18px_rgba(6,17,30,0.75)] ring-1 ring-black/5 transition-transform duration-500 group-hover/mini:-translate-y-2 group-hover/mini:rotate-0 sm:w-32">
        <Image src="/images/assets/sample-report-cover.jpg" alt="" fill sizes="128px" className="object-cover object-top" />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-ink-800">Sample report</span>
    </div>
  );
}

const agenda = ["Buyers and positioning", "Channels and content plan", "Medical and regulatory review"];

function StrategyThumb() {
  return (
    <div className="panel-grid relative w-full shrink-0 overflow-hidden rounded-[1.25rem] bg-ink-900 p-5 md:w-64" aria-hidden>
      <span className="absolute -right-10 -top-12 size-36 rounded-full bg-brand-600/60" />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-300">Call agenda</p>
      <ul className="relative mt-3 space-y-2.5">
        {agenda.map((a) => (
          <li key={a} className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2 text-[13px] text-white ring-1 ring-white/10 transition-transform duration-300 group-hover/mini:translate-x-1">
            <Check className="size-3.5 shrink-0 text-signal-400" />{a}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MiniAuditBox({ b2b = false, testId, className }: { b2b?: boolean; testId: string; className?: string }) {
  const c = b2b ? copy.b2b : copy.practice;
  return (
    <section className={cn("bg-white py-12 sm:py-16", className)} data-testid={testId}>
      <Container>
        <div className="group/mini flex flex-col gap-6 rounded-[1.5rem] bg-paper p-5 ring-1 ring-ink-900/[0.06] sm:rounded-[2rem] sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:p-10">
          <div className="max-w-xl">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="display-3 mt-4" data-testid={`${testId}-title`}>{c.title}</h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-ink-600 sm:text-[16px]">{c.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {b2b ? (
                <>
                  <CtaLink kind="contact" className={btn("dark", "md")} testId={`${testId}-primary`}>Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
                  <CtaLink kind="audit" className={btn("outline", "md")} testId={`${testId}-secondary`}>Get a Free Audit</CtaLink>
                </>
              ) : (
                <>
                  <CtaLink kind="audit" className={btn("signal", "md")} testId={`${testId}-primary`}>Get My Free Audit <ArrowRight aria-hidden /></CtaLink>
                  <CtaLink kind="sample" className={btn("outline", "md")} testId={`${testId}-secondary`}>View a Sample</CtaLink>
                </>
              )}
            </div>
          </div>
          {b2b ? <StrategyThumb /> : <ReportThumb />}
        </div>
      </Container>
    </section>
  );
}
