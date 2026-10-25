"use client";

import Link from "next/link";
import useSWR from "swr";
import type { AdminAuthor, AdminPost } from "@/lib/admin-types";
import { fmtIst, fromIst, isFuture, toIst } from "@/lib/ist";
import { Card, Field, Input, SelectInput, TextArea, Toggle } from "../ui";
import { ImageField } from "../UploadFields";
import { MultiPicker, TagPicker } from "../Pickers";
import { SeoFields } from "../SeoFields";

type Props = { form: AdminPost; set: <K extends keyof AdminPost>(k: K, v: AdminPost[K]) => void };

function People({ form, set }: Props) {
  const { data: authors = [] } = useSWR<AdminAuthor[]>("/admin/authors");
  const opts = authors.map((a) => ({ value: a.id!, label: `${a.name}${a.credential ? `, ${a.credential}` : ""}` }));
  return (
    <Card title="Author & review" testId="admin-post-people">
      <Field label="Author" hint={<>Manage people in <Link href="/admin/authors/" className="font-semibold text-brand-700 hover:underline">Authors &amp; team</Link>.</>}>
        <SelectInput value={form.author_id} onChange={(v) => set("author_id", v)} options={opts} placeholder="Choose an author…" testId="admin-post-author-select" />
      </Field>
      <Field label="Medical reviewer" hint="Shown as “Medically reviewed by” on the article.">
        <SelectInput value={form.reviewer_id} onChange={(v) => set("reviewer_id", v)} options={opts.filter((o) => o.value !== form.author_id)} placeholder="No medical reviewer" testId="admin-post-reviewer-select" />
      </Field>
      <PublishTime form={form} set={set} />
    </Card>
  );
}

function PublishTime({ form, set }: Props) {
  const [date, time] = toIst(form.published_at);
  const hint = isFuture(form.published_at) ? `Scheduled: goes live on ${fmtIst(form.published_at!)}.` : "Leave empty to publish immediately. Pick a future time to schedule.";
  return (
    <Field label="Publish date & time (IST)" hint={hint}>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Input type="date" value={date} onChange={(e) => set("published_at", fromIst(e.target.value, time))} data-testid="admin-post-date-input" />
        <Input type="time" value={time} disabled={!date} onChange={(e) => set("published_at", fromIst(date, e.target.value))} data-testid="admin-post-time-input" />
      </div>
    </Field>
  );
}

function Related({ form, set }: Props) {
  const { data: posts = [] } = useSWR<AdminPost[]>("/admin/posts?status=published");
  return (
    <Card title="Related articles" testId="admin-post-related">
      <MultiPicker options={posts.filter((p) => p.id !== form.id).map((p) => ({ id: p.id!, label: p.title }))} value={form.related_ids} onChange={(v) => set("related_ids", v.slice(0, 6))}
        placeholder="Search published articles…" testId="admin-post-related-picker" />
      <p className="text-[12.5px] text-ink-500">Optional. If you leave this empty, articles with the same topic or speciality are shown.</p>
    </Card>
  );
}

export function PostSidebar({ form, set }: Props) {
  return (
    <div className="space-y-5">
      <People form={form} set={set} />
      <Card title="Topics & specialities" testId="admin-post-tags">
        <Field group label="Topics"><TagPicker kind="topic" value={form.topic_ids} onChange={(v) => set("topic_ids", v)} testId="admin-post-topics" /></Field>
        <Field group label="Specialities"><TagPicker kind="speciality" value={form.speciality_ids} onChange={(v) => set("speciality_ids", v)} testId="admin-post-specialities" /></Field>
      </Card>
      <Card title="Cover image" testId="admin-post-cover-card">
        <ImageField value={form.cover_image} onChange={(v) => set("cover_image", v)} testId="admin-post-cover" />
        {form.cover_image && <Field label="Alt text" hint="Describe what the image shows."><Input value={form.cover_alt} onChange={(e) => set("cover_alt", e.target.value)} maxLength={200} data-testid="admin-post-cover-alt-input" /></Field>}
      </Card>
      <Card title="Placement" testId="admin-post-placement">
        <Toggle label="Featured article" hint="Shown in the Featured section of the blog." checked={form.featured} onChange={(v) => set("featured", v)} testId="admin-post-featured-toggle" />
        <Toggle label="Ultimate guide" hint="Adds an Ultimate guide badge and the Guides section." checked={form.ultimate_guide} onChange={(v) => set("ultimate_guide", v)} testId="admin-post-guide-toggle" />
      </Card>
      <Card title="Summary & SEO" testId="admin-post-seo">
        <Field label="Summary" count={form.excerpt.length} max={300} hint="Shown on cards. Leave empty to use the first paragraph.">
          <TextArea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} maxLength={400} data-testid="admin-post-excerpt-input" />
        </Field>
        <SeoFields prefix="admin-post" title={form.seo_title} description={form.seo_description} fallbackTitle={form.title ? `${form.title} | DocWin Digital` : ""}
          fallbackDescription={form.excerpt || form.subtitle} path={`/blogs/${form.slug || "your-article"}/`} onTitle={(v) => set("seo_title", v)} onDescription={(v) => set("seo_description", v)} />
        <Toggle label="Hide from search engines" hint="Adds noindex and leaves it out of the sitemap." checked={form.noindex} onChange={(v) => set("noindex", v)} testId="admin-post-noindex-toggle" />
      </Card>
      <Card title="Calls to action" testId="admin-post-ctas" action={<Link href="/admin/ctas/" className="text-[12.5px] font-semibold text-brand-700 hover:underline">Edit CTA copy</Link>}>
        <Toggle label="In-article audit CTA" checked={form.show_audit_inline} onChange={(v) => set("show_audit_inline", v)} testId="admin-post-cta-inline-toggle" />
        <Toggle label="Sidebar & mobile audit CTA" checked={form.show_audit_sidebar} onChange={(v) => set("show_audit_sidebar", v)} testId="admin-post-cta-sidebar-toggle" />
        <Toggle label="Doctor panel CTA" checked={form.show_doctor_panel} onChange={(v) => set("show_doctor_panel", v)} testId="admin-post-cta-doctor-toggle" />
      </Card>
      <Related form={form} set={set} />
    </div>
  );
}
