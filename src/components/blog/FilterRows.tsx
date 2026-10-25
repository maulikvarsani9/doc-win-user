import Link from "next/link";
import type { Term } from "@/lib/cms";
import { cn } from "@/lib/utils";

export type ChipRow = { label: string; terms: Term[]; active?: string; href: (slug?: string) => string; testId: string; allLabel: string };

function Row({ label, terms, active, href, testId, allLabel }: ChipRow) {
  const chip = "inline-flex whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-200";
  return (
    <div className="flex min-w-0 items-center gap-3" data-testid={testId}>
      <span className="hidden w-28 shrink-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500 sm:block">{label}</span>
      <ul className="no-scrollbar -mx-5 -my-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:px-1" aria-label={label}>
        <li className="shrink-0"><Link href={href()} aria-current={!active ? "page" : undefined} className={cn(chip, !active ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-900/10 hover:ring-ink-900/30")} data-testid={`${testId}-all`}>{allLabel}</Link></li>
        {terms.map((t) => (
          <li key={t.slug} className="shrink-0">
            <Link href={href(t.slug)} aria-current={active === t.slug ? "page" : undefined}
              className={cn(chip, active === t.slug ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-900/10 hover:ring-ink-900/30")} data-testid={`${testId}-${t.slug}`}>
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FilterRows({ rows, testId }: { rows: ChipRow[]; testId: string }) {
  const visible = rows.filter((r) => r.terms.length);
  if (!visible.length) return null;
  return (
    <div className="space-y-3 border-b border-ink-900/[0.06] bg-white py-5 sm:py-6" data-testid={testId}>
      <div className="mx-auto max-w-[1240px] space-y-3 px-5 sm:px-8">
        {visible.map((r) => <Row key={r.testId} {...r} />)}
      </div>
    </div>
  );
}
