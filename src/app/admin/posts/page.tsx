"use client";

import { useDeferredValue, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { ExternalLink, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { fmtDate, send } from "@/lib/admin-api";
import type { AdminAuthor, AdminPost } from "@/lib/admin-types";
import { isFuture } from "@/lib/ist";
import { Confirm, Input, Loading, PageHeader, SelectInput, StatusBadge, btnCls } from "@/components/admin/ui";

function Row({ p, author, onDelete }: { p: AdminPost; author: string; onDelete: () => void }) {
  return (
    <tr className="border-t border-ink-900/[0.06] hover:bg-ink-50/60" data-testid={`admin-post-row-${p.slug}`}>
      <td className="max-w-[420px] px-4 py-3">
        <Link href={`/admin/posts/${p.id}/`} className="line-clamp-2 font-semibold text-ink-900 hover:text-brand-700" data-testid={`admin-post-edit-${p.slug}`}>{p.title}</Link>
        <span className="mt-0.5 block truncate text-[12.5px] text-ink-400">/blogs/{p.slug}/</span>
      </td>
      <td className="px-4 py-3"><StatusBadge status={p.status} at={p.published_at} testId={`admin-post-status-${p.slug}`} /></td>
      <td className="whitespace-nowrap px-4 py-3 text-ink-600">{author}</td>
      <td className="whitespace-nowrap px-4 py-3 text-ink-500">{fmtDate(p.updated_at)}</td>
      <td className="px-4 py-3">
        <div className="flex justify-end gap-1">
          {p.status === "published" && !isFuture(p.published_at) && <a href={`/blogs/${p.slug}/`} target="_blank" rel="noreferrer" className={btnCls("ghost", "sm")} aria-label="View live" data-testid={`admin-post-view-${p.slug}`}><ExternalLink /></a>}
          <Confirm testId={`admin-post-delete-${p.slug}`} title="Delete this post?" text={`“${p.title}” will be permanently deleted.`} onConfirm={onDelete}
            trigger={<button type="button" className={btnCls("ghost", "sm", "text-rose-600")} aria-label="Delete" data-testid={`admin-post-delete-${p.slug}-btn`}><Trash2 /></button>} />
        </div>
      </td>
    </tr>
  );
}

export default function AdminPostsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const query = useDeferredValue(q);
  const { data, mutate } = useSWR<AdminPost[]>(`/admin/posts?q=${encodeURIComponent(query)}&status=${status}`);
  const { data: authors = [] } = useSWR<AdminAuthor[]>("/admin/authors");
  const name = (id: string) => authors.find((a) => a.id === id)?.name ?? "—";
  const remove = async (p: AdminPost) => {
    try {
      await send(`/admin/posts/${p.id}`, "DELETE");
      toast.success("Post deleted");
      mutate();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };
  return (
    <>
      <PageHeader title="Blog posts" text="Write, publish and manage articles. Only published posts appear on the site."
        action={<Link href="/admin/posts/new/" className={btnCls("brand")} data-testid="admin-post-create-btn"><Plus />New post</Link>} />
      <div className="space-y-4 px-5 pb-12 sm:px-8">
        <div className="flex flex-wrap gap-3">
          <label className="relative min-w-[240px] flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title" className="pl-9" aria-label="Search posts" data-testid="admin-posts-search" />
          </label>
          <div className="w-44"><SelectInput value={status} onChange={setStatus} placeholder="All statuses" options={[{ value: "published", label: "Published" }, { value: "draft", label: "Drafts" }]} testId="admin-posts-status-filter" /></div>
        </div>
        {!data ? <Loading /> : (
          <div className="overflow-x-auto rounded-xl bg-white ring-1 ring-ink-900/[0.08]">
            <table className="w-full min-w-[760px] text-left text-[14px]" data-testid="admin-posts-table">
              <thead className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-500">
                <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Author</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3" /></tr>
              </thead>
              <tbody>
                {data.map((p) => <Row key={p.id} p={p} author={name(p.author_id)} onDelete={() => remove(p)} />)}
                {!data.length && <tr><td colSpan={5} className="px-4 py-12 text-center text-ink-500" data-testid="admin-posts-empty">No posts found. Create your first article.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
