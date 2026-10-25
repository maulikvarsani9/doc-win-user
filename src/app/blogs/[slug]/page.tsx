import { notFound, permanentRedirect } from "next/navigation";
import { ArticleView } from "@/components/blog/article/ArticleView";
import { PlannedDraft, plannedMetadata } from "@/components/templates/PlannedRoute";
import { JsonLd } from "@/components/ui-kit";
import { getPost, getTeam, isMoved } from "@/lib/cms";
import { blogPostingSchema, brandTitle, pageMetadata } from "@/lib/seo";
import { plannedByPath } from "@/content/pages";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const res = await getPost(slug);
  if (isMoved(res)) permanentRedirect(`/blogs/${res.redirect}/`);
  return res;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const res = await load(slug);
  if (!res) return plannedMetadata(["blogs", slug]) ?? {};
  const p = res.post;
  return pageMetadata({
    title: brandTitle(p.seo_title || p.title),
    description: p.seo_description || p.excerpt || p.subtitle,
    path: `/blogs/${p.slug}/`,
    noindex: p.noindex,
    image: p.og_image || p.cover_image || undefined,
    article: { publishedTime: p.published_at ?? undefined, modifiedTime: p.updated_at, authors: p.author ? [p.author.name] : [], tags: p.topics.map((t) => t.name) },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const res = await load(slug);
  if (!res) {
    if (plannedByPath(`blogs/${slug}`)) return <PlannedDraft slug={["blogs", slug]} />;
    notFound();
  }
  const { post, ctas } = res;
  const { panel } = await getTeam();
  return (
    <>
      <ArticleView post={post} ctas={ctas} faces={panel} />
      <JsonLd data={blogPostingSchema({
        title: post.title, description: post.seo_description || post.excerpt, path: `/blogs/${post.slug}/`, image: post.cover_image || undefined,
        published: post.published_at, modified: post.updated_at, author: post.author, reviewer: post.reviewer,
        keywords: [...post.topics, ...post.specialities].map((t) => t.name),
      })} />
    </>
  );
}
