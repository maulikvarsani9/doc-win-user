"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { EMPTY_POST, type AdminPost } from "@/lib/admin-types";
import { slugify } from "@/lib/admin-api";
import { Loading, useUnsavedGuard } from "../ui";
import { useEntity } from "../useEntity";
import { EditorBar } from "../EditorBar";
import { TitleFields } from "../TitleFields";
import { RichEditor } from "../editor/RichEditor";
import { PostSidebar } from "./PostSidebar";

const check = (f: AdminPost) => (f.title.trim() ? null : "Add a title before saving.");

export function PostEditor({ id }: { id?: string }) {
  const e = useEntity<AdminPost>("/admin/posts", "/admin/posts", id, EMPTY_POST, check);
  const [autoSlug, setAutoSlug] = useState(!id);
  const onSave = useCallback(() => e.actions.save(), [e.actions]);
  useUnsavedGuard(e.dirty, onSave);
  if (e.missing) return <Loading label="This post no longer exists." />;
  if (!e.form) return <Loading />;
  const f = e.form;

  const preview = async () => {
    const win = window.open("", "_blank");
    e.setBusy("preview");
    try {
      const saved = await e.save();
      if (saved && win) win.location.href = `/admin/preview/posts/${saved.id}/`;
      else win?.close();
    } catch (err) {
      win?.close();
      toast.error((err as Error).message);
    } finally {
      e.setBusy(null);
    }
  };
  const onTitle = (v: string) => {
    e.set("title", v);
    if (autoSlug) e.set("slug", slugify(v));
  };

  return (
    <div data-testid="admin-post-editor">
      <EditorBar prefix="admin-post" back="/admin/posts/" backLabel="Posts" heading={id ? "Edit post" : "New post"} status={f.status} at={f.published_at} dirty={e.dirty} busy={e.busy} isNew={!f.id}
        live={`/blogs/${f.slug}/`} onSave={e.actions.save} onPublish={e.actions.publish} onUnpublish={e.actions.unpublish} onDelete={e.actions.remove} onPreview={preview} />
      <div className="grid gap-5 px-5 py-6 sm:px-8 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="min-w-0 space-y-5">
          <TitleFields prefix="admin-post" titleLabel="Article title" base="/blogs/" title={f.title} subtitle={f.subtitle} slug={f.slug} autoSlug={autoSlug} setAutoSlug={setAutoSlug}
            published={f.status === "published"} lastSlug={e.lastSlug} onTitle={onTitle} onSubtitle={(v) => e.set("subtitle", v)} onSlug={(v) => e.set("slug", v)} />
          <RichEditor key={f.id ?? "new"} value={f.content_html} onChange={(v) => e.set("content_html", v)} testId="admin-post-content-editor" />
        </div>
        <PostSidebar form={f} set={e.set} />
      </div>
    </div>
  );
}
