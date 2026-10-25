"use client";

import Link from "next/link";
import useSWR from "swr";
import { Plus } from "lucide-react";
import { Avatar } from "@/components/blog/Avatar";
import { Loading, PageHeader, btnCls } from "@/components/admin/ui";
import type { AdminAuthor } from "@/lib/admin-types";

const GROUPS = [
  { id: "founder", title: "Founders", text: "Shown in Leadership on the Team, About and Home pages." },
  { id: "panel", title: "Medical review panel", text: "Shown in the doctor panel on the Team and Home pages and in the doctor CTA." },
  { id: "contributor", title: "Contributors", text: "Blog authors who aren't shown on the Team page." },
] as const;

function PersonCard({ a }: { a: AdminAuthor }) {
  return (
    <Link href={`/admin/authors/${a.id}/`} className="group flex items-center gap-4 rounded-xl bg-white p-4 ring-1 ring-ink-900/[0.08] transition-shadow hover:shadow-[0_18px_40px_-26px_rgba(11,25,44,0.45)]" data-testid={`admin-author-card-${a.slug}`}>
      <Avatar name={a.name} src={a.avatar || a.photo} size={52} />
      <span className="min-w-0">
        <span className="block truncate font-semibold text-ink-900 group-hover:text-brand-700">{a.name}</span>
        <span className="block truncate text-[13px] text-ink-500">{[a.credential, a.role].filter(Boolean).join(" · ") || "No role yet"}</span>
        {!a.show_on_team && a.group !== "contributor" && <span className="mt-1 inline-block rounded bg-ink-100 px-1.5 py-0.5 text-[11px] font-semibold text-ink-600">Hidden from team page</span>}
      </span>
    </Link>
  );
}

export default function AdminAuthorsPage() {
  const { data } = useSWR<AdminAuthor[]>("/admin/authors");
  return (
    <>
      <PageHeader title="Authors & team" text="One shared list of people, used for blog bylines, author pages, the Team page and the homepage."
        action={<Link href="/admin/authors/new/" className={btnCls("brand")} data-testid="admin-author-create-btn"><Plus />Add person</Link>} />
      <div className="space-y-10 px-5 pb-12 sm:px-8" data-testid="admin-authors-list">
        {!data ? <Loading /> : GROUPS.map((g) => {
          const people = data.filter((a) => a.group === g.id);
          return (
            <section key={g.id} data-testid={`admin-authors-group-${g.id}`}>
              <h2 className="text-[15px] font-semibold text-ink-900">{g.title} <span className="font-normal text-ink-400">({people.length})</span></h2>
              <p className="mt-0.5 text-[13px] text-ink-500">{g.text}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {people.map((a) => <PersonCard key={a.id} a={a} />)}
                {!people.length && <p className="text-[13.5px] text-ink-400">Nobody in this group yet.</p>}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
