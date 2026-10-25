"use client";

import Link from "next/link";
import useSWR from "swr";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { fmtDate, send } from "@/lib/admin-api";
import type { AdminResource, AdminTerm } from "@/lib/admin-types";
import { Confirm, Loading, PageHeader, StatusBadge, btnCls } from "@/components/admin/ui";

const DELIVERY = { gated: "Gated download", download: "Free download", external: "External link", page: "Page" };

export default function AdminResourcesPage() {
  const { data, mutate } = useSWR<AdminResource[]>("/admin/resources");
  const { data: types = [] } = useSWR<AdminTerm[]>("/admin/terms?kind=resource_type");
  const typeName = (id: string) => types.find((t) => t.id === id)?.name ?? "—";
  const remove = async (r: AdminResource) => {
    try {
      await send(`/admin/resources/${r.id}`, "DELETE");
      toast.success("Resource deleted");
      mutate();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  return (
    <>
      <PageHeader title="Resources" text="Ebooks, checklists, templates and tools for the Resources hub."
        action={<Link href="/admin/resources/new/" className={btnCls("brand")} data-testid="admin-resource-create-btn"><Plus />New resource</Link>} />
      <div className="px-5 pb-12 sm:px-8">
        {!data ? <Loading /> : (
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-ink-900/[0.08]">
            <table className="w-full min-w-[760px] text-left text-[14px]" data-testid="admin-resources-table">
              <thead className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500">
                <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Delivery</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3" /></tr>
              </thead>
              <tbody>
                {data.map((r) => (
                  <tr key={r.id} className="border-t border-ink-900/[0.06] hover:bg-ink-50/60" data-testid={`admin-resource-row-${r.slug}`}>
                    <td className="max-w-[360px] px-4 py-3"><Link href={`/admin/resources/${r.id}/`} className="line-clamp-2 font-semibold text-ink-900 hover:text-brand-700" data-testid={`admin-resource-edit-${r.slug}`}>{r.title}</Link></td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-600">{typeName(r.type_id)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-600">{DELIVERY[r.delivery]}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} testId={`admin-resource-status-${r.slug}`} /></td>
                    <td className="whitespace-nowrap px-4 py-3 text-ink-500">{fmtDate(r.updated_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {r.status === "published" && <a href={`/resources/${r.slug}/`} target="_blank" rel="noreferrer" className={btnCls("ghost", "sm")} aria-label="View live" data-testid={`admin-resource-view-${r.slug}`}><ExternalLink /></a>}
                        <Confirm testId={`admin-resource-delete-${r.slug}`} title="Delete this resource?" text={`“${r.title}” will be permanently deleted.`} onConfirm={() => remove(r)}
                          trigger={<button type="button" className={btnCls("ghost", "sm", "text-rose-600")} aria-label="Delete" data-testid={`admin-resource-delete-${r.slug}-btn`}><Trash2 /></button>} />
                      </div>
                    </td>
                  </tr>
                ))}
                {!data.length && <tr><td colSpan={6} className="px-4 py-12 text-center text-ink-500" data-testid="admin-resources-empty">No resources yet. Upload your first one.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
