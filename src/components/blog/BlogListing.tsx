import { ListingHero } from "./ListingHero";
import { FilterRows } from "./FilterRows";
import { FeaturedSection, GuidesSection, PostGrid } from "./Sections";
import { getPosts, getTerms, type Term } from "@/lib/cms";
import { blogHref, type ListState } from "@/lib/listing";
import type { Crumb } from "@/components/hubs/Breadcrumbs";

type Props = { state: ListState; crumbs: Crumb[]; eyebrow: string; title: string; lead: string; showSections: boolean };

export async function loadBlogTerms() {
  const [topics, specialities] = await Promise.all([getTerms("topic"), getTerms("speciality")]);
  const used = (t: Term[]) => t.filter((x) => x.count > 0);
  return { topics: used(topics), specialities: used(specialities) };
}

export async function BlogListing({ state, crumbs, eyebrow, title, lead, showSections }: Props) {
  const terms = await loadBlogTerms();
  const [latest, featured, guides] = await Promise.all([
    getPosts({ topic: state.topic, speciality: state.speciality, q: state.q, page: state.page }),
    showSections ? getPosts({ featured: true, per_page: 3 }) : null,
    showSections ? getPosts({ guide: true, per_page: 3 }) : null,
  ]);
  const href = (s: Partial<ListState>) => blogHref(s, terms);
  const filtered = !!(state.topic || state.speciality || state.q);
  const gridTitle = state.q ? `Results for “${state.q}”` : filtered ? "Articles" : "Latest articles";
  return (
    <>
      <ListingHero crumbs={crumbs} eyebrow={eyebrow} title={title} lead={lead} action="/blogs/" q={state.q}
        hidden={{ topic: state.topic, speciality: state.speciality }} placeholder="Search articles" testId="blog-hero" />
      <FilterRows testId="blog-filters" rows={[
        { label: "Topics", allLabel: "All topics", terms: terms.topics, active: state.topic, testId: "blog-topic-filter", href: (slug) => href({ topic: slug, speciality: state.speciality, q: state.q }) },
        { label: "Specialities", allLabel: "All specialities", terms: terms.specialities, active: state.speciality, testId: "blog-speciality-filter", href: (slug) => href({ topic: state.topic, speciality: slug, q: state.q }) },
      ]} />
      {featured && <FeaturedSection posts={featured.items} />}
      {guides && <GuidesSection posts={guides.items} />}
      <PostGrid title={gridTitle} data={latest} testId="blog-latest" href={(page) => href({ ...state, page })}
        empty={filtered
          ? { title: "No articles match these filters", text: "Try a different topic or speciality, or clear your search.", href: "/blogs/", label: "Clear filters" }
          : { title: "Articles are on their way", text: "Our team is preparing practical healthcare marketing articles. In the meantime, explore our free resources.", href: "/resources/", label: "Browse resources" }} />
    </>
  );
}
