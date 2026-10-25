import Image from "next/image";
import { Stars } from "@/components/home/Testimonials";
import type { Testimonial } from "@/content/home";
import { cn } from "@/lib/utils";

export function CompactQuote({ t, className, testId }: { t: Testimonial; className?: string; testId: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-[1.25rem] bg-white p-5 ring-1 ring-ink-900/[0.07] sm:rounded-[1.5rem] sm:p-6", className)} data-testid={testId}>
      <Stars />
      <blockquote className="mt-3.5 flex-1 text-[14.5px] leading-[1.65] text-ink-700 sm:text-[15px]">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-900/[0.06] pt-4">
        <Image src={t.photo} alt={t.name} width={44} height={44} className="size-10 shrink-0 rounded-full object-cover ring-1 ring-ink-900/10 sm:size-11" />
        <span className="min-w-0">
          <span className="block text-[14px] font-medium text-ink-900" data-testid={`${testId}-name`}>{t.name}</span>
          <span className="block text-[12.5px] text-ink-500" data-testid={`${testId}-specialty`}>{t.specialty}, DocWin client</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function QuoteRow({ items, title = "What clients say", className, testId }: { items: Testimonial[]; title?: string; className?: string; testId: string }) {
  if (!items.length) return null;
  return (
    <div className={className} data-testid={testId}>
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">{title}</p>
      <div className={cn("mt-4 grid gap-3 sm:gap-5", items.length > 1 && "md:grid-cols-2")}>
        {items.map((t, i) => <CompactQuote key={t.name} t={t} testId={`${testId}-${i}`} className={items.length === 1 ? "md:max-w-2xl" : undefined} />)}
      </div>
    </div>
  );
}
