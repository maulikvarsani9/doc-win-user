import { Container } from "@/components/ui-kit";
import { aboutStory } from "@/content/about";

export function AboutStory() {
  return (
    <section className="bg-white pb-16 sm:pb-24" data-testid="about-story">
      <Container>
        <div className="grid gap-4 border-t border-ink-900/[0.08] pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-16">
          <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500 lg:col-span-4">{aboutStory.title}</h2>
          <p className="max-w-3xl text-[16px] leading-[1.75] text-ink-600 sm:text-[17px] lg:col-span-8">{aboutStory.text}</p>
        </div>
      </Container>
    </section>
  );
}
