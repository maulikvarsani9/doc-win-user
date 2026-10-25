import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { media, type PostCard as Card } from "@/lib/cms-types";
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

export const formatDate = (iso?: string | null) =>
  iso ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso)) : "";

export const postHref = (slug: string) => `/blogs/${slug}/`;
export const authorHref = (slug: string) => `/blogs/author/${slug}/`;

export function Byline({ post, dark, className }: { post: Card; dark?: boolean; className?: string }) {
  const a = post.author;
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5 text-[13px]", dark ? "text-ink-300" : "text-ink-500", className)}>
      {a && <Avatar name={a.name} src={a.avatar || a.photo} size={32} />}
      <span className="min-w-0 truncate">
        {a && <span className={cn("font-medium", dark ? "text-white" : "text-ink-800")}>{a.name}</span>}
        {a && post.published_at && <span aria-hidden> · </span>}
        <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
        <span aria-hidden> · </span>{post.reading_time} min read
      </span>
    </span>
  );
}

export function TopicPill({ post, dark }: { post: Card; dark?: boolean }) {
  const topic = post.topics[0] ?? post.specialities[0];
  if (!topic) return null;
  return <span className={cn("w-fit rounded-full px-2.5 py-1 text-[12px] font-semibold", dark ? "bg-signal-500 text-ink-900" : "bg-brand-50 text-brand-700")}>{topic.name}</span>;
}

function Cover({ post, sizes, className }: { post: Card; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-50", className)}>
      {post.cover_image ? (
        <Image src={media(post.cover_image)} alt={post.cover_alt || ""} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
      ) : (
        <span aria-hidden className="panel-grid absolute inset-0 bg-ink-900"><span className="absolute -right-10 -top-10 size-40 rounded-full bg-brand-600/60" /></span>
      )}
    </div>
  );
}

export function PostCard({ post, testId, guide }: { post: Card; testId: string; guide?: boolean }) {
  return (
    <Link href={postHref(post.slug)} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-ink-900/[0.07] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(11,25,44,0.4)] sm:rounded-[1.5rem]" data-testid={testId}>
      <Cover post={post} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="flex flex-wrap items-center gap-2">
          {guide && <span className="rounded-md bg-ink-900 px-2 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white">Ultimate guide</span>}
          <TopicPill post={post} />
        </span>
        <h3 className="mt-4 font-display text-[1.15rem] font-medium leading-[1.3] tracking-[-0.012em] text-ink-900 group-hover:text-brand-700 sm:text-[1.25rem]">{post.title}</h3>
        {post.excerpt && <p className="mt-2.5 line-clamp-2 text-[14.5px] leading-[1.6] text-ink-600">{post.excerpt}</p>}
        <Byline post={post} className="mt-auto pt-5" />
      </div>
    </Link>
  );
}

export function FeatureCard({ post, testId }: { post: Card; testId: string }) {
  return (
    <Link href={postHref(post.slug)} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-ink-900 text-white transition-transform duration-300 hover:-translate-y-1 sm:rounded-[2rem]" data-testid={testId}>
      <Cover post={post} sizes="(min-width: 1024px) 720px, 100vw" className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-6 sm:p-9">
        <TopicPill post={post} dark />
        <h3 className="mt-5 font-display text-[1.5rem] font-normal leading-[1.18] tracking-[-0.018em] text-white sm:text-[2.1rem]">{post.title}</h3>
        {post.excerpt && <p className="mt-4 line-clamp-3 max-w-2xl text-[15px] leading-[1.65] text-ink-300 sm:text-[16px]">{post.excerpt}</p>}
        <span className="mt-auto flex items-center justify-between gap-4 pt-7">
          <Byline post={post} dark />
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-ink-900 transition-transform duration-300 group-hover:-rotate-45"><ArrowUpRight aria-hidden className="size-4" /></span>
        </span>
      </div>
    </Link>
  );
}

export function CompactCard({ post, testId }: { post: Card; testId: string }) {
  return (
    <Link href={postHref(post.slug)} className="group flex gap-4 rounded-[1.25rem] bg-white p-3.5 ring-1 ring-ink-900/[0.07] transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(11,25,44,0.4)] sm:gap-5 sm:p-4" data-testid={testId}>
      <Cover post={post} sizes="160px" className="aspect-square w-24 shrink-0 rounded-xl sm:w-32" />
      <span className="flex min-w-0 flex-col py-1">
        <TopicPill post={post} />
        <span className="mt-2.5 line-clamp-3 font-display text-[1rem] font-medium leading-[1.3] text-ink-900 group-hover:text-brand-700 sm:text-[1.1rem]">{post.title}</span>
        <Byline post={post} className="mt-auto pt-3" />
      </span>
    </Link>
  );
}
