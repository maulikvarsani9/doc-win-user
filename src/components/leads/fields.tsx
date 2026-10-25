"use client";

import { cn } from "@/lib/utils";

const base =
  "mt-1.5 block w-full rounded-xl border px-4 text-[15px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-ink-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/15";
const light = "border-ink-200 bg-white text-ink-900";
const dark = "border-white/20 bg-white text-ink-900";

interface FieldProps {
  formId: string;
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  dark?: boolean;
  className?: string;
}

function Shell({ formId, name, label, error, required, dark: isDark, className, children }: FieldProps & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`${formId}-${name}`} className={cn("text-sm font-semibold", isDark ? "text-white" : "text-ink-800")}>
        {label}
        {required && <span className={isDark ? "text-signal-300" : "text-signal-700"}> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${formId}-${name}-error`} className={cn("mt-1.5 text-sm font-medium", isDark ? "text-signal-200" : "text-red-700")} data-testid={`${formId}-${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

const aria = (p: FieldProps) => ({
  id: `${p.formId}-${p.name}`,
  name: p.name,
  "aria-invalid": p.error ? true : undefined,
  "aria-describedby": p.error ? `${p.formId}-${p.name}-error` : undefined,
  "data-testid": `${p.formId}-${p.name}-input`,
});

export function TextField(p: FieldProps & { type?: string; autoComplete?: string; placeholder?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"] }) {
  return (
    <Shell {...p}>
      <input {...aria(p)} type={p.type ?? "text"} autoComplete={p.autoComplete} placeholder={p.placeholder} inputMode={p.inputMode} className={cn(base, "h-12", p.dark ? dark : light)} />
    </Shell>
  );
}

export function SelectField(p: FieldProps & { options: string[] | { value: string; label: string }[]; placeholder?: string }) {
  const opts = p.options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <Shell {...p}>
      <select {...aria(p)} defaultValue="" className={cn(base, "h-12 appearance-none pr-10", p.dark ? dark : light)} style={{ backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", backgroundSize: "16px", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235B7190' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
        <option value="" disabled>{p.placeholder ?? "Select"}</option>
        {opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Shell>
  );
}

export function TextAreaField(p: FieldProps & { placeholder?: string }) {
  return (
    <Shell {...p}>
      <textarea {...aria(p)} rows={4} maxLength={2000} placeholder={p.placeholder} className={cn(base, "min-h-[112px] py-3", p.dark ? dark : light)} />
    </Shell>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>Leave this field empty<input type="text" name="company_fax" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}
