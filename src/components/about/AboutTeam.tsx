import Image from "next/image";
import { Container, SectionHeader, ArrowLink } from "@/components/ui-kit";
import { FaceStack } from "@/components/team/FaceStack";
import type { Person } from "@/content/team";
import { stats } from "@/content/proof";

export function AboutTeam({ founders, panel }: { founders: Person[]; panel: Person[] }) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-32" data-testid="about-team">
      <Container>
        <SectionHeader eyebrow="Our team" title="Marketers and Doctors, Working Together" action={<ArrowLink href="/about/team/" testId="about-team-link">Meet the full team</ArrowLink>} />
        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
          {founders.map((f) => (
            <figure key={f.slug} className="group overflow-hidden rounded-[1.5rem] bg-paper ring-1 ring-ink-900/[0.05] sm:rounded-[2rem]" data-testid={`about-founder-${f.slug}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F4E4D8]">
                <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover object-[50%_14%] transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <figcaption className="p-6">
                <span className="block font-display text-[1.15rem] font-medium text-ink-900">{f.name}</span>
                <span className="mt-1 block text-[14px] text-ink-600">{f.role}</span>
                {f.credential && <span className="mt-0.5 block text-[13px] text-ink-500">{f.credential}</span>}
              </figcaption>
            </figure>
          ))}
          <div className="flex flex-col justify-between rounded-[1.5rem] bg-brand-600 p-6 text-white sm:rounded-[2rem] sm:p-8" data-testid="about-panel">
            <div>
              <p className="font-display text-[3.5rem] leading-none tracking-[-0.03em]">{stats.panel.value}</p>
              <p className="mt-3 text-[16px] leading-snug text-white/90">Practicing doctors on our review panel, across specialties such as ophthalmology, orthopedics, paediatrics and anesthesia.</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <FaceStack people={panel} size="size-9" ring="ring-brand-600" />
              <ArrowLink href="/about/team/#medical-review-panel" tone="light" testId="about-panel-link">Meet the panel</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
