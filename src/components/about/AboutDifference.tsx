import { Check, Minus } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui-kit";
import { aboutDifference } from "@/content/about";

export function AboutDifference() {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-32" data-testid="about-difference">
      <Container>
        <SectionHeader eyebrow="The DocWin difference" title={aboutDifference.title} />
        <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink-900/[0.06] sm:mt-14 sm:rounded-[2rem]">
          <div className="hidden grid-cols-12 border-b border-ink-900/[0.08] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] md:grid">
            <span className="col-span-2 text-ink-500">&nbsp;</span>
            <span className="col-span-5 text-ink-500">General digital agency</span>
            <span className="col-span-5 text-brand-700">DocWin Digital</span>
          </div>
          <ul className="divide-y divide-ink-900/[0.08]">
            {aboutDifference.rows.map((r, i) => (
              <li key={r.topic} className="grid gap-3 px-5 py-5 transition-colors duration-300 hover:bg-brand-50/40 sm:px-8 sm:py-6 md:grid-cols-12 md:gap-6" data-testid={`about-difference-row-${i}`}>
                <p className="font-display text-[1.05rem] font-medium text-ink-900 md:col-span-2">{r.topic}</p>
                <p className="flex gap-2.5 text-[15px] leading-relaxed text-ink-500 md:col-span-5">
                  <Minus aria-hidden className="mt-1 size-4 shrink-0 text-ink-300" /><span><span className="sr-only md:hidden">General agency: </span>{r.generic}</span>
                </p>
                <p className="flex gap-2.5 text-[15px] font-medium leading-relaxed text-ink-900 md:col-span-5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-600 text-white"><Check aria-hidden className="size-3" /></span>
                  <span><span className="font-semibold text-brand-700 md:hidden">DocWin: </span>{r.docwin}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
