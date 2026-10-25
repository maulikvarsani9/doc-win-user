"use client";

import { brandTitle } from "@/lib/seo";
import { Field, Input, TextArea } from "./ui";

type Props = {
  title: string; description: string; fallbackTitle: string; fallbackDescription: string; path: string; prefix: string;
  onTitle: (v: string) => void; onDescription: (v: string) => void;
};

export function SeoFields(p: Props) {
  const shownTitle = p.title ? brandTitle(p.title) : p.fallbackTitle;
  return (
    <>
      <Field label="SEO title" count={p.title.length} max={60} hint="Optional. Leave empty to use the default title shown below.">
        <Input value={p.title} onChange={(e) => p.onTitle(e.target.value)} placeholder={p.fallbackTitle} maxLength={120} data-testid={`${p.prefix}-seo-title-input`} />
      </Field>
      <Field label="Meta description" count={p.description.length} max={160} hint="Optional. Leave empty to use the summary.">
        <TextArea value={p.description} onChange={(e) => p.onDescription(e.target.value)} placeholder={p.fallbackDescription} maxLength={320} data-testid={`${p.prefix}-seo-description-input`} />
      </Field>
      <div className="rounded-lg bg-ink-50 p-3.5 ring-1 ring-ink-900/[0.05]" data-testid={`${p.prefix}-serp-preview`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">Search preview</p>
        <p className="mt-2 truncate text-[12px] text-emerald-700">docwindigital.com{p.path}</p>
        <p className="mt-0.5 line-clamp-2 text-[15px] leading-snug text-[#1a0dab]">{shownTitle || "Untitled"}</p>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink-600">{p.description || p.fallbackDescription || "Add a summary or meta description."}</p>
      </div>
    </>
  );
}
