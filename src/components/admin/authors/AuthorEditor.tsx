"use client";

import { useCallback, useState } from "react";
import { EMPTY_AUTHOR, type AdminAuthor } from "@/lib/admin-types";
import { slugify } from "@/lib/admin-api";
import { Card, Field, Input, Loading, SelectInput, TextArea, Toggle, useUnsavedGuard } from "../ui";
import { useEntity } from "../useEntity";
import { EditorBar } from "../EditorBar";
import { ImageField } from "../UploadFields";
import { SeoFields } from "../SeoFields";

const GROUPS = [{ value: "founder", label: "Founder" }, { value: "panel", label: "Medical review panel" }, { value: "contributor", label: "Contributor" }];
const check = (f: AdminAuthor) => (f.name.trim() ? null : "Add the person's name.");

export function AuthorEditor({ id }: { id?: string }) {
  const e = useEntity<AdminAuthor>("/admin/authors", "/admin/authors", id, EMPTY_AUTHOR, check);
  const [autoSlug, setAutoSlug] = useState(!id);
  const [spec, setSpec] = useState<string>();
  const onSave = useCallback(() => e.actions.save(), [e.actions]);
  useUnsavedGuard(e.dirty, onSave);
  if (e.missing) return <Loading label="This person no longer exists." />;
  if (!e.form) return <Loading />;
  const f = e.form;
  const onName = (v: string) => { e.set("name", v); if (autoSlug) e.set("slug", slugify(v.replace(/^Dr\.?\s+/i, ""))); };

  return (
    <div data-testid="admin-author-editor">
      <EditorBar prefix="admin-author" back="/admin/authors/" backLabel="People" heading={id ? f.name || "Edit person" : "Add person"} dirty={e.dirty} busy={e.busy} isNew={!f.id}
        live={`/blogs/author/${f.slug}/`} onSave={e.actions.save} onDelete={e.actions.remove} deleteText="People who are the author or reviewer of a post can't be deleted until those posts are reassigned." />
      <div className="grid gap-5 px-5 py-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="space-y-5">
          <Card title="Profile" testId="admin-author-profile">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name"><Input value={f.name} onChange={(ev) => onName(ev.target.value)} placeholder="Dr. Jane Smith" data-testid="admin-author-name-input" /></Field>
              <Field label="Profile URL" hint={`docwindigital.com/blogs/author/${f.slug || "…"}/`}>
                <Input value={f.slug} onChange={(ev) => { setAutoSlug(false); e.set("slug", slugify(ev.target.value)); }} data-testid="admin-author-slug-input" />
              </Field>
              <Field label="Credentials"><Input value={f.credential} onChange={(ev) => e.set("credential", ev.target.value)} placeholder="MD, MS Orthopedics" data-testid="admin-author-credential-input" /></Field>
              <Field label="Role"><Input value={f.role} onChange={(ev) => e.set("role", ev.target.value)} placeholder="Medical Review Panel" data-testid="admin-author-role-input" /></Field>
              <Field label="Group"><SelectInput value={f.group} onChange={(v) => e.set("group", v as AdminAuthor["group"])} options={GROUPS} testId="admin-author-group-select" /></Field>
              <Field label="Display order" hint="Lower numbers appear first."><Input type="number" value={f.order} onChange={(ev) => e.set("order", Number(ev.target.value) || 0)} data-testid="admin-author-order-input" /></Field>
            </div>
            <Toggle label="Show on the Team page" hint="Founders and panel members appear on the Team, About and Home pages." checked={f.show_on_team} onChange={(v) => e.set("show_on_team", v)} testId="admin-author-team-toggle" />
          </Card>
          <Card title="About" testId="admin-author-about">
            <Field label="Short bio" count={f.bio.length} max={600} hint="Shown on the author page and article author card."><TextArea rows={4} value={f.bio} onChange={(ev) => e.set("bio", ev.target.value)} maxLength={1500} data-testid="admin-author-bio-input" /></Field>
            <Field label="Quote" hint="Optional. Used for founders on the Team and About pages."><TextArea value={f.quote} onChange={(ev) => e.set("quote", ev.target.value)} maxLength={600} data-testid="admin-author-quote-input" /></Field>
            <Field label="Specialties" hint="Separate with commas, e.g. Orthopedics, Sports medicine">
              <Input value={spec ?? f.specialties.join(", ")} onChange={(ev) => { setSpec(ev.target.value); e.set("specialties", ev.target.value.split(",").map((s) => s.trim()).filter(Boolean)); }} data-testid="admin-author-specialties-input" />
            </Field>
            <Field label="LinkedIn URL"><Input type="url" value={f.linkedin} onChange={(ev) => e.set("linkedin", ev.target.value)} placeholder="https://www.linkedin.com/in/…" data-testid="admin-author-linkedin-input" /></Field>
          </Card>
        </div>
        <div className="space-y-5">
          <Card title="Headshot" testId="admin-author-avatar-card">
            <ImageField round value={f.avatar} onChange={(v) => e.set("avatar", v)} testId="admin-author-avatar" />
            <p className="text-[12.5px] text-ink-500">A square, face-centred photo. Used in bylines and author pages.</p>
          </Card>
          <Card title="Team page portrait" testId="admin-author-photo-card">
            <ImageField aspect="aspect-[4/5]" value={f.photo} onChange={(v) => e.set("photo", v)} testId="admin-author-photo" />
            <p className="text-[12.5px] text-ink-500">Portrait used on the Team and About pages.</p>
          </Card>
          <Card title="Author page SEO" testId="admin-author-seo">
            <SeoFields prefix="admin-author" title={f.seo_title} description={f.seo_description} fallbackTitle={f.name ? `${f.name}${f.credential ? `, ${f.credential}` : ""}: Articles & Insights | DocWin Digital` : ""}
              fallbackDescription={f.bio} path={`/blogs/author/${f.slug || "name"}/`} onTitle={(v) => e.set("seo_title", v)} onDescription={(v) => e.set("seo_description", v)} />
          </Card>
        </div>
      </div>
    </div>
  );
}
