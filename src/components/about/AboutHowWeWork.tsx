import { Container, SectionHeader } from "@/components/ui-kit";
import { aboutSteps } from "@/content/about";

export function AboutHowWeWork() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32" data-testid="about-how">
      <Container>
        <SectionHeader eyebrow="Our approach" title="Marketing Your Patients Can Trust, Checked by Doctors" />
        <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {aboutSteps.map((s, i) => (
            <li key={s.title} className={i === 2 ? "rounded-[1.5rem] bg-brand-600 p-6 text-white sm:p-7" : "rounded-[1.5rem] bg-paper p-6 sm:p-7"} data-testid={`about-step-${i}`}>
              <span className={i === 2 ? "font-display text-[15px] text-brand-100" : "font-display text-[15px] text-brand-600"}>0{i + 1}</span>
              <h3 className="mt-8 font-display text-[1.25rem] font-medium leading-tight tracking-[-0.015em] sm:mt-12">{s.title}</h3>
              <p className={i === 2 ? "mt-2.5 text-[15px] leading-[1.65] text-white/85" : "mt-2.5 text-[15px] leading-[1.65] text-ink-600"}>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[12.5px] leading-relaxed text-ink-500">Medical review covers clinical accuracy and responsible communication. It isn&apos;t legal or regulatory advice.</p>
      </Container>
    </section>
  );
}
