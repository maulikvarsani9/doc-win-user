import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { media, type Ctas } from "@/lib/cms-types";
import { btn } from "@/components/ui-kit";

type Audit = Ctas["audit"];

function Collage({ images }: { images: string[] }) {
  const shown = images.slice(0, 3);
  const pos = ["left-0 top-6 -rotate-6", "left-1/2 top-0 -translate-x-1/2 z-10", "right-0 top-6 rotate-6"];
  return (
    <div aria-hidden className="relative mx-auto h-[190px] w-full max-w-[300px] sm:h-[220px]">
      {shown.map((src, i) => (
        <div key={src + i} className={`absolute w-[46%] overflow-hidden rounded-lg bg-white shadow-[0_18px_40px_-18px_rgba(11,25,44,0.5)] ring-1 ring-ink-900/10 ${pos[shown.length === 1 ? 1 : i]}`}>
          <Image src={media(src)} alt="" width={300} height={400} className="aspect-[3/4] h-auto w-full object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

export function InlineAuditCta({ cta }: { cta: Audit }) {
  return (
    <aside className="my-12 grid items-center gap-6 overflow-hidden rounded-[1.5rem] bg-paper p-6 ring-1 ring-ink-900/[0.06] sm:p-8 md:grid-cols-12" data-testid="blog-incontent-audit-cta">
      <div className="md:col-span-7">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-signal-700">Free marketing audit</p>
        <p className="mt-3 font-display text-[1.45rem] leading-[1.2] tracking-[-0.015em] text-ink-900 sm:text-[1.65rem]">{cta.inline_headline}</p>
        <p className="mt-3 text-[15px] leading-[1.65] text-ink-600">{cta.inline_body}</p>
        <Link href={cta.href} className={btn("signal", "md", "mt-6 w-full sm:w-auto")} data-testid="blog-incontent-audit-cta-button">{cta.inline_button} <ArrowRight aria-hidden /></Link>
      </div>
      {cta.images.length > 0 && <div className="md:col-span-5"><Collage images={cta.images} /></div>}
    </aside>
  );
}

export function SidebarAuditCta({ cta }: { cta: Audit }) {
  return (
    <aside className="overflow-hidden rounded-[1.5rem] bg-ink-900 p-6 text-white" data-testid="blog-sticky-sidebar-audit-cta">
      {cta.images[0] && (
        <div className="relative -mx-6 -mt-6 mb-6 h-36 overflow-hidden bg-ink-800">
          <Image src={media(cta.images[0])} alt="" width={600} height={400} className="absolute left-1/2 top-5 w-[62%] -translate-x-1/2 rotate-[-4deg] rounded-md shadow-2xl" />
        </div>
      )}
      <p className="font-display text-[1.3rem] leading-[1.2] tracking-[-0.012em]">{cta.sidebar_headline}</p>
      <p className="mt-2.5 text-[14px] font-medium text-signal-300">{cta.sidebar_subheadline}</p>
      <p className="mt-3 flex gap-2 text-[14px] leading-[1.55] text-ink-200"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-400" />{cta.sidebar_body}</p>
      <Link href={cta.href} className={btn("signal", "md", "mt-6 w-full")} data-testid="blog-sidebar-audit-cta-button">{cta.sidebar_button} <ArrowRight aria-hidden /></Link>
    </aside>
  );
}
