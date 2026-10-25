"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { send, slugify } from "@/lib/admin-api";
import type { AdminTerm } from "@/lib/admin-types";
import type { TermKind } from "@/lib/cms-types";
import { inputCls } from "./ui";
import { cn } from "@/lib/utils";

type Option = { id: string; label: string };
type Props = { options: Option[]; value: string[]; onChange: (v: string[]) => void; placeholder: string; testId: string; onCreate?: (label: string) => Promise<string | null> };

export function MultiPicker({ options, value, onChange, placeholder, testId, onCreate }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const byId = useMemo(() => new Map(options.map((o) => [o.id, o])), [options]);
  const term = q.trim().toLowerCase();
  const matches = options.filter((o) => !value.includes(o.id) && o.label.toLowerCase().includes(term)).slice(0, 8);
  const exact = options.some((o) => o.label.toLowerCase() === term);
  const add = (id: string) => { onChange([...value, id]); setQ(""); };
  const create = async () => {
    const id = await onCreate?.(q.trim());
    if (id) add(id);
  };
  return (
    <div className="relative" data-testid={testId}>
      {value.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-1.5">
          {value.map((id) => (
            <li key={id} className="inline-flex items-center gap-1 rounded-full bg-brand-50 py-1 pl-3 pr-1 text-[12.5px] font-semibold text-brand-800">
              {byId.get(id)?.label ?? "…"}
              <button type="button" aria-label={`Remove ${byId.get(id)?.label}`} onClick={() => onChange(value.filter((v) => v !== id))} className="grid size-5 place-items-center rounded-full hover:bg-brand-100" data-testid={`${testId}-remove-${id}`}><X className="size-3" /></button>
            </li>
          ))}
        </ul>
      )}
      <input value={q} onChange={(e) => setQ(e.target.value)} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} placeholder={placeholder}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (matches[0]) add(matches[0].id); else if (term && onCreate) create(); } }}
        className={cn(inputCls, "h-10")} data-testid={`${testId}-input`} />
      {open && (matches.length > 0 || (term && !exact && onCreate)) && (
        <ul className="absolute inset-x-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-lg bg-white p-1 shadow-xl ring-1 ring-ink-900/10" data-testid={`${testId}-options`}>
          {matches.map((o) => (
            <li key={o.id}><button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => add(o.id)} className="w-full rounded-md px-3 py-2 text-left text-[13.5px] text-ink-800 hover:bg-ink-900/[0.05]" data-testid={`${testId}-option-${o.id}`}>{o.label}</button></li>
          ))}
          {term && !exact && onCreate && (
            <li><button type="button" onMouseDown={(e) => e.preventDefault()} onClick={create} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[13.5px] font-semibold text-brand-700 hover:bg-brand-50" data-testid={`${testId}-create`}><Plus className="size-4" />Create “{q.trim()}”</button></li>
          )}
        </ul>
      )}
    </div>
  );
}

export function TagPicker({ kind, value, onChange, testId }: { kind: Exclude<TermKind, "resource_type">; value: string[]; onChange: (v: string[]) => void; testId: string }) {
  const { data = [], mutate } = useSWR<AdminTerm[]>(`/admin/terms?kind=${kind}`);
  const onCreate = async (name: string) => {
    try {
      const t = await send<AdminTerm>("/admin/terms", "POST", { kind, name, slug: slugify(name), description: "", order: data.length, seo_title: "", seo_description: "" });
      await mutate();
      toast.success(`${kind === "topic" ? "Topic" : "Speciality"} “${t.name}” created`);
      return t.id ?? null;
    } catch (e) {
      toast.error((e as Error).message);
      return null;
    }
  };
  return (
    <MultiPicker options={data.map((t) => ({ id: t.id!, label: t.name }))} value={value} onChange={onChange} onCreate={onCreate} testId={testId}
      placeholder={kind === "topic" ? "Search or create a topic…" : "Search or create a speciality…"} />
  );
}
