import Image from "next/image";
import { FileText } from "lucide-react";
import { sampleReport } from "@/content/home";
import { cn } from "@/lib/utils";

const layers = [
  "translate-x-[13%] translate-y-[3%] rotate-[7deg] opacity-90",
  "translate-x-[6.5%] translate-y-[1.5%] rotate-[3.5deg]",
  "",
];

export function SampleReportStack({ id, tone = "dark" }: { id?: string; tone?: "dark" | "light" }) {
  const pages = [...sampleReport.pages].reverse();
  return (
    <figure id={id} className="relative mx-auto w-full max-w-[300px] pr-[12%] sm:max-w-[440px]" data-testid="sample-report-stack">
      <div className="relative aspect-[595/964]">
        {pages.map((p, i) => (
          <div key={p.src} className={cn("absolute inset-0 overflow-hidden rounded-[1.1rem] bg-white shadow-[0_40px_70px_-35px_rgba(0,0,0,0.65)] ring-1 ring-black/5", layers[i])}>
            <Image src={p.src} alt={i === pages.length - 1 ? p.alt : ""} fill sizes="(min-width: 1024px) 400px, 80vw" className="object-cover object-top" />
          </div>
        ))}
        <div className="absolute -left-3 bottom-6 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-[0_24px_50px_-20px_rgba(11,25,44,0.55)] ring-1 ring-ink-900/5 sm:-left-10 sm:bottom-8 sm:p-3.5 sm:pr-5">
          <span className="grid size-10 place-items-center rounded-xl bg-signal-100 text-signal-700"><FileText aria-hidden className="size-[18px]" /></span>
          <span>
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">{sampleReport.name}</span>
            <span className="block text-[14px] font-semibold text-ink-900">18 pages · 50 micro-checks</span>
          </span>
        </div>
      </div>
      <figcaption className={cn("mt-6 text-[12.5px] leading-relaxed sm:mt-8", tone === "dark" ? "text-ink-300" : "text-ink-500")}>
        A sample report prepared for a demonstration dental practice.
      </figcaption>
    </figure>
  );
}
