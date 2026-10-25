"use client";

import { Lock, Unlock } from "lucide-react";
import { slugify } from "@/lib/admin-api";
import { Field, Input } from "./ui";

type Props = {
  title: string; subtitle?: string; slug: string; base: string; prefix: string; autoSlug: boolean; published: boolean; lastSlug?: string; titleLabel: string;
  onTitle: (v: string) => void; onSubtitle?: (v: string) => void; onSlug: (v: string) => void; setAutoSlug: (v: boolean) => void;
};

export function TitleFields(p: Props) {
  const moved = p.published && p.lastSlug && p.lastSlug !== p.slug;
  return (
    <div className="space-y-4 rounded-xl bg-white p-5 ring-1 ring-ink-900/[0.08] sm:p-6">
      <textarea value={p.title} rows={1} onChange={(e) => p.onTitle(e.target.value.replace(/\n/g, " "))} placeholder={p.titleLabel} maxLength={200}
        className="block w-full resize-none bg-transparent text-[1.6rem] font-medium leading-tight tracking-[-0.015em] text-ink-900 outline-none [field-sizing:content] placeholder:text-ink-300 sm:text-[1.9rem]"
        data-testid={`${p.prefix}-title-input`} />
      {p.onSubtitle && (
        <textarea value={p.subtitle} rows={1} onChange={(e) => p.onSubtitle!(e.target.value.replace(/\n/g, " "))} placeholder="Subtitle (optional): one sentence that expands on the title" maxLength={300}
          className="block w-full resize-none bg-transparent text-[1.05rem] leading-snug text-ink-600 outline-none [field-sizing:content] placeholder:text-ink-300"
          data-testid={`${p.prefix}-subtitle-input`} />
      )}
      <Field label="URL" hint={moved ? "The old URL will permanently redirect to this new one." : p.autoSlug ? "Generated from the title. Click the lock to edit it." : undefined}>
        <div className="flex items-center gap-2">
          <span className="flex h-10 min-w-0 flex-1 items-center rounded-lg border border-ink-200 bg-ink-50 pl-3 text-[13.5px] text-ink-500 focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-600/10">
            <span className="hidden shrink-0 sm:inline">docwindigital.com{p.base}</span>
            <Input value={p.slug} readOnly={p.autoSlug} onChange={(e) => p.onSlug(slugify(e.target.value) + (e.target.value.endsWith("-") ? "-" : ""))}
              className="h-9 min-w-0 flex-1 border-0 bg-transparent px-1 focus:ring-0 read-only:text-ink-500" data-testid={`${p.prefix}-slug-input`} />
            <span className="pr-3">/</span>
          </span>
          <button type="button" onClick={() => p.setAutoSlug(!p.autoSlug)} aria-label={p.autoSlug ? "Edit URL manually" : "Generate URL from title"} title={p.autoSlug ? "Edit URL manually" : "Generate URL from title"}
            className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-500 ring-1 ring-ink-900/10 hover:text-ink-900" data-testid={`${p.prefix}-slug-lock`}>
            {p.autoSlug ? <Lock className="size-4" /> : <Unlock className="size-4" />}
          </button>
        </div>
      </Field>
    </div>
  );
}
