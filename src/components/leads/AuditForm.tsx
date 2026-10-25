"use client";

import { TextField, SelectField, Honeypot } from "./fields";
import { FormSuccess, SubmitRow } from "./FormParts";
import { useLeadForm, rules, type FormValues } from "./useLeadForm";
import { countryOptions } from "@/content/countries";
import { specialtyOptions } from "@/content/audiences";

const validate = (v: FormValues) => {
  const errs: Record<string, string> = {};
  rules.required(v, ["name", "email", "organization", "website", "specialty", "country"], errs);
  rules.email(v, errs);
  if (v.website && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v.website.trim())) errs.website = "Enter your website address, e.g. yourpractice.com";
  return errs;
};

export function AuditForm({ formId = "audit", dark }: { formId?: string; dark?: boolean }) {
  const { state, errors, message, name, onSubmit } = useLeadForm("audit", validate);

  if (state === "success")
    return (
      <FormSuccess formId={formId} dark={dark} title={`Request received${name ? `, ${name}` : ""}.`}>
        Our team will review your website, listings and online presence, then email you to share the findings.
      </FormSuccess>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2" data-testid={`${formId}-form`}>
      <Honeypot />
      <TextField formId={formId} dark={dark} name="name" label="Full name" required autoComplete="name" error={errors.name} />
      <TextField formId={formId} dark={dark} name="email" type="email" label="Work email" required autoComplete="email" error={errors.email} />
      <TextField formId={formId} dark={dark} name="organization" label="Practice or organization" required autoComplete="organization" error={errors.organization} />
      <TextField formId={formId} dark={dark} name="website" label="Website" required inputMode="url" placeholder="yourpractice.com" error={errors.website} />
      <SelectField formId={formId} dark={dark} name="specialty" label="Specialty or organization type" required options={specialtyOptions} error={errors.specialty} />
      <SelectField formId={formId} dark={dark} name="country" label="Country" required options={countryOptions} error={errors.country} />
      <div className="sm:col-span-2">
        <SubmitRow formId={formId} dark={dark} label="Request My Free Audit" busy={state === "submitting"} error={state === "error" ? message : undefined} />
      </div>
    </form>
  );
}
