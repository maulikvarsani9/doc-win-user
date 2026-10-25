import { ArrowRight } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { PortraitCard } from "./PortraitCard";
import type { Person } from "@/content/team";

function MoreTile() {
  return (
    <div className="flex h-full min-h-[230px] flex-col justify-between rounded-[1.25rem] bg-ink-900 p-4 text-white sm:min-h-[260px] sm:rounded-[1.75rem] sm:p-7" data-testid="team-panel-more">
      <span className="font-display text-[2.4rem] font-normal leading-none tracking-[-0.018em] text-signal-500 sm:text-[3.2rem]">10+</span>
      <div>
        <p className="font-display text-[1rem] font-medium leading-snug sm:text-[1.15rem]">Practicing doctors on the panel</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-300 sm:text-[14px]">Every DocWin client is paired with one.</p>
        <CtaLink kind="contact" className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-signal-400 sm:mt-5 sm:gap-2 sm:text-[14px] hover:text-signal-300" testId="team-panel-more-cta">
          Book a strategy call <ArrowRight aria-hidden className="size-4" />
        </CtaLink>
      </div>
    </div>
  );
}

export function PanelGrid({ panel }: { panel: Person[] }) {
  return (
    <section id="medical-review-panel" className="bg-paper py-16 sm:py-24 lg:py-32" data-testid="team-panel">
      <Container>
        <SectionHeader
          eyebrow="Medical Review Panel"
          title="Practicing Doctors Behind Every Patient-Facing Message"
          lead="Every DocWin client is paired with a practicing doctor who reviews patient-facing content for medical accuracy, ethical communication and clinical credibility before it goes live. Here are some of the doctors on our panel."
        />
        <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-14 sm:gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {panel.map((p) => (
            <li key={p.slug}>
              <PortraitCard person={p} large testId={`team-panel-${p.slug}`} sizes="(min-width: 1024px) 290px, (min-width: 768px) 31vw, 46vw" />
            </li>
          ))}
          <li><MoreTile /></li>
        </ul>
      </Container>
    </section>
  );
}
