"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { ArrowLeft, Eye } from "lucide-react";
import { ArticleView } from "@/components/blog/article/ArticleView";
import { Loading, StatusBadge } from "@/components/admin/ui";
import type { AdminAuthor } from "@/lib/admin-types";
import type { Ctas, Post } from "@/lib/cms-types";

export default function PreviewPostPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useSWR<{ post: Post; ctas: Ctas }>(`/admin/preview/posts/${id}`);
  const { data: authors = [] } = useSWR<AdminAuthor[]>("/admin/authors");
  if (error) return <Loading label="This post couldn't be loaded." />;
  if (!data) return <Loading label="Loading preview…" />;
  const faces = authors.filter((a) => a.group === "panel" && a.show_on_team && a.avatar).map((a) => ({ slug: a.slug, avatar: a.avatar }));
  return (
    <div data-testid="admin-post-preview">
      <div className="sticky top-0 z-[60] flex flex-wrap items-center gap-3 bg-ink-900 px-5 py-2.5 text-[13.5px] text-white sm:px-8">
        <Eye className="size-4 text-signal-400" aria-hidden />
        <span className="font-semibold">Preview</span>
        <StatusBadge status={data.post.status} at={data.post.published_at} />
        <span className="hidden text-ink-300 sm:inline">{data.post.status === "published" ? "This is how the live article looks." : "Drafts are only visible to signed-in admins."}</span>
        <Link href={`/admin/posts/${id}/`} className="ml-auto inline-flex items-center gap-1.5 font-semibold text-white hover:underline" data-testid="admin-preview-back"><ArrowLeft className="size-4" />Back to editor</Link>
      </div>
      <ArticleView post={data.post} ctas={data.ctas} faces={faces} />
    </div>
  );
}
