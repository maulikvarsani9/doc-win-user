"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { toast } from "sonner";
import { fmtIst, isFuture } from "@/lib/ist";
import { send, SLUG_RE } from "@/lib/admin-api";
import { useDraft } from "./ui";

type Entity = { id?: string; slug: string; status?: string };

export function useEntity<T extends Entity>(api: string, admin: string, id: string | undefined, empty: T, check: (f: T) => string | null) {
  const router = useRouter();
  const { data, error } = useSWR<T>(id ? `${api}/${id}` : null);
  const { form, set, reset: resetDraft, dirty } = useDraft<T>(id ? data : empty);
  const [busy, setBusy] = useState<string | null>(null);
  const [savedSlug, setSavedSlug] = useState<string>();
  const ref = useRef(form);
  ref.current = form;
  const lastSlug = savedSlug ?? data?.slug;

  const reset = (doc: T) => {
    resetDraft(doc);
    setSavedSlug(doc.slug);
    mutate(`${api}/${doc.id}`, doc, false);
  };

  const save = async (): Promise<T | null> => {
    const f = ref.current!;
    const problem = check(f) ?? (SLUG_RE.test(f.slug) ? null : "The URL slug can only use lowercase letters, numbers and single hyphens.");
    if (problem) {
      toast.error(problem);
      return null;
    }
    const saved = f.id ? await send<T>(`${api}/${f.id}`, "PUT", f) : await send<T>(api, "POST", f);
    reset(saved);
    if (!f.id) router.replace(`${admin}/${saved.id}/`);
    return saved;
  };

  const run = (label: string, fn: () => Promise<unknown>) => async () => {
    setBusy(label);
    try {
      await fn();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(null);
    }
  };

  const actions = {
    save: run("save", async () => { if (await save()) toast.success("Changes saved"); }),
    publish: run("publish", async () => {
      const s = await save();
      if (!s) return;
      const doc = await send<T>(`${api}/${s.id}/publish`, "POST");
      reset(doc);
      const at = (doc as { published_at?: string | null }).published_at;
      toast.success(isFuture(at) ? `Scheduled. It goes live on ${fmtIst(at!)}.` : "Published. It's live on the site now.");
    }),
    unpublish: run("unpublish", async () => {
      reset(await send<T>(`${api}/${ref.current!.id}/unpublish`, "POST"));
      toast.success("Unpublished. It's a draft again and hidden from the site.");
    }),
    remove: run("delete", async () => {
      await send(`${api}/${ref.current!.id}`, "DELETE");
      toast.success("Deleted");
      router.push(`${admin}/`);
    }),
  };

  return { form, set, dirty, busy, setBusy, save, actions, lastSlug, missing: !!error };
}
