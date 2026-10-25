"use client";

import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fmtIst, isFuture } from "@/lib/ist";

export const inputCls = "block w-full rounded-lg border border-ink-200 bg-white px-3 text-[14px] text-ink-900 outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

const variants = {
  primary: "bg-ink-900 text-white hover:bg-ink-800",
  brand: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-ink-800 ring-1 ring-ink-900/15 hover:ring-ink-900/30",
  danger: "bg-white text-rose-700 ring-1 ring-rose-200 hover:bg-rose-50",
  ghost: "text-ink-700 hover:bg-ink-900/5",
};
export const btnCls = (v: keyof typeof variants = "primary", size: "sm" | "md" = "md", extra?: string) =>
  cn("inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition-[background-color,box-shadow,color] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    size === "sm" ? "h-8 px-3 text-[13px]" : "h-10 px-4 text-[14px]", variants[v], extra);

export function Field({ label, hint, count, max, children, className, group }: { label: string; hint?: React.ReactNode; count?: number; max?: number; children: React.ReactNode; className?: string; group?: boolean }) {
  const Tag = group ? "div" : "label";
  return (
    <Tag className={cn("block", className)}>
      <span className="mb-1.5 flex items-baseline justify-between gap-3 text-[13px] font-semibold text-ink-800">
        {label}
        {max !== undefined && <span className={cn("text-[12px] font-medium tabular-nums", (count ?? 0) > max ? "text-rose-600" : "text-ink-400")}>{count ?? 0}/{max}</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[12.5px] leading-snug text-ink-500">{hint}</span>}
    </Tag>
  );
}

export function Input({ className, ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={cn(inputCls, "h-10", className)} />;
}

export function TextArea({ className, ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...p} className={cn(inputCls, "py-2.5 leading-[1.55]", className)} />;
}

export function SelectInput({ value, onChange, options, placeholder, testId }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string; testId: string }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={cn(inputCls, "h-10 pr-8")} data-testid={testId}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Toggle({ label, hint, checked, onChange, testId }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void; testId: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span>
        <span className="block text-[13.5px] font-semibold text-ink-800">{label}</span>
        {hint && <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-500">{hint}</span>}
      </span>
      <Switch.Root checked={checked} onCheckedChange={onChange} aria-label={label} data-testid={testId}
        className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-ink-200 transition-colors duration-200 data-[state=checked]:bg-brand-600">
        <Switch.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow transition-transform duration-200 data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
    </div>
  );
}

export function Card({ title, action, children, testId, className }: { title?: string; action?: React.ReactNode; children: React.ReactNode; testId?: string; className?: string }) {
  return (
    <section className={cn("rounded-xl bg-white p-5 ring-1 ring-ink-900/[0.08]", className)} data-testid={testId}>
      {title && <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink-500">{title}</h2>{action}</div>}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function PageHeader({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 px-5 pb-6 pt-8 sm:px-8">
      <div>
        <h1 className="text-[1.6rem] font-medium tracking-[-0.015em] text-ink-900" data-testid="admin-page-title">{title}</h1>
        {text && <p className="mt-1 text-[14px] text-ink-500">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status, at, testId }: { status?: string; at?: string | null; testId?: string }) {
  const scheduled = status === "published" && isFuture(at);
  const live = status === "published" && !scheduled;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[12px] font-semibold", live ? "bg-emerald-50 text-emerald-700" : scheduled ? "bg-amber-50 text-amber-800" : "bg-ink-100 text-ink-600")}
      title={scheduled ? `Goes live ${fmtIst(at!)}` : undefined} data-testid={testId}>
      <span className={cn("size-1.5 rounded-full", live ? "bg-emerald-500" : scheduled ? "bg-amber-500" : "bg-ink-400")} />{live ? "Published" : scheduled ? `Scheduled · ${fmtIst(at!)}` : "Draft"}
    </span>
  );
}

export function Confirm({ trigger, title, text, confirm = "Delete", onConfirm, testId }: { trigger: React.ReactNode; title: string; text: string; confirm?: string; onConfirm: () => void | Promise<void>; testId: string }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-[90] bg-ink-950/50 backdrop-blur-sm" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-[91] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl" data-testid={`${testId}-dialog`}>
          <AlertDialog.Title className="text-[1.15rem] font-semibold text-ink-900">{title}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-[14px] leading-relaxed text-ink-600">{text}</AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel className={btnCls("secondary")} data-testid={`${testId}-cancel`}>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action className={btnCls("primary", "md", "bg-rose-600 hover:bg-rose-700")} onClick={() => onConfirm()} data-testid={`${testId}-confirm`}>{confirm}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export function Loading({ label = "Loading…" }: { label?: string }) {
  return <div className="grid min-h-[40vh] place-items-center text-[14px] text-ink-500" data-testid="admin-loading"><span className="inline-flex items-center gap-2"><Loader2 className="size-4 animate-spin" />{label}</span></div>;
}

export function useDraft<T>(initial: T | undefined) {
  const [form, setForm] = useState<T | undefined>(initial);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (initial && !form) setForm(initial);
  }, [initial, form]);
  const set = <K extends keyof T>(key: K, value: T[K]) => {
    setForm((f) => (f ? { ...f, [key]: value } : f));
    setDirty(true);
  };
  const reset = (next: T) => {
    setForm(next);
    setDirty(false);
  };
  return { form, set, reset, dirty };
}

export function useUnsavedGuard(dirty: boolean, onSave: () => void) {
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); onSave(); }
    };
    window.addEventListener("beforeunload", warn);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("beforeunload", warn); window.removeEventListener("keydown", key); };
  }, [dirty, onSave]);
}
