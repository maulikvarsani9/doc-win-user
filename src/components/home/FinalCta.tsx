import { Check, ArrowRight } from "lucide-react";
import { Container, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { CtaVisual, type CtaPhoto } from "./CtaVisual";

const reassurance = ["No obligation", "Strategy shaped around your goals", "Reviewed by practicing doctors"];

export function FinalCta({ title, text, testId = "final-cta", photo }: { title: string; text: string; testId?: string; photo?: CtaPhoto }) {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28" data-testid={testId}>
      <Container>
        <div className="on-scroll grid items-center gap-6 rounded-[1.75rem] bg-paper p-5 pt-9 sm:gap-12 sm:rounded-[2.5rem] sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
          <CtaVisual className="order-2 lg:order-1 lg:col-span-6" photo={photo} />
          <div className="order-1 px-1 sm:px-0 lg:order-2 lg:col-span-6">
            <h2 className="display-2 max-w-[18ch]">{title}</h2>
            <p className="lead mt-4 max-w-xl sm:mt-6">{text}</p>
            <div className="cta-row mt-8 sm:mt-10">
              <CtaLink kind="contact" className={btn("primary", "md")} testId={`${testId}-strategy`}>Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
              <CtaLink kind="audit" className={btn("outline", "md")} testId={`${testId}-audit`}>Get a Free Marketing Audit</CtaLink>
            </div>
            <ul className="mt-7 flex flex-col gap-2.5 text-[14px] text-ink-600 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              {reassurance.map((r) => (
                <li key={r} className="flex items-center gap-2"><Check aria-hidden className="size-4 text-brand-600" strokeWidth={2.5} />{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
