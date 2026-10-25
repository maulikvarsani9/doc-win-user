import { Container, SectionHeader } from "@/components/ui-kit";
import { CompactCard, FeatureCard, PostCard } from "./PostCard";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import type { Paged, PostCard as Card } from "@/lib/cms";

export function FeaturedSection({ posts }: { posts: Card[] }) {
  if (!posts.length) return null;
  const [lead, ...rest] = posts;
  return (
    <section className="bg-white pt-12 sm:pt-16" data-testid="blog-featured">
      <Container>
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">Featured articles</h2>
        <div className="mt-5 grid gap-4 sm:gap-6 lg:grid-cols-12">
          <div className={rest.length ? "lg:col-span-7" : "lg:col-span-12"}><FeatureCard post={lead} testId="blog-featured-0" /></div>
          {rest.length > 0 && (
            <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-5">
              {rest.map((p, i) => <CompactCard key={p.id} post={p} testId={`blog-featured-${i + 1}`} />)}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function GuidesSection({ posts }: { posts: Card[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-14 bg-paper py-14 sm:mt-20 sm:py-20" data-testid="blog-guides">
      <Container>
        <SectionHeader eyebrow="Ultimate guides" title="In-Depth Guides for Healthcare Marketers" />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((p, i) => <PostCard key={p.id} post={p} guide testId={`blog-guide-${i}`} />)}
        </div>
      </Container>
    </section>
  );
}

type GridProps = { title: string; data: Paged<Card>; href: (p: number) => string; empty: { title: string; text: string; href?: string; label?: string }; testId: string };

export function PostGrid({ title, data, href, empty, testId }: GridProps) {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20" data-testid={testId}>
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-[1.5rem] font-normal tracking-[-0.015em] text-ink-900 sm:text-[1.85rem]">{title}</h2>
          {data.total > 0 && <p className="text-[14px] text-ink-500" data-testid={`${testId}-count`}>{data.total} article{data.total === 1 ? "" : "s"}</p>}
        </div>
        {data.items.length ? (
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {data.items.map((p, i) => <PostCard key={p.id} post={p} guide={p.ultimate_guide} testId={`${testId}-card-${i}`} />)}
          </div>
        ) : (
          <div className="mt-8"><EmptyState {...empty} testId={`${testId}-empty`} /></div>
        )}
        <Pagination page={data.page} pages={data.pages} href={href} testId={`${testId}-pagination`} />
      </Container>
    </section>
  );
}
