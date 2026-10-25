import { DraftPage } from "@/components/templates/DraftPage";
import { plannedByPath } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const titleCase = (s: string) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export function plannedMetadata(slug: string[]) {
  const p = plannedByPath(slug.join("/"));
  if (!p) return null;
  return pageMetadata({ title: `${p.title} | DocWin Digital`, description: p.intro, path: `/${p.path}/`, noindex: true });
}

export function PlannedDraft({ slug }: { slug: string[] }) {
  const p = plannedByPath(slug.join("/"));
  if (!p) return null;
  const crumbs = [{ name: "Home", path: "/" }, ...slug.map((_, i) => {
    const path = `/${slug.slice(0, i + 1).join("/")}/`;
    return { name: i === slug.length - 1 ? p.title : plannedByPath(slug.slice(0, i + 1).join("/"))?.title ?? titleCase(slug[i]), path };
  })];
  return (
    <DraftPage eyebrow={p.type} title={p.title} intro={p.intro} template={p.type} crumbs={crumbs} status={p.status}
      primaryKeyword={p.primaryKeyword} supportingKeywords={p.supportingKeywords} reviewNote={p.reviewNote} />
  );
}
