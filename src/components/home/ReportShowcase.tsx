import Image from "next/image";
import { TrendingUp } from "lucide-react";
import { sampleReport } from "@/content/home";
import { cn } from "@/lib/utils";

const pageStyles = [
  "left-[47%] w-[39%] -bottom-[26%] rotate-[9deg] group-hover:translate-x-[7%] group-hover:rotate-[12deg]",
  "left-[28%] w-[42%] -bottom-[20%] rotate-[3deg] group-hover:translate-x-[3%] group-hover:rotate-[5deg]",
  "left-[7%] w-[46%] -bottom-[14%] -rotate-[4deg] group-hover:-translate-y-[4%] group-hover:-rotate-[5deg]",
];
const chip = "absolute z-20 flex items-center gap-3 rounded-2xl bg-white shadow-[0_24px_50px_-20px_rgba(11,25,44,0.5)] ring-1 ring-ink-900/[0.06]";

function ScoreChip() {
  return (
    <div className={cn(chip, "right-3 top-3 p-2.5 pr-3.5 sm:right-5 sm:top-5 sm:p-3 sm:pr-4")} data-testid="audit-sample-score">
      <span className="relative grid size-10 place-items-center sm:size-12">
        <svg viewBox="0 0 36 36" aria-hidden className="absolute inset-0 -rotate-90">
          <circle cx="18" cy="18" r="15" pathLength={100} fill="none" strokeWidth="3.5" className="stroke-ink-100" />
          <circle cx="18" cy="18" r="15" pathLength={100} fill="none" strokeWidth="3.5" strokeDasharray="46 100" strokeLinecap="round" className="stroke-signal-500" />
        </svg>
        <span className="font-display text-[14px] text-ink-900 sm:text-[16px]">46</span>
      </span>
      <span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500 sm:text-[10.5px]">Overall score</span>
        <span className="block text-[13px] font-semibold text-ink-900 sm:text-[14px]">Underperforming</span>
      </span>
    </div>
  );
}

function BenchmarkChip() {
  return (
    <div className={cn(chip, "-bottom-5 left-4 p-2.5 pr-4 sm:-bottom-6 sm:left-6 sm:p-3 sm:pr-5")} data-testid="audit-sample-benchmark">
      <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600 sm:size-10"><TrendingUp aria-hidden className="size-[18px]" /></span>
      <span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500 sm:text-[10.5px]">Top 5% benchmark</span>
        <span className="block text-[13px] font-semibold text-ink-900 sm:text-[14px]">87.5 out of 100</span>
      </span>
    </div>
  );
}

export function ReportShowcase({ className }: { className?: string }) {
  const pages = [...sampleReport.pages].reverse();
  return (
    <figure className={cn("reveal reveal-1 mx-auto w-full max-w-[560px]", className)} data-testid="sample-report-stack">
      <div className="group relative">
        <div className="panel-grid relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-brand-600 sm:rounded-[2.25rem]">
          <span aria-hidden className="absolute -right-[16%] -top-[34%] aspect-square w-[72%] rounded-full bg-brand-500/70" />
          <span className="absolute left-6 top-7 z-10 hidden rounded-full bg-white/10 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/20 sm:inline-flex">Sample report</span>
          {pages.map((p, i) => (
            <div key={p.src} className={cn("absolute aspect-[1100/1782] overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-25px_rgba(6,17,30,0.7)] ring-1 ring-black/5 transition-transform duration-500 ease-out", pageStyles[i])}>
              <Image src={p.src} alt={i === pages.length - 1 ? p.alt : ""} fill sizes="(min-width: 1024px) 270px, 48vw" className="object-cover object-top" />
            </div>
          ))}
        </div>
        <ScoreChip />
        <BenchmarkChip />
      </div>
      <figcaption className="mt-10 text-[12.5px] leading-relaxed text-ink-500 sm:mt-11">
        Pages from {sampleReport.name}, a sample prepared for a demonstration dental practice.
      </figcaption>
    </figure>
  );
}
