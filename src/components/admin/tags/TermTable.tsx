"use client";

import { useState, type FormEvent } from "react";
import useSWR from "swr";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { send, slugify } from "@/lib/admin-api";
import type { AdminTerm } from "@/lib/admin-types";
import type { Term, TermKind } from "@/lib/cms-types";
import { Confirm, Input, Loading, btnCls } from "../ui";
import { TermDialog } from "./TermDialog";

const NOUN = { topic: "topic", speciality: "speciality", resource_type: "resource type" } as const;

function Row({ t, count, onEdit, onDelete }: { t: AdminTerm; count: number; onEdit: () => void; onDelete: () => void }) {
  return (
    <tr className="border-t border-ink-900/[0.06]" data-testid={`admin-term-row-${t.slug}`}>
      <td className="px-4 py-3 font-semibold text-ink-900">{t.name}</td>
      <td className="px-4 py-3 text-ink-500">{t.slug}</td>
      <td className="px-4 py-3 tabular-nums text-ink-600" data-testid={`admin-term-count-${t.slug}`}>{count}</td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          <button type="button" onClick={onEdit} className={btnCls("ghost", "sm")} aria-label={`Edit ${t.name}`} data-testid={`admin-term-edit-${t.slug}`}><Pencil /></button>
          <Confirm testId={`admin-term-delete-${t.slug}`} title={`Delete “${t.name}”?`} text="It will be removed from every post and resource that uses it." onConfirm={onDelete}
            trigger={<button type="button" className={btnCls("ghost", "sm", "text-rose-600")} aria-label={`Delete ${t.name}`} data-testid={`admin-term-delete-${t.slug}-btn`}><Trash2 /></button>} />
        </div>
      </td>
    </tr>
  );
}

export function TermTable({ kind }: { kind: TermKind }) {
  const { data, mutate } = useSWR<AdminTerm[]>(`/admin/terms?kind=${kind}`);
  const { data: counts = [], mutate: recount } = useSWR<Term[]>(`/public/terms?kind=${kind}&scope=${kind === "resource_type" ? "resources" : "posts"}`);
  const [editing, setEditing] = useState<AdminTerm | null>(null);
  const [name, setName] = useState("");
  const refresh = () => { mutate(); recount(); };
  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await send("/admin/terms", "POST", { kind, name: name.trim(), slug: slugify(name), description: "", order: data?.length ?? 0, seo_title: "", seo_description: "" });
      setName("");
      toast.success(`Added “${name.trim()}”`);
      refresh();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };
  const remove = async (t: AdminTerm) => {
    try {
      await send(`/admin/terms/${t.id}`, "DELETE");
      toast.success("Deleted");
      refresh();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };
  const count = (id?: string) => counts.find((c) => c.id === id)?.count ?? 0;
  return (
    <div className="space-y-4" data-testid={`admin-terms-${kind}`}>
      <form onSubmit={add} className="flex max-w-lg gap-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={`New ${NOUN[kind]} name`} aria-label={`New ${NOUN[kind]}`} data-testid={`admin-term-new-${kind}-input`} />
        <button type="submit" className={btnCls("brand")} data-testid={`admin-term-new-${kind}-btn`}><Plus />Add</button>
      </form>
      {!data ? <Loading /> : (
        <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-ink-900/[0.08]">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Published uses</th><th className="px-4 py-3" /></tr>
            </thead>
            <tbody>{data.map((t) => <Row key={t.id} t={t} count={count(t.id)} onEdit={() => setEditing(t)} onDelete={() => remove(t)} />)}</tbody>
          </table>
        </div>
      )}
      {editing && <TermDialog key={editing.id} term={editing} open onOpenChange={(o) => !o && setEditing(null)} onSaved={refresh} />}
    </div>
  );
}
