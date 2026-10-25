"use client";

import Link from "next/link";
import useSWR from "swr";
import type { AdminResource, AdminTerm } from "@/lib/admin-types";
import { Card, Field, Input, SelectInput, Toggle } from "../ui";
import { FileField, ImageField } from "../UploadFields";
import { TagPicker } from "../Pickers";
import { SeoFields } from "../SeoFields";
import { cn } from "@/lib/utils";

type Props = { form: AdminResource; set: <K extends keyof AdminResource>(k: K, v: AdminResource[K]) => void };

const DELIVERY = [
  { value: "gated", label: "Gated download", text: "Visitors enter name and email to get the file. Saved as a lead." },
  { value: "download", label: "Free download", text: "Anyone can download the file directly." },
  { value: "external", label: "External link", text: "Sends visitors to a tool or page elsewhere." },
  { value: "page", label: "Page only", text: "The content below is the resource." },
] as const;

function Delivery({ form, set }: Props) {
  const { data: types = [] } = useSWR<AdminTerm[]>("/admin/terms?kind=resource_type");
  return (
    <Card title="Type & delivery" testId="admin-resource-delivery">
      <Field label="Resource type" hint={<>Manage types in <Link href="/admin/tags/" className="font-semibold text-brand-700 hover:underline">Topics &amp; specialities</Link>.</>}>
        <SelectInput value={form.type_id} onChange={(v) => set("type_id", v)} options={types.map((t) => ({ value: t.id!, label: t.name }))} placeholder="Choose a type…" testId="admin-resource-type-select" />
      </Field>
      <div role="radiogroup" aria-label="Delivery" className="grid gap-2">
        {DELIVERY.map((d) => (
          <button key={d.value} type="button" role="radio" aria-checked={form.delivery === d.value} onClick={() => set("delivery", d.value)} data-testid={`admin-resource-delivery-${d.value}`}
            className={cn("rounded-lg px-3.5 py-2.5 text-left ring-1 transition-colors", form.delivery === d.value ? "bg-brand-50 ring-2 ring-brand-600" : "ring-ink-900/10 hover:ring-ink-900/25")}>
            <span className="block text-[13.5px] font-semibold text-ink-900">{d.label}</span>
            <span className="block text-[12.5px] text-ink-500">{d.text}</span>
          </button>
        ))}
      </div>
      {(form.delivery === "gated" || form.delivery === "download") && (
        <Field group label="File"><FileField url={form.file_url} name={form.file_name} onChange={(url, name) => { set("file_url", url); set("file_name", name); }} testId="admin-resource-file" /></Field>
      )}
      {form.delivery === "external" && (
        <Field label="Link address"><Input type="url" value={form.external_url} onChange={(e) => set("external_url", e.target.value)} placeholder="https://" data-testid="admin-resource-external-input" /></Field>
      )}
      <Field label="Button label" hint="Optional. A sensible default is used if empty."><Input value={form.cta_label} onChange={(e) => set("cta_label", e.target.value)} maxLength={60} placeholder="Get the free copy" data-testid="admin-resource-cta-label-input" /></Field>
    </Card>
  );
}

export function ResourceSidebar({ form, set }: Props) {
  return (
    <div className="space-y-5">
      <Delivery form={form} set={set} />
      <Card title="Cover image" testId="admin-resource-cover-card">
        <ImageField aspect="aspect-[4/3]" value={form.cover_image} onChange={(v) => set("cover_image", v)} testId="admin-resource-cover" />
        {form.cover_image && <Field label="Alt text"><Input value={form.cover_alt} onChange={(e) => set("cover_alt", e.target.value)} maxLength={200} data-testid="admin-resource-cover-alt-input" /></Field>}
      </Card>
      <Card title="Topics & specialities" testId="admin-resource-tags">
        <Field group label="Topics"><TagPicker kind="topic" value={form.topic_ids} onChange={(v) => set("topic_ids", v)} testId="admin-resource-topics" /></Field>
        <Field group label="Specialities"><TagPicker kind="speciality" value={form.speciality_ids} onChange={(v) => set("speciality_ids", v)} testId="admin-resource-specialities" /></Field>
        <Toggle label="Featured resource" hint="Shown in the Featured row on the Resources page." checked={form.featured} onChange={(v) => set("featured", v)} testId="admin-resource-featured-toggle" />
      </Card>
      <Card title="SEO" testId="admin-resource-seo">
        <SeoFields prefix="admin-resource" title={form.seo_title} description={form.seo_description} fallbackTitle={form.title ? `${form.title} | DocWin Digital` : ""}
          fallbackDescription={form.description} path={`/resources/${form.slug || "your-resource"}/`} onTitle={(v) => set("seo_title", v)} onDescription={(v) => set("seo_description", v)} />
        <Toggle label="Hide from search engines" checked={form.noindex} onChange={(v) => set("noindex", v)} testId="admin-resource-noindex-toggle" />
      </Card>
    </div>
  );
}
