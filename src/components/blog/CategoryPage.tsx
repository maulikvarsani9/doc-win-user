import { notFound, permanentRedirect } from "next/navigation";
import { BlogListing } from "@/components/blog/BlogListing";
import { getTerm, isMoved, type TermKind } from "@/lib/cms";
import { brandTitle, pageMetadata } from "@/lib/seo";
import { readState, type SearchParams } from "@/lib/listing";

const segment = { topic: "topic", speciality: "speciality" } as const;

export async function loadCategory(kind: Exclude<TermKind, "resource_type">, slug: string) {
  const res = await getTerm(kind, slug);
  if (isMoved(res)) permanentRedirect(`/blogs/${segment[kind]}/${res.redirect}/`);
  if (!res || res.term.count === 0) notFound();
  return res.term;
}

export async function categoryMetadata(kind: Exclude<TermKind, "resource_type">, slug: string, searchParams: SearchParams) {
  const [term, s] = [await loadCategory(kind, slug), await readState(searchParams)];
  const base = `/blogs/${segment[kind]}/${term.slug}/`;
  const label = kind === "topic" ? "Healthcare Marketing" : "Marketing for";
  const fallbackTitle = kind === "topic" ? `${term.name}: ${label} Articles` : `${label} ${term.name}: Articles`;
  const title = brandTitle(term.seo_title || fallbackTitle) + (s.page > 1 ? ` (Page ${s.page})` : "");
  const fallbackDescription = kind === "topic" ? `${term.name} articles for healthcare organizations, written by DocWin Digital's marketing team and reviewed by practicing doctors.` : `Healthcare marketing articles for ${term.name.toLowerCase()}, written by DocWin Digital's marketing team and reviewed by practicing doctors.`;
  const description = term.seo_description || term.description || fallbackDescription;
  return pageMetadata({ title, description, path: s.page > 1 ? `${base}?page=${s.page}` : base, noindex: !term.indexable });
}

export async function CategoryPage({ kind, slug, searchParams }: { kind: Exclude<TermKind, "resource_type">; slug: string; searchParams: SearchParams }) {
  const term = await loadCategory(kind, slug);
  const state = { ...(await readState(searchParams)), [kind]: term.slug, q: undefined };
  return (
    <BlogListing state={state} showSections={false} eyebrow={kind === "topic" ? "Blog topic" : "Blog speciality"} title={term.name}
      lead={term.description || `Practical articles about ${kind === "topic" ? term.name : term.name.toLowerCase()} from DocWin Digital.`}
      crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs/" }, { name: term.name, path: `/blogs/${segment[kind]}/${term.slug}/` }]} />
  );
}
