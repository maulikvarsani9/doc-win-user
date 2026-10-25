import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, SectionHeader, btn } from "@/components/ui-kit";
import { Avatar } from "@/components/blog/Avatar";
import { postHref } from "@/components/blog/PostCard";
import { getPosts, type PostCard } from "@/lib/cms";
import { cn } from "@/lib/utils";

const topicOf = (p: PostCard) => (p.topics[0] ?? p.specialities[0])?.name;

function Author({ p, dark }: { p: PostCard; dark?: boolean }) {
  if (!p.author) return <span />;
  return (
    <span className="flex items-center gap-2.5">
      <Avatar name={p.author.name} src={p.author.avatar || p.author.photo} size={36} />
      <span className={dark ? "text-ink-200" : "text-ink-600"}>{p.author.name}</span>
    </span>
  );
}

function Featured({ p, full }: { p: PostCard; full: boolean }) {
  return (
    <Link href={postHref(p.slug)} data-testid="blog-card-0" className={cn("group relative flex min-h-[340px] flex-col overflow-hidden rounded-[1.5rem] bg-ink-900 p-6 text-white transition-transform duration-300 hover:-translate-y-1 sm:min-h-[460px] sm:rounded-[2.25rem] sm:p-11", full ? "lg:col-span-12" : "lg:col-span-7")}>
      <span aria-hidden className="absolute -right-16 -top-16 size-64 rounded-full border border-white/10" />
      <span className="flex items-center gap-3 text-[13px]">
        {topicOf(p) && <span className="rounded-full bg-signal-500 px-3 py-1 font-semibold text-ink-900">{topicOf(p)}</span>}
        <span className="text-ink-300">Latest article</span>
      </span>
      <h3 className="mt-auto max-w-[24ch] pt-10 font-display text-[1.55rem] font-normal leading-[1.18] tracking-[-0.018em] text-white sm:pt-14 sm:text-[2.3rem] sm:leading-[1.12]">{p.title}</h3>
      {p.excerpt && <p className="mt-4 line-clamp-3 max-w-xl text-[15px] leading-[1.65] text-ink-300 sm:mt-5 sm:text-[16px] sm:leading-[1.7]">{p.excerpt}</p>}
      <span className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-[14px] sm:mt-9 sm:pt-6">
        <Author p={p} dark />
        <span className="grid size-11 place-items-center rounded-full bg-white text-ink-900 transition-transform duration-300 group-hover:-rotate-45"><ArrowRight aria-hidden className="size-4" /></span>
      </span>
    </Link>
  );
}

function Side({ p, i }: { p: PostCard; i: number }) {
  return (
    <Link href={postHref(p.slug)} data-testid={`blog-card-${i}`} className="group flex flex-1 flex-col rounded-[1.5rem] bg-white p-6 ring-1 ring-ink-900/[0.06] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(11,25,44,0.35)] sm:rounded-[2rem] sm:p-9">
      {topicOf(p) && <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-[13px] font-semibold text-brand-700">{topicOf(p)}</span>}
      <h3 className="mt-auto pt-7 font-display text-[1.2rem] font-medium leading-[1.25] tracking-[-0.015em] sm:pt-10 sm:text-[1.4rem] sm:leading-[1.2]">{p.title}</h3>
      <span className="mt-5 flex items-center justify-between text-[14px] sm:mt-7">
        <Author p={p} />
        <ArrowUpRight aria-hidden className="size-5 text-brand-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export async function BlogSection() {
  const { items } = await getPosts({ per_page: 3 }, 60).catch(() => ({ items: [] as PostCard[] }));
  if (!items.length) return null;
  const [featured, ...rest] = items;
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-32" data-testid="home-blog">
      <Container>
        <SectionHeader
          eyebrow="Insights"
          title="Healthcare Marketing Insights & Strategies"
          lead="Practical insights, strategies and updates from our healthcare marketing team and medical reviewers."
          action={<Link href="/blogs/" className={btn("outline", "lg")} data-testid="blog-explore-all">Explore All Articles <ArrowRight aria-hidden /></Link>}
        />
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-12">
          <Featured p={featured} full={!rest.length} />
          {rest.length > 0 && (
            <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-5">
              {rest.map((p, i) => <Side key={p.id} p={p} i={i + 1} />)}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
