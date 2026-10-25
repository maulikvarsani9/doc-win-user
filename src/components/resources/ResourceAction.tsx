"use client";

import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { TextField, SelectField, Honeypot } from "@/components/leads/fields";
import { FormSuccess, SubmitRow } from "@/components/leads/FormParts";
import { useLeadForm, rules, type FormValues } from "@/components/leads/useLeadForm";
import { btn } from "@/components/ui-kit";
import { media, type Resource } from "@/lib/cms-types";
import { actionLabel } from "./ResourceCard";

const roles = ["Physician / practice owner", "Practice manager", "Marketing lead", "Executive / leadership", "Other"];
const validate = (v: FormValues) => {
  const errs: Record<string, string> = {};
  rules.required(v, ["name", "email", "organization"], errs);
  rules.email(v, errs);
  return errs;
};

function GatedForm({ r }: { r: Resource }) {
  const formId = "resource-lead";
  const { state, errors, message, name, result, onSubmit } = useLeadForm("resource", validate);
  if (state === "success")
    return (
      <FormSuccess formId={formId} title={`Thanks${name ? `, ${name}` : ""}. Your copy is ready.`}>
        <a href={media(result.file_url)} className={btn("primary", "md", "mt-4")} download data-testid="resource-download-link"><Download aria-hidden /> Download {r.file_name ? "the file" : "now"}</a>
      </FormSuccess>
    );
  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-4" data-testid="resource-gated-form">
      <Honeypot />
      <input type="hidden" name="resource_slug" value={r.slug} />
      <TextField formId={formId} name="name" label="Full name" required autoComplete="name" error={errors.name} />
      <TextField formId={formId} name="email" type="email" label="Work email" required autoComplete="email" error={errors.email} />
      <TextField formId={formId} name="organization" label="Practice or organization" required autoComplete="organization" error={errors.organization} />
      <SelectField formId={formId} name="role" label="Your role" options={roles} />
      <label className="flex cursor-pointer items-start gap-3 text-[13.5px] leading-relaxed text-ink-600" htmlFor={`${formId}-consent`}>
        <input id={`${formId}-consent`} name="marketing_consent" type="checkbox" className="mt-1 size-4 shrink-0 accent-brand-600" data-testid={`${formId}-consent-checkbox`} />
        <span>Send me occasional healthcare marketing insights. Optional, and you can unsubscribe at any time.</span>
      </label>
      <SubmitRow formId={formId} label={actionLabel(r)} busy={state === "submitting"} error={state === "error" ? message : undefined} />
    </form>
  );
}

export function ResourceAction({ r }: { r: Resource }) {
  const shell = "rounded-[1.5rem] bg-white p-6 shadow-[0_30px_70px_-40px_rgba(11,25,44,0.45)] ring-1 ring-ink-900/[0.07] sm:p-8";
  if (r.delivery === "gated")
    return (
      <div className={shell} data-testid="resource-action-gated">
        <p className="font-display text-[1.4rem] leading-tight text-ink-900">Get your free copy</p>
        <p className="mb-6 mt-2 text-[14.5px] text-ink-600">Fill in your details and the download appears instantly.</p>
        <GatedForm r={r} />
      </div>
    );
  if (r.delivery === "download")
    return (
      <div className={shell} data-testid="resource-action-download">
        <p className="font-display text-[1.4rem] leading-tight text-ink-900">Free download</p>
        {r.file_name && <p className="mt-2 break-all text-[13.5px] text-ink-500">{r.file_name}</p>}
        <a href={media(r.file_url)} download className={btn("primary", "lg", "mt-6 w-full")} data-testid="resource-download-btn"><Download aria-hidden /> {actionLabel(r)}</a>
      </div>
    );
  if (r.delivery === "external")
    return (
      <div className={shell} data-testid="resource-action-external">
        <p className="font-display text-[1.4rem] leading-tight text-ink-900">Open this resource</p>
        <a href={r.external_url} target="_blank" rel="noopener noreferrer" className={btn("primary", "lg", "mt-6 w-full")} data-testid="resource-external-btn">{actionLabel(r)} <ExternalLink aria-hidden /></a>
      </div>
    );
  return (
    <div className={shell} data-testid="resource-action-page">
      <p className="font-display text-[1.4rem] leading-tight text-ink-900">Want this applied to your practice?</p>
      <p className="mt-2 text-[14.5px] text-ink-600">Get a free audit of the touchpoints patients use to choose you.</p>
      <Link href="/free-marketing-audit/" className={btn("signal", "lg", "mt-6 w-full")} data-testid="resource-audit-btn">Get My Free Marketing Audit</Link>
    </div>
  );
}
