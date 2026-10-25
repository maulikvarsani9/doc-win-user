import { cn } from "@/lib/utils";

type Stat = { id: string; value: string; label: string };

export function StatBand({ stats, className, testId = "stat-band" }: { stats: Stat[]; className?: string; testId?: string }) {
  return (
    <dl
      className={cn("grid divide-x divide-ink-900/[0.08] rounded-2xl bg-white py-3.5 ring-1 ring-ink-900/[0.07] sm:py-4", stats.length === 2 ? "grid-cols-2" : "grid-cols-3", className)}
      data-testid={testId}
    >
      {stats.map((s) => (
        <div key={s.id} className="min-w-0 px-3 sm:px-5" data-testid={`${testId}-${s.id}`}>
          <dt className="sr-only">{s.label}</dt>
          <dd className="font-display text-[1.35rem] leading-none tracking-[-0.01em] text-brand-600 sm:text-[1.6rem]">{s.value}</dd>
          <dd className="mt-1.5 text-[11.5px] leading-snug text-ink-500 sm:text-[12.5px]">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StatChips({ stats, className, testId = "stat-chips" }: { stats: Stat[]; className?: string; testId?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} data-testid={testId}>
      {stats.map((s) => (
        <li key={s.id} className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-[13px] ring-1 ring-ink-900/[0.07]" data-testid={`${testId}-${s.id}`}>
          <span className="font-display text-[15px] text-brand-600">{s.value}</span>
          <span className="text-ink-600">{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
