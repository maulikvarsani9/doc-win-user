import Image from "next/image";
import { ShieldCheck, Shapes, Stethoscope, ArrowRight } from "lucide-react";
import { Container, SectionHeader, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { whyPoints } from "@/content/home";
import type { Person } from "@/content/team";
import { FounderCard } from "@/components/team/FounderCard";

const pointIcons = [Stethoscope, ShieldCheck, Shapes];

export function WhyDocWin({ founders }: { founders: Person[] }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32" data-testid="home-why">
      <Container>
        <SectionHeader
          eyebrow="Why DocWin"
          title="Healthcare Marketing by People Who Actually Understand Healthcare"
          action={<CtaLink kind="contact" className={btn("dark", "lg", "hidden sm:inline-flex")} testId="why-cta">Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>}
        />

        <div className="mt-10 grid gap-10 sm:mt-16 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="on-scroll relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink-100 sm:rounded-[2.25rem] lg:col-span-7 lg:aspect-auto lg:min-h-[580px]">
            <Image src="/images/strategy-meeting.jpg" alt="Healthcare professionals in a planning meeting" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-[0_24px_50px_-20px_rgba(11,25,44,0.5)] backdrop-blur sm:bottom-5 sm:left-5 sm:right-auto sm:gap-3.5 sm:p-4 sm:pr-6">
              <Image src={founders[0].avatar} alt="" width={80} height={80} className="size-10 rounded-full object-cover ring-2 ring-signal-500 sm:size-11" />
              <span className="min-w-0">
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">Doctor-founded</span>
                <span className="block text-[13.5px] font-semibold leading-snug text-ink-900 sm:text-[14.5px]">Co-founded by {founders[0].name}, {founders[0].credential}</span>
              </span>
            </div>
          </div>
          <ol className="flex flex-col justify-center divide-y divide-ink-900/[0.08] lg:col-span-5">
            {whyPoints.map((p, i) => {
              const Icon = pointIcons[i];
              return (
                <li key={p.title} className="flex gap-4 py-6 first:pt-0 last:pb-0 sm:gap-5 sm:py-8" data-testid={`why-point-${i}`}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 sm:size-12 sm:rounded-2xl"><Icon aria-hidden className="size-[18px] sm:size-5" /></span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-medium leading-tight tracking-[-0.015em] sm:text-[1.45rem]">{p.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-[1.65] text-ink-600 sm:mt-3 sm:text-[16px] sm:leading-[1.7]">{p.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 sm:mt-24">
          <div className="max-w-2xl">
            <h3 className="display-3">Meet Our Doctor-Founded Leadership Team</h3>
            <p className="lead mt-3 sm:mt-4">Healthcare marketing shaped by clinical experience and marketing expertise.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2">
            {founders.map((f, i) => <FounderCard key={f.slug} person={f} testId={`founder-quote-${i}`} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}
