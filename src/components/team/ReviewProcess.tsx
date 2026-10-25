import { Container, Eyebrow } from "@/components/ui-kit";
import { ReviewMock } from "@/components/home/ReviewMock";
import { CompactQuote } from "@/components/proof/CompactQuote";
import { hubQuotes, quotes } from "@/content/proof";

const steps = [
  { title: "We draft", body: "Our marketing team writes the page, post, ad or email around your goals and your patients." },
  { title: "A doctor reviews", body: "A practicing doctor from our panel checks it for clinical accuracy, responsible claims and plain, ethical language." },
  { title: "It goes live", body: "Reviewed content is published on your website, profiles and campaigns." },
];

export function ReviewProcess() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32" data-testid="team-process">
      <Container className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>How medical review works</Eyebrow>
          <h2 className="display-2 mt-5">A Doctor Checks It Before Your Patients See It</h2>
          <ol className="mt-10 space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5" data-testid={`team-process-step-${i}`}>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 font-display text-[15px] font-medium text-brand-700">{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-medium tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-[1.7] text-ink-600">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <CompactQuote t={quotes(hubQuotes.team)[0]} className="mt-10 bg-paper ring-0" testId="team-process-quote" />
          <p className="mt-8 max-w-md text-[12.5px] leading-relaxed text-ink-500">Medical review covers clinical accuracy and responsible communication. It isn&apos;t legal or regulatory advice.</p>
        </div>
        <div className="lg:col-span-7 lg:pl-8"><ReviewMock /></div>
      </Container>
    </section>
  );
}
