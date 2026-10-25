"use client";

import Image from "next/image";
import { ArrowRight, Stethoscope } from "lucide-react";
import { FaceStack } from "@/components/team/FaceStack";
import { sampleReport } from "@/content/home";
import { face, founders, panel } from "@/content/team";

const doctors = [founders[0], ...panel.slice(0, 3)];
const stack = [founders[0], ...panel].slice(0, 5).map((p) => p.slug);
const [cover, summary] = sampleReport.pages;

export function ContactAside() {
  return (
    <div className="flex h-full flex-col p-7" data-testid="contact-modal-aside">
      <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-400"><Stethoscope aria-hidden className="size-3.5" />Doctor-guided</p>
      <p className="mt-4 font-display text-[1.45rem] leading-tight tracking-[-0.015em] text-white">10+ practicing doctors on our panel</p>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-300">Every client is paired with a practicing doctor who reviews patient-facing content before it goes live.</p>
      <ul className="mt-7 space-y-2.5">
        {doctors.map((d, i) => (
          <li key={d.slug} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-2.5 pr-3 ring-1 ring-white/10 animate-in fade-in-0 slide-in-from-left-2 fill-mode-both" style={{ animationDelay: `${120 + i * 80}ms` }} data-testid={`contact-modal-doctor-${d.slug}`}>
            <Image src={face(d.slug)} alt="" width={80} height={80} className="size-10 shrink-0 rounded-full object-cover ring-2 ring-white/20" />
            <span className="min-w-0">
              <span className="block truncate text-[14px] font-semibold text-white">{d.name}</span>
              <span className="block truncate text-[12.5px] text-ink-300">{d.credential}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] text-ink-400">…and more doctors across specialties.</p>
    </div>
  );
}

export function ContactStrip() {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl bg-ink-50 p-3 ring-1 ring-ink-900/[0.06] md:hidden" data-testid="contact-modal-strip">
      <FaceStack slugs={stack} size="size-8" className="shrink-0" />
      <p className="text-[13px] leading-snug text-ink-700"><span className="font-semibold text-ink-900">10+ practicing doctors</span> on our panel review client work.</p>
    </div>
  );
}

export function AuditAside({ onSample }: { onSample: () => void }) {
  return (
    <div className="flex h-full flex-col p-7" data-testid="audit-modal-aside">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-signal-400">What you receive</p>
      <p className="mt-4 font-display text-[1.45rem] leading-tight tracking-[-0.015em] text-white">A scored report, not a sales pitch</p>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-300">Like this sample: an overall score, a top-5% benchmark and a breakdown across 10 categories.</p>
      <button type="button" onClick={onSample} className="group relative mt-8 h-64 w-full" aria-label="View the sample report" data-testid="audit-modal-sample-preview">
        <span className="absolute left-[34%] top-3 aspect-[595/964] w-[52%] rotate-[6deg] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15 transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-[9deg]">
          <Image src={summary.src} alt={summary.alt} fill sizes="160px" className="object-cover object-top" />
        </span>
        <span className="absolute left-[8%] top-0 aspect-[595/964] w-[52%] -rotate-[4deg] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-rotate-[6deg]">
          <Image src={cover.src} alt={cover.alt} fill sizes="160px" className="object-cover object-top" />
        </span>
        <span className="absolute bottom-0 right-0 rounded-xl bg-white px-3 py-2 text-left shadow-xl">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-ink-500">Sample score</span>
          <span className="block font-display text-[1.35rem] leading-none text-ink-900">46<span className="text-[13px] text-ink-500">/100</span></span>
        </span>
      </button>
      <button type="button" onClick={onSample} className="mt-6 inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-white hover:text-signal-400" data-testid="audit-modal-view-sample">
        See the full sample <ArrowRight aria-hidden className="size-4" />
      </button>
    </div>
  );
}

export function AuditStrip({ onSample }: { onSample: () => void }) {
  return (
    <button type="button" onClick={onSample} className="mb-6 flex w-full items-center gap-3 rounded-2xl bg-ink-50 p-3 text-left ring-1 ring-ink-900/[0.06] md:hidden" data-testid="audit-modal-strip">
      <span className="relative aspect-[595/964] w-11 shrink-0 overflow-hidden rounded-md ring-1 ring-ink-900/10">
        <Image src={cover.src} alt="" fill sizes="44px" className="object-cover object-top" />
      </span>
      <span className="text-[13px] leading-snug text-ink-700">You get a <span className="font-semibold text-ink-900">scored report</span> like this sample. <span className="font-semibold text-brand-700">View sample</span></span>
    </button>
  );
}
