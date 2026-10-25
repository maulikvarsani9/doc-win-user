import { notFound, permanentRedirect } from "next/navigation";
import { AuthorHeader } from "@/components/blog/AuthorHeader";
import { PostGrid } from "@/components/blog/Sections";
import { authorHref } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/ui-kit";
import { getAuthor, getPosts, isMoved } from "@/lib/cms";
import { readState, type SearchParams } from "@/lib/listing";
import { brandTitle, pageMetadata, personSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }>; searchParams: SearchParams };

async function load(slug: string) {
  const res = await getAuthor(slug);
  if (isMoved(res)) permanentRedirect(authorHref(res.redirect));
  if (!res) notFound();
  return res;
}

const pageHref = (slug: string, page: number) => `${authorHref(slug)}${page > 1 ? `?page=${page}` : ""}`;

export async function generateMetadata({ params, searchParams }: Props) {
  const [{ author: a, post_count }, s] = [await load((await params).slug), await readState(searchParams)];
  const title = brandTitle(a.seo_title || `Articles by ${a.name}`) + (s.page > 1 ? ` (Page ${s.page})` : "");
  const description = a.seo_description || `Healthcare marketing articles written or medically reviewed by ${a.name}${a.role ? `, ${a.role}` : ""} at DocWin Digital.`;
  return pageMetadata({ title, description, path: pageHref(a.slug, s.page), noindex: post_count === 0 });
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { author: a, post_count } = await load((await params).slug);
  const { page } = await readState(searchParams);
  const posts = await getPosts({ author: a.slug, page });
  return (
    <>
      <AuthorHeader author={a} count={post_count} />
      <PostGrid title={`Articles by and reviewed by ${a.name}`} data={posts} testId="author-articles-grid" href={(p) => pageHref(a.slug, p)}
        empty={{ title: "No published articles yet", text: `${a.name}'s articles will appear here once they're published.`, href: "/blogs/", label: "Browse the blog" }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: personSchema(a) }} />
    </>
  );
}
