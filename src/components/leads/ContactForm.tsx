"use client";

import { TextField, SelectField, TextAreaField, Honeypot } from "./fields";
import { FormSuccess, SubmitRow } from "./FormParts";
import { useLeadForm, rules, type FormValues } from "./useLeadForm";
import { services } from "@/content/services";

const serviceOptions = [...services.map((s) => s.name), "Not sure yet"];

const validate = (v: FormValues) => {
  const errs: Record<string, string> = {};
  rules.required(v, ["name", "email", "organization"], errs);
  rules.email(v, errs);
  return errs;
};

export function ContactForm({ formId = "contact" }: { formId?: string }) {
  const { state, errors, message, name, onSubmit } = useLeadForm("contact", validate);

  if (state === "success")
    return (
      <FormSuccess formId={formId} title={`Thank you${name ? `, ${name}` : ""}.`}>
        Your message has reached the DocWin team. We typically respond within 24 hours, by email, to arrange a time to talk.
      </FormSuccess>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2" data-testid={`${formId}-form`}>
      <Honeypot />
      <TextField formId={formId} name="name" label="Full name" required autoComplete="name" error={errors.name} />
      <TextField formId={formId} name="email" type="email" label="Work email" required autoComplete="email" error={errors.email} />
      <TextField formId={formId} name="organization" label="Practice or organization" required autoComplete="organization" error={errors.organization} />
      <SelectField formId={formId} name="service" label="Service of interest" options={serviceOptions} />
      <TextAreaField formId={formId} name="message" label="What would you like to achieve?" className="sm:col-span-2" placeholder="e.g. more new-patient enquiries, a new website, a second location" />
      <div className="sm:col-span-2">
        <SubmitRow formId={formId} label="Send Message" busy={state === "submitting"} error={state === "error" ? message : undefined} />
      </div>
    </form>
  );
}
