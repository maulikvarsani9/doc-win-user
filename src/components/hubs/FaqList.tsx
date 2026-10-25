import { Plus } from "lucide-react";
import type { Faq } from "@/content/types";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-ink-900/[0.08] border-y border-ink-900/[0.08]" data-testid="faq-list">
      {faqs.map((f, i) => (
        <details key={f.q} className="group py-6" data-testid={`faq-item-${i}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-medium leading-snug text-ink-900 sm:text-xl [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-ink-900/15 transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-ink-900 group-open:text-white">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
