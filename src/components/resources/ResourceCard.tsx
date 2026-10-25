import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Lock } from "lucide-react";
import { media, type ResourceCard as Card } from "@/lib/cms-types";

export const resourceHref = (slug: string) => `/resources/${slug}/`;
const LABELS = { gated: "Get the free copy", download: "Download free", external: "Open resource", page: "Read the guide" };
export const actionLabel = (r: Card) => r.cta_label || LABELS[r.delivery];

function Cover({ r, className }: { r: Card; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-paper ${className}`}>
      {r.cover_image ? (
        <Image src={media(r.cover_image)} alt={r.cover_alt || ""} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-contain p-6 drop-shadow-[0_18px_30px_rgba(11,25,44,0.25)] transition-transform duration-500 group-hover:scale-[1.04] sm:p-8" />
      ) : (
        <span aria-hidden className="absolute inset-0 grid place-items-center text-brand-600"><FileText className="size-12" /></span>
      )}
    </div>
  );
}

function Pills({ r, dark }: { r: Card; dark?: boolean }) {
  return (
    <span className="flex flex-wrap items-center gap-2">
      {r.type && <span className={dark ? "rounded-full bg-signal-500 px-2.5 py-1 text-[12px] font-semibold text-ink-900" : "rounded-full bg-brand-100 px-2.5 py-1 text-[12px] font-semibold text-brand-700"}>{r.type.name}</span>}
      {r.delivery === "gated" && <span className={`inline-flex items-center gap-1 text-[12px] font-medium ${dark ? "text-ink-300" : "text-ink-500"}`}><Lock aria-hidden className="size-3" /> Free with email</span>}
    </span>
  );
}

export function ResourceCard({ r, testId }: { r: Card; testId: string }) {
  return (
    <Link href={resourceHref(r.slug)} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-ink-900/[0.07] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(11,25,44,0.4)]" data-testid={testId}>
      <Cover r={r} className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Pills r={r} />
        <h3 className="mt-4 font-display text-[1.15rem] font-medium leading-[1.3] tracking-[-0.012em] text-ink-900 group-hover:text-brand-700 sm:text-[1.25rem]">{r.title}</h3>
        {r.description && <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-[1.6] text-ink-600">{r.description}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-brand-700">{actionLabel(r)} <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function FeaturedResource({ r, testId }: { r: Card; testId: string }) {
  return (
    <Link href={resourceHref(r.slug)} className="group grid h-full overflow-hidden rounded-[1.5rem] bg-ink-900 text-white transition-transform duration-300 hover:-translate-y-1 sm:grid-cols-5 sm:rounded-[2rem]" data-testid={testId}>
      <Cover r={r} className="aspect-[4/3] bg-ink-800 sm:col-span-2 sm:aspect-auto sm:min-h-[260px]" />
      <div className="flex flex-col p-6 sm:col-span-3 sm:p-8">
        <Pills r={r} dark />
        <h3 className="mt-4 font-display text-[1.35rem] leading-[1.2] tracking-[-0.015em] text-white sm:text-[1.6rem]">{r.title}</h3>
        {r.description && <p className="mt-3 line-clamp-3 text-[14.5px] leading-[1.65] text-ink-300">{r.description}</p>}
        <span className="mt-auto flex items-center justify-between gap-4 pt-6 text-[14px] font-semibold">
          {actionLabel(r)}
          <span className="grid size-10 place-items-center rounded-full bg-white text-ink-900 transition-transform duration-300 group-hover:-rotate-45"><ArrowUpRight aria-hidden className="size-4" /></span>
        </span>
      </div>
    </Link>
  );
}
