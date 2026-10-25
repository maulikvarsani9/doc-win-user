"use client";

import { useCallback, useState } from "react";
import { EMPTY_RESOURCE, type AdminResource } from "@/lib/admin-types";
import { slugify } from "@/lib/admin-api";
import { Card, Field, Loading, TextArea, useUnsavedGuard } from "../ui";
import { useEntity } from "../useEntity";
import { EditorBar } from "../EditorBar";
import { TitleFields } from "../TitleFields";
import { RichEditor } from "../editor/RichEditor";
import { ResourceSidebar } from "./ResourceSidebar";

const check = (f: AdminResource) => (!f.title.trim() ? "Add a title before saving." : !f.type_id ? "Choose a resource type before saving." : null);

export function ResourceEditor({ id }: { id?: string }) {
  const e = useEntity<AdminResource>("/admin/resources", "/admin/resources", id, EMPTY_RESOURCE, check);
  const [autoSlug, setAutoSlug] = useState(!id);
  const onSave = useCallback(() => e.actions.save(), [e.actions]);
  useUnsavedGuard(e.dirty, onSave);
  if (e.missing) return <Loading label="This resource no longer exists." />;
  if (!e.form) return <Loading />;
  const f = e.form;
  const onTitle = (v: string) => { e.set("title", v); if (autoSlug) e.set("slug", slugify(v)); };
  return (
    <div data-testid="admin-resource-editor">
      <EditorBar prefix="admin-resource" back="/admin/resources/" backLabel="Resources" heading={id ? "Edit resource" : "New resource"} status={f.status} dirty={e.dirty} busy={e.busy}
        isNew={!f.id} live={`/resources/${f.slug}/`} onSave={e.actions.save} onPublish={e.actions.publish} onUnpublish={e.actions.unpublish} onDelete={e.actions.remove} />
      <div className="grid gap-5 px-5 py-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="min-w-0 space-y-5">
          <TitleFields prefix="admin-resource" titleLabel="Resource title" base="/resources/" title={f.title} slug={f.slug} autoSlug={autoSlug} setAutoSlug={setAutoSlug}
            published={f.status === "published"} lastSlug={e.lastSlug} onTitle={onTitle} onSlug={(v) => e.set("slug", v)} />
          <Card title="Summary" testId="admin-resource-summary">
            <Field label="Short description" count={f.description.length} max={220} hint="Shown on resource cards and under the title.">
              <TextArea value={f.description} onChange={(ev) => e.set("description", ev.target.value)} maxLength={600} data-testid="admin-resource-description-input" />
            </Field>
          </Card>
          <div>
            <p className="mb-2 text-[13px] font-semibold text-ink-800">Page content <span className="font-normal text-ink-500">(optional: what's inside, who it's for)</span></p>
            <RichEditor key={f.id ?? "new"} value={f.body_html} onChange={(v) => e.set("body_html", v)} testId="admin-resource-body-editor" minHeight={260}
              placeholder="Optional. Describe what's inside, who it's for and how to use it…" />
          </div>
        </div>
        <ResourceSidebar form={f} set={e.set} />
      </div>
    </div>
  );
}
