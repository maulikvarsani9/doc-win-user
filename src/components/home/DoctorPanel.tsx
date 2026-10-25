import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { ArrowLink, Container, btn } from "@/components/ui-kit";
import { CtaLink } from "@/components/leads/CtaLink";
import { FaceStack } from "@/components/team/FaceStack";
import { PortraitCard } from "@/components/team/PortraitCard";
import type { Person } from "@/content/team";
import { ReviewMock } from "./ReviewMock";

function PanelStrip({ panel }: { panel: Person[] }) {
  return (
    <div className="mt-12 border-t border-ink-900/10 pt-8 sm:mt-16 sm:pt-10 lg:mt-20" data-testid="doctor-panel-strip">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">Some of the doctors on our panel</p>
        <ArrowLink href="/about/team/" testId="doctor-panel-strip-link">Meet the full team</ArrowLink>
      </div>
      <ul className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-12 sm:mt-7 sm:gap-4 sm:scroll-px-12 sm:px-12 lg:mx-0 lg:grid lg:grid-cols-7 lg:overflow-visible lg:px-0 lg:pb-0">
        {panel.map((p) => (
          <li key={p.slug} className="w-[38%] shrink-0 snap-start sm:w-[28%] lg:w-auto">
            <PortraitCard person={p} testId={`doctor-panel-member-${p.slug}`} sizes="(min-width: 1024px) 160px, 38vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DoctorPanel({ panel }: { panel: Person[] }) {
  return (
    <section className="bg-white sm:py-20 lg:py-28" data-testid="home-doctor-panel">
      <div className="sm:mx-auto sm:max-w-[1240px] sm:px-8">
        <div className="on-scroll bg-brand-50 px-5 py-14 sm:rounded-[2.5rem] sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:py-2">
              <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13.5px] font-semibold text-ink-900 shadow-sm sm:text-[14px]" data-testid="doctor-panel-capsule">
                <span className="grid size-7 place-items-center rounded-full bg-brand-600 text-white"><Stethoscope aria-hidden className="size-3.5" /></span>
                10+ Practicing Doctors on Our Panel
              </p>
              <h2 className="display-2 mt-6 sm:mt-8">Every Client Is Guided by a Practicing Doctor</h2>
              <p className="mt-5 font-display text-[1.15rem] font-medium leading-snug tracking-[-0.01em] text-ink-800 sm:mt-7 sm:text-[1.3rem]">In healthcare marketing, one inaccurate claim can undo years of patient trust.</p>
              <p className="mt-4 text-[16px] leading-[1.7] text-ink-600 sm:mt-5 sm:text-[17px]">
                Every DocWin client is paired with a practicing doctor who reviews patient-facing content for medical accuracy, ethical communication and clinical credibility before it goes live.
              </p>
              <div className="mt-8 flex flex-col gap-5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                <CtaLink kind="contact" className={btn("primary", "lg", "w-full sm:w-auto")} testId="doctor-panel-cta">Book a Strategy Call <ArrowRight aria-hidden /></CtaLink>
                <Link href="/about/team/" className="group inline-flex items-center gap-3 text-[14px] font-semibold text-ink-800 hover:text-brand-700" data-testid="doctor-panel-team-link">
                  <FaceStack slugs={["chesta-gupta", "ankit-faujdar", "eshan-rao", "abu-obaida"]} ring="ring-brand-50" />
                  Meet the panel
                </Link>
              </div>
              <p className="mt-7 max-w-md text-[12.5px] leading-relaxed text-ink-500 sm:mt-8">Medical review covers clinical accuracy and responsible communication. It isn&apos;t legal or regulatory advice.</p>
            </div>
            <div className="hidden sm:block lg:col-span-7 lg:pl-4">
              <ReviewMock />
            </div>
          </div>
          <PanelStrip panel={panel} />
        </div>
      </div>
    </section>
  );
}
