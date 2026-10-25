import { ArrowRight, Check } from "lucide-react";
import { Container, Eyebrow, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { auditCategories } from "@/content/home";
import { ReportShowcase } from "./ReportShowcase";

export function AuditChecklist({ dark = true }: { dark?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:gap-x-8 sm:gap-y-3.5" data-testid="audit-categories">
      {auditCategories.map((c) => (
        <li key={c} className={`flex items-start gap-2.5 text-[14px] leading-snug sm:items-center sm:gap-3 sm:text-[15px] ${dark ? "text-ink-100" : "text-ink-800"}`}>
          <span className={`grid size-5 shrink-0 place-items-center rounded-full sm:size-6 ${dark ? "bg-white/[0.08] text-signal-400 ring-1 ring-white/10" : "bg-brand-50 text-brand-600"}`}>
            <Check aria-hidden className="size-3 sm:size-3.5" strokeWidth={3} />
          </span>
          {c}
        </li>
      ))}
    </ul>
  );
}

const steps = [
  { title: "Tell us about your practice", body: "Share your website and the services you most want to grow." },
  { title: "We review 50 touchpoints", body: "Our team checks how patients find, judge and contact you, across 10 categories." },
  { title: "Get a prioritized report", body: "An 18-page report showing where you stand and what to fix first." },
];

function AuditSteps() {
  return (
    <ol className="space-y-1" data-testid="audit-steps">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 pb-5 last:pb-0 sm:gap-5" data-testid={`audit-step-${i + 1}`}>
          {i < steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-[18px] top-10 w-px bg-ink-900/10 sm:left-[19px]" />}
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white font-display text-[15px] text-brand-700 ring-1 ring-ink-900/[0.08] sm:size-10">{i + 1}</span>
          <span className="pt-1.5">
            <span className="block text-[1.05rem] font-medium leading-snug text-ink-900 sm:text-[1.1rem]">{s.title}</span>
            <span className="mt-1 block text-[14.5px] leading-[1.6] text-ink-600 sm:text-[15px]">{s.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function AuditSection() {
  return (
    <section className="bg-paper" data-testid="home-audit">
      <Container className="grid gap-10 py-16 sm:gap-14 sm:py-24 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10 lg:py-28">
        <div className="reveal lg:col-span-6 lg:row-start-1 lg:self-end">
          <Eyebrow>Free marketing audit</Eyebrow>
          <h2 className="display-2 mt-5 sm:mt-6">Before You Spend More on Marketing, See What&apos;s Working</h2>
          <p className="lead mt-5 sm:mt-6">A personalized review of how patients find, judge and choose your practice online, with a clear list of what to fix first.</p>
        </div>
        <ReportShowcase className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center" />
        <div className="reveal reveal-2 lg:col-span-6 lg:row-start-2">
          <AuditSteps />
          <div className="cta-row mt-9 sm:mt-10">
            <CtaLink kind="audit" className={btn("signal", "lg")} testId="audit-cta-get">Get My Free Marketing Audit <ArrowRight aria-hidden /></CtaLink>
            <CtaLink kind="sample" className={btn("outline", "lg")} testId="audit-cta-sample">View a Sample Audit</CtaLink>
          </div>
          <p className="mt-5 flex items-center gap-2 text-[13.5px] text-ink-500" data-testid="audit-free-note"><Check aria-hidden className="size-4 text-brand-600" strokeWidth={2.5} />Free, with no obligation to work with us.</p>
        </div>
      </Container>
    </section>
  );
}
