import { BlogListing } from "@/components/blog/BlogListing";
import { JsonLd } from "@/components/ui-kit";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { readState, blogHref, type SearchParams } from "@/lib/listing";

export const dynamic = "force-dynamic";

const seo = {
  title: "Healthcare Marketing Blog | DocWin Digital",
  description: "Practical healthcare marketing articles on search, websites, reviews, advertising and patient trust, from DocWin Digital's marketers and medical review panel.",
};

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const s = await readState(searchParams);
  const filtered = !!(s.topic || s.speciality || s.q);
  const path = blogHref(s, { topics: [], specialities: [] });
  const title = s.page > 1 && !filtered ? `Healthcare Marketing Blog: Page ${s.page} | DocWin Digital` : seo.title;
  return pageMetadata({ title, description: seo.description, path, noindex: filtered });
}

export default async function BlogHubPage({ searchParams }: { searchParams: SearchParams }) {
  const state = await readState(searchParams);
  const showSections = !state.topic && !state.speciality && !state.q && state.page === 1;
  return (
    <>
      {showSections && <JsonLd data={webPageSchema("CollectionPage", "Healthcare Marketing Blog", "/blogs/")} />}
      <BlogListing state={state} showSections={showSections} eyebrow="DocWin Insights" title="Healthcare Marketing Blog"
      lead="Practical healthcare marketing articles from our marketing team and the practicing doctors on our review panel."
      crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs/" }]} />
    </>
  );
}
