import Image from "next/image";
import Link from "next/link";
import { media, type Post } from "@/lib/cms-types";
import { Breadcrumbs } from "@/components/hubs/Breadcrumbs";
import { formatDate, postHref } from "@/components/blog/PostCard";
import { AuthorChip, ReviewerChip } from "./AuthorChip";

const DAY = 86_400_000;

function Meta({ post }: { post: Post }) {
  const updated = post.published_at && new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > DAY;
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-[13.5px] text-ink-500" data-testid="article-meta">
      {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
      {updated && <><span aria-hidden>·</span><span>Updated <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time></span></>}
      <span aria-hidden>·</span><span data-testid="article-reading-time">{post.reading_time} min read</span>
    </p>
  );
}

export function ArticleHeader({ post }: { post: Post }) {
  const topic = post.topics[0];
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs/" },
    ...(topic ? [{ name: topic.name, path: `/blogs/topic/${topic.slug}/` }] : []), { name: post.title, path: postHref(post.slug) }];
  const tags = [...post.topics.map((t) => ({ ...t, seg: "topic" })), ...post.specialities.map((t) => ({ ...t, seg: "speciality" }))].slice(0, 4);
  return (
    <header className="bg-paper" data-testid="article-header">
      <div className="mx-auto max-w-[1360px] px-5 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-10">
        <div data-testid="article-breadcrumbs" className="[&_li:last-child]:hidden sm:[&_li:last-child]:flex"><Breadcrumbs items={crumbs} /></div>
        <div className="reveal mt-8 max-w-[900px] sm:mt-12">
          <div className="flex flex-wrap gap-2">
            {post.ultimate_guide && <span className="rounded-md bg-ink-900 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Ultimate guide</span>}
            {tags.map((t) => (
              <Link key={t.id} href={`/blogs/${t.seg}/${t.slug}/`} className={t.seg === "topic" ? "rounded-full bg-brand-100 px-3 py-1 text-[12.5px] font-semibold text-brand-700 hover:bg-brand-200" : "rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-ink-700 ring-1 ring-ink-900/10 hover:ring-ink-900/25"} data-testid={`article-tag-${t.slug}`}>
                {t.name}
              </Link>
            ))}
          </div>
          <h1 className="mt-5 font-display text-[2.1rem] leading-[1.12] tracking-[-0.012em] sm:text-5xl lg:text-[3.4rem]" data-testid="article-h1-title">{post.title}</h1>
          {post.subtitle && <p className="mt-5 max-w-3xl text-[1.08rem] leading-[1.6] text-ink-600 sm:text-[1.2rem]" data-testid="article-subtitle">{post.subtitle}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {post.author && <AuthorChip author={post.author} />}
            {post.reviewer && <ReviewerChip reviewer={post.reviewer} />}
          </div>
          <div className="mt-5"><Meta post={post} /></div>
        </div>
      </div>
    </header>
  );
}

export function ArticleCover({ post }: { post: Post }) {
  if (!post.cover_image) return null;
  return (
    <div className="bg-[linear-gradient(to_bottom,#F7F6F2_50%,#fff_50%)]">
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-brand-50 sm:aspect-[21/9] sm:rounded-[1.75rem]" data-testid="article-cover">
          <Image src={media(post.cover_image)} alt={post.cover_alt || post.title} fill priority sizes="(min-width: 1360px) 1300px, 100vw" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
