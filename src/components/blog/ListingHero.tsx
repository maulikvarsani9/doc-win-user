import Link from "next/link";
import { Search, X } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui-kit";
import { Breadcrumbs, type Crumb } from "@/components/hubs/Breadcrumbs";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  action: string;
  q?: string;
  hidden?: Record<string, string | undefined>;
  placeholder: string;
  testId: string;
};

export function ListingHero({ crumbs, eyebrow, title, lead, action, q, hidden = {}, placeholder, testId }: Props) {
  return (
    <section className="border-b border-ink-900/[0.06] bg-paper" data-testid={testId}>
      <Container className="pb-10 pt-6 sm:pb-14 sm:pt-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="reveal min-w-0 lg:col-span-7">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="display-1 mt-5 lg:text-[3.6rem]" data-testid={`${testId}-heading`}>{title}</h1>
            <p className="lead mt-5 max-w-2xl">{lead}</p>
          </div>
          <form action={action} method="get" role="search" className="reveal reveal-2 min-w-0 lg:col-span-5" data-testid={`${testId}-search`}>
            {Object.entries(hidden).map(([k, v]) => (v ? <input key={k} type="hidden" name={k} value={v} /> : null))}
            <label htmlFor={`${testId}-q`} className="sr-only">Search</label>
            <div className="flex h-14 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 ring-1 ring-ink-900/10 transition-shadow focus-within:ring-2 focus-within:ring-brand-600">
              <Search aria-hidden className="size-4.5 shrink-0 text-ink-400" />
              <input id={`${testId}-q`} name="q" type="search" defaultValue={q} placeholder={placeholder} maxLength={100}
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink-900 outline-none placeholder:text-ink-400" data-testid={`${testId}-search-input`} />
              {q && (
                <Link href={action} aria-label="Clear search" className="grid size-9 place-items-center rounded-full text-ink-500 hover:bg-ink-900/5" data-testid={`${testId}-search-clear`}><X aria-hidden className="size-4" /></Link>
              )}
              <button type="submit" className="h-11 shrink-0 rounded-full bg-ink-900 px-5 text-[14px] font-semibold text-white hover:bg-ink-800" data-testid={`${testId}-search-submit`}>Search</button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
