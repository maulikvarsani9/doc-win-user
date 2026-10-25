"use client";

import { useCallback, useState } from "react";
import useSWR, { mutate } from "swr";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { send } from "@/lib/admin-api";
import type { AdminAuthor, AdminCtas } from "@/lib/admin-types";
import { InlineAuditCta, SidebarAuditCta } from "@/components/blog/article/AuditCtas";
import { DoctorPanelCta } from "@/components/blog/article/DoctorPanelCta";
import { Card, Field, Input, Loading, PageHeader, SelectInput, TextArea, Toggle, btnCls, useDraft, useUnsavedGuard } from "@/components/admin/ui";
import { ImageField } from "@/components/admin/UploadFields";

type A = AdminCtas["audit"];
type D = AdminCtas["doctor"];

function AuditFields({ a, set }: { a: A; set: <K extends keyof A>(k: K, v: A[K]) => void }) {
  const img = (i: number, v: string) => { const next = [...a.images]; if (v) next[i] = v; else next.splice(i, 1); set("images", next.filter(Boolean)); };
  return (
    <>
      <Card title="In-article audit CTA" testId="admin-cta-inline">
        <Toggle label="Show inside articles" checked={a.inline_enabled} onChange={(v) => set("inline_enabled", v)} testId="admin-cta-inline-toggle" />
        <Field label="Place after section" hint="Appears before the next H2 after this many sections. Editors can also drop a CTA marker into the text."><Input type="number" min={1} max={20} value={a.inline_after_h2} onChange={(e) => set("inline_after_h2", Math.min(20, Math.max(1, Number(e.target.value) || 1)))} data-testid="admin-cta-inline-position" /></Field>
        <Field label="Headline"><Input value={a.inline_headline} onChange={(e) => set("inline_headline", e.target.value)} maxLength={120} data-testid="admin-cta-inline-headline" /></Field>
        <Field label="Body"><TextArea value={a.inline_body} onChange={(e) => set("inline_body", e.target.value)} maxLength={400} data-testid="admin-cta-inline-body" /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Button text"><Input value={a.inline_button} onChange={(e) => set("inline_button", e.target.value)} maxLength={60} data-testid="admin-cta-inline-button" /></Field>
          <Field label="Button link (all audit CTAs)"><Input value={a.href} onChange={(e) => set("href", e.target.value)} maxLength={300} data-testid="admin-cta-href" /></Field>
        </div>
        <Field group label="Report preview images">
          <div className="grid grid-cols-3 gap-3">{[0, 1, 2].map((i) => <ImageField key={i} aspect="aspect-[3/4]" value={a.images[i] ?? ""} onChange={(v) => img(i, v)} testId={`admin-cta-image-${i}`} />)}</div>
        </Field>
        <div className="rounded-xl bg-ink-50 p-4"><InlineAuditCta cta={a} /></div>
      </Card>
      <Card title="Sidebar & mobile audit CTA" testId="admin-cta-sidebar">
        <Toggle label="Show sticky sidebar on desktop" checked={a.sidebar_enabled} onChange={(v) => set("sidebar_enabled", v)} testId="admin-cta-sidebar-toggle" />
        <Field label="Headline"><Input value={a.sidebar_headline} onChange={(e) => set("sidebar_headline", e.target.value)} maxLength={120} data-testid="admin-cta-sidebar-headline" /></Field>
        <Field label="Subheadline"><Input value={a.sidebar_subheadline} onChange={(e) => set("sidebar_subheadline", e.target.value)} maxLength={200} data-testid="admin-cta-sidebar-subheadline" /></Field>
        <Field label="Body"><TextArea value={a.sidebar_body} onChange={(e) => set("sidebar_body", e.target.value)} maxLength={300} data-testid="admin-cta-sidebar-body" /></Field>
        <Field label="Button text"><Input value={a.sidebar_button} onChange={(e) => set("sidebar_button", e.target.value)} maxLength={60} data-testid="admin-cta-sidebar-button" /></Field>
        <Toggle label="Show floating button on mobile" checked={a.mobile_enabled} onChange={(v) => set("mobile_enabled", v)} testId="admin-cta-mobile-toggle" />
        <Field label="Mobile button text"><Input value={a.mobile_text} onChange={(e) => set("mobile_text", e.target.value)} maxLength={60} data-testid="admin-cta-mobile-text" /></Field>
        <div className="max-w-[300px]"><SidebarAuditCta cta={a} /></div>
      </Card>
    </>
  );
}

