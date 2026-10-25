"use client";

import { TextField, SelectField, Honeypot } from "./fields";
import { FormSuccess, SubmitRow } from "./FormParts";
import { useLeadForm, rules, type FormValues } from "./useLeadForm";
import { ebook } from "@/content/home";
import { btn } from "@/components/ui-kit";

const roles = ["Physician / practice owner", "Practice manager", "Marketing lead", "Executive / leadership", "Other"];

const validate = (v: FormValues) => {
  const errs: Record<string, string> = {};
  rules.required(v, ["name", "email", "organization"], errs);
  rules.email(v, errs);
  return errs;
};

export function EbookForm({ formId = "ebook" }: { formId?: string }) {
  const { state, errors, message, name, onSubmit } = useLeadForm("ebook", validate);

  if (state === "success")
    return (
      <FormSuccess formId={formId} dark title={`Thanks${name ? `, ${name}` : ""}. Your request is saved.`}>
        {ebook.pdfUrl ? (
          <a href={ebook.pdfUrl} className={btn("signal", "md", "mt-4")} data-testid={`${formId}-download-link`} download>Download the guide (PDF)</a>
        ) : (
          <p data-testid={`${formId}-pdf-pending`}>The guide PDF is being finalized. The download link will appear here once DocWin uploads it.</p>
        )}
      </FormSuccess>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2" data-testid={`${formId}-form`}>
      <Honeypot />
      <TextField formId={formId} dark name="name" label="Full name" required autoComplete="name" error={errors.name} />
      <TextField formId={formId} dark name="email" type="email" label="Work email" required autoComplete="email" error={errors.email} />
      <TextField formId={formId} dark name="organization" label="Practice or organization" required autoComplete="organization" error={errors.organization} />
      <SelectField formId={formId} dark name="role" label="Your role" options={roles} />
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-brand-100 sm:col-span-2" htmlFor={`${formId}-consent`}>
        <input id={`${formId}-consent`} name="marketing_consent" type="checkbox" className="mt-1 size-4 shrink-0 accent-signal-500" data-testid={`${formId}-consent-checkbox`} />
        <span>Yes, send me occasional healthcare marketing insights from DocWin Digital. You can unsubscribe at any time. (Optional: not required to get the guide.)</span>
      </label>
      <div className="sm:col-span-2">
        <SubmitRow formId={formId} dark label="Download Your Free Guide" busy={state === "submitting"} error={state === "error" ? message : undefined} />
      </div>
    </form>
  );
}
