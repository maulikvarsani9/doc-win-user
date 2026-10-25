import Link from "next/link";
import { ArrowRight, Linkedin } from "lucide-react";
import type { Post } from "@/lib/cms";
import { Avatar } from "@/components/blog/Avatar";
import { authorHref } from "@/components/blog/PostCard";

export function AuthorBio({ post }: { post: Post }) {
  const a = post.author;
  if (!a) return null;
  const r = post.reviewer;
  return (
    <section className="mt-16 rounded-[1.5rem] bg-paper p-6 sm:p-8" data-testid="article-author-card">
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        <Avatar name={a.name} src={a.avatar || a.photo} size={84} className="ring-4 ring-white" />
        <div className="min-w-0">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-500">About the author</p>
          <Link href={authorHref(a.slug)} className="mt-2 block font-display text-[1.35rem] leading-tight text-ink-900 hover:text-brand-700" data-testid="article-author-card-name">{a.name}</Link>
          <p className="mt-1 text-[14px] text-ink-500">{[a.credential, a.role].filter(Boolean).join(" · ")}</p>
          {a.bio && <p className="mt-4 text-[15px] leading-[1.65] text-ink-700">{a.bio}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <Link href={authorHref(a.slug)} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-700 hover:underline" data-testid="article-author-card-link">
              All articles by {a.name} <ArrowRight aria-hidden className="size-4" />
            </Link>
            {a.linkedin && (
              <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-600 hover:text-ink-900" data-testid="article-author-card-linkedin">
                <Linkedin aria-hidden className="size-4" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
      {r && (
        <div className="mt-6 flex items-center gap-3.5 border-t border-ink-900/[0.08] pt-5" data-testid="article-reviewer-card">
          <Avatar name={r.name} src={r.avatar || r.photo} size={44} />
          <p className="text-[14px] leading-[1.55] text-ink-600">
            Medically reviewed by <Link href={authorHref(r.slug)} className="font-semibold text-ink-900 hover:text-brand-700">{r.name}</Link>
            {r.credential && <>, {r.credential}</>}. Reviews cover clinical accuracy and responsible communication.
          </p>
        </div>
      )}
    </section>
  );
}
