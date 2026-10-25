import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pageWindow = (page: number, pages: number) => {
  const set = new Set([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
  const sorted = [...set].sort((a, b) => a - b);
  return sorted.flatMap((n, i) => (i && n - sorted[i - 1] > 1 ? ["gap" as const, n] : [n]));
};

export function Pagination({ page, pages, href, testId = "pagination" }: { page: number; pages: number; href: (p: number) => string; testId?: string }) {
  if (pages <= 1) return null;
  const item = "grid h-11 min-w-11 place-items-center rounded-full px-3 text-[14.5px] font-semibold transition-colors duration-200";
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1.5 sm:mt-16 sm:gap-2" data-testid={testId}>
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={cn(item, "text-ink-700 ring-1 ring-ink-900/10 hover:bg-ink-900/5")} aria-label="Previous page" data-testid={`${testId}-prev`}><ChevronLeft aria-hidden className="size-4" /></Link>
      ) : null}
      {pageWindow(page, pages).map((n, i) =>
        n === "gap" ? (
          <span key={`g${i}`} className="px-1 text-ink-400" aria-hidden>…</span>
        ) : n === page ? (
          <span key={n} aria-current="page" className={cn(item, "bg-ink-900 text-white")} data-testid={`${testId}-current`}>{n}</span>
        ) : (
          <Link key={n} href={href(n)} className={cn(item, "text-ink-700 hover:bg-ink-900/5")} data-testid={`${testId}-page-${n}`}>{n}</Link>
        ),
      )}
      {page < pages ? (
        <Link href={href(page + 1)} rel="next" className={cn(item, "text-ink-700 ring-1 ring-ink-900/10 hover:bg-ink-900/5")} aria-label="Next page" data-testid={`${testId}-next`}><ChevronRight aria-hidden className="size-4" /></Link>
      ) : null}
    </nav>
  );
}
