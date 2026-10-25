"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Check, Database, MapPin, MessagesSquare, MousePointerClick, Star, ArrowRight } from "lucide-react";
import { Container, ArrowLink, btn } from "@/components/ui-kit";
import { cn } from "@/lib/utils";
import type { serviceTabs } from "@/content/home";

type Tab = (typeof serviceTabs)[number];
const tabIcons = { reputation: Star, "local-search": MapPin, social: MessagesSquare, "paid-ads": MousePointerClick, "patient-data": Database } as const;

function Panel({ t, index, total }: { t: Tab; index: number; total: number }) {
  const Icon = tabIcons[t.id as keyof typeof tabIcons];
  return (
    <div className="grid overflow-hidden rounded-[1.5rem] sm:rounded-[2.25rem] bg-paper lg:grid-cols-12">
      <div className="relative aspect-[4/3] lg:col-span-6 lg:aspect-auto lg:min-h-[520px]">
        <Image src={t.image} alt={t.alt} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover" />
        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-[0_20px_40px_-20px_rgba(11,25,44,0.5)] backdrop-blur sm:right-auto">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><Check aria-hidden className="size-4" strokeWidth={3} /></span>
          <span className="min-w-0">
            <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-500">{t.chip.label}</span>
            <span className="block text-[14px] font-semibold text-ink-900">{t.chip.value}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-12 lg:col-span-6 lg:p-16">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-white text-brand-600 shadow-sm"><Icon aria-hidden className="size-5" /></span>
          <span className="font-display text-[13px] font-semibold tabular-nums text-ink-500">0{index + 1} / 0{total}</span>
        </div>
        <h3 className="display-3 mt-6 sm:mt-7">{t.title}</h3>
        <p className="lead mt-4">{t.summary}</p>
        <ul className="mt-6 space-y-3.5 sm:mt-8 sm:space-y-4">
          {t.points.map((p) => (
            <li key={p} className="flex gap-3 text-[15.5px] leading-snug text-ink-800 sm:gap-3.5 sm:text-[16px]">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-signal-500 text-ink-900"><Check aria-hidden className="size-3.5" strokeWidth={3} /></span>
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 border-t border-ink-900/10 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:pt-7">
          {t.links.map((l) => <ArrowLink key={l.href} href={l.href} testId={`services-panel-link-${l.href.split("/")[2]}`}>{l.label}</ArrowLink>)}
        </div>
      </div>
    </div>
  );
}

export function ServicesShowcase({ tabs }: { tabs: readonly Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    setActive(tabs[i].id);
    refs.current[i]?.focus();
    refs.current[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    go((map[e.key] + tabs.length) % tabs.length);
  };

  return (
    <section id="services-overview" className="bg-white pb-16 pt-14 sm:pb-24 sm:pt-4 lg:pb-32" data-testid="home-services">
      <Container>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-2 lg:col-span-7">
            Medicine Is Hard. <span className="text-brand-600">Marketing Shouldn&apos;t Be.</span>
          </h2>
          <div className="lg:col-span-5 lg:pl-6">
            <p className="lead">Focus on patient care while we handle your marketing. Every service is built specifically for healthcare providers.</p>
            <Link href="/services/" className={btn("outline", "md", "mt-6 sm:mt-7")} data-testid="services-view-all">View All Services <ArrowRight aria-hidden /></Link>
          </div>
        </div>

        <div className="tab-fade -mx-5 px-5 mt-10 sm:mx-0 sm:px-0 sm:mt-14">
          <div role="tablist" aria-label="Featured services" className="no-scrollbar flex w-max max-w-full gap-1 overflow-x-auto rounded-full bg-ink-100/80 p-1.5">
            {tabs.map((t, i) => {
              const Icon = tabIcons[t.id as keyof typeof tabIcons];
              const on = active === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => { refs.current[i] = el; }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] sm:px-5 sm:text-[14.5px] font-semibold transition-[background-color,color,box-shadow] duration-200",
                    on ? "bg-white text-ink-900 shadow-[0_2px_10px_-3px_rgba(11,25,44,0.25)]" : "text-ink-600 hover:text-ink-900",
                  )}
                  data-testid={`services-tab-${t.id}`}
                >
                  <Icon aria-hidden className={cn("size-4", on ? "text-brand-600" : "text-ink-400")} />
                  {t.tab}
                </button>
              );
            })}
          </div>
        </div>

        {tabs.map((t, i) => (
          <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={active !== t.id} className="mt-5 duration-500 sm:mt-6 animate-in fade-in slide-in-from-bottom-2" data-testid={`services-panel-${t.id}`}>
            <Panel t={t} index={i} total={tabs.length} />
          </div>
        ))}
      </Container>
    </section>
  );
}
