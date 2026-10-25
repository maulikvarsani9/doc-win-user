"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TocItem } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

function useActive(items: TocItem[], enabled: boolean) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (!enabled) return;
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-110px 0px -60% 0px" });
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [items, enabled]);
  return active;
}

function List({ items, active, testId, onPick }: { items: TocItem[]; active?: string; testId: string; onPick?: () => void }) {
  return (
    <ol className="space-y-0.5 border-l border-ink-900/10">
      {items.map((i, n) => (
        <li key={i.id}>
          <a href={`#${i.id}`} onClick={onPick} data-testid={`${testId}-link-${n}`}
            className={cn("-ml-px block border-l-2 py-1.5 text-[13.5px] leading-[1.45] transition-colors duration-200", i.level === 3 ? "pl-7" : "pl-4",
              active === i.id ? "border-brand-600 font-semibold text-ink-900" : "border-transparent text-ink-500 hover:text-ink-900")}>
            {i.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function Toc({ items, variant }: { items: TocItem[]; variant: "desktop" | "mobile" }) {
  const active = useActive(items, variant === "desktop");
  const [open, setOpen] = useState(false);
  if (variant === "mobile") {
    return (
      <div className="rounded-2xl bg-paper ring-1 ring-ink-900/[0.06]" data-testid="table-of-contents-mobile">
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between px-5 py-4 text-[14px] font-semibold text-ink-900" data-testid="table-of-contents-mobile-toggle">
          On this page
          <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
        </button>
        {open && <div className="px-5 pb-5"><List items={items} testId="toc-mobile" onPick={() => setOpen(false)} /></div>}
      </div>
    );
  }
  return (
    <nav aria-label="Table of contents" data-testid="table-of-contents-desktop">
      <p className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-500">On this page</p>
      <div className="max-h-[calc(100vh-180px)] overflow-y-auto pr-2"><List items={items} active={active} testId="toc-desktop" /></div>
    </nav>
  );
}
