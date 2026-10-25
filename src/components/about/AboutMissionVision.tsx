import { Compass, Target } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui-kit";
import { aboutVision } from "@/content/about";
import { site } from "@/content/site";

export function AboutMissionVision() {
  const items = [
    { icon: Target, label: "Our mission", text: site.mission, testId: "about-mission" },
    { icon: Compass, label: "Our vision", text: aboutVision.vision, testId: "about-vision" },
  ];
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32" data-testid="about-mission-vision">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>Why we exist</Eyebrow>
          <h2 className="display-2 mt-5">{aboutVision.title}</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {items.map(({ icon: Icon, label, text, testId }, i) => (
            <figure key={label} className={i === 0 ? "relative overflow-hidden rounded-[1.5rem] bg-ink-900 p-6 text-white sm:rounded-[2rem] sm:p-9" : "relative overflow-hidden rounded-[1.5rem] bg-paper p-6 sm:rounded-[2rem] sm:p-9"} data-testid={testId}>
              <span className={i === 0 ? "grid size-11 place-items-center rounded-xl bg-white/10 text-signal-400" : "grid size-11 place-items-center rounded-xl bg-white text-brand-600"}><Icon aria-hidden className="size-5" /></span>
              <p className={i === 0 ? "mt-8 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-300" : "mt-8 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-500"}>{label}</p>
              <blockquote className="mt-3 font-display text-[1.2rem] leading-[1.5] tracking-[-0.01em] sm:text-[1.4rem]">{text}</blockquote>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
