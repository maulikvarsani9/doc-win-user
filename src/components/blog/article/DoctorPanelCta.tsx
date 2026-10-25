import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Ctas } from "@/lib/cms";
import { btn } from "@/components/ui-kit";
import { FaceStack } from "@/components/team/FaceStack";

export function DoctorPanelCta({ cta, faces }: { cta: Ctas["doctor"]; faces: { slug: string; avatar: string }[] }) {
  return (
    <aside className="relative my-12 overflow-hidden rounded-[1.5rem] bg-ink-900 p-6 text-white sm:p-9" data-testid="blog-doctor-panel-cta">
      <span aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
      <div className="relative flex flex-wrap items-center gap-4">
        {faces.length > 0 && <FaceStack people={faces.slice(0, 7)} ring="ring-ink-900" size="size-10" />}
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white" data-testid="blog-doctor-panel-capsule">
          <ShieldCheck aria-hidden className="size-4 text-signal-400" />{cta.capsule}
        </span>
      </div>
      <p className="relative mt-6 max-w-[30ch] font-display text-[1.5rem] leading-[1.18] tracking-[-0.015em] sm:text-[1.85rem]">{cta.headline}</p>
      <p className="relative mt-4 max-w-2xl text-[15.5px] leading-[1.65] text-ink-200">{cta.body}</p>
      {cta.supporting && <p className="relative mt-4 border-l-2 border-signal-500 pl-4 text-[15px] italic leading-[1.6] text-white">{cta.supporting}</p>}
      <Link href={cta.href} className={btn("light", "md", "relative mt-7 w-full sm:w-auto")} data-testid="blog-doctor-panel-cta-button">{cta.button} <ArrowRight aria-hidden /></Link>
      {cta.note && <p className="relative mt-5 text-[12.5px] leading-[1.55] text-ink-300">{cta.note}</p>}
    </aside>
  );
}
