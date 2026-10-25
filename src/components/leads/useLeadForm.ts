"use client";

import { useState, type FormEvent } from "react";
import { submitLead, type LeadType } from "@/lib/leads";

export type FormValues = Record<string, string>;
type Validator = (v: FormValues) => Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const rules = {
  required: (v: FormValues, keys: string[], errs: Record<string, string>) =>
    keys.forEach((k) => { if (!v[k]?.trim()) errs[k] = "This field is required."; }),
  email: (v: FormValues, errs: Record<string, string>) => {
    if (v.email && !EMAIL.test(v.email.trim())) errs.email = "Enter a valid email address.";
  },
};

export function useLeadForm(type: LeadType, validate: Validator) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ file_url?: string }>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: FormValues = {};
    fd.forEach((val, key) => { values[key] = String(val); });
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const field = e.currentTarget.elements.namedItem(Object.keys(errs)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    setState("submitting");
    try {
      const { marketing_consent, ...rest } = values;
      setResult(await submitLead(type, { ...rest, marketing_consent: marketing_consent === "on", source_path: window.location.pathname }));
      setName(values.name?.split(" ")[0] ?? "");
      setState("success");
    } catch (err) {
      setMessage((err as Error).message);
      setState("error");
    }
  };

  return { state, errors, message, name, result, onSubmit };
}
