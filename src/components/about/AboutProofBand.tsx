import { Container, Eyebrow } from "@/components/ui-kit";
import { LogoStrip } from "@/components/proof/LogoStrip";
import { stats } from "@/content/proof";

const side = [stats.rating, stats.doctors, stats.panel];

export function AboutProofBand() {
  return (
    <section className="px-3 sm:px-5" data-testid="about-proof">
      <div className="panel-grid relative overflow-hidden rounded-[1.75rem] bg-ink-900 py-14 text-white sm:rounded-[2.5rem] sm:py-20">
        <span aria-hidden className="absolute -left-24 -top-24 size-80 rounded-full bg-brand-600/40" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-5">
              <Eyebrow tone="light">DocWin in numbers</Eyebrow>
              <p className="mt-6 font-display text-[5rem] leading-[0.9] tracking-[-0.03em] text-white sm:text-[7rem]" data-testid="about-proof-growth">{stats.growth.value}</p>
              <p className="mt-3 text-[16px] text-ink-300 sm:text-[17px]">{stats.growth.label}</p>
            </div>
            <dl className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7">
              {side.map((s, i) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 py-4 sm:py-5" data-testid={`about-proof-stat-${i}`}>
                  <dt className="text-[14.5px] text-ink-300 sm:text-[16px]">{s.label}</dt>
                  <dd className="shrink-0 font-display text-[1.9rem] leading-none text-white sm:text-[2.4rem]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LogoStrip tone="dark" className="mt-12 sm:mt-16" testId="about-logos" />
        </Container>
      </div>
    </section>
  );
}
