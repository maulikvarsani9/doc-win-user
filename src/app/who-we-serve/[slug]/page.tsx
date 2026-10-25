import { notFound } from "next/navigation";
import { DraftPage } from "@/components/templates/DraftPage";
import { AudienceTemplate } from "@/components/templates/audience/AudienceTemplate";
import { audienceBySlug, audiences, audiencesIn, audienceGroups } from "@/content/audiences";
import { audiencePages } from "@/content/audience-pages";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = audienceBySlug((await params).slug);
  if (!a) return {};
  const p = audiencePages[a.slug];
  const path = `/who-we-serve/${a.slug}/`;
  if (!p) return pageMetadata({ title: `${a.name} Marketing | DocWin Digital`, description: a.description, path, noindex: true });
  return pageMetadata({ title: p.seoTitle, description: p.metaDescription, path, noindex: a.status !== "ready-for-review", image: { url: `/images/og/industry-${a.slug}.jpg`, width: 1200, height: 630 } });
}

export default async function AudiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = audienceBySlug((await params).slug);
  if (!a) notFound();
  const page = audiencePages[a.slug];
  if (page) return <AudienceTemplate audience={a} page={page} />;
  const group = audienceGroups.find((g) => g.id === a.group)!;
  const related = audiencesIn(a.group).filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <DraftPage
      eyebrow={group.name}
      title={`Marketing for ${a.name}`}
      intro={a.description}
      template="Audience Page"
      crumbs={[{ name: "Home", path: "/" }, { name: "Who We Serve", path: "/who-we-serve/" }, { name: a.name, path: `/who-we-serve/${a.slug}/` }]}
      status={a.status}
      primaryKeyword={a.primaryKeyword}
      supportingKeywords={a.supportingKeywords}
      reviewNote={a.reviewNote}
      related={related.map((r) => ({ href: `/who-we-serve/${r.slug}/`, name: r.name, description: r.description, linkLabel: r.linkLabel }))}
    />
  );
}