function DoctorFields({ d, set, faces }: { d: D; set: <K extends keyof D>(k: K, v: D[K]) => void; faces: { slug: string; avatar: string }[] }) {
  return (
    <Card title="Doctor panel CTA" testId="admin-cta-doctor">
      <Toggle label="Show in articles" checked={d.enabled} onChange={(v) => set("enabled", v)} testId="admin-cta-doctor-toggle" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Position"><SelectInput value={d.position} onChange={(v) => set("position", v as D["position"])} options={[{ value: "end", label: "End of article" }, { value: "after_h2", label: "After a section" }]} testId="admin-cta-doctor-position" /></Field>
        {d.position === "after_h2" && <Field label="After section"><Input type="number" min={1} max={20} value={d.after_h2} onChange={(e) => set("after_h2", Math.min(20, Math.max(1, Number(e.target.value) || 1)))} data-testid="admin-cta-doctor-after" /></Field>}
      </div>
      <Field label="Headline"><Input value={d.headline} onChange={(e) => set("headline", e.target.value)} maxLength={120} data-testid="admin-cta-doctor-headline" /></Field>
      <Field label="Body"><TextArea value={d.body} onChange={(e) => set("body", e.target.value)} maxLength={400} data-testid="admin-cta-doctor-body" /></Field>
      <Field label="Supporting statement"><Input value={d.supporting} onChange={(e) => set("supporting", e.target.value)} maxLength={300} data-testid="admin-cta-doctor-supporting" /></Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Trust capsule"><Input value={d.capsule} onChange={(e) => set("capsule", e.target.value)} maxLength={80} data-testid="admin-cta-doctor-capsule" /></Field>
        <Field label="Button text"><Input value={d.button} onChange={(e) => set("button", e.target.value)} maxLength={60} data-testid="admin-cta-doctor-button" /></Field>
        <Field label="Button link"><Input value={d.href} onChange={(e) => set("href", e.target.value)} maxLength={300} data-testid="admin-cta-doctor-href" /></Field>
      </div>
      <Field label="Small print"><Input value={d.note} onChange={(e) => set("note", e.target.value)} maxLength={300} data-testid="admin-cta-doctor-note" /></Field>
      <DoctorPanelCta cta={d} faces={faces} />
    </Card>
  );
}

export default function AdminCtasPage() {
  const { data } = useSWR<AdminCtas>("/admin/ctas");
  const { data: authors = [] } = useSWR<AdminAuthor[]>("/admin/authors");
  const { form, set, reset, dirty } = useDraft<AdminCtas>(data);
  const [busy, setBusy] = useState(false);
  const save = useCallback(async () => {
    if (!form) return;
    setBusy(true);
    try {
      const saved = await send<AdminCtas>("/admin/ctas", "PUT", form);
      reset(saved);
      mutate("/admin/ctas", saved, false);
      toast.success("CTAs saved. Articles use the new copy right away.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [form, reset]);
  useUnsavedGuard(dirty, save);
  if (!form) return <Loading />;
  const faces = authors.filter((a) => a.group === "panel" && a.show_on_team && a.avatar).map((a) => ({ slug: a.slug, avatar: a.avatar }));
  return (
    <div data-testid="admin-ctas-page">
      <PageHeader title="CTAs" text="Edit the conversion blocks used on every blog article. Each post can still switch them off individually."
        action={<button type="button" onClick={save} disabled={busy || !dirty} className={btnCls("brand")} data-testid="admin-ctas-save">{busy && <Loader2 className="animate-spin" />}Save CTAs</button>} />
      <div className="grid gap-5 px-5 pb-12 sm:px-8 2xl:grid-cols-2">
        <div className="space-y-5"><AuditFields a={form.audit} set={(k, v) => set("audit", { ...form.audit, [k]: v })} /></div>
        <div className="space-y-5"><DoctorFields d={form.doctor} faces={faces} set={(k, v) => set("doctor", { ...form.doctor, [k]: v })} /></div>
      </div>
    </div>
  );
}
