import { Container, JsonLd } from "@/components/ui-kit";
import { ListingHero } from "@/components/blog/ListingHero";
import { FilterRows } from "@/components/blog/FilterRows";
import { Pagination } from "@/components/blog/Pagination";
import { EmptyState } from "@/components/blog/EmptyState";
import { FeaturedResource, ResourceCard } from "@/components/resources/ResourceCard";
import { getResources, getTerms } from "@/lib/cms";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { readState, resourcesHref, type SearchParams } from "@/lib/listing";

export const dynamic = "force-dynamic";

const seo = {
  title: "Healthcare Marketing Resources & Guides | DocWin Digital",
  description: "Free healthcare marketing guides, ebooks, checklists and templates from DocWin Digital's marketers and medical review panel.",
};

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const s = await readState(searchParams);
  const filtered = !!(s.type || s.topic || s.q);
  const title = s.page > 1 && !filtered ? `Healthcare Marketing Resources: Page ${s.page} | DocWin Digital` : seo.title;
  return pageMetadata({ title, description: seo.description, path: resourcesHref(s), noindex: filtered });
}

export default async function ResourcesPage({ searchParams }: { searchParams: SearchParams }) {
  const s = await readState(searchParams);
  const filtered = !!(s.type || s.topic || s.q);
  const [types, topics, list, featured] = await Promise.all([
    getTerms("resource_type"), getTerms("topic", "resources"),
    getResources({ type: s.type, topic: s.topic, q: s.q, page: s.page }),
    !filtered && s.page === 1 ? getResources({ featured: true, per_page: 2 }) : null,
  ]);
  const used = <T extends { count: number }>(t: T[]) => t.filter((x) => x.count > 0);
  return (
    <>
      {!filtered && s.page === 1 && <JsonLd data={webPageSchema("CollectionPage", "Healthcare Marketing Resources & Guides", "/resources/")} />}
      <ListingHero crumbs={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources/" }]} eyebrow="Free resources" title="Healthcare Marketing Resources & Guides"
        lead="Practical guides, checklists and templates for healthcare organizations planning their marketing, reviewed by practicing doctors."
        action="/resources/" q={s.q} hidden={{ type: s.type, topic: s.topic }} placeholder="Search resources" testId="resources-hero" />
      <FilterRows testId="resource-filters" rows={[
        { label: "Type", allLabel: "All types", terms: used(types), active: s.type, testId: "resource-type-filter", href: (slug) => resourcesHref({ type: slug, topic: s.topic, q: s.q }) },
        { label: "Topics", allLabel: "All topics", terms: used(topics), active: s.topic, testId: "resource-topic-filter", href: (slug) => resourcesHref({ type: s.type, topic: slug, q: s.q }) },
      ]} />
      {featured && featured.items.length > 0 && (
        <section className="bg-white pt-12 sm:pt-16" data-testid="featured-resources-grid">
          <Container>
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-500">Featured</h2>
            <div className="mt-5 grid gap-4 sm:gap-6 lg:grid-cols-2">{featured.items.map((r, i) => <FeaturedResource key={r.id} r={r} testId={`featured-resource-${i}`} />)}</div>
          </Container>
        </section>
      )}
      <section className="bg-white py-12 sm:py-16 lg:py-20" data-testid="latest-resources-grid">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-[1.5rem] tracking-[-0.015em] text-ink-900 sm:text-[1.85rem]">{s.q ? `Results for “${s.q}”` : "All resources"}</h2>
            {list.total > 0 && <p className="text-[14px] text-ink-500" data-testid="latest-resources-count">{list.total} resource{list.total === 1 ? "" : "s"}</p>}
          </div>
          {list.items.length ? (
            <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">{list.items.map((r, i) => <ResourceCard key={r.id} r={r} testId={`resource-card-${i}`} />)}</div>
          ) : (
            <div className="mt-8">
              <EmptyState testId="resource-empty-state" {...(filtered
                ? { title: "No resources match these filters", text: "Try a different type or topic, or clear your search.", href: "/resources/", label: "Clear filters" }
                : { title: "Resources are on their way", text: "We're preparing practical guides and templates. In the meantime, read the latest from our blog.", href: "/blogs/", label: "Browse the blog" })} />
            </div>
          )}
          <Pagination page={list.page} pages={list.pages} href={(page) => resourcesHref({ ...s, page })} testId="resources-pagination" />
        </Container>
      </section>
    </>
  );
}
