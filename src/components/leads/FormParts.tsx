"use client";

import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { btn } from "@/components/ui-kit";
import { cn } from "@/lib/utils";

export function FormSuccess({ formId, title, children, dark }: { formId: string; title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div role="status" data-testid={`${formId}-success`} className={cn("rounded-2xl p-6", dark ? "bg-white/10 text-white" : "bg-brand-50 text-ink-900")}>
      <CheckCircle2 aria-hidden className={cn("size-8", dark ? "text-signal-400" : "text-brand-600")} />
      <p className="mt-4 font-display text-xl font-medium">{title}</p>
      <div className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-brand-100" : "text-ink-600")}>{children}</div>
    </div>
  );
}

export function SubmitRow({ formId, label, busy, error, dark, note }: { formId: string; label: string; busy: boolean; error?: string; dark?: boolean; note?: React.ReactNode }) {
  return (
    <div className="space-y-4">
      {error && (
        <p role="alert" data-testid={`${formId}-error`} className={cn("rounded-xl px-4 py-3 text-sm font-medium", dark ? "bg-white/10 text-signal-200" : "bg-red-50 text-red-700")}>
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className={btn(dark ? "signal" : "primary", "lg", "w-full")} data-testid={`${formId}-submit`}>
        {busy && <Loader2 aria-hidden className="animate-spin" />}
        {busy ? "Sending…" : label}
      </button>
      <p className={cn("text-xs leading-relaxed", dark ? "text-brand-100" : "text-ink-500")}>
        {note ?? "Please don't include patient or personal health information."}{" "}
        We use your details only to respond to you. See our{" "}
        <Link href="/privacy-policy/" className="underline underline-offset-2">Privacy Policy</Link>.
      </p>
    </div>
  );
}
