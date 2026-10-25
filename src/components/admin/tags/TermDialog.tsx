"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { send, slugify, SLUG_RE } from "@/lib/admin-api";
import type { AdminTerm } from "@/lib/admin-types";
import { Field, Input, TextArea, btnCls } from "../ui";
import { SeoFields } from "../SeoFields";

const PATH = { topic: "/blogs/topic/", speciality: "/blogs/speciality/", resource_type: "/resources/?type=" } as const;

export function TermDialog({ term, open, onOpenChange, onSaved }: { term: AdminTerm; open: boolean; onOpenChange: (o: boolean) => void; onSaved: () => void }) {
  const [f, setF] = useState(term);
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof AdminTerm>(k: K, v: AdminTerm[K]) => setF((x) => ({ ...x, [k]: v }));
  const save = async () => {
    if (!f.name.trim() || !SLUG_RE.test(f.slug)) return toast.error("Add a name and a valid URL slug.");
    setBusy(true);
    try {
      await send(`/admin/terms/${f.id}`, "PUT", f);
      toast.success("Saved");
      onSaved();
      onOpenChange(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const blog = f.kind !== "resource_type";
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[90] bg-ink-950/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[91] max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" data-testid="admin-term-dialog">
          <Dialog.Title className="text-[1.15rem] font-semibold text-ink-900">Edit {f.name}</Dialog.Title>
          <Dialog.Description className="sr-only">Edit the name, URL and description.</Dialog.Description>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name"><Input value={f.name} onChange={(e) => set("name", e.target.value)} data-testid="admin-term-name-input" /></Field>
            <Field label="URL slug" hint={`${PATH[f.kind]}${f.slug}`}><Input value={f.slug} onChange={(e) => set("slug", slugify(e.target.value))} data-testid="admin-term-slug-input" /></Field>
          </div>
          {blog && <Field label="Description" hint="Shown at the top of the category page."><TextArea value={f.description} onChange={(e) => set("description", e.target.value)} maxLength={600} data-testid="admin-term-description-input" /></Field>}
          <Field label="Display order"><Input type="number" value={f.order} onChange={(e) => set("order", Number(e.target.value) || 0)} data-testid="admin-term-order-input" /></Field>
          {blog && (
            <SeoFields prefix="admin-term" title={f.seo_title} description={f.seo_description} path={`${PATH[f.kind]}${f.slug}/`} onTitle={(v) => set("seo_title", v)} onDescription={(v) => set("seo_description", v)}
              fallbackTitle={f.kind === "topic" ? `${f.name}: Healthcare Marketing Articles | DocWin Digital` : `Marketing for ${f.name}: Articles | DocWin Digital`} fallbackDescription={f.description} />
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Dialog.Close className={btnCls("secondary")} data-testid="admin-term-cancel">Cancel</Dialog.Close>
            <button type="button" onClick={save} disabled={busy} className={btnCls("primary")} data-testid="admin-term-save">{busy && <Loader2 className="animate-spin" />}Save</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
