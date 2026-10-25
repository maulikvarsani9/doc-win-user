"use client";

import Link from "next/link";
import { ArrowLeft, Eye, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { isFuture } from "@/lib/ist";
import { Confirm, StatusBadge, btnCls } from "./ui";

type Props = {
  back: string; backLabel: string; heading: string; status?: string; at?: string | null; dirty: boolean; busy: string | null; isNew: boolean; prefix: string; live?: string;
  onSave: () => void; onPublish?: () => void; onUnpublish?: () => void; onDelete: () => void; onPreview?: () => void; deleteText?: string;
};

const spin = (on: boolean) => (on ? <Loader2 className="animate-spin" /> : null);

export function EditorBar(p: Props) {
  const publishable = !!p.onPublish;
  const published = p.status === "published";
  const scheduled = isFuture(p.at);
  const saveLabel = !publishable ? "Save" : published ? "Save changes" : "Save draft";
  return (
    <div className="z-30 border-b border-ink-900/[0.08] bg-white lg:sticky lg:top-0" data-testid={`${p.prefix}-editor-bar`}>
      <div className="flex min-h-16 flex-wrap items-center gap-3 px-5 py-3 sm:px-8">
        <Link href={p.back} className={btnCls("ghost", "sm", "-ml-2")} data-testid={`${p.prefix}-back`}><ArrowLeft />{p.backLabel}</Link>
        <span className="hidden h-5 w-px bg-ink-900/10 sm:block" />
        <p className="text-[14px] font-semibold text-ink-900">{p.heading}</p>
        {publishable && !p.isNew && <StatusBadge status={p.status} at={p.at} testId={`${p.prefix}-status`} />}
        {p.dirty && <span className="text-[12.5px] font-medium text-signal-700" data-testid={`${p.prefix}-unsaved`}>Unsaved changes</span>}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          {!p.isNew && (
            <Confirm testId={`${p.prefix}-delete`} title="Delete permanently?" text={p.deleteText ?? "This can't be undone. If it was published, its URL will stop working."} onConfirm={p.onDelete}
              trigger={<button type="button" className={btnCls("danger", "sm")} aria-label="Delete" data-testid={`${p.prefix}-delete-btn`}><Trash2 /></button>} />
          )}
          {((published && !scheduled) || !publishable) && p.live && !p.isNew && <a href={p.live} target="_blank" rel="noreferrer" className={btnCls("ghost", "sm")} data-testid={`${p.prefix}-view-live`}><ExternalLink />View live</a>}
          {p.onPreview && <button type="button" onClick={p.onPreview} disabled={!!p.busy} className={btnCls("secondary", "sm")} data-testid={`${p.prefix}-preview-btn`}>{spin(p.busy === "preview") ?? <Eye />}Preview</button>}
          {published && p.onUnpublish && <button type="button" onClick={p.onUnpublish} disabled={!!p.busy} className={btnCls("secondary", "sm")} data-testid={`${p.prefix}-unpublish-btn`}>{spin(p.busy === "unpublish")}{scheduled ? "Unschedule" : "Unpublish"}</button>}
          <button type="button" onClick={p.onSave} disabled={!!p.busy} className={btnCls(published || !publishable ? "primary" : "secondary", "sm")} data-testid={`${p.prefix}-save-btn`}>{spin(p.busy === "save")}{saveLabel}</button>
          {publishable && !published && <button type="button" onClick={p.onPublish} disabled={!!p.busy} className={btnCls("brand", "sm")} data-testid={`${p.prefix}-publish-btn`}>{spin(p.busy === "publish")}{scheduled ? "Schedule" : "Publish"}</button>}
        </div>
      </div>
    </div>
  );
}
